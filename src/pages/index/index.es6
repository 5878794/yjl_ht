let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib');

require('./../../es6/all');


require('./../../es6/customElement/pc/input_search');
//     // device = require('./lib/device'),
//     // getParamFromUrl = require('./lib/fn/getParamFromUrl'),
//     loadFn = require('./../../es6/lib/ui/loading_old'),
//     // $$ = require('./lib/event/$$'),
//     // info = require('./lib/ui/info'),
//     // s2t = require('./lib/fn/timeAndStamp'),
//     // areaData = require('./lib/code/areaCode'),
//     // {ajax,api} = require('./_ajax'),
//     err = require('./../../es6/lib/fn/errorHandler');
//


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

    }
};


app.run(Page);