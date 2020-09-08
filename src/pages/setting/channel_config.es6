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
require('./../../es6/yjl/b-win-top');
require('./../../es6/customElement/pc/table_list');
require('./../../es6/yjl/b_title');



let loading;
let Page = {
    init(){
        all.showLoadingRun(this,'run')
    },
    async run(){
        await all.getUserInfo();
        this.bindTitleBtn();

        let [data] = await ajax.send([
            api.setting_config_list({type:6})
        ]);
        data = data[0]?.children?? [];


        this.createList(data);

    },
    bindTitleBtn(){
        let title = $('#b_title').get(0);
        title.btnData = [
            {name:'新增',type:'btn1',style:{color:'#5576f0'}}
        ];
        title.clickFn = function(){
            qt.openPage('../setting/o_add_channel.html',
                winSetting.setting_add_channel.width,
                winSetting.setting_add_channel.height)
        }
    },
    createList(data){
        let table = $('#table_list').get(0),
            _this = this;

        tableSet.set(table,'setting_channel');

        table.show(data);

        table.body.find('.__key3__').each(function(){
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

                qt.openPage(`../setting/o_add_channel.html?id=${data.id}`,
                    winSetting.setting_add_channel.width,
                    winSetting.setting_add_channel.height)
            });

            del.click(async function(){
                let type = $(this).data('type'),
                    data = $(this).data('data');

                if(await qt.confirm(`确认是否要删除：${data.text}`)){
                    all.showLoadingRun(_this,'delFn',data);
                }
            });

        });
    },
    async delFn(data){
        await ajax.send([
           api.setting_config_del({
               configId:data.id
           })
        ]);

        qt.alert('删除成功！');
        qt.refreshPage();
    }
};


app.run(Page);