let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	tableSet = require('./../../es6/tableSetting'),
	qt = require('./../../es6/qt'),
	{ajax,api} = require('./../../es6/_ajax'),
	all = require('./../../es6/all'),
	winSetting = require('./../../es6/winSetting'),
	inputStyle = require('./../../es6/inputStyle');


require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b-role-authority');
require('./../../es6/yjl/b-role-list');




let Page = {
	nowRoleId:'',
	init(){
		all.showLoadingRun(this,'run');
	},
	async run(){
		this.createBTitlesBtn();

		//获取用户token等
		await all.getUserInfo();

		let [roleList] = await ajax.send([
			api.role_get_list({
				pageNum:1,
				pageSize:99999
			})
		]);

		roleList = roleList.list;
		roleList.map(rs=>{
			rs.name = rs.roleName
		});

		this.createRoleList(roleList);

		//创建权限列表
		this.nowRoleId = roleList[0]?.id;
		let roleDom = $('#list').get(0);
		roleDom.chooseRowNumber(0);
		await this.createPrivilegeList();

	},
	//生成权限列表
	async createPrivilegeList(){
		let roleId = this.nowRoleId;
		if(!roleId){
			return;
		}

		//生成权限列表
		let [privilege] = await ajax.send([
			api.privilege_list({roleId:roleId})
		]);

		this.createRole(privilege);
	},

	//标题添加
	createBTitlesBtn(){
		let title = $('#b_title').get(0);
		title.btnData = [
			{name:'新增',type:'btn1',style:{color:'#5576f0'}}
		];
		title.clickFn = function(){
			qt.openPage('o_add.html?name=角色名&type=1',
				winSetting.setting_add_role.width,
				winSetting.setting_add_role.height)
		}
	},
	//创建角色列表
	createRoleList(data){
		let list = $('#list').get(0),
			_this = this;

		list.data = data;
		list.del = async function(data){
			if(await qt.confirm(`您确定要删除角色 ${data.name}?`)){
				qt.loading.show();
				_this.delRole(data).then(rs=>{
					qt.loading.hide();
				}).catch(e=>{
					qt.loading.hide();
					qt.alert(e);
				})
			}
		};
		list.click = function(data){
			_this.nowRoleId = data.id;
			all.showLoadingRun(_this,'createPrivilegeList')

		};

	},
	//创建角色权限列表
	createRole(data){
		let role = $('#role').get(0),
			_this = this;

		role.data = data;
		role.submit = function(data,switchDom){
			qt.loading.show();
			_this.mdfUserRole(data).then(rs=>{
				qt.loading.hide();
			}).catch(e=>{
				switchDom.val = !switchDom.val;
				data.hasPrivilege = (switchDom.val)? 1 : 0;
				qt.loading.hide();
				qt.alert(e);
			});
		};
	},
	//权限修改
	async mdfUserRole(data){
		await ajax.send([
			api.privilege_mdf({
				roleId:this.nowRoleId,
				privileges:[data]
			})
		]);

		qt.alert('修改成功!');
	},

	//删除角色
	async delRole(data){
		await ajax.send([
			api.role_del({
				roleId:data.id
			})
		]);

		await qt.alert('删除成功');
		qt.refreshPage();
	}
};


app.run(Page);