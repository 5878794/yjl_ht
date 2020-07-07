


module.exports = {
	index:{
		setting:{
			titleRowStyle:{display:'none'},
			rowHeight:80,
			rowStyle:{background:"#fff",marginBottom:'5px',cursor:'pointer'},
			celStyle:{padding:'0 10px'},
			rowHoverStyle:{background:'#fbd6d8'},
			rowNotHoverStyle:{background:'#fff'}
		},
		data:[
			{
				name:'t1',          //must,标题行名称
				width:'20%',         //must,cel宽度
				color:'#ccc',        //must,字体颜色
									 //key 或 children字段必须出现一个
				cursor:'',      //是否显示可点击鼠标样式
				icon:'key1',            //该列是否有图标
				children:[
					{color:'#333',key:'key2'},//该列内显示的子数据，竖向排列
					{color: '#999', key: 'key3'}
				]
			},
			{
				name:'t1',
				width:'20%',
				color:'#333',
				key:'key4'                //数据对应的key
			},
			{
				name:'t1',
				width:'20%',
				color:'#333',
				children:[
					{color:'#333',key:'key5'},//该列内显示的子数据，竖向排列
					{color: '#999', key: 'key6'}
				]
			},
			{
				name:'t1',
				width:'30%',
				color:'#333',
				children:[
					{color:'#cc9a4a',key:'key7'},//该列内显示的子数据，竖向排列
					{color: '#999', key: 'key8'}
				]
			},
			{
				name:'t1',
				width:'10%',
				color:'#333',
				icon:'key9'
			}
		]
	}
}