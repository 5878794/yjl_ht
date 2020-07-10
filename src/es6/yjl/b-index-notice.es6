

let lib = require('../lib');


let addStyleFile = require('../customElement/fn/addStyleFile'),
	addStyleText = require('../customElement/fn/addStyleText');



class bIndexNotice extends HTMLElement{
	//元素加入页面回调
	connectedCallback() {
		let _this = this;
		setTimeout(function(){
			_this.body.css({display:'flex'});
		},0)

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


		//创建dom
		this.createElement();

		this.shadow.appendChild(this.body.get(0));
	}



	createElement(){
		let body = $('<div class="notice box_hlc" style="display: none;"></div>'),
			img = $('<img src="./image/notice.png"/>'),
			p = $('<p>信息播报：</p>'),
			scrollBody = $('<div class="boxflex1 notice_main"></div>'),
			scrollDiv = $('<div class="notice_scroller box_hlc"></div>'),
			list = $('<span>恭喜 "打的费"开单......</span>');

		body.append(img).append(p).append(scrollBody);
		scrollBody.append(scrollDiv);

		this.scrollDiv = scrollDiv;
		this.item = list;
		this.body = body;
	}
	createStyle(){
		let css = [
			'.notice{padding:0 20px;height: 50px;background: #fff;}',
			'.notice img{display: block;width: 24px;height: 20px;margin-right: 10px;}',
			'.notice p{font-size: 14px; color: #000000; font-weight: bold;}',
			'.notice_main{position: relative;overflow: hidden;height: 50px;}',
			'.notice_scroller{position: absolute;left:0; top:0;height: 50px;}',
			'.notice_scroller spanpadding:0 20px;font-size: 12px;}'
		];


		this.cssText = css.join('');
	}



}



if(!customElements.get('b-index-notice')){
	customElements.define('b-index-notice', bIndexNotice );
}


