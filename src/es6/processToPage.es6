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

let key = [
	// {name:'DIAN_ZI_ZHIXING_SUBMIT_ORDER',value:'',info:'执行-提交订单'},
	{name:'DIAN_ZI_JILING_AUDIT',value:'../approve/o_approve_advance.html',info:'经理-部门初审'},
	{name:'DIAN_ZI_FENGKONG_AUDIT_1',value:'../publish/review.html',info:'风控-初审'},
	{name:'DIAN_ZI_QUANZHENG_AUDIT',value:'../warrant/o_warrant_mdf_room.html',info:'权证-执行下户'},
	{name:'DIAN_ZI_FENGKONG_AUDIT_2',value:'../publish/review.html',info:'风控-复审'},
	{name:'DIAN_ZI_GONGSI_AUDIT',value:'../publish/review.html',info:'公司-终审'},
	{name:'DIAN_ZI_JITUAN_AUDIT',value:'../publish/review.html',info:'集团-终审'},
	{name:'DIAN_ZI_ZHIXING_SUBMIT_CONTRACT',value:'',info:'执行-提交合同'},
	{name:'DIAN_ZI_CAIWU_CONFIRM',value:'',info:'财务-确认业务费缴纳'},
	{name:'DIAN_ZI_ZHIXING_CHUKUAN_SUBMIT',value:'',info:'执行-出款申请'},
	{name:'DIAN_ZI_QUANZHENG_REPAYMENT_DATA_CONFIRM',value:'../publish/review.html',info:'权证-还款资料确认'},
	{name:'DIAN_ZI_FENGKONG_CHUKUAN_AUDIT',value:'',info:'风控-出款审核'},
	{name:'DIAN_ZI_CAIWU_CHUKUAN_BOOKING',value:'',info:'财务-出款记账'},
	{name:'DIAN_ZI_GONGSI_CHUKUAN_OVER_ORDER',value:'',info:'公司-出款过单'},
	{name:'DIAN_ZI_JITUAN_CHUKUAN_OVER_ORDER',value:'',info:'集团-出款过单'},
	{name:'DIAN_ZI_CAIWU_CHUKUAN',value:'',info:'财务-出款'},
	{name:'DIAN_ZI_QUANZHENG_REPAYMENT_CONFIRM',value:'../warrant/o_warrant_pay_back.html',info:'权证-还款确认'},
	{name:'DIAN_ZI_QUANZHENG_QUZHENG_JIEYA',value:'../publish/review.html',info:'权证-取证、解压'},
	{name:'DIAN_ZI_QUANZHENG_GUOHU',value:'../publish/review.html',info:'权证-过户'},
	{name:'DIAN_ZI_QUANZHENG_GET_NEW',value:'../publish/review.html',info:'权证-取新证'},
	{name:'DIAN_ZI_QUANZHENG_AGAIN_DIYA',value:'../publish/review.html',info:'权证-再抵押'},
	{name:'DIAN_ZI_DIAN_ZI_CAIWU_HUIKUAN_CONFIRM',value:'',info:'财务-回款确认'},
	{name:'DIAN_ZI_CAIWU_YEWUFEI_PAYMENT_CONFIRM',value:'',info:'财务-业务费确认缴纳'},
	{name:'DIAN_ZI_ZILIUCHENG_ZHANQI',value:'',info:'子流程-展期'},
	{name:'DIAN_ZI_DINGDAN_FINISH_SYSTEM',value:'',info:'系统-订单完成'},

	// {name:'FANG_DI_ZHIXING_SUBMIT_ORDER',value:'',info:'执行-提交订单'},
	{name:'FANG_DI_JILING_AUDIT',value:'../approve/o_approve_room.html',info:'经理-部门初审'},
	{name:'FANG_DI_FENGKONG_AUDIT_1',value:'../publish/review.html',info:'风控-初审'},
	{name:'FANG_DI_QUANZHENG_AUDIT',value:'../warrant/o_warrant_mdf_room.html',info:'权证-下户'},
	{name:'FANG_DI_GONGSI_AUDIT',value:'../publish/review.html',info:'公司-终审'},
	{name:'FANG_DI_JITUAN_AUDIT',value:'../publish/review.html',info:'集团-终审'},
	{name:'FANG_DI_ZHIXING_SUBMIT_CONTRACT',value:'',info:'执行-提交合同'},
	{name:'FANG_DI_QUANZHENG_DIYA',value:'../publish/review.html',info:'权证-抵押'},
	{name:'FANG_DI_DANGAN_RUKU',value:'',info:'档案-入库'},
	{name:'FANG_DI_CAIWU_CONFIRM',value:'',info:'财务-确认业务费缴纳'},
	{name:'FANG_DI_ZHIXING_CHUKUAN_SUBMIT',value:'',info:'执行-出款申请'},
	{name:'FANG_DI_CAIWU_CHUKUAN_BOOKING',value:'',info:'财务-出款记账'},
	{name:'FANG_DI_FENGKONG_CHUKUAN_OVER_ORDER',value:'',info:'风控-出款过单'},
	{name:'FANG_DI_CAIWU_CHUKUAN',value:'',info:'财务-出款'},
	{name:'FANG_DI_CAIWU_REPAYMENT_CONFIRM',value:'',info:'财务-确认还款'},
	{name:'FANG_DI_CAIWU_REPAYMENT_BOOKING',value:'',info:'财务-还款记账'},
	{name:'FANG_DI_CAIWU_YEWUFEI_PAYMENT_CONFIRM',value:'',info:'财务-确认业务费缴纳'},
	{name:'FANG_DI_DINGDAN_FINISH_SYSTEM',value:'',info:'系统-订单完成'},
];

let key1 = {};

key.map(rs=>{
	key1[rs.name] = {
		url:rs.value,
		title:rs.info
	};
});


module.exports = key1;






