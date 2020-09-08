let app = require('./../../es6/lib/page');



require('./../../es6/yjl/b-win-left');


window.chooseNav = function(tag){
	let nav = $('b-win-left').get(0);
	nav.chooseNav(tag);
};
window.iframeOpen = function(url){
	let nav = $('b-win-left').get(0);
	nav.openIframePage(url);
};

window.userLock = function(state){
	let nav = $('b-win-left').get(0);
	nav.userLock = state;
};


let Page = {
	init(){
		// let qtJsSrc = $('#qt').attr('src'),
		// 	iframeWindow = $('#win_right').get(0).contentWindow;
		//
		// let script = document.createElement('script');
		// script.src = qtJsSrc;
		// script.onload = function(){
		// 	qweb_load();
		// };
		// iframeWindow.$('body').append(script);
	}
};


app.run(Page);