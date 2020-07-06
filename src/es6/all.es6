let lib = require('./lib');


let page = {
    init(){
        this.chooseNav();
        this.navEvent();
    },
    chooseNav(){
        let path = window.location.pathname;
        //补全path
        if(path.substr(path.length-1) == '/'){
            path = path+'index.html';
        }

        let allItem = $('#menu').find('.__item__');
        allItem.each(function(){
            let thisSrc = $(this).attr('href');
            if(thisSrc.indexOf(path)>-1){
                $(this).addClass('select');
            }
        })
    },
    //左侧菜单
    navEvent(){
        let btn = $('#menu').find('.__item__');

        btn.click(function(){
            let href = $(this).attr('href');
            if(href!=''){
                //打开页面
                lib.pageGoTo(href);
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
    }
};



$(document).ready(function(){
    page.init();
});