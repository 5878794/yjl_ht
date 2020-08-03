

let {ajax,api} = require('./_ajax');



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
		return 	dom.find('b-input,b-input-money,b-input-date,b-input-file');
	},
	//获取dom下的所有input的val并表单验证
	getFromVal(dom){
		return new Promise(async (success,error)=>{
			let backData = {};
			let inputs = this.getInputDom(dom);

			for(let i=0,l=inputs.length;i<l;i++){
				let id = inputs.eq(i).attr('id'),
					val = await inputs.eq(i).get(0).checkPass().catch(e=>{error(e)});
				backData[id] = val;
			}

			success(backData);
		});
	},
	//dom下的b-input类数据绑定
	setFromVal(dom,data){
		let inputs = this.getInputDom(dom);
		inputs.each(function(){
			let id = $(this).attr('id');
			this.value = data[id];
		})
	},
	//上传文件
	//TODO 服务器地址
	//TODO 返回报文 返回数组
	uploadFile(files){
		let serverUrl = SETTING.serverUrl + '/fileUpload';
		return new Promise((success,error)=>{
			if(!files || files.length == 0){
				success([]);
				return;
			}

			let form = new FormData(),
				xhr = new XMLHttpRequest();

			files.map(file=>{
				form.append('file',file);
			});

			xhr.onload =  function(e){
				let body = e.target.responseText;
				success(body);
			};
			xhr.onerror = function(e){
				error(e);
			};

			// xhr.upload.onprogress =  uploadProgress; //上传进度调用方法实现

			xhr.open("post", serverUrl, true);  //post方式提交，url为服务器请求地址，true该参数规定请求是否异步处理
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

		console.log(fy)

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
	}
};



module.exports = all;