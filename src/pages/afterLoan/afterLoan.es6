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
    hasTotal:false,
    async run(){
        await all.getUserInfo();
        this.createSearch();

        this.bussinessTypeDist = await selectData('businessType');
        await selectData($('#b_search').get(0).body);


        await this.getData({pageNum:1});
    },
    async getData(data){
        let _this = this;
        this.catchListParam = data;

        if(!this.hasTotal){
            let [total] = await ajax.send([
                api.afterLoan_total(data)
            ]);
            this.hasTotal = true;
            this.bindTotalData(total);
        }


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

        search.inputData = [
            {name:'客户分类:',type:'select',id:'clientCategory',width:'30%',bind:'clientType'},
            {name:'到期状态:',type:'select',id:'expireStatus',width:'30%',bind:'expireStatus'},
            {name:'最后跟进时间:',type:'date',id:'lastFollowUpTime',width:'30%'},
            {name:'客户姓名:',type:'text',id:'clientName',width:'30%'},
            {name:'客户电话:',type:'text',id:'clientMobile',width:'30%'},
            {name:'业务类型',type:'select',id:'productId',width:'30%',bind:'businessType'}

        ];
        search.clickFn = function(rs){
            _this.hasTotal = false;
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
            rs.applyMoney_ = moneyFormat(rs.applyMoney,2);
            //业务类型
            rs.businessKey_ = this.bussinessTypeDist[rs.businessKey];
            //出款时间
            rs.outMoneyTime_ = stamp2Date.getDate1(rs.outMoneyTime);
            //剩余本金
            rs.remainPrincipal_ = moneyFormat(rs.remainPrincipal,2);
            //剩余利息
            rs.remainInterest_ = moneyFormat(rs.remainInterest,2);
        })
        table.show(data);

        table.body.find('.__key9__').addClass('hover');
        table.body.find('.__row__').click(function(){
            let data = $(this).data('data'),
                id = data.id,
                orderNo = data.orderNo,
                clientCategory = data.clientCategory,
                currentNodeKey = data.currentNodeKey;

            qt.openPage(
                `../afterLoan/o_info.html?id=${id}&orderNo=${orderNo}&currentNodeKey=${currentNodeKey}&clientCategory=${clientCategory}`,
                winSetting.afterLoan_o_info.width,
                winSetting.afterLoan_o_info.height)
        });

    },
    //汇总数据绑定
    bindTotalData(data={}){
        let doms = $('#total').find('span');
        //单数
        doms.eq(0).text(data.orderTotalNums);
        //剩余本金
        doms.eq(1).text(moneyFormat(data.orderTotalLeftPrincipal,5));
        //剩余利息
        doms.eq(2).text(moneyFormat(data.orderTotalRemainInterest,5));
    },
    refreshList(){
        let data = this.catchListParam;
        console.log('refresh')
        all.showLoadingRun(this,'getData',data);
    }
};
window.refreshList = function(){
    Page.refreshList();
};

app.run(Page);