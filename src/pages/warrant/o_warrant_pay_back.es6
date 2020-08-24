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
    bTitleBtn = require('./../../es6/b_title_btn'),
    inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b_title1');
require('./../../es6/yjl/b_order_info');
require('./../../es6/yjl/b-order-history');
require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_money');
require('./../../es6/customElement/pc/input_file');



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
        await all.getUserInfo();

        this.createBTitlesBtn();
        this.addBtnEvent();
        this.addInputEvent();

        let [data,history] = await ajax.send([
            api.order_get_byId({id:this.id}),
            api.order_get_history_byOrderNo({orderNo:this.orderNo})
        ]);
        this.orderType = data.businessKey;

        await all.setOrderTopData(4,data);
        await all.setOrderHistoryData(history,true);

    },
    addBtnEvent(){
        let submit = $('#submit'),
            cancel = $('#cancel'),
            _this = this;

        submit.click(function(){
            all.showLoadingRun(_this,'submitFn',1)
        });
        cancel.click(function(){
            qt.closeWin();
        });
    },
    createBTitlesBtn(){
        bTitleBtn.addDelFn(
            $('#final_payment').get(0),
            $('#final_payment_body'),
            $('#final_payment_item')
        )
    },
    addInputEvent(){
        let total = $('#total'),
            moneyInput = $('#form').find('b-input-money'),
            setFn = function(){
                let val = 0;
                moneyInput.each(function(){
                    val += this.value*1;
                });
                total.text(moneyFormat(val,5));
            };

        moneyInput.each(function(){
            this.change = function(){
                setFn();
            };
        })

    },
    async submitFn(state){
        let form = await all.getFromVal($('#form')),
            uploaded = await all.uploadFile(form.attachUrls);

        form.attachUrls = uploaded.join(',');
        form.auditStatus = state;
        form.orderNo = this.orderNo;
        form.currentNodeKey = this.currentNodeKey;

        //TODO pug中的key 数据提交

        // await ajax.send([
        //     api.approve_advance(form)
        // ]);
        // await qt.alert('提交成功！');
        // qt.closeWin();
    }

};


app.run(Page);