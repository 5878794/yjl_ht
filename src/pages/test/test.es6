


let app = require('./../../es6/lib/page');

require('../../es6/customElement/b_bind_obj');
require('../../es6/customElement/b_bind_array');
require('../../es6/customElement/pc/input');



let Page = {
	init(){
		let dom = $('#c').eq(0).get(0);

		// setTimeout(function(){
			dom.data = [
				{name:111,arr:[{name:'a11'},{name:'a12'}]},
				{name:222,arr:[]}
			]
		// },1000)



	}
};


app.run(Page);