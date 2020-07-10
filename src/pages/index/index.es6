let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    tableSet = require('./../../es6/tableSetting');



require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b-win-top');
require('./../../es6/yjl/b-index-notice');
require('./../../es6/yjl/b-search');
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
        this.createNotice();
        this.createSearch();
        this.createList();


    },
    createNotice(){
        let notice = $('#notice').get(0);
        notice.showData = [{text:'撒地方撒地方',id:'2'}];
        notice.clickFn = function(rs){
            console.log(rs)
        }
    },
    createSearch(){
        let search = $('#search1').get(0);
        search.inputData = [
            {name:'',type:'search',id:'search_val',width:'100%',placeholder:'请输入您要搜索的客户名、客户手机号、身份证号、订单号'}
        ];
        search.clickFn = function(rs){
            console.log(rs);
        }
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
                key8:'<p>剩余<span style="color:red;">5</span>天（当前还款状态）</p>',
                key9:'../res/image/edit.png'
            },
            {
                id:2,key1:'../res/image/index_state1.png',
                key2:'网叉叉',key3:'待审核',key4:'12312312312',
                key5:'非电子交易',key6:'2020-05-01',key7:'100,100',
                key8:'剩余5天（当前还款状态）',
                key9:'../res/image/edit.png'
            },
            {
                id:3,key1:'../res/image/index_state1.png',
                key2:'网叉叉',key3:'待审核',key4:'12312312312',
                key5:'非电子交易',key6:'2020-05-01',key7:'100,100',
                key8:'剩余5天（当前还款状态）',
                key9:'../res/image/edit.png'
            }, {
                id:4,key1:'../res/image/index_state1.png',
                key2:'网叉叉',key3:'待审核',key4:'12312312312',
                key5:'非电子交易',key6:'2020-05-01',key7:'100,100',
                key8:'剩余5天（当前还款状态）',
                key9:'../res/image/edit.png'
            },
            {
                id:5,key1:'../res/image/index_state1.png',
                key2:'网叉叉',key3:'待审核',key4:'12312312312',
                key5:'非电子交易',key6:'2020-05-01',key7:'100,100',
                key8:'剩余5天（当前还款状态）',
                key9:'../res/image/edit.png'
            }
        ];
        table.show(tempData);

        table.body.find('.__row__').click(function(){
            let data = $(this).data('data');
            console.log(data);
        });

    }
};


app.run(Page);