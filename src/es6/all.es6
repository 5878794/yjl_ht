

let {ajax,api,nodeKeySubmit} = require('./_ajax'),
	qt = require('./../es6/qt'),
	winSetting = require('./../es6/winSetting'),
	stamp2Date = require('./../es6/lib/fn/timeAndStamp'),
	showBigImg = require('./../es6/lib/ui/showBigPicture'),
	processToPageDist = require('./../es6/processToPage'),
	selectData = require('./../es6/selectData');

window.bridge = window.bridge ?? top.bridge;

//获取用户信息
let all = {
	getUserInfo(){
		window.bridge = window.bridge ?? top.bridge;
		if(window.bridge){
			return new Promise(success=>{
				qt.getUserInfo().then(rs=>{
					rs = rs??'{}';
					rs = JSON.parse(rs);
					window.token = rs.token;
					window.companyId = rs.companyId;
					window.userName = rs.userName;
					//0:无 1:个人权限 2:部门权限 3:公司权限 4:集团权限"
					window.orderSearchPrivilegeType = rs.orderSearchPrivilegeType;
					//0:无 1:房抵 2:垫资 3:房抵+垫资"
					window.orderCreatePrivilegeType = rs.orderCreatePrivilegeType;
					window.userInfo = rs;
					success();
				});
			})
		}else{
			return new Promise((success,error)=>{
				//TODO 用户名 密码
				ajax.send([
					api.login({
						userName:'test',
						password:'123456'
					})
				]).then(rs=>{
					rs = rs[0];
					window.token = rs.token;
					window.companyId = rs.companyId;
					window.userName = rs.userName;
					//0:无 1:个人权限 2:部门权限 3:公司权限 4:集团权限"
					window.orderSearchPrivilegeType = rs.orderSearchPrivilegeType;
					//0:无 1:房抵 2:垫资 3:房抵+垫资"
					window.orderCreatePrivilegeType = rs.orderCreatePrivilegeType;
					window.userInfo = rs;

					success();
				}).catch(e=>{
					error('获取用户信息失败');
				})
			});
		}
	},
	//获取通知信息
	getNews(){
		window.bridge = window.bridge ?? top.bridge;
		if(window.bridge){
			return new Promise(success=>{
				qt.getNews().then(rs=>{
					success(rs);
				})
			})
		}else{
			return new Promise((success,error)=>{
				ajax.send([
					api.news_list({
						pageNum:1,
						pageSize:5
					})
				]).then(rs=>{
					rs = rs[0];
					success(rs);
				}).catch(e=>{
					console.log('获取通知信息失败！');
					qt.alert('获取通知信息失败!');
					success({});
				})
			});
		}
	},


	//获取dom下的所有b-input类
	getInputDom(dom){
		return 	dom.find('b-input,b-input-money,b-input-date,b-input-file,b-input-search');
	},
	//获取dom下的所有input的val并表单验证
	getFromVal(dom,key='id'){
		return new Promise(async (success,error)=>{
			let backData = {};
			let inputs = this.getInputDom(dom);

			for(let i=0,l=inputs.length;i<l;i++){
				let id = inputs.eq(i).attr(key),
					val = await inputs.eq(i).get(0).checkPass().catch(e=>{error(e)});
				if(id){
					backData[id] = val;
				}
			}

			success(backData);
		});
	},
	// 获取dom下的所有input的val并表单验证(含动态添加的)
	getFromGroupVal(dom){
		return new Promise(async (success,error)=>{
			//获取非组下面的数据
			let backData = await this.getFromVal(dom).catch(e=>{error(e)}) || {};

			let groupDom = dom.find('div[group]');
			for(let i=0,l=groupDom.length;i<l;i++){
				let thisBody = groupDom.eq(i),
					groupName = thisBody.attr('group');
				if(!backData[groupName]){
					backData[groupName] = [];
				}
				let thisData = await this.getFromVal(thisBody,'key').catch(e=>{error(e)});;
				backData[groupName].push(thisData);
			}

			success(backData);
		});
	},
	async setFromGroupVal(dom,data){
		//写入非数组内的数据
		this.setFromVal(dom,data);

		//触发bTitle的点击事件
		let bTitle = dom.find('b-title[bind-group],b-title1[bind-group],b-title[bind-group1],b-title[bind-group2]');
		bTitle.each(function(){
			if($(this).attr('bind-group')){
				let btn = this.body.find('.btn'),
					type= $(this).attr('bind-group'),
					l = data[type]?.length || 0;
				for(let i=0;i<l;i++){
					btn.trigger('click');
				}
			}
			if($(this).attr('bind-group1')){
				let btn = this.body.find('div[type="btn1"]'),
					type= $(this).attr('bind-group1'),
					l = data[type]?.length || 0;
				for(let i=0;i<l;i++){
					btn.trigger('click');
				}
			}
			if($(this).attr('bind-group2')){
				let btn = this.body.find('div[type="btn2"]'),
					type= $(this).attr('bind-group2'),
					l = data[type]?.length || 0;
				for(let i=0;i<l;i++){
					btn.trigger('click');
				}
			}
		});


		//获取生成的dom
		let doms = dom.find('div[group]'),
			obj = {};

		//分组
		doms.each(function(){
			let type = $(this).attr('group');
			if(!obj[type]){obj[type] = []}
			obj[type].push(this);
		});

		//写入数据
		for(let [key,val] of Object.entries(obj)){
			let nowData = data[key];
			val.map((rs,i)=>{
				this.setFromVal($(rs),nowData[i],'key');
			});
		}

	},
	//dom下的b-input类数据绑定
	setFromVal(dom,data,key='id'){
		let inputs = this.getInputDom(dom);
		inputs.each(function(){
			let id = $(this).attr(key);
			if(id){
				this.value = data[id];
			}
		})
	},
	//dom下的b-input类数据绑定 带级联select
	setFromValAndChildSelect(dom,data,key='id'){
		let inputs = this.getInputDom(dom),
			childSelectIds = [];
		inputs.each(function(){
			let id = $(this).attr(key),
				childSelectId = $(this).data('child');
			if(id){
				this.value = data[id];
			}
			if(childSelectId){
				childSelectIds.push(childSelectId);
			}
		});

		//级联子select事件
		childSelectIds.map(rs=>{
			let dom = $('#'+rs).get(0);
			dom.childSelectSetValue(function(){
				dom.value = data[rs];
			},3);
		});
	},
	//上传文件
	uploadFile(files){
		let serverUrl = SETTING.serverUrl + '/api/file/upload';
		return new Promise((success,error)=>{
			if(!files || files.length == 0){
				success([]);
				return;
			}

			let form = new FormData(),
				xhr = new XMLHttpRequest();

			let uploaded = [];
			files.map(file=>{
				if(typeof file == 'string'){
					uploaded.push(file);
				}else{
					form.append('files',file);
				}
			});
			uploaded = this.getServerFilename(uploaded);

			xhr.onload =  function(e){
				let body = e.target.responseText;
				body = JSON.parse(body);
				let code = body.code;
				// {"code":200,"msg":null,"data":[{"fileName":"files","fileSize":39359,"fileUrl":"328618dd-e368-4e7a-9b86-f5a6c63d6345"}]}

				if(code == 200){
					let data = body.data,
						back = [];
					data.map(rs=>{
						back.push(rs.fileUrl)
					});

					success(back.concat(uploaded));
				}else{
					error(body.data);
				}
			};
			xhr.onerror = function(e){
				error(e);
			};

			// xhr.upload.onprogress =  uploadProgress; //上传进度调用方法实现

			xhr.open("post", serverUrl, true);
			xhr.setRequestHeader('Authorization',window.token); //post方式提交，url为服务器请求地址，true该参数规定请求是否异步处理
			xhr.send(form); //开始上传，发送form数据
		});
	},
	//创建分页
	createFY(opt){
		let id = opt.domId,
			nowPage = opt.nowPage,
			listLength = opt.listLength,
			pageSize = opt.pageSize || 20,
			searchData = opt.searchData || {},
			getDataFn = opt.getDataFn;

		let fy = $('#'+id).get(0),
			_this = this;


		fy.show({
			nowPage: nowPage,             //当前页码       默认：1
			listLength: listLength,         //总记录数
			pageSize: pageSize             //分页数         默认：10
		});
		fy.clickFn = function(page){
			searchData.pageNum = page;
			getDataFn(searchData);
		};
		fy.selectBg = 'rgb(86,123,249)';        //设置当前页码显示的背景色  默认：#cc9800
	},
	//显示loading并调用指定对象下的函数
	showLoadingRun(obj,fn,param){
		qt.loading.show();
		obj[fn].call(obj,param).then(()=>{
			$('#iframe_body').css({display:'block'});
			$('.openWin_main').css({display:'block'});
			qt.loading.hide();
		}).catch(e=>{
			qt.loading.hide();
			qt.alert(e);
		})
	},
	//获取真实的图片地址
	getRealImageSrc(data){
		data = data.split(',');
		let serverUrl = SETTING.downloadFileUrl,
			newData = [];
		data.map(rs=>{
			if(rs){
				newData.push(serverUrl+rs);
			}
		});
		return newData;
	},
	//获取服务器文件名
	getServerFilename(files){
		let backData = [];
		files.map(rs=>{
			let fileName = rs.substr(rs.lastIndexOf('/')+1);
			backData.push(fileName);
		});
		return backData;
	},
	//设置订单顶部数据
	async setOrderTopData(level,data){
		let part1 = $('b-order-info').get(0),
			dist = await selectData('businessType') || {},
			distForm = await selectData('businessFrom') || {},
			orderState = await selectData('orderState') || {};

		part1.showLevel = level;

		let backData = {};
		if(level >= 1){
			backData.money = data.applyMoney;
			backData.type = dist[data.businessKey];
			backData.no = data.orderNo;
		}
		if(level >= 2){
			backData.from = '来自'+distForm[data.businessSourceKey];

			let //主申请人
				mainMan = data.mainOrderApplyInfo??{},
				//共同申请人
				commonMan = data.commonOrderApplyInfoList??[],
				//担保人
				guaranteeMan = data.guaranteeInfoList??[],
				allMan = [];

			allMan.push(mainMan);

			commonMan.map(rs=>{
				allMan.push(rs);
			});
			guaranteeMan.map(rs=>{
				allMan.push(rs);
			});

			//数据处理
			allMan.map(rs=>{
				if(rs.applyType == 2){
					rs.name = rs.name+'(共同)'
				}
				if(rs.applyType == 3){
					rs.name = rs.name+'(担保)'
				}
				rs.phone = rs.mobile;
				rs.idcard = rs.cardNo;
			});

			backData.mans = allMan;
		}
		if(level >= 3){
			backData.state = orderState[data.orderStatus];
			backData.id = data.id;

			part1.click = function(data){
				let id = data.id;
				qt.openPage(
					'../index/o_add_order_view.html?id='+id,
					winSetting.index_add_step4.width,
					winSetting.index_add_step4.height
				);
			}
		}

		if(level >= 4){
			if(data.productId){
				let productId = data.productId;
				let [productInfo] = await ajax.send([
					api.org_product_list({id:productId})
				]);
				productInfo = productInfo.list??[];
				productInfo = productInfo[0];

				if(productInfo){
					backData.product = productInfo.organizationName+'-'+productInfo.productName;
					backData.productInfo = `最小额度${productInfo.minMoney}元<br/>最大额度${productInfo.maxMoney}元<br/>成本费率${productInfo.castRate}%<br/>服务费${productInfo.castServiceRate}元<br/>可用时间${productInfo.applyTime}天`;
				}
			}
		}


		part1.data = backData;
	},

	//设置订单历史流程
	async setOrderHistoryData(data,autoHide){
		let history = $('#history').get(0);
		history.showOne = autoHide??false;
		let newData = [];
		data.map((rs,i)=>{
			newData.push({
				no:i+1,
				name:rs.nodeName,
				state:(rs.auditStatus==1),
				info:rs.auditOpinion,
				img:this.getRealImageSrc(rs.attachUrls),
				// img:['../res/image/icon1.png','../res/css/all.css'],
				date:stamp2Date.getDate1(rs.createTime),
				user:rs.auditUserName
			})
		});

		history.data = newData;
		history.imgClick = function(rs){
			// console.log(rs);        //图片点击返回当前图片路径
			rs = rs.toLowerCase();
			let fileType = rs.split('.');
			fileType = fileType[fileType.length-1];
			let imageType = ['png','jpeg','jpg'];

			if(imageType.indexOf(fileType)>-1){
				//图片
				let a = new showBigImg({imgs:[rs]});
				a.showImg(0);   //0为初始显示第几张，需要自己算是点的第几张图片
			}else{
				//不是图片
				qt.downloadFile(rs);
				console.log(rs)
			}
		}
	},
	//设置订单跟进记录
	async setRecordData(data){
		let part2 = $('#record').get(0);

		data.map((rs,i)=>{
			rs.no = i+1;
			rs.info = rs.content;
			rs.img = this.getRealImageSrc(rs.attachUrls);
			rs.date = stamp2Date.getDate1(rs.createTime);
			rs.user = rs.createName;
		});

		part2.data = data;
		part2.imgClick = function(rs){
			// console.log(rs);        //图片点击返回当前图片路径
			rs = rs.toLowerCase();
			let fileType = rs.split('.');
			fileType = fileType[fileType.length-1];
			let imageType = ['png','jpeg','jpg'];

			if(imageType.indexOf(fileType)>-1){
				//图片
				let a = new showBigImg({imgs:[rs]});
				a.showImg(0);   //0为初始显示第几张，需要自己算是点的第几张图片
			}else{
				//不是图片
				qt.downloadFile(rs);
			}
		}
	},


	//临时赋值测试接口
	tempSetVal(){
		let text = $('b-input[type="text"]'),
			select = $('b-input[type="select"]'),
			money = $('b-input-money'),
			date = $('b-input-date'),
			file = $('b-input-file'),
			textarea = $('b-input[type="textarea"]'),
			n=  0;

		text.each(function(){
			if($(this).parent().hasClass('hidden')){

			}else{
				n++;
				this.value = n;
			}
		});
		select.each(function(){
			let selected = this.body.find('option').eq(1).attr('value');
			this.value = selected;
		});
		money.each(function(){
			n++;
			this.value = n;
		});
		textarea.each(function(){
			n++;
			this.value = n;
		});
		date.each(function(){
			let data = '2020-11-11';
			this.value = data;
		});
		file.each(function(){
			n++;
			this.showFiles = ["http://"+n+'.jpg']
		});
	},

	sleep(ms){
		return new Promise(success=>{
			setTimeout(function(){
				success();
			},ms)
		})
	},

	//提交时对象中参数带_的 在包裹一层对象
	//订单提交第3步用
	handlerFromDataByObj(data){
		let backData = {};
		for(let [key,val] of Object.entries(data)){
			if(key.indexOf('_')>-1){
				key = key.split('_');
				let obj = key[0],
					thisKey = key[1];

				if(!backData[obj]){backData[obj] = {}}
				backData[obj][thisKey] = val;
			}else{
				backData[key] = val;
			}
		}

		return backData;
	},
	//获取输入框中修改过的数据
	getChangeData(oldData,newData){
		let changeDta = [];
		for(let [key,val] of Object.entries(newData)){
			if(oldData[key] != newData[key]){
				changeDta.push({
					key:key,
					oldValue:oldData[key],
					newValue:newData[key]
				})
			}
		}

		let text = [],
			nowStamp = new Date().getTime(),
			date = stamp2Date.getDate1(nowStamp);
		changeDta.map(rs=>{
			let id = rs.key,
				name = $('#'+id).attr('name');

			let newText = `${date},${window.userName}将${name}从 "${rs.oldValue}"修改为"${rs.newValue}"`;
			text.push(newText);
		})

		return text;
	},


	//流程统一提交方法
	async reviewSubmit(param){
		let formDom = param.formDom,
			orderNo = param.orderNo,
			state = param.state,
			currentNodeKey = param.currentNodeKey,
			addFn = param.addFn ||function(){};

		let form = await this.getFromVal(formDom),
			uploaded = await this.uploadFile(form.attachUrls);

		form.attachUrls = uploaded.join(',');
		form.auditStatus = state;
		form.orderNo = orderNo;
		form.currentNodeKey = currentNodeKey;


		let {api} = await processToPageDist(currentNodeKey);

		await ajax.send([
			nodeKeySubmit(api,form)
		]);

		await addFn();

		await qt.alert('操作成功!');
		qt.closeWin();
	}
};



module.exports = all;