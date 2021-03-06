// let md5 = require("./lib/fn/md5"),
// 	app = require("./lib/JkAndWeChat");

// let errorHandler = require('./lib/fn/errorHandler');

let qt = require('qt.es6');




let ajax = {
	//请求函数主体
	run(url, data, header, type, success, error){
		url = SETTING.serverUrl + url;


		if(type=='post'){
			data = JSON.stringify(data);
			console.log(data)
		}

		header = header?? {};
		header.Authorization = window.token;

		$.ajax({
			type: type,
			cache: false,
			url: url,
			data: data,
			contentType:"application/json",
			dataType: "json",
			timeout: 20000,     //20秒
			headers: header,
			success: async function(rs) {
				if(rs.code == 200){
					success(rs.data);
				}else{
					if(rs.code == 1000){
						error('您还未登录或登录已过期！');
						//关闭所有窗口或进入登录页
						qt.reLogin();
					}else{
						error(rs.msg || '服务器内部错误，请稍后在试！');
					}
				}
			},
			error: function(e) {
				// errorHandler.ajaxError(type,url,data,e);
				if(e.status == 500){
					error('服务器内部错误！');
					return;
				}


				if(e.status == 0 && e.statusText == 'timeout'){
					error('访问人数过多，请稍后访问');
					return;
				}

				if(e.status == 0 && e.statusText != 'error'){
					return;
				}

				error("网络错误,无法连接服务器。");
			}
		});
	},
	//发送一堆请求
	async send(arr){
		//预约挂号特有
		// this.token = await this.getToken();
		// this.userToken = await app.getUserToken();

		return new Promise((success,error)=>{
			Promise.all(arr).then(rs=>{
				success(rs)
			}).catch(rs=>{
				error(rs);
				throw "ajax error";
			})
		})
	}

};

