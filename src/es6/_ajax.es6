// let md5 = require("./lib/fn/md5"),
// 	app = require("./lib/JkAndWeChat");

// let errorHandler = require('./lib/fn/errorHandler');

let qt = require('qt.es6');




let ajax = {
	//请求函数主体
	run(url, data, type, success, error){
		url = SETTING.serverUrl + url;

		//预约挂号特有
		// data.token = this.token;
		// data.userToken = this.userToken;
		// data.sign = this.sign(data);
		// data.ver = SETTING.apiVer;

		if(type=='post'){
			data = JSON.stringify(data);
		}


		$.ajax({
			type: type,
			cache: false,
			url: url,
			data: data,
			contentType:"application/json",
			dataType: "json",
			timeout: 20000,     //20秒
			headers: {
				Authorization: window.token
			},
			success: async function(rs) {
				if(rs.code == 200){
					success(rs.data);
				}else{
					if(rs.code == 1000){
						error('您还未登录或登录已过期！');
						//关闭所有窗口或进入登录页
						qt.reLogin();
					}else{
						error(rs.data);
					}
				}
			},
			error: function(e) {
				// errorHandler.ajaxError(type,url,data,e);
				if(e.status == 500){
					error('服务器内部错误！');
					return;
				}


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
	// //部门信息接口
	// dept_list: {url:'/api/dept/list',type:'get'},
	// dept_add:{url:'/api/dept/addOrUpdate',type:'post'},
	// dept_del:{url:'/api/dept/{deptId}',type:'delete'},

	//角色
	role_get_list:{url:'/api/role/list',type:'get'},
	role_add:{url:'/api/role/addOrUpdate',type:'post'},
	role_del:{url:'/api/role/{roleId}',type:'delete'},
	//有问题这个  TODO
	role_privilege_list:{url:'/api/role/privilege/list',type:'get'},


	//机构
	org_add:{url:'/api/organization/addOrUpdate',type:'post'},
	org_del:{url:'/api/organization/{organizationId}',type:'delete'},
	org_list:{url:'/api/organization/list',type:'get'},

	//机构下的产品
	org_product_add:{url:'/api/product/addOrUpdate',type:'post'},
	org_product_del:{url:'/api/product/{productId}',type:'delete'},
	org_product_list:{url:'/api/product/list',type:'get'},

	//系统配置信息
	// setting_config:{url:'/api/config/dictionary/list',type:'get'}

	//公司信息
	company_list:{url:'/api/company/list',type:'get'},
	company_add:{url:'/api/company/addOrUpdate',type:'post'},
	company_del:{url:'/api/company/{companyId}',type:'delete'},

	//部门信息
	department_list:{url:'/api/dept/list',type:'get'},
	department_add:{url:'/api/dept/addOrUpdate',type:'post'},
	department_del:{url:'/api/dept/{deptId}',type:'delete'},

	//新闻
	news_list:{url:'/api/system/broad/list',type:'get'},
	news_add:{url:'/api/system/broad/addOrUpdate',type:'post'},
	news_del:{url:'/api/system/broad/{roleId}',type:'delete'},

	//员工
	staff_list:{url:'/api/user/list',type:'get'},
	staff_add:{url:'/api/user/addOrUpdate',type:'post'},
	staff_del:{url:'/api/user/{userId}',type:'delete'}
};






api = new Proxy(api, {
	get(target, key, receiver) {
		return function (data) {
			data = data || {};
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
});




module.exports = {ajax,api};