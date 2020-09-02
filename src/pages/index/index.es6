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
    processToPageDist = require('./../../es6/processToPage'),
    inputStyle = require('./../../es6/inputStyle');



require('./../../es6/yjl/b-win-left');
require('./../../es6/yjl/b-win-top');
require('./../../es6/yjl/b-index-notice');
require('./../../es6/yjl/b-search');
require('./../../es6/customElement/pc/table_list');



let Page = {
    userLock:false,
    init(){
        all.showLoadingRun(this,'run');
    },
    async run(){
        await all.getUserInfo();
        this.btnBindEvent();
        this.createSearch();

        let [data] = await ajax.send([
            api.index_sort_number()
        ]);
        //TODO 未测试这个接口
        let myNumber = data.ranking || '';
        $('#number_').text(myNumber);

        //TODO 通知获取、权限控制
        this.createNotice();

        this.orderStateDist = await selectData('orderState1');
        this.businessDist = await selectData('businessType');

        await this.getData({pageNum:1});

    },
    async getData(data){

        data.pageSize = 9999999;
        let [listData] = await ajax.send([
            api.index_list(data)
        ]);
        listData = listData.list || [];

        this.createList(listData);


    },
    btnBindEvent(){
        let add = $('#add_order'),
            sort = $('#show_ph'),
            _this = this;

        add.click(function(){
            if(_this.userLock){
                qt.alert('您有即将到期的待处理任务未处理！');
                return;
            }
            qt.openPage(
                './o_add_order.html',
                winSetting.index_add_step1.width,
                winSetting.index_add_step1.height)
        });

        sort.click(function(){
            if(_this.userLock){
                qt.alert('您有即将到期的待处理任务未处理！');
                return;
            }
            // 无龙虎榜权限：点击跳转到“我的业务”，并设置条件时间范围为当月，状态为已完成
            //TODO

            let canView = true;

            if(canView){
                qt.openPage(
                    './sort.html',
                    winSetting.sort.width,
                    winSetting.sort.height)
            }else{
                let [sDay,eDay] = stamp2Date.getNowMonthDay(),
                    state = 99;     //订单完成状态

                //右侧菜单选中 我的业务 business.html
                parent.window.chooseNav('business.html');

                //页面跳转
                let url = `../business/business.html?sDay=${sDay}&eDay=${eDay}&state=${state}`;
                parent.window.iframeOpen(url);
            }
        })

    },

    createNotice(){
        let notice = $('#notice').get(0);
        notice.showData = [
            {text:'撒地方撒地方1',id:'2'},
            {text:'撒地方撒地方2',id:'2'},
            {text:'撒地方撒地方3',id:'2'},
            {text:'撒地方撒地方4',id:'2'},
            {text:'撒地方撒地方5',id:'2'},
            {text:'撒地方撒地方6',id:'2'},
            {text:'撒地方撒地方7',id:'2'}
        ];
        notice.clickFn = function(rs){
            console.log(rs)
        }
    },
    createSearch(){
        let search = $('#search1').get(0),
            _this = this;

        search.inputData = [
            {name:'',type:'search',id:'searchKey',width:'100%',placeholder:'请输入您要搜索的客户名、客户手机号、身份证号、订单号'}
        ];
        search.clickFn = function(rs){
            rs.pageNum = 1;
            all.showLoadingRun(_this,'getData',rs);
        };

        inputStyle.searchSet(search);
    },
    createList(data){
        let table = $('#table_list').get(0);
        tableSet.set(table,'index');
        // table.setting = tableSet.index.setting;
        // table.data = tableSet.index.data;

        let userLock = false;
        data.map(rs=>{
            //图标  TODO 需要判断类型
            rs.icon_ = '../res/image/index_state1.png';
            //订单状态
            rs.orderStatus_ = this.orderStateDist[rs.orderStatus];
            //客户联系电话 TODO
            rs.phone_ = '接口未返回';
            //业务类型
            rs.businessKey_ = this.businessDist[rs.businessKey];
            //创建时间
            rs.createTime_ = stamp2Date.getDate1(rs.createTime);
            //申请金额
            rs.applyMoney_ = moneyFormat(rs.applyMoney,5);
            //剩余时间 当前订单流程状态
            let html = '';
            if(rs.remainTime){
                if(parseInt(rs.remainTime) > 0){
                    html = '<span>剩余<a style="color:red;">'+rs.remainTime+'</a>天</span>';
                }else{
                    html = '<span>逾期<a style="color:red;">'+rs.remainTime+'</a>天</span>';
                }
            }
            html +=  '<span>(当前'+rs.currentNodeName+')</span>';
            rs.remainTime_ = html;


            if(rs.remainTime == 0){
                userLock = true;
            }
        });
        this.userLock = userLock;
        parent.window.userLock(userLock);


        // let tempData = [
        //     {
        //         id:1,key1:'../res/image/index_state1.png',
        //         key2:'网叉叉',key3:'待审核',key4:'12312312312',
        //         key5:'非电子交易',key6:'2020-05-01',key7:'100,100',
        //         key8:'<p>剩余<span style="color:red;">5</span>天（当前还款状态）</p>',
        //         key9:'../res/image/edit.png'
        //     }
        // ];
        table.show(data);

        table.body.find('.__row__').click(function(){
            let data = $(this).data('data');

            //TODO 页面跳转
            console.log(data);
        });

    }
};


app.run(Page);