



let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	bindSelectData = require('./../../es6/selectData'),
	pageSizeSetting = require('./../../es6/pageSize'),
	winSetting = require('./../../es6/winSetting'),
	tableSet = require('./../../es6/tableSetting'),
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



let loading;
let Page = {
	init(){
		all.showLoadingRun(this,'run');
	},
	async run(){
		inputStyle.set(true,true);

		await all.getUserInfo();


		await bindSelectData($('#form'));

		let _this = this;
		$('#submit').click(function(){
			all.showLoadingRun(_this,'submit');
		});
	},

	async submit(){
		let data = await all.getFromVal($('#form'));

		await ajax.send([
			api.staff_add(data)
		]);

		qt.alert('添加成功!');
		qt.closeWin();
	}

};


app.run(Page);