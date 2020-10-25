let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	gerParamFromUrl = require('./../../es6/lib/fn/getParamFromUrl'),
	pageSizeSetting = require('./../../es6/pageSize'),
	winSetting = require('./../../es6/winSetting'),
	tableSet = require('./../../es6/tableSetting'),
	stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
	selectData = require('./../../es6/selectData'),
	inputStyle = require('./../../es6/inputStyle');


require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_date');
require('./../../es6/customElement/pc/input_file');
require('./../../es6/customElement/pc/input_search');
require('./../../es6/customElement/pc/input_money');



let Page = {
	init(){
		all.showLoadingRun(this,'run');
	},
	async run(){
		await all.getUserInfo();

		let param = gerParamFromUrl();
		this.orderNo = param.orderNo;

		await selectData($('#form'));
		this.setInput();
		this.bindEvent();


		if(this.orderNo){
			await this.initValueSearch(this.orderNo);
		}

	},
	//已传入订单编号
	async initValueSearch(orderNo){
		let [data] = await ajax.send([
			api.file_list({orderNo:orderNo})
		]);
		data = data.list || [];
		data = data[0] || {};

		let userName = data.name;

		$('#orderNo').get(0).value = orderNo;
		$('#orderNo').get(0).disabled = true;
		$('#name').get(0).value = userName;

	},
	setInput(){
		inputStyle.set(true,true);

		let search = $('#orderNo').get(0),
			name = $('#name').get(0),
			date = $('#createTime').get(0),
			dateVal = stamp2Date.getDate1(new Date().getTime()),
			catchData = {};

		date.value = dateVal;

		search.searchFn = async function(val){
			let [data] = await ajax.send([
				api.file_list({orderNo:val})
			]);
			data = data.list;

			let backData = [];
			catchData = {};
			data.map(rs=>{
				backData.push(rs.orderNo);
				let orderNo = rs.orderNo;
				catchData[orderNo] = rs;
			});

			return backData;
		};
		search.inputFn = function(val){
			let data = catchData[val] || {};
			name.value = data.name || '';
		};
	},
	bindEvent(){
		let _this = this;
		$('#submit').click(function(){
			all.showLoadingRun(_this,'submit');
		});
	},
	async submit(){
		let form = await all.getFromVal($('#form'));
		let files = form.attachUrls;
		let filesServerUrl = await all.uploadFile(files);
		filesServerUrl = filesServerUrl.join(',');

		form.attachUrls = filesServerUrl;

		await ajax.send([
			api.file_add(form)
		]);

		await qt.alert('添加成功!');
		qt.closeWin();
	}


};


app.run(Page);