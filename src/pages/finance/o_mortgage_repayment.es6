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



require('./../../es6/yjl/b_order_info');
require('./../../es6/yjl/b-order-history');
require('./../../es6/yjl/b_title');
require('./../../es6/customElement/pc/table_list');
require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_money');
require('./../../es6/customElement/pc/input_date');
require('./../../es6/customElement/pc/input_file');



let Page = {
	init(){
		all.showLoadingRun(this,'run');
	},
	async run(){
		inputStyle.set(true,true);
		let param = getParamFromUrl();
		this.id = param.id;
		this.orderNo = param.orderNo;
		this.currentNodeKey = param.currentNodeKey;

		await all.getUserInfo();
		let [data,history] = await ajax.send([
			api.order_get_byId({id:this.id}),
			api.order_get_history_byOrderNo({orderNo:this.orderNo})
		]);
		await all.setOrderTopData(4,data);
		await all.setOrderHistoryData(history,true);



		//TODO
		this.createList();
		this.addBtnEvent();
	},

	createList(){
		let table = $('#list').get(0);
		tableSet.set(table,'mortgage_repayment');
		table.listBody.removeClass('boxflex1');
		table.rowWidth = 1200;

		//TODO 数据获取
		let tempData = [
			{
				id:1,key1:'333',
				key2:'2020-11-11',key3:'3,000,000,000.00000',key4:'3,000,000,000.00000',
				key5:'3,000,000,000.00000',key6:'3,000,000,000.00000',
				key7:'2011-11-11',key8:'300,000,000.00000',key9:'300,000,000.00000'
			},
			{
				id:1,key1:'333',
				key2:'2020-11-11',key3:'3,000,000,000.00000',key4:'3,000,000,000.00000',
				key5:'3,000,000,000.00000',key6:'3,000,000,000.00000',
				key7:'2011-11-11',key8:'300,000,000.00000',key9:'300,000,000.00000'
			},
			{
				id:1,key1:'333',
				key2:'2020-11-11',key3:'3,000,000,000.00000',key4:'3,000,000,000.00000',
				key5:'3,000,000,000.00000',key6:'3,000,000,000.00000',
				key7:'2011-11-11',key8:'',key9:''
			},
			{
				id:1,key1:'333',
				key2:'2020-11-11',key3:'3,000,000,000.00000',key4:'3,000,000,000.00000',
				key5:'3,000,000,000.00000',key6:'3,000,000,000.00000',
				key7:'2011-11-11',key8:'',key9:''
			},
			{
				id:1,key1:'333',
				key2:'2020-11-11',key3:'3,000,000,000.00000',key4:'3,000,000,000.00000',
				key5:'3,000,000,000.00000',key6:'3,000,000,000.00000',
				key7:'2011-11-11',key8:'',key9:''
			}
		];
		table.show(tempData);


		let addBtn = false;
		table.body.find('.__key9__').each(function(){
			let body = $(this).parent(),
				data = body.parent().data('data');
			body.removeClass('box_scc').addClass('box_hcc');
			body.find('div').css({width:'auto'});

			if(data.key9){
				$(this).text('('+data.key9+')');
			}


			if(!addBtn){
				if(!data.key8){
					addBtn = true;
					$(this).text('提交还款').css({
						color:'rgb(86,123,249)'
					}).addClass('hover');

					$(this).click(function(){
						console.log('提交还款')
					});
				}
			}
		});

		table.body.find('.__key6__').click(function(){
			let data = $(this).parent().data('data');
			console.log(data);
		});
	},
	addBtnEvent(){
		let btn = $('#back_pay');
		btn.click(function(){
			console.log('还款')
		});
	}

};


app.run(Page);