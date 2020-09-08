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

		data.pageSize = pageSizeSetting.management_notice;
		let [listData] = await ajax.send([
			api.staff_list(data)
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
				_this.getData(obj);
			}
		});
	},


	bindEvent(){
		let btn = $('#add_btn');
		btn.click(function(){
			qt.openPage(
				'../management/o_add_staff.html',
				winSetting.management_add_staff.width,
				winSetting.management_add_staff.height)
		});
	},
	createSearch(){
		let search = $('#b_search').get(0),
			_this = this;

		search.inputData = [
			{name:'',type:'search',id:'userName',placeholder:'请输入你要搜索用户名',width:'100%'}
		];
		search.clickFn = function(rs){
			rs.pageNum = 1;
			all.showLoadingRun(_this,'getData',rs);
		};

		inputStyle.searchSet(search,'search');
	},


	createList(data){
		let table = $('#table_list').get(0);
		tableSet.set(table,'management_staff');

		data.map(rs=>{
			rs.inductionTime_ = stamp2Date.getDate1(rs.inductionTime);
		});

		table.show(data);

		table.body.find('.__row__').css({cursor:'pointer'});
		table.body.find('.__row__').click(function(){
			let data = $(this).data('data'),
				id = data.id;

			qt.openPage(
				'../management/o_add_staff.html?id='+id,
				winSetting.management_add_staff.width,
				winSetting.management_add_staff.height)
		})
	}
};


app.run(Page);
