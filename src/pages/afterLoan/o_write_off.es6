
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

        let [data] = await ajax.send([
            api.afterLoan_write_off_info({orderNo:this.orderNo})
        ]);
        data.heXiaoInterest = 0;
        data.heXiaoPrincipal = 0;
        all.setFromVal($('#form'),data);

        this.bindInput();

    },
    bindInput(){
        let input1 = $('#heXiaoInterest').get(0),
            input2 = $('#heXiaoPrincipal').get(0);

        let setFn = function(){
            let val1 = input1.value,
                val2 = input2.value,
                total = val1*1 + val2*1;
            console.log(val1,val2,total)

            $('#sy').text(moneyFormat(total,5));
        };


        input1.change = function(){
            setFn();
        };
        input2.change = function(){
            setFn();
        };


    },
    addEventBind(){
        let submit = $('#submit'),
            back = $('#back'),
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
        back.click(function(){
            all.showLoadingRun(all,'reviewSubmit',{
                formDom:$('#form'),
                orderNo:_this.orderNo,
                state:0,
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
    //
    //     form.attachUrls = uploaded.join(',');
    //     form.auditStatus = state;
    //     form.orderNo = this.orderNo;
    //     form.currentNodeKey = this.currentNodeKey;
    //
    //
    //     let {api} = await processToPageDist(this.currentNodeKey);
    //
    //     await ajax.send([
    //         nodeKeySubmit(api,form)
    //     ]);
    //
    //     await qt.alert('操作成功!');
    //     qt.closeWin();
    // }

};


app.run(Page);