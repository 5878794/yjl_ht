let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    tableSet = require('./../../es6/tableSetting'),
    inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b-win-top');
require('./../../es6/customElement/pc/table_list');
require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b_title1');
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
        this.createList1();

    },
    createList(){
        let list = $('#list').get(0);
        list.data = [
            {name:'业务员1',id:1},
            {name:'业务员2',id:2},
            {name:'业务员3',id:3}
        ];
        list.del = function(data){
            console.log(del);
        };
    },
    createList1(){
        let table = $('#table_list').get(0);
        tableSet.set(table,'setting_product');
        table.listBody.removeClass('boxflex1');

        //TODO 数据获取
        let tempData = [
            {
                id:1,key1:'产品名称产品名称',
                key2:'非垫资',
                key3:'最小额度:3,333,333,333.00000',key4:'最大额度:3,333,333,333.00000',
                key5:'成本费率:5%',key6:'服务费:3,333,333,333.00000',
                key7:333,key8:''
            },
            {
                id:1,key1:'产品名称产品名称',
                key2:'非垫资',
                key3:'3,333,333,333.00000',key4:'3,333,333,333.00000',
                key5:'5%',key6:'3,333,333,333.00000',
                key7:333,key8:''
            },
            {
                id:1,key1:'产品名称产品名称',
                key2:'非垫资',
                key3:'3,333,333,333.00000',key4:'3,333,333,333.00000',
                key5:'5%',key6:'3,333,333,333.00000',
                key7:333,key8:''
            },
            {
                id:1,key1:'产品名称产品名称',
                key2:'非垫资',
                key3:'3,333,333,333.00000',key4:'3,333,333,333.00000',
                key5:'5%',key6:'3,333,333,333.00000',
                key7:333,key8:''
            }


        ];
        table.show(tempData);

        table.body.find('.__key8__').each(function(){
            $(this).addClass('box_hcc').html('');
            let data = $(this).parent().data('data');
            let edit = $('<div data-type="edit" class="box_hcc hover">编辑</div>'),
                del = $('<div data-type="del" class="box_hcc hover">删除</div>');

            edit.css({
                width:'60px',
                height:'24px',
                borderRadius:'5px',
                background:'#5576f0',
                color:'#fff',
                margin:'0 5px',
                fontSize:'14px'
            }).data({data:data});
            del.css({
                width:'60px',
                height:'24px',
                borderRadius:'5px',
                background:'red',
                color:'#fff',
                margin:'0 5px',
                fontSize:'14px'
            }).data({data:data});
            $(this).append(edit).append(del);

            edit.click(function(){
                let type = $(this).data('type'),
                    data = $(this).data('data');

                console.log(type,data);
            });

            del.click(function(){
                let type = $(this).data('type'),
                    data = $(this).data('data');

                console.log(type,data);
            });

        });
    }
};


app.run(Page);