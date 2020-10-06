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
			search:[
				{name:'产品来源:',type:'select',id:'a1',width:'30%',data:[{name:'请选择',value:''}]},
				{name:'时间:',type:'assDate',id:['a2','a3'],width:'50%'}
			],
			summary:[
				{name:'时间',value:'2011-11-11 -- 2011-11-11'},
				{name:'出款资金',value:'3,333,333,333.00000'},
				{name:'资金成本',value:'3,333,333,333.00000'},
				{name:'出款资金',value:'3,333,333,333.00000'},
				{name:'退款退费',value:'3,333,333,333.00000'},
				{name:'咨询费',value:'3,333,333,333.00000'},
				{name:'服务费',value:'3,333,333,333.00000'},
				{name:'优惠费用',value:'3,333,333,333.00000'},
				{name:'权证费',value:'3,333,333,333.00000'},
				{name:'盈亏',value:'+3,333,333,333.00000'},
				{name:'展期费',value:'+3,333,333,333.00000'},
				{name:'后置费',value:'+3,333,333,333.00000'}
			],
			table:'advance_type1',
			listApi:'advance1_list_api',
			totalApi:'advance1_total_api',
			width:'1800px',
			tempData:[
				{key1:'2011-11-11',key2:'3,333,333,333.00000',key3:'3,333,333,333.00000',
					key4:'3,333,333,333.00000',key5:'3,333,333,333.00000',key6:'3,333,333,333.00000',
					key7:'3,333,333,333.00000',key8:'3,333,333,333.00000',key9:'3,333,333,333.00000',
					key10:'3,333,333,333.00000',key11:'张三张三',key12:'张三张三'
				},
				{key1:'2011-11-11',key2:'3,333,333,333.00000',key3:'3,333,333,333.00000',
					key4:'3,333,333,333.00000',key5:'3,333,333,333.00000',key6:'3,333,333,333.00000',
					key7:'3,333,333,333.00000',key8:'3,333,333,333.00000',key9:'3,333,333,333.00000',
					key10:'3,333,333,333.00000',key11:'张三张三',key12:'张三张三'
				},
				{key1:'2011-11-11',key2:'3,333,333,333.00000',key3:'3,333,333,333.00000',
					key4:'3,333,333,333.00000',key5:'3,333,333,333.00000',key6:'3,333,333,333.00000',
					key7:'3,333,333,333.00000',key8:'3,333,333,333.00000',key9:'3,333,333,333.00000',
					key10:'3,333,333,333.00000',key11:'张三张三',key12:'张三张三'
				},
				{key1:'2011-11-11',key2:'3,333,333,333.00000',key3:'3,333,333,333.00000',
					key4:'3,333,333,333.00000',key5:'3,333,333,333.00000',key6:'3,333,333,333.00000',
					key7:'3,333,333,333.00000',key8:'3,333,333,333.00000',key9:'3,333,333,333.00000',
					key10:'3,333,333,333.00000',key11:'张三张三',key12:'张三张三'
				},
				{key1:'2011-11-11',key2:'3,333,333,333.00000',key3:'3,333,333,333.00000',
					key4:'3,333,333,333.00000',key5:'3,333,333,333.00000',key6:'3,333,333,333.00000',
					key7:'3,333,333,333.00000',key8:'3,333,333,333.00000',key9:'3,333,333,333.00000',
					key10:'3,333,333,333.00000',key11:'张三张三',key12:'张三张三'
				},
				{key1:'2011-11-11',key2:'3,333,333,333.00000',key3:'3,333,333,333.00000',
					key4:'3,333,333,333.00000',key5:'3,333,333,333.00000',key6:'3,333,333,333.00000',
					key7:'3,333,333,333.00000',key8:'3,333,333,333.00000',key9:'3,333,333,333.00000',
					key10:'3,333,333,333.00000',key11:'张三张三',key12:'张三张三'
				},
				{key1:'2011-11-11',key2:'3,333,333,333.00000',key3:'3,333,333,333.00000',
					key4:'3,333,333,333.00000',key5:'3,333,333,333.00000',key6:'3,333,333,333.00000',
					key7:'3,333,333,333.00000',key8:'3,333,333,333.00000',key9:'3,333,333,333.00000',
					key10:'3,333,333,333.00000',key11:'张三张三',key12:'张三张三'
				}
			]
		},
		//汇总垫资
		type2:{
			listApi:'advance2_list_api',
			totalApi:'advance2_total_api',
			search:[
				{name:'业务状态:',type:'select',id:'a1',width:'30%',data:[{name:'请选择',value:''}]},
				{name:'时间:',type:'assDate',id:['a2','a3'],width:'50%'}
			],
			summary:[
				{name:'出款金额',value:'3,333,333,333.00000'},
				{name:'出款笔数',value:'3,333,333,333.00000'},
				{name:'咨询费',value:'3,333,333,333.00000'},
				{name:'服务费',value:'3,333,333,333.00000'},
				{name:'权证费',value:'3,333,333,333.00000'},
				{name:'优惠费用',value:'3,333,333,333.00000'}
			],
			table:'advance_type2',
			width:'1400px',
			tempData: [{key1:'2011-11-11',key2:'3,333,333,333.00000',key3:'30000',
				key4:'3,333,333,333.00000',key5:'3,333,333,333.00000',key6:'3,333,333,333.00000',
				key7:'3,333,333,333.00000',key8:'张三张三',key9:'张三张三'
			}]
		},
		//待收本金明细
		type3:{
			listApi:'advance3_list_api',
			totalApi:'advance3_total_api',
			search:[
				{name:'时间:',type:'assDate',id:['a2','a3'],width:'50%'}
			],
			summary:[
				{name:'出款时间',value:'3,333,333,333.00000'},
				{name:'出款金额',value:'3,333,333,333.00000'},
				{name:'待回款金额',value:'3,333,333,333.00000'}
			],
			table:'advance_type3',
			width:'100%',
			tempData:[{key1:'2011-11-11',key2:'fdf333333333333333',key3:'张三张三',
				key4:'3,333,333,333.00000',key5:'张三张三',key6:'3,333,333,333.00000',
				key7:'2011-11-11'
			}]
		},
		//待收咨询费明细
		type4:{
			listApi:'advance4_list_api',
			totalApi:'advance4_total_api',
			search:[
				{name:'时间:',type:'assDate',id:['a2','a3'],width:'50%'}
			],
			summary:[
				{name:'出款时间',value:'3,333,333,333.00000'},
				{name:'出款金额',value:'3,333,333,333.00000'},
				{name:'待回款金额',value:'3,333,333,333.00000'}
			],
			table:'advance_type3',
			width:'100%',
			tempData:[{key1:'2011-11-11',key2:'fdf333333333333333',key3:'张三张三',
				key4:'3,333,333,333.00000',key5:'张三张三',key6:'3,333,333,333.00000',
				key7:'2011-11-11'
			}]
		},
		//待收服务费明细
		type5:{
			listApi:'advance5_list_api',
			totalApi:'advance5_total_api',
			search:[
				{name:'时间:',type:'assDate',id:['a2','a3'],width:'50%'}
			],
			summary:[
				{name:'出款时间',value:'3,333,333,333.00000'},
				{name:'出款金额',value:'3,333,333,333.00000'},
				{name:'待回款金额',value:'3,333,333,333.00000'}
			],
			table:'advance_type3',
			width:'100%',
			tempData:[{key1:'2011-11-11',key2:'fdf333333333333333',key3:'张三张三',
				key4:'3,333,333,333.00000',key5:'张三张三',key6:'3,333,333,333.00000',
				key7:'2011-11-11'
			}]
		},
		//综合统计
		type6:{
			listApi:'advance6_list_api',
			totalApi:'advance6_total_api',
			search:[
				{name:'时间:',type:'assDate',id:['a2','a3'],width:'50%'}
			],
			summary:[
				{name:'出款金额',value:'3,333,333,333.00000'},
				{name:'出款笔数',value:'3,333,333,333.00000'},
				{name:'平均天数',value:'3,333,333,333.00000'},
				{name:'平均出款金额',value:'3,333,333,333.00000'},
				{name:'平均费率',value:'3,333,333,333.00000'},
				{name:'平均优惠费用',value:'3,333,333,333.00000'}
			],
			table:'advance_type6',
			width:'1600px',
			tempData:[{key1:'2011-11-11',key2:'fdf333333333333333',key3:'3,333,333,333.00000',
				key4:'张三张三',key5:'44444',key6:'3,333,333,333.00000',
				key7:'3,333,333,333.00000',key8:'3,333,333,333.00000',
				key9:'3,333,333,333.00000',key10:'3,333,333,333.00000'
			}]
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
			totalApi:'arrival1_total_api',
			search:[
				{name:'产品来源:',type:'select',id:'a1',width:'30%',data:[{name:'请选择',value:''}]},
				{name:'时间:',type:'assDate',id:['a2','a3'],width:'50%'}
			],
			summary:[
				{name:'出款金额',value:'2011-11-11 -- 2011-11-11'},
				{name:'出款资金',value:'3,333,333,333.00000'},
				{name:'通道费',value:'3,333,333,333.00000'},
				{name:'咨询费',value:'3,333,333,333.00000'},
				{name:'权证费',value:'3,333,333,333.00000'},
				{name:'优惠费用',value:'3,333,333,333.00000'},
				{name:'盈亏',value:'3,333,333,333.00000'}
			],
			table:'arrival_type1',
			width:'1400px',
			tempData:[
				{key1:'fdf333333333333333',key2:'张三张三',key3:'张三张三',
					key4:'3,333,333,333.00000',key5:'3,333,333,333.00000',key6:'3,333,333,333.00000',
					key7:'3,333,333,333.00000',key8:'3,333,333,333.00000',key9:'3,333,333,333.00000'
				}
			]
		},
		//还款账台
		type2:{
			listApi:'arrival2_list_api',
			totalApi:'arrival2_total_api',
			search:[
				{name:'时间:',type:'assDate',id:['a2','a3'],width:'50%'}
			],
			summary:[
				{name:'还款笔数',value:'2011-11-11 -- 2011-11-11'},
				{name:'归还本金',value:'3,333,333,333.00000'},
				{name:'咨询费',value:'3,333,333,333.00000'}
			],
			table:'arrival_type2',
			width:'100%',
			tempData:[
				{key1:'张三张三',key2:'333',key3:'2011-11-11',
					key4:'张三张三',key5:'3,333,333,333.00000',key6:'3,333,333,333.00000'
				}
			]
		},
		//逾期明细
		type3:{
			listApi:'arrival3_list_api',
			totalApi:'arrival3_total_api',
			search:[],
			summary:[
				{name:'逾期笔数',value:'2011-11-11 -- 2011-11-11'},
				{name:'逾期本金',value:'3,333,333,333.00000'},
				{name:'逾期咨询费',value:'3,333,333,333.00000'}
			],
			table:'arrival_type3',
			width:'100%',
			tempData:[
				{key1:'张三张三',key2:'333',key3:'2011-11-11',key4:'30天',
					key5:'张三张三',key6:'3,333,333,333.00000',key7:'3,333,333,333.00000'
				}
			]
		},
		//借款汇总
		type4:{
			listApi:'arrival4_list_api',
			totalApi:'arrival4_total_api',
			search:[
				{name:'时间:',type:'assDate',id:['a2','a3'],width:'50%'},
				{name:'订单状态:',type:'select',id:'a1',width:'30%',data:[{name:'请选择',value:''}]},
				{name:'来源机构:',type:'select',id:'a1',width:'30%',data:[{name:'请选择',value:''}]},
				{name:'产品名称:',type:'select',id:'a1',width:'30%',data:[{name:'请选择',value:''}]},
				{name:'业务来源:',type:'select',id:'a1',width:'30%',data:[{name:'请选择',value:''}]},
			],
			summary:[
				{name:'出款金额',value:'2011-11-11 -- 2011-11-11'},
				{name:'出款笔数',value:'3,333,333,333.00000'},
				{name:'咨询费',value:'3,333,333,333.00000'},
				// {name:'居间费',value:'3,333,333,333.00000'},
				{name:'权证费',value:'3,333,333,333.00000'},
				{name:'优惠费用',value:'3,333,333,333.00000'}
			],
			table:'arrival_type4',
			width:'1600px',
			tempData:[
				{key1:'张三张三',key2:'张三张三',key3:'2011-11-11',key4:'fdf333333333333333',
					key5:'3,333,333,333.00000',key6:'30天',key7:'3,333,333,333.00000',
					key8:'3,333,333,333.00000',key9:'3,333,333,333.00000',key10:'3,333,333,333.00000',
					key11:'3,333,333,333.00000'
				}
			]
		}
	}
};


