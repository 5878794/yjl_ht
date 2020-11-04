
//首页 通知 滚动条

// html:
// 	b-index-notice(id='notice' class='notice')

//js:
// 	let notice = $('#notice').get(0);
// 	notice.showData = [{text:'123',...}];       //text属性必须
// 	notice.clickFn = function(rs){
// 		console.log(rs)             //传入的对象
// 	}


let lib = require('../lib'),
	jsAnimate = require('../lib/fn/jsAnimate');
require('../lib/jq/extend');


let addStyleFile = require('../customElement/fn/addStyleFile'),
	addStyleText = require('../customElement/fn/addStyleText');



class bIndexNotice extends HTMLElement{
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

		this.userClickFn = function(){};

		this.shadow.appendChild(this.body.get(0));
		this.canRun = false;
		this.animateTime = parseInt($(this).attr('animateTime'));
		this.animateFn = null;
		this.addAnimateFn();
		this.addEvent();
	}

	getAnimateWidth(){
		let bodyWidth = parseInt(this.scrollDiv.parent().width()),
			scrollerWidth = parseInt(this.scrollDiv.width());
		this.animateWidth = bodyWidth + scrollerWidth;
		this.scrollerWidth = scrollerWidth;


		let _this = this;
		if(bodyWidth == 0 || scrollerWidth==0){
			setTimeout(function(){
				_this.getAnimateWidth();
			},500)
		}else{
		}
	}

	createElement(){
		let body = $('<div class="notice box_hlc" style="display: none;"></div>'),
			img = $('<img src="./image/notice.png"/>'),
			p = $('<p>信息播报：</p>'),
			scrollBody = $('<div class="boxflex1 notice_main"></div>'),
			scrollDiv = $('<div class="notice_scroller box_hlc"></div>'),
			list = $('<span class="hover"></span>');

		body.append(img).append(p).append(scrollBody);
		scrollBody.append(scrollDiv);

		this.scrollDiv = scrollDiv;
		this.item = list;
		this.body = body;
	}
	createStyle(){
		let css = [
			'.notice{padding:0 20px;height: 50px;background: #fff;}',
			'.notice img{display: block;width: 24px;height: 20px;margin-right: 10px;}',
			'.notice p{font-size: 14px; color: #000000;}',
			'.notice_main{position: relative;overflow: hidden;height: 50px;}',
			'.notice_scroller{position: absolute;left:0; top:0;height: 50px;font-size: 12px;}',
			'.notice_scroller span{padding:0 20px;font-size: 12px;}'
		];


		this.cssText = css.join('');
	}

	run(val){
		let _this = this;
		let width = _this.animateWidth * (1-val) - _this.scrollerWidth;
		// console.log(_this.animateWidth,val,_this.scrollerWidth)
		_this.scrollDiv.css({
			transform:'translateX('+width+'px)'
		});
	}
	addAnimateFn(){
		let _this = this;
		this.animateFn = new jsAnimate({
			start:0,                  //@param:number   初始位置
			end:1,                    //@param:number   结束位置
			time:this.animateTime,                 //@param:number   动画执行时间  ms
			type:"Linear",             //@param:str      tween动画类别,默认：Linear 详见函数内tween函数
			class:"Linear",           //@param:str      tween动画方式,默认：easeIn 详见函数内tween函数
			stepFn:function(val){     //@param:fn       每步执行函数,返回当前属性值
				_this.run(val);
			},
			endFn:function(){         //@param:fn       动画结束执行

			},
			alternate:false,          //@param:boolean  动画结束时是否反向运行，默认：false
			infinite:true            //@param:boolean  动画是否循环执行，默认：false
										// 设置该参数endFn将失效
		})
	}

	createList(data){
		let body = this.scrollDiv,
			item = this.item,
			_this = this;

		body.find('span').unbind('click');
		body.html('');
		data.map(rs=>{
			let _item = item.clone();
			_item.data({data:rs});
			_item.text(rs.text);

			_item.click(function(){
				let data = $(this).data('data');
				_this.userClickFn(data);
			});
			body.append(_item);
		});
	}

	set showData(data){
		if(!data || data.length == 0){
			this.scrollDiv.text('暂无通知！');
			return;
		}
		this.canRun = true;

		let _this =this;
		setTimeout(function(){
			if(_this.animateFn){
				_this.animateFn.stop();
			}
			_this.createList(data);
			_this.getAnimateWidth();
			_this.animateFn.restart();
		},300);

	}
	set clickFn(fn){
		fn = fn || function(){};
		this.userClickFn = fn;
	}


	addEvent(){
		let _this = this;


		$(window).resize(function(){
			_this.getAnimateWidth();
		});


		this.scrollDiv.hover(function(){
			_this.animateFn.stop();
		},function(){
			_this.animateFn.play();
		})
	}

}



if(!customElements.get('b-index-notice')){
	customElements.define('b-index-notice', bIndexNotice );
}


