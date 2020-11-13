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


require('./../../es6/customElement/phone/b_push_load');



let Page = {
	isWarran:false,
	pageSize:20,
	getListApi(){
		let apiName =  'mobile_list';
		let param = {
			pageNum:1,
			pageSize:this.pageSize
		}
		if(this.isWarran){
			// 0-否 1-是 默认0
			param.isWarrant = 1;
		}else{
			param.isWarrant = 0;
		}

		return {apiName,param}
	},
	init(){
		all.showLoadingRun(this,'run');
	},
	async run(){
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

		this.bussinessDist = await selectData('businessType');
		this.orderStateDist = await selectData('orderState');


		//获取菜单权限
		let [data] = await ajax.send([
			api.get_menu_list()
		]);

		// data = [];

		//判断是否有权证权限
		if(data.includes('QUANZHENG_MENU')){
			console.log('权证列表')
			//权证列表
			$('title').text('权证列表');
			this.isWarran = true;
		}else{
			console.log('我的业务')
			//我的业务
			$('title').text('我的业务');
			this.isWarran = false;
		}


		let bPushLoad = $('b-push-load').get(0),
			_this = this;

		bPushLoad.pageSizes = this.pageSize;
		bPushLoad.getData = async function(pageIndex,pageSize){
			if(pageIndex == 1){
				qt.loading.show();
			}

			let {apiName,param} = _this.getListApi();
			param.pageNum = pageIndex;

			await ajax.send([
				api[apiName](param)
			]).then(rs=>{
				if(pageIndex == 1){
					qt.loading.hide();
				}
				rs = rs[0] || {};
				rs = rs.list || [];
				_this.createList(rs);

				if(rs.length == 0){
					console.log('没有更多')
					this.loadEnd();
				}else{
					console.log('加载成功')
					this.loadOk();
				}
			}).catch(e=>{
				if(pageIndex == 1){
					qt.loading.hide();
				}
				console.log('加载失败')
				this.loadError();
			});
			// let listNumber = listData.total;


			//设置组件的状态 需要放到逻辑的最后面
			//根据pageSize和返回的数据长度 ，分情况调用下面的一个方法
			// this.loadOk();      //加载完成还有后面的页 调用该方法
			// this.loadError();   //加载错误 调用
			// this.loadEnd();     //没有更多数据  调用
		};

	},

	createList(data){
		console.log(data)
		let body = $('#body'),
			item = $('#item');

		//权证和我的业务需要的字段一样
		data.map(rs=>{
			let _item = item.clone().removeClass('hidden').attr({id:''}),
				a = _item.find('a');

			_item.data({data:rs});
			//姓名
			a.eq(0).text(rs.clientName);
			//电话
			a.eq(1).text(rs.mainApplyPersonMobile);
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

			//1:权证  2：订单  3：草稿
			let type,text,color;
			if(rs.orderStatus == 0 || rs.orderStatus == 3){
				//orderStatus=0 是 草稿，非0 是 订单
				type = 3;
				text ='草稿';
				color = 'red';
			}else{
				if(rs.isWarrant == 1){
					type = 1;
					text = '权证';
					color = 'blue'
				}else{
					type = 2;
					text = '';
					color = '';
				}
			}



			_item.attr({type:type});
			this.addEvent(_item);



			this.appendTypeDom(_item,text,color);

			body.append(_item);
		});


	},
	appendTypeDom(body,text,color){
		if(!text){return;}
		let dom = $('<div class="box_hcc">'+text+'</div>');
		body.css({position:'relative'});
		dom.css({
			position:'absolute',
			right:'10px',
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
	addEvent(dom){
		let _this = this;
		$$(dom).myclickok(function(){
			let data = $(this).data('data'),
				//1:权证  2：订单  3：草稿
				type = $(this).attr('type'),
				id = data.id,
				orderNo = data.orderNo,
				currentNodeKey = data.currentNodeKey;

			console.log(data);
			window.location.href = `./info.html?id=${id}&type=${type}&orderNo=${orderNo}&currentNodeKey=${currentNodeKey}`;
		});
	}
};


app.run(Page);