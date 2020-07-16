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
			{name:'',type:'search',id:'a6',placeholder:'请输入你要搜索的通知标题',width:'100%'}
		];
		search.clickFn = function(rs){
			console.log(rs);    //返回 对应的 {id:value,...}
		};


		inputStyle.searchSet(search,'search');
	},
	createList(){
		let table = $('#table_list').get(0);
		tableSet.set(table,'management_notice');

		//TODO 数据获取
		let tempData = [
			{
				id:1,key1:'2011-11-11',
				key2:'通知标题通知标题通知标题通知标题',key3:'通知内容通知内容通知内容通知内容通知内容通知内容',key4:'长收纳是',
				key5:'删除'
			}
		];
		table.show(tempData);

		table.body.find('.__key5__').each(function(){
			$(this).addClass('hover');
		});
		table.body.find('.__key5__').click(function(){
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