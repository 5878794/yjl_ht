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

		this.refundTypeDist = await selectData('backPayMethod') || {};
		this.businessDist = await selectData('businessType') || {};

		await this.getData({pageNum:1});

	},
	async getData(data){
		let _this = this;

		data.pageSize = pageSizeSetting.management_notice;
		let [listData] = await ajax.send([
			api.finance_refund_list(data)
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
	createSearch(){
		let search = $('#b_search').get(0);
		search.inputData = [
			{name:'客户姓名:',type:'text',id:'clientName',width:'30%'},
			{name:'客户电话:',type:'text',id:'clientMobile',width:'30%'}
		];
		search.clickFn = function(rs){
			rs.pageNum = 1;
			all.showLoadingRun(_this,'getData',rs);
		};


		inputStyle.searchSet(search);
	},
	createList(data){
		let table = $('#table_list').get(0);
		tableSet.set(table,'finance_refund');

		data.map(rs=>{
			//退费类型
			rs.refundTypeKey_ = this.refundTypeDist[rs.refundTypeKey];
			//业务类型
			rs.businessKey_ = this.businessDist[rs.businessKey];
			//退费金额
			rs.refundMoney_ = moneyFormat(rs.refundMoney,5);

			rs.key8 = '查看详情';
		});

		table.show(data);

		table.body.find('.__key8__').addClass('hover');
		table.body.find('.__row__').css({cursor:'pointer'});
		table.body.find('.__row__').click(function(){
			let data = $(this).data('data'),
				type = data.refundTypeKey,
				id = data.id,
				orderNo = data.orderNo;

			if(type == 1){
				//退尾款
				let url = `./o_last_refund.html?orderNo=${orderNo}&id=${id}`;
				qt.openPage(
					url,
					winSetting.o_last_refund.width,
					winSetting.o_last_refund.height)
			}else{
				//退费用
				let url = `./o_Refund.html?orderNo=${orderNo}&id=${id}`;
				qt.openPage(
					url,
					winSetting.o_Refund.width,
					winSetting.o_Refund.height)
			}
		});
	}
};


app.run(Page);