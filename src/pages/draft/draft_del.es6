



let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib'),
    inputStyle = require('./../../es6/inputStyle');




require('./../../es6/customElement/pc/input');



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
        inputStyle.set();
        this.bindEvent();

    },
    bindEvent(){
        let btn = $('#submit'),
            _this = this;

        btn.click(function(){

            _this.submit().then(rs=>{

            }).catch(e=>{
                console.log(e)

            })
        });


    },
    async submit(){
        let info = await $('#info').get(0).checkPass();

        console.log(info)
    }
};


app.run(Page);