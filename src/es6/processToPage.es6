// DIAN_ZI 垫资 DIAN_ZI_ZHIXING_SUBMIT_ORDER 执行-提交订单
// DIAN_ZI 垫资 DIAN_ZI_JILING_AUDIT 经理-部门初审
// DIAN_ZI 垫资 DIAN_ZI_FENGKONG_AUDIT_1 风控-初审
// DIAN_ZI 垫资 DIAN_ZI_QUANZHENG_AUDIT 权证-执行下户
// DIAN_ZI 垫资 DIAN_ZI_FENGKONG_AUDIT_2 风控-复审
// DIAN_ZI 垫资 DIAN_ZI_GONGSI_AUDIT 公司-终审
// DIAN_ZI 垫资 DIAN_ZI_JITUAN_AUDIT 集团-终审
// DIAN_ZI 垫资 DIAN_ZI_ZHIXING_SUBMIT_CONTRACT 执行-提交合同
// DIAN_ZI 垫资 DIAN_ZI_CAIWU_CONFIRM 财务-确认业务费缴纳
// DIAN_ZI 垫资 DIAN_ZI_ZHIXING_CHUKUAN_SUBMIT 执行-出款申请
// DIAN_ZI 垫资 DIAN_ZI_QUANZHENG_REPAYMENT_DATA_CONFIRM 权证-还款资料确认
// DIAN_ZI 垫资 DIAN_ZI_FENGKONG_CHUKUAN_AUDIT 风控-出款审核
// DIAN_ZI 垫资 DIAN_ZI_CAIWU_CHUKUAN_BOOKING 财务-出款记账
// DIAN_ZI 垫资 DIAN_ZI_GONGSI_CHUKUAN_OVER_ORDER 公司-出款过单
// DIAN_ZI 垫资 DIAN_ZI_JITUAN_CHUKUAN_OVER_ORDER 集团-出款过单
// DIAN_ZI 垫资 DIAN_ZI_CAIWU_CHUKUAN 财务-出款
// DIAN_ZI 垫资 DIAN_ZI_QUANZHENG_REPAYMENT_CONFIRM 权证-还款确认
// DIAN_ZI 垫资 DIAN_ZI_QUANZHENG_QUZHENG_JIEYA 权证-取证、解压
// DIAN_ZI 垫资 DIAN_ZI_QUANZHENG_GUOHU 权证-过户
// DIAN_ZI 垫资 DIAN_ZI_QUANZHENG_GET_NEW 权证-取新证
// DIAN_ZI 垫资 DIAN_ZI_QUANZHENG_AGAIN_DIYA 权证-再抵押
// DIAN_ZI 垫资 DIAN_ZI_DIAN_ZI_CAIWU_HUIKUAN_CONFIRM 财务-回款确认
// DIAN_ZI 垫资 DIAN_ZI_CAIWU_YEWUFEI_PAYMENT_CONFIRM 财务-业务费确认缴纳
// DIAN_ZI 垫资 DIAN_ZI_ZILIUCHENG_ZHANQI 子流程-展期
// DIAN_ZI 垫资 DIAN_ZI_DINGDAN_FINISH_SYSTEM 系统-订单完成
// FANG_DI 房抵 FANG_DI_ZHIXING_SUBMIT_ORDER 执行-提交订单
// FANG_DI 房抵 FANG_DI_JILING_AUDIT 经理-部门初审
// FANG_DI 房抵 FANG_DI_FENGKONG_AUDIT_1 风控-初审
// FANG_DI 房抵 FANG_DI_QUANZHENG_AUDIT 权证-下户
// FANG_DI 房抵 FANG_DI_GONGSI_AUDIT 公司-终审
// FANG_DI 房抵 FANG_DI_JITUAN_AUDIT 集团-终审
// FANG_DI 房抵 FANG_DI_ZHIXING_SUBMIT_CONTRACT 执行-提交合同
// FANG_DI 房抵 FANG_DI_QUANZHENG_DIYA 权证-抵押
// FANG_DI 房抵 FANG_DI_DANGAN_RUKU 档案-入库
// FANG_DI 房抵 FANG_DI_CAIWU_CONFIRM 财务-确认业务费缴纳
// FANG_DI 房抵 FANG_DI_ZHIXING_CHUKUAN_SUBMIT 执行-出款申请
// FANG_DI 房抵 FANG_DI_CAIWU_CHUKUAN_BOOKING 财务-出款记账
// FANG_DI 房抵 FANG_DI_FENGKONG_CHUKUAN_OVER_ORDER 风控-出款过单
// FANG_DI 房抵 FANG_DI_CAIWU_CHUKUAN 财务-出款
// FANG_DI 房抵 FANG_DI_CAIWU_REPAYMENT_CONFIRM 财务-确认还款
// FANG_DI 房抵 FANG_DI_CAIWU_REPAYMENT_BOOKING 财务-还款记账
// FANG_DI 房抵 FANG_DI_CAIWU_YEWUFEI_PAYMENT_CONFIRM 财务-确认业务费缴纳
// FANG_DI 房抵 FANG_DI_DINGDAN_FINISH_SYSTEM 系统-订单完成

