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

		this.addBtnEvent();
		await all.getUserInfo();


		let [data] = await ajax.send([
			api.finance_final_installment_info({orderNo:this.orderNo})
		]);

		all.setFromVal($('#form'),data);
		$('#total').text(moneyFormat(data.repaymentFeeTotal,5));


	},
	addBtnEvent(){
		let submit = $('#submit'),
			_this = this;

		submit.click(function(){
			all.showLoadingRun(_this,'submitFn','1');
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

		//TODO

		// await ajax.send([
		// 	api.finance_pay_back_submit(form)
		// ]);
		// await qt.alert('提交成功！');
		// qt.closeWin();
	}

};


app.run(Page);