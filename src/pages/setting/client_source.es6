let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    tableSet = require('./../../es6/tableSetting'),
    {ajax,api} = require('./../../es6/_ajax'),
    getParamFromUrl = require('./../../es6/lib/fn/getParamFromUrl'),
    all = require('./../../es6/all'),
    qt = require('./../../es6/qt'),
    selectData = require('./../../es6/selectData'),
    winSetting = require('./../../es6/winSetting'),
    inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b-role-list');



let TYPEDATA = {
    '1':{
        name:'客户来源'
    },
    '11':{
        name:'档案室'
    }
};

let Page = {
    //type:1   客户来源渠道
    type:1,
    init(){
        let param = getParamFromUrl();
        this.type = param.type || 1;
        all.showLoadingRun(this,'run');
    },
    async run(){
        await all.getUserInfo();

        let data = await this.getData(this.type);
        this.createPage(data);


    },
    async getData(type){
        let data = [];
        if(type == 1){
            [data] = await ajax.send([
                api.setting_config_list({type:1,pageSize:999999})
            ]);
            data = data[0] || {};
            data = data.children?? [];
        }
        if(type == 11){
            [data] = await ajax.send([
                api.setting_config_list({type:11})
            ]);
            data = data[0] || {};
            data = data.children?? [];
        }

        return data;
    },
    createPage(data){
        let typeData = TYPEDATA[this.type];

        $('title').text(typeData.name);

        let body = $('#body'),
            bTitle = $(`<b-title name="${typeData.name}"></b-title>`),
            listBody = $('<div class="openWin_input_item1"></div>'),
            listDom = $(`<b-role-list name="${typeData.name}列表"></b-role-list>`);

        listBody.append(listDom);
        body.append(bTitle).append(listBody);


        this.addTitleBtn(bTitle.get(0),typeData.name);
        this.createList(data,listDom.get(0));
    },
    addTitleBtn(dom,name){
        let _this = this;
        dom.btnData = [
            {name:'新增',type:'btn1',style:{color:'#5576f0'}}
        ];
        dom.clickFn = function(){
            //页面type：11 档案室  1 客户来源
            //传出去   6 档案室    5 客户来源
            let type = (_this.type==11)? '6' : '5';
            qt.openPage(`../setting/o_add.html?type=${type}&name=${name}`,
                winSetting.setting_add_role.width,
                winSetting.setting_add_role.height)
        }
    },
    createList(data,dom){
        let _this = this;
        data.map(rs=>{
            rs.name = rs.text;
        });
        dom.data = data;
        dom.del = async function(data){
            if(await qt.confirm(`是否要删除:${data.name}`)){
                all.showLoadingRun(_this,'delFn',data);
            }
        };
    },

    async delFn(data){
        if(this.type == 1){
            await ajax.send([
                api.setting_config_del({
                    configId:data.id
                })
            ]);
        }
        if(this.type == 11){
            await ajax.send([
                api.setting_config_del({
                    configId:data.id
                })
            ]);
        }



        await qt.alert('删除成功!');
        all.showLoadingRun(this,'refresh');
        // qt.refreshPage();
    },
    refreshList(){
        all.showLoadingRun(this,'refresh');
    },
    async refresh(){
        let data = await this.getData(this.type),
            listDom = $('b-role-list');
        this.createList(data,listDom.get(0));
    }
};
window.refreshList = function(){
    Page.refreshList();
};

app.run(Page);