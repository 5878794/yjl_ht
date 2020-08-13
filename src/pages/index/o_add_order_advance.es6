


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
        let [data] = await ajax.send([
            api.order_get_byId({id:this.id})
        ]);
        this.orderNo = data.orderNo;
        this.orderData = data;
        console.log(data);


        this.btnEventBind();
        await this.backDataToForm(data);
        this.inputEventBind1();
        this.inputEventBind2();
        await all.setOrderTopData(2,data);

    },
    createBTitlesBtn(){
        bTitleBtn.addChildDelFn(
            $('#mortgage_info').get(0),
            $('#mortgage_info_body'),
            $('#mortgage_info_item')
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

    },
    //自动计算部分 垫资比例计算
    inputEventBind1(){
        //垫资比例计算
        let body = $('#dzbl'),
            val1Dom = body.find('.__data1'),
            val2Dom = body.find('.__data2'),
            val3Dom = body.find('.__data3'),
            val1 = moneyFormat(this.orderData.applyMoney,5);

        val1Dom.text(val1);

        //主抵押物
        $('#orderMortgageExtendAssessment_evaluationPrice').get(0).change = function(val){
            console.log(val);
        }

    },
    //自动计算部分 费用部分
    inputEventBind2(){
        //费用部分

    },
    btnEventBind(){
        let _this = this;
        $('#pre').click(function(){
            qt.openPage(
                './o_add_order_info.html?id='+_this.id,
                winSetting.index_add_step2.width,
                winSetting.index_add_step2.height)
        });
        $('#next').click(function(){
            all.showLoadingRun(_this,'submitFn');
        });
    },
    async submitFn(){
        //TODO temp
        $('#mortgage_info').get(0).body.find('.btn').trigger('click');
        $('#mortgage_info').get(0).body.find('.btn').trigger('click');
        $('#room_info').get(0).body.find('.btn').trigger('click');
        $('#additional_mortgage').get(0).body.find('div[type="btn1"]').trigger('click');
        $('#additional_mortgage').get(0).body.find('div[type="btn2"]').trigger('click');
        await all.sleep(1000);
        all.tempSetVal();
        //TODO temp end

        //获取表单数据
        let form = await all.getFromGroupVal($('#form'));
        form = all.handlerFromDataByObj(form);
        form.additionalMortgagePropertyRightList = form.additionalMortgagePropertyRightList1.concat(form.additionalMortgagePropertyRightList2);
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
            './o_add_order_view.html?id='+this.id,
            winSetting.index_add_step4.width,
            winSetting.index_add_step4.height
        );


    }


};


app.run(Page);