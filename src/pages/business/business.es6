let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    all = require('./../../es6/all'),
    {ajax,api} = require('./../../es6/_ajax'),
    qt = require('./../../es6/qt'),
    pageSizeSetting = require('./../../es6/pageSize'),
    winSetting = require('./../../es6/winSetting'),
    tableSet = require('./../../es6/tableSetting'),
    getParamFromUrl = require('./../../es6/lib/fn/getParamFromUrl'),
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
    orderStateDist:{},
    productTypeDist:{},
    async run(){
        await all.getUserInfo();
        this.createSearch();
        await selectData($('#b_search').get(0).body);

        let param = getParamFromUrl(),
            sDay = param.sDay,
            eDay = param.eDay,
            state = param.state;

        this.orderStateDist = await selectData('orderState');
        this.productTypeDist = await selectData("businessType");


        let searchData = {pageNum:1};
        if(sDay || eDay || state){
            let search = $('#b_search').get(0).body;
            search.find('b-input-date[key="operationStartTime"]').get(0).value = sDay;
            search.find('b-input-date[key="operationEndTime"]').get(0).value = eDay;
            search.find('b-input[key="orderStatus"]').get(0).value = state;

            searchData.operationStartTime = sDay;
            searchData.operationEndTime = eDay;
            searchData.orderStatus = state;
        }
        await this.getData(searchData);

    },
    async getData(data){
        let _this = this;

        data.pageSize = pageSizeSetting.management_notice;
        let [listData] = await ajax.send([
            api.my_order(data)
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
        let search = $('#b_search').get(0),
            _this = this;

        search.inputData = [
            {name:'客户姓名:',type:'text',id:'clientName',width:'25%'},
            {name:'客户电话:',type:'text',id:'clientMobile',width:'25%'},
            {name:'业务类型:',type:'select',id:'businessKey',width:'25%',bind:'businessType'},   //注意宽度无法低于正常的input值，需要尝试
            {name:'订单状态:',type:'select',id:'orderStatus',width:'25%',bind:'orderState1'},
            {name:'所属公司:',type:'select',id:'companyId',width:'25%',bind:'company',child:'operationId'},
            {name:'经办人',type:'select',id:'operationId',width:'25%',bind:'manager'},
            {name:'日期',type:'assDate',id:['operationStartTime','operationEndTime'],width:'50%'}
        ];
        search.clickFn = function(rs){
            rs.pageNum = 1;
            all.showLoadingRun(_this,'getData',rs);
        };


        inputStyle.searchSet(search);

    },
    createList(data){
        let table = $('#table_list').get(0);
        tableSet.set(table,'business');

        data.map(rs=>{
           rs.businessKey_ = this.productTypeDist[rs.businessKey];
           rs.applyMoney_ = moneyFormat(rs.applyMoney,5);
           rs.orderStatus_ = this.orderStateDist[rs.orderStatus];
           rs.key6 = '查看详情';
        });

        table.show(data);

        table.body.find('.__key6__').each(function(){
            $(this).addClass('hover');
        });
        table.body.find('.__key6__').click(function(e){
            e.stopPropagation();
            let data = $(this).parent().data('data'),
                id = data.id,
                orderNo = data.orderNo;

            qt.openPage(
                './business_info.html?id='+id+'&orderNo='+orderNo,
                winSetting.business_info.width,
                winSetting.business_info.height)
        });
        table.body.find('.__row__').css({cursor:'pointer'});
        table.body.find('.__row__').click(function(){
            let data = $(this).data('data'),
                id = data.id,
                orderNo = data.orderNo;

            qt.openPage(
                './business_info.html?id='+id+'&orderNo='+orderNo,
                winSetting.business_info.width,
                winSetting.business_info.height)
        });
    }
};


app.run(Page);