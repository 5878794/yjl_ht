let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	pageSizeSetting = require('./../../es6/pageSize'),
	getParamFromUrl = require('./../../es6/lib/fn/getParamFromUrl'),
	selectData = require('./../../es6/selectData'),
	winSetting = require('./../../es6/winSetting'),
	tableSet = require('./../../es6/tableSetting'),
	stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
	inputStyle = require('./../../es6/inputStyle');

require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b_title1');


let Page = {
	init(){
		all.showLoadingRun(this,'run');
	},
	async run(){
		let param = getParamFromUrl();
		this.id = param.id;
		this.state = param.state || 0;

		await all.getUserInfo();

		let [data] = await ajax.send([
			api.order_get_byId({id:this.id})
		]);
		this.type = data.businessKey;

		this.showHideDom();

		this.btnEventBind();


		//TODO 数据绑定

	},
	showHideDom(){
		let type = this.type;
		//TODO type值不确定
		//房抵
		if(type == 0){
			$('.__dz_fdz__').remove();
		}
		//垫资
		else if(type == 1){
			$('.__fd__').remove();
		}
		//非垫资
		else if(type == 2){
			$('.__fd__').remove();
			$('.__fdz_no__').remove();
		}
	},
	btnEventBind(){
		if(this.state == 1){
			//需要提交
			$('#info_btn').remove();
		}else{
			//预览订单详情
			$('#index_btn').remove();
		}

		let _this = this;
		$('#pre').click(function(){
			qt.openPage(
				'./o_add_order.html?id='+_this.id,
				winSetting.index_add_step1.width,
				winSetting.index_add_step1.height)
		});
		$('#next').click(function(){
			all.showLoadingRun(_this,'submit')
		});
		$('#close').click(function(){
			qt.closeWin();
		});

	},
	//生成订单
	async submit(){

	}


};


app.run(Page);