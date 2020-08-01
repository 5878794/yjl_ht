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
require('./../../es6/yjl/b-win-top');
require('./../../es6/customElement/pc/table_list');
require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b_title1');
require('./../../es6/yjl/b-role-list');



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
        await all.getUserInfo();

        this.setDist();
        this.bindTitleBtn();

        //获取机构列表
        let [orgList] = await ajax.send([
           api.org_list({
               pageNum:1,
               pageSize:99999
           })
        ]);

        //处理机构列表数据
        orgList = orgList.list;
        orgList.map(rs=>{
           rs.name = rs.organizationName;
        });
        this.createList(orgList);

        //获取第一个机构下的产品
        if(orgList.length == 0){return;}
        let orglistDom = $('#list').get(0);
        orglistDom.triggerClick(0);
    },
    //产品类型字典
    setDist(){
        let productTypeDist = {};
        selectData.productType.map(rs=>{
            productTypeDist[rs.value] = rs.name;
        });
        this.productTypeDist = productTypeDist;
    },
    //机构添加
    bindTitleBtn(){
        let title = $('#b_title').get(0);
        title.btnData = [
            {name:'新增',type:'btn1',style:{color:'#5576f0'}}
        ];
        title.clickFn = function(){
            qt.openPage('o_add.html?name=机构名&type=2',
                winSetting.setting_add_role.width,
                winSetting.setting_add_role.height)
        };
    },
    //创建机构列表
    createList(data){
        let list = $('#list').get(0),
            _this = this;

        list.data = data;
        list.del = async function(data){
            if(await qt.confirm(`您确定要删除机构 ${data.name}?`)){
                qt.loading.show();
                _this.delOrg(data).then(rs=>{
                    qt.loading.hide();
                }).catch(e=>{
                    qt.loading.hide();
                    qt.alert(e);
                })
            }
        };
        list.click = function(data){
            _this.orgData = data;
            qt.loading.show();
            _this.showProduct(data).then(rs=>{
                qt.loading.hide();
            }).catch(e=>{
                qt.loading.hide();
                qt.alert(e);
            })
        }
    },
    //删除机构
    async delOrg(data){
        await ajax.send([
            api.org_del({
                organizationId:data.id
            })
        ]);

        await qt.alert('删除成功');
        qt.refreshPage();
    },

    //显示机构下的产品
    async showProduct(data){
        let body = $('#list_body');
        body.html('');

        //创建产品标题
        let title1 = $('<b-title1 name="'+data.name+'"></b-title1>');
        body.append(title1);
        this.createListTitle(title1.get(0),data);

        //创建产品列表
        let [product] = await ajax.send([
            api.org_product_list({
                organizationId:data.id,
                pageNum:1,
                pageSize:99999
            })
        ]);
        product = product.list;

        let table = $('<b-table-list></b-table-list>'),
            tableBody = $('<div class="index_list"></div>');
        tableBody.append(table);
        body.append(tableBody);
        this.createList1(table.get(0),product);



        body.removeClass('hidden');
    },
    //产品的标题 添加产品
    createListTitle(title,data){
        title.btnData = [
            {name:'新增',type:'btn1',style:{color:'#5576f0'}}
        ];
        title.clickFn = function(){
            let url = `o_add_product.html?orgId=${data.id}&name=${data.organizationName}`;
            qt.openPage(
                url,
                winSetting.setting_add_product.width,
                winSetting.setting_add_product.height)
        };
    },
    //产品列表
    createList1(table,product){
        let _this = this;

        tableSet.set(table,'setting_product');
        table.listBody.removeClass('boxflex1');

        product.map(rs=>{
            rs._productType = this.productTypeDist[rs.productType];
            rs._minMoney = '最小额度:'+rs.minMoney;
            rs._maxMoney = '最大额度:'+rs.maxMoney;
            rs._castRate = '成本费率:'+rs.castRate;
            rs._castServiceRate = '服务费:'+rs.castServiceRate;
        });

        table.show(product);

        table.body.find('.__key8__').each(function(){
            $(this).addClass('box_hcc').html('');
            let data = $(this).parent().data('data');
            let edit = $('<div data-type="edit" class="box_hcc hover">编辑</div>'),
                del = $('<div data-type="del" class="box_hcc hover">删除</div>');

            edit.css({
                width:'60px',
                height:'24px',
                borderRadius:'5px',
                background:'#5576f0',
                color:'#fff',
                margin:'0 5px',
                fontSize:'14px'
            }).data({data:data});
            del.css({
                width:'60px',
                height:'24px',
                borderRadius:'5px',
                background:'red',
                color:'#fff',
                margin:'0 5px',
                fontSize:'14px'
            }).data({data:data});
            $(this).append(edit).append(del);

            edit.click(function(){
                let data = $(this).data('data');
                console.log(data);
                console.log(_this.orgData)
                let url = `o_add_product.html?id=${data.id}&orgId=${_this.orgData.id}&name=${_this.orgData.organizationName}`;
                console.log(url)
                qt.openPage(
                    url,
                    winSetting.setting_add_product.width,
                    winSetting.setting_add_product.height)
            });

            del.click(async function(){
                let data = $(this).data('data');

                if(await qt.confirm(`您确定要删除产品 ${data.productName}?`)){
                    qt.loading.show();
                    _this.delProduct(data).then(rs=>{
                        qt.loading.hide();
                    }).catch(e=>{
                        qt.loading.hide();
                        qt.alert(e);
                    })
                }
            });

        });
    },

    //删除产品
    async delProduct(data){
        await ajax.send([
            api.org_product_del({
                productId:data.id
            })
        ]);

        await qt.alert('删除成功');
        // qt.refreshPage();
    }
};


app.run(Page);