


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




require('./../../es6/yjl/b_order_info');
require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b-order-history');



let loading;
let Page = {
    init(){
        all.showLoadingRun(this,'run');
    },
    async run(){
        let param = getParamFromUrl();
        this.id = param.id;
        await all.getUserInfo();

        let [data] = await ajax.send([
            api.order_get_byId({id:this.id})
        ]);
        all.setOrderTopData(3,data);

        this.setHistory();
        this.addBtnEvent();
    },
    setPart1(){
        let part1 = $('#order_info').get(0);
        part1.showLevel = 3;
        part1.data = {
            money:7000000,
            type:'房抵',
            no:'Fd123123123',
            from:'来自中介',
            product:'中新银行-理财产品1',
            productInfo:'产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍',
            mans:[
                {name:'张三',phone:12312312312,idcard:'123333333333333333',address:'阿打发打发发代付链接撒地方科技傲世狂妃'},
                {name:'张三(共同)',phone:12312312312,idcard:'123333333333333333',address:'阿打发打发发代付链接撒地方科技傲世狂妃'},
                {name:'张三(担保)',phone:12312312312,idcard:'123333333333333333',address:'阿打发打发发代付链接撒地方科技傲世狂妃'}
            ],
            state:'待回款'
        };
        part1.click = function(data){
        	console.log(data)
        }


    },
    setHistory(){
        let history = $('#history').get(0);
        let data = [
            {
                no:'1',
                name:'创建计划',
                state:true,
                info:'同意',
                img:['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594181331374&di=cf77ff4f40436b635d59c92f8076c4b8&imgtype=0&src=http%3A%2F%2Fspider.nosdn.127.net%2Fbf695201a8eade248b9362bda0bdb446.jpeg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594181331374&di=cf77ff4f40436b635d59c92f8076c4b8&imgtype=0&src=http%3A%2F%2Fspider.nosdn.127.net%2Fbf695201a8eade248b9362bda0bdb446.jpeg'],
                date:'2020-11-11',
                user:'张三'
            },
            {
                no:'1',
                name:'创建计划',
                state:true,
                info:'同意',
                img:['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594181331374&di=cf77ff4f40436b635d59c92f8076c4b8&imgtype=0&src=http%3A%2F%2Fspider.nosdn.127.net%2Fbf695201a8eade248b9362bda0bdb446.jpeg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594181331374&di=cf77ff4f40436b635d59c92f8076c4b8&imgtype=0&src=http%3A%2F%2Fspider.nosdn.127.net%2Fbf695201a8eade248b9362bda0bdb446.jpeg'],
                date:'2020-11-11',
                user:'张三'
            },
            {
                no:'1',
                name:'创建计划',
                state:false,
                info:'同意',
                img:['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594181331374&di=cf77ff4f40436b635d59c92f8076c4b8&imgtype=0&src=http%3A%2F%2Fspider.nosdn.127.net%2Fbf695201a8eade248b9362bda0bdb446.jpeg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594181331374&di=cf77ff4f40436b635d59c92f8076c4b8&imgtype=0&src=http%3A%2F%2Fspider.nosdn.127.net%2Fbf695201a8eade248b9362bda0bdb446.jpeg'],
                date:'2020-11-11',
                user:'张三'
            },
            {
                no:'1',
                name:'创建计划',
                state:true,
                info:'同意',
                img:[],
                date:'2020-11-11',
                user:'张三'
            }
        ];
        history.data = data;
        history.imgClick = function(rs){
            console.log(rs);        //图片点击返回当前图片路径
        }
    },
    addBtnEvent(){
        let btn = $('#submit');
        btn.click(function(){
           console.log('submit')
        });
    }

};


app.run(Page);