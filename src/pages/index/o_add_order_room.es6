



let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    all = require('./../../es6/all'),
    {ajax,api} = require('./../../es6/_ajax'),
    qt = require('./../../es6/qt'),
    bTitleBtn = require('./../../es6/b_title_btn'),
    getParamFromUrl = require('./../../es6/lib/fn/getParamFromUrl'),
    pageSizeSetting = require('./../../es6/pageSize'),
    selectData = require('./../../es6/selectData'),
    winSetting = require('./../../es6/winSetting'),
    moneyFormat = require('./../../es6/lib/fn/number'),
    watchDom = require('./../../es6/lib/fn/watchDom'),
    tableSet = require('./../../es6/tableSetting'),
    stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
    inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b_order_info');
require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b_title1');
require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_money');
require('./../../es6/customElement/pc/input_date');



let Page = {
    init(){
        all.showLoadingRun(this,'run');
    },
    async run(){
        inputStyle.set(true,true);
        this.createBTitlesBtn();
        let param = getParamFromUrl();
        this.id = param.id;

        await all.getUserInfo();
        await selectData($('#form'));

        //获取订单详情
        let [data,zxfl] = await ajax.send([
            api.order_get_byId({id:this.id}),
            api.setting_config_list({type:20})
        ]);
        this.orderNo = data.orderNo;
        this.orderData = data;

        zxfl = zxfl[0]??{};
        zxfl = zxfl.children??[];
        zxfl = zxfl[0]??{};
        zxfl = zxfl.value;
        this.zxfl = zxfl;

        this.btnEventBind();
        await this.backDataToForm(data);
        this.inputEventBind2();
        await all.setOrderTopData(2,data);

    },
    btnEventBind(){
        let _this = this;
        $('#pre').click(function(){
            qt.openPage(
                '../index/o_add_order_info.html?id='+_this.id,
                winSetting.index_add_step2.width,
                winSetting.index_add_step2.height)
        });
        $('#next').click(function(){
            all.showLoadingRun(_this,'submitFn');
        });
    },
    createBTitlesBtn(){
        bTitleBtn.addLevel2BtnFn(
            $('#additional_mortgage').get(0),
            $('#additional_mortgage_body'),
            $('#additional_mortgage_item1'),
            $('#additional_mortgage_item2')
        );
    },
    inputEventBind2(){
        let //借款额度
            applyMoney = this.orderData?.applyMoney??0,
            //逾期费率
            dom_yqfl = $('#orderRateInfo_overdueRate').get(0),
            //用款时间
            dom_date = $('#orderRateInfo_period').get(0),
            //咨询费
            dom_zxf = $('#orderRateInfo_consultationFee').get(0),
            //权证费
            dom_qzf = $('#orderRateInfo_warrantFee').get(0),
            //优惠费
            dom_yhf = $('#orderRateInfo_preferentialFee').get(0),
            //合计
            dom_total = $('#orderRateInfo_totalCost').get(0),
            //咨询费率
            dom_zxfl = $('#orderRateInfo_consultationRate').get(0),
            _this = this;


        let fn = function(){
            // 咨询费率（管理员配置，%，只读）
            dom_zxfl.value = moneyFormat(_this.zxfl,2);
            // 逾期费率（固定0.15%,按日计算当期应还金额）、
            dom_yqfl.value = 0.15;
            // 咨询费（申请金额*用款时间*咨询费率，不低于3000）、
            let advisoryMoney =  applyMoney*dom_date.value*30*dom_zxfl.value/100;
            advisoryMoney = (advisoryMoney<3000)? 3000 : advisoryMoney;
            dom_zxf.value = moneyFormat(advisoryMoney,5);
            // 费用合计、
            let total = dom_zxf.value*1 + dom_qzf.value*1 - dom_yhf.value*1;
            dom_total.value = moneyFormat(total,5);
        };
        fn();

        dom_date.change = function(){fn();};
        dom_qzf.change = function(){fn();};
        dom_yhf.change = function(){fn();};
    },
    async backDataToForm(data){
        //用款时间 天转周期
        let number = data.orderRateInfo?.period??0;
        if(number){
            data.orderRateInfo.period = parseInt(number/30);
        }
        //处理对象中 子元素是对象的键
        for(let [key,val] of Object.entries(data)){
            if($.isObject(val)){
                for(let [key1,val1] of Object.entries(val)){
                    data[key+'_'+key1] = val1;
                }
            }
        }

        //处理动产 不动产数据
        let tempData = data.additionalMortgagePropertyRightList??[],
            dcData = [],
            bdcData = [];
        tempData.map(rs=>{
            //不动产
            if(rs.category == 1){bdcData.push(rs);}
            //动产
            if(rs.category == 2){dcData.push(rs);}
        });
        data.additionalMortgagePropertyRightList1 = bdcData;
        data.additionalMortgagePropertyRightList2 = dcData;

        //赋值
        await all.setFromGroupVal($('#form'),data);
    },
    async submitFn(){

        //获取表单数据
        let form = await all.getFromGroupVal($('#form'));
        form = all.handlerFromDataByObj(form);
        //用款时间转天
        let number = form.orderRateInfo?.period??0;
        form.orderRateInfo.period = number*30;

        form.additionalMortgagePropertyRightList1 = form.additionalMortgagePropertyRightList1??[];
        form.additionalMortgagePropertyRightList2 = form.additionalMortgagePropertyRightList2??[];
        form.additionalMortgagePropertyRightList = form.additionalMortgagePropertyRightList1?.concat(form.additionalMortgagePropertyRightList2);
        delete form.additionalMortgagePropertyRightList1;
        delete form.additionalMortgagePropertyRightList2;
        form.id = this.id;
        form.orderNo = this.orderNo;

        await ajax.send([
            api.order_add_step3(form)
        ]);

        await qt.alert('保存成功!');
        qt.openPage(
            '../index/o_add_order_view.html?id='+this.id+'&state=1',
            winSetting.index_add_step4.width,
            winSetting.index_add_step4.height
        );
    }

};


app.run(Page);