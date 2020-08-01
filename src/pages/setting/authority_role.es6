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
	init(){
		qt.loading.show('急速加载中');
		this.run().then(rs=>{
			qt.loading.hide();
		}).catch(rs=>{
			// err.error(rs);
			qt.loading.hide();
			qt.alert(rs);
			// throw rs;
		});
	},
	async run(){
		this.createBTitlesBtn();

		//获取用户token等
		await all.getUserInfo();

		let [roleList,privilege] = await ajax.send([
			api.role_get_list({
				pageNum:1,
				pageSize:99999
			})
		]);
		//TODO 角色权限列表

		roleList = roleList.list;
		roleList.map(rs=>{
			rs.name = rs.roleName
		});

		this.createRoleList(roleList);
		this.createRole();

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
			console.log(data);
		};

	},
	//创建角色权限列表 TODO
	createRole(){
		let role = $('#role').get(0);
		role.data = [
			{
				name:'aaa',
				children:[
					{
						name:'aaa1',
						children:[
							{
								name:'aaa11',
								type:'公司权限',
								checked:false
							},
							{
								name:'aaa12',
								type:'集团权限',
								checked:true
							}
						]
					},
					{
						name:'aaa2',
						children:[
							{
								name:'aaa21',
								type:'公司权限',
								checked:false
							},
							{
								name:'aaa22',
								type:'集团权限',
								checked:true
							}
						]
					}
				]
			},
			{
				name:'bbb',
				children:[
					{
						name:'bbb1',
						children:[
							{
								name:'bbb11',
								type:'公司权限',
								checked:false
							},
							{
								name:'bbb12',
								type:'集团权限',
								checked:true
							}
						]
					},
					{
						name:'bbb2',
						children:[
							{
								name:'bbb21',
								type:'公司权限',
								checked:false
							},
							{
								name:'bbb22',
								type:'集团权限',
								checked:true
							}
						]
					}
				]
			}
		];
		role.submit = function(data){
			console.log(data);
		};
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