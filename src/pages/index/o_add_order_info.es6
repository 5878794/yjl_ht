



let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b_order_info');
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
		this.setPart1();


	},
	setPart1(){
		let part1 = $('#order_info').get(0);
		part1.showLevel = 3;
		part1.data = {
			money:7000000,
			type:'房抵',
			no:'Fd123123123',
			from:'来自中介',
			product:'中新银行-理财产品1',
			productInfo:'产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍',
			mans:[
				{name:'张三',phone:12312312312,idcard:'123333333333333333',address:'阿打发打发发代付链接撒地方科技傲世狂妃'},
				{name:'张三(共同)',phone:12312312312,idcard:'123333333333333333',address:'阿打发打发发代付链接撒地方科技傲世狂妃'},
				{name:'张三(担保)',phone:12312312312,idcard:'123333333333333333',address:'阿打发打发发代付链接撒地方科技傲世狂妃'}
			],
			state:'待回款'
		};
		part1.click = function(data){
			console.log(data)
		}


	}
};


app.run(Page);