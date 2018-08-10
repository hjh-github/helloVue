/**
 * Created by GDCL-A201011 on 2017/9/6. 
 */

function get_cache(key) {
	return localStorage.getItem(key);

}
var userWebId = get_cache("id");
var ue = UE.getEditor('myEditor');
var pageId = GetQueryString('pageId');

function httpForm(url, data, callback) {
	loadToate();
	$.ajax({
		type: 'POST',
		url: url,
		data: data,
		cache: false,
		processData: false,
		contentType: false,
		dataType: "json",
		success: function (res) {
			loadClear();
			callback(res);
		}
	})
}
var domain = sessionStorage.getItem("domain")
//引入vue实例
var newsVm = new Vue({
	el: '#newsApp',
	data: {
		compatSize: '',
		compatSizeStyle: {
			style: {
				width: 'auto',
				height: '220px',
			}
		},

		userWebId: userWebId, // 用户id,每个接口都要传的参数
		//pageId: pageId, //新闻title初始为空
		i: 0, //匹配新闻title的类
		searchFlag: true, //搜索框
		dataName: '', //查询新闻列表和回收站列表的name
		state: 1, //1为新闻列表 2为回收站

		newsBlock: 'list', //新闻的几个分类显示
		firstList: [], //一级分类数据
		curLength: 0, //判断分类里的添加
		secondList: [], //二级分类数据
		levelFlag: true, //新闻分类的一级和二级的开关

		/*保存新闻页面部分*/
		topLevel: '', //保存页面联动的顶级
		sonLevel: '', //子集
		sonLevelArr: [], //子集的临时数组
		currentId: '', //保存页面的当前选项的id
		sonLevelFlag: false, //子集开关
		btnShow: false, //btn蒙皮开关

		description: '', //文章的描述
		summary: '', //摘要
		newsName: '', //文章标题
		newsList: [], //新闻列表
		listIdArr: [], //新闻列表id数组, 用来做全选
		listArr: [], //新闻列表的单选绑定在一个数组
		checkallFlag: false, //全选按钮
		dataName: '', //名字
		pageSize: 10, //每页的条数
		pageIndex: '', //当前的页码
		totalArr: [], //页数的数组
		showTotalArr: [], //显示的数组
		total: '', //页数

		totalPage: 1, //判断时要对比的总共页数
		jumpPage: '', //跳转的页码
		//保存编辑新闻页面部分
		newsId: 0, //提交的id初始为0
		/*回收站*/
		recycleList: [], //回收站列表
		recycleArr: [], //回收站的checkBox绑定的数组
		recycleIdArr: [], //回收站列表id数组, 用来做全选
		checkallFlagR: false, //全选按钮

		info: {}, //新闻详情接口 空对象

		popUpFlag: false, //批量删除的弹框

		tipsFlag: false, //批量删除的弹框的提示语
	},
	//创建完vue实例时调用的方法 有用户id才调
	mounted: function () {
		this.$nextTick(function () {
			var _this = this;
			var data = {};
			url = domain + 'service/news/page.html';

			function callback(res) {

				//回调函数的原因
				//请求新闻列表
				var name = newsVm.dataName;
				var obj = {
					state: 1,
					rows: 10,
					page: 1,
					name: '',
					//pageId: _this.pageId
				}
				newsVm.getDataList(obj);
			};
			httpPostNews(url, data, callback);
		})
	},
	methods: {
		//没有数据，添加新闻
		toAddNews: function () {
			//跳去保存新闻页面
			this.showSave();
		},
		//搜索  newsBlock == 'list'
		search: function (newsBlock) {
			if (newsBlock === 'list') {
				newsVm.getList(1, 1);
			} else {
				newsVm.getList(2, 1);
			}
		},
		//nav文章切换 
		showNewsList: function () {
			this.newsBlock = "list";
			this.getList(1, 1)
		},
		//显示保存新闻页面
		showSave: function () {
			ue.setHeight(300);
			//查看一级分类有没有数据，没有提示到分类添加分类数据
			var _this = this;

			var data = {
					level: 1,
					//pageId: _this.pageId
				},
				url = domain + 'service/newsCate/list.html';

			function callback(res) {
				_this.firstList = res.data.newsCateList;
				_this.newsBlock = 'save';
				_this.searchFlag = false;
				//如果没有分类 提示去添加分类
				if (!_this.firstList.length) {
					return showTips('没有文章分类，请添加分类');
				}
				//把保存新闻页面表单初始化

				// 把保存新闻页面表单清空
				_this.clearSaveForm();
			};
			httpPostNews(url, data, callback);
		},
		clearSaveForm: function () {
			this.topLevel = '';
			this.sonLevel = '';
			this.newsName = '';
			//隐藏阅览图片
			$('.imgFather').addClass('displayN').removeClass('displayB');
			this.summary = '';
			this.description = '';
			//清空富文本
			ue.setContent('');
			// 把newsId和currentId 初始化
			this.newsId = 0;
			this.currentId = '';
		},
		showClassify: function () {
			this.showClass(); //显示新闻分类模块
			this.reqData(1);
			this.reqData(2);
		},
		showOneClass: function () {
			var _this = this;
			if (!_this.levelFlag) {
				_this.levelFlag = true;
			}
			_this.reqData(1);
		},
		showTwoClass: function () {
			var _this = this;
			//对比data的数组跟后台的数组是不是一样
			var url = domain + 'service/newsCate/list.html',
				data = {
					level: 1
				};

			function callback(res) {
				var obj = {
					id: 0,
					parentId: 0,
					level: 1,
					name: '',
					parentName: '', //要初始值
					sort: 0
				};
				//length判断
				newsVm.curLength = res.data.newsCateList.length;
				var length = newsVm.firstList.length;
				//判断有没有保存
				if (length > newsVm.curLength) {
					return showTips('你还没保存');
				}
				if (_this.levelFlag) {
					_this.levelFlag = false;
				}
				_this.reqData(2);
			};
			httpPostNews(url, data, callback);

		},
		reqData: function (level) {
			var _this = this;
			var url = domain + 'service/newsCate/list.html',
				data = {
					level: level
				};

			function callback(res) {
				if (level == 1) {
					_this.firstList = res.data.newsCateList;
				} else if (level == 2) {
					_this.secondList = res.data.newsCateList;
				}
			};
			httpPostNews(url, data, callback);
		},
		//显示新闻分类模块
		showClass: function () {
			newsVm.newsBlock = 'class';
			newsVm.searchFlag = false;
		},
		//显示新闻列表
		showList: function () {
			newsVm.newsBlock = 'list';
			newsVm.searchFlag = true;
		},
		//显示回收站
		showRecycle: function () {
			newsVm.newsBlock = 'recycle';
			newsVm.searchFlag = true;
		},
		//一级删除一条数据
		shift: function (id, level) {
			if (id === 0) {
				if (level === 1) {
					//删除一级最后一条
					this.firstList.pop();
				} else {
					//删除二级最后一条
					this.secondList.pop();
				}
			} else {
				var url = domain + 'service/newsCate/del.html',
					data = {
						id: id
					};
				//判断当前分类下级有没有分类
				function callback(res) {
					// console.log(res);
					if (res.success) {
						newsVm.reqData(level);
						showTips('删除成功');
					} else {
						alert(res.message); //回收站里面有也算
					}
				};
				httpPostNews(url, data, callback);
			}
		},
		//保存或修改 level=1 为一级 二级区分
		save: function (index, level) {
			var item = {};
			if (level == 1) {
				item = newsVm.firstList[index]; //一级的item
			} else {
				item = newsVm.secondList[index]; //二级的item
				//上级分类不能为空
				if (item.parentName == '') {
					return showTips('上级分类名字不能为空');
				}
			}
			if (item.name === '') {
				return showTips('分类名称不能为空');
			}
			if (item.sort === '') {
				return showTips('排序不能为空');
			}
			var data = {
					id: item.id,
					parentId: item.parentId,
					level: item.level,
					name: item.name,
					sort: item.sort
				},
				url = domain + 'service/newsCate/save.html';

			function callback(res) {
				if (!res.success) {
					var str = res.message + '';

					showTips(str);
				} else {
					showTips('保存成功');
					newsVm.reqData(level); //请求分类 1为1级 二为二级
				}
			};
			httpPostNews(url, data, callback);
		},
		//一级二级添加分类
		addClass: function (level) {
			//对比data的数组跟后台的数组是不是一样
			var url = domain + 'service/newsCate/list.html',
				data = {
					level: level
				};

			function callback(res) {
				var obj = {
					id: 0,
					parentId: 0,
					level: level,
					name: '',
					parentName: '', //要初始值
					sort: 0
				};
				//length判断
				if (level == 1) {
					newsVm.curLength = res.data.newsCateList.length;
					var length = newsVm.firstList.length;
					//判断有没有保存
					if (length > newsVm.curLength) {
						return showTips('你还没保存');
					}
					newsVm.firstList.push(obj);
				} else if (level == 2) {
					newsVm.curLength = res.data.newsCateList.length;

					var length = newsVm.secondList.length;
					//判断有没有保存
					if (length > newsVm.curLength) {
						return showTips('你还没保存');
					}
					newsVm.secondList.push(obj);
				}
			};
			httpPostNews(url, data, callback);
		},
		//二级选择 聚焦效果：显示下拉框
		shouLi: function (event) {
			var el = event.currentTarget;
			var option = $(el).next().show();
		},
		//离焦效果：隐藏下拉框
		hideLi: function (event) {
			var el = event.currentTarget;
			var option = $(el).next().hide();
		},
		//二级select 选择
		choose: function (parentId, index, parentName, event) {
			//改变父级id
			newsVm.secondList[index].parentId = parentId;
			//改变父级名字
			newsVm.secondList[index].parentName = parentName;
			var el = event.currentTarget;
			//把option隐藏
			$(el).parents('.option').hide();
		},
		//保存页面 联动
		//聚焦
		getFather: function (event) {

			var el = event.currentTarget;
			$(el).next().show();
			//请求一级二级数据
			newsVm.reqData(1);
			newsVm.reqData(2);
			$(el).parent().addClass("is-focus");
		},
		//离焦 隐藏下拉框
		hideSonli: function (event) {
			var el = event.currentTarget;
			$(el).next().hide();
			$(el).parent().removeClass("is-focus");
		},
		/*保存新闻页面部分*/
		//赋值
		gettopLevel: function (name, topLevelId, event, item) {
			var _this = this;
			_this.topLevel = name;
			var el = event.currentTarget;
			$(el).parent().hide();

			//赋值 传进来的赋值赋值给vue实例
			_this.currentId = topLevelId;

			//找出二级联动
			_this.findSecondLink();
			//没有子集就把 子集的框隐藏
			if (_this.sonLevelArr.length == 0) {
				_this.sonLevelFlag = false;
				//没有子集就显示提示语
				_this.tipsFlag = true;
			} else {
				//子集input显示
				_this.sonLevelFlag = true;
				//把子集的input清空
				_this.sonLevel = '';
				//有子集就隐藏
				_this.tipsFlag = false;
			}
		},
		findSecondLink: function () {
			var _this = this;
			//先重置二级联动数组为[]
			_this.sonLevelArr = [];
			//找出二级联动
			for (var i = 0, len = _this.secondList.length; i < len; i++) {
				//判断二级分类数组中的parentId 是否等于传进来的id
				if (_this.secondList[i].parentName == _this.topLevel) {
					_this.sonLevelArr.push(_this.secondList[i]);
				}
			}
		},
		//子集 聚焦
		findSon: function (event) {
			var el = event.currentTarget;
			$(el).next().show();
			$(el).parent().addClass("is-focus");
			// console.log(this.sonLevelArr);
			this.findSecondLink(); //二级联动
		},
		//把子级赋值
		getsonLevel: function (name, sonLevelId, event) {
			this.sonLevel = name;
			var el = event.currentTarget;
			$(el).parent().hide();
			this.currentId = sonLevelId;
		},
		//上传图片
		newsImgUpload: function (previewId, event) {

			var file = $('#saveNewFile')[0].files[0];
			if (file) {
				var maxSize = 500 * 1024;
				var iconSize = file.size;
				if (iconSize > maxSize) {
					return showTips('图片超过300kb');
				}
				$('.imgFather').addClass('displayB').removeClass('displayN');
				$preview = $('#' + previewId);
				var url = getObjectURL(file);
				$preview.attr('src', url);
				$('#saveNewFile').attr("value", "");
			}
		},
		//保存新闻提交
		saveNews(e) {
			var _this = this;
			if (newsVm.topLevel === '') {
				return showTips('文章分类不能为空');
			}
			if (newsVm.newsName === '') {
				return showTips('文章标题不能为空');
			}
			var imgSrc = $('#saveFile').attr('src');
			if (imgSrc == '') {
				return showTips('你还没有上传图片');
			}

			if (newsVm.summary === '') {
				return showTips('文章摘要不能为空');
			}
			var ueContent = ue.getContent(); //获取ue的html

			if (ueContent === '') {
				return showTips('文章内容不能为空');
			}
			var formData = new FormData($('#saveNews')[0]);

			var url = domain + 'service/news/save.html';
			var file = $('#saveNewFile')[0].files[0];
			var $file = $('#saveNewFile');
			_this.btnShow = true;

			function callback(res) {
				if (res) {
					// console.log(res);
					loadClear();
					//提示
					showTips('保存成功');
					_this.btnShow = false
					$('#saveFile').attr('src', '');
					$('.imgFather').addClass('displayN').removeClass('displayB');
					//跳到新闻列表页面
					_this.showList();
					//刷新新闻列表
					_this.getList(1, 1);
					// 把表单清空
					newsVm.topLevel = '';
					newsVm.sonLevel = '';
					newsVm.newsName = '';
					newsVm.summary = '';
					newsVm.description = '';
					//清空file文件
					// $file.after($file.clone().val("")); 
					// $file.remove();
					//清空富文本
					ue.setContent('');
					// 把newsId和currentId 初始化
					_this.newsId = 0;
					_this.currentId = '';
				} else {
					this.btnShow = true
					return showTips('上传失败');

				}
			}
			httpForm(url, formData, callback);

		},

		//渲染文章列表和回收站列表
		getList: function (state, page) {
			if (page === "") {
				return showTips("请输入页码");
			}
			if (page !== null) {
				if (newsVm.totalPage !== 0) {
					if ((page - 1) == newsVm.totalPage) {
						return showTips('已经是最后一页');
					} else if ((page - 1) > newsVm.totalPage) {
						//如果是大于最后一页就跳到最后一页
						page = newsVm.totalPage;
					} else if (page < 1) {
						showTips('已经是第一页');
						return;
					};
				}
			};
			var obj = {
				state: state,
				rows: 10,
				page: page,
				name: newsVm.dataName
			}
			this.getDataList(obj);
			//需要重置当前页
		},
		//单纯请求列表数据 原始函数
		getDataList: function (obj) {
			var _this = this;
			var url = domain + 'service/news/list.html',
				data = {
					state: obj.state,
					rows: obj.rows,
					page: obj.page,
					name: newsVm.dataName
				};

			function callback(res) {
				// console.log(res)
				if (obj.state == 1) {
					if (!res.data.newsList.length) {
						msgToast({
							title: '提示',
							msg: '当前类型下没有文章，可到文章分类下添加文章',
							confirmBar: "确定",
							confirm: function () {
								//跳去分类页面
								_this.newsBlock = "class";
								return false;
							}
						})
					}
					_this.newsList = res.data.newsList;

					_this.pageSize = res.data.pageSize;
					_this.pageIndex = res.data.pageIndex;
					var page = Math.ceil(res.total / _this.pageSize);
					_this.totalPage = page;
					//页码的数组
					_this.totalArr = _this.changeArr(page);
					//显示
					_this.showPages(_this.pageIndex);
					//重置原来的分类数组
					_this.reqData(1);
					_this.reqData(2);

					_this.levelFlag = true;
				} else {
					newsVm.recycleList = res.data.newsList;
					//公用
					newsVm.pageSize = res.data.pageSize;
					newsVm.pageIndex = res.data.pageIndex;
					var page = Math.ceil(res.total / newsVm.pageSize);
					newsVm.totalPage = page;
					//页码的数组
					newsVm.totalArr = newsVm.changeArr(page);
					//显示
					newsVm.showPages(newsVm.pageIndex);
				}
			};
			httpPostNews(url, data, callback);
		},
		//总条数转为数组
		changeArr: function (n) {
			var arrTotal = [];
			for (var i = 1; i < n + 1; i++) {
				arrTotal.push(i);
			}
			return arrTotal;
		},
		//page为当前项索引加1 pageIndex是显示的当前业，totalArrLength是有多少页
		showPages: function (n) {
			var page = parseInt(n);
			var all = newsVm.totalArr;
			if (all < 8) {
				newsVm.showTotalArr = all;
			} else {
				if (page < 4) {
					newsVm.showTotalArr = all.slice(0, 7);
				} else if (page > all.length - 3) {
					newsVm.showTotalArr = all.slice(all.length - 7, all.length);
				} else {
					newsVm.showTotalArr = all.slice(page - 4, page + 3);
				}
			}
		},
		//拼接新闻列表临时数组 也可以在回收站用
		getIdArr: function (arr) {
			var newArr = [];
			for (var i = 0, len = arr.length; i < len; i++) {
				newArr.push(arr[i].id);
			}
			return newArr;
		},
		//全选
		checkAll: function () {
			newsVm.listIdArr = newsVm.getIdArr(newsVm.newsList);
			var arr = newsVm.listIdArr;
			if (!newsVm.checkallFlag) {
				newsVm.listArr = [];
			} else {
				newsVm.listArr = arr;
			}
		},

		//单个选
		singleCheck: function () {
			//当页列表的id临时数组长度
			var id = newsVm.listIdArr,
				//v-model 已经勾选的数组长度
				check = newsVm.listArr; //不能改数组的长度
			//长度一样, 全选按钮选中 不一样不选中
			if (id.length == check.length && id.length !== 0) {
				newsVm.checkallFlag = true;
			} else {
				newsVm.checkallFlag = false;
			}
		},
		//批量删除
		batchDel: function () {
			var _this = this;
			if (_this.listArr.length == 0) {
				return showTips('请选择');
			}
			newsVm.popUpFlag = true;
		},
		//之前的为加上showTips
		//批量转移弹框里面的取消按钮点击
		cancel: function () {
			//重置弹框里面的v-modul为空 //不用重置

			//弹窗隐藏
			this.popUpFlag = false;
		},
		//提交 批量转移
		submitBatch: function () {
			var _this = this;
			showToast({
				title: "提示",
				msg: "确定操作这些文章？",
				cancleBar: "取消",
				confirmBar: "确定",
				confirm: function (e) {
					//找到选中的数组的id;
					var url = domain + 'service/news/transfer.html',
						data = {
							checkIds: _this.listArr.join(','),
							newsCateId: _this.currentId
						};

					function callback(data) {
						//刷新新闻列表  把data的state传进来
						_this.state = _this.newsBlock === 'list' ? 1 : 2;
						_this.getList(_this.state, 1); //这里需要动态配好传进来参数
						_this.popUpFlag = false;
						//选中的listArr重置为[]空数组
						_this.listArr = [];
						showTips('操作成功');
					};
					httpPostNews(url, data, callback);
				},
				cancle: function () {
					_this.popUpFlag = false;
				}
			})

		},
		//编辑新闻列表
		editList: function (id) {
			var _this = this;
			var data = {},
				url = domain + 'news/' + id + '.html';

			function callback(res) {
				_this.info = res.data.news;
				//跳到保存页面
				_this.newsBlock = 'save';
				//用/切割newsCatePath
				var levelArr = _this.info.newsCatePath.split('/');
				if (!levelArr[1]) {
					//判断有没有父级
					//如果第二项为空 顶级为第0项
					_this.topLevel = levelArr[0];
					_this.sonLevelFlag = false;
				} else {
					_this.sonLevelFlag = true;
					_this.topLevel = levelArr[0]; //顶级在前面
					_this.sonLevel = levelArr[1]; //子集在后面
				}
				_this.newsName = _this.info.name;

				var url = _this.info.image;
				$('#saveFile').attr('src', url); //路径
				$('.imgFather').addClass('displayB').removeClass('displayN');
				_this.summary = _this.info.summary; //摘要
				_this.description = _this.info.description; //内容
				//用ue设置文本的方法设置内容
				ue.setContent(_this.description);
				ue.setHeight(300);
				_this.newsId = _this.info.id; //主键Id
				_this.currentId = _this.info.newsCateId; //当前分类Id
				_this.newsType = _this.info.type; //文章类型
			}
			httpPostNews(url, data, callback);

		},
		// 截取时间的 年 月 日，若时间基数为空则返回 - -
		getFDate: function (value) {
			if (value != null && value != "") {
				var date = new Date(value.replace(/-/g, "/"));
				var year = date.getFullYear().toString();
				var month = (date.getMonth() + 1);
				var day = date.getDate().toString();
				var hour = date.getHours().toString();
				var minutes = date.getMinutes().toString();
				var seconds = date.getSeconds().toString();
				if (month < 10) {
					month = "0" + month;
				}
				if (day < 10) {
					day = "0" + day;
				}
				if (hour < 10) {
					hour = "0" + hour;
				}
				if (minutes < 10) {
					minutes = "0" + minutes;
				}
				if (seconds < 10) {
					seconds = "0" + seconds;
				}
				return year + "-" + month + "-" + day;
			} else {
				return '-';
			}
		},
		//删除 包括删一个和全删 根据lsitArr的功能
		//接口：service/news/r.html
		// 参数：checkIds	产品ID集合(1,2,3)
		//state	状态（1、恢复 2、回收站）
		/*
		 * state: 为状态，1为恢复 2为批量删除 
		 * */
		deleteListArr: function (state) {
			if (!newsVm.listArr.length) {
				showTips('请选择');
				return;
			}
			var data = {
					checkIds: newsVm.listArr.join(','),
					state: state
				},
				url = domain + 'service/news/r.html';

			function callback(data) {
				//刷新数据
				newsVm.getList(1, 1); //参数state:1为新闻列表 2为回收站 pagge：1为第一页
				//重置全选按钮的状态为false ?
				newsVm.checkallFlag = false;
				//重置数据的状态为false
				newsVm.listArr = [];
				showTips('操作成功');
			};
			httpPostNews(url, data, callback);
		},
		// 删除一个 参数 id 和state state === 2 为列表 === 1 为回收站 反着来
		deleteOne: function (id, state) {
			var _this = this;
			showToast({
				title: "提示",
				msg: "确定删除这些文章？",
				cancleBar: "取消",
				confirmBar: "确定",
				confirm: function (e) {
					var data = {
							checkIds: id + ',',
							state: state
						},
						url = url = domain + 'service/news/r.html';

					function callback(res) {
						//刷新数据
						// console.log(res);
						if (state === 2) {
							_this.getList(1, 1); //参数state:1为新闻列表 2为回收站 pagge：1为第一页
						} else if (state === 1) {
							_this.getList(2, 1); //参数state:1为新闻列表 2为回收站 pagge：1为第一页
						}
						showTips("操作成功")
					};
					httpPostNews(url, data, callback);
					return false;
				},
				cancle: function () {

				}
			})
		},
		/*回收站部分*/
		// 回收站列表
		getRecycleList: function () {
			newsVm.showRecycle();
			var obj = {
				state: 2,
				rows: 10,
				page: 1,
				name: newsVm.dataName
			}
			newsVm.getDataList(obj);
		},
		//全选
		checkAllR: function () {
			newsVm.recycleIdArr = newsVm.getIdArr(newsVm.recycleList);
			var arr = newsVm.recycleIdArr;
			if (!newsVm.checkallFlagR) {
				newsVm.recycleArr = [];
			} else {
				newsVm.recycleArr = arr;
			}
		},
		//单个选
		singleCheckR: function () {
			//回收站当前列表的id临时数组长度
			var idArr = newsVm.recycleIdArr,
				// v-model 已经勾选的数组长度
				checkArr = newsVm.recycleArr;
			//如果长度一样，全选按钮选中， 不一样不选中
			if (idArr.length == checkArr.length && idArr.length !== 0) {
				newsVm.checkallFlagR = true;
			} else {
				newsVm.checkallFlagR = false;
			}
		},
		//删除 包括删一个 批量删除 删除全部
		// 实际是删除 newsVm.recycleArr数组 选中的项
		deleteRecy: function () {
			if (!newsVm.recycleArr.length) {
				return showTips('请选择要删除的文章');
			}
			var url = domain + 'service/news/d.html',
				data = {
					checkIds: newsVm.recycleArr.join(',')
				};

			function callback(data) {
				loadClear();
				//刷新数据
				newsVm.getRecycleList();
				//重置选中数组为空数组
				newsVm.recycleArr = [];
				//重置全选按钮的状态为false
				newsVm.checkallFlagR = false;
				showTips('操作成功');
			};
			httpPostNews(url, data, callback);
			loadToate();
		},
		//恢复：接口：service/news/r.html
		// 参数：checkIds	产品ID集合(1,2,3)
		//state	状态（1、恢复 2、回收站）
		recover: function (state) {
			if (!newsVm.recycleArr.length) {
				showTips('请选择')
				return
			}
			var data = {
					checkIds: newsVm.recycleArr.join(','),
					state: state
				},
				url = domain + 'service/news/r.html';

			function callback(data) {
				//刷新数据
				newsVm.getRecycleList(2, 2);
				//重置全选按钮的状态为false
				newsVm.checkallFlagR = false;
				showTips('操作成功');
			};
			httpPostNews(url, data, callback);
		},
	}
});