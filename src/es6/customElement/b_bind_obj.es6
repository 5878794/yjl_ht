
//TODO 初始数据闪
//TODO 初始数据显示${}



let addStyleFile = require('./fn/addStyleFile');


class bBindObj extends HTMLElement{
	//元素加入页面回调
	connectedCallback() {
		//挂载css
		let all = addStyleFile('../res/css/all.css');
		this.shadow.appendChild(all);
	}


	//注册要监听的属性
	static get observedAttributes() {
		//监听的属性需要全部小写
		return [
			'data-data'
		];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		//data-data属性不能传入对象  所以数据放dom对象上咯
		this.data = this.bBIndObjData;
	}

	constructor(){
		super();

		let slot = $('<slot></slot>');


		//创建shadow容器
		this.shadow = this.attachShadow({mode: 'open'});
		this.shadow.appendChild(slot.get(0));

		//分析dom中的变量
		this.paramCatch = {};
		this.checkTree();

	}

	//使不存在的属性返回空
	addProxy(obj={}){
		return new Proxy(obj,{
			get(target,key,receiver){
				if (key in target) {
					return Reflect.get(target, key, receiver);
				}else{
					return '';
				}
			}
		})
	}

	checkTree(){
		//slot中的子元素集合 数组
		let cloneDom = this.shadow.querySelector('slot').assignedElements();
		cloneDom.map(rs=>{
			this.checkDom(rs);
		});
	}

	checkDom(rs){
		//解析dom中的属性
		this.getDomAttr(rs,rs.attributes);

		//不是 b-bind-obj 或 b-bind-array 处理子元素
		if(!(rs.nodeName=='B-BIND-OBJ' || rs.nodeName == 'B-BIND-ARRAY')){
			this.getChildren(rs);
		}
	}

	//处理属性的赋值
	getDomAttr(dom,attrs){
		let delAttr = [];
		for(let i=0,l=attrs.length;i<l;i++){
			let nodeValue = attrs[i].nodeValue,
				nodeName = attrs[i].nodeName,
				hasVar = this.getParamFromStr(nodeValue);

			if(hasVar.length != 0){
				if(nodeName.indexOf('data-') == 0){
					delAttr.push(nodeName);

					let param = hasVar[0],
						key = nodeName.substr(5),
						fun = new Function('rs','return '+param),
						saveFn = function(rs){
							// let obj = {};
							// obj[key] = fun(rs);
							// $(dom).data(obj);
							dom.bBIndObjData = fun(rs);
							let obj1= {};
							obj1[nodeName] = fun(rs);
							$(dom).attr(obj1);
						};

					this.saveParamForCatch(param,saveFn);

				}else{
					let fun = new Function('rs','return `'+nodeValue+'`'),
						param = hasVar[0],
						saveFn = function(rs){
							let obj = {};
							obj[nodeName] = fun(rs);
							$(dom).attr(obj);
						};
					this.saveParamForCatch(param,saveFn);
				}
			}

		}

		delAttr.map(rs=>{
			$(dom).removeAttr(rs);
		})
	}

	//处理子元素
	getChildren(dom){
		let childs = dom.childNodes;

		for(let i=0,l=childs.length;i<l;i++){
			let child = childs[i],
				type = child.nodeType,
				value = child.nodeValue;

			// console.log(child)
			if(type==3){
				//文本
				let hasVar = this.getParamFromStr(value);
				if(hasVar.length != 0){
					let fun = new Function('rs','return `'+value+'`'),
						param = hasVar[0],
						saveFn = function(rs){
							child.nodeValue = fun(rs);
						};
					this.saveParamForCatch(param,saveFn);
				}
			}else if(type==1){
				//dom
				this.checkDom(child);
			}
		}

	}

	//获取字符中的${}中的值
	getParamFromStr(str){
		let val = str.match(/\$\{(.+?)\}/g)??[],
			backData = [];
		val.map(rs=>{
			let text = rs.match(/\$\{(.+?)\}/)[1];
			backData.push(text);
		});

		return backData;
	}

	//缓存变量及方法
	saveParamForCatch(param,fn){
		param = param.split('.');
		param = param[1]??'not_fond';

		if(!this.paramCatch[param]){
			this.paramCatch[param] = [];
		}
		this.paramCatch[param].push(fn);
	}



	set data(data){
		data = this.addProxy(data);

		let catchFn = this.paramCatch;

		for(let [key,val] of Object.entries(data)){
			if(catchFn[key]){
				catchFn[key].map(fn=>{
					fn(data);
				})
			}
		}
	}

}



if(!customElements.get('b-bind-obj')){
	customElements.define('b-bind-obj', bBindObj );
}


