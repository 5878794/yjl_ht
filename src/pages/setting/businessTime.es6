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
require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b-group-switch');


let loading;
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
		await all.getUserInfo();
		this.createGroup();


		let [data] = await ajax.send([
			api.setting_config({
				type:7
			})
		]);
		console.log(data)

	},
	createGroup(){
		let group1 = $('#group1').get(0);
		group1.data = [
			{name:'大发大发',value:'3',selected:true,id:1,key:'a1'},
			{name:'大发大发',value:'1',selected:true,id:1,key:'a2'},
			{name:'大发大发',value:'3',selected:true,id:1,key:'a3'},
			{name:'大发大发',value:'4',selected:true,id:1,key:'a4'},
			{name:'大发大发',value:'3',selected:true,id:1,key:'a5'},
			{name:'大发大发',value:'3',selected:true,id:1,key:'a6'},
			{name:'大发大发',value:'3',selected:true,id:1,key:'a7'}
		];
		group1.click = function(data){
			console.log(data);
		};
	}
};


app.run(Page);