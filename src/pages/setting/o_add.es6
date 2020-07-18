
//通用添加名称页面
// 参数传入输入框的name 和页面type


let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
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

        let input = $('b-input').eq(0).get(0);
        input.nameDom.text(name);

        inputStyle.set(true,true);

    }


};


app.run(Page);