let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    tableSet = require('./../../es6/tableSetting');



require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b-win-top');
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
        this.createList();


    },
    createList(){
        let table = $('#table_list').get(0);
        tableSet.set(table,'draft');

        //TODO 数据获取
        let tempData = [
            {
                id:1,key1:'张三',
                key2:'12312312312',key3:'房抵',key4:'2,000,000',
                key5:'2020-11-11',key6:'删除'
            },
            {
                id:1,key1:'张三',
                key2:'12312312312',key3:'房抵',key4:'2,000,000',
                key5:'2020-11-11',key6:'删除'
            },
            {
                id:1,key1:'张三',
                key2:'12312312312',key3:'房抵',key4:'2,000,000',
                key5:'2020-11-11',key6:'删除'
            },
            {
                id:1,key1:'张三',
                key2:'12312312312',key3:'房抵',key4:'2,000,000',
                key5:'2020-11-11',key6:'删除'
            },
            {
                id:1,key1:'张三',
                key2:'12312312312',key3:'房抵',key4:'2,000,000',
                key5:'2020-11-11',key6:'删除'
            },
            {
                id:1,key1:'张三',
                key2:'12312312312',key3:'房抵',key4:'2,000,000',
                key5:'2020-11-11',key6:'删除'
            },
            {
                id:1,key1:'张三',
                key2:'12312312312',key3:'房抵',key4:'2,000,000',
                key5:'2020-11-11',key6:'删除'
            }
        ];
        table.show(tempData);

        table.body.find('.__key6__').each(function(){
           $(this).addClass('hover');
        });
        table.body.find('.__key6__').click(function(){
            let data = $(this).parent().data('data');
            console.log(data);
        });

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