let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	tableSet = require('./../../es6/tableSetting'),
	inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b-role-authority');
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
		this.createBTitlesBtn();
		this.createRoleList();
		this.createRole();

	},
	createBTitlesBtn(){
		let title = $('#b_title').get(0);
		title.btnData = [
			{name:'新增',type:'btn1',style:{color:'#5576f0'}}
		];
		title.clickFn = function(){
			console.log('add');
		}
	},
	createRoleList(){
		let list = $('#list').get(0);
		list.data = [
			{name:'业务员1',id:1},
			{name:'业务员2',id:2},
			{name:'业务员3',id:3}
		];
		list.del = function(data){
			console.log(data);
		};
		list.click = function(data){
			console.log(data);
		};

	},
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
	}
};


app.run(Page);