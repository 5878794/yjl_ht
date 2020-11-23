



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
require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_money');
require('./../../es6/customElement/pc/input_file');



let Page = {
    init(){
        all.showLoadingRun(this,'run');
    },
    async run(){
        inputStyle.set(true,true);
        let param = getParamFromUrl();
        this.id = param.id;
        this.orderNo = param.orderNo;
        this.currentNodeKey = param.currentNodeKey;



        await all.getUserInfo();



        let [data,history] = await ajax.send([
            api.order_get_byId({id:this.id}),
            api.order_get_history_byOrderNo({orderNo:this.orderNo})
        ]);

        await all.setOrderTopData(4,data);
        await all.setOrderHistoryData(history,true);

        //获取业务类型
        let businessType = data.businessKey;
        //额外增加获取产品时候的参数
        $('#productId').data({addParam:{productType :businessType}});
        //初始化select控件
        await selectData($('#form'));

        this.addBtnEvent();


        //垫资也选择产品咯
        // if(this.currentNodeKey != 'FANG_DI_JILING_AUDIT'){
        //     this.checkNeedProduct();
        // }else{
            this.addChangeEvent();
        // }

        //评估总价赋值
        let money = data.orderMortgageExtendAssessment||{};
        money = money.evaluationPrice??'';
        $('#orderMortgageExtendAssessment_evaluationPrice').get(0).value = money;


    },
    checkNeedProduct(){
        $('#choose_product').remove();
    },
    addChangeEvent(){
       let bSelect = $('#productId').get(0),
           dom = $('#productInfo'),
           info = dom.find('span');

       // console.log('start')
       //  console.log(bSelect);
       // bSelect.change = function(e){
       //     let selected = this.body.find('option:selected'),
       //         data = selected.data('data');
       //     data = data.data?? '';
       //     if(data){
       //         info.eq(0).text(moneyFormat(data.minMoney,5));
       //         info.eq(1).text(moneyFormat(data.maxMoney,5));
       //         info.eq(2).text(data.applyTime);
       //         info.eq(3).text(moneyFormat(data.castRate,5));
       //         info.eq(4).text(moneyFormat(data.castServiceRate,5));
       //         dom.removeClass('hidden');
       //     }else{
       //         // dom.addClass('hidden');
       //     }
       // };
       // console.log('end')
    },
    addBtnEvent(){
        let submit = $('#submit'),
            back = $('#back'),
            cancel = $('#cancel'),
            _this = this;

        submit.click(function(){
            all.showLoadingRun(all,'reviewSubmit',{
                formDom:$('#form'),
                orderNo:_this.orderNo,
                state:1,
                currentNodeKey:_this.currentNodeKey,
                uploadFile:async function(form){
                    let uploaded1 = await all.uploadFile(form.orderMortgageExtendAssessment_attachUrls),
                        uploaded2 = await all.uploadFile(form.orderMortgageExtendAssessment_mortgageReportUrls);

                    form.orderMortgageExtendAssessment = {
                        attachUrls:uploaded1.join(','),
                        mortgageReportUrls:uploaded2.join(','),
                        evaluationPrice:form.orderMortgageExtendAssessment_evaluationPrice
                    };
                    delete form.orderMortgageExtendAssessment_attachUrls;
                    delete form.orderMortgageExtendAssessment_mortgageReportUrls;
                    delete form.orderMortgageExtendAssessment_evaluationPrice;
                }
            });
            // all.showLoadingRun(_this,'submitFn','1');
        });
        back.click(function(){
            all.showLoadingRun(all,'reviewSubmit',{
                formDom:$('#form_bh'),
                orderNo:_this.orderNo,
                state:0,
                currentNodeKey:_this.currentNodeKey,
                // uploadFile:async function(form){
                //     let uploaded1 = await all.uploadFile(form.orderMortgageExtendAssessment_attachUrls),
                //         uploaded2 = await all.uploadFile(form.orderMortgageExtendAssessment_mortgageReportUrls);
                //
                //     form.orderMortgageExtendAssessment = {
                //         attachUrls:uploaded1.join(','),
                //         mortgageReportUrls:uploaded2.join(','),
                //         evaluationPrice:form.orderMortgageExtendAssessment_evaluationPrice
                //     };
                //     delete form.orderMortgageExtendAssessment_attachUrls;
                //     delete form.orderMortgageExtendAssessment_mortgageReportUrls;
                //     delete form.orderMortgageExtendAssessment_evaluationPrice;
                // }
            });
            // all.showLoadingRun(_this,'submitFn','0');
        });
        cancel.click(function(){
            qt.closeWin();
        });
    },
    async submitFn(state){
        let form = await all.getFromVal($('#form')),
            uploaded = await all.uploadFile(form.attachUrls),
            uploaded1 = await all.uploadFile(form.orderMortgageExtendAssessment_attachUrls),
            uploaded2 = await all.uploadFile(form.orderMortgageExtendAssessment_mortgageReportUrls);

        form.attachUrls = uploaded.join(',');
        form.auditStatus = state;
        form.orderNo = this.orderNo;
        form.currentNodeKey = this.currentNodeKey;



        console.log(form)

        await ajax.send([
            api.approve_room(form)
        ]);

        await qt.alert('提交成功!');
        qt.closeWin();

    }

};


app.run(Page);