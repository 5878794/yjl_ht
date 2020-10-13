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
require('./../../es6/yjl/b-group-switch');


let Page = {
    init(){
        all.showLoadingRun(this,'run');
    },
    async run(){
        await all.getUserInfo();

        let [data1,data2] = await ajax.send([
            api.setting_config_list({type:7}),
            api.setting_config_list({type:8})
        ]);

        data1 = data1[0] || {};
        data2 = data2[0] || {};
        data1 = data1.children || [];
        data2 = data2.children || [];
        data1 = data1[0] || {};
        data2 = data2[0] || {};

        this.taskData = data1;
        this.noticeData = data2;

        this.bindData();
    },
    bindData(){
        let taskDom = $('#task').get(0),
            noticeDom = $('#notice').get(0),
            taskSelect = this.taskData.open,
            noticeSelect = this.noticeData.open,
            _this = this;

        taskDom.val = (taskSelect == 1);
        noticeDom.val = (noticeSelect == 1);

        taskDom.changeFn = function(val){
            _this.submit(val,'task');
        };
        noticeDom.changeFn = function(val){
            _this.submit(val,'notice');
        };
    },
    submit(val,type){
        qt.loading.show('急速加载中');
        this.submitFn(val,type).then(rs=>{
            qt.loading.hide();
        }).catch(rs=>{
            qt.loading.hide();
            qt.alert(rs);
        });
    },
    async submitFn(val,type){
        let data;
        if(type == 'task'){
            data = {
                type:7,
                id:this.taskData.id,
                open:(val)? 1:0
            }
        }else{
            data = {
                type:8,
                id:this.noticeData.id,
                open:(val)? 1:0
            }
        }

        await ajax.send([
            api.setting_config_mdf(data)
        ]);

        // qt.alert('修改成功');/**/

    }
};


app.run(Page);