let api = {
	//登录
	login:{url:'/api/user/login',type:'post'},
	//重置密码
	resetPassword:{url:'/api/user/resetPassword/{userId}',type:'post'},


	//首页
	index_list:{url:'/api/home/searchOrder',type:'get'},
		//排名、角色权限
	index_sort_number:{url:'/api/home/getRoleAndRanking',type:'get'},
		//龙虎榜
	index_sort_list:{url:'/api/home/rankingList',type:'get'},
		//菜单
	get_menu_list:{url:'/api/home/menuList',type:'get'},


	//登录
	login:{url:'/api/user/login',type:'post'},
	// //部门信息接口
	// dept_list: {url:'/api/dept/list',type:'get'},
	// dept_add:{url:'/api/dept/addOrUpdate',type:'post'},
	// dept_del:{url:'/api/dept/{deptId}',type:'delete'},

	//角色
	role_get_list:{url:'/api/role/list',type:'get'},
	role_add:{url:'/api/role/addOrUpdate',type:'post'},
	role_del:{url:'/api/role/{roleId}',type:'delete'},

	//权限树
	privilege_list:{url:'/api/privilege/tree/{roleId}',type:'get'},
	privilege_mdf:{url:'/api/role/privilege/{roleId}/add/privileges',type:'post'},

	//时间流程
	data_process_list:{url:'/api/config/dictionary/listForTimeline',type:'get'},
	data_process_mdf:{url:'/api/config/dictionary/addOrUpdate',type:'post'},

	//机构
	org_add:{url:'/api/organization/addOrUpdate',type:'post'},
	org_del:{url:'/api/organization/{organizationId}',type:'delete'},
	org_list:{url:'/api/organization/list',type:'get'},

	//机构下的产品
	org_product_add:{url:'/api/product/addOrUpdate',type:'post'},
	org_product_del:{url:'/api/product/{productId}',type:'delete'},
	org_product_list:{url:'/api/product/list',type:'get'},

	//系统配置信息
	//通道配置 type=6
	//客户来源渠道 type=1
	//档案室  type=11
	setting_config_list:{url:'/api/config/dictionary/listByCondition',type:'get'},
	setting_config_mdf:{url:'/api/config/dictionary/addOrUpdate',type:'post'},
	setting_config_del:{url:'/api/config/dictionary/{configId}',type:'delete'},

	//公司信息
	company_list:{url:'/api/company/list',type:'get'},
	company_add:{url:'/api/company/addOrUpdate',type:'post'},
	company_del:{url:'/api/company/{companyId}',type:'delete'},

	//部门信息
	department_list:{url:'/api/dept/list',type:'get'},
	department_add:{url:'/api/dept/addOrUpdate',type:'post'},
	department_del:{url:'/api/dept/{deptId}',type:'delete'},

	//新闻
	news_list:{url:'/api/system/broad/list',type:'get'},
	news_add:{url:'/api/system/broad/addOrUpdate',type:'post'},
	news_del:{url:'/api/system/broad/{roleId}',type:'delete'},

	//员工
	staff_list:{url:'/api/user/list',type:'get'},
	staff_add:{url:'/api/user/addOrUpdate',type:'post'},
	staff_mdf_pwd:{url:'/api/user/changePassword',type:'post'},
	// staff_del:{url:'/api/user/{userId}',type:'delete'}


	//档案
	file_list:{url:'/api/customer/archive/list',type:'get'},
	file_add:{url:'/api/customer/archive/addOrUpdate',type:'post'},
	file_del:{url:'/api/customer/archive/{customerArchiveId}',type:'delete'},
	file_out:{url:'/api/customer/archive/warehouse',type:'post'},
	file_history:{url:'/api/flowAuditRecord/getDangAnChukuFlowAuditRecordList',type:'get'},


	//订单
	order_add_step1:{url:'/api/orderBase/saveOrderBase',type:'post'},
	order_add_step2:{url:'/api/orderBase/saveOrderPersonInfo',type:'post'},
	order_add_step3:{url:'/api/orderBase/saveOrderOtherDetail',type:'post'},
	order_get_byId:{url:'/api/orderBase/getOrderDetailById/{id}',type:'get'},
	order_get_history_byOrderNo:{url:'/api/flowAuditRecord/getFlowAuditRecordList',type:'get'},
	//订单最终提交
	//房抵
	order_submit:{url:'/api/fdOrderFlow/zhixingSubmitOrder',type:'post'},
	//垫资
	order_submit1:{url:'/api/dzOrderFlow/zhixingSubmitOrder',type:'post'},
	//资料信息变更   （type= 1-核行修改 2-变更客户资料 3-变更还款账号)
	order_change_submit:{url:'/api/orderChangeInfo/saveOrderChangeInfo',type:'post'},
	order_change_list:{url:'/api/orderChangeInfo/list',type:'get'},


	//草稿箱 我的业务
	//isDraft = true //草稿箱
	//          false //我的业务
	my_order:{url:'/api/myOrder/list',type:'get'},
	my_order_del:{url:'/api/orderBase/deletedOrderDetailById',type:'post'},


	//退费退款 列表
	refund_list:{url:'/api/orderRefund/list',type:'get'},
		//退款
	refund_submit:{url:'/api/tkOrderFlow/zhiXingReturnApply',type:'post'},
		//退费用
	refund_submit_tf:{url:'/api/tfOrderFlow/zhiXingReturnApply',type:'post'},



	//审批
	approve_list:{url:'/api/orderAuditCenter/list',type:'get'},
	approve_room:{url:'/api/fdOrderFlow/auditOrder',type:'post'},
	approve_advance:{url:'/api/dzOrderFlow/auditOrder',type:'post'},

	//权证
	warrant_list:{url:'/api/warrant/list',type:'get'},
		//下户 -房抵
	warrant_shimoto_room:{url:'/api/fdOrderFlow/quanZhengXiaHu',type:'post'},
		//下户 -垫资、非垫资
	warrant_shimoto_dz:{url:'/api/dzOrderFlow/quanZhengZhiXingXiaHu',type:'post'},
		//核行修改
	warrant_approved_mdf:{url:'/api/warrant/heHangEdit',type:'post'},
		//还款确认
	warrant_pay_back:{url:'/api/dzOrderFlow/quanZhengRepaymentConfirm',type:'post'},


	//贷后
	afterLoan_list:{url:'/api/loanAfterOrder/list',type:'get'},
		//列表上面的汇总
	afterLoan_total:{url:'/api/loanAfterOrder/getLoanAfterOrderTotalInfo',type:'get'},
		//客户分类 变更
	afterLoan_change_user_type:{url:'/api/loanAfterOrder/changeClientCategory',type:'post'},
		//客户信息 变更
	afterLoan_change_user_info:{url:'/api/loanAfterOrder/changeClientInfo',type:'post'},
		//跟进信息 保存
	afterLoan_follow_up_save:{url:'/api/orderLoanFollowRecord/saveOrderChangeInfo',type:'post'},
		//跟进信息 获取列表
	afterLoan_follow_up_list:{url:'/api/orderLoanFollowRecord/list',type:'get'},
		//还款账户 变更
	afterLoan_change_repayment_account:{url:'/api/loanAfterOrder/changeRepaymentInfo',type:'post'},
		//新增支出
	afterLoan_add_expenditure:{url:'/api/dhZcOrderFlow/daiHouAddZhiChu',type:'post'},
		//核销
	afterLoan_write_off:{url:'/api/hxDdOrderFlow/daiHouHeXiaoApply',type:'post'},
		//核销 初始数据
	afterLoan_write_off_info:{url:'/api/loanAfterOrder/getInitHexiaoDataByOrderNo/{orderNo}',type:'get'},
		//展期
	afterLoan_rollover:{url:'/api/zqOrderFlow/daiHouAddZhiChu',type:'post'},
		//展期 初始数据
	afterLoan_rollover_info:{url:'/api/loanAfterOrder/getInitZhanQiDataByOrderNo/{orderNo}',type:'get'},
		//贷后支出过单信息查询
	afterLoan_pay_info:{url:'/api/loanAfterOrder/getOrderLoanDisburseRecordByOrderNo/{orderNo}',type:'get'},
		//集团展期审核初始化数据
	afterLoan_group_rollover_info:{url:'/api/orderExhibitionPeriodRecord/getOrderExhibitionPeriodRecordByOrderNo/{orderNo}',type:'get'},
		//新增贷后支出
	afterLoan_new_add:{url:'/api/dhZcOrderFlow/daiHouAddZhiChu',type:'post'},

	//财务
	finance_list:{url:'/api/financeOrder/list',type:'get'},
		//垫资回款-获取剩余本金
	finance_get_remaining_principal:{url:'/api/financeOrder/getLeftPrincipalTotalByOrderNo/{orderNo}',type:'get'},
		//垫资回款提交
	finance_pay_back_submit:{url:'/api/dzOrderFlow/caiWuHuiKuanConfirm',type:'post'},
		//记账页面  费用信息
	finance_bookkeeping_cost_info:{url:'/api/financeOrder/getBookingInfoByOrderNo/{orderNo}',type:'get'},
		//业务费缴纳 费用信息
	finance_business_cost_info:{url:'/api/financeOrder/getYeWuFeeInfoByOrderNo/{orderNo}',type:'get'},
		//房抵 分期还款详情
	finance_Installment_info:{url:'/api/financeOrder/getRepaymentPlanDetailByOrderNo',type:'get'},
		//房抵 分期还款列表
	finance_Installment_list:{url:'/api/financeOrder/getRepaymentPlanListByOrderNo/{orderNo}',type:'get'},
		//获取后置业务费信息
	finance_rear_business_info:{url:'/api/financeOrder/getYeWuFeePostPositionInfoByOrderNo/{orderNo}',type:'get'},
		//房抵 分期还款尾款信息
	finance_final_installment_info:{url:'/api/financeOrder/getRePaymentBalanceInfo',type:'get'},
		//展期信息
	finance_rollover_info:{url:'/api/financeOrder/getZhanQiRepaymentInfoByOrderNo/{orderNo}',type:'get'},
		//还尾款审核 初始数据获取
	finance_getRePaymentBalanceInfo:{url:'/api/financeOrder/getRePaymentBalanceInfoBooking',type:'get'},
		//还分期审核 初始数据获取
	finance_getRepaymentPlanDetailBookingByOrderNo:{url:'/api/financeOrder/getRepaymentPlanDetailBookingByOrderNo',type:'get'},
		//房抵提前还款信息
	finance_before_pay_back:{url:'/api/financeOrder/getTiQianHuanKuanInfoByOrderNo/{orderNo}',type:'get'},
		//房抵提前还款提交
	finance_before_pay_back_submit:{url:'/api/tqHkOrderFlow/tiqianSubmitRepaymentApply',type:'post'},
		//房抵提前还款记账信息
	finance_before_pay_back_jz:{url:'/api/financeOrder/getTiQianHuanKuanInfoBookingByOrderNo/{orderNo}',type:'get'},


	//财务 退费退款列表
	finance_refund_list:{url:'/api/financeOrder/getFinanceOrderRefundlist',type:'get'},
		//财务 退款、退费详细信息
	finance_refund_info:{url:'/api/orderRefund/getOrderRefundByOrderNo',type:'get'},


	//房抵 分期还款申请
	fd_fq_pay_back:{url:'/api/fqHkOrderFlow/submitRepaymentApply',type:'post'},
	//房抵 尾款还款申请
	fd_wk_pay_back:{url:'/api/hwkOrderFlow/submitRepaymentApply',type:'post'},


	//统计
	//垫资
	// advance1_total_api:{url:'/api/dzOrderStatistics/profitAndLossCount',type:'get'},
	advance1_list_api:{url:'/api/report/yingkuiForDetail',type:'post'},
	// advance2_total_api:{url:'/api/dzOrderStatistics/dianZiCount',type:'get'},
	advance2_list_api:{url:'/api/report/dianZiForSummary',type:'post'},
	// advance3_total_api:{url:'/api/dzOrderStatistics/waitPrincipalCount',type:'get'},
	advance3_list_api:{url:'/api/report/daiShou',type:'post'},
	// advance4_total_api:{url:'/api/dzOrderStatistics/waitConsultationFeeCount',type:'get'},
	advance4_list_api:{url:'/api/report/daiShou',type:'post'},
	// advance5_total_api:{url:'/api/dzOrderStatistics/waitServiceFeeCount',type:'get'},
	advance5_list_api:{url:'/api/report/daiShou',type:'post'},
	// advance6_total_api:{url:'/api/dzOrderStatistics/comprehensiveCount',type:'get'},
	advance6_list_api:{url:'/api/report/allStatisticForDz',type:'post'},
	//房抵
	// arrival1_total_api:{url:'/api/fdOrderStatistics/profitAndLossCount',type:'get'},
	arrival1_list_api:{url:'/api/report/yingkuiForDetail',type:'post'},
	// arrival2_total_api:{url:'/api/fdOrderStatistics/repaymentStandingBookCount',type:'get'},
	arrival2_list_api:{url:'/api/report/paymentTaiZhang',type:'post'},
	// arrival3_total_api:{url:'/api/fdOrderStatistics/overdueCount',type:'get'},
	arrival3_list_api:{url:'/api/report/overdueDetailVo',type:'post'},
	// arrival4_total_api:{url:'/api/fdOrderStatistics/loanSummaryCount',type:'get'},
	arrival4_list_api:{url:'/api/report/allStatisticForFd',type:'post'},


	//手机端列表
	//是否是权证，isWarrant    0-否 1-是 默认0
	mobile_list:{url:'/api/myOrder/listMobile',type:'get'},
	//附件提交
	mobile_file_submit:{url:'/api/orderBase/addOrderCustomerAttach',type:'post'},


	//客户端提交
	client_submit:{url:'/api/orderBaseQrCode/saveOrderBaseQrCode',type:'post'}

};






api = new Proxy(api, {
	get(target, key, receiver) {
		return function (data) {
			data = data || {};

			let header = {};
			if(data.currentNodeKey){
				header.currentNodeKey = data.currentNodeKey;
			}

			return new Promise((success, error) => {
				let url = target[key].url,
					type = target[key].type || 'post';

				//判断是否含有一堆大括号,大括号内为参数
				let delArray = [];
				url = url.replace(/{(.+?)}/g,function(key){
					key = key.substr(1,key.length-2);
					delArray.push(key);
					return data[key];
				});

				//删除data中的对象
				delArray.map(rs=>{
					delete data[rs];
				});

				//特殊处理不要key的  哎
				if(key == 'privilege_mdf'){
					data = data.privileges;
				}


				ajax.run(url, data, header, type, success, error);
			})
		}
	}
});


//节点提交。。。。
let nodeKeySubmit = function(url,data){
	data = data || {};

	let header = {};
	if(data.currentNodeKey){
		header.currentNodeKey = data.currentNodeKey;
	}
	return new Promise((success, error) => {
		let type = 'post';
		ajax.run(url, data, header, type, success, error);
	})
};


module.exports = {ajax,api,nodeKeySubmit};