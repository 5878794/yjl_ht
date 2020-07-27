// let md5 = require("./lib/fn/md5"),
// 	app = require("./lib/JkAndWeChat");

// let errorHandler = require('./lib/fn/errorHandler');

let qt = require('./qt');


window.login = function(){
	ajax.send([
		api.login({
			userName:'test',
			password:'123456'
		})
	]).then(rs=>{

		console.log(rs);
	})
};


let ajax = {
	//请求函数主体
	run(url, data, type, success, error){
		url = SETTING.serverUrl + url;

		//预约挂号特有
		// data.token = this.token;
		// data.userToken = this.userToken;
		// data.sign = this.sign(data);
		// data.ver = SETTING.apiVer;

		$.ajax({
			type: type,
			cache: false,
			url: url,
			data: data,
			//contentType:"application/json",
			dataType: "json",
			timeout: 20000,     //20秒
			headers: {
				token: window.token
			},
			success: function(rs) {
				if(rs.code != 200){
					if(rs.code == 1000){
						qt.alert('您还未登录或登录已过期！');
						//关闭所有窗口或进入登录页
						qt.reLogin();
					}else{
						error(rs.data);
					}
				}

				success(rs.data);

			},
			error: function(e) {
				// errorHandler.ajaxError(type,url,data,e);

				if(e.status == 0 && e.statusText == 'timeout'){
					error('访问人数过多，请稍后访问');
					return;
				}

				if(e.status == 0 && e.statusText != 'error'){
					return;
				}

				error("网络错误,无法连接服务器。");
			}
		});
	},
	//发送一堆请求
	async send(arr){
		//预约挂号特有
		// this.token = await this.getToken();
		// this.userToken = await app.getUserToken();

		return new Promise((success,error)=>{
			Promise.all(arr).then(rs=>{
				success(rs)
			}).catch(rs=>{
				error(rs);
				throw "ajax error";
			})
		})
	}

};

let api = {
	//登录
	login:{url:'/api/user/login',type:'post'},
	//部门信息接口
	dept_list: {url:'/api/dept/list',type:'get'},
	dept_add:{url:'/api/dept/addOrUpdate',type:'post'},
	dept_del:{url:'/api/dept/${deptId}',type:'delete'}
};






api = new Proxy(api, {
	get(target, key, receiver) {
		return function (data) {
			return new Promise((success, error) => {
				let url = target[key].url,
					type = target[key].type || 'post';

				//判断是否含有一堆大括号,大括号内为参数
				let delArray = [];
				url = url.replace(/{(.+?)}/g,function(key){
					key = key.substr(1,key.length-2);
					delArray.push(key);
					return data[key];
				});

				//删除data中的对象
				delArray.map(rs=>{
					delete data[rs];
				});


				ajax.run(url, data, type, success, error);
			})
		}
	}
})





module.exports = {ajax,api};