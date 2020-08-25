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
    processToPageDist = require('./../../es6/processToPage'),
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

        this.bussinessTypeDist = await selectData('businessType');
        await selectData($('#b_search').get(0).body);

        //TODO 暂无汇总数据

        await this.getData({pageNum:1});
    },
    async getData(data){
        let _this = this;

        data.pageSize = pageSizeSetting.management_notice;
        let [listData] = await ajax.send([
            api.afterLoan_list(data)
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

        //TODO 差 客户分类、产品类型
        search.inputData = [
            {name:'客户分类:',type:'select',id:'clientCategory',width:'30%',data:[{name:'请选择',value:''}]},
            {name:'到期状态:',type:'select',id:'expireStatus',width:'30%',bind:'expireStatus'},
            {name:'最后跟进时间:',type:'date',id:'lastFollowUpTime',width:'30%'},
            {name:'客户姓名:',type:'text',id:'clientName',width:'30%'},
            {name:'客户电话:',type:'text',id:'clientMobile',width:'30%'},
            {name:'产品类型',type:'select',id:'productId',width:'30%',data:[{name:'请选择',value:''}]}

        ];
        search.clickFn = function(rs){
            rs.pageNum = 1;
            all.showLoadingRun(_this,'getData',rs);
        };


        inputStyle.searchSet(search);
    },
    createList(data){
        let table = $('#table_list').get(0);
        tableSet.set(table,'afterLoan');

        data.map(rs=>{
            rs.key9 = '查看详情';
            //申请金额
            rs.applyMoney_ = moneyFormat(rs.applyMoney,5);
            //业务类型
            rs.businessKey_ = this.bussinessTypeDist[rs.businessKey];
            //出款时间
            rs.outMoneyTime_ = stamp2Date.getDate1(rs.outMoneyTime);
            //剩余本金
            rs.remainPrincipal_ = moneyFormat(rs.remainPrincipal,5);
            //剩余利息
            rs.remainInterest_ = moneyFormat(rs.remainInterest,5);
        })
        table.show(data);

        table.body.find('.__key9__').addClass('hover');
        table.body.find('.__row__').click(function(){
            let data = $(this).data('data'),
                id = data.id,
                orderNo = data.orderNo,
                currentNodeKey = data.currentNodeKey,

                //根据节点状态获取跳转的页面
                pageInfo = processToPageDist[currentNodeKey]??{},
                url = pageInfo.url,
                title = pageInfo.title;

            qt.openPage(
                `${url}?id=${id}&orderNo=${orderNo}&currentNodeKey=${currentNodeKey}&title=${title}`,
                winSetting.publish_review.width,
                winSetting.publish_review.height)
        });

    },
    //汇总数据绑定
    bindTotalData(data={}){
        //TODO key待定
        let doms = $('#total').find('span');
        //单数
        dom.eq(0).text(data.ds);
        //剩余本金
        dom.eq(1).text(moneyFormat(data.bj,5));
        //剩余利息
        dom.eq(2).text(moneyFormat(data.lx,5));
    }
};


app.run(Page);