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
require('./../../es6/yjl/b_follow_record');
require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b_title1');
require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_date');
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
        this.clientCategory = param.clientCategory;//客户分类
        this.addBtnEvent();

        await all.getUserInfo();
        this.clientCategoryDist = await selectData('clientType',true);
        this.createBTitlesBtn();


        let [data,changeList,record] = await ajax.send([
            api.order_get_byId({id:this.id}),
            api.order_change_list({
                orderNo:this.orderNo,
                type:2
            }),
            api.afterLoan_follow_up_list({
                orderNo:this.orderNo
            })
        ]);
        await all.setOrderTopData(4,data);
        await all.setRecordData(record);

        //TODO
        changeList = ['2020年4月11日,李强将还款账号从12312312903812098390138修改为123910938129831283']
        this.addHistory(changeList);

    },
    addBtnEvent(){
        let submit = $('#submit'),
            cancel = $('#cancel'),
            date = $('.__date__'),
            _this = this;

        let nowData = new Date().getTime();
        nowData = stamp2Date.getDate1(nowData);
        date.eq(0).get(0).value = nowData;

        submit.click(function(){
            all.showLoadingRun(_this,'submitFn',1);
        });
        cancel.click(function(){
            qt.closeWin();
        });
    },
    createBTitlesBtn(){
        let btn = $('#mdf').get(0),
            _this = this;

        let type = this.clientCategory,
            dist = this.clientCategoryDist,
            newDist = [];

        dist.map(rs=>{
            let name = (rs.value == type)? rs.name+'(当前)' : rs.name;

            newDist.push({
                name:name,
                type:rs.value
            });
        });
        newDist.shift();


        btn.btnData = [
            {name:'变更客户资料', type:'btn1', style:{color:'#5576f0'}},
            {name:'变更还款账号', type:'btn2', style:{color:'#5576f0'}},
            {name:'新增贷后支出', type:'btn3', style:{color:'#5576f0'}},
            {name:'核销', type:'btn4', style:{color:'#5576f0'}},
            {name:'展期', type:'btn5', style:{color:'#5576f0'}},
            {name:'客户分类', style:{color:'#5576f0'},children:newDist}
        ];



        btn.clickFn = async function(type){
            if(type=='btn1'){
                //变更客户资料
                qt.openPage(
                    `./o_mdf_user_info.html?id=${_this.id}&orderNo=${_this.orderNo}&currentNodeKey=${_this.currentNodeKey}&clientCategory=${_this.clientCategory}`,
                    winSetting.o_mdf_user_info.width,
                    winSetting.o_mdf_user_info.height)
                return;
            }

            if(type=='btn2'){
                //变更还款账号
                qt.openPage(
                    `./o_mdf_repayment_account.html?id=${_this.id}&orderNo=${_this.orderNo}&currentNodeKey=${_this.currentNodeKey}&clientCategory=${_this.clientCategory}`,
                    winSetting.o_mdf_repayment_account.width,
                    winSetting.o_mdf_repayment_account.height)
                return;
            }

            if(type=='btn3'){
                //新增贷后支出
                qt.openPage(
                    `./o_add_after_loan.html?id=${_this.id}&orderNo=${_this.orderNo}&currentNodeKey=${_this.currentNodeKey}&clientCategory=${_this.clientCategory}`,
                    winSetting.o_add_after_loan.width,
                    winSetting.o_add_after_loan.height)
                return;
            }

            if(type=='btn4'){
                //核销
                qt.openPage(
                    `./o_write_off.html?id=${_this.id}&orderNo=${_this.orderNo}&currentNodeKey=${_this.currentNodeKey}&clientCategory=${_this.clientCategory}`,
                    winSetting.o_write_off.width,
                    winSetting.o_write_off.height)
                return;
            }

            if(type=='btn5'){
                //展期
                qt.openPage(
                    `./o_rollover.html?id=${_this.id}&orderNo=${_this.orderNo}&currentNodeKey=${_this.currentNodeKey}&clientCategory=${_this.clientCategory}`,
                    winSetting.o_rollover.width,
                    winSetting.o_rollover.height)
                return;
            }

            //客户分类
            all.showLoadingRun(_this,'submitClientType',type);

        };
    },
    //提交客户分类
    async submitClientType(type){
        if(type == this.clientCategory){return;}

        await ajax.send([
            api.afterLoan_change_user_type({
                orderNo:this.orderNo,
                category:type
            })
        ]);

        let date = new Date().getTime();
        date = stamp2Date.getDate1(date);
        let changeText =  `${date},${window.userName}将客户分类从 "${this.clientCategory??'无'}"修改为"${type}"`;

        await ajax.send([
            api.order_change_submit({
                changeInfoList:[changeText],
                orderNo:this.orderNo,
                type:2   // 类型 1-核行 2-贷后
            })
        ])

        //界面显示历史记录
        this.addHistory([changeText]);
        await qt.alert('操作成功！');

        this.clientCategory = type;
        this.createBTitlesBtn();
    },
    async submitFn(state){
        let form = await all.getFromGroupVal($('#form')),
            uploaded = await all.uploadFile(form.attachUrls);
        form.attachUrls = uploaded.join(',');

        form.auditStatus = state;
        form.orderNo = this.orderNo;
        form.currentNodeKey = this.currentNodeKey;


        await ajax.send([
           api.afterLoan_follow_up_save(form)
        ]);

       await qt.alert('保存成功!');
       qt.closeWin();
    },
    addHistory(data){
        let body = $('#window_add');

        data.map(rs=>{
            let p = $('<p>'+rs+'</p>');
            body.append(p);
        });
    }

};
window.showText = function(text){
    text = JSON.parse(text);
    Page.addHistory([text]);
};


app.run(Page);