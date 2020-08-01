
//通用添加名称页面
// 参数传入输入框的name 和页面type


let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    qt = require('./../../es6/qt'),
    all = require('./../../es6/all'),
    {ajax,api} = require('./../../es6/_ajax'),
    getUrlParam = require('./../../es6/lib/fn/getParamFromUrl'),
    inputStyle = require('./../../es6/inputStyle');




require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_date');
require('./../../es6/customElement/pc/input_file');
require('./../../es6/customElement/pc/input_search');
require('./../../es6/customElement/pc/input_money');



let loading;
let Page = {
    init(){
        // loading = new loadFn();
        // loading.show('急速加载中');
        this.run().then(rs=>{
            // loading.hide();
        }).catch(rs=>{
            // err.error(rs);
            // loading.hide();
            // app.alert(rs);
            throw rs;
        });
    },
    async run(){
        let param = getUrlParam(),
            type = param.type,
            name = param.name;

        await all.getUserInfo();

        let input = $('b-input').eq(0).get(0);
        input.nameDom.text(name);

        inputStyle.set(true,true);

        this.bindEvent(type);

    },
    bindEvent(type){
        let _this = this;
        $('#submit').click(function(){
            qt.loading.show();
            //角色添加
            if(type==1){
                _this.addRole().then(rs=>{
                    qt.loading.hide();
                }).catch(e=>{
                    qt.loading.hide();
                    if(typeof e == 'string'){
                        qt.alert(e);
                    }
                });
            }
        });
    },

    //角色添加
    async addRole(){
        let val = await $('#val').get(0).checkPass();
        ajax.send([
            api.role_add({
                roleName:val
            })
        ]);

        await qt.alert('角色添加成功！');
        qt.closeWin();
    }


};


app.run(Page);