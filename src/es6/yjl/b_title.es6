


let addStyleFile = require('../customElement/fn/addStyleFile'),
	addStyleText = require('../customElement/fn/addStyleText');


class bTitle extends HTMLElement{
	constructor() {
		super();

		this.body = null;

		//创建shadow容器
		this.shadow = this.attachShadow({mode: 'open'});

		//挂载css
		let all = addStyleFile('../res/css/all.css');
		this.shadow.appendChild(all);

		this.createStyle();
		let style = addStyleText(this.cssText);
		this.shadow.appendChild(style);

		this.name = $(this).attr('name') || '';

		//创建dom
		this.createElement();
		this.userClickFn = function(){};

		this.shadow.appendChild(this.body.get(0));
	}

	createElement(){
		let body = $('<div class="body box_hcc"></div>'),
			titleName = $('<div class="titleName">'+this.name+'</div>'),
			btnBody = $('<div class="boxflex1 box_hrc"></div>'),
			btn = $('<div class="btn hover box_hcc"></div>'),
			openDiv = $('<div class="openDiv box_scc"></div>'),
			openDivList = $('<div class="openDivList box_hlc"></div>');

		body.append(titleName).append(btnBody);

		this.openDiv = openDiv;
		this.openList = openDivList;
		this.btnBody = btnBody;
		this.btn = btn;
		this.body = body;
	}
	createStyle(){
		let css = [
			'.body{min-width:1000px;max-width:1600px;width:100%;height:40px;padding:0 20px;background:#ecf1f9;font-size:14px;color:#333;}',
			'.titleName{width:400px;font-weight:bold;}',
			'.btn{color:#3f68ef; font-size:14px; height:40px; padding:0 10px; position:relative;}',
			'.openDiv{position:absolute;left:0;top:35px;width:120%;background:#fff;box-shadow:0 0 2px #ccc;padding:5px 0;}',
			'.openDivList{height:20px; width:80%; cursor:pointer; margin:0 auto; padding-left:6px; line-height:20px; color:#333; font-size:12px; margin:2px 0;}',
			'.openDivList:hover{background:#3f68ef;color:#fff;}'
		];

		this.cssText = css.join('');
	}


	set btnData(data){
		data = data || [];

		let body = this.btnBody,
			item = this.btn,
			_this = this;

		data.map(rs=>{
			let _item = item.clone().text(rs.name).attr({type:rs.type});

			if(rs.children && rs.children.length !=0){
				_item.removeClass('hover');
				_this.addHoverEvent(_item,rs.children);
			}else{
				_this.addClickEvent(_item);
			}

			body.append(_item);
		});
	}

	addHoverEvent(_item,data){
		//生成2级菜单
		let body = this.openDiv.clone().addClass('hidden'),
			list = this.openList;
		data.map(rs=>{
			let _list = list.clone().text(rs.name).attr({type:rs.type});
			this.addClickEvent(_list);
			body.append(_list);
		});

		_item.append(body);

		_item.hover(function(){
			body.removeClass('hidden');
		},function(){
			body.addClass('hidden');
		})

	}

	addClickEvent(_item){
		let _this = this;
		_item.click(function(){
			let type = $(this).attr('type');
			_this.userClickFn(type);
		});
	}

	set clickFn(fn){
		fn = fn || function(){};
		this.userClickFn = fn;
	}

}



if(!customElements.get('b-title')){
	customElements.define('b-title', bTitle );
}


