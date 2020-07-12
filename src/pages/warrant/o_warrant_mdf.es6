



let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b_title1');
require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_money');
require('./../../es6/customElement/pc/input_file');



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
        inputStyle.set();
        this.addBtnEvent();
    },
    addBtnEvent(){
        let submit = $('#submit'),
            cancel = $('#cancel');

        submit.click(function(){
            console.log('submit')
        });
        cancel.click(function(){
            console.log('cancel')
        });
    }

};


app.run(Page);