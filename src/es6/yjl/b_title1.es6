
//标题
// html:
// 	    b-title1(
// 	        id='b_title'
// 	        name='测试'           //标题名称
//          hasDel='true'        //是否带删除按钮
// 	    )
//
//
// let title = $('#b_title').get(0);
// title.clickFn = function(obj){                          //按钮点击事件
// 	console.log(this)                                      //返回该对象实例
// };





let addStyleFile = require('../customElement/fn/addStyleFile'),
	addStyleText = require('../customElement/fn/addStyleText');


class bTitle1 extends HTMLElement{
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
		this.hasDel = ($(this).attr('hasDel') == 'true');
		this.nameStyle = $(this).attr('nameStyle') || '';

		//创建dom
		this.createElement();
		this.userClickFn = function(){};

		this.shadow.appendChild(this.body.get(0));

		if(this.nameStyle){
			let style = this.nameStyle.split(';');
			let newStyle = {};
			style.map(rs=>{
				rs = rs.split(':');
				newStyle[rs[0]] = rs[1];
			});
			console.log(newStyle)
			this.titleName.css(newStyle);
		}
	}

	createElement(){
		let body = $('<div class="body box_hcc"></div>'),
			titleName = $('<div class="titleName">'+this.name+'</div>'),
			btnBody = $('<div class="boxflex1 box_hrc"></div>'),
			btn = $('<div class="btn hover box_hcc">删除</div>');

		body.append(titleName).append(btnBody);


		this.titleName = titleName;
		this.btnBody = btnBody;
		this.btn = btn;
		this.body = body;

		if(this.hasDel){
			btnBody.append(btn);
			this.addClickEvent(btn);
		}

	}
	createStyle(){
		let css = [
			'.body{margin:10px 0 0 0;min-width:1000px;max-width:1600px;width:100%;height:30px;padding:0 20px;font-size:14px;color:#333;}',
			'.titleName{width:400px;font-weight:bold;}',
			'.btn{color:#3f68ef; font-size:14px; height:40px; padding:0 10px; position:relative; color:#c15356;}'
		];

		this.cssText = css.join('');
	}



	addClickEvent(_item){
		let _this = this;
		_item.click(function(){
			_this.userClickFn(_this);
		});
	}

	set clickFn(fn){
		fn = fn || function(){};
		this.userClickFn = fn;
	}

}



if(!customElements.get('b-title1')){
	customElements.define('b-title1', bTitle1 );
}


