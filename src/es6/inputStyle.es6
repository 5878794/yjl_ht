

//输入框样式设置

module.exports = {
	//手机用
	phoneInputStyleFn(obj){
		obj.rowHeight = 46;
		obj.nameStyle = {width:'80px',color:'#535353',fontSize:'14px',textAlign:'right'};
		obj.rowStyle = {paddingRight:'20px'};
		obj.unitStyle = {fontSize:'12px'};
		obj.inputBodyStyle = {background:'none','border-color':'#333','border-radius':'5px'};

		obj.styleText = 'input::-webkit-input-placeholder{\n' +
			'    color:#999; font-size: 14px;\n' +
			'}'
	},
	phoneInputStyleFn1(obj){
		obj.rowHeight = 46;
		obj.nameStyle = {width:'70px',color:'#ccc',fontSize:'14px',textAlign:'center',paddingRight:0};
		obj.rowStyle = {paddingRight:'20px',border:'1px solid #ccc','border-radius':'5px'};
		obj.unitStyle = {fontSize:'12px'};
		obj.inputBodyStyle = {background:'none',border:'none'};
		obj.errStyle = {paddingLeft:'82px'};
		obj.styleText = 'input::-webkit-input-placeholder{\n' +
			'    color:#999; font-size: 14px;\n' +
			'}' +
			'input{color:#ccc;}'
	},


	//设置输入框样式
	inputStyleFn(obj){
		obj.rowHeight = 36;
		obj.nameStyle = {width:'100px',color:'#535353',fontSize:'14px',textAlign:'right'};
		obj.rowStyle = {paddingRight:'20px'};
		obj.unitStyle = {fontSize:'12px'};
		obj.inputBodyStyle = {background:'#fff'};
	},
	inputFileStyleFn(obj){
		obj.rowHeight = 80;
		obj.nameStyle = {width:'120px',color:'#535353',fontSize:'14px',textAlign:'right'};
		obj.rowStyle = {padding:'10px 20px'};
	},
	inputFileStyleFn1(obj){
		// index/o_add_order_advance.html 专用
		obj.rowHeight = 80;
		obj.nameStyle = {width:'100px',color:'#535353',fontSize:'14px',textAlign:'right'};
		obj.rowStyle = {padding:'10px 0'};
		obj.inputBodyStyle = {paddingLeft:0};
		obj.unitStyle = {fontSize:'12px',position:'absolute',left:0,bottom:0,width:'100%',color:'#999'}
	},
	textareaStyleFn(obj){
		if(obj.rowHeight == 40){return;}
		obj.rowHeight = 40;		//textarea 自动*3
		obj.nameStyle = {width:'100px',color:'#535353',fontSize:'14px',textAlign:'right'};
		obj.rowStyle = {padding:'10px 20px'};
	},
	textareaStyleFn1(obj){
		if(obj.rowHeight == 40){return;}
		obj.rowHeight = 40;		//textarea 自动*3
		obj.nameStyle = {width:'100px',color:'#535353',fontSize:'14px',textAlign:'right'};
		obj.rowStyle = {padding:'10px 20px 10px 0'};
	},
	//搜索框中的设置
	searchInputStyleFn(obj){
		obj.rowHeight = 36;
		obj.nameStyle = {width:'auto',color:'#535353',fontSize:'14px',textAlign:'right'};
		obj.rowStyle = {paddingRight:'20px'};
		obj.unitStyle = {fontSize:'12px'};
		obj.inputBodyStyle = {background:'#fff'};
	},
	phoneSet(){
		let bInput = $('b-input'),
			bFile = $('b-input-file'),
			bMoney = $('b-input-money'),
			bDate = $('b-input-date'),
			bTextarea = $('b-input[type="textarea"]'),
			bSearch = $('b-input-search'),
			_this = this;

		bInput.each(function(){
			if($(this).attr('type') != 'textarea'){
				_this.phoneInputStyleFn(this);
			}
		});
		bFile.each(function(){
			_this.phoneInputStyleFn(this);
		});
		bMoney.each(function(){
			_this.phoneInputStyleFn(this);
		});
		bDate.each(function(){
			_this.phoneInputStyleFn(this);
			this.inputBodyStyle = {paddingRight:0};
		});
		bTextarea.each(function(){
			_this.phoneInputStyleFn(this);
		});
		bSearch.each(function(){
			_this.phoneInputStyleFn(this);
		});
	},
	phoneSet1(){
		let bInput = $('b-input'),
			bFile = $('b-input-file'),
			bMoney = $('b-input-money'),
			bDate = $('b-input-date'),
			bTextarea = $('b-input[type="textarea"]'),
			bSearch = $('b-input-search'),
			_this = this;

		bInput.each(function(){
			if($(this).attr('type') != 'textarea'){
				_this.phoneInputStyleFn1(this);
			}
		});
		bFile.each(function(){
			_this.phoneInputStyleFn1(this);
		});
		bMoney.each(function(){
			_this.phoneInputStyleFn1(this);
		});
		bDate.each(function(){
			_this.phoneInputStyleFn1(this);
			this.inputBodyStyle = {paddingRight:0};
		});
		bTextarea.each(function(){
			_this.phoneInputStyleFn1(this);
		});
		bSearch.each(function(){
			_this.phoneInputStyleFn1(this);
		});
	},


	set(bFile1,bTextarea1){
		let bInput = $('b-input'),
			bFile = $('b-input-file'),
			bMoney = $('b-input-money'),
			bDate = $('b-input-date'),
			bTextarea = $('b-input[type="textarea"]'),
			bSearch = $('b-input-search'),
			_this = this;

		bInput.each(function(){
			if($(this).attr('type') != 'textarea'){
				_this.inputStyleFn(this);
			}
		});
		bFile.each(function(){
			if(bFile1){
				_this.inputFileStyleFn1(this);
			}else{
				_this.inputFileStyleFn(this);
			}

		});
		bMoney.each(function(){
			_this.inputStyleFn(this);
		});
		bDate.each(function(){
			_this.inputStyleFn(this);
			this.inputBodyStyle = {paddingRight:0};
		});
		bTextarea.each(function(){
			if(bTextarea1){
				_this.textareaStyleFn1(this);
			}else{
				_this.textareaStyleFn(this);
			}
		});
		bSearch.each(function(){
			_this.inputStyleFn(this);
		});
	},
	searchSet(obj,isSearch){
		let bInput = obj.body.find('b-input'),
			bMoney = obj.body.find('b-input-money'),
			bDate = obj.body.find('b-input-date'),
			_this = this;

		bInput.each(function(){
			if(isSearch){
				obj.rowHeight = 36;
				obj.inputBodyStyle = {background:'#fff'};
			}else{
				_this.searchInputStyleFn(this);
			}
		});
		bMoney.each(function(){
			_this.searchInputStyleFn(this);
		});
		bDate.each(function(){
			_this.searchInputStyleFn(this);
			this.inputBodyStyle = {paddingRight:0};
		});


	}
};