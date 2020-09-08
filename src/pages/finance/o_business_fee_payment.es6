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

		await all.getUserInfo();
		let [data,history,money] = await ajax.send([
			api.order_get_byId({id:this.id}),
			api.order_get_history_byOrderNo({orderNo:this.orderNo}),
			api.finance_business_cost_info({orderNo:this.orderNo})
		]);
		await all.setOrderTopData(4,data);
		await all.setOrderHistoryData(history,true);

		this.bindData(money);
		this.addBtnEvent();

	},
	bindData(data){
		all.setFromVal($('#form'),data);


	},
	addBtnEvent(){
		let submit = $('#submit'),
			cancel = $('#cancel'),
			back = $('#back_submit'),
			_this = this;

		submit.click(function(){
			all.showLoadingRun(_this,'submitFn','1');
		});

		cancel.click(function(){
			qt.closeWin();
		});

		back.click(function(){
			qt.openPage(
				`../finance/o_payment_of_post_operation_fee.html?id=${_this.id}&orderNo=${_this.orderNo}&currentNodeKey=${_this.currentNodeKey}`,
				winSetting.o_payment_of_post_operation_fee.width,
				winSetting.o_payment_of_post_operation_fee.height)
		});
	},
	async submitFn(state){
		let form = await all.getFromVal($('#form')),
			uploaded = await all.uploadFile(form.attachUrls);

		form.attachUrls = uploaded.join(',');
		form.auditStatus = state;
		form.orderNo = this.orderNo;
		form.currentNodeKey = this.currentNodeKey;

		console.log(form);

		//TODO 不晓得接口调哪个

		// await ajax.send([
		// 	api.finance_pay_back_submit(form)
		// ]);
		// await qt.alert('提交成功！');
		// qt.closeWin();
	}

};


app.run(Page);