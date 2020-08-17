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
    orderStateDist:{},
    productTypeDist:{},
    async run(){
        await all.getUserInfo();
        this.createSearch();
        await selectData($('#b_search').get(0).body);

        this.orderStateDist = await selectData('orderState');
        this.productTypeDist = await selectData("businessType");

        await this.getData({pageNum:1});

    },
    async getData(data){
        let _this = this;

        data.isDraft = false;
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

        //TODO 少字段
        search.inputData = [
            {name:'客户姓名:',type:'text',id:'clientName',width:'30%'},
            {name:'客户电话:',type:'text',id:'clientPhone',width:'30%'},
            {name:'业务类型:',type:'select',id:'businessKey',width:'30%',bind:'businessType'},   //注意宽度无法低于正常的input值，需要尝试
            {name:'所属公司:',type:'select',id:'a4',width:'25%',bind:'company'},
            {name:'经办人',type:'text',id:'createName',width:'25%'},
            {name:'日期',type:'assDate',id:['startTime','endTime'],width:'50%'}
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
        table.body.find('.__key6__').click(function(){
            let data = $(this).parent().data('data'),
                id = data.id;

            qt.openPage(
                './business_info.html?id='+id,
                winSetting.business_info.width,
                winSetting.business_info.height)

        });
    }
};


app.run(Page);