let Page = {
	type:1,
	totalData:null,
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
			_this.totalData = null;
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
			totalApi = newApi.totalApi;


		if(!this.totalData){
			let [total] = await ajax.send([
				api[totalApi]()
			]);
			this.createStatistics(total);
			this.totalData = true;
		}
		let [listData] = await ajax.send([
			api[listApi](data)
		]);
		let listNumber = listData.total;
		listData = listData.list || [];
		console.log(listData)

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
		console.log(data);
		//TODO
		let statistics = $('#statistics').get(0);
		statistics.data = SETTINGDATA[this.page]['type'+this.type].summary;
	},

	//列表
	createList(data){
		//TODO
		let table = $('#table_list').get(0);
		tableSet.set(table,SETTINGDATA[this.page]['type'+this.type].table);
		$(table).css({
			display:'block',
			width:'100%'
		});
		table.rowWidth = SETTINGDATA[this.page]['type'+this.type].width;
		// table.autoHeight();

		//TODO 数据获取
		table.show(SETTINGDATA[this.page]['type'+this.type].tempData);

		table.body.find('.__key7__').each(function(){
			$(this).addClass('hover');
		});
		table.body.find('.__key7__').click(function(){
			let data = $(this).parent().data('data');
			console.log(data);
		});
	}
};


app.run(Page);