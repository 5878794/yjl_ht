

let all_css_test = require('../../yjl/all_css'),
	addStyleText = require('./addStyleText');



//文件路径默认到输出后的 trunk下的css文件中

module.exports = function(filePath){
	if(filePath.indexOf('all.css')>-1){
		return addStyleText(all_css_test);
	}else{
		let style = document.createElement('link');
		style.rel = "stylesheet";
		style.href = filePath;
		return style;
	}
};