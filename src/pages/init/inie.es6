let app = require('./../../es6/lib/page');



require('./../../es6/yjl/b-win-left');


window.chooseNav = function(tag){
	let nav = $('b-win-left').get(0);
	nav.chooseNav(tag);
};


let Page = {
	init(){
	}
};


app.run(Page);