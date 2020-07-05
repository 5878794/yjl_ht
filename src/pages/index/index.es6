let app = require('./../../es6/lib/page'),
    // device = require('./lib/device'),
    // getParamFromUrl = require('./lib/fn/getParamFromUrl'),
    loadFn = require('./../../es6/lib/ui/loading_old'),
    // $$ = require('./lib/event/$$'),
    // info = require('./lib/ui/info'),
    // s2t = require('./lib/fn/timeAndStamp'),
    // areaData = require('./lib/code/areaCode'),
    // {ajax,api} = require('./_ajax'),
    err = require('./../../es6/lib/fn/errorHandler');

//
// require('./lib/jq/check_from');
// require('./customElement/phone/b_select');
// require('./customElement/phone/b_select_date');
// require('./customElement/phone/b_select_cascade');
// require('./customElement/phone/b_select_number');

require('./../../es6/customElement/pc/pagination');
require('./../../es6/customElement/pc/table_list');
require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_file');
require('./../../es6/customElement/pc/input_date');
require('./../../es6/customElement/pc/input_sms');



let loading;
let Page = {
    init(){
        loading = new loadFn();
        loading.show('急速加载中');
        this.run().then(rs=>{
            loading.hide();
        }).catch(rs=>{
            err.error(rs);
            loading.hide();
            app.alert(rs);
            throw rs;
        });
    },
    async run(){
        let select = $('b-input').eq(2).get(0);
        select.selectData = [{value:1,name:1}];


        let sms = $('b-input-sms').get(0);
        sms.phoneId = 'phone';
        sms.countdown = 10;
        sms.countdownText = '剩${x}秒';
        sms.smsBtnStyle = {width:'150px',height:'30px',border:'1px solid #ccc',textAlign:'center',color:'#000'};
        sms.timeBtnStyle = {width:'150px',height:'30px',border:'1px solid #ccc',textAlign:'center',color:'red'};
        sms.sendFn = function(){
          setTimeout(function(){
              sms.sendOk();
          },3000)
        };


        // let table = $('b-table-list').get(0);
        //
        // table.setting = {
        //     rowHeight:'60',
        //     titleRowHeight:'40',
        //     titleRowStyle:{background:'red'},
        //     rowHoverStyle:{background:'#ccc'},
        //     rowNotHoverStyle:{background:'#fff'}
        //     // titleRowCssClass:'titleRow'
        // };
        // table.data = [
        //     {
        //         name:'客户',
        //         width:'25%',
        //         color:'#ccc',
        //         cursor:'pointer',
        //         icon:'icon',
        //         children:[
        //             {color:'red',key:'a1'},
        //             {color: 'green', key: 'a2'},
        //             {color: 'yellow', key: 'a3'}
        //         ]
        //     },
        //     {
        //         name:'交易类型',
        //         width:'25%',
        //         color:'#ccc',
        //         cursor:'pointer',
        //         icon:'',
        //         children:[
        //             {color:'#000',key:'b1',cursor:'pointer'},
        //             {color:'#ccc',key:'b2'}
        //         ]
        //     },
        //     {
        //         name:'金额',
        //         width:'25%',
        //         color:'#ccc',
        //         key:'c',
        //         cursor:'pointer',
        //         icon:'',
        //         children:[]
        //     },
        //     {
        //         name:'操作',
        //         width:'25%',
        //         color:'#ccc',
        //         key:'d',
        //         cursor:'pointer',
        //         icon:'',
        //         children:[]
        //     }
        // ];
        //
        //
        // let data = [
        //     {
        //         id:1,
        //         icon:'http://172.16.21.17:8930//image/apiDoc/jiekouwendang_36.png',
        //         a1:'阿道夫就啊看风景阿克索德减肥了卡时间的反馈啦就是打开了飞机阿法快速的反馈及拉萨打飞机拉屎的空间',a2:'a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2',a3:'a3',b1:'b1',b2:'b2',c:'c',d:'d'
        //     },
        //     {
        //         id:2,
        //         icon:'http://172.16.21.17:8930//image/apiDoc/jiekouwendang_36.png',
        //         a1:'a1111',a2:'a2',a3:'a31111',b1:'b1',b2:'b2',c:'阿道夫看见咖剪短发阿迪时刻减肥卡拉屎的减肥阿道夫看见咖剪短发阿迪时刻减肥卡拉屎的减肥阿道夫看见咖剪短发阿迪时刻减肥卡拉屎的减肥阿道夫看见咖剪短发阿迪时刻减肥卡拉屎的减肥',d:'d'
        //     },
        //     {
        //         id:3,
        //         icon:'http://172.16.21.17:8930//image/apiDoc/jiekouwendang_36.png',
        //         a1:'a3333',a2:'a2',a3:'a33333',b1:'b1',b2:'b2',c:'c',d:'d'
        //     }
        // ];
        //
        //
        // table.show(data);
    }
};


app.run(Page);