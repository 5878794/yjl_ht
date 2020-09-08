


let loadFn = require('./lib/ui/loading_old'),
    winSettingSize = require('./winSetting');



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

        //表单验证出错
        if(msg.dom){
            msg = '提交数据有误，请检查！';
        }
        if(typeof msg != 'string'){
            console.log(msg);
            return;
        }
        return new Promise(success=>{
            window.bridge = window.bridge ?? top.bridge;
            if(window.bridge){
                window.bridge.information(msg,title,function(){
                    success();
                });
            }else{
                alert(msg);
                success();
            }
        });
    },
    confirm(msg,title,btn1Text,btn2Text){
        title = title || '系统提示';
        return new Promise(success=>{
            window.bridge = window.bridge ?? top.bridge;
            if(window.bridge){
                window.bridge.warning(msg, title,function (res) {
                    if(res==1){
                        success(true);
                    }
                });
            }else{
                if(confirm(msg)){
                    success(true);
                }
            }
        })
    },
    //打开窗口 网址
    openUrl(url,width,height,type){
        window.bridge = window.bridge ?? top.bridge;
        if (window.bridge) {
            window.bridge.openUrl(
                url,
                width,      //窗口宽度
                height,     //窗口高度
                type,       //模态[0 = 模态，1 = 非模态]
                1           //路径模式[0 = 相对，1 = 绝对]
            );
        }else{
            window.location.href = url;
        }
    },
    //打开本地页面  width,height 废弃
    openPage(url,width,height,type){
        //width,height 废弃
        console.log('%c 打开弹窗页面:'+url,'color:red;');
        type = type || 0;

        let {newWidth,newHeight} = winSettingSize.publish(url);
        window.bridge = window.bridge ?? top.bridge;
        if (window.bridge) {
            window.bridge.openUrl(
                url,
                newWidth,      //窗口宽度
                newHeight,     //窗口高度
                type,       //模态[0 = 模态，1 = 非模态]
                0           //路径模式[0 = 相对，1 = 绝对]
            );
        }else{
            window.location.href = url;
        }
    },
    //关闭窗口，在打开页面执行回调函数
    closeWin(parentCallBack){
        window.bridge = window.bridge ?? top.bridge;
        if(window.bridge){
            window.bridge.closeWin();
        }
    },
    //调用父级窗口函数
    //text: 运行的js字符串
    runParentJS(functionName,data){
        let cmd = `window.${functionName}(${JSON.stringify(data)})`;
        window.bridge = window.bridge ?? top.bridge;
        if(window.bridge){
            window.bridge.runJsOnParent(cmd);
        }
    },

    refreshPage(){
        window.location.reload();
    },

    //登录过期，重新登录  TODO 等接口
    reLogin(){

    },
    //下载文件
    downloadFile(url){
        let fileName = url.substr(url.lastIndexOf('/')+1);
        // let serverUrl = SETTING.downloadFileUrl;
        // fileName = serverUrl + fileName;

        window.bridge = window.bridge ?? top.bridge;
        if (window.bridge) {
            window.bridge.download(url, fileName);
        }
    },
    //获取用户信息
    getUserInfo(){
        return new Promise(success=>{
            window.bridge = window.bridge ?? top.bridge;
            window.bridge.localData('userinfo', function (res) {
                console.log('back userInfo');
                success(res);
            });
        })
    },
    //获取及时信息
    getNews(){
        return new Promise(success=>{
            window.bridge = window.bridge ?? top.bridge;
            top.qtNews = function(rs){
                success(rs);
            };
            if (window.bridge) {
                window.bridge.startBroadList('qtNews', 0);
            }
        });
    }
};


module.exports = JD;