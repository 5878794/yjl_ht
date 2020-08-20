

let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    all = require('./../../es6/all'),
    {ajax,api} = require('./../../es6/_ajax'),
    qt = require('./../../es6/qt'),
    pageSizeSetting = require('./../../es6/pageSize'),
    winSetting = require('./../../es6/winSetting'),
    tableSet = require('./../../es6/tableSetting'),
    stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
    moneyFormat = require('./../../es6/lib/fn/number'),
    getParamFormUrl = require('./../../es6/lib/fn/getParamFromUrl'),
    selectData = require('./../../es6/selectData'),
    inputStyle = require('./../../es6/inputStyle');




require('./../../es6/customElement/pc/input');



let Page = {
    init(){
        all.showLoadingRun(this,'run');
    },
    id:null,
    async run(){
        let param =getParamFormUrl();
        this.id = param.id;

        inputStyle.set();
        this.bindEvent();

        await all.getUserInfo();
    },
    bindEvent(){
        let btn = $('#submit'),
            _this = this;

        btn.click(function(){
            all.showLoadingRun(_this,'submit');
        });


    },
    async submit(){
        let info = await $('#info').get(0).checkPass();

        await ajax.send([
            api.my_order_del({
                id:this.id,
                deletedReason:info
            })
        ]);


        await qt.alert('删除成功!');
        qt.closeWin();
    }
};


app.run(Page);