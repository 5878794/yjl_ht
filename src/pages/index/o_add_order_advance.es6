


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



let loading;
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
        //获取订单详情
        let [data] = await ajax.send([
            api.order_get_byId({id:this.id})
        ]);
        console.log(data);

        await this.backDataToForm(data);
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

    }


};


app.run(Page);