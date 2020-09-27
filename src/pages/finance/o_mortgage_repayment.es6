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
		let [data,history,list] = await ajax.send([
			api.order_get_byId({id:this.id}),
			api.order_get_history_byOrderNo({orderNo:this.orderNo}),
			api.finance_Installment_list({orderNo:this.orderNo})
		]);
		await all.setOrderTopData(4,data);
		await all.setOrderHistoryData(history,true);

		this.createList(list.orderRepaymentPlanInfoVoList || []);
		this.bindTotalData(list);
		this.addBtnEvent();
	},
	bindTotalData(data){
		let dom = $('#total_wk'),
			wkDom = dom.find('span'),
			yqfDom = dom.find('div');
		//尾款
		wkDom.text(moneyFormat(data.returnBalanceTotal??0,5));
		//预期
		yqfDom.text('('+moneyFormat(data.overdueTotalFee??0,5)+')');

	},
	createList(data){
		let table = $('#list').get(0),
			_this = this;

		tableSet.set(table,'mortgage_repayment');
		table.listBody.removeClass('boxflex1');
		table.rowWidth = 1200;

		data.map(rs=>{
			//还款时间
			rs.repaymentTime_ = stamp2Date.getDate1(rs.repaymentTime);
			//归还本金
			rs.repaymentPrincipal_ = moneyFormat(rs.repaymentPrincipal,5);
			//咨询费用
			rs.consultationFee_ = moneyFormat(rs.consultationFee,5);
			//当期合计
			rs.actualRepaymentFee_ = moneyFormat(rs.actualRepaymentFee,5);
			//剩余本金
			rs.leftPrincipal_ = moneyFormat(rs.leftPrincipal,5);
			//实际还款时间
			rs.actualRepaymentTime_ = stamp2Date.getDate1(rs.actualRepaymentTime);
			//实际还款合计
			rs.actualRepaymentFeeTotal_ = moneyFormat(rs.actualRepaymentFeeTotal,5,true);
			//逾期费
			rs.overdueFee_ = moneyFormat(rs.overdueFee,5,true);
		})


		table.show(data);


		let addBtn = false;
		table.body.find('.__overdueFee___').each(function(){
			let body = $(this).parent(),
				data = body.parent().data('data');
			body.removeClass('box_scc').addClass('box_hcc');
			body.find('div').css({width:'auto'});
			if(data.overdueFee_){
				$(this).text('('+data.overdueFee_+')');
			}


			if(!addBtn){
				if(!data.actualRepaymentFeeTotal_){
					addBtn = true;
					$(this).text('提交还款').css({
						color:'rgb(86,123,249)'
					}).addClass('hover');

					$(this).click(function(){
						qt.openPage(
							`../finance/o_installment_mortgage_repayment.html?id=${_this.id}&orderNo=${_this.orderNo}&currentNodeKey=${_this.currentNodeKey}`,
							winSetting.o_installment_mortgage_repayment.width,
							winSetting.o_installment_mortgage_repayment.height)
					});
				}
			}
		});

		table.body.find('.__row__').css({
			cursor:'default'
		})
	},
	addBtnEvent(){
		let btn = $('#back_pay'),
			close = $('#submit'),
			_this = this;

		btn.click(function(){
			qt.openPage(
				`../finance/o_last_installment_mortgage_repayment.html?id=${_this.id}&orderNo=${_this.orderNo}&currentNodeKey=${_this.currentNodeKey}`,
				winSetting.o_last_installment_mortgage_repayment.width,
				winSetting.o_last_installment_mortgage_repayment.height)
		});

		close.click(function(){
			qt.closeWin();
		});
	}

};


app.run(Page);