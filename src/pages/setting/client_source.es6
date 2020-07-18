let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    tableSet = require('./../../es6/tableSetting'),
    inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b-role-list');


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