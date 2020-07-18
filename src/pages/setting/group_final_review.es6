let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    tableSet = require('./../../es6/tableSetting'),
    inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b_title');
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
        this.setInputNameStyle();



    },
    setInputNameStyle(){
        inputStyle.set();

        let dom = $('b-input-money');
        dom.each(function(){
            this.nameStyle = {fontFamily:'SourceHanSansSC'};
        })
    }
};


app.run(Page);