



let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    {ajax,api} = require('./../../es6/_ajax'),
    all = require('./../../es6/all'),
    qt = require('./../../es6/qt'),
    selectData = require('./../../es6/selectData'),
    getUrlParam = require('./../../es6/lib/fn/getParamFromUrl'),
    inputStyle = require('./../../es6/inputStyle');




require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_date');
require('./../../es6/customElement/pc/input_file');
require('./../../es6/customElement/pc/input_search');
require('./../../es6/customElement/pc/input_money');



let Page = {
    init(){
        all.showLoadingRun(this,'run');
    },
    async run(){
        let param = getUrlParam();
        this.id = param.id;
        this.orgId = param.orgId;
        this.orgName = param.name;

        await all.getUserInfo();

        inputStyle.set(true,true);

        let select = $('#productType').get(0);
        select.selectData = await selectData('productType',true);


        if(this.id || this.id == 0){
            let [data] = await ajax.send([
                api.org_product_list({
                    id:this.id
                })
            ]);
            data = data.list || [];
            data = data[0] || {};
            this.bindData(data);
        }

        this.bindEvent();

    },
    bindData(data){
        let body = $('#form');
        all.setFromVal(body,data);
    },
    bindEvent(){
        let btn = $('#submit'),
            _this = this;
        btn.click(function(){
            all.showLoadingRun(_this,'submit')
        });
    },
    async submit(){
        let body = $('#form'),
            formData = await all.getFromVal(body);
        formData.organizationId = this.orgId;
        formData.organizationName = this.orgName;

        if(this.id || this.id == 0){
            formData.id = this.id;
        }

        await ajax.send([
            api.org_product_add(formData)
        ]);


        if(this.id || this.id == 0){
            await qt.alert('修改成功');
        }else{
            await qt.alert('添加成功');
        }

        qt.closeWin();
    }


};


app.run(Page);