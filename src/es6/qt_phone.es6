


let loadFn = require('./lib/ui/loading_old');



let JD = {
    loading:{
        isFirstRun:true,
        obj:null,
        show(){
            if(!this.obj){
                this.obj = new loadFn();
            }
            this.obj.show('数据加载中');
            // if(this.isFirstRun){
            //
            // }else{
            //     if(top.bridge && top.bridge.showTips){
            //         top.bridge.showTips('与服务器通讯中',0,99999);
            //     }
            // }
        },
        hide(){
            this.obj.hide();
            // if(this.isFirstRun){
            //     if(top.bridge && top.bridge.hideLoading){
            //         setTimeout(function(){
            //             top.bridge.hideLoading();
            //         },300)
            //     }
            //     this.isFirstRun = false;
            // }else{
            //     if(top.bridge && top.bridge.hideTips){
            //         top.bridge.hideTips(0);
            //     }
            // }
        }
    }
};


module.exports = JD;