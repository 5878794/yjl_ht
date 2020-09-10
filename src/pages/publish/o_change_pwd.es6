


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

		this.addBtnEvent();
	},
	addBtnEvent(){
		let submit = $('#submit'),
			_this = this;

		submit.click(function(){
			all.showLoadingRun(_this,'submit');
		});
	},
	async submit(){
		//TODO
		let form = await all.getFromVal($('#form'));
		console.log(form);

		//TODO 检查2次输入的密码是否一样
	}


};


app.run(Page);