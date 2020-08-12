let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	pageSizeSetting = require('./../../es6/pageSize'),
	getParamFromUrl = require('./../../es6/lib/fn/getParamFromUrl'),
	selectData = require('./../../es6/selectData'),
	winSetting = require('./../../es6/winSetting'),
	tableSet = require('./../../es6/tableSetting'),
	stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
	inputStyle = require('./../../es6/inputStyle');



require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_money');



let loading;
let Page = {
	init(){
		all.showLoadingRun(this,'run');
	},
	async run(){
		this.id = getParamFromUrl().id;

		inputStyle.set();
		await all.getUserInfo();
		await selectData($('#form'));


		if(this.id || this.id == 0){
			//获取订单数据
			let [data] = await ajax.send([
				api.order_get_byId({id:this.id})
			]);
			this.orderNo = data.orderNo;
			await all.setFromVal($('#form'),data);

			//如果已生成不能修改业务类型
			$('#businessKey').get(0).disabled = true;
		}

		this.bindEvent();
	},
	bindEvent(){
		let btn = $('#submit'),
			_this = this;

		btn.click(function(){
			all.showLoadingRun(_this,'submit');
		});
	},
	async submit(){
		let form = await all.getFromVal($('#form'));
		if(this.id || this.id ==0){
			form.id = this.id;
		}
		if(this.orderNo){
			form.orderNo = this.orderNo;
		}

		let [data] = await ajax.send([
			api.order_add_step1(form)
		]);
		let id = data.id;

		await qt.alert('创建订单成功!');
		qt.openPage(
			'./o_add_order_info.html?id='+id,
			winSetting.index_add_step2.width,
			winSetting.index_add_step2.height);
		qt.closeWin();
	}
};


app.run(Page);