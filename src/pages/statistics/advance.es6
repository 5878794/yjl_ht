//垫资业务、房抵业务  及其子页面公用js

let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	tableSet = require('./../../es6/tableSetting'),
	inputStyle = require('./../../es6/inputStyle'),
	urlParam = require('./../../es6/lib/fn/getParamFromUrl');



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
		summary:{
			'type1':[
				{name:'',value:''}
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
		]
	}
};


let loading;
let Page = {
	type:1,
	init(){
		this.type = urlParam().type || 1;
		let page = window.location.pathname;
		page = page.substr(page.lastIndexOf('/')+1);
		page = page.split('.')[0];
		this.page = page;


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
		this.createNav();
		this.createSearch();
		this.createStatistics();
		this.createList();
		this.createPagination();

	},
	createNav(){
		let nav = $('#nav').get(0);
		nav.data = SETTINGDATA[this.page].nav;
	},

	//搜索条
	createSearch(){
		let search = $('#b_search').get(0);
		search.inputData = [
			{name:'客户姓名:',type:'text',id:'a1',width:'30%'},
			{name:'客户电话:',type:'text',id:'a2',width:'30%'}
		];
		search.clickFn = function(rs){
			console.log(rs);    //返回 对应的 {id:value,...}
		};


		inputStyle.searchSet(search);
	},
	//汇总
	createStatistics(){
		let statistics = $('#statistics').get(0);
		statistics.data = [
			{name:'时间',value:'2011-11-11 -- 2011-11-11'},
			{name:'出款资金',value:'3,333,333,333.00000'},
			{name:'出款资金',value:'3,333,333,333.00000'},
			{name:'出款资金',value:'3,333,333,333.00000'},
			{name:'出款资金',value:'3,333,333,333.00000'}
		];
	},

	//列表
	createList(){
		let table = $('#table_list').get(0);
		tableSet.set(table,'refund');

		//TODO 数据获取
		let tempData = [
			{
				id:1,key1:'退尾款',
				key2:'张三',key3:'12312312312',key4:'房抵押',
				key5:'3,000,000.00000',key6:'2,000.00000',key7:'申请'
			},
			{
				id:1,key1:'退尾款',
				key2:'张三',key3:'12312312312',key4:'房抵押',
				key5:'3,000,000.00000',key6:'2,000.00000',key7:'申请'
			},
			{
				id:1,key1:'退尾款',
				key2:'张三',key3:'12312312312',key4:'房抵押',
				key5:'3,000,000.00000',key6:'2,000.00000',key7:'申请'
			},
			{
				id:1,key1:'退尾款',
				key2:'张三',key3:'12312312312',key4:'房抵押',
				key5:'3,000,000.00000',key6:'2,000.00000',key7:'申请'
			},
			{
				id:1,key1:'退尾款',
				key2:'张三',key3:'12312312312',key4:'房抵押',
				key5:'3,000,000.00000',key6:'2,000.00000',key7:'申请'
			},
			{
				id:1,key1:'退尾款',
				key2:'张三',key3:'12312312312',key4:'房抵押',
				key5:'3,000,000.00000',key6:'2,000.00000',key7:'申请'
			},
			{
				id:1,key1:'退尾款',
				key2:'张三',key3:'12312312312',key4:'房抵押',
				key5:'3,000,000.00000',key6:'2,000.00000',key7:'申请'
			},
			{
				id:1,key1:'退尾款',
				key2:'张三',key3:'12312312312',key4:'房抵押',
				key5:'3,000,000.00000',key6:'2,000.00000',key7:'申请'
			},
			{
				id:1,key1:'退尾款',
				key2:'张三',key3:'12312312312',key4:'房抵押',
				key5:'3,000,000.00000',key6:'2,000.00000',key7:'申请'
			}


		];
		table.show(tempData);

		table.body.find('.__key7__').each(function(){
			$(this).addClass('hover');
		});
		table.body.find('.__key7__').click(function(){
			let data = $(this).parent().data('data');
			console.log(data);
		});
	},

	//分页
	createPagination(){
		let fy = $('#table_pagination').get(0);
		fy.show({
			nowPage: 10,             //当前页码       默认：1
			listLength: 149,         //总记录数
			pageSize: 10             //分页数         默认：10
		});
		fy.clickFn = function(n){
			console.log(n)          //点击事件，返回点击的页码
		};
		fy.selectBg = 'rgb(86,123,249)';        //设置当前页码显示的背景色  默认：#cc9800

	}
};


app.run(Page);