



let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	getParamFromUrl = require('./../../es6/lib/fn/getParamFromUrl'),
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



let Page = {
	init(){
		all.showLoadingRun(this,'run');
	},
	async run(){
		let param = getParamFromUrl();
		this.id = param.id;
		inputStyle.set(true,true);

		await all.getUserInfo();

		if(this.id){
			let [data] = await ajax.send([
				api.news_list({id:this.id})
			]);
			data = data.list??[];
			data = data[0]??{};

			this.bindData(data);
		}

		let _this = this;
		$('#submit').click(function(){
			all.showLoadingRun(_this,'submit');
		});
	},
	bindData(data){
		all.setFromVal($('#form'),data);

		let imgs = all.getRealImageSrc(data.attachUrls);
		$('#attachUrls').get(0).showFiles =imgs;
	},

	async submit(){
		let dom = $('#form'),
			form = await all.getFromVal(dom);

		let files = form.attachUrls;
		let filesServerUrl = await all.uploadFile(files);
		filesServerUrl = filesServerUrl.join(',');

		form.attachUrls = filesServerUrl;
		form.broadType = 0; //手动发布
		form.status = 1;    //上架

		if(this.id){
			form.id = this.id;
		}


		await ajax.send([
			api.news_add(form)
		]);

		await qt.alert('发布成功');
		qt.closeWin();
	}
};


app.run(Page);