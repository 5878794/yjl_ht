

let DIST = {
	'afterLoan/o_add_after_loan':{w:'800',h:'550'},
	'afterLoan/o_add_after_loan1':{w:'1200',h:'600'},
	'afterLoan/o_info':{w:'1200',h:'600'},
	'afterLoan/o_mdf_repayment_account':{w:'800',h:'390'},
	'afterLoan/o_mdf_user_info':{w:'800',h:'460'},
	'afterLoan/o_rollover':{w:'800',h:'370'},
	'afterLoan/o_rollover1':{w:'1200',h:'600'},
	'afterLoan/o_write_off':{w:'1200',h:'400'},
	'afterLoan/o_write_off1':{w:'1200',h:'600'},
	'afterLoan/o_write_off2':{w:'1200',h:'600'},
	'approve/o_approve_advance':{w:'1200',h:'600'},
	'approve/o_approve_room':{w:'1200',h:'600'},
	'business/business_info':{w:'1200',h:'600'},
	'draft/draft_del':{w:'800',h:'230'},
	'file/o_add':{w:'800',h:'550'},
	'file/o_info':{w:'800',h:'600'},
	'file/o_info1':{w:'800',h:'600'},
	'file/o_info2':{w:'800',h:'600'},
	'finance/o_advance_payment':{w:'1200',h:'600'},
	'finance/o_bookkeeping':{w:'1200',h:'600'},
	'finance/o_business_fee_payment':{w:'1200',h:'600'},
	'finance/o_dispensing':{w:'1200',h:'600'},
	'finance/o_installment_mortgage_repayment':{w:'1200',h:'600'},
	'finance/o_last_installment_mortgage_repayment':{w:'1200',h:'600'},
	'finance/o_mortgage_repayment':{w:'1200',h:'600'},
	'finance/o_payment_of_post_operation_fee':{w:'1200',h:'600'},
	'finance/o_Refund':{w:'1200',h:'600'},
	'finance/o_rollover_collection':{w:'1200',h:'600'},
	'index/o_add_order':{w:'800',h:'330'},
	'index/o_add_order_advance':{w:'1200',h:'600'},
	'index/o_add_order_info':{w:'1200',h:'600'},
	'index/o_add_order_room':{w:'1200',h:'600'},
	'index/o_add_order_view':{w:'1200',h:'600'},
	'index/sort':{w:'1200',h:'600'},
	'management/o_add_notice':{w:'800',h:'580'},
	'management/o_add_staff':{w:'1200',h:'470'},
	'publish/overSingle':{w:'1200',h:'600'},
	'publish/review':{w:'1200',h:'600'},
	'setting/o_add':{w:'800',h:'250'},
	'setting/o_add_channel':{w:'800',h:'310'},
	'setting/o_add_product':{w:'800',h:'600'},
	'warrant/o_warrant_mdf':{w:'1200',h:'600'},
	'warrant/o_warrant_mdf_room':{w:'1200',h:'600'},
	'warrant/o_warrant_pay_back':{w:'1200',h:'600'}
};


module.exports = {
	//通用
	publish(url){

		let nowPath = window.location.pathname;
		nowPath = nowPath.split('\/');
		nowPath = nowPath[nowPath.length-2]??'';
		let newUrl = url.split('\/'),
			newPath = [];

		if(url.indexOf('..\/')>-1){
			newPath.push(newUrl[1]);
			let fileName = newUrl[2].split('.');
			newPath.push(fileName[0]);
		}else{
			newPath.push(nowPath);
			let fileName = newUrl[1].split('.');
			newPath.push(fileName[0]);
		}


		newPath = newPath[0]+'/'+newPath[1];
		newPath = DIST[newPath]?? {w:1200,h:600};

		return {
			newWidth:newPath.w,
			newHeight:newPath.h
		};
	},



	//设置-角色添加
	//设置-机构添加
	//设置-公司添加
	//设置-部门添加
	//设置-客户来源添加
	setting_add_role:{width:800,height:220},
	//设置-机构-添加产品
	setting_add_product:{width:800,height:570},
	//设置-添加通道
	setting_add_channel:{width:800,height:280},
	//综合管理-新闻添加
	management_add_news:{width:800,height:550},
	//综合管理-员工添加
	management_add_staff:{width:1200,height:440},
	//档案-添加
	file_add:{width:800,height:520},
	//档案-详情
	file_info:{width:800,height:600},
	//首页-添加订单 step1
	index_add_step1:{width:800,height:300},
	//            step2
	index_add_step2:{width:1200,height:600},
	//            房抵
	o_add_order_room:{width:1200,height:600},
	//            垫资、非交易垫资
	o_add_order_advance:{width:1200,height:600},
	//            预览
	index_add_step4:{width:1200,height:600},
	//草稿箱-删除订单
	draft_del:{width:800,height:200},
	//我的业务-查看详情
	business_info:{width:1200,height:600},
	//审批-打开房抵
	o_approve_room:{width:1200,height:600},
	//审批-打开垫资、非垫资
	o_approve_advance:{width:1200,height:600},
	//无指定流程页面 通用
	publish_review:{width:1200,height:600},
	//贷后-详情
	afterLoan_o_info:{width:1200,height:600},
	//贷后-变更客户资料
	o_mdf_user_info:{width:800,height:430},
	//贷后-变更还款账号
	o_mdf_repayment_account:{width:800,height:360},
	//贷后-新增贷后支出
	o_add_after_loan:{width:800,height:520},
	//贷后-核销
	o_write_off:{width:1200,height:370},
	//贷后-展期
	o_rollover:{width:800,height:340},
	//财务-后置缴费
	o_payment_of_post_operation_fee:{width:1200,height:600},
	//财务-房抵分期还款
	o_installment_mortgage_repayment:{width:1200,height:600},
	//财务-房抵分期还尾款
	o_last_installment_mortgage_repayment:{width:1200,height:600},
	o_advance_payment:{width:1200,height:600},
	o_bookkeeping:{width:1200,height:600},
	o_business_fee_payment:{width:1200,height:600},
	o_dispensing:{width:1200,height:600},
	o_mortgage_repayment:{width:1200,height:600},
	o_rollover_collection:{width:1200,height:600},
	//首页-龙虎榜
	sort:{width:600,height:400},
	//退费用(尾款、服务费)
	o_Refund:{width:1200,height:600}


};