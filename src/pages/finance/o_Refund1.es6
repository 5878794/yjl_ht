let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	pageSizeSetting = require('./../../es6/pageSize'),
	getParamFromUrl = require('./../../es6/lib/fn/getParamFromUrl'),
	winSetting = require('./../../es6/winSetting'),
	tableSet = require('./../../es6/tableSetting'),
	selectData = require('./../../es6/selectData'),
	moneyFormat = require('./../../es6/lib/fn/number'),
	stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
	inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b_order_info');
require('./../../es6/yjl/b-order-history');
require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b_title1');
require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_money');
require('./../../es6/customElement/pc/input_date');
require('./../../es6/customElement/pc/input_file');



let Page = {
	init(){
		all.showLoadingRun(this,'run');
	},
	async run(){
		inputStyle.set(true,true);
		let param = getParamFromUrl();
		this.id = param.id;
		this.orderNo = param.orderNo;
		this.currentNodeKey = param.currentNodeKey;
		this.type = param.type;     //1：退款   2：退费用

		await all.getUserInfo();
		let [data,history] = await ajax.send([
			api.order_get_byId({id:this.id}),
			api.order_get_history_byOrderNo({orderNo:this.orderNo})
		]);
		await all.setOrderTopData(4,data);
		await all.setOrderHistoryData(history,true);

		let [data2] = await ajax.send([
			api.finance_refund_info({
				orderNo:this.orderNo,
				currentNodeKey:this.currentNodeKey
			})
		]);

		all.setFromVal($('#form'),data2);

		this.addBtnEvent();
	},
	addBtnEvent(){
		let submit = $('#submit'),
			back = $('#back'),
			cancel = $('#cancel'),
			_this = this;

		submit.click(function(){
			all.showLoadingRun(all,'reviewSubmit',{
				formDom:$('#submitForm'),
				orderNo:_this.orderNo,
				state:1,
				currentNodeKey:_this.currentNodeKey
			});
		});
		back.click(function(){
			all.showLoadingRun(all,'reviewSubmit',{
				formDom:$('#submitForm'),
				orderNo:_this.orderNo,
				state:0,
				currentNodeKey:_this.currentNodeKey
			});
		});
		cancel.click(function(){
			qt.closeWin();
		});
	}
	// ,
	// async submitFn(state){
	// 	let form = await all.getFromVal($('#form')),
	// 		uploaded = await all.uploadFile(form.attachUrls);
	//
	// 	form.attachUrls = uploaded.join(',');
	// 	form.auditStatus = state;
	// 	form.orderNo = this.orderNo;
	// 	form.currentNodeKey = this.currentNodeKey;
	//
	// 	delete form.bankName;
	// 	delete form.bankNo;
	// 	delete form.openBank;
	//
	// 	//退费类型 1-退尾款 2-退服务费
	// 	form.refundTypeKey = this.type;
	//
	// 	await ajax.send([
	// 		api.finance_refund_submit(form)
	// 	]);
	// 	await qt.alert('提交成功！');
	// 	qt.closeWin();
	//
	// }

};


app.run(Page);