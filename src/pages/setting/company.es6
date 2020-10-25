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



let Page = {
	choose:0,
	init(){
		all.showLoadingRun(this,'run')
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
		let jtId = null;
		companyList.map((rs,i)=>{
			if(rs.id == 1){     //集团公司id=1
				jtId = i;
			}
			rs.name = rs.companyName;
		});
		//删除id=1的集团公司  不显示
		if(jtId || jtId==0){
			companyList.splice(jtId,1);
		}


		this.createList(companyList);

		//获取第一个机构下的产品
		if(companyList.length == 0){return;}
		let companyDom = $('#list').get(0);
		companyDom.triggerClick(this.choose);
	},
	//公司添加
	bindTitleBtn(){
		let title = $('#b_title').get(0);
		title.btnData = [
			{name:'新增',type:'btn1',style:{color:'#5576f0'}}
		];
		title.clickFn = function(){
			qt.openPage('../setting/o_add.html?name=公司名&type=3',
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
			_this.choose = data.i;
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
		all.showLoadingRun(this,'run');
		// qt.refreshPage();
	},

	//显示公司下的部门
	async showDepartment(data){
		let body = $('#list_body'),
			_this = this;
		body.html('');

		//创建产品标题
		let title1 = $('<b-title name="'+data.name+'"></b-title>');
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

		let table = $('<b-role-list></b-role-list>'),
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
			qt.openPage('../setting/o_add.html?name=部门名&type=4&companyId='+data.id,
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
		// qt.refreshPage();
		all.showLoadingRun(this,'run');
	},
	refreshList(){
		all.showLoadingRun(this,'run');
	}
};
window.refreshList = function(){
	Page.refreshList();
};

app.run(Page);