


//==========================================================
//input控件
// b-input(type='text')
// b-input(type='password')
// b-input(type='yzm')
// b-input(type='select')
// b-input(type='textarea')
// b-input(type='tel')
//==========================================================

// html
	// b-input(name='名字:'           //输入框前面的标题。 如空不显示标题。
		// key='aa'                  //服务器对应的key
		// placeholder='测试。。。'    //提示文字
		// rule='must,min:6'         //验证规则
		// type='text'               //输入框类型
		// err='错。。。'              //验证错误显示提示信息
		// icon='./image/aa.jpg'      //输入框前面图标地址，及大小  如空不显示icon
		// unit='m'					// 输入框后面显示单位
		// iconWidth=20
		// iconHeight=20
		// autoHeight=true          //textarea独有，是否自动增高输入框高度
		// disabled=disabled          //是否可编辑
	// )


// js
	// 	var input = $('b-input').eq(0).get(0);
	// 	input.inputStyle = {color:'red'};   //设置样式
	// 	input.nameStyle = {color:'red'};
	// 	input.inputBodyStyle = {color:'red'};
	// 	input.rowStyle = {color:'red'};
	// 	input.errStyle ={color:'red'};
	//	input.unitStyle={color:'red'};

	//  input.nameWidth = 100;  //获取或设置标题字段的宽度   get、set
	//  input.rowHeight = 30;   //获取或设置行高  get、set
	//  input.selectData = [{name:'',value:''}];  //type=select时，设置下拉菜单选项
	//  input.value = '';       //获取或设置对象的值   get、set
	//  input.key;              //获取设置的key的值。
	//  input.disabled = true;  //设置input是否可用 true/false
	//  input.styleText = '.a{color:red;}';  //添加style文本进入内部


	//  input.checkPass();      //input检查 返回 promise对象 。 错误时会显示errDom提示
	//通过返回该控件的value
	//失败返回  {msg:'err',dom:this}




let addStyleFile = require('../fn/addStyleFile');
require('../../lib/jq/extend');
require('../../lib/jq/check_from');


let createDom = Symbol(),
	paramCheck = Symbol(),
	createInputCss = Symbol(),
	addEvent = Symbol(),
	createInput = Symbol.for('createInput');


let createInputDom = {
	text(type,placeholder,rule){
		return $(`<input autocomplete="off" class="boxflex1 __input__" type="${type}" placeholder="${placeholder}" data-rule="${rule}" />`);
	},
	select(placeholder,rule){
		let selectInput = $(`<select class="boxflex1 __input__" data-rule="${rule}" />`);
		if(placeholder){
			selectInput.append('<option value="">'+placeholder+'</option>');
		}

		selectInput.css({
			width:'100%',
			paddingRight:'30px',
			'-webkit-appearance': 'none'
		});

		return selectInput;
	},
	textarea(placeholder,rule){
		return $(`<textarea autocomplete="off" class="boxflex1 __input__ __textarea__" placeholder="${placeholder}" data-rule="${rule}"></textarea>`);
	},
	yzm(placeholder,rule){
		return $(`<input autocomplete="off" class="boxflex1 __input__" type="text" placeholder="${placeholder}" data-rule="${rule}" />`);
	}
};

$.fn.autoHeight = function(){
	function autoHeight(elem){
		elem.style.height = 'auto';
		elem.scrollTop = 0; //防抖动
		elem.style.height = elem.scrollHeight + 'px';
	}
	this.each(function(){
		autoHeight(this);
		$(this).on('keyup', function(){
			autoHeight(this);
		});
	});
};


class bInput extends HTMLElement{
	//元素加入页面回调
	connectedCallback() {
		//挂载css
		let all = addStyleFile('../res/css/all.css');
		this.shadow.appendChild(all);
	}

