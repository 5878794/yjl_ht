



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



//TODO 下面的历史记录没做
//TODO 文件不能分辨类型
let Page = {
	init(){
		all.showLoadingRun(this,'run');
	},
	async run(){
		let id = gerParamFromUrl().id;

		await all.getUserInfo();
		let [data] = await ajax.send([
			api.file_list({id:id})
		]);
		data = data.list || [];
		data = data[0] || {};

		all.setFromVal($('#from'),data);

		this.setInput(data.attachUrls);

		$('#submit').click(function(){
			qt.closeWin();
		});
	},
	setInput(data){
		inputStyle.set(true,true);

		let file = $('#file').get(0),
			srcs = all.getRealImageSrc(data);
		file.disabled = true;
		file.showFiles = srcs;
	}


};


app.run(Page);