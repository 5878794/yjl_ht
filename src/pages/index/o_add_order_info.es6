let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	bTitleBtn = require('./../../es6/b_title_btn'),
	getParamFromUrl = require('./../../es6/lib/fn/getParamFromUrl'),
	pageSizeSetting = require('./../../es6/pageSize'),
	selectData = require('./../../es6/selectData'),
	winSetting = require('./../../es6/winSetting'),
	tableSet = require('./../../es6/tableSetting'),
	stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
	inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b_order_info');
require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b_title1');
require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_file');



let loading;
let Page = {
	init(){
		all.showLoadingRun(this,'run');
	},
	async run(){
		this.id = getParamFromUrl().id;
		await all.getUserInfo();
		inputStyle.set(true,true);
		this.createBTitlesBtn();
		this.btnBindEvent();




		this.setPart1();


	},
	btnBindEvent(){
		let preBtn = $('#pre'),
			nextBtn = $('#next'),
			_this = this;

		preBtn.click(function(){
			qt.openPage(
				'./o_add_order.html?id='+_this.id,
				winSetting.index_add_step1.width,
				winSetting.index_add_step1.height)
		});
		nextBtn.click(function(){
			all.showLoadingRun(_this,'submitFn');
		});
	},
	setPart1(){
		let part1 = $('#order_info').get(0);
		part1.showLevel = 1;
		part1.data = {
			money:7000000,
			type:'房抵',
			no:'Fd123123123',
			from:'来自中介'
			// product:'中新银行-理财产品1',
			// productInfo:'产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍',
			// mans:[
			// 	{name:'张三',phone:12312312312,idcard:'123333333333333333',address:'阿打发打发发代付链接撒地方科技傲世狂妃'},
			// 	{name:'张三(共同)',phone:12312312312,idcard:'123333333333333333',address:'阿打发打发发代付链接撒地方科技傲世狂妃'},
			// 	{name:'张三(担保)',phone:12312312312,idcard:'123333333333333333',address:'阿打发打发发代付链接撒地方科技傲世狂妃'}
			// ],
			// state:'待回款'
		};
		// part1.click = function(data){
		// 	console.log(data)
		// }


	},

	//设置标题上的按钮
	createBTitlesBtn(){
		//紧急联系人添加、删除
		bTitleBtn.addDelFn(
			$('#emergency_contact').get(0),
			$('#emergency_contact_body'),
			$('#emergency_contact_item')
		);

		//共同申请人信息添加
		bTitleBtn.addChildDelFn(
			$('#joint_application').get(0),
			$('#joint_application_body'),
			$('#joint_application_item')
		);

		//担保人信息添加
		bTitleBtn.addChildDelFn(
			$('#guarantor').get(0),
			$('#guarantor_body'),
			$('#guarantor_item')
		)

	},


	async submitFn(){
		let form = await all.getFromGroupVal($('#form'));
		console.log(form);
	}

};


app.run(Page);