	constructor() {
		super();

		this.body = null;
		this.rowDom = null;
		this.nameDom = null;
		this.inputBodyDom = null;

		//控件类型
		this.type = $(this).attr('type') || 'text';
		//设置key
		this.serverKey = $(this).attr('key') || '';
		//
		this.placeholder = $(this).attr('placeholder') || '';
		//验证规则
		this.rule = $(this).attr('rule') || '';
		//出错提示文字
		this.err = $(this).attr('err') || '';
		//要显示的标题  为空不显示
		this.name = $(this).attr('name') || '';
		//input的icon
		this.inputIcon = $(this).attr('icon') || '';
		//icon的宽度
		this.inputIconWidth = parseInt($(this).attr('iconWidth')) || 20;
		this.inputIconHeight = parseInt($(this).attr('iconHeight')) || 20;
		//textarea 是否自动增加高度
		this.autoHeight = ($(this).attr('autoHeight') == 'true');
		//输入框单位显示
		this.unit = $(this).attr('unit') || '';
		//初始值
		this.setValue = $(this).attr('value') || '';

		//生成的input的样式缓存
		this.inputCss = {};
		this.textareaCss = {};

		this.userSetChangeFn = function(){};
		this.userSetChangeFn1 = function(){};
		this.childSelectSetValueFn = function(){};

		//input附加style
		this.userStyle = {
			// inputStyle:{},
			// nameStyle:{},
			// inputBodyStyle:{},
			// errStyle:{},
			nameWidth:100,      //标题字段宽度
			rowHeight:30        //行高
		};
		this.setSelectListNumber = 0;

		//创建shadow容器
		this.shadow = this.attachShadow({mode: 'open'});


		this[createDom]();
		this[createInputCss]();
		this[paramCheck]();
		this[createInput](this.type);
		this.inputBodyDom.append(this.unitDom);
		this.shadow.appendChild(this.body.get(0));

		if(this.type == 'file'){
			this.unitDom.addClass('hidden');
		}

		if($(this).attr('disabled') == 'disabled'){
			this.disabled = true;
		}

		let notUseFocusCss = ($(this).attr('noFocus') == 'yes')? true : false;
		this[addEvent](notUseFocusCss);


		//赋值初始值
		if(this.setValue){
			this.value = this.setValue;
		}
	}


	//创建dom
	[createDom](){
		$(this).css({display:'block'});

		let dom = $('<div class="box_slt"></div>'),
			inputBody = $('<div class="box_hlt"></div>'),
			name = $('<div>'+this.name+'</div>'),
			unit = $('<div>'+this.unit+'</div>'),
			error = $('<div class="__input_error__">'+this.err+'</div>'),
			inputDom = $('<div class="boxflex1 box_hlc"></div>');

		dom.append(inputBody).append(error);
		inputBody.append(name).append(inputDom);


		name.css({
			width:this.userStyle.nameWidth+'px',
			height:this.userStyle.rowHeight+'px',
			lineHeight:this.userStyle.rowHeight+'px',
			paddingRight:'10px'
		});
		if(this.name.indexOf('<br')>-1){
			name.css({
				lineHeight: this.userStyle.rowHeight / 2 + 'px'
			})
		}

		inputBody.css({
			width:'100%'
		});
		error.css({
			paddingLeft:this.userStyle.nameWidth+'px',
			color:'red',
			fontSize:'12px',
			display:'none'
		});
		inputDom.css({
			border:'1px solid #ccc',
			padding:'0 10px'
		});
		unit.css({
			paddingLeft:'5px'
		});

		this.unitDom = unit;
		this.body = dom;
		this.rowDom = inputBody;
		this.nameDom = name;
		this.inputBodyDom = inputDom;
		this.errDom = error;
	}

	//参数判断及应用
	[paramCheck](){
		//判断是否有标题
		if(!this.name){
			this.nameDom.css({display:'none'});
		}

		//判断是否有图标
		if(this.inputIcon){
			let paddingLeft = this.inputIconWidth+20;
			this.inputBodyDom.css({
				paddingLeft:paddingLeft+'px',
				background:'url('+this.inputIcon+') no-repeat 10px center',
				backgroundSize:this.inputIconWidth+'px '+this.inputIconHeight+'px'
			})
		}
	}

