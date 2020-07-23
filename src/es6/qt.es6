


let loadFn = require('./lib/ui/loading_old');

let JD = {
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
        title = title || '系统提示';
        return new Promise(success=>{
            if(bridge){
                bridge.information(msg,title,function(){
                    success();
                });
            }
        });
    },
    confirm(msg,title,btn1Text,btn2Text){
        title = title || '系统提示';
        return new Promise(success=>{
            if(bridge){
                bridge.warning(msg, title,function (res) {
                    if(res==1){
                        success();
                    }
                });
            }
        })
    },
    //打开窗口 网址
    openUrl(url,width,height,type){
        if (bridge) {
            bridge.openUrl(
                url,
                width,      //窗口宽度
                height,     //窗口高度
                type,       //模态[0 = 模态，1 = 非模态]
                1           //路径模式[0 = 相对，1 = 绝对]
            );
        }
    },
    //打开本地页面
    openPage(url,width,height,type){
        type = type || 0;
        if (bridge) {
            bridge.openUrl(
                url,
                width,      //窗口宽度
                height,     //窗口高度
                type,       //模态[0 = 模态，1 = 非模态]
                0           //路径模式[0 = 相对，1 = 绝对]
            );
        }
    },
    //关闭窗口，在打开页面执行回调函数
    closeWin(parentCallBack){
        if(bridge){
            bridge.closeWin();
        }
    },
    //调用父级窗口函数
    //text: 运行的js字符串
    runParentJS(text){
        if(bridge){
            bridge.runJsOnParent(text);
        }
    }
};


module.exports = JD;