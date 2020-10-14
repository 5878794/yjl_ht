
//通用添加名称页面
// 参数传入输入框的name 和页面type


let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    qt = require('./../../es6/qt'),
    all = require('./../../es6/all'),
    {ajax,api} = require('./../../es6/_ajax'),
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
        let param = getUrlParam(),
            type = param.type,
            name = param.name;
        this.companyId = param.companyId || null;

        await all.getUserInfo();

        let input = $('b-input').eq(0).get(0);
        input.nameDom.text(name);

        inputStyle.set(true,true);

        this.bindEvent(type);

    },
    bindEvent(type){
        let _this = this;
        $('#submit').click(function(){
            //角色添加
            if(type==1){
                all.showLoadingRun(_this,'addRole');
            }

            //机构添加
            if(type==2){
                all.showLoadingRun(_this,'addOrg');
            }

            //公司添加
            if(type==3){
                all.showLoadingRun(_this,'addCompany');
            }

            //部门添加
            if(type==4){
                all.showLoadingRun(_this,'addDepartment');
            }

            //客户来源添加
            if(type==5){
                all.showLoadingRun(_this,'addClientSource');
            }

            //档案室
            if(type==6){
                all.showLoadingRun(_this,'addArchives');
            }
        });
    },

    //角色添加
    async addRole(){
        let val = await $('#val').get(0).checkPass();
        await ajax.send([
            api.role_add({
                roleName:val
            })
        ]);

        await qt.alert('角色添加成功！');
        qt.closeWin();
    },

    //添加机构
    async addOrg(){
        let val = await $('#val').get(0).checkPass();
        await ajax.send([
            api.org_add({
                organizationName:val
            })
        ]);

        await qt.alert('机构添加成功！');
        qt.closeWin();
    },


    //添加公司
    async addCompany(){
        let val = await $('#val').get(0).checkPass();
        await ajax.send([
            api.company_add({
                companyName:val
            })
        ]);

        await qt.alert('公司添加成功！');
        qt.closeWin();
    },


    //添加部门
    async addDepartment(){
        let val = await $('#val').get(0).checkPass();
        await ajax.send([
            api.department_add({
                deptName:val,
                companyId:this.companyId
            })
        ]);

        await qt.alert('部门添加成功！');
        qt.closeWin();
    },


    //添加客户来源
    async addClientSource(){
        let val = await $('#val').get(0).checkPass();
        await ajax.send([
            api.setting_config_mdf({
                type:1,
                text:val
            })
        ]);

        await qt.alert('添加成功！');
        qt.closeWin();
    },

    //档案室增加
    async addArchives(){
        let val = await $('#val').get(0).checkPass();
        await ajax.send([
            api.setting_config_mdf({
                type:11,
                text:val
            })
        ]);

        await qt.alert('添加成功！');
        qt.closeWin();
    }
};


app.run(Page);