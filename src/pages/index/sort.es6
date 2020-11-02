let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	pageSizeSetting = require('./../../es6/pageSize'),
	winSetting = require('./../../es6/winSetting'),
	tableSet = require('./../../es6/tableSetting'),
	moneyFormat = require('./../../es6/lib/fn/number'),
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

		//0:无 1:个人权限 2:部门权限 3:公司权限 4:集团权限"
		this.type = window.orderSearchPrivilegeType;

		this.bindTitle();
		await this.getData({pageNum:1});


	},
	bindTitle(){
		//部门权限显示: xx公司xx部门
		//公司权限显示: xx公司
		//集团权限显示： 删除这个dom

		let dom = $('#title1'),
			companyName = window.userInfo?.companyName,
			departName = window.userInfo?.deptName;

		//部门
		if(this.type == 2){
			dom.text(companyName+'公司'+departName+'部门');
		}
		//公司
		if(this.type == 3){
			dom.text(companyName+'公司');
		}
		//集团
		if(this.type == 4){
			dom.text('');
		}
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

		//部门 sort_department    2
		//公司 sort_company       3
		//集团 sort_group         4
		let tableColSetting = (this.type==2)? 'sort_department' :
								(this.type==3)? 'sort_company' :
												'sort_group';

		tableSet.set(table,tableColSetting);


		data.map((rs,i)=>{
			rs.no = rs.ranking;
			rs.name = rs.userName;
			rs.company = rs.companyName;
			rs.department = rs.deptName;
			rs.money = moneyFormat(rs.salePrice,2);

		});

		table.show(data);

	}
};


app.run(Page);