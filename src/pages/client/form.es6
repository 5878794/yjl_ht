let app = require('./../../es6/lib/page'),
	$$ = require('./../../es6/lib/event/$$'),
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



let Page = {
	init(){
		let param = getParamFromUrl();
		this.id = param.id;
		this.name = param.name;


		all.showLoadingRun(this,'run');
	},
	async run(){
		inputStyle.phoneSet();
		this.bindEvent();
	},
	bindEvent(){
		let _this = this;
		$$('#submit').myclickok(function(){
			all.showLoadingRun(_this,'submit')
		})
	},
	async submit(){
		let form = await all.getFromVal($('#form'));
		form.createName = this.name;
		form.createId = this.id;


		await ajax.send([
			api.client_submit(form)
		]);

		window.location.href = './info.html';
	}
};


app.run(Page);