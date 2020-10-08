//垫资业务、房抵业务  及其子页面公用js



let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	pageSizeSetting = require('./../../es6/pageSize'),
	urlParam = require('./../../es6/lib/fn/getParamFromUrl'),
	winSetting = require('./../../es6/winSetting'),
	tableSet = require('./../../es6/tableSetting'),
	selectData = require('./../../es6/selectData'),
	moneyFormat = require('./../../es6/lib/fn/number'),
	stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
	inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b-win-top');
require('./../../es6/yjl/b-search');
require('./../../es6/yjl/b_nav2');
require('./../../es6/yjl/b_statistics');
require('./../../es6/customElement/pc/table_list');
require('./../../es6/customElement/pc/pagination');


const SETTINGDATA = {
	//垫资
	advance:{
		nav:[
			{name:'盈亏明细',type:1},
			{name:'汇总垫资',type:2},
			{name:'待收本金明细',type:3},
			{name:'待收咨询费明细',type:4},
			{name:'待收服务费明细',type:5},
			{name:'综合统计',type:6}
		],
		//盈亏明细
		type1:{
			listApi:'advance1_list_api',
			param:{orderType:2},
			listKey:'yingkuiDetails',
			totalKey:'yingkuiSummary',
			search:[
				{name:'产品来源:',type:'select',id:'a1',width:'30%',data:[{name:'请选择',value:''}]},
				{name:'时间:',type:'assDate',id:['a2','a3'],width:'50%'}
			],
			summary:[
				{name:'时间',value:'2011-11-11 -- 2011-11-11',key:'',fn:function(data){
					let s = data.startTime??'',
						e = data.endTime??'';
						return s.split(' ')[0]+' - ' + e.split(' ')[0]
					}},
				{name:'出款资金',value:'3,333,333,333.00000',key:'applyMoney'},
				{name:'资金成本',value:'3,333,333,333.00000',key:'fundCost'},
				{name:'出款笔数',value:'3,333,333,333.00000',key:'orderCount'},
				{name:'退款退费',value:'3,333,333,333.00000',key:'refundMoney'},
				{name:'咨询费',value:'3,333,333,333.00000',key:'consultationFee'},
				{name:'服务费',value:'3,333,333,333.00000',key:'serviceFee'},
				{name:'优惠费用',value:'3,333,333,333.00000',key:'preferentialFee'},
				{name:'权证费',value:'3,333,333,333.00000',key:'warrantFee'},
				{name:'盈亏',value:'+3,333,333,333.00000',key:'profitAndLoss'},
				{name:'展期费',value:'+3,333,333,333.00000',key:'exhibitionPayment'},
				{name:'后置费',value:'+3,333,333,333.00000',key:'postPayment'}
			],
			table:'advance_type1',
			width:'1800px',
			tempData:[
				{key:'key1',apiKey:'',fn:function(data){
					let t = data.orderCreateTime??'';
						return t.split(' ')[0]
					}},
				{key:'key2',apiKey:'applyMoney',fn:null},
				{key:'key3',apiKey:'fundCost',fn:null},
				{key:'key4',apiKey:'channelCost',fn:null},
				{key:'key5',apiKey:'consultationFee',fn:null},
				{key:'key6',apiKey:'serviceFee',fn:null},
				{key:'key7',apiKey:'warrantFee',fn:null},
				{key:'key8',apiKey:'preferentialFee',fn:null},
				{key:'key9',apiKey:'profitAndLoss',fn:null},
				{key:'key10',apiKey:'refundMoney',fn:null},
				{key:'key11',apiKey:'customerName',fn:null},
				{key:'key12',apiKey:'userName',fn:null}
			]
		},
		//汇总垫资
		type2:{
			listApi:'advance2_list_api',
			param:{},
			listKey:'dianZiDetails',
			totalKey:'dianZiSummary',
			search:[
				{name:'业务状态:',type:'select',id:'a1',width:'30%',data:[{name:'请选择',value:''}]},
				{name:'时间:',type:'assDate',id:['a2','a3'],width:'50%'}
			],
			summary:[
				{name:'出款金额',value:'3,333,333,333.00000',key:'applyMoney'},
				{name:'出款笔数',value:'3,333,333,333.00000',key:'orderCount'},
				{name:'咨询费',value:'3,333,333,333.00000',key:'consultationFee'},
				{name:'服务费',value:'3,333,333,333.00000',key:'serviceFee'},
				{name:'权证费',value:'3,333,333,333.00000',key:'warrantFee'},
				{name:'优惠费用',value:'3,333,333,333.00000',key:'preferentialFee'}
			],
			table:'advance_type2',
			width:'1400px',
			tempData: [
				{key:'key1',apiKey:'',fn:function(data){
					let t = data.orderCreateTime??'';
					return t.split(' ')[0];
					}},
				{key:'key2',apiKey:'applyMoney',fn:null},
				// {key:'key3',apiKey:'orderCount',fn:null},
				{key:'key4',apiKey:'consultationFee',fn:null},
				{key:'key5',apiKey:'serviceFee',fn:null},
				{key:'key6',apiKey:'warrantFee',fn:null},
				{key:'key7',apiKey:'preferentialFee',fn:null},
				{key:'key8',apiKey:'customerName',fn:null},
				{key:'key9',apiKey:'userName',fn:null}
			]
		},
		//待收本金明细
		type3:{
			listApi:'advance3_list_api',
			param:{searchType:1},
			listKey:'daiShouDetails',
			totalKey:'daiShouSummary',
			search:[
				{name:'时间:',type:'assDate',id:['a2','a3'],width:'50%'}
			],
			summary:[
				{name:'出款时间',value:'3,333,333,333.00000',key:'',fn:function(data){
						let s = data.startTime??'',
							e = data.endTime??'';
						return s.split(' ')[0]+' - ' + e.split(' ')[0]
					}},
				{name:'出款金额',value:'3,333,333,333.00000',key:'applyMoney'},
				{name:'待回款金额',value:'3,333,333,333.00000',key:'notReceivedConsultationFee'}
			],
			table:'advance_type3',
			width:'100%',
			tempData:[
				{key:'key1',apiKey:'orderCreateTime',fn:function(data){
						let t = data.orderCreateTime;
						return t.split(' ')[0];
					}},
				{key:'key2',apiKey:'orderNo',fn:null},
				{key:'key3',apiKey:'customerName',fn:null},
				{key:'key4',apiKey:'applyMoney',fn:null},
				{key:'key5',apiKey:'userName',fn:null},
				{key:'key6',apiKey:'notReceivedConsultationFee',fn:null},
				{key:'key7',apiKey:'shouldReturnMoneyTime',fn:null}
			]
		},
		//待收咨询费明细
		type4:{
			listApi:'advance4_list_api',
			param:{searchType:2},
			listKey:'daiShouDetails',
			totalKey:'daiShouSummary',
			search:[
				{name:'时间:',type:'assDate',id:['a2','a3'],width:'50%'}
			],
			summary:[
				{name:'出款时间',value:'3,333,333,333.00000',key:'',fn:function(data){
						let s = data.startTime??'',
							e = data.endTime??'';
						return s.split(' ')[0]+' - ' + e.split(' ')[0]
					}},
				{name:'出款金额',value:'3,333,333,333.00000',key:'applyMoney'},
				{name:'待回款金额',value:'3,333,333,333.00000',key:'notReceivedConsultationFee'}
			],
			table:'advance_type3',
			width:'100%',
			tempData:[
				{key:'key1',apiKey:'orderCreateTime',fn:function(data){
						let t = data.orderCreateTime;
						return t.split(' ')[0];
					}},
				{key:'key2',apiKey:'orderNo',fn:null},
				{key:'key3',apiKey:'customerName',fn:null},
				{key:'key4',apiKey:'applyMoney',fn:null},
				{key:'key5',apiKey:'userName',fn:null},
				{key:'key6',apiKey:'notReceivedConsultationFee',fn:null},
				{key:'key7',apiKey:'shouldReturnMoneyTime',fn:null}
			]
		},
		//待收服务费明细
		type5:{
			listApi:'advance5_list_api',
			param:{searchType:3},
			listKey:'daiShouDetails',
			totalKey:'daiShouSummary',
			search:[
				{name:'时间:',type:'assDate',id:['a2','a3'],width:'50%'}
			],
			summary:[
				{name:'出款时间',value:'3,333,333,333.00000',key:'',fn:function(data){
						let s = data.startTime??'',
							e = data.endTime??'';
						return s.split(' ')[0]+' - ' + e.split(' ')[0]
					}},
				{name:'出款金额',value:'3,333,333,333.00000',key:'applyMoney'},
				{name:'待回款金额',value:'3,333,333,333.00000',key:'notReceivedConsultationFee'}
			],
			table:'advance_type3',
			width:'100%',
			tempData:[
				{key:'key1',apiKey:'orderCreateTime',fn:function(data){
						let t = data.orderCreateTime;
						return t.split(' ')[0];
					}},
				{key:'key2',apiKey:'orderNo',fn:null},
				{key:'key3',apiKey:'customerName',fn:null},
				{key:'key4',apiKey:'applyMoney',fn:null},
				{key:'key5',apiKey:'userName',fn:null},
				{key:'key6',apiKey:'notReceivedConsultationFee',fn:null},
				{key:'key7',apiKey:'shouldReturnMoneyTime',fn:null}
			]
		},
		//综合统计
		type6:{
			listApi:'advance6_list_api',
			param:{},
			listKey:'allStatisticDetails',
			totalKey:'allStatisticSummary',
			search:[
				{name:'时间:',type:'assDate',id:['a2','a3'],width:'50%'}
			],
			summary:[
				{name:'出款金额',value:'3,333,333,333.00000',key:'applyMoney'},
				{name:'出款笔数',value:'3,333,333,333.00000',key:'orderCount'},
				{name:'平均天数',value:'3,333,333,333.00000',key:'avgPeriod'},
				{name:'平均出款金额',value:'3,333,333,333.00000',key:'avgOutMoney'},
				{name:'平均费率',value:'3,333,333,333.00000',key:'avgRate'},
				{name:'平均优惠费用',value:'3,333,333,333.00000',key:'avgPreferentialFee'}
			],
			table:'advance_type6',
			width:'1600px',
			tempData:[
				{key:'key1',apiKey:'orderCreateTime',fn:function(data){
					let t = data.orderCreateTime??'';
					return t.split(' ')[0];
					}},
				{key:'key2',apiKey:'orderNo',fn:null},
				{key:'key3',apiKey:'applyMoney',fn:null},
				{key:'key4',apiKey:'userName',fn:null},
				{key:'key5',apiKey:'actualPeriod',fn:null},
				{key:'key6',apiKey:'consultationFee',fn:null},
				{key:'key7',apiKey:'serviceFee',fn:null},
				{key:'key8',apiKey:'warrantFee',fn:null},
				{key:'key9',apiKey:'preferentialFee',fn:null},
				{key:'key10',apiKey:'smallTotal',fn:null}
			]
		}
	},
	//房抵
	arrival:{
		nav:[
			{name:'盈亏明细',type:1},
			{name:'还款账台',type:2},
			{name:'逾期明细',type:3},
			{name:'借款汇总',type:4}
		],
		//盈亏明细
		type1:{
			listApi:'arrival1_list_api',
			param:{orderType:1},
			listKey:'yingkuiDetails',
			totalKey:'yingkuiSummary',
			search:[
				{name:'产品来源:',type:'select',id:'a1',width:'30%',data:[{name:'请选择',value:''}]},
				{name:'时间:',type:'assDate',id:['a2','a3'],width:'50%'}
			],
			summary:[
				{name:'出款金额',value:'2011-11-11 -- 2011-11-11',key:'applyMoney'},
				{name:'出款笔数',value:'3,333,333,333.00000',key:'orderCount'},
				{name:'通道费',value:'3,333,333,333.00000',key:'channelCost'},
				{name:'咨询费',value:'3,333,333,333.00000',key:'consultationFee'},
				{name:'权证费',value:'3,333,333,333.00000',key:'warrantFee'},
				{name:'优惠费用',value:'3,333,333,333.00000',key:'preferentialFee'},
				{name:'盈亏',value:'3,333,333,333.00000',key:'profitAndLoss'}
			],
			table:'arrival_type1',
			width:'1400px',
			tempData:[
				{key:'key1',apiKey:'orderNo',fn:null},
				{key:'key2',apiKey:'customerName',fn:null},
				{key:'key3',apiKey:'userName',fn:null},
				{key:'key4',apiKey:'applyMoney',fn:null},
				{key:'key5',apiKey:'paidPrincipal',fn:null},
				{key:'key6',apiKey:'consultationFee',fn:null},
				// {key:'key7',apiKey:'',fn:null},
				{key:'key8',apiKey:'preferentialFee',fn:null},
				{key:'key9',apiKey:'smallTotal',fn:null}
			]
		},
		//还款账台
		type2:{
			listApi:'arrival2_list_api',
			param:{},
			listKey:'paymentDetails',
			totalKey:'paymentSummary',
			search:[
				{name:'时间:',type:'assDate',id:['a2','a3'],width:'50%'}
			],
			summary:[
				{name:'还款笔数',value:'2011-11-11 -- 2011-11-11',key:'paymentCount'},
				{name:'归还本金',value:'3,333,333,333.00000',key:'paymentPrincipal'},
				{name:'咨询费',value:'3,333,333,333.00000',key:'consultationFee'}
			],
			table:'arrival_type2',
			width:'100%',
			tempData:[
				{key:'key1',apiKey:'customerName',fn:null},
				{key:'key2',apiKey:'planNumber',fn:null},
				{key:'key3',apiKey:'',fn:function(data){
					let t = data.repaymentTime??'';
					return t.split(' ')[0];
					}},
				{key:'key4',apiKey:'createName',fn:null},
				{key:'key5',apiKey:'actualRepaymentPrincipal',fn:null},
				{key:'key6',apiKey:'consultationFee',fn:null},
			]
		},
		//逾期明细
		type3:{
			listApi:'arrival3_list_api',
			param:{},
			listKey:'overdueDetails',
			totalKey:'overdueSummary',
			search:[],
			summary:[
				{name:'逾期笔数',value:'2011-11-11 -- 2011-11-11',key:'overdueCount'},
				{name:'逾期本金',value:'3,333,333,333.00000',key:'overduePrincipal'},
				{name:'逾期咨询费',value:'3,333,333,333.00000',key:'overdueConsultationFee'}
			],
			table:'arrival_type3',
			width:'100%',
			tempData:[
				{key:'key1',apiKey:'customerName',fn:null},
				{key:'key2',apiKey:'planNumber',fn:null},
				{key:'key3',apiKey:'',fn:function(data){
					let t = data.repaymentTime??'';
					return t.split(' ')[0];
					}},
				{key:'key4',apiKey:'overDueDays',fn:null},
				{key:'key5',apiKey:'createName',fn:null},
				{key:'key6',apiKey:'repaymentPrincipal',fn:null},
				{key:'key7',apiKey:'consultationFee',fn:null}
			]
		},
		//借款汇总
		type4:{
			listApi:'arrival4_list_api',
			param:{},
			listKey:'allStatisticDetails',
			totalKey:'allStatisticSummary',
			search:[
				{name:'时间:',type:'assDate',id:['a2','a3'],width:'50%'},
				{name:'订单状态:',type:'select',id:'a1',width:'30%',data:[{name:'请选择',value:''}]},
				{name:'来源机构:',type:'select',id:'a1',width:'30%',data:[{name:'请选择',value:''}]},
				{name:'产品名称:',type:'select',id:'a1',width:'30%',data:[{name:'请选择',value:''}]},
				{name:'业务来源:',type:'select',id:'a1',width:'30%',data:[{name:'请选择',value:''}]},
			],
			summary:[
				{name:'出款金额',value:'2011-11-11 -- 2011-11-11',key:'applyMoney'},
				{name:'出款笔数',value:'3,333,333,333.00000',key:'orderCount'},
				{name:'咨询费',value:'3,333,333,333.00000',key:'consultationFee'},
				// {name:'居间费',value:'3,333,333,333.00000'},
				{name:'权证费',value:'3,333,333,333.00000',key:'warrantFee'},
				{name:'优惠费用',value:'3,333,333,333.00000',key:'preferentialFee'}
			],
			table:'arrival_type4',
			width:'1600px',
			tempData:[
				{key:'key1',apiKey:'customerName',fn:null},
				{key:'key2',apiKey:'userName',fn:null},
				{key:'key3',apiKey:'orderCreateTime',fn:function (data) {
					let t = data.orderCreateTime??'';
					return t.split(' ')[0];
					}},
				{key:'key4',apiKey:'orderNo',fn:null},
				{key:'key5',apiKey:'applyMoney',fn:null},
				{key:'key6',apiKey:'period',fn:null},
				{key:'key7',apiKey:'consultationFee',fn:null},
				{key:'key8',apiKey:'serviceFee',fn:null},
				{key:'key9',apiKey:'warrantFee',fn:null},
				{key:'key10',apiKey:'preferentialFee',fn:null},
				{key:'key11',apiKey:'smallTotal',fn:null}
			]
		}
	}
};


