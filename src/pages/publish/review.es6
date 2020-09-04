


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
require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b-order-history');
require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_file');



let Page = {
	init(){
		all.showLoadingRun(this,'run');
	},
	async run(){

		inputStyle.set(true,true);
		let param = getParamFromUrl();
		this.setTitle(param.title);
		this.id = param.id;
		this.orderNo = param.orderNo;
		this.currentNodeKey = param.currentNodeKey;

		if(window.location.href.indexOf('overSingle') > -1){
			$('#back').remove();
		}

		await all.getUserInfo();
		let [data,history] = await ajax.send([
			api.order_get_byId({id:this.id}),
			api.order_get_history_byOrderNo({orderNo:this.orderNo})
		]);
		await all.setOrderTopData(4,data);
		await all.setOrderHistoryData(history,true);
		this.addBtnEvent();
	},
	setTitle(title){
		let bTitle = $('#btitle').get(0);
		bTitle.titleName = title;
		$('title').text(title);
	},
	addBtnEvent(){
		let submit = $('#submit'),
			back = $('#back'),
			cancel = $('#cancel'),
			_this = this;

		submit.click(function(){
			all.showLoadingRun(_this,'submitFn','1');
		});
		back.click(function(){
			all.showLoadingRun(_this,'submitFn','0');
		});
		cancel.click(function(){
			qt.closeWin();
		});
	},
	async submitFn(state){
		let form = await all.getFromVal($('#form')),
			uploaded = await all.uploadFile(form.attachUrls);

		form.attachUrls = uploaded.join(',');
		form.auditStatus = state;
		form.orderNo = this.orderNo;
		form.currentNodeKey = this.currentNodeKey;


		await ajax.send([
			api.approve_advance(form)
		]);
		await qt.alert('提交成功！');
		qt.closeWin();

	}

};


app.run(Page);