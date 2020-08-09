
let qt = require('./qt'),
	{ajax,api} = require('./_ajax');

let dist = {
	//业务类型、业务方案
	businessType:[
	],
	//业务状态
	businessState:[],
	//业务来源
	businessFrom:[],
	//订单状态    全部、未出款、已出款、已完成
	orderState:[],
	//订单是否完结    （全部、已完结、未完结）
	orderEnd:[],
	//客户分类
	clientType:[],
	//到期状态
	matureState:[],
	//产品类型 机构添加产品处
	productType:[
		{name:'房抵产品',value:'0'},
		{name:'垫资产品',value:'1'}
	],
	//档案室
	archivesList:[],
	//产品来源
	productFrom:[],
	//来源机构
	agencyFrom:[],
	//产品名称
	productList:[],
	//住宅性质   住宅、公寓、商业、别墅、厂房
	residentialNature:[],
	//朝向
	houseOrientation:[],
	//装修情况   精装、简装、毛坯
	decorationState:[],
	//使用情况   自住、出租、空置
	houseUseState:[],
	//有无电梯
	hasElevator:[],
	//回款方式
	payBackMethod:[],
	//付款方式
	payMethod:[],
	//出款通道
	payPassage:[],
	//性别
	gender:[
		{name:'请选择',value:''},
		{name:'男',value:'0'},
		{name:'女',value:'1'},
		{name:'保密',value:'2'}
	],
	//最高学历
	education:[
		{name:'请选择',value:''},
		{name:'小学',value:'小学'},
		{name:'初中',value:'初中'},
		{name:'高中',value:'高中'},
		{name:'中专',value:'中专'},
		{name:'大专',value:'大专'},
		{name:'本科',value:'本科'},
		{name:'硕士',value:'硕士'},
		{name:'博士',value:'博士'}
	],
	//所属公司 动态数据
	company:[],
	//所属部门
	department:[
		{name:'请选择公司',value:''}
	],
	//拥有角色
	role:[]

};
let distApi = {
	company:'company_list',
	department:'department_list',
	role:'role_get_list'
};
let keyChange = {
	company:{name:'companyName',value:'id'},
	department:{name:'deptName',value:'id'},
	role:{name:'roleName',value:'id'}
};

let distApiKey = {
	department:'companyId'
};

let getChildData = async function(val,id){
	let bSelect = $('#'+id).get(0),
		type = $(bSelect).data('bind'),
		apiName = distApi[type];

	if(!val){
		bSelect.selectData = dist[type];
		return;
	}
	let param = {pageSize:9999999,pageNum:1};
	param[distApiKey[type]] = val;

	let [data] = await ajax.send([
		api[apiName](param)
	]);

	bSelect.selectData = getSelectDataFn(type,data);
};

let getSelectDataFn = function(type,data){
	let thisData = data.list,
		newData = [{name:'请选择',value:''}];
	thisData.map(rs=>{
		newData.push({
			name:rs[keyChange[type].name],
			value:rs[keyChange[type].value]
		});
	});

	return newData;
};

let getAndBindDataFromServer = async function(opt){
	let apis = [],
		doms = [],
		types = [];
	opt.map(rs=>{
		apis.push(api[rs.api]({pageSize:9999999,pageNum:1}));
		types.push(rs.type);
		doms.push(rs.dom);
	});
	let data = await ajax.send(apis);


	types.map((type,i)=>{
		let thisData = data[i];
		doms[i].selectData = getSelectDataFn(type,thisData);
	});
};

module.exports = async function(dom){
	let bSelect =  dom.find('b-input[type="select"]');

	let serverData = [];
	bSelect.each(function(){
		let type = $(this).data('bind'),
			child = $(this).data('child'),
			data = dist[type],
			api = distApi[type];

		if(data.length==0 && api){
			//需要从服务器获取数据
			serverData.push({dom:this,type,api});
		}else{
			//直接赋值
			this.selectData = data;
		}

		//有级联的select
		if(child){
			this.change = function(val,id){
				qt.loading.show();
				getChildData(val,id).then(rs=>{
					qt.loading.hide();
				}).catch(e=>{
					qt.loading.hide();
					qt.alert(e);
				})
			};
		}
	});

	await getAndBindDataFromServer(serverData);
};