let app = require('./../../es6/lib/page'),
	{ajax,api} = require('./../../es6/_ajax'),
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
	// nav.userLock = true;
	nav.userLock = state;
};



let navData = [
	{key:'HOME_MENU',name:'首页',icon:'../res/image/icon1.png',url:'../index/index.html'},
	{key:'DRAFT_MENU',name:'草稿箱',icon:'../res/image/icon2.png',url:'../draft/draft.html'},
	{key:'MY_BUSINESS_MENU',name:'我的业务',icon:'../res/image/icon3.png',url:'../business/business.html'},
	{key:'RETURN_MONEY_MENU',name:'退费退款',icon:'../res/image/icon4.png',url:'../refund/refund.html'},
	{key:'SHENPI_MENU',name:'审批',icon:'../res/image/icon5.png',url:'../approve/approve.html'},
	{key:'QUANZHENG_MENU',name:'权证',icon:'../res/image/icon6.png',url:'../warrant/warrant.html'},
	{key:'DAIHOU_MENU',name:'贷后',icon:'../res/image/icon7.png',url:'../afterLoan/afterLoan.html'},
	{name:'财务',icon:'../res/image/icon8.png',url:'',children:[
			{key:'CAIWU_MANANGE_MENU',name:'财务管理',url:'../finance/finance.html'},
			{key:'TUIWEIKUAN_MENU',name:'退尾款/费用',url:'../finance/refund.html'}
		]},
	{key:'DANGAN_MENU',name:'档案',icon:'../res/image/icon9.png',url:'../file/file.html'},
	{name:'统计',icon:'../res/image/icon10.png',url:'',children:[
			{key:'DZ_BUSINESS_MENU',name:'垫资业务',url:'../statistics/advance.html?type=1'},
			{key:'FD_BUSINESS_MENU',name:'房抵业务',url:'../statistics/arrival.html?type=1'}
		]},
	{name:'综合管理',icon:'../res/image/icon11.png',url:'',children:[
			{key:'EMPLOYEE_MENU',name:'员工',url:'../management/staff.html'},
			{key:'SYSTEM_BROAD_MENU',name:'通知管理',url:'../management/notice.html'}
		]},
	{name:'设置',icon:'../res/image/icon12.png',url:'',children:[
			{key:'SHIJIAN_MENU',name:'时间流程',url:'../setting/businessTime.html'},
			{key:'KAIGUAN_MENU',name:'开关设置',url:'../setting/urgent_task.html'},
			{key:'KEHULAIYUAN_MENU',name:'客户来源',url:'../setting/client_source.html'},
			{key:'DANGANSHI_MENU',name:'档案室',url:'../setting/client_source.html?type=11'},
			{key:'BIAOZHUN_MENU',name:'标准设定',url:'../setting/group_final_review.html'},
			{key:'TONGDAO_MENU',name:'通道配置',url:'../setting/channel_config.html'},
			{key:'DEPARTMENT_MENU',name:'公司部门',url:'../setting/company.html'},
			{key:'BUSINESS_PRODUCT_MENU',name:'业务产品',url:'../setting/product_config.html'},
			{key:'PRIVILEGE_ROLE_MENU',name:'权限角色',url:'../setting/authority_role.html'}
		]}
];

let Page = {
	init(){
		all.getUserInfo().then(async rs=>{
			let [data] = await ajax.send([
				api.get_menu_list()
			]);

			//全菜单  TEMP
			// data = ["HOME_MENU","DRAFT_MENU","MY_BUSINESS_MENU","RETURN_MONEY_MENU","SHENPI_MENU","QUANZHENG_MENU","DAIHOU_MENU","CAIWU_MANANGE_MENU","TUIWEIKUAN_MENU","DANGAN_MENU","DZ_BUSINESS_MENU","FD_BUSINESS_MENU","EMPLOYEE_MENU","SYSTEM_BROAD_MENU","SHIJIAN_MENU","KAIGUAN_MENU","KEHULAIYUAN_MENU","DANGANSHI_MENU","BIAOZHUN_MENU","TONGDAO_MENU","DEPARTMENT_MENU","BUSINESS_PRODUCT_MENU","PRIVILEGE_ROLE_MENU"];

			data = this.getMenuList(data);


			let navList = $('b-win-left').eq(0).get(0);
			navList.createList = data;

		});
	},
	getMenuList(data){
		let newData = [];
		navData.map(rs=>{
			let menuKey = rs.key;

			//无子菜单的
			if(menuKey){
				if(data.includes(menuKey)){
					newData.push(rs);
				}
			}else{
				let hasChild = [],
					child = rs.children;
				//获取不存在的子菜单
				child.map(rs1=>{
					let key = rs1.key;
					if(data.includes(key)){
						hasChild.push(rs1);
					}
				});
				rs.children = hasChild;

				if(rs.children.length != 0){
					newData.push(rs);
				}
			}
		});

		return newData;
	}
};


app.run(Page);