


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
require('./../../es6/customElement/pc/input_file');



let Page = {
    init(){
        all.showLoadingRun(this,'run');
    },
    async run(){
        inputStyle.set(true,true);
        this.createBTitlesBtn();
        let param = getParamFromUrl();
        this.id = param.id;
        this.type =param.type;
        this.checkType();



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
        this.inputEventBind1();
        this.inputEventBind2();
        await all.setOrderTopData(2,data);


        //判断是否有抵押信息，没有就增加一条
        let tempBody = $('#mortgage_info_body');
        if(tempBody.children().length == 0){
            $('#mortgage_info').get(0).body.find('.btn').trigger('click');
        }


        this.addAutoInputEvent();
    },
    addAutoInputEvent(){
        let input1 = $('#orderReturnRepayment_bankName').get(0),
            input2 = $('#orderReturnRepayment_bankNo').get(0),
            input3 = $('#orderReturnRepayment_openBank').get(0),
            set1 = $('#sellerBankSupervision_bankName').get(0),
            set2 = $('#sellerBankSupervision_bankNo').get(0),
            set3 = $('#sellerBankSupervision_openBank').get(0);

        input1.changeOnInput = function(val){
            set1.value = val;
        }
        input2.changeOnInput = function(val){
            set2.value = val;
        }
        input3.changeOnInput = function(val){
            set3.value = val;
        }

    },
    createBTitlesBtn(){
        bTitleBtn.addChildDelFn(
            $('#mortgage_info').get(0),
            $('#mortgage_info_body'),
            $('#mortgage_info_item'),
            true
        );

        bTitleBtn.addDelFn(
            $('#room_info').get(0),
            $('#room_info_body'),
            $('#room_info_item')
        );

        bTitleBtn.addLevel2BtnFn(
            $('#additional_mortgage').get(0),
            $('#additional_mortgage_body'),
            $('#additional_mortgage_item1'),
            $('#additional_mortgage_item2')
        );
    },
    checkType(){
        let type = this.type;

        if(type == 3){
            //非交易垫资 没有这些
            $('.__fdz_no__').remove();

        }
    },
    //数据回填
    async backDataToForm(data){
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


        //处理文件
        //评估信息
        let files = data.orderMortgageExtendAssessment?.attachUrls??'';
        if(files){
            files = all.getRealImageSrc(files);
            $('#orderMortgageExtendAssessment_attachUrls').get(0).showFiles = files;
        }
        //抵押信息
        let dyData = data.orderMortgageExtendMortgageList??[],
            doms = $('#mortgage_info_body').find('b-input-file');
        dyData.map((rs,i)=>{
            let thisFiles = rs.attachUrls??'';
            thisFiles = all.getRealImageSrc(thisFiles);
            doms.eq(i).get(0).showFiles = thisFiles;
        })
    },
    //自动计算部分 垫资比例计算
    inputEventBind1(){
        //垫资比例计算
        let body = $('#dzbl'),
            val1Dom = body.find('.__data1'),
            val2Dom = body.find('.__data2'),
            val3Dom = body.find('.__data3'),
            val4Dom = body.find('.__data4'),
            mainDom = $('#orderMortgageExtendAssessment_evaluationPrice'),
            listenerDom = $('#additional_mortgage_body'),
            val1 = this.orderData?.applyMoney??0,
            val2,
            val3;

        val1Dom.text(moneyFormat(val1,5));     //贷款金额
        // val2Dom.text('0.00000');    //主抵押物品
        // val3Dom.text('0.00000');    //副抵押物品
        // val4Dom.text(moneyFormat(val1/100,5));             //比率



        //主抵押物
        let changeFn1 = function(){
            let val = mainDom.get(0).value;
            //万元转元
            val = val*10000;
            val2 = val;
            val2Dom.text(moneyFormat(val,5));
            changeFn2();
        };

        //副抵押物
        let changeFn = function(){
            let total = 0;
            listenerDom.find('b-input-money[key="evaluationValue"]').each(function(){
                let value = this.value * 1;
                total = total + value;
            });
            //万元转元
            total = total * 10000;
            val3 = total;
            val3Dom.text(moneyFormat(total,5));
            changeFn2();
        };
        //计算平均值
        let changeFn2 = function(){
            let val = val1/(val2+val3)*100 || 0;
            val4Dom.text(moneyFormat(val,5)+'%');
        }

        changeFn1();
        changeFn();


        //监听 动产 不动产 变动
        watchDom(listenerDom.get(0),function(e){
            e = e[0];
            if(e.addedNodes.length != 0){
                //添加dom
                for(let i=0,l=e.addedNodes.length;i<l;i++){
                    let thisDom = e.addedNodes[i];
                    thisDom = $(thisDom).find('b-input-money[key="evaluationValue"]').eq(0).get(0);
                    if(thisDom){
                        thisDom.change = function(){
                            changeFn();
                        }
                    }
                }
            }
        })
        //主抵押物
        mainDom.get(0).change = changeFn1;


    },
    //自动计算部分 费用部分
    inputEventBind2(){
        let //咨询费率
            dom_zxfl = $('#orderRateInfo_consultationRate').get(0),
            //用款时间
            dom_date = $('#orderRateInfo_period').get(0),
            //咨询费
            dom_zxf = $('#orderRateInfo_consultationFee').get(0),
            //服务费率
            dom_fwfl = $('#orderRateInfo_serviceRate').get(0),
            //服务费
            dom_fwf = $('#orderRateInfo_serviceFee').get(0),
            //权证费
            dom_qzf = $('#orderRateInfo_warrantFee').get(0),
            //优惠费
            dom_yhf = $('#orderRateInfo_preferentialFee').get(0),
            //合计
            dom_total = $('#orderRateInfo_totalCost').get(0),
            _this = this;



        let run = function(){
            //费用部分
            // 咨询费率（管理员配置，%，只读）
            dom_zxfl.value = moneyFormat(_this.zxfl,2);

            // 咨询费（申请金额*用款时间*咨询费率，不低于3000）、
            let applicationMoney = _this.orderData?.applyMoney??0,
                advisoryMoney =  applicationMoney*dom_date.value*dom_zxfl.value/100;
            advisoryMoney = (advisoryMoney<3000)? 3000 : advisoryMoney;
            dom_zxf.value = moneyFormat(advisoryMoney,5);

            // 服务费（申请金额*用款时间*服务费率）、
            let serviceFee = applicationMoney*dom_date.value*dom_fwfl.value/100;
            dom_fwf.value = moneyFormat(serviceFee,5);

            //费用合计
            let total = dom_zxf.value*1 + dom_fwf.value*1 + dom_qzf.value*1 - dom_yhf.value*1;
            dom_total.value = moneyFormat(total,5);
        }
        run();

        dom_date.change = function(){run();};
        dom_qzf.change = function(){run();};
        dom_yhf.change = function(){run();};
        dom_fwfl.change = function(){run();};
    },
    btnEventBind(){
        let _this = this;
        $('#pre').click(function(){
            qt.openPage(
                '../index/o_add_order_info.html?id='+_this.id,
                winSetting.index_add_step2.width,
                winSetting.index_add_step2.height);
            qt.closeWin();
        });
        $('#next').click(function(){
            all.showLoadingRun(_this,'submitFn');
        });
    },
    async submitFn(){
        //获取表单数据
        let form = await all.getFromGroupVal($('#form'));
        form = all.handlerFromDataByObj(form);
        form.additionalMortgagePropertyRightList1 = form.additionalMortgagePropertyRightList1??[];
        form.additionalMortgagePropertyRightList2 = form.additionalMortgagePropertyRightList2??[];
        form.additionalMortgagePropertyRightList = form.additionalMortgagePropertyRightList1?.concat(form.additionalMortgagePropertyRightList2);
        delete form.additionalMortgagePropertyRightList1;
        delete form.additionalMortgagePropertyRightList2;
        form.id = this.id;
        form.orderNo = this.orderNo;

        //处理文件及上传
        //评估信息文件
        let pg_files = form.orderMortgageExtendAssessment.attachUrls;
        pg_files = await all.uploadFile(pg_files);
        form.orderMortgageExtendAssessment.attachUrls = pg_files.join(',');
        //抵押 文件
        form.orderMortgageExtendMortgageList = form.orderMortgageExtendMortgageList??[];
        for(let i=0,l=form.orderMortgageExtendMortgageList.length;i<l;i++){
            let this_files = form.orderMortgageExtendMortgageList[i].attachUrls;
            this_files = await all.uploadFile(this_files);
            form.orderMortgageExtendMortgageList[i].attachUrls = this_files.join(',');
        }


        await ajax.send([
            api.order_add_step3(form)
        ]);

        await qt.alert('保存成功!');
        qt.openPage(
            '../index/o_add_order_view.html?id='+this.id+'&state=1',
            winSetting.index_add_step4.width,
            winSetting.index_add_step4.height
        );
        qt.closeWin();

    }


};


app.run(Page);