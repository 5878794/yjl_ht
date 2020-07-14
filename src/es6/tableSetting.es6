
let defaultSetting = {
	titleRowStyle:{background:'#fff',marginBottom:'5px',height:'60px'},
	rowHeight:50,
	rowStyle:{background:"#fff",marginBottom:'5px'},
	celStyle:{padding:'0 10px'},
	rowHoverStyle:{background:'#fbd6d8'},
	rowNotHoverStyle:{background:'#fff'},
	noDataHtml:'<div class="box_hcc" style="width:100%;height:100px;font-size:14px;color:#333;">暂无数据</div>'
};
let defaultSettingRowCanClick = {
	titleRowStyle:{background:'#fff',marginBottom:'5px',height:'60px'},
	rowHeight:50,
	rowStyle:{background:"#fff",marginBottom:'5px',cursor:'pointer'},
	celStyle:{padding:'0 10px'},
	rowHoverStyle:{background:'#fbd6d8'},
	rowNotHoverStyle:{background:'#fff'},
	noDataHtml:'<div class="box_hcc" style="width:100%;height:100px;font-size:14px;color:#333;">暂无数据</div>'
};

let mortgageRepaymentSet = {
	titleRowStyle:{background:'#e7e7e7',marginBottom:'5px',height:'30px',fontSize:'14px'},
	rowHeight:30,
	rowStyle:{background:"#fff",marginBottom:'5px',cursor:'pointer'},
	celStyle:{padding:'0 10px'},
	rowHoverStyle:{background:'#fbd6d8'},
	rowNotHoverStyle:{background:'#fff'},
	noDataHtml:'<div class="box_hcc" style="width:100%;height:100px;font-size:14px;color:#333;">暂无数据</div>'
};



