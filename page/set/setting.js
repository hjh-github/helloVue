/**
 * Created by GDCL-A201011 on 2017/9/27.
 */

var seoUrl = 'service/seo/setting.html'; //设置seo
var savaSeoUrl = 'service/seo/save.html'; //保存设置seo
var upImgUrl = 'user/page/uploadImg.html'; //上传图片
var saveTitleUrl = 'service/user/web/saveTitle.html';
function httpPostSet(url, data, successfn) {
	
	var userWebId = get_cache('id');
	
    data.userWebId = userWebId;
    
	loadToate();
	$.ajax({
		type: "POST",
		data: data,
		url: url,
		dataType: "json",
		success: function(res) {
			loadClear();
			if (!res.success && res.total) {
				//登录过期
				showToast({
					title: '提示',
					msg: res.message,
					cancleBar: '取消',
					confirmBar: '重新登录',
					confirm: function (e) {
						window.location.href = "http://www.cangluxmt.com/login.html";
					},
					cancle: function () {

					}
				})
				return false;
			}
			successfn(res);
		},
		error: function(e) {
			console.log(e);
		}
	});
}; 
//网站标题设置
/*
 * 用formData发送图片
 * */
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
};
var userWebId = get_cache('id');

var setVm = new Vue({
	el: '#setting',
	data: {
		flag: 'seo', //模块的显示
		id: '', //主键ID
		title: '', //标题
		keyword: '',	//关键词
		content: '',	//描述
		userId: '',  //用户ID
		userWebId: '',  //用户网站ID
		webName: '',    //网站名字
		imgBoxFlag: false,  //展示图片开关
		ImgShowUrl: '',  //展示图片的路径
	},
	mounted: function () {
		this.$nextTick(function () {
			this.checkRender();
		})
	},
	methods: {
		//查询并渲染关键字设置
		checkRender: function(){
			if (userWebId) {
				var url = domain + seoUrl,
					data = {};
				function callback(res) {
					console.log(res);
					if(res.data.seoSetting !== null){
						var seoSetting = res.data.seoSetting;
						setVm.id = seoSetting.id;
						setVm.title = seoSetting.title;
						setVm.keyword = seoSetting.keyword;
						setVm.content = seoSetting.content;
						setVm.userId = seoSetting.userId;
						setVm.userWebId = seoSetting.userWebId;
					}else {
						console.log('这个用户没有设置信息');
					}
				};
				httpPostSet(url, data, callback);
				console.log(url);
				console.log(data);
			};
		},
		//点击nav 关键字设置 
		navKeywordClick: function(){
			this.flag = 'seo';
			this.checkRender();
		},
		//提交seo 关键字设置
		saveSeo: function () {
			//判断
			if (setVm.title === '') {
				return showTips('标题不能为空');
			}
			if (setVm.title.length > 80) {
				return showTips('标题不能超过80个字');
			}
			if (setVm.keyword === '') {
				return showTips('关键词设置不能为空');
			}
			if (setVm.keyword.length > 200) {
				return showTips('关键词设置不能超过80个字');
			}
			if (setVm.content === '') {
				return showTips('关键词描述不能为空');
			}
			if (setVm.content.length > 200) {
				return showTips('关键词描述不能超过80个字');
			}
			var url = domain + savaSeoUrl,
				data = {
					id: setVm.id,
					title: setVm.title,
					keyword: setVm.keyword,
					content: setVm.content,
					userId: setVm.userId,
					userWebId: setVm.userWebId,
				};

			function callback(res) {
				console.log(res);
				showTips('保存成功');
				//不清空表单
			};
			httpPostSet(url, data, callback);
			console.log(data);
		},
		//上传图片
		uploading: function (event) {
			
			var file = event.currentTarget.files[0];
			
			// 判断是否图片
			if (!file) {
				return;
			}
			var Max_big = 0.3 * 1024 * 1024;//不能超过1M
			var iconSize = file.size ;
			if (iconSize > Max_big) {
				return showTips('图片超过300kb');
			}
			
			//上传给接口
			var formData = new FormData(),
			formurl = domain + upImgUrl;
			formData.append('userWebId', userWebId);
			formData.append('imageFile', file);
			formData.append('param', 'logo');
			function callback(res) {
				console.log(res);
				setVm.ImgShowUrl = res;
			};
			httpForm(formurl, formData, callback);
			setVm.imgBoxFlag = true;
		},
		getIcon: function(){
			var _this = this;
			_this.flag = 'title';
			var url = domain + 'service/user/web/'+userWebId+'.html',
			data = {id: userWebId};
			function successfn(res){
				console.log(res);
				_this.webName = res.data.userWebInfo.title;
				
				_this.imgBoxFlag = true;
				if(res.data.userWebInfo.icon){
					_this.ImgShowUrl = res.data.userWebInfo.icon;
				}
			};
			httpPostSet(url, data, successfn);
		},
		//网站标题设置
		titleSet: function () {
			var _this = this;
			// 网站名称不能为null 或''
			if (!_this.webName) {
				return showTips('网站名称不能为空');
			}

			var url = domain + saveTitleUrl,
				data = {
					userWebId: _this.userWebId,
					title: _this.webName,
					icon: $(".showImg").attr("src"),
				};

			function callback(res) {
				console.log(res);
				showTips("上传成功");
				//成功 不清除文字和图片
				$("#form")[0].reset();
			}
			httpPostSet(url, data, callback);
			console.log(data);
		},
		// 删除网站图标
		shiftFavicon: function(){
			var _this = this;
			var url = domain + saveTitleUrl,
			data = {
				userWebId: _this.userWebId,
				title: _this.webName,
				icon: '',
			};

			function callback(res) {
				console.log(res);
				_this.ImgShowUrl = '';
				showTips("删除成功");
				//成功 不清除文字和图片
				$("#form")[0].reset();
			}
			httpPostSet(url, data, callback);
		}
	}
});

	//获取不到dom元素的宽高的问题
	/* var mainDom = document.getElementById('main');
	var echartDom = document.getElementById('echart');
   	var w = $(echartDom).attr("width");
	function getWH() {
		mainDom.style.width = window.innerWidth - 320 + "px";
		mainDom.style.height = window.innerHeight - 258 + "px";
	};

	getWH();
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(mainDom);
	// 指定图表的配置项和数据
	var option = {
		title: {},
		tooltip: {},
		legend: {
			//data:['销量']  //标题
		},
		grid: {
			y2: 140
		},
		xAxis: {
			data: ["00:00", "01:00", "02:00", "03:00", "05:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
			axisLine: {
				lineStyle: { //x轴的颜色
					color: "#54aef8",
					width: 2
				}
			},
			axisTick: {//刻度
				show: false, //不显示
				interval: 0   //刻度的显示间隔
			},
			axisLabel: {
				interval: 0, //x轴的间隔 0 不隔
				fontSize: 14  //文字提示的字体
				//rotate: -30  //不需要旋转
			}
		},
		yAxis: {
			min: 0,
			max: 350,
			splitNumber: 11,
			axisLine: {
				lineStyle: { //y轴的颜色 默认y轴或x轴的文字会跟xy轴的颜色一样
					color: "#54aef8",
					width: 2
				}
			},
			//y轴的水平对照线
			splitLine: {
				lineStyle: {
					type: 'dotted',
					width: 1
				}
			},
			axisLabel: { //字的设置
				color: '#ccc',
				fontSize: 24
			},
			axisTick: {
				//show: false, // 是否显示刻度
				inside: true,  //坐标刻度是否朝内，默认朝外
				length: 10,      //刻度的长度
				lineStyle: { //坐标刻度的样式设置
					color: "#ccc"
				}
			}
		},
		series: [
			{
				name: '销量',
				type: 'line',
				data: [10,50,80,60,40,50,80,40,50,80,150,250,350,200,100,200,300,100,80,70,60,40,30,10],
				symbolSize: 12,  //点的大小
				//symbol: "circle",      // 默认是空心圆（中间是白色的），改成实心圆
				symbol: "none",      // 这个实例不要点
				itemStyle: {
					normal: {
						lineStyle: { //折线的设置
							color: '#54aef8',
							width: 2,
						},
						//borderColor: "54aef8", 不需要描边颜色
						color: "54aef8" //拐点的填充颜色
					}
				},
				areaStyle: {
					normal: {
						color: '#e9f5fe',
						opacity: 0.3
					}
				},
				smooth: true  //折线是否平滑 ，默认false
			}
		]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);

	//用于使chart自适应高度和宽度
	window.onresize = function () {
		getWH();
		//重置容器高宽
		myChart.resize();
	};
 */