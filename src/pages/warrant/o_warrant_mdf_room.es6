



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
        this.orderType = data.businessKey;

        await all.setOrderTopData(4,data);
        await all.setOrderHistoryData(history,true);


        if(this.orderType == 1){
            //房抵

        }else{
            //非房抵 显示核行
            $('#fd_not').removeClass('hidden');
            let [changeData] = await ajax.send([
               api.order_change_list({
                   type:1,      //1-核行修改 2-变更客户资料 3-变更还款账号
                   orderNo:this.orderNo
               })
            ]);

            let newData = [];
            changeData.map(rs=>{
                newData.push(rs.changeInfo);
            })
            this.addHistory(newData);
        }


        this.createBTitlesBtn();
        this.addBtnEvent();
    },
    addBtnEvent(){
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
    createBTitlesBtn(){
        let bTitle = $('#approved').get(0),
            _this = this;

        bTitle.btnData = [
            {
                name:'核行修改',
                type:'mdf',
                style:{color:'#5576f0'}
            }
        ];
        bTitle.clickFn = function(){
            qt.openPage(
                `../warrant/o_warrant_mdf.html?id=${_this.id}&orderNo=${_this.orderNo}&currentNodeKey=${_this.currentNodeKey}&type=${_this.orderType}`,
                winSetting.publish_review.width,
                winSetting.publish_review.height)
        };

        bTitleBtn.addDelFn(
            $('#shimoto').get(0),
            $('#shimoto_body'),
            $('#shimoto_item')
        )
    },
    async submitFn(state){
        let form = await all.getFromVal($('#form')),
            uploaded = await all.uploadFile(form.attachUrls),
            uploaded2 = await all.uploadFile(form.attachUrls2);

        form.attachUrls = uploaded.join(',');
        form.attachUrls2 = uploaded2.join(',');
        form.auditStatus = state;
        form.orderNo = this.orderNo;
        form.currentNodeKey = this.currentNodeKey;



        if(this.orderType == 1){
            //房抵
            await ajax.send([
                api.warrant_shimoto_room(form)
            ])
        }else{
            //垫资、非垫资
            await ajax.send([
                api.warrant_shimoto_dz(form)
            ])
        }

        await qt.alert('提交成功!');
        qt.closeWin();
    },

    addHistory(data){
        let body = $('#window_add');

        data.map(rs=>{
            let item = $('<div class="box_slc approve_room" style="font-size:14px;"></div>');
            let p = $('<p>'+rs+'</p>');
            item.append(p);
            body.append(item);
        });
    }
};


window.showText = function(text){
    // text = JSON.parse(text);
    Page.addHistory([text]);
};


app.run(Page);