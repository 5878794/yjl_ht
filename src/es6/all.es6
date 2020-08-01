

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
	//获取dom下的所有input的val并表单验证
	getFromVal(dom){
		return new Promise(async (success,error)=>{
			let backData = {};
			let inputs = dom.find('b-input,b-input-money');

			for(let i=0,l=inputs.length;i<l;i++){
				let id = inputs.eq(i).attr('id'),
					val = await inputs.eq(i).get(0).checkPass().catch(e=>{error(e)});
				backData[id] = val;
			}

			success(backData);
		});
	}
};



module.exports = all;