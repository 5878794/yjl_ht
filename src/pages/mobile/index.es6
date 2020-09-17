let app = require('./../../es6/lib/page'),
	lib = require('./../../es6/lib'),
	all = require('./../../es6/all'),
	{ajax,api} = require('./../../es6/_ajax'),
	qt = require('./../../es6/qt'),
	pageSizeSetting = require('./../../es6/pageSize'),
	getParamFromUrl = require('./../../es6/lib/fn/getParamFromUrl'),
	selectData = require('./../../es6/selectData'),
	winSetting = require('./../../es6/winSetting'),
	tableSet = require('./../../es6/tableSetting'),
	stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
	inputStyle = require('./../../es6/inputStyle');



require('./../../es6/customElement/pc/input');



let Page = {
	init(){
		all.showLoadingRun(this,'run');
	},
	async run(){
		inputStyle.phoneSet1();

		let user = window.localStorage.getItem('__u_p__')||'';
		user = decodeURI(user) || '{}';
		user = JSON.parse(user);
		if(user.userName && user.password){
			$('#userName').get(0).value = user.userName;
			$('#password').get(0).value = user.password;
		}


		this.bindEvent();
	},
	bindEvent(){
		let btn = $('#submit'),
			_this = this;

		btn.click(function(){
			all.showLoadingRun(_this,'submit');
		});
	},
	async submit(){
		let form = await all.getFromVal($('#form'));

		let [userInfo] = await ajax.send([
			api.login(form)
		]);

		window.localStorage.setItem('__u_p__',encodeURI(JSON.stringify(form)));
		window.sessionStorage.setItem('userInfo',JSON.stringify(userInfo));

		qt.openUrl('./list.html');
	}
};


app.run(Page);