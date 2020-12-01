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
require('./../../es6/customElement/pc/input_money');


let Page = {
    init(){
        all.showLoadingRun(this,'run');
    },
    async run(){
        await all.getUserInfo();

        let [data1,data2,data3,data4] = await ajax.send([
            api.setting_config_list({type:9}),
            api.setting_config_list({type:10}),
            api.setting_config_list({type:20}),
            api.setting_config_list({type:22})
        ]);

        data1 = data1[0] || {};
        data2 = data2[0] || {};
        data3 = data3[0] || {};
        data4 = data4[0] || {};
        data1 = data1.children || [];
        data2 = data2.children || [];
        data3 = data3.children || [];
        data4 = data4.children || [];

        this.groupData = data1;
        this.businessData = data2;
        this.zxfl = data3;
        this.jkts = data4;

        this.bindData();
        this.setInputNameStyle();
    },
    setInputNameStyle(){
        inputStyle.set();

        let dom = $('b-input-money');
        dom.each(function(){
            this.nameStyle = {fontFamily:'SourceHanSansSC'};
        })
    },
    bindData(){
        let body1 = $('#body1'),
            body2 = $('#body2'),
            body3 = $('#body3'),
            body4 = $('#body4'),
            item = $('#item'),
            item1 = $('#item1'),
            _this = this,
            getItem = function(data,nameKey,unit,nameText){
                let _item = item.clone().removeClass('hidden').attr({id:''});
                _item.find('.name').text(data[nameKey]);
                _item.find('b-input-money').get(0).unitText = unit;
                _item.find('b-input-money').get(0).value = data.value || 0;
                _item.find('b-input-money').get(0).nameText = nameText;
                _item.data({data:data});
                _item.find('.btn').click(function(){
                    _this.submit($(this).parent());
                });
                _item.find('b-input-money').get(0).change = function(){
                    $(this).parent().find('.btn').removeClass('hidden');
                };
                return _item;
            },
            getItem1 = function(data,nameKey,unit,nameText){
                let _item = item1.clone().removeClass('hidden').attr({id:''});
                _item.find('.name').text(data[nameKey]);
                _item.find('b-input').get(0).unitText = unit;
                _item.find('b-input').get(0).value = data.value || 0;
                _item.find('b-input').get(0).nameText = nameText;
                _item.data({data:data});
                _item.find('.btn').click(function(){
                    _this.submit($(this).parent());
                });
                _item.find('b-input').get(0).change = function(){
                    $(this).parent().find('.btn').removeClass('hidden');
                };
                return _item;
            };

        this.groupData.map(rs=>{
            let _item = getItem(rs,'groupName','元','金额 ≥');
            body1.append(_item);
            body1.append('<br/>');
        })
        this.businessData.map(rs=>{
        	let unit = (rs.text == "房抵提前还款罚息")? '%/次' : '元/次';
            let _item = getItem(rs,'text',unit,'');
            body2.append(_item);
            body2.append('<br/>');
        });
        this.zxfl.map(rs=>{
            let _item = getItem(rs,'typeName','%','');
            body3.append(_item);
            body3.append('<br/>');
        });
        this.jkts.map(rs=>{
            let _item = getItem1(rs,'typeName','天','天数 ≥');
            _item.find('.__input__').attr({err:'请输入整数'});
            body4.append(_item);
            body4.append('<br/>');
        })
    },
    submit(obj){
        qt.loading.show('急速加载中');
        this.submitFn(obj).then(rs=>{
            qt.loading.hide();
        }).catch(rs=>{
            // err.error(rs);
            qt.loading.hide();
            qt.alert(rs);
            // throw rs;
        });
    },
    async submitFn(dom){
        let data = dom.data('data'),
            input = await dom.find('.__input__').get(0).checkPass();

        await ajax.send([
            api.setting_config_mdf({
                type:data.type,
                id:data.id,
                value:input
            })
        ]);

        qt.alert('修改成功!');
        dom.find('.btn').addClass('hidden');
        // qt.refreshPage();

    }
};


app.run(Page);