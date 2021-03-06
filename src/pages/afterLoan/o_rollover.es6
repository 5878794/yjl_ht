

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
    processToPageDist = require('./../../es6/processToPage'),
    inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b_title');
require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_money');



let Page = {
    init(){
        all.showLoadingRun(this,'run');
    },
    async run(){
        let param = getParamFromUrl();
        this.id = param.id;
        this.orderNo = param.orderNo;
        this.currentNodeKey = param.currentNodeKey;
        inputStyle.set();
        this.addEventBind();
        await all.getUserInfo();

        let [data] = await ajax.send([
            api.afterLoan_rollover_info({orderNo:this.orderNo})
        ]);

        let startDate = stamp2Date.getDate1(data.loanTime) || '无数据',
            endDate = stamp2Date.getDate1(data.expireTime) || '无数据';
        this.bindPageData(startDate,endDate);

    },
    bindPageData(startDate,endDate){
        $('#fk_date').text(startDate);
        $('#dq_date').text(endDate);
        $('#end_date').text(endDate);
    },
    addEventBind(){
        let submit = $('#submit'),
            cancel = $('#cancel'),
            bInput = $('#exhibitionPeriod').get(0),
            startDate = $('#dq_date'),
            endDate = $('#end_date'),
            dayStamp = 1000*60*60*24,
            _this = this;

        bInput.change = function(val){
            let startStamp = startDate.text();
            startStamp = new Date(startStamp).getTime();
            let endStamp = startStamp + parseInt(val)*dayStamp;
            endStamp = stamp2Date.getDate1(endStamp);
            endDate.text(endStamp);
        };

        submit.click(function(){
            all.showLoadingRun(_this,'submitFn',1);
        });
        cancel.click(function(){
            qt.closeWin();
        });
    },
    async submitFn(state){
        let form = await all.getFromGroupVal($('#form'));
        form.auditStatus = state;
        form.orderNo = this.orderNo;
        form.currentNodeKey = this.currentNodeKey;

        await ajax.send([
            api.afterLoan_rollover(form)
        ]);

        await qt.alert('操作成功!');
        qt.closeWin();
    }

};


app.run(Page);