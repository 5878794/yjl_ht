
let qt = require('./qt'),
	{ajax,api} = require('./_ajax');

let dist = {
	businessTypeIndex:[],
	//业务类型、业务方案
	businessType:[],
	//业务状态
	businessState:[],
	//业务来源
	businessFrom:[],
	//订单状态
// 	AUDIT_WAIT(0,"未提交(草稿)"),
// AUDIT_ING(1,"审批中（未出款）"),
// 	AUDIT_CHUKUAN(2,"已出款"),
// 	AUDIT_NO_PASS(3,"审核不通过"),
// 	AUDIT_DELETED_ING(88,"删除审批中"),
// 	AUDIT_FINISH(99,"已完成");
	orderState:[
		{name:'请选择',value:''},
		{name:'未提交',value:'0'},
		{name:'审批中',value:'1'},
		{name:'已出款',value:'2'},
		{name:'审核不通过',value:'3'},
		{name:'删除审批中',value:'88'},
		{name:'已完成',value:'99'},
	],
	orderState1:[
		{name:'请选择',value:''},
		{name:'审批中',value:'1'},
		{name:'已出款',value:'2'},
		{name:'审核不通过',value:'3'},
		{name:'删除审批中',value:'88'},
		{name:'已完成',value:'99'},
	],
	//订单是否完结    （全部、已完结、未完结）
	orderEnd:[],
	//客户分类
	clientType:[
		{name:'请选择',value:''},
		{name:'A类',value:'A'},
		{name:'B类',value:'B'},
		{name:'C类',value:'C'},
		{name:'D类',value:'D'},
		{name:'E类',value:'E'}
	],
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
	productList:[
		{name:'请选择机构',value:''},
	],
	//住宅性质 不动产性质    1:住宅 2:公寓 3:商业 4:别墅 5:厂房
	residentialNature:[
		{name:'请选择',value:''},
		{name:'住宅',value:'1'},
		{name:'公寓',value:'2'},
		{name:'商业',value:'3'},
		{name:'别墅',value:'4'},
		{name:'厂房',value:'5'}
	],
	//朝向   东，南，西，北，南北，东西，东南，西南，东北，西北
	houseOrientation:[
		{name:'请选择',value:''},
		{name:'东',value:'东'},
		{name:'南',value:'南'},
		{name:'西',value:'西'},
		{name:'北',value:'北'},
		{name:'东南',value:'东南'},
		{name:'西南',value:'西南'},
		{name:'东北',value:'东北'},
		{name:'西北',value:'西北'}
	],
	//装修情况   精装、简装、毛坯
	decorationState:[
		{name:'请选择',value:''},
		{name:'精装',value:'精装'},
		{name:'简装',value:'简装'},
		{name:'毛坯',value:'毛坯'}
	],
	//使用情况   自住、出租、空置
	houseUseState:[
		{name:'请选择',value:''},
		{name:'自住',value:'自住'},
		{name:'出租',value:'出租'},
		{name:'空置',value:'空置'}
	],
	//有无电梯
	hasElevator:[
		{name:'请选择',value:''},
		{name:'有',value:'有'},
		{name:'无',value:'无'},
	],
	//回款方式
	payBackMethod:[],
	//付款方式
	payMethod:[],
	//退费类型
	backPayMethod:[],
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
	myDepartment:[],
	//拥有角色
	role:[],
	//档案状态
	//档案状态 0-已入库 1-申请出库审批中 2-已出库 3-出库申请失败
	fileState:[
		{name:'已入库',value:'0'},
		{name:'出库审批中',value:'1'},
		{name:'已出库',value:'2'},
		{name:'申请失败',value:'3'}
	],
	//经办人
	manager:[
		{name:'请选择公司',value:''}
	],
	//部门-经办人
	manager1:[
		{name:'请选择部门',value:''}
	],
	//到期状态(1-已逾期、2-即将到期（5天内到期）)
	expireStatus:[
		{name:'请选择',value:''},
		{name:'已逾期',value:'1'},
		{name:'即将到期(5天内到期）',value:'2'}
	],

	//退款、退费状态
	//0:初始状态 1-审批中 2-审批通过 3-审批失败
	refundState:[
		{name:'申请',value:'0'},
		{name:'审批中',value:'1'},
		{name:'审批通过',value:'2'},
		{name:'审批失败',value:'3'}
	]



};
let distApi = {
	company:{api:'company_list'},
	department:{api:'department_list'},
	role:{api:'role_get_list'},
	archivesList:{api:'setting_config_list',data:{type:11}},
	businessType:{api:'setting_config_list',data:{type:0}},
	businessTypeIndex:{api:'setting_config_list',data:{type:0}},
	payBackMethod:{api:'setting_config_list',data:{type:2}},
	payMethod:{api:'setting_config_list',data:{type:3}},
	residentialNature:{api:'setting_config_list',data:{type:4}},
	backPayMethod:{api:'setting_config_list',data:{type:5}},
	businessFrom:{api:'setting_config_list',data:{type:1}},
	payPassage:{api:'setting_config_list',data:{type:6}},
	manager:{api:'staff_list'},
	manager1:{api:'staff_list'},
	agencyFrom:{api:'org_list'},
	productList:{api:'org_product_list'},
	myDepartment:{api:'department_list',data:{companyId:window.companyId}},
};
let getDataFn = {
	company:function(data){return data.list},
	department:function(data){return data.list},
	role:function(data){return data.list},
	archivesList:function(data){
		data = data[0] || {};
		data = data.children || [];
		return data;
	},
	businessType:function(data){
		data = data[0] || {};
		data = data.children || [];
		return data;
	},
	businessTypeIndex:function(data){
		//type类型//0:无 1:房抵 2:垫资 3:房抵+垫资"
		let type = window.orderCreatePrivilegeType;
		data = data[0] || {};
		data = data.children || [];

		let newData = {};
		data.map(rs=>{
			//1房抵 2垫资 3非交易垫资
			newData[rs.key] = rs;
		});

		if(type==0){
			return [];
		}
		if(type==1){
			return [newData['1']];
		}
		if(type==2){
			return [newData['2'],newData['3']]
		}

		return data;

	},
	payBackMethod:function(data){
		data = data[0] || {};
		data = data.children || [];
		return data;
	},
	payPassage:function(data){
		data = data[0] || {};
		data = data.children || [];
		return data;
	},
	payMethod:function(data){
		data = data[0] || {};
		data = data.children || [];
		return data;
	},
	residentialNature:function(data){
		data = data[0] || {};
		data = data.children || [];
		return data;
	},
	backPayMethod:function(data){
		data = data[0] || {};
		data = data.children || [];
		return data;
	},
	businessFrom:function(data){
		data = data[0] || {};
		data = data.children || [];

		//添加其他类别
		data.push({text:'其它',id:'-1'});
		return data;
	},
	manager:function(data){
		data = data.list || [];
		return data;
	},
	manager1:function(data){
		data = data.list || [];
		return data;
	},
	agencyFrom:function(data){
		data = data.list || [];
		return data;
	},
	productList:function(data){
		data = data.list || [];
		return data;
	},
	myDepartment:function(data){
		data = data.list || [];
		return data;
	},
};
let keyChange = {
	company:{name:'companyName',value:'id'},
	department:{name:'deptName',value:'id'},
	role:{name:'roleName',value:'id'},
	archivesList:{name:'text',value:'key'},
	businessType:{name:'text',value:'key'},
	businessTypeIndex:{name:'text',value:'key'},
	payPassage:{name:'text',value:'key'},
	payBackMethod:{name:'text',value:'key'},
	payMethod:{name:'text',value:'key'},
	residentialNature:{name:'text',value:'key'},
	backPayMethod:{name:'text',value:'key'},
	businessFrom:{name:'text',value:'key'},
	manager:{name:'userName',value:'id'},
	manager1:{name:'userName',value:'id'},
	agencyFrom:{name:'organizationName',value:'id'},
	productList:{name:'productName',value:'id'},
	myDepartment:{name:'deptName',value:'id'},
};

