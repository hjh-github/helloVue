var CL = {
	init:function(){
		var _this = this;
		
		//打开弹窗
		$(".ttt").click(function () {
			_this.openDialog($(this))
		});

		// 关闭弹窗
		$(".closeDialog").click(function () {
			_this.close($(this))
		});

		//弹窗拖动
		$("#moduleSetDialog .dialogBox").draggable({
			handle: ".DialogTitle"
		})
	},
	createModuleid:function(){
		var id = Math.random();
	},	
	addScript:function(option){
		option.callback(option)
		/*
		[动态加载js]
		option{	
			src:需要动态加载的js的路径      type --> string
			callback:当js加载完后的回调函数  type --> function
		}
		*/
	    // this._doc = document.getElementsByTagName('body')[0];
	    // this.scripts = document.getElementsByTagName('script');
	    // this.js = document.createElement('script');
		// this.haveJs = true;
		//this.finish = false;
		// this.parameterArr =  sessionStorage.getItem(option.moduleType);
		// if(this.parameterArr){
		// 	this.parameterArr = [];
		// 	this.parameterArr.push(option.parameter);
		// }else{
		// 	console.log(this.parameterArr);
		// }
		// sessionStorage.setItem(option.moduleType,this.parameterArr);
		// this.callback = function(){
		// 	if (!/*@cc_on!@*/0) { //if not IE
		// 		//Firefox2、Firefox3、Safari3.1+、Opera9.6+ support js.onload
		// 		this.js.onload = function () {
		// 			//当js完成加载执行初始化
		// 			if (typeof option.callback=="function"){
		// 				option.callback(option)
		// 			};
		// 			//this.finish = true;
		// 		}
		// 	} else {
		// 		//IE6、IE7 support js.onreadystatechange
		// 		this.js.onreadystatechange = function () {
		// 		   //当js完成加载执行初始化
		// 		   if (typeof option.callback=="function"){
		// 				   option.callback(option);
		// 			}
		// 			//this.finish = true;
		// 		}
		// 	}
		// };
		// this.init = function(){
		// 	for(var i = 0;i<this.scripts.length;i++){

		// 		if(!this.scripts[i].getAttribute("src"))continue;//如果链接为空跳出本次循环

		// 		if(this.scripts[i].getAttribute("src") == option.src){
		// 			this.haveJs = false;
		// 		};//如果有这个js就不重复加载了
		// 	}
			
		// 	//将js添加到body里面
		// 	if(this.haveJs){
		// 		this.js.setAttribute('type', 'text/javascript');
		// 		this.js.setAttribute('src', option.src);
		// 		this._doc.appendChild(this.js);
		// 	}
		// 	this.callback();
		// }
		// this.init();	
	},
	moduleInit:{},//储存所有模块初始化的js
	initScript:function(option){

		//如果需要初始化就拼接初始化的代码
		var _script = '';
		
		if (option.src){
			_script = '<script>CL.addScript\({"src" : "';
			_script += option.src;
			_script += '",callback: function\(\){';
			_script += option.moduleInit + '\("';
			_script += option.moduleid + '","';
			_script += option.layout + '",';
			_script += option.parameter ;
			_script += '\);\}\}\);</script>';
			this.moduleInit[option.moduleid] = _script;
		}else if (option.moduleInit == 'product' || option.moduleInit == 'news') {
				let tabulationUrl = 'service/' + option.moduleInit + '/list.html';
				let tabulationData = {};
				if (option.moduleInit == 'product') {
					tabulationData = {
						state: 1,
						rows: option.rows,
						page: 1,
						productCateId: app.selectClassify.CateId
					};
				} else if (option.moduleInit == 'news') {
					tabulationData = {
						state: 1,
						rows: option.rows,
						page: 1,
						newsCateId: app.selectClassify.CateId
					};
				}
				var getData = "";
				var strtabulationData = JSON.stringify(tabulationData);
				var curentLayout = $('#headlineContent').attr('data-layout');
				var currenModuleId = $('#headlineContent').attr('data-currentmodule');
				if (app.hasCallBack) {
					hasCallback = '1';
				}else{
					hasCallback = '0';
				}
			_script = '<script>MK.getData(' + strtabulationData + ',"' + tabulationUrl + '","' + currenModuleId + '","' + option.moduleInit + '","' + curentLayout + '","' + hasCallback + '")</script>';
			if ($("#moduleJs" + option.moduleid).length>0){
				$("#moduleJs" + option.moduleid).html(_script);
				return;
			}
		}else{
			_script = "";
		}
		//给模块外层加外壳
		let _module = '<div data-type="publicModule" id="';
		_module += option.moduleid;
		_module += '" data-hasCallBack="';
		_module += app.hasCallBack;
		_module += '" class="moduleItem publicBox ';
		_module += option.moduleInit + '-layout' + option.layout + " " + option.moduleInit + '" data-dialogId = "' + option.moduleInit + '" data-layout = "' + option.layout +'"><div id="container';
		_module += option.moduleid;
		_module +='" class="receptacleWd"><div class="receptacle">';
		_module += option.moduleContent;
		_module += '</div></div>';
		_module += '<div id="moduleJs';
		_module += option.moduleid;
		_module += '">';
		_module +=_script;
		_module +='</div>';
		_module += '</div>';
		return _module;
	},
	objSlideDown: function (obj, goTop){
		obj.css({
			'position': 'absolute',
			'top': '-99999px',
		});
		var moduleHeight = obj.outerHeight();
		obj.css({
			"height": 0,
			'position': 'static',
		});
		if(goTop){
			$('#edit').scrollTop(0);
		} else if($('#editContent').children().length > 1){
			let objPrev = $('#editContent').children().eq(obj.index() - 1);
			$('#edit').scrollTop(objPrev[0].offsetTop + objPrev.outerHeight());	
		}
		obj.animate({
			"height": moduleHeight,
		},function(){
			obj.attr('style','');
		})
	},
	// 转义body特定（‘<>’,'()','script'）字符转义
	recoverSymbol: function (value){
			if (value == null)return null;
			value = value.replace(/&lt;/g, "\<").replace(/&gt;/g, ">");
			value = value.replace(/&#40;/g, "\(").replace(/&#41;/g, "\)");
			value = value.replace(/&#39;/g, "'");
			value = value.replace(/clscrptxmt/g, "script");
			return value;
	},
	// 先将(")转成 （'）,再将(')转成（"）【为了防止 双引号 直接闭合】（bodyStyle专用）
	recoverStyle: function (value){
		if (value == null)return null;
		value = this.recoverSymbol(value);
		value = value.replace(/"/g, "'");
		value = value.replace(/&quot;/g, '"');
		return value;
	},
	// 创建一个组件盒子
    setModuleContainer : function(option){
		//如果需要初始化就拼接初始化的代码
		var _script = '';
		
		if (!option.hasCallBack == ""){
			_script = '<script>CL.addScript\({"src" : "';
			_script += option.src;
			_script += '",callback: function\(\){';
			_script += option.moduleInit + '\("';
			_script += option.moduleid + '","';
			_script += option.layout + '",';
			_script += option.parameter ;
			_script += '\);\}\}\);</script>';
			this.moduleInit[option.moduleid] = _script;
		}else if (option.moduleInit == 'product' || option.moduleInit == 'news') {
				let tabulationUrl = 'service/' + option.moduleInit + '/list.html';
				let tabulationData = {};
				if (option.moduleInit == 'product') {
					tabulationData = {
						state: 1,
						rows: option.rows,
						page: 1,
						productCateId: app.selectClassify.CateId
					};
				} else if (option.moduleInit == 'news') {
					tabulationData = {
						state: 1,
						rows: option.rows,
						page: 1,
						newsCateId: app.selectClassify.CateId
					};
				}
				var getData = "";
				var strtabulationData = JSON.stringify(tabulationData);
				var curentLayout = $('#headlineContent').attr('data-layout');
				var currenModuleId = $('#headlineContent').attr('data-currentmodule');
				if (app.hasCallBack) {
					hasCallback = '1';
				}else{
					hasCallback = '0';
				}
			_script = '<script>MK.getData(' + strtabulationData + ',"' + tabulationUrl + '","' + currenModuleId + '","' + option.moduleInit + '","' + curentLayout + '","' + hasCallback + '")</script>';
			if ($("#moduleJs" + option.moduleid).length>0){
				$("#moduleJs" + option.moduleid).html(_script);
				return;
			}
		}else{
			_script = "";
		}

		// 模块外壳拼接
		let _module =[],
			_div_end = '</div>';
		let _inner = '<div class="">';
		/** 内壳特殊处理 */
		// 文字组件需要双击编辑
		if(option.moduleInit == "wordage"){
			_inner = '<div class="wordageEditor wd-break-word" contenteditable="true">'
		}
		// 模块外壳拼接 start
		_module.push('<div id="module');
		_module.push(option.id);
		// 是否需要初始化
		_module.push('" data-hasCallBack="');
		_module.push(option.hasCallBack);
		// 组件新增后放置的位置
		_module.push('" style="left:'+option.pos.left+'px;top:'+option.pos.top+'px');
		//  组件必须带功能class
		_module.push('" class="dragFree allResizable editorClass ');
		// 组件样式class 
		_module.push(option.moduleInit + '-layout' + option.layout + " " + option.moduleInit);
		// 需要的弹窗类型
		_module.push('" data-dialog = "' + option.moduleInit)
		// 当前组件的id，可以用来做编辑
		_module.push('" data-id = "' + option.id +'">');
		// 标题盒子 
		_module.push('<div class="contentTitle">');
		_module.push(option.moduleTitle);
		_module.push(_div_end);
		// 标题盒子 end
		// 组件内容 start
		_module.push('<div class="receptacleWd">');
		_module.push(_inner);
		_module.push(option.moduleContent);
		_module.push(_div_end);
		_module.push(_div_end);
		// 组件内容 end

		if(option.hasCallBack == ""){
			// 不需要js初始化,直接闭合容器 div
			_module.push(_div_end);
			
		}else{
			// js初始化 start
			_module.push('<div id="moduleJs');
			_module.push(option.id);
			_module.push('">');
			_module.push(_script);
			_module.push(_div_end);
			// js初始化 end
			// 闭合容器 div
			_module.push(_div_end);
		}
		 return _module.join('');
	},
	close: function (dialog, callBack) {
		dialog.closest(".dialogBox").fadeOut();
		if (typeof callBack == 'function') {
			callBack()
		}
		if (dialog.attr("data-isSecond") == "0") {
			$("#masklayerDialog").hide();
		} else {
			$("#masklayerDialog").css({
				'z-index': '999'
			});
		}
	},
	openDialog: function (obj,beforeFn) {
		var iframeFile = obj.attr('data-dialog');
		var dialog;
		$("#masklayerDialog").show();
		if (iframeFile == 'commonStyleSet' || iframeFile == 'effect'){
			dialog = $('#commonDialog');
		}else{
			dialog = $("#moduleSetFileWb");
		}
		dialog.fadeIn();
		dialog.find('iframe').attr('src', './moduleSet/set_dialog_html/' + iframeFile +'.html')
		if (typeof beforeFn == 'function') {
			beforeFn()
		}
	}
}
$(function (){
	CL.init();
})

	



