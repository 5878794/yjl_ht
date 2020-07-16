
//设置中组 开关



require('../customElement/pc/input');
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
		//创建dom
		this.createElement();

		this.shadow.appendChild(this.body.get(0));
	}

	createElement(){
		let body = $('<div class="body box_hlt" style="display: none;"></div>'),
			main = $('<div></div>'),
			title = $('<div></div>'),
			list = $('<div></div>'),
			btn = $('<div></div>'),
			item = $('<div></div>');

		main.append(title).append(list);
		body.append(main).append(btn);

		this.moreBtn = more;
		this.inputBody = inputBody;
		this.searchBtn = searchBtn;
		this.body = body;
	}
	createStyle(){
		let css = [
			'.body{min-width:980px;max-width:1600px;width:100%;}',
			'.searchBtn{border-radius:5px;width:60px;height:42px;margin:5px 0;background-color:#5576f0;background-image:url('+searchImgSrc+');background-repeat:no-repeat;background-position:center center;background-size:20px 20px;}',
			'.btnBody{width:60px;}',
			'.more{font-size:12px;padding-right:20px;position:relative;color:#909192;}',
			'.more:after{content:"";display:block;position:absolute;right:0;top:50%;width:16px;height:16px;margin-top:-6px;background:url('+arrowImgSrc+') no-repeat center center;background-size:100%;}',
			'.hideMore:after{transform:rotate(180deg);margin-top:-11px;}',
			'b-input,b-input-date{width:30%;}'
		];

		this.cssText = css.join('');
	}



}



if(!customElements.get('b-group-switch')){
	customElements.define('b-group-switch', bGroupSwitch );
}

