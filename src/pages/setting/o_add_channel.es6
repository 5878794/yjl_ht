



let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    tableSet = require('./../../es6/tableSetting'),
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
        all.showLoadingRun(this,'run');
    },
    async run(){
        inputStyle.set(true,true);

        await all.getUserInfo();

        let _this = this;
        $('#submit').click(function(){
            _this.submit();
        });
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

        await ajax.send([
           api.setting_config_mdf(form)
        ]);

        qt.alert('添加成功!');
        qt.closeWin();
    }


};


app.run(Page);