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
		qt.loading.show();
		this.run().then(rs=>{
			qt.loading.hide();
		}).catch(rs=>{
			// err.error(rs);
			qt.loading.hide();
			qt.alert(rs);
		});
	},
	async run(){
		await all.getUserInfo();
		this.createSearch();
		this.bindEvent();

		await this.getData({pageNum:1},true);


	},
	async getData(data,notShowLoading=false){
		if(!notShowLoading){
			qt.loading.show();
		}
		this.getDataFn(data).then(rs=>{
			if(!notShowLoading){
				qt.loading.hide();
			}
		}).catch(e=>{
			if(!notShowLoading){
				qt.loading.hide();
			}
			qt.alert(e);
		});
	},
	async getDataFn(data){
		let _this = this;

		data.broadType = 0;
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
				'./o_add_staff.html',
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
			_this.getData(rs);
		};

		inputStyle.searchSet(search,'search');
	},


	createList(data){
		let table = $('#table_list').get(0);
		tableSet.set(table,'management_staff');

		data.map(rs=>{
			rs.del = '删除';
		});

		table.show(data);

		table.body.find('.__del__').each(function(){
			$(this).addClass('hover');
		});
		table.body.find('.__del__').click(async function(){
			let data = $(this).parent().data('data');

			if(await qt.confirm(`您确定要删除员工:${data.userName}?`)){
				qt.loading.show();
				_this.delNews(data).then(rs=>{
					qt.loading.hide();
				}).catch(e=>{
					qt.loading.hide();
					qt.alert(e);
				})
			}
		});
	},
	async delNews(data){
		await ajax.send([
			api.staff_del({
				userId:data.id
			})
		]);

		qt.alert('删除成功!');
		qt.refreshPage();
	}
};



app.run(Page);