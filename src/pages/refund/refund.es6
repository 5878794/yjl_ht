let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    tableSet = require('./../../es6/tableSetting'),
    inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b-win-top');
require('./../../es6/yjl/b-search');
require('./../../es6/customElement/pc/table_list');
require('./../../es6/customElement/pc/pagination');



let loading;
let Page = {
    init(){
        // loading = new loadFn();
        // loading.show('急速加载中');
        this.run().then(rs=>{
            // loading.hide();
        }).catch(rs=>{
            // err.error(rs);
            // loading.hide();
            // app.alert(rs);
            throw rs;
        });
    },
    async run(){
        this.createSearch();
        this.createList();
        this.createPagination();

    },
    createSearch(){
        let search = $('#b_search').get(0);
        search.inputData = [
            {name:'客户姓名:',type:'text',id:'a1',width:'30%'},
            {name:'客户电话:',type:'text',id:'a2',width:'30%'}
        ];
        search.clickFn = function(rs){
            console.log(rs);    //返回 对应的 {id:value,...}
        };


        inputStyle.searchSet(search);
    },
    createList(){
        let table = $('#table_list').get(0);
        tableSet.set(table,'refund');

        //TODO 数据获取
        let tempData = [
            {
                id:1,key1:'退尾款',
                key2:'张三',key3:'12312312312',key4:'房抵押',
                key5:'3,000,000.00000',key6:'2,000.00000',key7:'申请'
            },
            {
                id:1,key1:'退尾款',
                key2:'张三',key3:'12312312312',key4:'房抵押',
                key5:'3,000,000.00000',key6:'2,000.00000',key7:'申请'
            },
            {
                id:1,key1:'退尾款',
                key2:'张三',key3:'12312312312',key4:'房抵押',
                key5:'3,000,000.00000',key6:'2,000.00000',key7:'申请'
            },
            {
                id:1,key1:'退尾款',
                key2:'张三',key3:'12312312312',key4:'房抵押',
                key5:'3,000,000.00000',key6:'2,000.00000',key7:'申请'
            },
            {
                id:1,key1:'退尾款',
                key2:'张三',key3:'12312312312',key4:'房抵押',
                key5:'3,000,000.00000',key6:'2,000.00000',key7:'申请'
            },
            {
                id:1,key1:'退尾款',
                key2:'张三',key3:'12312312312',key4:'房抵押',
                key5:'3,000,000.00000',key6:'2,000.00000',key7:'申请'
            },
            {
                id:1,key1:'退尾款',
                key2:'张三',key3:'12312312312',key4:'房抵押',
                key5:'3,000,000.00000',key6:'2,000.00000',key7:'申请'
            },
            {
                id:1,key1:'退尾款',
                key2:'张三',key3:'12312312312',key4:'房抵押',
                key5:'3,000,000.00000',key6:'2,000.00000',key7:'申请'
            },
            {
                id:1,key1:'退尾款',
                key2:'张三',key3:'12312312312',key4:'房抵押',
                key5:'3,000,000.00000',key6:'2,000.00000',key7:'申请'
            }


        ];
        table.show(tempData);

        table.body.find('.__key7__').each(function(){
            $(this).addClass('hover');
        });
        table.body.find('.__key7__').click(function(){
            let data = $(this).parent().data('data');
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