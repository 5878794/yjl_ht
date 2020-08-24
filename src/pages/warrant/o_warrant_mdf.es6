


let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    all = require('./../../es6/all'),
    {ajax,api} = require('./../../es6/_ajax'),
    qt = require('./../../es6/qt'),
    pageSizeSetting = require('./../../es6/pageSize'),
    getParamFromUrl = require('./../../es6/lib/fn/getParamFromUrl'),
    winSetting = require('./../../es6/winSetting'),
    tableSet = require('./../../es6/tableSetting'),
    selectData = require('./../../es6/selectData'),
    moneyFormat = require('./../../es6/lib/fn/number'),
    stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
    inputStyle = require('./../../es6/inputStyle');




require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b_title1');
require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_money');
require('./../../es6/customElement/pc/input_file');



let Page = {
    init(){
        all.showLoadingRun(this,'run');
    },
    async run(){
        let param = getParamFromUrl();
        this.id = param.id;
        this.orderNo = param.orderNo;
        this.currentNodeKey = param.currentNodeKey;
        this.type = param.type;
        inputStyle.set();

        await all.getUserInfo();

        await selectData($('#form'));

        let [data] = await ajax.send([
            api.order_get_byId({id:this.id})
        ]);
        this.dataBackToFrom(data);

        this.hideFDZDom();

        this.addBtnEvent();
    },
    hideFDZDom(){
        if(this.type == 3){
            $('#fdz_not').remove();
        }
    },
    dataBackToFrom(data){
        //处理对象中 子元素是对象的键
        let newData = {};
        for(let [key,val] of Object.entries(data)){
            if($.isObject(val)){
                for(let [key1,val1] of Object.entries(val)){
                    newData[key+'_'+key1] = val1;
                }
            }
        }
        this.oldValue = newData;
        all.setFromVal($('#form'),newData);
    },
    addBtnEvent(){
        let submit = $('#submit'),
            cancel = $('#cancel'),
            _this = this;

        submit.click(function(){
            all.showLoadingRun(_this,'submitFn');
        });
        cancel.click(function(){
            qt.closeWin();
        });
    },
    //获取修改过的数据
    getChangeData(oldData,newData){
        let changeDta = [];
        for(let [key,val] of Object.entries(newData)){
            if(oldData[key] != newData[key]){
                changeDta.push({
                    key:key,
                    oldValue:oldData[key],
                    newValue:newData[key]
                })
            }
        }

        let text = [],
            nowStamp = new Date().getTime(),
            date = stamp2Date.getDate1(nowStamp);
        changeDta.map(rs=>{
            let id = rs.key,
                name = $('#'+id).attr('name');

            let newText = `${date},${window.userName}将${name}从 "${rs.oldValue}"修改为"${rs.newValue}"`;
            text.push(newText);
        })

        return text;

    },
    async submitFn(){
        let form = await all.getFromGroupVal($('#form')),
            newObj = {};
        //转2对象
        for(let [key,val] of Object.entries(form)){
            key = key.split('_');
            let key1 = key[0],
                key2 = key[1];
            newObj[key1] = newObj[key1]??{};
            newObj[key1][key2] = val;
        }

        //获取变更的数据列表
        let changeData = this.getChangeData(this.oldValue,form);
        //TODO 未提交
        console.log(changeData)

        //提交
        await ajax.send([
            api.warrant_approved_mdf(newObj)
        ]);

        await qt.alert('提交成功!');

        if(changeData.length!=0){
            qt.runParentJS('showText',changeData);
        }
        setTimeout(function(){
            qt.closeWin();
        },300)
    }

};


app.run(Page);