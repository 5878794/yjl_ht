let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	tableSet = require('./../../es6/tableSetting'),
	inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b-win-top');
require('./../../es6/yjl/b-search');
require('./../../es6/customElement/pc/table_list');
require('./../../es6/customElement/pc/pagination');



let loading;
let Page = {
	init(){
		// loading = new loadFn();
		// loading.show('急速加载中');
		this.run().then(rs=>{
			// loading.hide();
		}).catch(rs=>{
			// err.error(rs);
			// loading.hide();
			// app.alert(rs);
			throw rs;
		});
	},
	async run(){
		this.createSearch();
		this.createList();
		this.createPagination();

	},
	createSearch(){
		let search = $('#b_search').get(0);
		search.inputData = [
			{name:'',type:'search',id:'a6',placeholder:'请输入你要搜索的员工',width:'100%'}
		];
		search.clickFn = function(rs){
			console.log(rs);    //返回 对应的 {id:value,...}
		};


		inputStyle.searchSet(search,'search');
	},
	createList(){
		let table = $('#table_list').get(0);
		tableSet.set(table,'management_staff');

		//TODO 数据获取
		let tempData = [
			{
				id:1,key1:'张三张三',
				key2:'12312312312',key3:'撒地方看见啊时刻都将罚款时间的饭卡上剪短发开始的减肥',key4:'2011-11-11',
				key5:'部门名部门名部门名部门名'
			}
		];
		table.show(tempData);

		table.body.find('.__key7__').each(function(){
			$(this).addClass('hover');
		});
		table.body.find('.__key7__').click(function(){
			let data = $(this).parent().data('data');
			console.log(data);
		});
	},
	createPagination(){
		let fy = $('#table_pagination').get(0);
		fy.show({
			nowPage: 10,             //当前页码       默认：1
			listLength: 149,         //总记录数
			pageSize: 10             //分页数         默认：10
		});
		fy.clickFn = function(n){
			console.log(n)          //点击事件，返回点击的页码
		};
		fy.selectBg = 'rgb(86,123,249)';        //设置当前页码显示的背景色  默认：#cc9800

	}
};


app.run(Page);