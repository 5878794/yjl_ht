


let app = require('./../../es6/lib/page');

require('../../es6/customElement/b_bind_obj');
require('../../es6/customElement/b_bind_array');
require('../../es6/customElement/pc/input');



let Page = {
	init(){
		let dom = $('#d').eq(0).get(0);

		// dom.data = {
		// 	name:'aa',
		// 	age:'22',
		// 	ddd:{
		// 		a:1,
		// 		b:2,
		// 		c:3,
		// 		aaa:[
		// 			{name:'a1',abc:{name1:'aname1'}},
		// 			{name:'a2',abc:{name1:'aname2'}},
		// 		]
		// 	}
		// }
		//
		// let dom1 = $('#c').eq(0).get(0);
		// 	dom1.data = [
		// 		{
		// 			name:'title1',
		// 			children:[
		// 				{aaa:'p1'},
		// 				{aaa:'p2'}
		// 			]
		// 		},
		// 		{
		// 			name:'title2',
		// 			children:[
		// 				{aaa:'a1'},
		// 				{aaa:'a2'}
		// 			]
		// 		}
		// 	]

		let dom2 = $('#a').get(0);
		dom2.data = [
			{
				name:'a1',
				obj:{
					aaa:'a11'
				}
			},
			{
				name:'a2',
				obj:{
					aaa:'a22'
				}
			}
		]

	}
};


app.run(Page);