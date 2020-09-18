let app = require('./../../es6/lib/page'),
	$$ = require('./../../es6/lib/event/$$'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	pageSizeSetting = require('./../../es6/pageSize'),
	getParamFromUrl = require('./../../es6/lib/fn/getParamFromUrl'),
	selectData = require('./../../es6/selectData'),
	moneyFormat = require('./../../es6/lib/fn/number'),
	winSetting = require('./../../es6/winSetting'),
	tableSet = require('./../../es6/tableSetting'),
	stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
	inputStyle = require('./../../es6/inputStyle');

require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_file');

let Page = {
	isWarran:false,
	init(){
		all.showLoadingRun(this,'run');
	},
	getParam(){
		let param = getParamFromUrl();
		this.id = param.id;
		this.orderNo = param.orderNo;
		this.type = param.type;
		this.currentNodeKey = param.currentNodeKey;

		this.isWarran = (this.type == 1);


		let userInfo = window.sessionStorage.getItem('userInfo')||'{}';
		let rs = JSON.parse(userInfo);

		if(!rs.token){
			window.location.replace('./index.html');
			return;
		}

		window.token = rs.token;
		window.companyId = rs.companyId;
		window.userName = rs.userName;
		//0:无 1:个人权限 2:部门权限 3:公司权限 4:集团权限"
		window.orderSearchPrivilegeType = rs.orderSearchPrivilegeType;
		//0:无 1:房抵 2:垫资 3:房抵+垫资"
		window.orderCreatePrivilegeType = rs.orderCreatePrivilegeType;
		window.userInfo = rs;
	},
	async run() {
		this.getParam();
		inputStyle.phoneSet1();

		let [data] = await ajax.send([
			api.order_get_byId({id:this.id})
		]);

		this.bussinessDist = await selectData('businessType');
		this.orderStateDist = await selectData('orderState');

		console.log(data)
		this.bindData(data);
		this.bindBtnEvent();


		if(!this.isWarran){
			$('#warran').remove();
			return;
		}



		//TODO 判断是权证的话 增加响应的审核
		// 核行下户     通用过单
		// 还款资料确认  通用过单
		// 还款确认  /warrant/o_warrant_pay_back.html
		// 取证、解押  通用过单
		// 过户       通用过单
		// 取证       通用过单
		// 抵押       通用过单
	},
	bindData(rs){
		let _item = $('#item'),
			a = _item.find('a');

		//姓名
		a.eq(0).text(rs.mainOrderApplyInfo?.name);
		//电话
		a.eq(1).text(rs.mainOrderApplyInfo?.mobile);
		//业务
		a.eq(2).text(this.bussinessDist[rs.businessKey]);
		//金额 元---转万元
		let money = rs.applyMoney;
		money = money/10000;
		money = moneyFormat(money,2)+'万元';
		a.eq(3).text(money);
		//状态
		a.eq(4).text(this.orderStateDist[rs.orderStatus]);
		//时间
		a.eq(5).text(stamp2Date.getDate1(rs.flowNodeUpdateTime||''));

		$('#info').data({data:rs});
		$('#history').data({data:rs});
		$('#tel').attr({href:'tel:'+rs.mainOrderApplyInfo?.mobile});
	},
	bindBtnEvent(){
		let info = $('#info'),
			history = $('#history'),
			close = $('#close'),
			submit = $('#submit');

		$$(info).myclickok(function(){
			let data = $(this).data('data'),
				state = 0,
				id = data.id;
			//打开订单详情页面
			window.location.href = `./order_info.html?id=${id}&state=${state}`;
		});
		$$(history).myclickok(function(){
			let data = $(this).data('data'),
				orderNo = data.orderNo;
			//打开历史记录页面
			window.location.href = `./history_info.html?orderNo=${orderNo}`;
		});

		$$(close).myclickok(function(){
			window.history.go(-1);
		});
		$$(submit).myclickok(function(){

		});
	}
};


app.run(Page);