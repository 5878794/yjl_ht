

let lib = require('../lib');


let addStyleFile = require('../customElement/fn/addStyleFile'),
	addStyleText = require('../customElement/fn/addStyleText');


let navData = [
	{name:'首页',icon:'../res/image/icon1.png',url:'../index/index.html'},
	{name:'草稿箱',icon:'../res/image/icon2.png',url:''},
	{name:'我的业务',icon:'../res/image/icon3.png',url:''},
	{name:'退费退款',icon:'../res/image/icon4.png',url:''},
	{name:'审批',icon:'../res/image/icon5.png',url:''},
	{name:'权证',icon:'../res/image/icon6.png',url:''},
	{name:'贷后',icon:'../res/image/icon7.png',url:''},
	{name:'财务',icon:'../res/image/icon8.png',url:'',children:[
		{name:'财务管理',url:''},
		{name:'退尾款/费用',url:''}
	]},
	{name:'档案',icon:'../res/image/icon9.png',url:''},
	{name:'统计',icon:'../res/image/icon10.png',url:'',children:[
		{name:'垫资业务',url:''},
		{name:'房抵业务',url:''}
	]},
	{name:'综合管理',icon:'../res/image/icon11.png',url:'',children:[
		{name:'员工',url:''},
		{name:'开单通告',url:''},
		{name:'通知管理',url:''}
	]},
	{name:'设置',icon:'../res/image/icon12.png',url:'',children:[
		{name:'时间流程',url:''},
		{name:'业务产品',url:''},
		{name:'权限角色',url:''},
		{name:'客户来源',url:''}
	]}
];


let arrowImgSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAGCAYAAAAVMmT4AAAAZElEQVQYlYXOMQrCQBBG4QUh4OW8gEICEpCUOVlqDyKkT2FjmybFZ5FZkGUxA1PM/O8Nk/DGgHTQU8Jor+4P+MKWhzaEvgLO2ND8Lm8hPArwgzNSeeUawh1PrDjlvPbfJYSlzL78JdevlD3m7gAAAABJRU5ErkJggg==';

class bWinLeft extends HTMLElement{
	//元素加入页面回调
	connectedCallback() {
		let _this = this;
		setTimeout(function(){
			_this.body.css({display:'flex'});
		},0)

	}

	constructor() {
		super();

		this.body = null;

		//创建shadow容器
		this.shadow = this.attachShadow({mode: 'open'});

		//挂载css
		let all = addStyleFile('../res/css/all.css');
		this.shadow.appendChild(all);

		this.createStyle();
		let style = addStyleText(this.cssText);
		this.shadow.appendChild(style);


		//创建dom
		this.createElement();
		this.createList();
		this.addEvent();
		this.chooseNav();

		this.shadow.appendChild(this.body.get(0));
	}

	createElement(){
		let body = $('<div class="box_slt" style="display: none;"></div>'),
			logoBody = $('<div class="logo box_hcc"><img src=\'../res/image/logong.png\'><span>金盾时贷</span></div>'),
			navBody = $('<div class="menu scroll_style1"></div>'),
			item = $('<div><div class="box_hcc menu_item __item__"><img /><span></span></div></div>'),
			itemBody = $('<div class="menu_children_body hidden"></div>'),
			item2 = $('<div class="box_hlc menu_item1 __item__"></div>');


		// body.append(logoBody).append(navBody);
		body.append(navBody);

		this.navBody = navBody;
		this.item = item;
		this.itemBody = itemBody;
		this.item2 = item2;
		this.body = body;
	}
	createStyle(){
		let css = [
			'.logo{width: 100%; height: 80px;font-size: 20px;color: #fff;font-weight: bold;}',
			'.logo img{display: block;width: 31px;height: 40px;margin-right: 15px;}',
			'.menu{width: 100%; position: absolute;left:0; top:0; bottom:0;overflow-y: auto;overflow-x: hidden;padding:5px;}',
			'.menu_item{width: 100%;height: 50px;cursor: pointer;padding-left: 10px;border-radius: 5px;}',
			'.menu_item img{transform: scale(0.8);}',
			'.menu_item span{width: 110px;padding-left:16px;font-size: 16px;color: #afafb9;position: relative;display: block;}',
			'.menu_item:hover,.menu_item1:hover{opacity: 0.8;}',
			'.menu_item1{padding-left:77px;width: 100%;font-size: 16px;color: #afafb9;height: 50px;cursor: pointer;border-radius: 5px;}',
			'.arrow_down:after{content: \'\';position: absolute; right: 0; top:50%; margin-top: -3px;display: block; width: 11px; height: 6px;background: url('+arrowImgSrc+') no-repeat center center;background-size: 100% 100%;}',
			'.arrow_up:after{content: \'\';position: absolute; right: 0; top:50%; margin-top: -3px;display: block; width: 11px; height: 6px;background: url('+arrowImgSrc+') no-repeat center center;background-size: 100% 100%;transform:rotate(180deg);}',
			'.menu .select{background: #445cb8;}',
			'.scroll_style1::-webkit-scrollbar {width: 4px;height: 4px;}',
			'.scroll_style1::-webkit-scrollbar-thumb {border-radius: 10px;background: #999;}',
			'.scroll_style1::-webkit-scrollbar-track {border-radius: 10px;background: #fff;}'
		];


		this.cssText = css.join('');
	}

	createList(){
		let body = this.navBody,
			item = this.item,
			body2 = this.itemBody,
			item2 = this.item2;

		navData.map(rs=>{
			let _item = item.clone();

			_item.find('.__item__').attr({href:rs.url});
			_item.find('img').attr({src:rs.icon});
			_item.find('span').text(rs.name);

			if(rs.children){
				_item.find('span').addClass('arrow_down');
				let _body2 = body2.clone();
				_item.append(_body2);

				rs.children.map(child=>{
					let _item2 = item2.clone();
					_item2.text(child.name).attr({href:child.url});
					_body2.append(_item2);
				});
			}

			body.append(_item);
		});
	}

	addEvent(){
		let item = this.body.find('.__item__');

		item.click(function(){
			let href = $(this).attr('href');
			console.log(href)
			if(href!=''){
				//打开页面
				lib.pageGoTo(href);
			}

			let child = $(this).parent().find('.menu_children_body');
			if(child.length != 0){
				if(child.hasClass('hidden')){
					$(this).find('span').addClass('arrow_up').removeClass('arrow_down');
					child.removeClass('hidden');
				}else {
					$(this).find('span').removeClass('arrow_up').addClass('arrow_down');
					child.addClass('hidden');
				}
			}
		});
	}

	chooseNav(){
		let path = window.location.pathname;
		//补全path
		if(path.substr(path.length-1) == '/'){
			path = path+'index.html';
		}

		let allItem = this.body.find('.__item__');
		allItem.each(function(){
			let thisSrc = $(this).attr('href');
			if(thisSrc.indexOf(path)>-1){
				$(this).addClass('select');
			}
		})
	}

}



if(!customElements.get('b-win-left')){
	customElements.define('b-win-left', bWinLeft );
}


