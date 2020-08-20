


let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    all = require('./../../es6/all'),
    {ajax,api} = require('./../../es6/_ajax'),
    qt = require('./../../es6/qt'),
    pageSizeSetting = require('./../../es6/pageSize'),
    getParamFromUrl = require('./../../es6/lib/fn/getParamFromUrl'),
    winSetting = require('./../../es6/winSetting'),
    tableSet = require('./../../es6/tableSetting'),
    selectData = require('./../../es6/selectData'),
    moneyFormat = require('./../../es6/lib/fn/number'),
    stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
    inputStyle = require('./../../es6/inputStyle');




require('./../../es6/yjl/b_order_info');
require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b-order-history');



let Page = {
    init(){
        all.showLoadingRun(this,'run');
    },
    async run(){
        let param = getParamFromUrl();
        this.id = param.id;
        this.orderNo = param.orderNo;

        this.addBtnEvent();
        await all.getUserInfo();

        let [data,history] = await ajax.send([
            api.order_get_byId({id:this.id}),
            api.order_get_history_byOrderNo({orderNo:this.orderNo})
        ]);

        //绑定订单信息
        await all.setOrderTopData(3,data);
        //绑定订单历史记录
        await all.setOrderHistoryData(history);


    },
    addBtnEvent(){
        let btn = $('#submit');
        btn.click(function(){
           qt.closeWin();
        });
    }

};


app.run(Page);