	//生成input的 样式
	[createInputCss](){
		this.inputCss = {
			display:'block',
			width:'100%',
			height:this.userStyle.rowHeight+'px',
			lineHeight:this.userStyle.rowHeight+'px',
			background:'none',
			border:'none',
			fontSize:'12px'
		};

		this.textareaCss = {
			display:'block',
			height:this.userStyle.rowHeight*3+'px',
			lineHeight:'120%',
			background:'none',
			border:'none',
			padding:'10px 0',
			fontSize:'12px'
		};
	}

	//创建input
	[createInput](type){
		switch (type) {
			case 'tel':
				// let textInput = createInputDom.text(this.type,this.placeholder,this.rule);
				// textInput.css(this.inputCss);
				// this.inputBodyDom.append(textInput);
				// break;
			case 'text':
				let textInput = createInputDom.text(this.type,this.placeholder,this.rule);
				textInput.css(this.inputCss);
				this.inputBodyDom.append(textInput);
				break;
			case 'password':
				let passInput = createInputDom.text(this.type,this.placeholder,this.rule);
				passInput.css(this.inputCss);
				this.inputBodyDom.append(passInput);
				break;
			case 'select':
				let selectInput = createInputDom.select(this.placeholder,this.rule);
				selectInput.css(this.inputCss);

				//修正select本身文字有4像素右偏
				let select_padding_left = parseInt(this.inputBodyDom.css('paddingLeft'))-4;
				this.inputBodyDom.css({paddingLeft:select_padding_left+'px'});

				//由于样式已使用默认样式，去掉咯右边的箭头，需要自己添加
				let div = $('<div></div>');
				div.css({
					width: 0,
					height: 0,
					'border-left':'4px solid transparent',
					'border-right': '4px solid transparent',
					'border-top': '6px solid #000',
					position:'absolute',
					right:'10px',
					top:'50%',
					'margin-top':'-3px'
				});
				this.inputBodyDom.css({
					position:'relative',
					'padding-right':'0px'
				}).append(div);


				this.inputBodyDom.append(selectInput);
				break;
			case 'textarea':
				let textarea = createInputDom.textarea(this.placeholder,this.rule);
				textarea.css(this.textareaCss);
				this.inputBodyDom.append(textarea);


				if(this.autoHeight){
					textarea.css({
						minHeight:this.rowHeight*3+'px',
						overflow:'hidden',
						resize:'none'
					});
					$(textarea).autoHeight();
				}
				break;
			case 'yzm':
				let yzm = createInputDom.yzm(this.placeholder,this.rule);
				yzm.css(this.inputCss);
				this.inputBodyDom.append(yzm);

				let img = $('<img src="#">');
				img.css({
					display:'block',
					marginLeft:'10px'
				})
				this.inputBodyDom.append(img);
				break;

			default:
				console.log(`%c b-input 没有 ${type} 类型。`,'color:red;')
				break;
		}
	}

	//事件监听
	[addEvent](notUseFocusCss){
		let _this = this,
			childId = $(this).data('child');
		this.body.find('input').each(function(){
			this.addEventListener('input',function(){
				_this.userSetChangeFn(_this.value,childId);
				_this.userSetChangeFn1(_this.value);
			},false);
			if(!notUseFocusCss){
				this.addEventListener('focus',function(){
					_this.inputBodyDom.css({border:'1px solid blue'});
				},false)
				this.addEventListener('blur',function(){
					_this.inputBodyDom.css({border:'1px solid rgb(204,204,204)'});
				},false)
			}
		});
		this.body.find('select').each(function(){
			this.addEventListener('change',function(){
				_this.userSetChangeFn(_this.value,childId);
			},false);
		});
		this.body.find('textarea').each(function(){
			this.addEventListener('input',function(){
				_this.userSetChangeFn(_this.value,childId);
				_this.userSetChangeFn1(_this.value);
			},false);
			if(!notUseFocusCss){
				this.addEventListener('focus',function(){
					_this.inputBodyDom.css({border:'1px solid blue'});
				},false)
				this.addEventListener('blur',function(){
					_this.inputBodyDom.css({border:'1px solid rgb(204,204,204)'});
				},false)
			}
		});


	}


