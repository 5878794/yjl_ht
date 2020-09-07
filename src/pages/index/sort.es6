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

		//TODO 根据权限判断获取数据

		this.bindTitle();

		await this.getData({pageNum:1});


	},
	bindTitle(){
		//部门权限显示: xx公司xx部门
		//公司权限显示: xx公司
		//集团权限显示： 删除这个dom

		let dom = $('#title1');
		dom.text('xx公司xx部门');
	},
	async getData(data){
		let _this = this;

		data.broadType = 0;
		data.pageSize = 999999;


		let [listData] = await ajax.send([
			api.index_sort_list(data)
		]);

		listData = listData.list || [];

		this.createList(listData);
	},



	createList(data){
		let table = $('#table_list').get(0),
			_this = this;

		//部门 sort_department
		//公司 sort_company
		//集团 sort_group

		tableSet.set(table,'sort_department');

		// data=[
		// 	{name:'的说法',money:'123123'},
		// 	{name:'的说法2',money:'1231234'},
		// 	{name:'的说法1',money:'1231233'},
		// ]

		//TODO 无业绩字段 无权限判断
		data.map((rs,i)=>{
			rs.no = rs.ranking;
			rs.name = rs.userName;
			rs.money = '';

		});

		table.show(data);

	}
};


app.run(Page);