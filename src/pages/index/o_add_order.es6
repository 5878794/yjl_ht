



let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	inputStyle = require('./../../es6/inputStyle');




require('./../../es6/customElement/pc/input');
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
		this.bindEvent();

	},
	setInput(){
		let select = $('#select').get(0),
			name = $('#name').get(0),
			money = $('#money').get(0);

		select.selectData = [
			{name:'测试1',value:'1'},
			{name:'测试2',value:'2'},
			{name:'测试3',value:'3'}
		];

		inputStyle.set();
	},
	bindEvent(){
		let btn = $('#submit'),
			_this = this;

		btn.click(function(){

			_this.submit().then(rs=>{

			}).catch(e=>{
				console.log(e)

			})
		});


	},
	async submit(){
		let select = await $('#select').get(0).checkPass(),
			name = await $('#name').get(0).checkPass(),
			money = await $('#money').get(0).checkPass();

		console.log(select,name,money)
	}
};


app.run(Page);