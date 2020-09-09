
let qt = require('./qt');


let key = [
	// {name:'DIAN_ZI_ZHIXING_SUBMIT_ORDER',value:'',info:'执行-提交订单'},
		{name:'DIAN_ZI_JILING_AUDIT',value:'../publish/review.html',info:'经理-部门初审',api:'/api/dzOrderFlow/auditOrder'},
		{name:'DIAN_ZI_FENGKONG_AUDIT_1',value:'../publish/review.html',info:'风控-初审',api:'/api/dzOrderFlow/auditOrder'},
		{name:'DIAN_ZI_QUANZHENG_AUDIT',value:'../publish/overSingle.html',info:'权证-执行下户',api:'/api/dzOrderFlow/quanZhengZhiXingXiaHu'},
		{name:'DIAN_ZI_FENGKONG_AUDIT_2',value:'../publish/review.html',info:'风控-复审',api:'/api/dzOrderFlow/auditOrder'},
		{name:'DIAN_ZI_GONGSI_AUDIT',value:'../publish/review.html',info:'公司-终审',api:'/api/dzOrderFlow/auditOrder'},
		{name:'DIAN_ZI_JITUAN_AUDIT',value:'../publish/review.html',info:'集团-终审',api:'/api/dzOrderFlow/auditOrder'},
		{name:'DIAN_ZI_ZHIXING_SUBMIT_CONTRACT',value:'../publish/overSingle.html',info:'执行-提交合同',api:'/api/dzOrderFlow/zhiXingSubmitContract'},
		{name:'DIAN_ZI_CAIWU_CONFIRM',value:'../finance/o_business_fee_payment.html',info:'财务-确认业务费缴纳',api:'/api/dzOrderFlow/caiWuConfirm'},
		{name:'DIAN_ZI_ZHIXING_CHUKUAN_SUBMIT',value:'../publish/overSingle.html',info:'执行-出款申请',api:'/api/dzOrderFlow/zhiXingChuKuanSubmit'},
		{name:'DIAN_ZI_QUANZHENG_REPAYMENT_DATA_CONFIRM',value:'../publish/overSingle.html',info:'出款申请流程',api:'/api/dzOrderFlow/zhiXingChuKuanSubmit'},
		{name:'DIAN_ZI_FENGKONG_CHUKUAN_AUDIT',value:'../publish/review.html',info:'风控-出款审核',api:'/api/dzOrderFlow/auditOrder'},
		{name:'DIAN_ZI_CAIWU_CHUKUAN_BOOKING',value:'../publish/overSingle.html',info:'财务-出款记账',api:'/api/dzOrderFlow/caiWuChuKuanBooking'},
		{name:'DIAN_ZI_GONGSI_CHUKUAN_OVER_ORDER',value:'../publish/overSingle.html',info:'公司-出款过单',api:'/api/dzOrderFlow/gongSiChuKuanOverOrder'},
		{name:'DIAN_ZI_JITUAN_CHUKUAN_OVER_ORDER',value:'../publish/overSingle.html',info:'集团-出款过单',api:'/api/dzOrderFlow/jiTuanChuKuanOverOrder'},
		{name:'DIAN_ZI_CAIWU_CHUKUAN',value:'../finance/o_dispensing.html',info:'财务-出款',api:'/api/dzOrderFlow/caiWuChuKuan'},
		{name:'DIAN_ZI_QUANZHENG_REPAYMENT_CONFIRM',value:'../warrant/o_warrant_pay_back.html',info:'权证-还款确认',api:'/api/dzOrderFlow/quanZhengRepaymentConfirm'},
		{name:'DIAN_ZI_QUANZHENG_QUZHENG_JIEYA',value:'../publish/overSingle.html',info:'权证-取证、解压',api:'/api/dzOrderFlow/quanZhengQuZhengJieYa'},
		{name:'DIAN_ZI_QUANZHENG_GUOHU',value:'../publish/overSingle.html',info:'权证-过户',api:'/api/dzOrderFlow/quanZhengGuoHu'},
		{name:'DIAN_ZI_QUANZHENG_GET_NEW',value:'../publish/overSingle.html',info:'权证-取新证',api:'/api/dzOrderFlow/quanZhengGetNew'},
		{name:'DIAN_ZI_QUANZHENG_AGAIN_DIYA',value:'../publish/overSingle.html',info:'权证-再抵押',api:'/api/dzOrderFlow/quanZhengAgainDiYa'},
		{name:'DIAN_ZI_DIAN_ZI_CAIWU_HUIKUAN_CONFIRM',value:'../finance/o_advance_payment.html',info:'财务-回款确认',api:'/api/dzOrderFlow/caiWuHuiKuanConfirm'},
		{name:'DIAN_ZI_CAIWU_YEWUFEI_PAYMENT_CONFIRM',value:'../finance/o_business_fee_payment.html',info:'财务-业务费确认缴纳',api:'/api/dzOrderFlow/caiWuYeWuFeiPaymentConfirm'},
	// {name:'DIAN_ZI_ZILIUCHENG_ZHANQI',value:'',info:'子流程-展期',api:''},
	//TODO 未找到 /api/dzOrderFlow/quanZhengRepaymentDataConfirm 权证-还款资料确认流程  通用过单模块
		// {name:'DIAN_ZI_DINGDAN_FINISH_SYSTEM',value:'',info:'系统-订单完成',api:''},

	// {name:'FANG_DI_ZHIXING_SUBMIT_ORDER',value:'',info:'执行-提交订单'},
	{name:'FANG_DI_JILING_AUDIT',value:'../approve/o_approve_room.html',info:'经理-部门初审',api:'/api/fdOrderFlow/auditOrder'},
	{name:'FANG_DI_FENGKONG_AUDIT_1',value:'../publish/review.html',info:'风控-初审',api:'/api/dzOrderFlow/auditOrder'},
	{name:'FANG_DI_QUANZHENG_AUDIT',value:'../warrant/o_warrant_mdf_room.html',info:'权证-下户',api:'/api/fdOrderFlow/quanZhengXiaHu'},
	{name:'FANG_DI_GONGSI_AUDIT',value:'../publish/review.html',info:'公司-终审',api:'/api/dzOrderFlow/auditOrder'},
	{name:'FANG_DI_JITUAN_AUDIT',value:'../publish/review.html',info:'集团-终审',api:'/api/dzOrderFlow/auditOrder'},
	{name:'FANG_DI_ZHIXING_SUBMIT_CONTRACT',value:'../publish/overSingle.html',info:'执行-提交合同',api:'/api/dzOrderFlow/auditOrder',api1:'/api/dzOrderFlow/auditOrder',api1:'/api/fdOrderFlow/zhiXingSubmitContract'},
	{name:'FANG_DI_QUANZHENG_DIYA',value:'../publish/overSingle.html',info:'权证-抵押',api:'/api/dzOrderFlow/auditOrder',api1:'/api/fdOrderFlow/quanZhengDiYa'},
	//TODO 跳转档案新增？？？
	{name:'FANG_DI_DANGAN_RUKU',value:'',info:'档案-入库',api:'/api/fdOrderFlow/dangAnRuKu'},
	{name:'FANG_DI_CAIWU_CONFIRM',value:'../finance/o_business_fee_payment.html',info:'财务-确认业务费缴纳',api:'/api/fdOrderFlow/caiWuConfirm'},
	{name:'FANG_DI_ZHIXING_CHUKUAN_SUBMIT',value:'../publish/overSingle.html',info:'执行-出款申请',api:'/api/dzOrderFlow/auditOrder',api1:'/api/fdOrderFlow/zhiXingChuKuanSubmit'},
	{name:'FANG_DI_CAIWU_CHUKUAN_BOOKING',value:'../finance/o_bookkeeping.html',info:'财务-出款记账',api:'/api/fdOrderFlow/caiWuChuKuanBooking'},
	{name:'FANG_DI_FENGKONG_CHUKUAN_OVER_ORDER',value:'../publish/overSingle.html',info:'风控-出款过单',api:'/api/dzOrderFlow/auditOrder',api1:'/api/fdOrderFlow/fengKongChuKuanOverOrder'},
	{name:'FANG_DI_CAIWU_CHUKUAN',value:'../finance/o_dispensing.html',info:'财务-出款',api:'/api/fdOrderFlow/caiWuChuKuan'},
	//TODO 分成3类？？？
	{name:'FANG_DI_CAIWU_REPAYMENT_CONFIRM',value:'../finance/o_mortgage_repayment.html',info:'财务-确认还款',api:'/api/fdOrderFlow/caiWuRepaymentConfirm'},
	//TODO 分成房抵尾款、房抵分期 2种？？？
	{name:'FANG_DI_CAIWU_REPAYMENT_BOOKING',value:'../finance/o_bookkeeping.html',info:'财务-还款记账',api:'/api/fdOrderFlow/caiWuRepaymentBooking'},
	{name:'FANG_DI_CAIWU_YEWUFEI_PAYMENT_CONFIRM',value:'../finance/o_business_fee_payment.html',info:'财务-确认业务费缴纳',api:'/api/fdOrderFlow/caiWuConfirm'},
		// {name:'FANG_DI_DINGDAN_FINISH_SYSTEM',value:'',info:'系统-订单完成',api:''},

	//TODO   /api/tkOrderFlow/auditOrder  退款-审核订单流程  未找到节点
	{name:'TUI_KUAN_ZHIXING_RETURN_APPLY',value:'',info:'执行-申请退款',api:'/api/tkOrderFlow/zhiXingReturnApply'},
	{name:'TUI_KUAN_GONGSI_AUDIT',value:'',info:'公司-审核',api:'/api/tkOrderFlow/gongSiAudit'},
	{name:'TUI_KUAN_CAIWU_BOOKING',value:'',info:'财务-记账',api:'/api/tkOrderFlow/caiWuBooking'},
	{name:'TUI_KUAN_GONGSI_OVER_ORDER',value:'',info:'公司-过单',api:'/api/tkOrderFlow/gongSiOverOrder'},
	//TODO 有问题  提交参数有    refundTypeKey   1-退尾款 2-退服务费
	{name:'TUI_KUAN_CAIWU_RETURN_MONEY',value:'../finance/o_Refund.html',info:'财务-退款',api:'/api/tkOrderFlow/caiWuReturnMoney'},
	// {name:'TUI_KUAN_RETURN_MONEY_SYSTEM',value:'',info:'系统-退款',api:''},


	{name:'DAIHOU_ZHICHU_DAIHOU_ADD_ZHICHU',value:'../afterLoan/o_add_after_loan.html',info:'贷后-新增支出',api:'/api/dhZcOrderFlow/daiHouAddZhiChu'},
	{name:'DAIHOU_ZHICHU_CAIWU_ZHICHU_OVER_ORDER',value:'../afterLoan/o_add_after_loan1.html',info:'财务-贷后支出过单',api:'/api/dhZcOrderFlow/caiWuZhiChuOverOrder'},
	// {name:'DAIHOU_ZHICHU_ADD_ZHICHU_SYSTEM',value:'',info:'系统-新增支出',api:''},


	{name:'ZHAN_QI_DAIHOU_ZHANQI_APPLY',value:'../afterLoan/o_rollover.html',info:'贷后-展期申请',api:'/api/zqOrderFlow/daiHouAddZhiChu'},
	{name:'ZHAN_QI_JITUAN_ZHANQI_AUDIT',value:'../afterLoan/o_rollover1.html',info:'集团-展期审核',api:'/api/zqOrderFlow/jiTuanZhanQiAudit'},
	{name:'ZHAN_QI_CAIWU_ZHANQI_SHOUKUAN_CONFIRM',value:'../finance/o_rollover_collection.html',info:'财务-展期收款确认',api:'/api/zqOrderFlow/caiWuZhanQiShoukKuanConfirm'},
	// {name:'ZHAN_QI_ZHANQI_SYSTEM',value:'',info:'系统-展期',api:''},


	// {name:'DINGDAN_SHANCHU_ZHIXING_SHANCHU_APPLY',value:'',info:'执行-删除申请',api:'/api/ddScOrderFlow/zhiXingShanChuApply'},
	{name:'DINGDAN_SHANCHU_FENGKONG_AUDIT',value:'../publish/review.html',info:'风控-审核',api:'/api/ddScOrderFlow/fengKongAudit'},
	// {name:'DINGDAN_SHANCHU_SHANCHU_SYSTEM',value:'',info:'系统-删除',api:''},



	// /api/hxDdOrderFlow/auditOrder  核销-审核订单流程  //TODO 未找到节点 接口未调用
	{name:'HEXIAO_DINGDAN_DAIHOU_HEXIAO_APPLY',value:'../afterLoan/o_write_off.html',info:'贷后-申请核销',api:'/api/hxDdOrderFlow/daiHouHeXiaoApply'},
	{name:'HEXIAO_DINGDAN_JITUAN_HEXIAO_AUDIT_1',value:'../afterLoan/o_write_off1.html',info:'集团-核销初审',api:'/api/hxDdOrderFlow/jiTuanHeXiaoAuditOne'},
	{name:'HEXIAO_DINGDAN_GONGSI_HEXIAO_AUDIT',value:'../afterLoan/o_write_off1.html',info:'公司-核销审核',api:'/api/hxDdOrderFlow/gongSiHeXiaoAudit'},
	{name:'HEXIAO_DINGDAN_JITUAN_HEXIAO_AUDIT_2',value:'../afterLoan/o_write_off1.html',info:'集团-核销终审',api:'/api/hxDdOrderFlow/jiTuanHeXiaoAuditTwo'},
	{name:'HEXIAO_DINGDAN_CAIWU_HEXIAO_OVER_ORDER',value:'../afterLoan/o_write_off2.html',info:'财务-核销过单',api:'/api/hxDdOrderFlow/caiWuHeXiaoOverOrder'},
	// {name:'HEXIAO_DINGDAN_HEXIAO_SYSTEM',value:'',info:'系统-核销',api:''},


	{name:'CHU_KU_DANGAN_CHUKU_APPLY',value:'../file/o_info1.html',info:'档案-出库申请',api:'/api/ckOrderFlow/dangAnChuKuApply'},
	{name:'CHU_KU_FENGKONG_CHUKU_AUDIT',value:'../file/o_info2.html',info:'风控-出库审核',api:'/api/ckOrderFlow/fengKongChuKuAudit'},
	{name:'CHU_KU_CAIWU_CHUKU_OVER_ORDER',value:'../publish/overSingle.html',info:'财务-出库过单',api:'/api/ckOrderFlow/caiWuChuKuOverOrder'},
	{name:'CHU_KU_JITUAN_CHUKU_OVER_ORDER',value:'../publish/overSingle.html',info:'集团-出库过单',api:'/api/ckOrderFlow/jiTuanChukuOverOrder'},
	// {name:'CHU_KU_CHUKU_SYSTEM',value:'',info:'系统-出库',api:''}




];

let key1 = {};

key.map(rs=>{
	key1[rs.name] = {
		url:rs.value,
		title:rs.info,
		api:rs.api
	};
});


module.exports = function(currentNodeKey){
	return new Promise((success,error)=>{
		let obj = key1[currentNodeKey];

		if(obj && obj.url && obj.api){
			let	url = obj.url,
				title = obj.title,
				api = obj.api;

			success({url,title,api});
		}else{
			// qt.alert('流程节点信息错误！');
			error('流程节点信息错误');
			console.log('%c 当前节点名:'+currentNodeKey,'color:red;')
			console.log('%c 当前页面:'+obj.url,'color:red;')
			console.log('%c 当前提交api:'+obj.api,'color:red;')
			console.log('请检查配置文件 processToPage.es6')
		}
	})
};






