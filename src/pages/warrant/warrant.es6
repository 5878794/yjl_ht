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
        await selectData($('#b_search').get(0).body);


        this.createList();
        this.createPagination();

    },
    createSearch(){
        let search = $('#b_search').get(0);
        search.inputData = [
            {name:'客户姓名:',type:'text',id:'clientName',width:'25%'},
            {name:'客户电话:',type:'text',id:'clientMobile',width:'25%'},
            {name:'业务类型:',type:'select',id:'businessKey',width:'25%',bind:'businessType'},   //注意宽度无法低于正常的input值，需要尝试
            {name:'订单状态:',type:'select',id:'orderStatus',width:'25%',bind:'orderState1'},
            {name:'所属部门',type:'select',id:'deptId',width:'30%',bind:'myDepartment',child:'operationId'},
            {name:'经办人',type:'select',id:'operationId',width:'30%',bind:'manager1'}
        ];
        search.clickFn = function(rs){
            console.log(rs);    //返回 对应的 {id:value,...}
        };


        inputStyle.searchSet(search);
    },
    createList(){
        let table = $('#table_list').get(0);
        tableSet.set(table,'warrant');

        //TODO 数据获取
        let tempData = [
            {
                id:1,key1:'张三',
                key2:'12312312312',key3:'张四',key4:'电放费公司-财务部',
                key5:'12312312312',key6:'业务状态所属',key7:'2011-11-11',key8:'5天'
            },
            {
                id:1,key1:'张三',
                key2:'12312312312',key3:'张四',key4:'电放费公司-财务部',
                key5:'12312312312',key6:'业务状态所属',key7:'2011-11-11',key8:'5天'
            },
            {
                id:1,key1:'张三',
                key2:'12312312312',key3:'张四',key4:'电放费公司-财务部',
                key5:'12312312312',key6:'业务状态所属',key7:'2011-11-11',key8:'5天'
            },
            {
                id:1,key1:'张三',
                key2:'12312312312',key3:'张四',key4:'电放费公司-财务部',
                key5:'12312312312',key6:'业务状态所属',key7:'2011-11-11',key8:'5天'
            },
            {
                id:1,key1:'张三',
                key2:'12312312312',key3:'张四',key4:'电放费公司-财务部',
                key5:'12312312312',key6:'业务状态所属',key7:'2011-11-11',key8:'5天'
            },
            {
                id:1,key1:'张三',
                key2:'12312312312',key3:'张四',key4:'电放费公司-财务部',
                key5:'12312312312',key6:'业务状态所属',key7:'2011-11-11',key8:'5天'
            }


        ];
        table.show(tempData);


        table.body.find('.__row__').click(function(){
            let data = $(this).data('data');
            console.log(data);
        });
    },
    createPagination(){
        let fy = $('#table_pagination').get(0);
        fy.show({
            nowPage: 10,             //当前页码       默认：1
            listLength: 149,         //总记录数
            pageSize: 10             //分页数         默认：10
        });
        fy.clickFn = function(n){
            console.log(n)          //点击事件，返回点击的页码
        };
        fy.selectBg = 'rgb(86,123,249)';        //设置当前页码显示的背景色  默认：#cc9800

    }
};


app.run(Page);