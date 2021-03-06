let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	pageSizeSetting = require('./../../es6/pageSize'),
	winSetting = require('./../../es6/winSetting'),
	tableSet = require('./../../es6/tableSetting'),
	stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
	selectData = require('./../../es6/selectData'),
	inputStyle = require('./../../es6/inputStyle');

window.ajax = ajax;
window.api = api;

require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b-win-top');
require('./../../es6/yjl/b-search');
require('./../../es6/customElement/pc/table_list');
require('./../../es6/customElement/pc/pagination');


let Page = {
	init(){
		all.showLoadingRun(this,'run');
	},
	async run(){
		await all.getUserInfo();
		this.createSearch();
		this.bindEvent();

		await selectData($('#b_search').get(0).body);

		await this.getData({pageNum:1});
	},
	bindEvent(){
		let btn = $('#add_btn');
		btn.click(function(){
			qt.openPage(
				'../file/o_add.html',
				winSetting.file_add.width,
				winSetting.file_add.height)
		});
	},
	async getData(data){
		let _this = this;
		this.catchListParam = data;

		data.pageSize = pageSizeSetting.management_notice;
		let [listData] = await ajax.send([
			api.file_list(data)
		]);
		let listNumber = listData.total;
		listData = listData.list || [];

		await this.createList(listData);
		all.createFY({
			domId:'table_pagination',
			nowPage:data.pageNum,
			listLength:listNumber,
			pageSize:data.pageSize,
			searchData:data,
			getDataFn:function(obj){
				all.showLoadingRun(_this,'getData',obj);
			}
		});
	},
	createSearch(){
		let search = $('#b_search').get(0),
			_this = this;

		search.body.css({
			minWidth:'auto',
			maxWidth:'none'
		});
		search.inputData = [
			{name:'客户姓名:',type:'text',id:'name',width:'30%'},
			{name:'客户电话:',type:'text',id:'mobile',width:'30%'},
			{name:'档案室:',type:'select',id:'archiveRoom',width:'30%',bind:'archivesList'},
			{name:'日期',type:'assDate',id:['startTime','endTime'],width:'60%'}
		];
		search.clickFn = function(rs){
			rs.pageNum = 1;
			all.showLoadingRun(_this,'getData',rs);
		};


		inputStyle.searchSet(search);
	},
	async createList(data){
		let table = $('#table_list').get(0),
			_this = this;

		tableSet.set(table,'file');

		let dist = await selectData('fileState') || {};
		data.map(rs=>{
			rs.state_ = dist[rs.addressStatus];
			rs.key5 = (rs.addressStatus == 0)? '出库' : '';
			rs.createTime_ = stamp2Date.getDate1(rs.createTime);
		});

		table.show(data);


		// {name:'已入库',value:'0'},
		// {name:'出库审批中',value:'1'},
		// {name:'已出库',value:'2'},
		// {name:'申请失败',value:'3'}
		table.body.find('.__state___').find('div').each(function(){
			let data = $(this).parent().parent().data(),
				state = data.addressStatus;
			if(state == 0){
				$(this).css({color:'green'});
			}else if(state == 1){
				$(this).css({color:'blue'});
			}else if(state == 2){
				$(this).css({color:'#999'});
			}else{
				$(this).css({color:'red'});
			}
		});

		table.body.find('.__key5__').each(function(){
			$(this).addClass('hover');
			$(this).click(function(e){
				let data = $(this).parent().data('data'),
					id = data.id,
					state = data.addressStatus;
				e.stopPropagation();

				if(state == 0){
					all.showLoadingRun(_this,'fileOut',data);
				}
			})
		});

		table.body.find('.__row__').each(function(){
			$(this).css({cursor:'pointer'});
			$(this).click(function(){
				let data = $(this).data('data'),
					id = data.id;
				console.log(data.addressStatus)
				qt.openPage(
					'../file/o_info.html?id='+id+'&state='+data.addressStatus,
					winSetting.file_info.width,
					winSetting.file_info.height)
			});
		});
	},
	async fileOut(data){
		let id = data.orderId,
			orderNo = data.orderNo,
			currentNodeKey = 'CHU_KU_DANGAN_CHUKU_APPLY';

		qt.openPage(
			`../file/o_info1.html?id=${id}&orderNo=${orderNo}&currentNodeKey=${currentNodeKey}`,
			winSetting.file_info.width,
			winSetting.file_info.height)


		// await ajax.send([
		// 	api.file_out({
		// 		id:id
		// 	})
		// ]);
		//
		// await qt.alert('出库申请已提交!');
		// qt.refreshPage();
	},
	refreshList(){
		let data = this.catchListParam;
		console.log('refresh')
		all.showLoadingRun(this,'getData',data);
	}
};
window.refreshList = function(){
	Page.refreshList();
};

app.run(Page);