let Page = {
	type:1,
	init(){
		this.type = urlParam().type || 1;
		let page = window.location.pathname;
		page = page.substr(page.lastIndexOf('/')+1);
		page = page.split('.')[0];
		this.page = page;


		all.showLoadingRun(this,'run');
	},
	async run(){
		await all.getUserInfo();
		this.createNav();
		this.createSearch();

		await this.getData({pageNum:1});
		// this.createStatistics();
		// this.createList();

	},
	createNav(){
		let nav = $('#nav').get(0);
		nav.data = SETTINGDATA[this.page].nav;
	},

	//搜索条
	createSearch(){
		let search = $('#b_search').get(0),
			_this = this,
			searchData = SETTINGDATA[this.page]['type'+this.type].search;

		if(searchData.length == 0){
			$(search).remove();
			return;
		}
		search.inputData = searchData;
		search.clickFn = function(rs){
			rs.pageNum = 1;
			all.showLoadingRun(_this,'getData',rs);
		};


		inputStyle.searchSet(search);
	},
	async getData(data){
		let _this = this;

		data.pageSize = pageSizeSetting.management_notice;

		let newApi = SETTINGDATA[this.page]['type'+this.type],
			listApi = newApi.listApi,
			param = newApi.param;
		for(let [key,val] of Object.entries(param)){
			data[key] = val;
		}

		let [listData] = await ajax.send([
			api[listApi](data)
		]);

		let list = listData[newApi.listKey]??{},
			total = listData[newApi.totalKey]??{};

		this.createStatistics(total);

		let listNumber = list.total;
		listData = list.list || [];
		this.createList(listData);

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
	//汇总
	createStatistics(data){
		console.log('汇总数据------');
		console.log(data);
		let statistics = $('#statistics').get(0),
			dist = SETTINGDATA[this.page]['type'+this.type].summary;
		statistics.data = this.getTotalData(dist,data);
	},
	getTotalData(dist,data){
		dist.map(rs=>{
			let key = rs.key;
			if(key){
				rs.value = data[key] || '';
			}else{
				rs.value = '无字段';
			}

			if(rs.fn){
				rs.value = rs.fn(data);
			}

		});
		return dist;
	},


	//列表
	createList(data){
		let table = $('#table_list').get(0);
		tableSet.set(table,SETTINGDATA[this.page]['type'+this.type].table);
		$(table).css({
			display:'block',
			width:'100%'
		});
		table.rowWidth = SETTINGDATA[this.page]['type'+this.type].width;
		// table.autoHeight();

		console.log('列表数据-------');
		console.log(data);

		let tableDist = SETTINGDATA[this.page]['type'+this.type].tempData;
		table.show(this.getTableData(tableDist,data));
	},
	getTableData(dist,data){
		let newData = [];
		data.map(rs=>{
			let rowData = {};
			dist.map(d=>{
				let tableKey = d.key,
					apiKey = d.apiKey,
					fn = d.fn,
					value = rs[apiKey]??'';

				if(!apiKey){
					value = '无字段';
				}

				if(fn){
					value = fn(rs);
				}

				rowData[tableKey] = value;
			});
			newData.push(rowData);
		});
		console.log(newData)
		return newData;
	}
};


app.run(Page);