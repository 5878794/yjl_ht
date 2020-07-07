let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    tableSet = require('./../../es6/tableSetting');

require('./../../es6/all');


require('./../../es6/customElement/pc/table_list');



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
        table.setting = tableSet.index.setting;
        table.data = tableSet.index.data;

        //TODO 数据获取
        let tempData = [
            {
                id:1,key1:'../res/image/index_state1.png',
                key2:'网叉叉',key3:'待审核',key4:'12312312312',
                key5:'非电子交易',key6:'2020-05-01',key7:'100,100',
                key8:'剩余5天（当前还款状态）',
                key9:'../res/image/edit.png'
            },
            {
                id:1,key1:'../res/image/index_state1.png',
                key2:'网叉叉',key3:'待审核',key4:'12312312312',
                key5:'非电子交易',key6:'2020-05-01',key7:'100,100',
                key8:'剩余5天（当前还款状态）',
                key9:'../res/image/edit.png'
            },
            {
                id:1,key1:'../res/image/index_state1.png',
                key2:'网叉叉',key3:'待审核',key4:'12312312312',
                key5:'非电子交易',key6:'2020-05-01',key7:'100,100',
                key8:'剩余5天（当前还款状态）',
                key9:'../res/image/edit.png'
            }, {
                id:1,key1:'../res/image/index_state1.png',
                key2:'网叉叉',key3:'待审核',key4:'12312312312',
                key5:'非电子交易',key6:'2020-05-01',key7:'100,100',
                key8:'剩余5天（当前还款状态）',
                key9:'../res/image/edit.png'
            },
            {
                id:1,key1:'../res/image/index_state1.png',
                key2:'网叉叉',key3:'待审核',key4:'12312312312',
                key5:'非电子交易',key6:'2020-05-01',key7:'100,100',
                key8:'剩余5天（当前还款状态）',
                key9:'../res/image/edit.png'
            }
        ];
        table.show(tempData);
    }
};


app.run(Page);