

let addStyleFile = require('../customElement/fn/addStyleFile'),
	addStyleText = require('../customElement/fn/addStyleText');



class bOrderInfo extends HTMLElement{
	//元素加入页面回调
	connectedCallback() {
		//挂载css
		let all = addStyleFile('../res/css/all.css');
		this.shadow.appendChild(all);

		let style = addStyleText(this.cssText);
		this.shadow.appendChild(style);
	}

	constructor() {
		super();

		this.body = null;

		//创建shadow容器
		this.shadow = this.attachShadow({mode: 'open'});

		//创建dom
		this.createElement();
		this.createStyle();


		this.shadow.appendChild(this.body.get(0));


	}

	createElement(){
		let body = $('<div class="box_slt order_info"></div>'),
			row1 = $('<div class="box_hlc row1"></div>'),
			row2 = $('<div class="box_hlt row2"></div>'),
			row3 = $('<div class="box_hlc row3"></div>'),
			row1Cel1 = $('<div class="row1_cel1">7,000,000</div>'),
			row1Cel2 = $('<div class="box_slc row1_cel2"><p>房抵</p><span>f231231233123</span></div>'),
			row1Cel3 = $('<div class="row1_cel3 boxflex1">来自中介</div>'),
			row2Cel1 = $('<div class="box_slt row2_cel1"></div>'),
			row2Cel2 = $('<div class="row2_cel2"><p>中信银行-理财产品2</p><span>产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍</span></div>'),
			row2Cel1Row1 = $('<div class="box_hlc row2_cel1_row1"><span>姓名</span><div>12312312312</div><p class="boxflex1">510102322212322233</p></div>'),
			row2Cel1Row2 = $('<div class="row2_cel1_row2">地址地址地址地址地址地址地址地址地址地址地址地址地址地址</div>'),
			row3Cel1 = $('<div>待回款</div>'),
			row3Cel2 = $('<p class="boxflex1 hover">查看订单详情 >></p>');

		row3.append(row3Cel1).append(row3Cel2);
		row2Cel1.append(row2Cel1Row1).append(row2Cel1Row2)
				.append(row2Cel1Row1.clone()).append(row2Cel1Row2.clone())
				.append(row2Cel1Row1.clone()).append(row2Cel1Row2.clone());
		row2.append(row2Cel1).append(row2Cel2);
		row1.append(row1Cel1).append(row1Cel2).append(row1Cel3);
		body.append(row1).append(row2).append(row3);

		body.find('.row2_cel1_row2').eq(0).css({color:'#333'});
		this.body = body;
	}
	createStyle(){
		let css = [
			'.order_info{min-width:1000px;max-width:1600px;width:100%;}',
			'.row1,.row2,.row3{width:100%;}',
			'.row1,.row3{padding-bottom:20px;}',
			'.row2{padding-bottom:10px;}',
			'.row1_cel1{width:240px;color:#fdc429;font-size:30px;}',
			'.row1_cel2{width:200px;font-size:14px;color:#333;font-weight: bold;}',
			'.row1_cel2 span{font-size:12px;color:#ccc;}',
			'.row1_cel3{text-align:right;font-size:12px;color:#ccc;}',
			'.row3{font-size:16px; color:#0b8700;}',
			'.row3 p{text-align:right;font-size:12px;color:#333;}',
			'.row2_cel1{width:70%;font-size:12px;color:#999;line-height:14px;}',
			'.row2_cel1_row1:first-child{color:#333;}',
			'.row2_cel1_row2{padding-bottom:10px;}',
			'.row2_cel1_row1 span{width:120px;}',
			'.row2_cel1_row1 div{width:120px;}',
			'.row2_cel1_row1:first-child span{font-size:14px;}',
			'.row2_cel2{width:30%;font-size:14px;text-align:right;}',
			'.row2_cel2 p{font-weight: bold;}',
			'.row2_cel2 span{font-size:12px;color:#ccc;}'
		];

		this.cssText = css.join('');
	}



}



if(!customElements.get('b-order-info')){
	customElements.define('b-order-info', bOrderInfo );
}


