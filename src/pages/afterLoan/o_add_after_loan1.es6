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



require('./../../es6/yjl/b_order_info');
require('./../../es6/yjl/b-order-history');
require('./../../es6/yjl/b_title');
require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_file');
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
        inputStyle.set(true,true);
        this.addEventBind();
        await all.getUserInfo();

        let [data2,history,info] = await ajax.send([
            api.order_get_byId({id:this.id}),
            api.order_get_history_byOrderNo({orderNo:this.orderNo}),
            api.afterLoan_pay_info({orderNo:this.orderNo})
        ]);
        await all.setOrderTopData(4,data2);
        await all.setOrderHistoryData(history,true);

        this.bindData(info);
    },
    bindData(data){
        $('#disburseMoney_').get(0).value = moneyFormat(data.disburseMoney,2);
        $('#auditOpinion_').get(0).value = data.auditOpinion;


        let files = data.attachUrls??'';
        if(files){
            files = all.getRealImageSrc(files);
            $('#attachUrls_').get(0).showFiles = files;
        }
        $('#attachUrls_').get(0).disabled = 'disabled'
    },
    addEventBind(){
        let submit = $('#submit'),
            cancel = $('#cancel'),
            _this = this;

        submit.click(function(){
            all.showLoadingRun(all,'reviewSubmit',{
                formDom:$('#form'),
                orderNo:_this.orderNo,
                state:1,
                currentNodeKey:_this.currentNodeKey
            });
        });
        cancel.click(function(){
            qt.closeWin();
        });
    }
    // ,
    // async submitFn(state){
    //     let form = await all.getFromVal($('#form')),
    //         uploaded = await all.uploadFile(form.attachUrls);
    //     form.attachUrls = uploaded.join(',');
    //
    //     form.auditStatus = state;
    //     form.orderNo = this.orderNo;
    //     form.currentNodeKey = this.currentNodeKey;
    //
    //     let val = form.disburseMoney,
    //         nowDate = new Date().getTime();
    //     nowDate = stamp2Date.getDate1(nowDate);
    //     let change = `${nowDate},${window.userName}添加贷后支出金额为"${val}"`;
    //     await ajax.send([
    //         api.order_change_submit({
    //             changeInfoList:[change],
    //             orderNo:this.orderNo,
    //             type:2   // 类型 1-核行 2-贷后
    //         }),
    //         api.afterLoan_add_expenditure(form)
    //     ]);
    //     qt.runParentJS('showText',[change]);
    //
    //     await qt.alert('操作成功!');
    //     qt.closeWin();
    // }

};


app.run(Page);