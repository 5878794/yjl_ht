


let app = require('./../../es6/lib/page');

require('../../es6/customElement/b_bind_obj');
require('../../es6/customElement/b_bind_array');
require('../../es6/customElement/pc/input');



let Page = {
	init(){
		let dom = $('#c').eq(0).get(0);

		// setTimeout(function(){
			dom.data = [
				{
					name:'title1',
					children:[
						{name:'p1'},
						{name:'p2'}
					]
				},
				{
					name:'title2',
					children:[
						{name:'a1'},
						{name:'a2'}
					]
				}
			]
		// },1000)



	}
};


app.run(Page);