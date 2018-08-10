var turnFlag, ctrls, parts, pages, toastShow = false; //初始化属性开关
/*var channelflag = window.location.href.indexOf('MobileIndex') >= 0 || window.location.href.indexOf('indexiframe')>=0;
const channel = channelflag? 2 : 1;// 1：PC 2: 微站*/
var imageSize = true; //图片小于500kb

//登陆
var linkLogin = "https://dev.cas.cangluxmt.com:8443/cas/login?service=http://127.0.0.1:8080/clauthweb/index.html"

 

//设置缓存
function set_cache(key, value) {
    if (key == '') return false;
    localStorage.setItem(key, value);
    // $.session.set(key, value)
}
//读取缓存

function get_cache(key) {
    return localStorage.getItem(key);
    // $.session.get(key);
}
/*if (app.channel == 1){
    localStorage.setItem('channel', 1);
} else if (app.channel == 2){
    localStorage.setItem('channel', 2);
}else{
    showTips("找不到页面");
}*/
localStorage.setItem('isDetails', 'false'); //默认不在详情页
// 清空缓存
function clear_cache(key) {
    if (key == '') return false;
    localStorage.removeItem(key);
    // $.session.remove(key);
}


var userWebId,
    domainUrl;
userWebId = sessionStorage.getItem("id"); //获取缓存中的数据
domainUrl = sessionStorage.getItem("domainUrl");
//正则表达式获取地址栏参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function Trim(str) {
    // 返回一个去除前后空格的字符串
    return str.replace(/(^\s*)|(\s*$)/g, "");
}


//弹窗 title--标题,msg--提示信息,cancleBar--取消提示语,sureBar--确定提示语,success--点击确认，cancle--点击取消
function showToast(obj) {
    if (!toastShow) {
        toastShow = true
        let bg = $('<div></div>').addClass('bg').css({
            "width": "100%",
            height: "100%",
            "z-index": "1110",
            "background-color": "rgba(0,0,0,0.1)",
            "position": "fixed",
            "left": 0,
            "top": 0
        });
        $('body').append(bg);
        let html = '<div class="tipsTitle">' + notUndefined(obj.title) + '</div><div class="tipsMsg"><span>' + notUndefined(obj.msg) + '</span></div><div class="comfire"><span  id="showToastCancle" class="cancle">' + notUndefined(obj.cancleBar) + '</span><span id="showToastSure" class="sure">' + notUndefined(obj.confirmBar) + '</span></div>';
        let $toast = $('<div></div>').addClass('tispsTag').html(html).appendTo("body");
        $('body').on("click", ".bg", function () { //蒙层点击 toast提示阻止操作
            $('.tispsTag').addClass('toastFlash');
            setTimeout(function () {
                $('.tispsTag').removeClass('toastFlash');
            }, 200)
        })
        $('.tispsTag').on('click', '#showToastSure', function () {
            // 点击确认按钮
            $('.tispsTag').remove();
            $('.bg').remove();
            toastShow = false;
            obj.confirm();
        })
        $('.tispsTag').on('click', '#showToastCancle', function () {
            // 点击取消
            $('.tispsTag').remove();
            $('.bg').remove();
            toastShow = false;
            obj.cancle();
        })
    } else {
        return false;
    }
}
//弹窗 title--标题,msg--提示信息,cancleBar--取消提示语,sureBar--确定提示语,success--点击确认，cancle--点击取消
function msgToast(obj) {
    if (!toastShow) {
        toastShow = true
        let bg = $('<div></div>').addClass('bg').css({
            "width": "100%",
            height: "100%",
            "z-index": "1110",
            "background-color": "rgba(0,0,0,0.1)",
            "position": "fixed",
            "left": 0,
            "top": 0
        });
        $('body').append(bg);
        let html = '<div class="tipsTitle">' + notUndefined(obj.title) + '</div><div class="tipsMsg"><span>' + notUndefined(obj.msg) + '</span></div><div class="comfire"><span class="sure">' + notUndefined(obj.confirmBar) + '</span></div>';
        let $toast = $('<div></div>').addClass('tispsTag').html(html).appendTo(bg);
        $('body').on("click", ".bg", function () { //蒙层点击 toast提示阻止操作
            $('.tispsTag').addClass('toastFlash');
            setTimeout(function () {
                $('.tispsTag').removeClass('toastFlash');
            }, 200)
        })
        $('.tispsTag').on('click', '.sure', function () {
            // 点击确认按钮
            $('.tispsTag').remove();
            $('.bg').remove();
            toastShow = false;
            obj.confirm();
        })
        $('.tispsTag').on('click', '.cancle', function () {
            // 点击取消
            $('.tispsTag').remove();
            $('.bg').remove();
            toastShow = false;
            obj.cancle();
        })
    } else {
        return false;
    }
}
//操作成功的提示信息
/**
 * js动态弹窗
 * 显示提示信息函数
 */
