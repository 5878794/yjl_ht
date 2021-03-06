



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


        await this.addFFXZ(data);


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
    async addFFXZ(data){
        //房屋现状 匹配订单中不动产抵押物数量
        let mainDy  =data.mainMortgagePropertyRight||null,
            fuDy = data.additionalMortgagePropertyRightList||[],  //category=1
            newData = [];
        if(mainDy){
            newData.push(mainDy);
        }
        fuDy.map(rs=>{
            if(rs.category == 1){
                newData.push(rs);
            }
        });


        let body = $('#roomState_body'),
            item = $('#room_info_item');

        if(newData.length == 0){
            body.append('<br/><div style="font-size:14px;" class="noDate box_hcc">无抵押物</div><br/>');
        }

        newData.map(rs=>{
           let _item = item.clone().attr({id:''});
           _item.find('b-title1').get(0).body.find('.titleName').text('房屋：'+rs.name);

           // 1:房抵
           if(this.orderType != 1){
               //非房抵 输入框为非必填
               _item.find('b-input').each(function(){
                    this.body.find('input').data({rule:''});
                    this.body.find('select').data({rule:''});
               });
               _item.find('b-input-money').each(function(){
                   this.body.find('input').data({rule:''});
               });
           }

           body.append(_item);
        });

        inputStyle.set(true,true);
        await selectData($('#form'));
    },

    async submitFn(state){
        let form = await all.getFromGroupVal($('#form')),
            uploaded = await all.uploadFile(form.attachUrls);

        form.attachUrls = uploaded.join(',');
        form.auditStatus = state;
        form.orderNo = this.orderNo;
        form.currentNodeKey = this.currentNodeKey;

        console.log(form)

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
    }
};





app.run(Page);