



let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	gerParamFromUrl = require('./../../es6/lib/fn/getParamFromUrl'),
	pageSizeSetting = require('./../../es6/pageSize'),
	winSetting = require('./../../es6/winSetting'),
	tableSet = require('./../../es6/tableSetting'),
	stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
	selectData = require('./../../es6/selectData'),
	inputStyle = require('./../../es6/inputStyle');




require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_date');
require('./../../es6/customElement/pc/input_file');
require('./../../es6/customElement/pc/input_search');
require('./../../es6/customElement/pc/input_money');



let Page = {
	init(){
		all.showLoadingRun(this,'run');
	},
	async run(){
		let param = getParamFromUrl();
		this.id = param.id;
		this.orderNo = param.orderNo;
		this.currentNodeKey = param.currentNodeKey;

		await all.getUserInfo();
		let [data] = await ajax.send([
			api.file_list({orderNo:orderNo})
		]);
		data = data.list || [];
		data = data[0] || {};


		all.setFromVal($('#from'),data);

		this.setInput(data.attachUrls);

		this.addBtnEvent();
	},
	setInput(data){
		inputStyle.set(true,true);

		let file = $('#file').get(0),
			srcs = all.getRealImageSrc(data);
		file.showFiles = srcs;
		file.disabled = true;
	},

	addBtnEvent(){
		let submit = $('#submit'),
			_this = this;

		let orderNoDom = $('#orderNo');
		orderNoDom.click(function(){
			qt.openPage(
				'../index/o_add_order_view.html?id='+_this.id,
				winSetting.index_add_step4.width,
				winSetting.index_add_step4.height
			);
		});

		submit.click(function(){
			all.showLoadingRun(all,'reviewSubmit',{
				formDom:$('#form'),
				orderNo:_this.orderNo,
				state:1,
				currentNodeKey:_this.currentNodeKey
			});
		});
	}


};


app.run(Page);