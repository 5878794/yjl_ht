



let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    inputStyle = require('./../../es6/inputStyle');


require('./../../es6/yjl/b_order_info');
require('./../../es6/yjl/b_follow_record');
require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b_title1');
require('./../../es6/customElement/pc/input');
require('./../../es6/customElement/pc/input_date');
require('./../../es6/customElement/pc/input_file');



let loading;
let Page = {
    init(){
        // loading = new loadFn();
        // loading.show('急速加载中');
        this.run().then(rs=>{
            // loading.hide();
        }).catch(rs=>{
            // err.error(rs);
            // loading.hide();
            // app.alert(rs);
            throw rs;
        });
    },
    async run(){
        inputStyle.set(true,true);

        this.setPart1();
        this.setPart2();

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
            state:'待回款1'
        };
        // part1.click = function(data){
        // 	console.log(data)
        // }


    },
    setPart2(){
        let part2 = $('#record').get(0);
        let data = [
            {
                no:'1',
                info:'同意',
                img:['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594181331374&di=cf77ff4f40436b635d59c92f8076c4b8&imgtype=0&src=http%3A%2F%2Fspider.nosdn.127.net%2Fbf695201a8eade248b9362bda0bdb446.jpeg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594181331374&di=cf77ff4f40436b635d59c92f8076c4b8&imgtype=0&src=http%3A%2F%2Fspider.nosdn.127.net%2Fbf695201a8eade248b9362bda0bdb446.jpeg'],
                date:'2020-11-11',
                user:'张三'
            },
            {
                no:'1',
                info:'同意',
                img:['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594181331374&di=cf77ff4f40436b635d59c92f8076c4b8&imgtype=0&src=http%3A%2F%2Fspider.nosdn.127.net%2Fbf695201a8eade248b9362bda0bdb446.jpeg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594181331374&di=cf77ff4f40436b635d59c92f8076c4b8&imgtype=0&src=http%3A%2F%2Fspider.nosdn.127.net%2Fbf695201a8eade248b9362bda0bdb446.jpeg'],
                date:'2020-11-11',
                user:'张三'
            }
        ];
        part2.data = data;

    }

};


app.run(Page);