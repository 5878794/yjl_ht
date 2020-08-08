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
require('./../../es6/yjl/b_title');
require('./../../es6/yjl/b-group-switch');


let loading;
let Page = {
	init(){
		all.showLoadingRun(this,'run');
	},
	async run(){
		await all.getUserInfo();

		let [data] = await ajax.send([
			api.data_process_list()
		]);

		this.createGroup(data);

	},
	createGroup(data){
		let body = $('#body'),
			_this = this;

		data.map(rs=>{
			let title = $(`<b-title name="${rs.typeName}"></b-title>`),
				row = $('<div class="openWin_input_main box_hlt box_lines"></div>'),
				childData = rs.children;
			childData = this.handlerChildrenData(childData);

			childData.map(child=>{
				let groupName = child[0].groupName,
					div = $(`<div class="openWin_input_item3"></div>`),
					groupItem = $(`<b-group-switch name="${groupName}"></b-group-switch>`);

				groupItem.get(0).data = child;
				groupItem.get(0).click = function(data){
					qt.loading.show();
					_this.submitMdfData(data).then(rs=>{
						qt.loading.hide();
						this.btn.addClass('gray');
					}).catch(async e=>{
						qt.loading.hide();
						await qt.alert(e);
						qt.refreshPage();
					});
				};
				div.append(groupItem);
				row.append(div);
			});

			body.append(title).append(row);
		});

	},
	handlerChildrenData(data){
		let obj = {};
		data.map(rs=>{
			if(!obj[rs.groupType]){
				obj[rs.groupType] = [];
			}

			rs.name = rs.text;
			rs.selected = (rs.open==1)? true : false;
			obj[rs.groupType].push(rs);
		});

		let backData = [];
		for(let [key,val] of Object.entries(obj)){
			backData.push(val);
		}

		return backData;
	},
	async submitMdfData(data){
		let getData = function(data){
			let back = [];
			data.map(rs=>{
				rs.open = (rs.selected)? 1 : 0;
				back.push(api.data_process_mdf(rs));
			});
			return back;
		};
		await ajax.send(getData(data));

		qt.alert('修改成功!');
	}
};


app.run(Page);