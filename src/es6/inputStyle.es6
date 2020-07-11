

//输入框样式设置

module.exports = {
	//设置输入框样式
	inputStyleFn(obj){
		obj.rowHeight = 36;
		obj.nameStyle = {color:'#535353',fontSize:'14px',textAlign:'right'};
		obj.rowStyle = {paddingRight:'20px'};
		obj.unitStyle = {fontSize:'12px'};
		obj.inputBodyStyle = {background:'#fff'};
	},
	inputFileStyleFn(obj){
		obj.rowHeight = 80;
		obj.nameStyle = {width:'120px',color:'#535353',fontSize:'14px',textAlign:'right'};
		obj.rowStyle = {padding:'10px 20px'};
	},
	textareaStyleFn(obj){
		obj.rowHeight = 40;		//textarea 自动*3
		obj.rowStyle = {padding:'10px 20px'};
	},



	set(){
		let bInput = $('b-input'),
			bFile = $('b-input-file'),
			bMoney = $('b-input-money'),
			bDate = $('b-input-date'),
			bTextarea = $('b-input[type="textarea"]'),
			_this = this;

		bInput.each(function(){
			_this.inputStyleFn(this);
		});
		bFile.each(function(){
			_this.inputFileStyleFn(this);
		});
		bMoney.each(function(){
			_this.inputStyleFn(this);
		});
		bDate.each(function(){
			_this.inputStyleFn(this);
		});
		bTextarea.each(function(){
			_this.textareaStyleFn(this);
		});
	}
};