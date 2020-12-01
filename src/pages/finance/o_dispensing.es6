let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	bTitleBtn = require('./../../es6/b_title_btn'),
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
require('./../../es6/yjl/b_title1');
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
		await selectData($('#form'));
		let [data,history] = await ajax.send([
			api.order_get_byId({id:this.id}),
			api.order_get_history_byOrderNo({orderNo:this.orderNo})
		]);
		await all.setOrderTopData(4,data);
		await all.setOrderHistoryData(history,true);

		let type = data.businessKey;
		this.bindData(data,type);
		this.addBtnEvent();

	},
	bindData(data,type){
		let newData = (type==1)? data.orderClientBankAccount : data.orderReturnRepayment;
		newData = newData || {};
		all.setFromVal($('#form1'),newData);


		let dom1 = $('#outMoneyAmount_'),
			dom2 = $('#loanPassageFeeRate_');
		bTitleBtn.addDelFn(
			$('#tdtt').get(0),
			$('#form'),
			$('#tdpz'),
			function(dom_body){
				let body = dom_body.find('.change_body');
				$('#loanPassageType').get(0).change= function(val){
					body.html('');
					if(val==1){
						let dom = dom1.clone().attr({id:'loanPassagewayFee'});
						body.append(dom);
					}else if(val==2){
						let dom = dom2.clone().attr({id:'loanPassageFeeRate'});
						body.append(dom);
					}else{

					}
					inputStyle.set(true,true);
				}
			}
		);




	},
	addBtnEvent(){
		let submit = $('#submit'),
			cancel = $('#cancel'),
			_this = this;

		submit.click(function(){
			all.showLoadingRun(all,'reviewSubmit',{
				formDom:$('#form2'),
				orderNo:_this.orderNo,
				state:1,
				currentNodeKey:_this.currentNodeKey
			});
		});

		cancel.click(function(){
			qt.closeWin();
		});
	}
	// ,
	// async submitFn(state){
	// 	let form = await all.getFromVal($('#form')),
	// 		uploaded = await all.uploadFile(form.attachUrls);
	//
	// 	form.attachUrls = uploaded.join(',');
	// 	form.auditStatus = state;
	// 	form.orderNo = this.orderNo;
	// 	form.currentNodeKey = this.currentNodeKey;
	//
	// 	console.log(form);
	//
	//
	// 	// await ajax.send([
	// 	// 	api.finance_pay_back_submit(form)
	// 	// ]);
	// 	// await qt.alert('提交成功！');
	// 	// qt.closeWin();
	// }

};


app.run(Page);