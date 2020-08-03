



let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    inputStyle = require('./../../es6/inputStyle');




require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_date');
require('./../../es6/customElement/pc/input_file');
require('./../../es6/customElement/pc/input_search');
require('./../../es6/customElement/pc/input_money');



let loading;
let Page = {
    init(){
        qt.loading.show('急速加载中');
        this.run().then(rs=>{
            qt.loading.hide();
        }).catch(rs=>{
            // err.error(rs);
            qt.loading.hide();
            qt.alert(rs);
            // throw rs;
        });
    },
    async run(){
        inputStyle.set(true,true);

    }


};


app.run(Page);