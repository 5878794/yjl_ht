


let loadFn = require('./lib/ui/loading_old');

let aa = {
    loading:{
        obj:null,
        show(){
            if(!this.obj){
                this.obj = new loadFn();
            }
            this.obj.show('数据加载中');
        },
        hide(){
            this.obj.hide();
        }
    },
    alert(msg,title){
        return new Promise(success=>{
            if(bridge){
                bridge.information(msg,title,function(){
                    success();
                });
            }else{
                alert(msg);
                success();
            }
        });
    },
    confirm(msg,title,callback,btn1Text,btn2Text){

    },
    //打开窗口
    openUrl(url,width,height,type){

    },
    //关闭窗口，在打开页面执行回调函数
    closeWin(parentCallBack){

    }
};

window.JD = aa;

module.exports = aa;