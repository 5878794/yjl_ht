



let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	inputStyle = require('./../../es6/inputStyle');




require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_date');
require('./../../es6/customElement/pc/input_file');
require('./../../es6/customElement/pc/input_search');
require('./../../es6/customElement/pc/input_money');



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
		this.setInput();

	},
	setInput(){
		inputStyle.set(true,true);

		let search = $('#search').get(0);
		search.searchFn = function(val){
			console.log('search:'+val);
			return ['a1','a2','a3'];
		};
		search.inputFn = function(val){
			console.log('input:'+val);
		};
	}


};


app.run(Page);