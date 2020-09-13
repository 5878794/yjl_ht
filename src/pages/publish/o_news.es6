


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




let Page = {
	init(){
		all.showLoadingRun(this,'run');
	},
	async run(){
		let param = getParamFromUrl(),
			id = param.id;
		await all.getUserInfo();

		let [data] = await ajax.send([
			api.news_list({id:id})
		]);

		data = data.list??[];
		data = data[0]??{};


		this.bindData(data);


	},
	bindData(data){
		$('.title').text(data.broadTitle);
		$('.time').text(stamp2Date.getDateTime(data.createTime));
		$('.info').text(data.broadContent);

		let fileBody = $('.file'),
			files = data.attachUrls;
		files = all.getRealImageSrc(files);
		files.map(rs=>{
			fileBody.append('<img src="'+rs+'"/>');
		})

	}

};


app.run(Page);