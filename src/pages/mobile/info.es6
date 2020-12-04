let app = require('./../../es6/lib/page'),
	$$ = require('./../../es6/lib/event/$$'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	qt1 = require('./../../es6/qt_phone'),
	pageSizeSetting = require('./../../es6/pageSize'),
	getParamFromUrl = require('./../../es6/lib/fn/getParamFromUrl'),
	selectData = require('./../../es6/selectData'),
	moneyFormat = require('./../../es6/lib/fn/number'),
	winSetting = require('./../../es6/winSetting'),
	tableSet = require('./../../es6/tableSetting'),
	stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
	inputStyle = require('./../../es6/inputStyle');
qt.loading = qt1.loading;


require('./../../es6/customElement/pc/input');
require('./../../es6/yjl/b_title1');
require('./../../es6/customElement/pc/input_file');
require('./../../es6/customElement/pc/input_money');

let Page = {
	init(){
		all.showLoadingRun(this,'run');
	},
	getParam(){
		let param = getParamFromUrl();
		this.id = param.id;
		this.orderNo = param.orderNo;
		this.type = param.type;
		this.currentNodeKey = param.currentNodeKey;



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
	async run() {
		this.getParam();


		let [data] = await ajax.send([
			api.order_get_byId({id:this.id})
		]);

		this.bussinessDist = await selectData('businessType');
		this.orderStateDist = await selectData('orderState');

		console.log(data)


		let warran = $('#warran'),
			order = $('#myorder'),
			draft = $('#draft');
		if(this.type == 1){
			inputStyle.phoneSet1(60);
			//权证
			warran.removeClass('hidden');
			order.remove();
			draft.remove();
			this.appendTypeDom('权证','blue');
			this.bindData(data);
			await this.addFFXZ(data);
		}else if(this.type == 2){
			inputStyle.phoneSet1(60);
			//订单
			warran.remove();
			order.removeClass('hidden');
			draft.remove();
			this.bindData(data);
		}else{
			inputStyle.phoneSet1(90);
			//草稿
			warran.remove();
			order.remove();
			draft.removeClass('hidden');
			this.appendTypeDom('草稿','red');
			this.bindData1(data);
		}


		this.bindBtnEvent();


		// if(!this.isWarran){
		// 	$('#warran').remove();
		// 	return;
		// }else{
		// 	$('#warran').removeClass('hidden');
		// }



		// 核行下户     通用过单
		// 还款资料确认  通用过单
		// 还款确认  /warrant/o_warrant_pay_back.html
		// 取证、解押  通用过单
		// 过户       通用过单
		// 取证       通用过单
		// 抵押       通用过单
	},
	async addFFXZ(data){
		//房屋现状 匹配订单中不动产抵押物数量
		let mainDy  =data.mainMortgagePropertyRight||null,
			fuDy = data.additionalMortgagePropertyRightList||[],  //category=1
			newData = [];
		if(mainDy){
			newData.push(mainDy);
		}
		fuDy.map(rs=>{
			if(rs.category == 1){
				newData.push(rs);
			}
		});


		let body = $('#fwxz'),
			item = $('#room_info_item');

		if(newData.length == 0){
			body.append('<br/><div style="font-size:14px;" class="noDate box_hcc">无抵押物</div><br/>');
		}

		newData.map(rs=>{
			let _item = item.clone().attr({id:''});
			_item.find('b-title1').get(0).body.css({margin:0});
			_item.find('b-title1').get(0).body.find('.titleName').css({width:'100%'});
			$('b-title1').get(0).body.find('.titleName').css({width:'100%'});
			$('b-title1').get(0).body.css({margin:0});
			_item.find('b-title1').get(0).body.find('.titleName').text('房屋：'+rs.name);

			// 1:房抵
			if(this.orderType != 1){
				//非房抵 输入框为非必填
				_item.find('b-input').each(function(){
					this.body.find('input').data({rule:''});
					this.body.find('select').data({rule:''});
				});
				_item.find('b-input-money').each(function(){
					this.body.find('input').data({rule:''});
				});
			}

			body.append(_item);
		});

		inputStyle.set();
		$('b-input[type="textarea"]').get(0).nameDom.css({width:'110px'});
		$('b-input-file').get(0).nameDom.css({width:'90px'});
		await selectData($('#form'));
	},
	appendTypeDom(text,color){
		let dom = $('<div class="box_hcc">'+text+'</div>'),
			body = $('#item');
		body.css({position:'relative'});
		dom.css({
			position:'absolute',
			right:'3px',
			top:'50%',
			width:'24px',
			height:'40px',
			marginTop:'-20px',
			border:'1px solid '+color,
			color:color,
			textAlign:'center'
		});

		body.append(dom);

	},
	bindData(rs){
		let _item = $('#item'),
			a = _item.find('a');

		//姓名
		a.eq(0).text(rs.mainOrderApplyInfo?.name);
		//电话
		a.eq(1).text(rs.mainOrderApplyInfo?.mobile);
		//业务
		a.eq(2).text(this.bussinessDist[rs.businessKey]);
		//金额 元---转万元
		let money = rs.applyMoney;
		money = money/10000;
		money = moneyFormat(money,2)+'万元';
		a.eq(3).text(money);
		//状态
		a.eq(4).text(this.orderStateDist[rs.orderStatus]);
		//时间
		a.eq(5).text(stamp2Date.getDate1(rs.flowNodeUpdateTime||''));

		$('#info').data({data:rs});
		$('#history').data({data:rs});
		$('#tel').attr({href:'tel:'+rs.mainOrderApplyInfo?.mobile});
	},
	bindData1(rs){
		let _item = $('#item'),
			a = _item.find('a');

		//姓名
		a.eq(0).text(rs.mainOrderApplyInfo?.name);
		//业务
		a.eq(2).text(this.bussinessDist[rs.businessKey]);
		//金额 元---转万元
		let money = rs.applyMoney;
		money = money/10000;
		money = moneyFormat(money,2)+'万元';
		a.eq(1).text(money);
		//时间
		a.eq(3).text(stamp2Date.getDate1(rs.flowNodeUpdateTime||''));

		$('#info').data({data:rs});
		$('#history').data({data:rs});
		$('#tel').attr({href:'tel:'+rs.mainOrderApplyInfo?.mobile});


		//文件绑定
		let files = rs.orderClientMaterialList || [];
		files.map(file=>{
			if(file.attachType == 1){
				console.log(all.getRealImageSrc(file.attachUrls))
				// data.attachUrls1 = rs.attachUrls;
				$('#attachUrls1').get(0).showFiles = all.getRealImageSrc(file.attachUrls);
			}
			if(file.attachType == 2){
				console.log(all.getRealImageSrc(file.attachUrls))
				// data.attachUrls2 = rs.attachUrls;
				$('#attachUrls2').get(0).showFiles = all.getRealImageSrc(file.attachUrls);
			}
			if(file.attachType == 3){
				console.log(all.getRealImageSrc(file.attachUrls))
				// data.attachUrls3 = rs.attachUrls;
				$('#attachUrls3').get(0).showFiles = all.getRealImageSrc(file.attachUrls);
			}
		});
	},
	bindBtnEvent(){
		let info = $('#info'),
			history = $('#history'),
			close = $('#close'),
			submit = $('#submit'),
			submit1 = $('#submit1'),
			_this = this;

		$$(info).myclickok(function(){
			let data = $(this).data('data'),
				state = 0,
				id = data.id;
			//打开订单详情页面
			window.location.href = `./order_info.html?id=${id}&state=${state}`;
		});
		$$(history).myclickok(function(){
			let data = $(this).data('data'),
				orderNo = data.orderNo;
			//打开历史记录页面
			window.location.href = `./history_info.html?orderNo=${orderNo}`;
		});

		$$(close).myclickok(function(){
			window.history.go(-1);
		});
		$$(submit).myclickok(async function(){
			let param = await all.getFromGroupVal($('#form'));
			console.log(param)

			all.showLoadingRun(all,'reviewSubmit',{
				formDom:$('#form'),
				orderNo:_this.orderNo,
				state:1,
				addParam:param,
				currentNodeKey:_this.currentNodeKey
			});
		});

		$$(submit1).myclickok(function(){
			all.showLoadingRun(_this,'submitFile');
		});
	},
	async submitFile(){
		let form = await all.getFromVal($('#form')),
			uploaded1 = await all.uploadFile(form.attachUrls1),
			uploaded2 = await all.uploadFile(form.attachUrls2),
			uploaded3 = await all.uploadFile(form.attachUrls3);

		let data = [
			{
				attachUrl:uploaded1.join(','),
				orderNo:this.orderNo,
				type:1
			},
			{
				attachUrl:uploaded2.join(','),
				orderNo:this.orderNo,
				type:2
			},
			{
				attachUrl:uploaded3.join(','),
				orderNo:this.orderNo,
				type:3
			}
		];

		console.log(data);
		await ajax.send([
			api.mobile_file_submit(data)
		]);

		await qt.alert('操作成功!');
		qt.closeWin();
	}
};


app.run(Page);