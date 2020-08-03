let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    tableSet = require('./../../es6/tableSetting'),
    {ajax,api} = require('./../../es6/_ajax'),
    all = require('./../../es6/all'),
    qt = require('./../../es6/qt'),
    selectData = require('./../../es6/selectData'),
    winSetting = require('./../../es6/winSetting'),
    inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b-role-list');


let Page = {
    init(){
        qt.loading.show('急速加载中');
        this.run().then(rs=>{
            qt.loading.hide();
        }).catch(rs=>{
            // err.error(rs);
            qt.loading.hide();
            qt.alert(rs);
            // throw rs;
        });
    },
    async run(){
        this.addTitleBtn();
        this.createList();

    },
    addTitleBtn(){
        let title = $('#b_title').get(0);
        title.btnData = [
            {name:'新增',type:'btn1',style:{color:'#5576f0'}}
        ];
        title.clickFn = function(){
            console.log('add');
        }
    },
    createList(){
        let list = $('#list').get(0);
        list.data = [
            {name:'哒哒哒哒哒哒3',id:1},
            {name:'哒哒哒哒哒哒1',id:2},
            {name:'哒哒哒哒哒哒2',id:3}
        ];
        list.del = function(data){
            console.log(data);
        };
    }
};


app.run(Page);