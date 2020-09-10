let app = require('./../../es6/lib/page'),
	all = require('./../../es6/all');



require('./../../es6/yjl/b-win-left');


window.chooseNav = function(tag){
	let nav = $('b-win-left').get(0);
	nav.chooseNav(tag);
};
window.iframeOpen = function(url){
	let nav = $('b-win-left').get(0);
	nav.openIframePage(url);
};

window.userLock = function(state){
	let nav = $('b-win-left').get(0);
	nav.userLock = state;
};


let navData = [
	{name:'首页',icon:'../res/image/icon1.png',url:'../index/index.html'},
	{name:'草稿箱',icon:'../res/image/icon2.png',url:'../draft/draft.html'},
	{name:'我的业务',icon:'../res/image/icon3.png',url:'../business/business.html'},
	{name:'退费退款',icon:'../res/image/icon4.png',url:'../refund/refund.html'},
	{name:'审批',icon:'../res/image/icon5.png',url:'../approve/approve.html'},
	{name:'权证',icon:'../res/image/icon6.png',url:'../warrant/warrant.html'},
	{name:'贷后',icon:'../res/image/icon7.png',url:'../afterLoan/afterLoan.html'},
	{name:'财务',icon:'../res/image/icon8.png',url:'',children:[
			{name:'财务管理',url:'../finance/finance.html'},
			{name:'退尾款/费用',url:'../finance/refund.html'}
		]},
	{name:'档案',icon:'../res/image/icon9.png',url:'../file/file.html'},
	{name:'统计',icon:'../res/image/icon10.png',url:'',children:[
			{name:'垫资业务',url:'../statistics/advance.html?type=1'},
			{name:'房抵业务',url:'../statistics/arrival.html?type=1'}
		]},
	{name:'综合管理',icon:'../res/image/icon11.png',url:'',children:[
			{name:'员工',url:'../management/staff.html'},
			{name:'通知管理',url:'../management/notice.html'}
		]},
	{name:'设置',icon:'../res/image/icon12.png',url:'',children:[
			{name:'时间流程',url:'../setting/businessTime.html'},
			{name:'开关设置',url:'../setting/urgent_task.html'},
			{name:'客户来源',url:'../setting/client_source.html'},
			{name:'档案室',url:'../setting/client_source.html?type=11'},
			{name:'标准设定',url:'../setting/group_final_review.html'},
			{name:'通道配置',url:'../setting/channel_config.html'},
			{name:'公司部门',url:'../setting/company.html'},
			{name:'业务产品',url:'../setting/product_config.html'},
			{name:'权限角色',url:'../setting/authority_role.html'}
		]}
];

let Page = {
	init(){
		all.getUserInfo().then(rs=>{
			//判断权限
			//TODO 处理navData数据

			let navList = $('b-win-left').eq(0).get(0);
			navList.createList = navData;

		});
	}
};


app.run(Page);