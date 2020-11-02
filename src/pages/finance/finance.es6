let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	pageSizeSetting = require('./../../es6/pageSize'),
	processToPageDist = require('./../../es6/processToPage'),
	moneyFormat = require('./../../es6/lib/fn/number'),
	winSetting = require('./../../es6/winSetting'),
	tableSet = require('./../../es6/tableSetting'),
	stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
	selectData = require('./../../es6/selectData'),
	inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b-win-top');
require('./../../es6/yjl/b-search');
require('./../../es6/customElement/pc/table_list');
require('./../../es6/customElement/pc/pagination');



let Page = {
	init(){
		all.showLoadingRun(this,'run');
	},
	async run(){
		await all.getUserInfo();
		this.createSearch();
		await selectData($('#b_search').get(0).body);

		this.businessDist = await selectData('businessType');
		this.orderStateDist = await selectData('orderState');

		await this.getData({pageNum:1});
	},
	createSearch(){
		let search = $('#b_search').get(0),
			_this = this;

		search.inputData = [
			{name:'客户姓名:',type:'text',id:'clientName',width:'25%'},
			{name:'客户电话:',type:'text',id:'clientMobile',width:'25%'},
			{name:'产品类型:',type:'select',id:'businessKey',width:'25%',bind:'businessType'},   //注意宽度无法低于正常的input值，需要尝试
			{name:'订单状态:',type:'select',id:'orderStatus',width:'25%',bind:'orderState1'},
			{name:'订单号',type:'text',id:'orderNo',width:'30%'},
			{name:'出款时间',type:'assDate',id:['outMoneyTimeStart','outMoneyTimeEnd'],width:'50%'}
		];
		search.clickFn = function(rs){
			rs.pageNum = 1;
			all.showLoadingRun(_this,'getData',rs);
		};


		inputStyle.searchSet(search);
	},
	async getData(data){
		let _this = this;
		this.catchListParam = data;

		data.pageSize = pageSizeSetting.management_notice;
		let [listData] = await ajax.send([
			api.finance_list(data)
		]);
		let listNumber = listData.total;
		listData = listData.list || [];

		await this.createList(listData);
		all.createFY({
			domId:'table_pagination',
			nowPage:data.pageNum,
			listLength:listNumber,
			pageSize:data.pageSize,
			searchData:data,
			getDataFn:function(obj){
				all.showLoadingRun(_this,'getData',obj);
			}
		});
	},
	createList(data){
		let table = $('#table_list').get(0);
		tableSet.set(table,'finance');
		table.rowWidth = 2000;

		data.map(rs=>{
			//业务类型
			rs.businessKey_ = this.businessDist[rs.businessKey];
			//申请金额
			rs.applyMoney_ = moneyFormat(rs.applyMoney,2);
			//咨询费
			rs.consultationFee_ = moneyFormat(rs.consultationFee,2);
			//服务费
			rs.serviceFee_ =  moneyFormat(rs.serviceFee,2);
			//权证费
			rs.warrantFee_ = moneyFormat(rs.warrantFee,2);
			//优惠费用
			rs.preferentialFee_ = moneyFormat(rs.preferentialFee,2);
			//已收小记
			rs.totalCost_ = moneyFormat(rs.totalCost,2);
			//费用退补
			rs.compensationRefundFee_ = moneyFormat(rs.compensationRefundFee,2);
			//业务状态
			rs.orderStatus_ = this.orderStateDist[rs.orderStatus];
			//到期时间
			rs.expireTime_ = stamp2Date.getDate1(rs.expireTime);
		});
		table.show(data);

		table.body.find('.__compensationRefundFee___').each(function(){
			let val = $(this).text();
			if(val>0){
				$(this).css({color:'red'});
			}else{
				$(this).css({color:'green'});
			}
		});

		// table.body.find('.__row__').addClass('hover');
		table.body.find('.__row__').click(async function(){
			let data = $(this).data('data'),
				id = data.id,
				orderNo = data.orderNo,
				currentNodeKey = data.currentNodeKey,

				//根据节点状态获取跳转的页面
				{url,title} = await processToPageDist(currentNodeKey);

			qt.openPage(
				`${url}?id=${id}&orderNo=${orderNo}&currentNodeKey=${currentNodeKey}&title=${title}`,
				winSetting.publish_review.width,
				winSetting.publish_review.height)


		});
	},
	refreshList(){
		let data = this.catchListParam;
		console.log('refresh')
		all.showLoadingRun(this,'getData',data);
	}
};

window.refreshList = function(){
	Page.refreshList();
};

app.run(Page);