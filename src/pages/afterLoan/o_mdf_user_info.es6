

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
            api.order_get_byId({id:this.id})
        ]);
        let urgentApplyInfoList = data.urgentApplyInfoList??[];
        urgentApplyInfoList = urgentApplyInfoList[0]??{};
        let newData = {
            address:data.mainOrderApplyInfo?.address??'',
            mobile:data.mainOrderApplyInfo?.mobile??'',
            urgentMobile:urgentApplyInfoList.mobile??'',
            urgentName:urgentApplyInfoList.name??''
        };
        this.oldData = newData;
        all.setFromVal($('#form'),newData);
    },
    addEventBind(){
        let submit = $('#submit'),
            cancel = $('#cancel'),
            _this = this;

        submit.click(function(){
            all.showLoadingRun(_this,'submitFn',1);
        });
        cancel.click(function(){
            qt.closeWin();
        });
    },
    async submitFn(state){
        let form = await all.getFromGroupVal($('#form'));
        let changeText = all.getChangeData(this.oldData,form);
        form.orderNo = this.orderNo;

        await ajax.send([
            api.afterLoan_change_user_info(form)
        ]);

        if(changeText.length !=0 ){
            await ajax.send([
                api.order_change_submit({
                    changeInfo:changeText,
                    orderNo:this.orderNo,
                    type:2   // 类型 1-核行 2-贷后
                })
            ])
            qt.runParentJS('showText',changeText);
        }

        await qt.alert('修改成功！');
        qt.closeWin();
    }

};


app.run(Page);