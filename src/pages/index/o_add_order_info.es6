let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	bTitleBtn = require('./../../es6/b_title_btn'),
	getParamFromUrl = require('./../../es6/lib/fn/getParamFromUrl'),
	pageSizeSetting = require('./../../es6/pageSize'),
	selectData = require('./../../es6/selectData'),
	winSetting = require('./../../es6/winSetting'),
	tableSet = require('./../../es6/tableSetting'),
	stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
	inputStyle = require('./../../es6/inputStyle');

window.all = all;

require('./../../es6/yjl/b_order_info');
require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b_title1');
require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_file');



let Page = {
	init(){
		all.showLoadingRun(this,'run');
	},
	async run(){
		this.id = getParamFromUrl().id;
		inputStyle.set(true,true);
		await all.getUserInfo();

		this.createBTitlesBtn();

		await selectData($('#form'));
		this.btnBindEvent();


		let [data] = await ajax.send([
			api.order_get_byId({id:this.id})
		]);
		await all.setFromGroupVal($('#form'),data);
		await all.setOrderTopData(1,data);


	},
	btnBindEvent(){
		let preBtn = $('#pre'),
			nextBtn = $('#next'),
			select = $('#businessType').find('b-input'),
			other = $('#other'),
			_this = this;

		preBtn.click(function(){
			qt.openPage(
				'./o_add_order.html?id='+_this.id,
				winSetting.index_add_step1.width,
				winSetting.index_add_step1.height)
		});
		nextBtn.click(function(){
			all.showLoadingRun(_this,'submitFn');
		});

		select.get(0).change = function(val){
			if(val=='-1'){
				other.removeClass('hidden');
			}else{
				other.addClass('hidden');
				other.find('b-input').get(0).value = '';
			}
		}
	},

	//设置标题上的按钮
	createBTitlesBtn(){
		//紧急联系人添加、删除
		bTitleBtn.addDelFn(
			$('#emergency_contact').get(0),
			$('#emergency_contact_body'),
			$('#emergency_contact_item')
		);

		//共同申请人信息添加
		bTitleBtn.addChildDelFn(
			$('#joint_application').get(0),
			$('#joint_application_body'),
			$('#joint_application_item')
		);

		//担保人信息添加
		bTitleBtn.addChildDelFn(
			$('#guarantor').get(0),
			$('#guarantor_body'),
			$('#guarantor_item')
		)

	},


	async submitFn() {
		let form = await all.getFromGroupVal($('#form'));

		form.id = this.id;
		//处理主申请人信息
		form.mainOrderApplyInfo = {
			name: form.name,
			mobile: form.mobile,
			address: form.address,
			cardNo: form.cardNo
		};

		delete form.name;
		delete form.mobile;
		delete form.address;
		delete form.cardNo;

		//上传图片
		let files1 = form.attachUrls1,
			files2 = form.attachUrls2,
			files3 = form.attachUrls3;
		let filesServerUrl1 = await all.uploadFile(files1),
			filesServerUrl2 = await all.uploadFile(files2),
			filesServerUrl3 = await all.uploadFile(files3);
		filesServerUrl1 = filesServerUrl1.join(',');
		filesServerUrl2 = filesServerUrl2.join(',');
		filesServerUrl3 = filesServerUrl3.join(',');

		delete form.attachUrls1;
		delete form.attachUrls2;
		delete form.attachUrls3;

		form.orderClientMaterialList = [
			{
				attachType: '1',
				attachUrls: filesServerUrl1
			},
			{
				attachType: '2',
				attachUrls: filesServerUrl2
			},
			{
				attachType: '3',
				attachUrls: filesServerUrl3
			}
		];

		let [data] = await ajax.send([
			api.order_add_step2(form)
		]);

		console.log(data);

	}


};


app.run(Page);