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
		this.orderNo = data.orderNo;
		this.type = data.businessKey;

		await this.backDataToForm(data);
		await all.setOrderTopData(1,data);


	},
	async backDataToForm(data){

		//处理主申请人信息
		let mainOrderApplyInfo = data.mainOrderApplyInfo || {};
		data.name = mainOrderApplyInfo.name;
		data.mobile = mainOrderApplyInfo.mobile;
		data.address = mainOrderApplyInfo.address;
		data.cardNo = mainOrderApplyInfo.cardNo;

		//处理附件信息
		let files = data.orderClientMaterialList || [];
		files.map(rs=>{
			if(rs.attachType == 1){
				// data.attachUrls1 = rs.attachUrls;
				$('#attachUrls1').get(0).showFiles = all.getRealImageSrc(rs.attachUrls);
			}
			if(rs.attachType == 2){
				// data.attachUrls2 = rs.attachUrls;
				$('#attachUrls2').get(0).showFiles = all.getRealImageSrc(rs.attachUrls);
			}
			if(rs.attachType == 3){
				// data.attachUrls3 = rs.attachUrls;
				$('#attachUrls3').get(0).showFiles = all.getRealImageSrc(rs.attachUrls);
			}
		});

		//赋值
		await all.setFromGroupVal($('#form'),data);
	},
	btnBindEvent(){
		let preBtn = $('#pre'),
			nextBtn = $('#next'),
			// select = $('#businessType').find('b-input'),
			// other = $('#other'),
			_this = this;

		preBtn.click(function(){
			qt.openPage(
				'../index/o_add_order.html?id='+_this.id,
				winSetting.index_add_step1.width,
				winSetting.index_add_step1.height);
			qt.closeWin();
		});
		nextBtn.click(function(){
			all.showLoadingRun(_this,'submitFn');
		});

		// select.get(0).change = function(val){
		// 	if(val=='-1'){
		// 		other.removeClass('hidden');
		// 	}else{
		// 		other.addClass('hidden');
		// 		other.find('b-input').get(0).value = '';
		// 	}
		// }
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
		console.log(form)

		form.id = this.id;
		form.orderNo = this.orderNo;
		//处理主申请人信息
		form.mainOrderApplyInfo = {
			name: form.name,
			mobile: form.mobile,
			address: form.address,
			cardNo: form.cardNo,
			applyType:1
		};

		delete form.name;
		delete form.mobile;
		delete form.address;
		delete form.cardNo;

		//上传图片
		//待上传的
		let files1 = form.attachUrls1,
			files2 = form.attachUrls2,
			files3 = form.attachUrls3;
		//上传
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

		await qt.alert('基础信息提交成功！');
		//判断打开哪个业务的

		if(this.type == 1){
			//房抵
			qt.openPage(
				'../index/o_add_order_room.html?id='+this.id,
				winSetting.o_add_order_room.width,
				winSetting.o_add_order_room.height);
		}else if(this.type==2){
			//交易垫资
			qt.openPage(
				'../index/o_add_order_advance.html?id='+this.id+'&type=2',
				winSetting.o_add_order_advance.width,
				winSetting.o_add_order_advance.height);
		}else{
			//非交易垫资
			qt.openPage(
				'../index/o_add_order_advance.html?id='+this.id+'&type=3',
				winSetting.o_add_order_advance.width,
				winSetting.o_add_order_advance.height);
		}
		qt.closeWin();
	}


};


app.run(Page);