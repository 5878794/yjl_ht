



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
		let param = gerParamFromUrl();

		this.id = param.id;
		this.state = param.state;

		await all.getUserInfo();
		await selectData($('#from'));
		let [data] = await ajax.send([
			api.file_list({id:this.id})
		]);
		data = data.list || [];
		data = data[0] || {};

		this.orderNo = data.orderNo;
		let [history] = await ajax.send([
			api.file_history({orderNo:this.orderNo})
		]);
		this.bindHistoryData(history);


		all.setFromVal($('#from'),data);

		this.setInput(data.attachUrls);


		//根据状态控制是否可编辑 state =0 可编辑
		this.useState(this.state);

		let _this = this;
		$('#submit').click(function(){
			all.showLoadingRun(_this,'submit');
		});
		$('#close').click(function(){
			qt.closeWin();
		});
	},
	useState(state){
		//未出库
		if(state == 0){
			$('#close').remove();
		}else{
			$('#submit').remove();
			$('#archiveRoom').get(0).disabled = true;
			$('#addressTag').get(0).disabled = true;
			$('#attachUrls').get(0).disabled = true;
		}
	},
	setInput(data){
		inputStyle.set(true,true);

		let file = $('#attachUrls').get(0),
			srcs = all.getRealImageSrc(data);

		file.showFiles = srcs;
	},
	async submit(){
		let form = await all.getFromVal($('#from'));
		let files = form.attachUrls;
		let filesServerUrl = await all.uploadFile(files);
		filesServerUrl = filesServerUrl.join(',');

		form.id = this.id;

		form.attachUrls = filesServerUrl;

		await ajax.send([
			api.file_add(form)
		]);

		await qt.alert('修改成功!');
		qt.closeWin();
	},
	//历史记录绑定
	bindHistoryData(data){
		let body = $('#body'),
			item = $('#item');

		data.map(rs=>{
			// rs.auditOpinion = '不晓得';
			// rs.auditUserName ='测试测试'

			let _item = item.clone().removeClass('hidden').attr({id:''});
			//人 auditUserName
			_item.find('p').text(rs.auditUserName);
			//时间  createTime
			_item.find('span').text(stamp2Date.getDate1(rs.createTime));
			//事  nodeName
			//状态 auditStatus
			//备注 auditOpinion
			let text = `${rs.nodeName} (${(rs.auditStatus==1)? '通过' : '驳回'})`;
			if(rs.auditOpinion){
				text += `<br/>理由:${rs.auditOpinion}`;
			}
			_item.find('div').html(text);

			body.append(_item);
		})
	}


};


app.run(Page);