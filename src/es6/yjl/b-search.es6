

require('../customElement/pc/input');
require('../customElement/pc/input_date');



let addStyleFile = require('../customElement/fn/addStyleFile'),
	addStyleText = require('../customElement/fn/addStyleText');

let searchImgSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAC30lEQVRYhcWXTUhUURTHf06EORr5ASVI+VGBBWltEooI+oKCaBFU0MKidUUEhdoiSDDIhdWmVe6CPgiSCnIjRLmSkGIKgkBdBFIo2AeZ4r/Fe296Hu84b8Y39YfDcA7nnvd7992599wiSeSoGqARaAJqgQQwAqSAD8BYrgXTkhTFaiR1SRpWdqUk3ZDUELF22rIlJCV1S/oVAcKl25Iq44DZK2ksT4iwxiUdiQJTJPeaOQX0OuKzwBNgCBgERgEB64AWYDtwGChxjL0A9OS6Zs5keMPrkqojvGGlpHZJc44a5xYbawMtjgJDkhqjTLOxBkmDjnoHosCUSJowA5/nAWHtvqk5K6k8G0y3GZSKASQwO0N3XXnBAi4HvgLLQsupGhhfdMFF10pg0tSvx9ss00r4v2dN4rUYQQC+AZdM7LxNCmZmGGj2YzNAEu9vHKcSPlTS90eBOptQFQIBeFYAEIA54EXIrwU2WZgtZtDrAoAEemD8Qxam0SS8KSDMkPHXWJgakzBSQJhp4yfDTgLvbPlfmvfsBPDZJNQV8OHFxv9pYT6ahK0FhNlm/C8W5q1J2FlAmOPGfxp2XJveNF4/EvdaKsLb9Ep9fwTvSEgrOA4eh2LFQHvMIOAdOaUhv88mBDNTgff9wudTFTARE8gKYApYHoptAD6Fk4KZmQRumgIDMYEA9BuQXgsCzOtnkpKmTN/RF0Mv89DUnJFUka25QtIOLdQrSRvzgFgr6aWj3v5MY1zBVkcBSbqsaHegMnmN929HjZwa8sBOZwD6LumRpJOSmiXV+tYk6YS8ftf20YHa/Nq7JPVIOhoVBkn75F3Alqop/b3E2WXQERUGSau0sFHPRXckrQ7Vu+fISQNFXYzrJV2V9C4CQEpSp6TNjjoHM4y5ImW+3i6memA30ACU+bEfeD3tgHP/mK8OoNMRb13qHpKvtTlmpz/hIPwX6gIumlhfPp8pTh0D9gDvgVt/APlVQaPE1o3oAAAAAElFTkSuQmCC';


class bSearch extends HTMLElement{
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

		//创建dom
		this.createElement();

		this.shadow.appendChild(this.body.get(0));
	}

	createElement(){
		let body = $('<div class="body box_hcc"></div>'),
			inputBody= $('<div class="boxflex1 box_hcc box_lines"></div>'),
			searchBtn = $('<div class="searchBtn"></div>');

		body.append(inputBody).append(searchBtn);

		this.inputBody = inputBody;
		this.searchBtn = searchBtn;
		this.body = body;
	}
	createStyle(){
		let css = [
			'.body{min-width:1000px;max-width:1600px;width:100%;}',
			'.searchBtn{width:80px;height:60px;background-color:#5576f0;background-image:url('+searchImgSrc+');background-repeat:no-repeat;background-position:center center;background-size:20px 20px;}'
		];

		this.cssText = css.join('');
	}

	set inputData(data){
		data = data || [];

		data.map(rs=>{

		})
	}




}



if(!customElements.get('b-search')){
	customElements.define('b-search', bSearch );
}

