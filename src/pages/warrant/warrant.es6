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
    processToPageDist = require('./../../es6/processToPage'),
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

        this.orderStateDist = await selectData('orderState') || {};

        await selectData($('#b_search').get(0).body);
        await this.getData({pageNum:1});



    },
    async getData(data){
        let _this = this;

        data.pageSize = pageSizeSetting.management_notice;
        let [listData] = await ajax.send([
            api.warrant_list(data)
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
            {name:'所属部门',type:'select',id:'deptId',width:'30%',bind:'myDepartment',child:'operationId'},
            {name:'经办人',type:'select',id:'operationId',width:'30%',bind:'manager1'}
        ];
        search.clickFn = function(rs){
            rs.pageNum = 1;
            all.showLoadingRun(_this,'getData',rs);
        };


        inputStyle.searchSet(search);
    },
    createList(data){
        let table = $('#table_list').get(0);
        tableSet.set(table,'warrant');

        data.map(rs=>{
            rs.orderStatus_ = this.orderStateDist[rs.orderStatus];
            rs.dealTime_ = stamp2Date.getDate1(rs.dealTime);
            rs.remainderDays_ = (rs.remainderDays)? rs.remainderDays+'天' : '';
        });

        table.show(data);


        table.body.find('.__row__').click(async function(){
            let data = $(this).data('data'),
                id = data.id,
                orderNo = data.orderNo,
                currentNodeKey = data.currentNodeKey,

                //根据节点状态获取跳转的页面
                {url,title} = await processToPageDist(currentNodeKey);

            qt.openPage(
                `${url}?id=${id}&orderNo=${orderNo}&currentNodeKey=${currentNodeKey}&title=${title}`,
                winSetting.publish_review.width,
                winSetting.publish_review.height)
        });
    }
};


app.run(Page);