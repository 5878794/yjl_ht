//元素内的第一层元素的连续的间隔时间 动画

//new DEVICE.stepAnimate({
//    dom:$("#test"),           @param:jqdom   要运动的元素的包裹层
//    style:{                   @param:json     运动的方式 classAnimate
//        "0%":"transform:translateX(100px);",
//        "100%":"transform:translateX(0);"
//    },
//    runTime:300,              @param：number   单个元素的运行时间  ms
//    stepTime:50,              @param：number   子元素开始动画的间隔时间
//    callback:function(){
//        console.log(this)
//    },
//    willChange:"transform",
//    delayTime:1000,
//    animateType:"linear",
//    infinite:false,
//    alternate:false
//})


//jq调用方式(不传dom参数，其他一样)
//$.fn.childrenStepAnimate(opt)


require("./classAnimate");


class stepAnimate{
	constructor(opt){
		this.dom = opt.dom;
		this.children = this.dom.children();
		this.style = opt.style || {};
		this.runTime = opt.runTime || 500;
		this.stepTime = opt.stepTime || 10;
		this.animateType = opt.animateType || "linear";
		this.infinite = opt.infinite || false;
		this.alternate = opt.alternate || false;
		this.callback = opt.callback || "";
		this.delayTime = opt.delayTime || 0;
		this.willChange = opt.willChange || "auto";

		this._init();
	}

	_init(){
		this._run();

	}

	_run(){
		for(var i=0,l=this.children.length;i<l;i++){
			var this_dom = this.children[i],
				delayTime = this.delayTime + i*this.stepTime,
				callback = function(){},
				_this = this;

			if(i == l-1){
				callback = function(){
					var dom = $(this).parent();
					_this.callback.call(dom.get(0));
				}
			}



			$(this_dom).classAnimate(
				this.style,
				this.runTime,
				this.animateType,
				this.infinite,
				this.alternate,
				callback,
				delayTime,
				this.willChange
			)
		}
	}
}


$.fn.childrenStepAnimate = function(opt){
	opt.dom = $(this);
	new stepAnimate(opt);
};



module.exports = null;