//<!--</div>-->
//<!--</div>-->
function showTips(msg) {
    var newbg = $('<div></div>').addClass('newbg').css({
            "width": "100%",
            height: "100%",
            "z-index": "1000",
            "background-color": "rgba(0,0,0,0.1)",
            "position": "fixed",
            "left": 0,
            "top": 0,
            "display": "none"
        }),
        newbgHtml = "<div" + " style='width:320px;height: 100px;position: absolute;left: 50%;top: 50%;margin-left: -160px;margin-top: -150px;;background-color: rgba(16, 16, 16, 0.5);line-height: 100px;font-size: 18px;text-align: center; color: rgba(255, 255, 255, 1)'>" + "</div>";
    //操作成功
    $('body').append(newbg);
    $('.newbg').html(newbgHtml);
    $('.newbg > div').text(msg);

    $('.newbg').fadeIn();
    $('.newbg > div').fadeIn();
    setTimeout(function () {
        $('.newbg > div').fadeOut(1000);
        $('.newbg').remove();
    }, 1000);
}

function notUndefined(str) { // 组件数据没配置判断
    var content = str == undefined ? "" : str;
    return content;
}
/*
 * loading加载反馈
 * */
function loadToate() {
    var loadHtml = '';
    $('body').append(loadHtml);
}

function loadClear() {
    $('.loading').remove();
}


//图片预览方法 绑定在file的onchang上，previewId为预览图标签 onchange="imgUpload(this,'bgPic')"
function imgUpload(e, previewId, isBgImg) {
    var $img = $(e),
        $preview = $('#' + previewId + '');
    var file = $img[0].files[0];
    if (file.size > 500 * 1024) {
        loadClear();
        showTips('图片大于500kb！');
        return false;
    };
    var _url = getObjectURL(file);
    $preview.attr('src', _url)
    app.$data.teletextBg = _url;
    if (isBgImg == 'true') {
        app.general.bgpic = _url;
    }
}
// //建立一個可存取到該file的url
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }

    return url;

}
/**
 * post请求封装
 * url 发送请求的地址
 * data 发送到服务器的数据，数组存储，如无则返回当前时间
 * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
 * successfn 成功回调函数
 * errorfn 失败回调函数
 */
function productPost(url, data, successfn, errorfn) {
    //   userWebId

    var userWebId = app.toSessionStorage("id");
    data.userWebId = userWebId;
    data.channel = app.channel;
    $.ajax({
        type: "POST",
        data: data,
        url: domain + url,
        dataType: "json",
        success: function (d) {
            if (!d.success && d.total) {
                //登录过期
                showToast({
                    title: '提示',
                    msg: d.message,
                    cancleBar: '取消',
                    confirmBar: '重新登录',
                    confirm: function (e) {
                        window.location.reload();
                    },
                    cancle: function () {}
                })
                return false;
            }
            successfn(d);
        },
        error: function (e) {
            loadClear();
            errorfn(e);

        }
    });
};
/**
 * post请求封装
 * url 发送请求的地址
 * data 发送到服务器的数据，数组存储，如无则返回当前时间
 * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
 * successfn 成功回调函数
 * errorfn 失败回调函数
 */
