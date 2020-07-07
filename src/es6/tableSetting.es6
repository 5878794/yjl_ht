


module.exports = {
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
	}
}