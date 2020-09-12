let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    all = require('./../../es6/all'),
    {ajax,api} = require('./../../es6/_ajax'),
    qt = require('./../../es6/qt'),
    pageSizeSetting = require('./../../es6/pageSize'),
    winSetting = require('./../../es6/winSetting'),
    tableSet = require('./../../es6/tableSetting'),
    selectData = require('./../../es6/selectData'),
    moneyFormat = require('./../../es6/lib/fn/number'),
    stamp2Date = require('./../../es6/lib/fn/timeAndStamp'),
    inputStyle = require('./../../es6/inputStyle');




require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b-win-top');
require('./../../es6/yjl/b-search');
require('./../../es6/customElement/pc/table_list');
require('./../../es6/customElement/pc/pagination');



let Page = {
    init(){
        all.showLoadingRun(this,'run');
    },
    async run(){
        await all.getUserInfo();
        this.createSearch();

        this.refundDist = await selectData('backPayMethod');
        this.businessDist = await selectData('businessType');
        this.refundStateDist = await selectData('refundState');
        await this.getData({pageNum:1});
    },
    async getData(data){
        let _this = this;

        data.pageSize = pageSizeSetting.management_notice;
        let [listData] = await ajax.send([
            api.refund_list(data)
        ]);
        let listNumber = listData.total;
        listData = listData.list || [];

        this.createList(listData);
        all.createFY({
            domId:'table_pagination',
            nowPage:data.pageNum,
            listLength:listNumber,
            pageSize:data.pageSize,
            searchData:data,
            getDataFn:function(obj){
                all.showLoadingRun(_this,'getData',obj);
            }
        });

    },
    createSearch(){
        let search = $('#b_search').get(0),
            _this = this;

        search.inputData = [
            {name:'客户姓名:',type:'text',id:'clientName',width:'30%'},
            {name:'客户电话:',type:'text',id:'clientMobile',width:'30%'}
        ];
        search.clickFn = function(rs){
            rs.pageNum = 1;
            all.showLoadingRun(_this,'getData',rs);
        };


        inputStyle.searchSet(search);
    },
    createList(data){
        let table = $('#table_list').get(0),
            _this = this;

        tableSet.set(table,'refund');

        data.map(rs=>{
            //退费类型
            rs.refundTypeKey_ = this.refundDist[rs.refundTypeKey];
            //电话
            rs.clientPhone_ = rs.mainApplyMobile;
            //业务类型
            rs.businessKey_ = this.businessDist[rs.businessKey];
            //申请金额
            rs.applyMoney_ = moneyFormat(rs.applyMoney,5);
            //退费金额
            rs.refundMoney_ = moneyFormat(rs.refundMoney,5);


            //refundStatus
            //0:初始状态 1-审批中 2-审批通过 3-审批失败
            rs.key7 = this.refundStateDist[rs.refundStatus];
        });

        table.show(data);

        table.body.find('.__key7__').each(function(){
            let data = $(this).parent().data('data');

            if(data.refundStatus == 0){
                $(this).addClass('hover');
            }else{
                $(this).find('div').css({color:'#ccc'});
            }
        });
        table.body.find('.__key7__').click(function(){
            let data = $(this).parent().data('data'),
                orderNo = data.orderNo,
                type = data.refundTypeKey,
                state = data.refundStatus;

            if(state != 0){
                return;
            }

            all.showLoadingRun(_this,'submit',{orderNo,type});
        });
    },
    async submit(opt){
        // 退费类型 1-退尾款 2-退服务费
        if(opt.type == 1){
            await ajax.send([
                api.refund_submit({
                    orderNo:opt.orderNo
                })
            ]);
        }else{
            await ajax.send([
                api.refund_submit_tf({
                    orderNo:opt.orderNo
                })
            ]);
        }


        await qt.alert('申请成功!');
        qt.refreshPage();
    }
};


app.run(Page);