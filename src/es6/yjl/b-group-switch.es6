
//设置中组 开关



require('../customElement/pc/input_search');
require('../customElement/phone/b_switch');



let addStyleFile = require('../customElement/fn/addStyleFile'),
	addStyleText = require('../customElement/fn/addStyleText');



class bGroupSwitch extends HTMLElement{
	//元素加入页面回调
	connectedCallback() {

	}

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
		this.userClick = function(){};
		//创建dom
		this.createElement();

		this.shadow.appendChild(this.body.get(0));

		this.bindEvent();
	}

	createElement(){
		let body = $('<div class="body box_sct"></div>'),
			main = $('<div class="main"></div>'),
			title = $('<div class="title box_hlc">'+this.name+'</div>'),
			list = $('<div class="list box_slc"></div>'),
			btn = $('<div class="btn box_hcc gray">提交</div>'),
			item = $('<div class="item box_hlc"></div>');

		main.append(title).append(list);
		body.append(main).append(btn);

		this.listBody = list;
		this.btn = btn;
		this.item = item;
		this.body = body;
	}
	createStyle(){
		let css = [
			'.body{width:100%; padding:20px; box-sizing:border-box;}',
			'.main{width:100%; font-size:14px; color:#333;border:1px solid #ccc;}',
			'.title{width:100%; height:40px; padding-left:20px;background:#eee;font-weight:bold}',
			'.list{width:100%;}',
			'.item{width:100%; border-top:1px solid #eee; padding:5px 30px;}',
			'.item b-switch{display:block; width:60px; height:24px; padding-left:20px;}',
			'.btn{width:60%;height:34px; background:#5576f0;color:#fff;margin-top:20px;}',
			'.gray{background:#eee;}'
		];

		this.cssText = css.join('');
	}

	bindEvent(){
		let _this = this;
		this.btn.click(async function(){
			if($(this).hasClass('gray')){return;}

			let item = _this.listBody.find('.item'),
				backData = [];

			for(let i=0,l=item.length;i<l;i++){
				let _item = item.eq(i),
					data = _item.data('data'),
					_input = _item.find('b-input-search').get(0),
					_switch = _item.find('b-switch').get(0);

				let val = await _input.checkPass(),
					checked = _switch.val;
				data.value = val;
				data.selected = checked;
				backData.push(data);
			}

			_this.userClick(backData);

		});
	}

	set data(data){
		data = data || [];
		let body = this.listBody,
			item = this.item,
			_this = this;

		if(data.length == 0){
			this.btn.css({display:'none'});
		}
		data.map(rs=>{
			let _item = item.clone(),
				_input = $(`<b-input-search rule="must,number" class="boxflex1" name="${rs.name}" key="${rs.key}" unit="天" err="天数必须为正整数"></b-input-search>`).get(0),
				_switch = $(`<b-switch></b-switch>`).get(0);

			_input.nameStyle = {width:'130px',fontSize:'12px'}
			_input.value = rs.value || 0;
			_switch.val = rs.selected;
			_switch.checkBgColor = '#5576f0';

			_item.data({data:rs});
			_item.append(_input).append(_switch);

			_input.inputFn = function(){
				_this.btn.removeClass('gray').addClass('hover');
			};
			_switch.changeFn = function(val){
				_this.btn.removeClass('gray').addClass('hover');
			}

			body.append(_item);
		})
	}

	set click(fn){
		fn = fn || function(){};
		this.userClick = fn;
	}
}



if(!customElements.get('b-group-switch')){
	customElements.define('b-group-switch', bGroupSwitch );
}

