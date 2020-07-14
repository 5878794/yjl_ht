let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	tableSet = require('./../../es6/tableSetting'),
	inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b-win-top');
require('./../../es6/yjl/b-search');
require('./../../es6/customElement/pc/table_list');
require('./../../es6/customElement/pc/pagination');



let loading;
let Page = {
	init(){
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
		this.createSearch();
		this.createList();
		this.createPagination();

	},
	createSearch(){
		let search = $('#b_search').get(0);
		search.inputData = [
			{name:'客户姓名:',type:'text',id:'a1',width:'25%'},
			{name:'客户电话:',type:'text',id:'a2',width:'25%'},
			{name:'产品类型:',type:'select',id:'a3',width:'25%',data:[{name:'请选择',value:''}]},   //注意宽度无法低于正常的input值，需要尝试
			{name:'订单状态:',type:'select',id:'a4',width:'25%',data:[{name:'请选择',value:''}]},
			{name:'订单号',type:'text',id:'a5',width:'30%'},
			{name:'出款时间',type:'assDate',id:['a6','a7'],width:'50%'}
		];
		search.clickFn = function(rs){
			console.log(rs);    //返回 对应的 {id:value,...}
		};


		inputStyle.searchSet(search);
	},
	createList(){
		let table = $('#table_list').get(0);
		tableSet.set(table,'finance');

		//TODO 数据获取
		let tempData = [
			{
				id:1,key1:'13182319831123',
				key2:'张三张三',key3:'张三三三',key4:'12312312312',
				key5:'非交易垫资',key6:'3,000,000,000.00000',
				key7:'300,000,000.00000',key8:'300,000,000.00000',key9:'300,000,000.00000',
				key10:'300,000,000.00000',key11:'300,000,000.00000',key12:'-300,000,000.00000',
				key13:'业务状态状态状态',key14:'2020-11-11'
			},
			{
				id:1,key1:'13182319831123',
				key2:'张三张三',key3:'张三三三',key4:'12312312312',
				key5:'非交易垫资',key6:'3,000,000,000.00000',
				key7:'300,000,000.00000',key8:'300,000,000.00000',key9:'300,000,000.00000',
				key10:'300,000,000.00000',key11:'300,000,000.00000',key12:'+300,000,000.00000',
				key13:'业务状态状态状态',key14:'2020-11-11'
			},
			{
				id:1,key1:'13182319831123',
				key2:'张三张三',key3:'张三三三',key4:'12312312312',
				key5:'非交易垫资',key6:'3,000,000,000.00000',
				key7:'300,000,000.00000',key8:'300,000,000.00000',key9:'300,000,000.00000',
				key10:'300,000,000.00000',key11:'300,000,000.00000',key12:'-300,000,000.00000',
				key13:'业务状态状态状态',key14:'2020-11-11'
			},
			{
				id:1,key1:'13182319831123',
				key2:'张三张三',key3:'张三三三',key4:'12312312312',
				key5:'非交易垫资',key6:'3,000,000,000.00000',
				key7:'300,000,000.00000',key8:'300,000,000.00000',key9:'300,000,000.00000',
				key10:'300,000,000.00000',key11:'300,000,000.00000',key12:'+300,000,000.00000',
				key13:'业务状态状态状态',key14:'2020-11-11'
			},
			{
				id:1,key1:'13182319831123',
				key2:'张三张三',key3:'张三三三',key4:'12312312312',
				key5:'非交易垫资',key6:'3,000,000,000.00000',
				key7:'300,000,000.00000',key8:'300,000,000.00000',key9:'300,000,000.00000',
				key10:'300,000,000.00000',key11:'300,000,000.00000',key12:'-300,000,000.00000',
				key13:'业务状态状态状态',key14:'2020-11-11'
			},
			{
				id:1,key1:'13182319831123',
				key2:'张三张三',key3:'张三三三',key4:'12312312312',
				key5:'非交易垫资',key6:'3,000,000,000.00000',
				key7:'300,000,000.00000',key8:'300,000,000.00000',key9:'300,000,000.00000',
				key10:'300,000,000.00000',key11:'300,000,000.00000',key12:'-300,000,000.00000',
				key13:'业务状态状态状态',key14:'2020-11-11'
			},
			{
				id:1,key1:'13182319831123',
				key2:'张三张三',key3:'张三三三',key4:'12312312312',
				key5:'非交易垫资',key6:'3,000,000,000.00000',
				key7:'300,000,000.00000',key8:'300,000,000.00000',key9:'300,000,000.00000',
				key10:'300,000,000.00000',key11:'300,000,000.00000',key12:'-300,000,000.00000',
				key13:'业务状态状态状态',key14:'2020-11-11'
			}


		];
		table.show(tempData);

		table.body.find('.__key6__').each(function(){
			$(this).addClass('hover');
		});
		table.body.find('.__key6__').click(function(){
			let data = $(this).parent().data('data');
			console.log(data);
		});
	},
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