function productPagePost(url, data, successfn, errorfn) {
    //   userWebId
    let domain = sessionStorage.getItem("domain")
    data.userWebId = sessionStorage.getItem("id");
    $.ajax({
        type: "POST",
        data: data,
        url: domain + url,
        dataType: "json",
        success: function (d) {
            if (!d.success && d.total) {
                //登录过期
                showToast({
                    title: '提示',
                    msg: d.message,
                    cancleBar: '取消',
                    confirmBar: '重新登录',
                    confirm: function (e) {
                        // window.location.href = "linkLogin";
                        window.location.reload();
                    },
                    cancle: function () {}
                })
                return false;
            }
            successfn(d);
        },
        error: function (e) {
            errorfn(e);
        }
    });
};
/**
 * news
 * post请求封装
 * url 发送请求的地址
 * data 发送到服务器的数据，数组存储，如无则返回当前时间
 * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
 * successfn 成功回调函数
 * errorfn 失败回调函数
 */
function httpPostNews(url, data, successfn) {
    var userWebId = sessionStorage.getItem('id');
    data.userWebId = userWebId;
    data.pageId = newsVm.pageId;
    $.ajax({
        type: "POST",
        data: data,
        url: url,
        dataType: "json",
        success: function (res) {
            if (!res.success && res.total) {
                //登录过期
                showToast({
                    title: '提示',
                    msg: res.message,
                    cancleBar: '取消',
                    confirmBar: '重新登录',
                    confirm: function (e) {
                        // window.location.href = "linkLogin";
                        window.location.reload();
                    },
                    cancle: function () {

                    }
                })
                return false;
            }
            successfn(res);
        },
        error: function (e) {
            console.log(e);
        }
    });
};





// 加载公共loading方法 start
function openLoading() {
    $(".loading_tier").show();
    $(".svg_dialogBox").show();
}

function closeLoading() {
    $(".loading_tier").hide();
    $(".svg_dialogBox").hide();
}
// 加载公共loading方法 end

/**
 * post请求封装
 * url 发送请求的地址
 * data 发送到服务器的数据，数组存储，如无则返回当前时间
 * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
 * successfn 成功回调函数
 * errorfn 失败回调函数
 */
function httpPostPageId(url, data, successfn, errorfn) {
    var userWebId = app.toSessionStorage("id");
    data.userWebId = userWebId;
    data.channel = app.channel;

    $.ajax({
        type: "POST",
        data: data,
        url: url,
        dataType: "json",
        success: function (d) {
            if (!d.success && d.total) {
                //登录过期
                showToast({
                    title: '提示',
                    msg: d.message,
                    cancleBar: '取消',
                    confirmBar: '重新登录',
                    confirm: function (e) {
                        window.location.href = "linkLogin";
                    },
                    cancle: function () {
                        return false;
                    }
                })
                return false;
            }
            successfn(d.data);

        },
        error: function (e) {
            loadClear();
            errorfn(e);
        }
    });
};

/**
 * post请求封装
 * url 发送请求的地址
 * data 发送到服务器的数据，数组存储，如无则返回当前时间
 * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
 * successfn 成功回调函数
 * errorfn 失败回调函数
 */
function httpPost(url, data, successfn, errorfn) {
    var userWebId = app.toSessionStorage("id");
    data.userWebId = userWebId;
    data.channel = app.channel;
    $.ajax({
        type: "POST",
        data: data,
        url: url,
        dataType: "json",
        success: function (d) {
            if (!d.success && d.total) {
                //登录过期
                showToast({
                    title: '提示',
                    msg: d.message,
                    cancleBar: '取消',
                    confirmBar: '重新登录',
                    confirm: function (e) {
                        window.location.href = "http://www.cangluxmt.com/login.html";
                    },
                    cancle: function () {
                        return false;
                    }
                })
                return false;
            }
            successfn(d.data);

        },
        error: function (e) {
            loadClear();
            errorfn(e);
        }
    });
};
//  加入收藏
function AddFavorite(sURL, sTitle){
	try{
			window.external.addFavorite(sURL, sTitle);
	}
	catch (e){
			try{
					window.sidebar.addPanel(sTitle, sURL, "");
			}
			catch (e){
				jAlert("您的浏览器不支持此操作，请使用Ctrl+D进行添加");
			}
	}
} 
