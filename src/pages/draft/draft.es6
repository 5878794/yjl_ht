let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    all = require('./../../es6/all'),
    {ajax,api} = require('./../../es6/_ajax'),
    qt = require('./../../es6/qt'),
    pageSizeSetting = require('./../../es6/pageSize'),
    winSetting = require('./../../es6/winSetting'),
    tableSet = require('./../../es6/tableSetting'),
    stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
    moneyFormat = require('./../../es6/lib/fn/number'),
    selectData = require('./../../es6/selectData'),
    inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b-win-top');
require('./../../es6/customElement/pc/table_list');
require('./../../es6/customElement/pc/pagination');



let Page = {
    init(){
        all.showLoadingRun(this,'run');
    },
    businessDist:[],
    async run(){
        await all.getUserInfo();

        this.businessDist = await selectData('businessType');

        await this.getData({pageNum:1});

    },
    async getData(data){
        let _this = this;

        data.isDraft = true;
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
    createList(data){
        let table = $('#table_list').get(0);
        tableSet.set(table,'draft');

        data.map(rs=>{
            rs.key6 = '删除';
            rs.createTime_ = stamp2Date.getDate1(rs.stamp2Date);
            rs.applyMoney_ = moneyFormat(rs.applyMoney,5);
            rs.businessKey_ = this.businessDist[rs.businessKey];
            //TODO 未返回对应的key
            rs.phone_ = '接口 无key';
        });

        table.show(data);

        table.body.find('.__key6__').each(function(){
           $(this).addClass('hover');
        });
        table.body.find('.__key6__').click(function(){
            let data = $(this).parent().data('data'),
                id = data.id;
            qt.openPage(
                './draft_del.html?id='+id,
                winSetting.draft_del.width,
                winSetting.draft_del.height)
        });
    }
};


app.run(Page);