	//附加style    eg:{color:'red'}
	set inputStyle(style){
		this.inputBodyDom.find('.__input__').css(style);
	}
	set nameStyle(style){
		this.nameDom.css(style);
	}
	set unitStyle(style){
		this.unitDom.css(style);
	}
	set inputBodyStyle(style){
		this.inputBodyDom.css(style);
	}
	set rowStyle(style){
		this.rowDom.css(style);
	}
	set errStyle(style){
		this.errDom.css(style);
	}
	set nameWidth(width){
		width = (width)? parseInt(width) : 0;
		this.userStyle.nameWidth = width;
		this.nameDom.css({width:width+'px'});
		this.errDom.css({paddingLeft:width+'px'});
	}
	get nameWidth(){
		return this.userStyle.nameWidth;
	}

	//外层dom有border 因此整体高度要多2像素
	set rowHeight(height){
		height = (height)? parseInt(height) : 0;
		this.userStyle.rowHeight = height;
		this.nameDom.css({
			height:height+'px',
			lineHeight:height+'px'
		});
		this.body.find('.__input__').css({
			height:height+'px',
			lineHeight:height+'px'
		});
		this.body.find('.__textarea__').css({
			height:height*3+'px',
			minHeight:height*3+'px',
			lineHeight:'120%'
		});

		if(this.name.indexOf('<br')>-1){
			this.nameDom.css({
				lineHeight: height / 2 + 'px'
			})
		}
	}
	//外层dom有border 因此整体高度要比获取多值多2像素
	get rowHeight(){
		return this.userStyle.rowHeight;
	}

	checkPass(){
		return new Promise((success,error)=>{
			this.errDom.css({display:'none'});


			if(this.body.checkFrom().errorDom.length == 0){
				success(this.value);
			}else{
				this.errDom.css({display:'block'});
				error({
					msg:$(this).attr('err'),
					dom:this
				});
			}
		})

	}

	//设置select的列表
	set selectData(data){
		let select = this.inputBodyDom.find('select');
		select.find('option').remove();
		data.map(rs=>{
			let dom = $(`<option value="${rs.value}">${rs.name}</option>`);
			dom.data({data:rs});
			select.append(dom);
		});
		let childId = $(this).data('child');
		this.userSetChangeFn(this.value,childId);

		this.setSelectListNumber = this.setSelectListNumber + 1;
		if(this.setSelectListNumber == this.traggerNumber){
			this.childSelectSetValueFn();
		}
	}

	//级联菜单的初始赋值
	childSelectSetValue(fn,number){
		fn = fn??function(){};
		number = number??3;
		//一般是第3次改变select的选择数组时触发
		//第一次 正常生成列表
		//第二次 正常设置初始值
		//第三次 列表跟随父级选择变化
		this.traggerNumber = number;
		this.childSelectSetValueFn = fn;
	}

	get value(){
		return this.body.find('.__input__').val();
	}

	set value(val){
		this.body.find('.__input__').val(val);

		let childId = $(this).data('child');
		this.userSetChangeFn(val,childId);
	}

	get key(){
		return this.serverKey;
	}

	set disabled(state){
		if(state){
			this.body.find('.__input__').attr({
				disabled:'disabled'
			});
			this.inputBodyDom.addClass('input_disabled');
		}else{
			this.body.find('.__input__').removeAttr('disabled');
			this.inputBodyDom.removeClass('input_disabled');
		}

	}

	set unitText(val){
		this.unitDom.text(val);
	}

	set nameText(val){
		this.nameDom.text(val);
	}

	//js设置值的时候会触发
	set change(fn){
		fn = fn || function(){};
		this.userSetChangeFn = fn;
	}

	//只是输入的时候触发
	set changeOnInput(fn){
		fn = fn || function(){};
		this.userSetChangeFn1 = fn;
	}

	set styleText(text){
		let style = document.createElement('style');
		style.rel = "stylesheet";
		style.innerHTML = text;

		this.shadow.appendChild(style);
	}

	focus(){
		this.inputBodyDom.css({border:'1px solid blue'});
		this.inputBodyDom.find('input').focus();
	}

}



if(!customElements.get('b-input')){
	customElements.define('b-input', bInput );
}


module.exports = bInput;


