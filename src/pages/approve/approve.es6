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

        this.businessDist = await selectData('businessType');
        await selectData($('#b_search').get(0).body);

        await this.getData({pageNum:1});

    },
    async getData(data){
        let _this = this;

        data.pageSize = pageSizeSetting.management_notice;
        let [listData] = await ajax.send([
            api.approve_list(data)
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
            {name:'客户姓名:',type:'text',id:'clientName',width:'30%'},
            {name:'客户电话:',type:'text',id:'clientMobile',width:'30%'},
            {name:'业务类型:',type:'select',id:'businessKey',width:'30%',bind:'businessType'},
            {name:'所属公司:',type:'select',id:'a4',width:'25%',bind:'company'},
            {name:'经办人:',type:'text',id:'a5',width:'25%'},
            {name:'日期',type:'assDate',id:['auditTimeStart','auditTimeEnd'],width:'50%'}

        ];
        search.clickFn = function(rs){
            rs.pageNum = 1;
            all.showLoadingRun(_this,'getData',rs);
        };


        inputStyle.searchSet(search);
    },
    createList(data){
        let table = $('#table_list').get(0);
        tableSet.set(table,'approve');

        data.map(rs=>{
            //隶属公司部门
            rs.departName_ = '';
            //申请金额
            rs.applyMoney_ = '';
            //业务类型
            rs.businessKey_ = '';
            //申请时间
            rs.createTime_ = '';
            //客户电话号码
            rs.clientPhone_ = '';
            //经办人电话
            rs.createPhone_ = '';
            //订单状态
            rs.orderStatus_ = '';
        });

        table.show(data);

        table.body.find('.__key7__').each(function(){
            $(this).addClass('hover');
        });
        table.body.find('.__key7__').click(function(){
            let data = $(this).parent().data('data');
            console.log(data);
        });
    }
};


app.run(Page);