let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	tableSet = require('./../../es6/tableSetting'),
	{ajax,api} = require('./../../es6/_ajax'),
	all = require('./../../es6/all'),
	qt = require('./../../es6/qt'),
	selectData = require('./../../es6/selectData'),
	winSetting = require('./../../es6/winSetting'),
	inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b-win-top');
require('./../../es6/customElement/pc/table_list');
require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b_title1');
require('./../../es6/yjl/b-role-list');



let loading;
let Page = {
	init(){
		// loading = new loadFn();
		// loading.show('急速加载中');
		this.run().then(rs=>{
			// loading.hide();
		}).catch(rs=>{
			// err.error(rs);
			// loading.hide();
			// app.alert(rs);
			throw rs;
		});
	},
	async run(){
		await all.getUserInfo();
		this.bindTitleBtn();

		//获取公司列表
		let [companyList] = await ajax.send([
			api.company_list({
				pageNum:1,
				pageSize:99999
			})
		]);

		//处理公司列表数据
		companyList = companyList.list || [];
		companyList.map(rs=>{
			rs.name = rs.companyName;
		});
		this.createList(companyList);

		//获取第一个机构下的产品
		if(companyList.length == 0){return;}
		let companyDom = $('#list').get(0);
		companyDom.triggerClick(0);
	},
	//公司添加
	bindTitleBtn(){
		let title = $('#b_title').get(0);
		title.btnData = [
			{name:'新增',type:'btn1',style:{color:'#5576f0'}}
		];
		title.clickFn = function(){
			qt.openPage('o_add.html?name=公司名&type=3',
				winSetting.setting_add_role.width,
				winSetting.setting_add_role.height)
		};
	},
	//创建公司列表
	createList(data){
		let list = $('#list').get(0),
			_this = this;

		list.data = data;
		list.del = async function(data){
			if(await qt.confirm(`您确定要删除公司 ${data.name}?`)){
				qt.loading.show();
				_this.delCompany(data).then(rs=>{
					qt.loading.hide();
				}).catch(e=>{
					qt.loading.hide();
					qt.alert(e);
				})
			}
		};
		list.click = function(data){
			_this.companyData = data;
			qt.loading.show();
			_this.showDepartment(data).then(rs=>{
				qt.loading.hide();
			}).catch(e=>{
				qt.loading.hide();
				qt.alert(e);
			})
		}
	},
	//删除公司
	async delCompany(data){
		await ajax.send([
			api.company_del({
				companyId:data.id
			})
		]);

		await qt.alert('删除成功');
		qt.refreshPage();
	},

	//显示公司下的部门
	async showDepartment(data){
		let body = $('#list_body'),
			_this = this;
		body.html('');

		//创建产品标题
		let title1 = $('<b-title1 name="'+data.name+'"></b-title1>');
		body.append(title1);
		this.createListTitle(title1.get(0),data);

		//创建部门列表
		let [departmentData] = await ajax.send([
			api.department_list({
				companyId:data.id,
				pageNum:1,
				pageSize:99999
			})
		]);
		departmentData = departmentData.list || [];

		let table = $('<b-role-list name="部门名称"></b-role-list>'),
			tableBody = $('<div class="index_list"></div>');
		tableBody.append(table);
		body.append(tableBody);

		departmentData.map(rs=>{
			rs.name = rs.deptName;
		});

		table = table.get(0);
		table.data = departmentData;
		table.del = async function(data){
			if(await qt.confirm(`您确定要删除部门 ${data.name}?`)){
				qt.loading.show();
				_this.delDepartment(data).then(rs=>{
					qt.loading.hide();
				}).catch(e=>{
					qt.loading.hide();
					qt.alert(e);
				})
			}
		};
		// this.createList1(table.get(0),departmentData);



		body.removeClass('hidden');
	},
	//部门的标题 添加部门
	createListTitle(title,data){
		title.btnData = [
			{name:'新增',type:'btn1',style:{color:'#5576f0'}}
		];
		title.clickFn = function(){
			qt.openPage('o_add.html?name=部门名&type=4&companyId='+data.id,
				winSetting.setting_add_role.width,
				winSetting.setting_add_role.height)
		};
	},


	//删除部门
	async delDepartment(data){
		await ajax.send([
			api.department_del({
				deptId:data.id
			})
		]);

		await qt.alert('删除成功');
		qt.refreshPage();
	}
};


app.run(Page);