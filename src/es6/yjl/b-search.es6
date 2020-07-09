
//search 模块

//html:
// b-search(id='b_search')

//js：
// let search = $('#b_search').get(0);
// search.inputData = [
// 	{name:'名字查询:',type:'text',id:'a1'},
// 	{name:'公司非:',type:'select',id:'a2',data:[{name:'t1',value:'1'},{name:'t2',value:'2'}]},
// 	{name:'时间:',type:'date',id:'a3'},
// 	{name:'日期:',type:'assDate',id:['a4','a5']},
// 	// {name:'',type:'search',id:'a6'}      //会占用整行，需要单独使用，有它无其它
// ];
// search.clickFn = function(rs){
// 	console.log(rs);    //返回 对应的 {id:value,...}
// }



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

		this.userClickFn = function(){};

		//创建dom
		this.createElement();


		this.shadow.appendChild(this.body.get(0));
	}

	createElement(){
		let body = $('<div class="body box_hlt"></div>'),
			inputBody= $('<div class="boxflex1 box_hlt box_lines"></div>'),
			searchBtn = $('<div class="searchBtn hover"></div>');

		body.append(inputBody).append(searchBtn);

		this.inputBody = inputBody;
		this.searchBtn = searchBtn;
		this.body = body;
	}
	createStyle(){
		let css = [
			'.body{min-width:1000px;max-width:1600px;width:100%;}',
			'.searchBtn{border-radius:5px;width:60px;height:42px;margin:5px 0;background-color:#5576f0;background-image:url('+searchImgSrc+');background-repeat:no-repeat;background-position:center center;background-size:20px 20px;}',
			'b-input,b-input-date{width:30%;}'
		];

		this.cssText = css.join('');
	}

	set inputData(data){
		data = data || [];

		let body = this.inputBody;

		data.map(rs=>{
			this.createInputs(rs,body);
		});

		this.addSearchEvent();
	}

	createInputs(rs,body){
		let type = rs.type,
			input = null;
		switch (type) {
			case 'search':
				input = `<b-input type="text" name="${rs.name}" key="${rs.id}"></b-input>`;
				input = $(input).get(0);
				body.append(input);
				$(input).css({width:'100%'});
				this.setInputStyle(input,rs.type);
				break;
			case 'text':
				input = `<b-input type="text" name="${rs.name}" key="${rs.id}"></b-input>`;
				input = $(input).get(0);
				body.append(input);
				this.setInputStyle(input,rs.type);
				break;
			case 'select':
				input = `<b-input type="select" name="${rs.name}" key="${rs.id}" placeholder="全部"></b-input>`;
				input = $(input).get(0);
				input.selectData = rs.data;
				body.append(input);
				this.setInputStyle(input,rs.type);
				break;
			case 'date':
				input = `<b-input-date type="date" name="${rs.name}" key="${rs.id}"></b-input-date>`;
				input = $(input).get(0);
				body.append(input);
				this.setInputStyle(input,rs.type);
				break;
			case 'assDate':
				input = `<b-input-date type="date" name="${rs.name}" key="${rs.id[0]}"></b-input-date>`;
				let input1 = `<b-input-date type="date" name="—" key="${rs.id[1]}"></b-input-date>`;
				input = $(input).get(0);
				input1 = $(input1).get(0);
				body.append(input).append(input1);
				this.setInputStyle(input,rs.type);
				this.setInputStyle(input1,rs.type);

				input1.nameStyle = {paddingRight:'20px',width:'40px','justify-content':'center'};
				input1.rowStyle = { 'padding-left': 0 };

				input.changeFn = function(val){
					input1.min = val;
				}
				input1.changeFn = function(val){
					input.max = val;
				}

				break;
			default:
				break;
		}

	}

	addSearchEvent(){
		let _this = this;
		this.searchBtn.click(function(){
			let input = _this.body.find('b-input'),
				date = _this.body.find('b-input-date'),
				backData = {};

			input.each(function(){
				let key = this.key,
					value = this.value;
				backData[key] = value;
			});
			date.each(function(){
				let key = this.key,
					value = this.value;
				backData[key] = value;
			});

			_this.userClickFn(backData);
		});
	}

	setInputStyle(dom,type){
		dom.rowHeight = 40;
		dom.nameStyle = {
			width:'82px',
			lineHeight:'20px',
			overflow:'hidden',
			display: 'flex',
			'flex-direction':'row',
			'align-items':'center',
			'justify-content':'flex-end'
		};


		if(type=='search'){
			dom.nameStyle = {width:'auto'};
			dom.rowStyle = {'margin':'5px 0'};
			dom.inputBodyStyle = {'border-radius':'5px 0 0 5px'};
			this.searchBtn.css({
				'border-radius':'0 5px 5px 0'
			})
		}else{
			dom.rowStyle = {'padding':'0 20px','margin':'5px 0'};
			dom.inputBodyStyle = {'border-radius':'5px'};
		}
	}


	set clickFn(fn){
		fn = fn || function(){};
		this.userClickFn = fn;
	}


}



if(!customElements.get('b-search')){
	customElements.define('b-search', bSearch );
}

