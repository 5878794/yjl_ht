let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    all = require('./../../es6/all'),
    {ajax,api} = require('./../../es6/_ajax'),
    qt = require('./../../es6/qt'),
    pageSizeSetting = require('./../../es6/pageSize'),
    winSetting = require('./../../es6/winSetting'),
    tableSet = require('./../../es6/tableSetting'),
    selectData = require('./../../es6/selectData'),
    moneyFormat = require('./../../es6/lib/fn/number'),
    stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
    inputStyle = require('./../../es6/inputStyle');




require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b-win-top');
require('./../../es6/yjl/b-search');
require('./../../es6/customElement/pc/table_list');
require('./../../es6/customElement/pc/pagination');



let Page = {
    init(){
        all.showLoadingRun(this,'run');
    },
    async run(){
        await all.getUserInfo();
        this.createSearch();

        this.refundDist = await selectData('backPayMethod');
        this.businessDist = await selectData('businessType');

        await this.getData({pageNum:1});
    },
    async getData(data){
        let _this = this;

        data.pageSize = pageSizeSetting.management_notice;
        let [listData] = await ajax.send([
            api.refund_list(data)
        ]);
        let listNumber = listData.total;
        listData = listData.list || [];

        this.createList(listData);
        all.createFY({
            domId:'table_pagination',
            nowPage:data.pageNum,
            listLength:listNumber,
            pageSize:data.pageSize,
            searchData:data,
            getDataFn:function(obj){
                all.showLoadingRun(_this,'getData',obj);
            }
        });

    },
    createSearch(){
        let search = $('#b_search').get(0);

        //TODO
        search.inputData = [
            {name:'客户姓名:',type:'text',id:'a1',width:'30%'},
            {name:'客户电话:',type:'text',id:'a2',width:'30%'}
        ];
        search.clickFn = function(rs){
            rs.pageNum = 1;
            all.showLoadingRun(_this,'getData',rs);
        };


        inputStyle.searchSet(search);
    },
    createList(data){
        let table = $('#table_list').get(0),
            _this = this;

        tableSet.set(table,'refund');

        data.map(rs=>{
            //退费类型
            rs.refundTypeKey_ = this.refundDist[rs.refundTypeKey];
            //电话
            rs.clientPhone_ = rs.mainApplyMobile;
            //业务类型
            rs.businessKey_ = this.businessDist[rs.businessKey];
            //申请金额
            rs.applyMoney_ = moneyFormat(rs.applyMoney,5);
            //退费金额
            rs.refundMoney_ = moneyFormat(rs.refundMoney,5);

            //TODO 申请（蓝色）、审核中（红色）
            rs.key7 = '申请';
        });

        table.show(data);

        table.body.find('.__key7__').each(function(){
            $(this).addClass('hover');
        });
        table.body.find('.__key7__').click(function(){
            let data = $(this).parent().data('data'),
                id = data.orderNo;

            all.showLoadingRun(_this,'submit',id);
        });
    },
    async submit(orderNo){
        await ajax.send([
            api.refund_submit({
                orderNo:orderNo
            })
        ]);

        await qt.alert('申请成功!');
        qt.refreshPage();
    }
};


app.run(Page);