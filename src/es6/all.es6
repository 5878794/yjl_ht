

let {ajax,api} = require('./_ajax'),
	qt = require('./../es6/qt'),
	selectData = require('./../es6/selectData');



//获取用户信息
let all = {
	getUserInfo(){
		return new Promise((success,error)=>{
			ajax.send([
				api.login({
					userName:'test',
					password:'123456'
				})
			]).then(rs=>{
				rs = rs[0];
				window.token = rs.token;
				success();
			}).catch(e=>{
				error('获取用户信息失败');
			})
		});
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
	setFromGroupVal(dom,data){
		//写入非数组内的数据
		this.setFromVal(dom,data);

		//触发bTitle的点击事件
		let bTitle = dom.find('b-title[bind-group],b-title1[bind-group]');
		bTitle.each(function(){
			let btn = this.body.find('.btn'),
				type= $(this).attr('bind-group'),
				l = data[type]?.length || 0;
			for(let i=0;i<l;i++){
				btn.trigger('click');
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


			files.map(file=>{
				form.append('files',file);
			});

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

					success(back)
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
			newData.push(serverUrl+rs);
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
			dist = await selectData('businessType'),
			distForm = await selectData('businessFrom');

		part1.showLevel = level;

		let backData = {};
		if(level >= 1){
			backData.money = data.applyMoney;
			backData.type = dist[data.businessKey];
			backData.no = data.orderNo;
		}
		if(level >= 2){
			backData.from = '来自'+distForm[data.businessSourceKey];
			//TODO
			backData.mans = [
				{name:'张三',phone:12312312312,idcard:'123333333333333333',address:'阿打发打发发代付链接撒地方科技傲世狂妃'},
				{name:'张三(共同)',phone:12312312312,idcard:'123333333333333333',address:'阿打发打发发代付链接撒地方科技傲世狂妃'},
				{name:'张三(担保)',phone:12312312312,idcard:'123333333333333333',address:'阿打发打发发代付链接撒地方科技傲世狂妃'}
			];
		}
		if(level >= 3){

		}


		part1.data = backData;
	}
};



module.exports = all;