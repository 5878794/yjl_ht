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


let icon = {
    //垫资
    DIAN:'../res/image/index/dz.png',
    //房抵
    FANG:'../res/image/index/fd.png',
    //退款
    TUI:'../res/image/index/tk.png',
    //贷后
    DAIHOU:'../res/image/index/dh.png',
    //展期
    ZHAN:'../res/image/index/zq.png',
    //订单删除
    DINGDAN:'../res/image/index/sc.png',
    //核销
    HEXIAO:'../res/image/index/hx.png',
    //出库
    CHU:'../res/image/index/ck.png',
    //还款（房抵撤分出来的）
    FENQI:'../res/image/index/fd.png',
    HUAN:'../res/image/index/fd.png'
};




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
        let myNumber = data.ranking || '';
        $('#number_').text(myNumber);

        this.createNoticeFn();

        this.orderStateDist = await selectData('orderState1');
        this.businessDist = await selectData('businessType');

        await this.getData({pageNum:1});
        this.addEventEnter();
    },
    async getData(data){
        this.catchListParam = data;
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

            if(window.orderCreatePrivilegeType == 0){
                qt.alert('您没有创建订单的权限！');
                return;
            }

            qt.openPage(
                '../index/o_add_order.html',
                winSetting.index_add_step1.width,
                winSetting.index_add_step1.height)
        });

        sort.click(function(){
            if(_this.userLock){
                qt.alert('您有即将到期的待处理任务未处理！');
                return;
            }


            // 无龙虎榜权限：点击跳转到“我的业务”，并设置条件时间范围为当月，状态为已完成
            let canView = false;
            if(window.orderSearchPrivilegeType >= 2){
                canView = true;
            }

            if(canView){
                qt.openPage(
                    '../index/sort.html',
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

    createNoticeFn(){
        let _this =this;
        setInterval(function(){
            _this.createNotice();
        },60000);
        _this.createNotice();
    },
    oldNews:{},
    async createNotice(){
        let data = await all.getNews();
        data = data.list || [];
        let showTexts = [],
            nowDataById = {};
        data.map(rs=>{
            let title = rs.broadTitle;
            if(rs.broadType == 1){
                //开单通告
                title = ' 😊 '+title+' 😊 ';
            }

            showTexts.push({
                text:title,
                id:rs.id,
                data:rs
            });
            nowDataById[rs.id] = rs;
        });

        //判断是否有更新的新闻
        let old = this.oldNews,
            hasNew = false;
        data.map(rs=>{
            let id = rs.id;
            if(!old[id]){
                hasNew = true;
            }
        });

        this.oldNews = nowDataById;

        if(!hasNew){return;}


        let notice = $('#notice').get(0);
        notice.showData = showTexts;
        notice.clickFn = function(rs){
            let data = rs.data,
                //0 通知  1 开单通告
                type = data.broadType;

            console.log(data);
            if(type == 0){
                let id = data.id;
                qt.openPage(`../publish/o_news.html?id=${id}`);
            }else{
                let title = data.broadContent,
                    companyName = data.companyName??'',
                    departName = data.deptName??'',
                    info = companyName+departName,
                    date = data.createTime??'',
                    userName = data.userName??' ',
                    money = data.orderMoney??0;
                let url = `../publish/o_news1.html?info=${info}&date=${date}&username=${userName}&money=${money}`;
                qt.openPage(url);
            }
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

        inputStyle.searchSet(search,'search');
    },
    createList(data){
        let table = $('#table_list').get(0);
        tableSet.set(table,'index');
        // table.setting = tableSet.index.setting;
        // table.data = tableSet.index.data;

        let userLock = false;
        data.map(rs=>{
            rs.key9 = '../res/image/edit.png';
            //图标
            let nodeName = rs.currentNodeKey;
            nodeName = nodeName.split('_')[0]??'';
            rs.icon_ = icon[nodeName]??'';
            //订单状态
            rs.orderStatus_ = this.orderStateDist[rs.orderStatus];
            //客户联系电话
            rs.phone_ = rs.mobile;
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
            html +=  '<span>('+rs.currentNodeName+')</span>';
            rs.remainTime_ = html;


            if(rs.remainTime <= 0){
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

        table.body.find('.__row__').click(async function(){
            let data = $(this).data('data'),
                id = data.id,
                orderNo = data.orderNo,
                currentNodeKey = data.currentNodeKey,

                //根据节点状态获取跳转的页面
                {url,title} = await processToPageDist(currentNodeKey);


            qt.openPage(
                `${url}?id=${id}&orderNo=${orderNo}&currentNodeKey=${currentNodeKey}&title=${title}`,
                winSetting.publish_review.width,
                winSetting.publish_review.height)
        });

    },
    refreshList(){
        let data = this.catchListParam;
        console.log('refresh')
        all.showLoadingRun(this,'getData',data);
    },
    addEventEnter(){
        let input = $('#search1').get(0).body.find('b-input').get(0).body.find('input'),
            focus = false,
            _this = this;
        input.focus(function(){focus=true;});
        input.blur(function(){focus=false;});

        window.addEventListener('keydown',function(e){
            if(focus && e.code=='Enter'){
                let rs={
                    searchKey:input.val(),
                    pageNum:1
                };
                all.showLoadingRun(_this,'getData',rs);
            }
        },false)


    }
};

window.refreshList = function(){
    Page.refreshList();
};

app.run(Page);