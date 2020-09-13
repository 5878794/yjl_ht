


let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	pageSizeSetting = require('./../../es6/pageSize'),
	getParamFromUrl = require('./../../es6/lib/fn/getParamFromUrl'),
	winSetting = require('./../../es6/winSetting'),
	tableSet = require('./../../es6/tableSetting'),
	selectData = require('./../../es6/selectData'),
	moneyFormat = require('./../../es6/lib/fn/number'),
	stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
	inputStyle = require('./../../es6/inputStyle');




let Page = {
	init(){
		all.showLoadingRun(this,'run');
	},
	async run(){
		let param = getParamFromUrl();
		this.bindData(param);
	},
	bindData(rs){
		let info = rs.info,
			date = rs.date,
			userName = rs.userName,
			money = rs.money;
		money = (money/10000).toFixed(0);

		$('.info').find('p').eq(1).html(userName??'&nbsp;');
		$('.info').find('div').eq(0).text(info);
		$('.info').find('p').eq(2).text(money+'万');
		$('.bottom').text(stamp2Date.getDate1(date*1));
	}

};


app.run(Page);



// attachUrls: ""
// broadContent: "恭喜王同学成功开单"
// broadSignature: null
// broadTitle: "开单公告"
// broadType: 1
// companyId: 30
// companyName: "公司1"
// createTime: 1599861422000
// deleted: 0
// deptId: null
// deptName: null
// id: 9
// orderMoney: null
// remark: ""
// status: 1
// updateTime: 1599861831000
// userId: null
// userName: null