//级联菜单获取时的参数
let distApiKey = {
	department:'companyId',
	manager:'companyId',
	manager1:'parentId',
	productList:'organizationId'
};

let getChildData = async function(val,id){
	let bSelect = $('#'+id).get(0);
	if(!bSelect){
		bSelect = $('b-search').get(0).body.find('b-input[key="'+id+'"]').get(0);
	}

	let	type = $(bSelect).data('bind'),
		apiParam = distApi[type],
		apiName = apiParam.api,
		addParam = $(bSelect).data('addParam') || {},
		param = apiParam.data || {};

	if(!val){
		bSelect.selectData = dist[type];
		return;
	}

	param.pageSize = 9999999;
	param.pageNum = 1;
	param[distApiKey[type]] = val;

	for(let [paramKey,paramVal] of Object.entries(addParam)){
		param[paramKey] = paramVal;
	}


	let [data] = await ajax.send([
		api[apiName](param)
	]);

	bSelect.selectData = getSelectDataFn(type,data,true);
};

let getSelectDataFn = function(type,data,notCatch){
	let thisData = getDataFn[type](data),
		newData = [{name:'请选择',value:''}];
	thisData.map(rs=>{
		newData.push({
			name:rs[keyChange[type].name],
			value:rs[keyChange[type].value],
			data:rs
		});
	});

	//缓存数据
	if(!notCatch){
		dist[type] = newData;
	}

	return newData;
};

let getAndBindDataFromServer = async function(opt){
	let apis = [],
		doms = [],
		types = [];
	opt.map(rs=>{
		let apiParam = rs.api,
			serverUrl = apiParam.api,
			data = apiParam.data || {};
		data.pageSize = 9999999;
		data.pageNum = 1;

		apis.push(api[serverUrl](data));
		types.push(rs.type);
		doms.push(rs.dom);
	});
	let data = await ajax.send(apis);


	types.map((type,i)=>{
		let thisData = data[i];
		doms[i].selectData = getSelectDataFn(type,thisData);
	});
};

let getServerData = async function(type){
	let data = dist[type],
		apiParam = distApi[type];
	if(data.length==0 && apiParam){
		let serverUrl = apiParam.api,
			data = apiParam.data || {};
		data.pageSize = 9999999;
		data.pageNum = 1;
		let [backData] = await ajax.send([api[serverUrl](data)]);
		backData = getSelectDataFn(type,backData);
		return backData;
	}else{
		return dist[type];
	}
};


module.exports = async function(dom,needArray){
	if(typeof dom == 'string'){
		if(needArray){
			return await getServerData(dom);
			// return dist[dom];
		}else{
			// 直接返回对应的字典
			// let data = dist[dom];
			let data = await getServerData(dom);
			let newData = {};
			data.map(rs=>{
				newData[rs.value] = rs.name;
			});
			return newData;
		}
	}


	let bSelect =  dom.find('b-input[type="select"]');

	let serverData = [];
	bSelect.each(function(){
		let type = $(this).data('bind'),
			child = $(this).data('child'),
			hasData = this.hasData,
			data = dist[type] || [],
			api = distApi[type];

		if(!hasData){
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
		}
	});

	await getAndBindDataFromServer(serverData);
};