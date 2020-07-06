


module.exports = {
	//获取window对象
	getWin(){
		return (top != window)? top : window;
	},
	//打开弹出窗口
	openUrl(url,width,height,state){

	},
	iframeGoTo(url){
		let win = this.getWin();
		win.$('#iframe').attr({src:url});
	}
};