let setting = {
	index:{
		setting:{
			titleRowStyle:{display:'none'},
			rowHeight:70,
			rowStyle:{background:"#fff",marginBottom:'5px',cursor:'pointer'},
			celStyle:{padding:'0 10px'},
			rowHoverStyle:{background:'#fbd6d8'},
			rowNotHoverStyle:{background:'#fff'},
			noDataHtml:'<div class="box_hcc" style="width:100%;height:100px;font-size:14px;color:#333;">暂无数据</div>'
		},
		data:[
			{
				name:'t1',          //must,标题行名称
				width:'20%',         //must,cel宽度
				icon:'key1',            //该列是否有图标
				iconStyle:{width:'24px',height:'24px',marginLeft:'20px',marginRight:'5px'},
				children:[
					{style:{color:'#333',fontSize:'14px',lineHeight:'20px'},key:'key2'},//该列内显示的子数据，竖向排列
					{style:{color:'#999',fontSize:'12px',lineHeight:'20px'}, key: 'key3'}
				]
			},
			{
				name:'t1',
				width:'20%',
				style:{color:'#333',fontSize:'14px'},
				key:'key4'                //数据对应的key
			},
			{
				name:'t1',
				width:'20%',
				children:[
					{style:{color:'#333',fontSize:'14px',lineHeight:'20px'},key:'key5'},//该列内显示的子数据，竖向排列
					{style:{color:'#999',fontSize:'12px',lineHeight:'20px'}, key: 'key6'}
				]
			},
			{
				name:'t1',
				width:'30%',
				children:[
					{style:{color:'#cc9a4a',fontSize:'14px',lineHeight:'20px'},key:'key7'},//该列内显示的子数据，竖向排列
					{style:{color:'#999',fontSize:'12px',lineHeight:'20px'},type:'html', key: 'key8'}
				]
			},
			{
				name:'t1',
				width:'10%',
				icon:'key9',
				iconStyle:{width:'26px',height:'26px'}
			}
		]
	},
	draft:{
		setting:defaultSetting,
		data:[
			{
				name:'客户姓名',
				width:'15%',
				style:{color:'#333',fontSize:'14px'},
				key:'key1'                //数据对应的key
			},
			{
				name:'主申请人电话号码',
				width:'20%',
				style:{color:'#333',fontSize:'14px'},
				key:'key2'                //数据对应的key
			},
			{
				name:'业务类型',
				width:'15%',
				style:{color:'#333',fontSize:'14px'},
				key:'key3'                //数据对应的key
			},
			{
				name:'申请金额',
				width:'25%',
				style:{color:'#333',fontSize:'14px'},
				key:'key4'                //数据对应的key
			},
			{
				name:'订单创建时间',
				width:'15%',
				style:{color:'#333',fontSize:'14px'},
				key:'key5'                //数据对应的key
			},
			{
				name:'',
				width:'10%',
				style:{color:'rgb(86,123,249)',fontSize:'14px',cursor:'pointer'},
				key:'key6'                //数据对应的key
			}
		]
	},
	business:{
		setting:defaultSetting,
		data:[
			{
				name:'订单号',
				width:'20%',
				style:{color:'#333',fontSize:'14px'},
				key:'key1'                //数据对应的key
			},
			{
				name:'姓名',
				width:'15%',
				style:{color:'#333',fontSize:'14px'},
				key:'key2'                //数据对应的key
			},
			{
				name:'产品类型',
				width:'15%',
				style:{color:'#333',fontSize:'14px'},
				key:'key3'                //数据对应的key
			},
			{
				name:'申请金额',
				width:'25%',
				style:{color:'#333',fontSize:'14px'},
				key:'key4'                //数据对应的key
			},
			{
				name:'订单状态',
				width:'15%',
				style:{color:'#333',fontSize:'14px'},
				key:'key5'                //数据对应的key
			},
			{
				name:'操作',
				width:'10%',
				style:{color:'rgb(86,123,249)',fontSize:'14px'},
				key:'key6'                //数据对应的key
			}
		]
	},
	refund:{
		setting:defaultSetting,
		data:[
			{
				name:'退费类型',
				width:'15%',
				style:{color:'#333',fontSize:'14px'},
				key:'key1'                //数据对应的key
			},
			{
				name:'客户姓名',
				width:'10%',
				style:{color:'#333',fontSize:'14px'},
				key:'key2'                //数据对应的key
			},
			{
				name:'客户电话',
				width:'15%',
				style:{color:'#333',fontSize:'14px'},
				key:'key3'                //数据对应的key
			},
			{
				name:'业务类型',
				width:'10%',
				style:{color:'#333',fontSize:'14px'},
				key:'key4'                //数据对应的key
			},
			{
				name:'申请金额',
				width:'25%',
				style:{color:'#333',fontSize:'14px'},
				key:'key5'                //数据对应的key
			},
			{
				name:'退费金额',
				width:'15%',
				style:{color:'#333',fontSize:'14px'},
				key:'key6'                //数据对应的key
			},
			{
				name:'',
				width:'10%',
				style:{color:'rgb(86,123,249)',fontSize:'14px'},
				key:'key7'                //数据对应的key
			}
		]
	},
	approve:{
		setting:defaultSetting,
		data:[
			{
				name:'客户姓名',
				width:'8%',
				style:{color:'#333',fontSize:'14px'},
				key:'key1'                //数据对应的key
			},
			{
				name:'经办人',
				width:'8%',
				style:{color:'#333',fontSize:'14px'},
				key:'key2'                //数据对应的key
			},
			{
				name:'隶属公司部门',
				width:'15%',
				style:{color:'#333',fontSize:'14px'},
				key:'key3'                //数据对应的key
			},
			{
				name:'申请金额',
				width:'15%',
				style:{color:'#333',fontSize:'14px'},
				key:'key4'                //数据对应的key
			},
			{
				name:'业务类型',
				width:'10%',
				style:{color:'#333',fontSize:'14px'},
				key:'key5'                //数据对应的key
			},
			{
				name:'申请时间',
				width:'10%',
				style:{color:'#333',fontSize:'14px'},
				key:'key6'                //数据对应的key
			},
			{
				name:'客户电话号码',
				width:'12%',
				style:{color:'#333',fontSize:'14px'},
				key:'key7'                //数据对应的key
			},
			{
				name:'经办人电话',
				width:'12%',
				style:{color:'#333',fontSize:'14px'},
				key:'key8'                //数据对应的key
			},
			{
				name:'订单状态',
				width:'10%',
				style:{color:'rgb(198,84,98)',fontSize:'14px'},
				key:'key9'                //数据对应的key
			}
		]
	},
	warrant:{
		setting:defaultSettingRowCanClick,
		data:[
			{
				name:'客户姓名',
				width:'10%',
				style:{color:'#333',fontSize:'14px'},
				key:'key1'                //数据对应的key
			},
			{
				name:'客户电话',
				width:'15%',
				style:{color:'#333',fontSize:'14px'},
				key:'key2'                //数据对应的key
			},
			{
				name:'经办人',
				width:'10%',
				style:{color:'#333',fontSize:'14px'},
				key:'key3'                //数据对应的key
			},
			{
				name:'经办人部门',
				width:'20%',
				style:{color:'#333',fontSize:'14px'},
				key:'key4'                //数据对应的key
			},
			{
				name:'经办人电话',
				width:'15%',
				style:{color:'#333',fontSize:'14px'},
				key:'key5'                //数据对应的key
			},
			{
				name:'业务状态',
				width:'10%',
				style:{color:'#333',fontSize:'14px'},
				key:'key6'                //数据对应的key
			},
			{
				name:'到期时间',
				width:'10%',
				style:{color:'#333',fontSize:'14px'},
				key:'key7'                //数据对应的key
			},
			{
				name:'剩余天数',
				width:'10%',
				style:{color:'#333',fontSize:'14px'},
				key:'key8'                //数据对应的key
			}
		]
	},
	afterLoan:{
		setting:defaultSettingRowCanClick,
		data:[
			{
				name:'客户姓名',
				width:'7%',
				style:{color:'#333',fontSize:'14px'},
				key:'key1'                //数据对应的key
			},
			{
				name:'申请金额',
				width:'16%',
				style:{color:'#333',fontSize:'14px'},
				key:'key2'                //数据对应的key
			},
			{
				name:'业务类型',
				width:'10%',
				style:{color:'#333',fontSize:'14px'},
				key:'key3'                //数据对应的key
			},
			{
				name:'出款时间',
				width:'10%',
				style:{color:'#333',fontSize:'14px'},
				key:'key4'                //数据对应的key
			},
			{
				name:'预期时间(天)',
				width:'10%',
				style:{color:'#333',fontSize:'14px'},
				key:'key5'                //数据对应的key
			},
			{
				name:'客户分类',
				width:'7%',
				style:{color:'#333',fontSize:'14px'},
				key:'key6'                //数据对应的key
			},
			{
				name:'剩余本金',
				width:'16%',
				style:{color:'#333',fontSize:'14px'},
				key:'key7'                //数据对应的key
			},
			{
				name:'剩余利息',
				width:'16%',
				style:{color:'#333',fontSize:'14px'},
				key:'key8'                //数据对应的key
			},
			{
				name:'操作',
				width:'8%',
				style:{color:'rgb(86,123,249)',fontSize:'14px'},
				key:'key9'                //数据对应的key
			}
		]
	},
	finance:{
		setting:defaultSettingRowCanClick,
		data:[
			{
				name:'订单号',
				width:'7%',
				style:{color:'#333',fontSize:'14px'},
				key:'key1'                //数据对应的key
			},
			{
				name:'客户姓名',
				width:'5%',
				style:{color:'#333',fontSize:'14px'},
				key:'key2'                //数据对应的key
			},
			{
				name:'经办人',
				width:'5%',
				style:{color:'#333',fontSize:'14px'},
				key:'key3'                //数据对应的key
			},
			{
				name:'经办人电话',
				width:'7%',
				style:{color:'#333',fontSize:'14px'},
				key:'key4'                //数据对应的key
			},
			{
				name:'业务类型',
				width:'7%',
				style:{color:'#333',fontSize:'14px'},
				key:'key5'                //数据对应的key
			},
			{
				name:'申请金额',
				width:'8%',
				style:{color:'#333',fontSize:'14px'},
				key:'key6'                //数据对应的key
			},
			{
				name:'咨询费',
				width:'8%',
				style:{color:'#333',fontSize:'14px'},
				key:'key7'                //数据对应的key
			},
			{
				name:'服务费',
				width:'8%',
				style:{color:'#333',fontSize:'14px'},
				key:'key8'                //数据对应的key
			},
			{
				name:'权证费',
				width:'8%',
				style:{color:'#333',fontSize:'14px'},
				key:'key9'                //数据对应的key
			},
			{
				name:'优惠费用',
				width:'8%',
				style:{color:'rgb(198,84,98)',fontSize:'14px'},
				key:'key10'                //数据对应的key
			},
			{
				name:'已收小记',
				width:'8%',
				style:{color:'#333',fontSize:'14px'},
				key:'key11'                //数据对应的key
			},
			{
				name:'费用退补',
				width:'8%',
				style:{color:'rgb(198,84,98)',fontSize:'14px'},
				key:'key12'                //数据对应的key
			},
			{
				name:'业务状态',
				width:'7%',
				style:{color:'#333',fontSize:'14px'},
				key:'key13'                //数据对应的key
			},
			{
				name:'到期时间',
				width:'6%',
				style:{color:'#333',fontSize:'14px'},
				key:'key14'                //数据对应的key
			}
		]
	},
	finance_refund:{
		setting:defaultSetting,
		data:[
			{
				name:'退费类型',
				width:'10%',
				style:{color:'#333',fontSize:'14px'},
				key:'key1'                //数据对应的key
			},
			{
				name:'客户姓名',
				width:'10%',
				style:{color:'#333',fontSize:'14px'},
				key:'key2'                //数据对应的key
			},
			{
				name:'客户电话',
				width:'12%',
				style:{color:'#333',fontSize:'14px'},
				key:'key3'                //数据对应的key
			},
			{
				name:'经办人',
				width:'10%',
				style:{color:'#333',fontSize:'14px'},
				key:'key4'                //数据对应的key
			},
			{
				name:'经办人电话',
				width:'12%',
				style:{color:'#333',fontSize:'14px'},
				key:'key5'                //数据对应的key
			},
			{
				name:'业务类型',
				width:'11%',
				style:{color:'#333',fontSize:'14px'},
				key:'key6'                //数据对应的key
			},
			{
				name:'退费金额',
				width:'25%',
				style:{color:'#333',fontSize:'14px'},
				key:'key7'                //数据对应的key
			},
			{
				name:'操作',
				width:'10%',
				style:{color:'rgb(86,123,249)',fontSize:'14px'},
				key:'key8'                //数据对应的key
			}
		]
	},
	mortgage_repayment:{
		setting:mortgageRepaymentSet,
		data:[
			{
				name:'期数',
				width:'8%',
				style:{color:'#333',fontSize:'14px'},
				key:'key1'                //数据对应的key
			},
			{
				name:'还款时间',
				width:'8%',
				style:{color:'#333',fontSize:'14px'},
				key:'key2'                //数据对应的key
			},
			{
				name:'归还本金',
				width:'13%',
				style:{color:'#333',fontSize:'14px'},
				key:'key3'                //数据对应的key
			},
			{
				name:'咨询费用',
				width:'13%',
				style:{color:'#333',fontSize:'14px'},
				key:'key4'                //数据对应的key
			},
			{
				name:'当期合计',
				width:'13%',
				style:{color:'#333',fontSize:'14px'},
				key:'key5'                //数据对应的key
			},
			{
				name:'剩余本金',
				width:'13%',
				style:{color:'#333',fontSize:'14px'},
				key:'key6'                //数据对应的key
			},
			{
				name:'实际还款时间',
				width:'8%',
				style:{color:'#333',fontSize:'14px'},
				key:'key7'                //数据对应的key
			},
			{
				name:'实际还款合计 (逾期费)',
				width:'24%',
				children:[
					{style:{color:'#333',fontSize:'14px',lineHeight:'20px'},key:'key8'},//该列内显示的子数据，竖向排列
					{style:{color:'red',fontSize:'14px',lineHeight:'20px',paddingLeft:'5px'}, key: 'key9'}
				]
			}
		]
	},


	set(dom,page){
		dom.setting = this[page].setting;
		dom.data = this[page].data;
	}
};


module.exports = setting;