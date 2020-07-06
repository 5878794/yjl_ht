let app = require('./../../es6/lib/page'),
    lib = require('./../../es6/lib');



//     // device = require('./lib/device'),
//     // getParamFromUrl = require('./lib/fn/getParamFromUrl'),
//     loadFn = require('./../../es6/lib/ui/loading_old'),
//     // $$ = require('./lib/event/$$'),
//     // info = require('./lib/ui/info'),
//     // s2t = require('./lib/fn/timeAndStamp'),
//     // areaData = require('./lib/code/areaCode'),
//     // {ajax,api} = require('./_ajax'),
//     err = require('./../../es6/lib/fn/errorHandler');
//


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
        this.setIframeSize();
        this.navEvent();
    },

    //设置iframe大小
    setIframeSize(){
        let iframe = $('#iframe'),
            iframeBody = $('#iframe_body'),
            setFn = function(){
                let width = parseInt(iframeBody.width()),
                    height = parseInt(iframeBody.height());

                iframe.css({
                    width:width+'px',
                    height:height+'px'
                });

                iframe.get(0).width = width;
                iframe.get(0).height = height;
            };

        setFn();

        $(window).resize(function(){
            setFn();
        })
    },
    navEvent(){
        let btn = $('#menu').find('.__item__');

        btn.click(function(){
            let href = $(this).attr('href');
            if(href!=''){
                btn.removeClass('select');
                $(this).addClass('select');
                //打开页面
                lib.iframeGoTo('../index/home.html');
            }



            let child = $(this).parent().find('.menu_children_body');
            if(child.length != 0){
                console.log(this)
                if(child.hasClass('hidden')){
                    $(this).find('span').addClass('arrow_up').removeClass('arrow_down');
                    child.removeClass('hidden');
                }else {
                    $(this).find('span').removeClass('arrow_up').addClass('arrow_down');
                    child.addClass('hidden');
                }
            }
        });

        btn.eq(0).trigger('click');
    }
};


app.run(Page);