let app = require('./../../es6/lib/page'),
	$$ = require('./../../es6/lib/event/$$'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	qt1 = require('./../../es6/qt_phone'),
	pageSizeSetting = require('./../../es6/pageSize'),
	getParamFromUrl = require('./../../es6/lib/fn/getParamFromUrl'),
	selectData = require('./../../es6/selectData'),
	moneyFormat = require('./../../es6/lib/fn/number'),
	winSetting = require('./../../es6/winSetting'),
	tableSet = require('./../../es6/tableSetting'),
	stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
	inputStyle = require('./../../es6/inputStyle');
qt.loading = qt1.loading;
require('../../es6/yjl/b-order-history1');


let Page = {
	isWarran:false,
	init(){
		all.showLoadingRun(this,'run');
	},
	getParam(){
		let param = getParamFromUrl();
		this.orderNo = param.orderNo;

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

		let [data] = await ajax.send([
			api.order_get_history_byOrderNo({orderNo:this.orderNo})
		]);

		// this.bussinessDist = await selectData('businessType');
		// this.orderStateDist = await selectData('orderState');

		console.log(data)
		await all.setOrderHistoryData(data,false);
		this.bindBtnEvent();

	},
	bindBtnEvent(){
		let close = $('#close');
		$$(close).myclickok(function(){
			window.history.go(-1);
		});
	}
};


app.run(Page);