let qt = require('./qt');


let key = [
	// {name:'DIAN_ZI_ZHIXING_SUBMIT_ORDER',value:'',info:'执行-提交订单'},
	{name:'DIAN_ZI_JILING_AUDIT',value:'../approve/o_approve_advance.html',info:'经理-部门初审',api:''},
	{name:'DIAN_ZI_FENGKONG_AUDIT_1',value:'../publish/review.html',info:'风控-初审',api:''},
	{name:'DIAN_ZI_QUANZHENG_AUDIT',value:'../warrant/o_warrant_mdf_room.html',info:'权证-执行下户',api:''},
	{name:'DIAN_ZI_FENGKONG_AUDIT_2',value:'../publish/review.html',info:'风控-复审',api:''},
	{name:'DIAN_ZI_GONGSI_AUDIT',value:'../publish/review.html',info:'公司-终审',api:''},
	{name:'DIAN_ZI_JITUAN_AUDIT',value:'../publish/review.html',info:'集团-终审',api:''},
		{name:'DIAN_ZI_ZHIXING_SUBMIT_CONTRACT',value:'',info:'执行-提交合同',api:''},
	{name:'DIAN_ZI_CAIWU_CONFIRM',value:'../finance/o_business_fee_payment.html',info:'财务-确认业务费缴纳',api:''},
		{name:'DIAN_ZI_ZHIXING_CHUKUAN_SUBMIT',value:'',info:'执行-出款申请',api:''},
	{name:'DIAN_ZI_QUANZHENG_REPAYMENT_DATA_CONFIRM',value:'../publish/review.html',info:'权证-还款资料确认',api:''},
		{name:'DIAN_ZI_FENGKONG_CHUKUAN_AUDIT',value:'',info:'风控-出款审核',api:''},
	{name:'DIAN_ZI_CAIWU_CHUKUAN_BOOKING',value:'../finance/o_bookkeeping.html',info:'财务-出款记账',api:''},
		{name:'DIAN_ZI_GONGSI_CHUKUAN_OVER_ORDER',value:'',info:'公司-出款过单',api:''},
		{name:'DIAN_ZI_JITUAN_CHUKUAN_OVER_ORDER',value:'',info:'集团-出款过单',api:''},
	{name:'DIAN_ZI_CAIWU_CHUKUAN',value:'../finance/o_dispensing.html',info:'财务-出款',api:''},
		{name:'DIAN_ZI_QUANZHENG_REPAYMENT_CONFIRM',value:'../warrant/o_warrant_pay_back.html',info:'权证-还款确认',api:''},
	{name:'DIAN_ZI_QUANZHENG_QUZHENG_JIEYA',value:'../publish/review.html',info:'权证-取证、解压',api:''},
	{name:'DIAN_ZI_QUANZHENG_GUOHU',value:'../publish/review.html',info:'权证-过户',api:''},
	{name:'DIAN_ZI_QUANZHENG_GET_NEW',value:'../publish/review.html',info:'权证-取新证',api:''},
	{name:'DIAN_ZI_QUANZHENG_AGAIN_DIYA',value:'../publish/review.html',info:'权证-再抵押',api:''},
		{name:'DIAN_ZI_DIAN_ZI_CAIWU_HUIKUAN_CONFIRM',value:'',info:'财务-回款确认',api:''},
	{name:'DIAN_ZI_CAIWU_YEWUFEI_PAYMENT_CONFIRM',value:'../finance/o_business_fee_payment.html',info:'财务-业务费确认缴纳',api:''},
		{name:'DIAN_ZI_ZILIUCHENG_ZHANQI',value:'',info:'子流程-展期',api:''},
		{name:'DIAN_ZI_DINGDAN_FINISH_SYSTEM',value:'',info:'系统-订单完成',api:''},

	// {name:'FANG_DI_ZHIXING_SUBMIT_ORDER',value:'',info:'执行-提交订单'},
	{name:'FANG_DI_JILING_AUDIT',value:'../approve/o_approve_room.html',info:'经理-部门初审',api:''},
	{name:'FANG_DI_FENGKONG_AUDIT_1',value:'../publish/review.html',info:'风控-初审',api:''},
	{name:'FANG_DI_QUANZHENG_AUDIT',value:'../warrant/o_warrant_mdf_room.html',info:'权证-下户',api:''},
	{name:'FANG_DI_GONGSI_AUDIT',value:'../publish/review.html',info:'公司-终审',api:''},
	{name:'FANG_DI_JITUAN_AUDIT',value:'../publish/review.html',info:'集团-终审',api:''},
		{name:'FANG_DI_ZHIXING_SUBMIT_CONTRACT',value:'',info:'执行-提交合同',api:''},
	{name:'FANG_DI_QUANZHENG_DIYA',value:'../publish/review.html',info:'权证-抵押',api:''},
		{name:'FANG_DI_DANGAN_RUKU',value:'',info:'档案-入库',api:''},
	{name:'FANG_DI_CAIWU_CONFIRM',value:'../finance/o_business_fee_payment.html',info:'财务-确认业务费缴纳',api:''},
		{name:'FANG_DI_ZHIXING_CHUKUAN_SUBMIT',value:'',info:'执行-出款申请',api:''},
	{name:'FANG_DI_CAIWU_CHUKUAN_BOOKING',value:'../finance/o_bookkeeping.html',info:'财务-出款记账',api:''},
		{name:'FANG_DI_FENGKONG_CHUKUAN_OVER_ORDER',value:'',info:'风控-出款过单',api:''},
	{name:'FANG_DI_CAIWU_CHUKUAN',value:'../finance/o_dispensing.html',info:'财务-出款',api:''},
	{name:'FANG_DI_CAIWU_REPAYMENT_CONFIRM',value:'../finance/o_mortgage_repayment.html',info:'财务-确认还款',api:''},
	{name:'FANG_DI_CAIWU_REPAYMENT_BOOKING',value:'../finance/o_bookkeeping.html',info:'财务-还款记账',api:''},
	{name:'FANG_DI_CAIWU_YEWUFEI_PAYMENT_CONFIRM',value:'../finance/o_business_fee_payment.html',info:'财务-确认业务费缴纳',api:''},
		{name:'FANG_DI_DINGDAN_FINISH_SYSTEM',value:'',info:'系统-订单完成',api:''},


	{name:'TUI_KUAN_ZHIXING_RETURN_APPLY',value:'',info:'执行-申请退款',api:''},
	{name:'TUI_KUAN_GONGSI_AUDIT',value:'',info:'公司-审核',api:''},
	{name:'TUI_KUAN_CAIWU_BOOKING',value:'',info:'财务-记账',api:''},
	{name:'TUI_KUAN_GONGSI_OVER_ORDER',value:'',info:'公司-过单',api:''},
	{name:'TUI_KUAN_CAIWU_RETURN_MONEY',value:'',info:'财务-退款',api:''},
	{name:'TUI_KUAN_RETURN_MONEY_SYSTEM',value:'',info:'系统-退款',api:''},


	{name:'DAIHOU_ZHICHU_DAIHOU_ADD_ZHICHU',value:'',info:'贷后-新增支出',api:''},
	{name:'DAIHOU_ZHICHU_CAIWU_ZHICHU_OVER_ORDER',value:'',info:'财务-贷后支出过单',api:''},
	{name:'DAIHOU_ZHICHU_ADD_ZHICHU_SYSTEM',value:'',info:'系统-新增支出',api:''},


	{name:'ZHAN_QI_DAIHOU_ZHANQI_APPLY',value:'',info:'贷后-展期申请',api:''},
	{name:'ZHAN_QI_JITUAN_ZHANQI_AUDIT',value:'',info:'集团-展期审核',api:''},
	{name:'ZHAN_QI_CAIWU_ZHANQI_SHOUKUAN_CONFIRM',value:'',info:'财务-展期收款确认',api:''},
	{name:'ZHAN_QI_ZHANQI_SYSTEM',value:'',info:'系统-展期',api:''},


	{name:'DINGDAN_SHANCHU_ZHIXING_SHANCHU_APPLY',value:'',info:'执行-删除申请',api:''},
	{name:'DINGDAN_SHANCHU_FENGKONG_AUDIT',value:'',info:'风控-审核',api:''},
	{name:'DINGDAN_SHANCHU_SHANCHU_SYSTEM',value:'',info:'系统-删除',api:''},


	{name:'HEXIAO_DINGDAN_DAIHOU_HEXIAO_APPLY',value:'',info:'贷后-申请核销',api:''},
	{name:'HEXIAO_DINGDAN_JITUAN_HEXIAO_AUDIT_1',value:'',info:'集团-核销初审',api:''},
	{name:'HEXIAO_DINGDAN_GONGSI_HEXIAO_AUDIT',value:'',info:'公司-核销审核',api:''},
	{name:'HEXIAO_DINGDAN_JITUAN_HEXIAO_AUDIT_2',value:'',info:'集团-核销终审',api:''},
	{name:'HEXIAO_DINGDAN_CAIWU_HEXIAO_OVER_ORDER',value:'',info:'财务-核销过单',api:''},
	{name:'HEXIAO_DINGDAN_HEXIAO_SYSTEM',value:'',info:'系统-核销',api:''},


	{name:'CHU_KU_DANGAN_CHUKU_APPLY',value:'',info:'档案-出库申请',api:''},
	{name:'CHU_KU_FENGKONG_CHUKU_AUDIT',value:'',info:'风控-出库审核',api:''},
	{name:'CHU_KU_CAIWU_CHUKU_OVER_ORDER',value:'',info:'财务-出库过单',api:''},
	{name:'CHU_KU_JITUAN_CHUKU_OVER_ORDER',value:'',info:'集团-出库过单',api:''},
	{name:'CHU_KU_CHUKU_SYSTEM',value:'',info:'系统-出库',api:''}




];

let key1 = {};

key.map(rs=>{
	key1[rs.name] = {
		url:rs.value,
		title:rs.info
	};
});


module.exports = function(currentNodeKey){
	return new Promise(success=>{
		let obj = key1[currentNodeKey];

		if(obj && obj.url){
			let	url = obj.url,
				title = obj.title;

			success({url,title});
		}else{
			qt.alert('流程节点信息错误！');
			console.log('%c 当前节点名:'+currentNodeKey,'color:red;')
		}
	})
};






