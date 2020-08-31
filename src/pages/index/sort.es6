let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	pageSizeSetting = require('./../../es6/pageSize'),
	winSetting = require('./../../es6/winSetting'),
	tableSet = require('./../../es6/tableSetting'),
	stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
	inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b-win-top');
require('./../../es6/yjl/b-search');
require('./../../es6/customElement/pc/table_list');
require('./../../es6/customElement/pc/pagination');



let Page = {
	init(){
		all.showLoadingRun(this,'run');
	},
	async run(){
		await all.getUserInfo();
		await this.getData({pageNum:1});


	},
	async getData(data){
		let _this = this;

		data.broadType = 0;
		data.pageSize = pageSizeSetting.management_notice;

		//TODO

		// let [listData] = await ajax.send([
			// api.news_list(data)
		// ]);

		// listData = listData.list || [];

		// this.createList(listData);
		this.createList();
	},



	createList(data){
		let table = $('#table_list').get(0),
			_this = this;

		//部门 sort_department
		//公司 sort_company
		//集团 sort_group

		tableSet.set(table,'sort_department');

		data=[
			{name:'的说法',money:'123123'},
			{name:'的说法2',money:'1231234'},
			{name:'的说法1',money:'1231233'},
		]

		data.map((rs,i)=>{
			rs.no = i;


		});

		table.show(data);

	}
};


app.run(Page);