let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	pageSizeSetting = require('./../../es6/pageSize'),
	winSetting = require('./../../es6/winSetting'),
	tableSet = require('./../../es6/tableSetting'),
	stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
	selectData = require('./../../es6/selectData'),
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
		this.createSearch();
		this.bindEvent();

		await selectData($('#b_search').get(0).body);

		await this.getData({pageNum:1});
	},
	bindEvent(){
		let btn = $('#add_btn');
		btn.click(function(){
			qt.openPage(
				'./o_add.html',
				winSetting.file_add.width,
				winSetting.file_add.height)
		});
	},
	async getData(data){
		let _this = this;

		data.pageSize = pageSizeSetting.management_notice;
		let [listData] = await ajax.send([
			api.file_list(data)
		]);
		let listNumber = listData.total;
		listData = listData.list || [];

		this.createList(listData);
		all.createFY({
			domId:'table_pagination',
			nowPage:data.pageNum,
			listLength:listNumber,
			pageSize:data.pageSize,
			searchData:data,
			getDataFn:function(obj){
				all.showLoadingRun(_this,'getData',obj);
			}
		});
	},
	createSearch(){
		let search = $('#b_search').get(0);
		search.body.css({
			minWidth:'auto',
			maxWidth:'none'
		});
		search.inputData = [
			{name:'客户姓名:',type:'text',id:'a1',width:'30%'},
			{name:'客户电话:',type:'text',id:'a2',width:'30%'},
			{name:'档案室:',type:'select',id:'a3',width:'30%',bind:'archivesList'},
			{name:'日期',type:'assDate',id:['a4','a5'],width:'60%'}
		];
		search.clickFn = function(rs){
			rs.pageNum = 1;
			all.showLoadingRun(_this,'getData',rs);
		};


		inputStyle.searchSet(search);
	},
	createList(data){
		let table = $('#table_list').get(0);
		tableSet.set(table,'file');


		table.show(data);

		table.body.find('.__key5__').each(function(){
			$(this).addClass('hover');
			$(this).click(function(){
				console.log('btn')
			})
		});
	}
};


app.run(Page);