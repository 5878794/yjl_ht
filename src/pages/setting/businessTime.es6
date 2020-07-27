let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	tableSet = require('./../../es6/tableSetting'),
	inputStyle = require('./../../es6/inputStyle'),
	{ajax,api} = require('./../../es6/_ajax');



require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b-group-switch');


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
		this.createGroup();

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