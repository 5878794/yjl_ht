


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
    }
};

window.JD = aa;

module.exports = aa;