



let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b_order_info');
require('./../../es6/yjl/b-order-history');
require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b_title1');
require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_money');
require('./../../es6/customElement/pc/input_date');
require('./../../es6/customElement/pc/input_file');



let loading;
let Page = {
	init(){
		qt.loading.show();
		this.run().then(rs=>{
			qt.loading.hide();
		}).catch(rs=>{
			// err.error(rs);
			qt.loading.hide();
			qt.alert(rs);
		});
	},
	async run(){
		inputStyle.set(true,true);

		await all.getUserInfo();

		let _this = this;
		$('#submit').click(function(){
			qt.loading.show();
			_this.submit().then(rs=>{
				qt.loading.hide();
			}).catch(e=>{
				qt.loading.hide();
				qt.alert(e);
			})
		});
	},

	//TODO 文件上传接口，待测试
	async submit(){
		let dom = $('#form'),
			form = await all.getFromVal(dom);

		let files = form.attachUrls;
		let filesServerUrl = await all.uploadFile(files);
		filesServerUrl = filesServerUrl.join(',');

		form.attachUrls = filesServerUrl;
		form.broadType = 0; //手动发布
		form.status = 1;    //上架

		await ajax.send([
			api.news_add(form)
		]);

		await qt.alert('发布成功');
		qt.closeWin();
	}
};


app.run(Page);