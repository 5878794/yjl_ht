let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	pageSizeSetting = require('./../../es6/pageSize'),
	getParamFromUrl = require('./../../es6/lib/fn/getParamFromUrl'),
	selectData = require('./../../es6/selectData'),
	winSetting = require('./../../es6/winSetting'),
	tableSet = require('./../../es6/tableSetting'),
	getNewImageSize = require('./../../es6/lib/fn/getImageFitSize'),
	showBigPic = require('./../../es6/lib/ui/showBigPicture'),
	stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
	inputStyle = require('./../../es6/inputStyle');




let Page = {
	init(){
		all.showLoadingRun(this,'run');
	},
	getParam(){
		let userInfo = window.sessionStorage.getItem('userInfo')||'{}';
		let rs = JSON.parse(userInfo);

		if(!rs.token){
			window.location.replace('./index.html');
			return;
		}

		window.token = rs.token;
		window.companyId = rs.companyId;
		window.userName = rs.userName;
		//0:无 1:个人权限 2:部门权限 3:公司权限 4:集团权限"
		window.orderSearchPrivilegeType = rs.orderSearchPrivilegeType;
		//0:无 1:房抵 2:垫资 3:房抵+垫资"
		window.orderCreatePrivilegeType = rs.orderCreatePrivilegeType;
		window.userInfo = rs;
	},
	async run(){
		let param = getParamFromUrl();
		this.id = param.id;
		this.state = param.state || 0;
		this.btnEventBind();
		this.getParam();

		let [data] = await ajax.send([
			api.order_get_byId({id:this.id})
		]);
		this.type = data.businessKey;
		this.orderNo = data.orderNo;

		this.showHideDom();




		await this.bindData1(data);
		await this.bindData2(data);
		if(this.type == 1) {
			await this.bindData3(data);
		}else{
			await this.bindData4(data);
		}
	},
	showHideDom(){
		let type = this.type;
		//房抵
		if(type == 1){
			$('.__dz_fdz__').remove();
		}
		//垫资
		else if(type == 2){
			$('.__fd__').remove();
		}
		//非垫资
		else if(type == 3){
			$('.__fd__').remove();
			$('.__fdz_no__').remove();
		}
	},
	btnEventBind(){
		if(this.state == 1){
			//需要提交
			$('#info_btn').remove();
		}else{
			//预览订单详情
			$('#index_btn').remove();
		}

		let _this = this;
		$('#pre').click(function(){
			qt.openPage(
				'../index/o_add_order.html?id='+_this.id,
				winSetting.index_add_step1.width,
				winSetting.index_add_step1.height);
			qt.closeWin();
		});
		$('#next').click(function(){
			all.showLoadingRun(_this,'submit')
		});
		$('#close').click(function(){
			// qt.closeWin();
			window.history.go(-1);
		});

	},
	bindDataFn(dom,data){
		let addFile = function(files,data){
			files.each(function(){
				let key = $(this).attr('key'),
					nowData,
					item = $('<a class="box_hcc"></a>');
				if(key.indexOf('_')>-1){
					let keys = key.split('_'),
						key1 = keys[0],
						key2 = keys[1];
					nowData = data[key1]??{};
					nowData = nowData[key2]??[];
				}else{
					nowData = data[key];
				}

				nowData.map(rs=>{
					let _item = item.clone(),
						img = new Image();
					_item.append(img);
					img.onload = function(){
						let {width,height} = getNewImageSize(this.width,this.height,100,100);
						this.width = width-2;
						this.height = height-2;
					};
					img.src = rs;

					$(this).append(_item);
				});
			});

			files.find('a').click(function(){
				let imgSrc = $(this).find('img').attr('src');
				let a = new showBigPic({imgs:[imgSrc]});
				a.showImg(0);   //0为初始显示第几张，需要自己算是点的第几张图片
			});
		};



		//单个的数据
		dom.find('span').each(function(){
			let key = $(this).attr('id'),
				unit = $(this).attr('unit')??'';

			if(key){
				//判断key 是否含有'-'
				if(key.indexOf('_')>-1){
					let keys = key.split('_'),
						key1 = keys[0],
						key2 = keys[1],
						nowData = data[key1]??{},
						val = nowData[key2]??'';
					$(this).text(val+' '+unit);
				}else{
					let val = data[key]??'';
					$(this).text(val+' '+unit);
				}
			}
		});

		//多个的数据
		let doms = dom.find('div[bind-group]');
		doms.each(function(){
			let key = $(this).attr('bind-group'),
				bodyId = $(this).attr('id'),
				body = $('#'+bodyId),
				itemId = bodyId+'_item',
				item = $('#'+itemId),
				nowData = data[key] || [];

			if(nowData.length == 0){
				if(item.find('b-title1').length>0){
					let bTitle = item.find('b-title1').clone();
					body.append(bTitle);
				}
				body.append('<div class="noData">无数据</div>');
			}
			nowData.map(rs=>{
				let _item = item.clone().attr({id:''}).removeClass('hidden');
				_item.find('span').each(function(){
					let key = $(this).attr('key'),
						unit = $(this).attr('unit') || '';
					if($(this).hasClass('_files_')){
						addFile($(this),rs);
					}else{
						let val = rs[key] || '';
						$(this).text(val+' '+unit);
					}
				});
				body.append(_item);
			})
		});

		//文件
		let files = dom.find('.__files__');
		addFile(files,data);


	},
	async bindData1(data){
		let dist = await selectData('businessType') || {};
		data.businessKey = dist[data.businessKey];
		this.bindDataFn($('#part1'),data);
	},
	async bindData2(data){
		let dist = await selectData('businessFrom')??{};
		if(data.businessSourceKey != -1){
			$('#part2_qt').remove();
		}
		data.businessSourceKey = dist[data.businessSourceKey] || '';

		let files = data.orderClientMaterialList??[],
			file1 = [],
			file2 = [],
			file3 = [];
		files.map(rs=>{
			if(rs.attachType == 1){
				file1 = all.getRealImageSrc(rs.attachUrls);
			}else if(rs.attachType == 2){
				file2 = all.getRealImageSrc(rs.attachUrls);
			}else if(rs.attachType == 3){
				file3 = all.getRealImageSrc(rs.attachUrls);
			}
		});
		data.attachUrls1 = file1;
		data.attachUrls2 = file2;
		data.attachUrls3 = file3;


		this.bindDataFn($('#part2'),data);
	},
	//房抵
	async bindData3(data){
		//住宅性质
		let dist = await selectData('residentialNature') || {};
		//处理主要抵押物信息
		data.mainMortgagePropertyRight = data.mainMortgagePropertyRight??{};
		data.mainMortgagePropertyRight.type = dist[data.mainMortgagePropertyRight.type] || '';
		data.mainMortgagePropertyRight.getTime = stamp2Date.getDate1(data.mainMortgagePropertyRight.getTime || '');

		//处理附加抵押物信息
		let data_ = data.additionalMortgagePropertyRightList??[],
			data1 = [],
			data2 = [];
		data_.map(rs=>{
			rs.type = dist[rs.type]??'';
			rs.getTime = stamp2Date.getDate1(rs.getTime || '');
			if(rs.category == 1){
				data1.push(rs);
			}else if(rs.category == 2){
				data2.push(rs);
			}
		})
		//不动产
		data.additionalMortgagePropertyRightList1 = data1;
		//动产
		data.additionalMortgagePropertyRightList2 = data2;


		//用款时间  要除30
		data.orderRateInfo = data.orderRateInfo??{};
		data.orderRateInfo.period = parseInt(data.orderRateInfo.period/30);


		this.bindDataFn($('#part3'),data);
		this.bindDataFn($('#part4'),data);
	},
	//垫资、非垫资
	async bindData4(data){
		//住宅性质
		let dist = await selectData('residentialNature') || {};
		//回款方式
		let dist1 = await selectData('payBackMethod')??{};
		//付款方式
		let dist2 = await selectData('payMethod')??{};

		//处理主要抵押物信息
		data.mainMortgagePropertyRight = data.mainMortgagePropertyRight??{};
		data.mainMortgagePropertyRight.type = dist[data.mainMortgagePropertyRight.type] || '';
		data.mainMortgagePropertyRight.getTime = stamp2Date.getDate1(data.mainMortgagePropertyRight.getTime || '');

		//垫资
		//评估信息 快消总价 orderMortgageExtendAssessment_attachUrls
		data.orderMortgageExtendAssessment = data.orderMortgageExtendAssessment??{};
		data.orderMortgageExtendAssessment.attachUrls = all.getRealImageSrc(data.orderMortgageExtendAssessment.attachUrls??'')??[];
		//垫资-抵押
		let dy = data.orderMortgageExtendMortgageList??[];
		dy.map(rs=>{
			rs.mortgageTime = stamp2Date.getDate1(rs.mortgageTime || '');
			rs.attachUrls = all.getRealImageSrc(rs.attachUrls);
		});

		//处理附加抵押物信息
		let data_ = data.additionalMortgagePropertyRightList??[],
			data1 = [],
			data2 = [];
		data_.map(rs=>{
			rs.type = dist[rs.type]??'';
			rs.getTime = stamp2Date.getDate1(rs.getTime || '');
			if(rs.category == 1){
				data1.push(rs);
			}else if(rs.category == 2){
				data2.push(rs);
			}
		})
		//不动产
		data.additionalMortgagePropertyRightList1 = data1;
		//动产
		data.additionalMortgagePropertyRightList2 = data2;


		//回款方式 orderReturnRepayment_returnModeType
		data.orderReturnRepayment = data.orderReturnRepayment??{};
		data.orderReturnRepayment.returnModeType = dist1[data.orderReturnRepayment.returnModeType];
		//付款方式 orderTrade_paymentMethodType
		data.orderTrade = data.orderTrade??{};
		data.orderTrade.paymentMethodType = dist2[data.orderTrade.paymentMethodType];



		this.bindDataFn($('#part3'),data);
		this.bindDataFn($('#part4'),data);
	},
	//生成订单
	async submit(){
		if(this.type == 1) {
			//房抵
			await ajax.send([
				api.order_submit({
					fdZhiXingSubmitOrderRo:{
						orderNo:this.orderNo
					}
				})
			]);
		}else{
			//垫资
			await ajax.send([
				api.order_submit1({
					auditOrderRo:{
						orderNo:this.orderNo
					}
				})
			]);
		}

		await qt.alert('订单创建成功!');
		qt.closeWin();
	}


};


app.run(Page);