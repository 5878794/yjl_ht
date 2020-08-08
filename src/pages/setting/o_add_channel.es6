



let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    tableSet = require('./../../es6/tableSetting'),
    getParamFromUrl = require('./../../es6/lib/fn/getParamFromUrl'),
    {ajax,api} = require('./../../es6/_ajax'),
    all = require('./../../es6/all'),
    qt = require('./../../es6/qt'),
    selectData = require('./../../es6/selectData'),
    winSetting = require('./../../es6/winSetting'),
    inputStyle = require('./../../es6/inputStyle');




require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_date');
require('./../../es6/customElement/pc/input_file');
require('./../../es6/customElement/pc/input_search');
require('./../../es6/customElement/pc/input_money');



let loading;
let Page = {
    init(){
        let id = getParamFromUrl().id;
        this.id = id;
        all.showLoadingRun(this,'run');
    },
    async run(){
        inputStyle.set(true,true);

        await all.getUserInfo();

        if(this.id || this.id == 0){
            let [data] = await ajax.send([
                api.setting_config_list({
                    id:this.id
                })
            ]);
            data = data[0]?.children?? [];
            data = data[0];
            this.bindData(data);
        }


        let _this = this;
        $('#submit').click(function(){
            _this.submit();
        });
    },
    bindData(data){
        all.setFromVal($('#form'),data);
    },
    submit(){
        qt.loading.show('急速加载中');
        this.submitFn().then(rs=>{
            qt.loading.hide();
        }).catch(rs=>{
            qt.loading.hide();
            qt.alert(rs);
        });
    },
    async submitFn(){
        let form = await all.getFromVal($('#form'));
        form.type = 6;
        if(this.id || this.id == 0){
            form.id = this.id;
        }

        await ajax.send([
           api.setting_config_mdf(form)
        ]);

        qt.alert('操作成功!');
        qt.closeWin();
    }


};


app.run(Page);