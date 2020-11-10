


let app = require('./../../es6/lib/page');

require('../../es6/customElement/b_bind_obj');
require('../../es6/customElement/pc/input');



let Page = {
	init(){
		let dom = $('#a').eq(0).get(0);

		setTimeout(function(){
			dom.data = {a:1,b:2,c:{a:222,b:333},d:'哈哈'};
		},1000)

	}
};


app.run(Page);