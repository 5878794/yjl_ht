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
		this.createSearch();
		this.bindEvent();

		await this.getData({pageNum:1});


	},
	async getData(data){
		let _this = this;

		data.broadType = 0;
		data.pageSize = pageSizeSetting.management_notice;
		let [listData] = await ajax.send([
			api.news_list(data)
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


	bindEvent(){
		let btn = $('#add_btn');
		btn.click(function(){
			qt.openPage(
				'./o_add_notice.html',
				winSetting.management_add_news.width,
				winSetting.management_add_news.height)
		});
	},
	createSearch(){
		let search = $('#b_search').get(0),
			_this = this;

		search.inputData = [
			{name:'',type:'search',id:'broadTitle',placeholder:'请输入你要搜索的通知标题',width:'100%'}
		];
		search.clickFn = function(rs){
			rs.pageNum = 1;
			all.showLoadingRun(_this,'getData',rs);
		};

		inputStyle.searchSet(search,'search');
	},


	createList(data){
		let table = $('#table_list').get(0),
			_this = this;

		tableSet.set(table,'management_notice');

		data.map(rs=>{
			rs.del = '删除';
			rs.createTime_ = stamp2Date.getDate(rs.createTime);
		});

		table.show(data);

		table.body.find('.__del__').each(function(){
			$(this).addClass('hover');
		});
		table.body.find('.__del__').click(async function(){
			let data = $(this).parent().data('data');

			if(await qt.confirm(`您确定要删除新闻:${data.broadTitle}?`)){
				all.showLoadingRun(_this,'delNews',data);
			}
		});
	},
	async delNews(data){
		await ajax.send([
			api.news_del({
				roleId:data.id
			})
		]);

		qt.alert('删除成功!');
		qt.refreshPage();
	}
};


app.run(Page);