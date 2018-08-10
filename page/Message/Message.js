var ssid = '';
var userWebId= 7;
domain = 'http://192.168.30.175:8080/';
var messageVm = new Vue({
    el:'#message',
    data:{
        messagelist:[],//留言板列表
        messageDetails:[//留言板详情
            {
               revertcontent:'', 
            }
        ],
        messageType:1,
        //当前选中的留言
        checkedNames:[],
        //留言列表id，用于判断全选状态
        messageIds: [],
        //全选按钮flag
        checkAll: false,
        //回复留言
        revertMessage:[],
        //分页页码s
        allPages: [],
        //显示的页码
        
        showPages:[],
        //    当前页码数
        pagesIndex: 1,
        toPage: 1
    },
    methods: {
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
        messageList:function(type,page){//加载留言板列表
            let url = domain+ 'service/message/list.html';
            let data = {
                state:type,
                userWebId:userWebId,
                page: page,
                rows: 10
            };
            loadToate();//加载反馈
            productPost(
                url,
                data,
                function (res) {
                    //请求成功
                    loadClear();
                    var messages = res.data.messageBoardList,
                        total = res.total,
                        pageSize = res.data.pageSize,
                        pages = Math.ceil(total / pageSize)//总页码数;
                    messageVm.messagelist=messages;
                    messageVm.messageIds = messageVm.returnIds(messages);
                    messageVm.showpages(page);
                    messageVm.allPages = messageVm.getPages(pages);
                },
                function (res) {
                    console.log("网络异常，请联系管理员！");
                }
            )
        },
        viewDetails:function(detailsId){//查看详情
            $("#messageDetails").show();
            let id = detailsId;
            let url = domain+ 'service/message/'+id+'.html';
            let data = {
                id:id,
                ssid:ssid,
            };
            productPost(
                url,
                data,
                function (res) {
                    messageVm.messageDetails=res.data.messageBoard;
                },
                function (res) {
                    console.log("网络异常，请重试");
                }
            )
        },
        //导航切换
        navChange: function (n) {
            //初始化列表选中状态
            messageVm.checkAll = false;
            messageVm.checkedNames = [];
            //n: 1>>留言列表 2>> 回收站
            switch (n) {
                case 1:
                    messageVm.messageList(1,1);
                    // productVm.getProducts(1, 1);
                    break;
                case 2:
                    messageVm.messageList(2,1);
                    break;
                
            }
        },
        respondComments:function(){//回复留言板
            let id = messageVm.messageDetails.id;
            let url = domain+ 'service/message/reply.html';
            let data = {
                msgId:id,
                ssid:ssid,
                // userWebId:userWebId,
                content:messageVm.revertMessage,
            };
            productPost(
                url,
                data,
                function (res) {
                    messageVm.revertMessage='';
                    messageVm.viewDetails(id);
                },
                function (res) {
                    console.log("网络异常，请重试");
                }
            )
        },
        //        删除 && 恢复
        delMessage: function (id, type) {
            //根据id去判断否是批量，根据type去判断删除？恢复？
            var m = '个';
            var messageId = messageVm.checkedNames;
            var data = {
                checkIds: id,
                state: type,

            };
            if (id == -1) {
                m = '些'
                if (messageId.length < 1) {
                    //校验是否已经选了留言
                    msgToast({
                        title: '提示',
                        msg: '请选择你需要转移的留言',
                        confirmBar: '确定',
                        confirm: function (e) {
                        }
                    })
                    return false;
                }
                data.checkIds = messageId.toString();
            }
            showToast({
                title: "提示",
                msg: type == 2 ? "确定删除这" + m + "留言吗？" : "确定恢复这" + m + "留言吗？",
                cancleBar: "取消",
                confirmBar: "确定",
                confirm: function (e) {
                    productPost(domain + 'service/message/r.html', data, function (res) {
                        //请求成功
                        if (type == 2) {
                            msgToast({
                                title: '提示',
                                msg: '删除成功！（可在回收站中恢复！）',
                                confirmBar: "确定",
                                confirm: function () {
                                    //重新渲染页面
                                    messageVm.reShowMessage();
                                    return false;
                                }
                            })
                        } else if (type == 1) {
                            msgToast({
                                title: '提示',
                                msg: '恢复成功',
                                confirmBar: "确定",
                                confirm: function () {
                                    //重新渲染页面
                                    messageVm.messageList(2);
                                    messageVm.checkedNames = [];
                                    messageVm.checkAll = false;
                                    return false;
                                }
                            })
                        }

                    }, function (res) {
                        //请求失败
                        console.log("网络异常，请联系管理员！");
                    })
                },
                cancle: function () {
                }
            })
        },
        redelMessage: function (id) {
            //根据id去判断否是批量，根据type去判断删除？恢复？

            var m = '个';
            var messageId = messageVm.checkedNames;
            var data = {
                checkIds: id,
            };
            if (id == -1) {
                m = '些'
                if (messageId.length < 1) {
                    //校验是否已经选了产品
                    msgToast({
                        title: '提示',
                        msg: '请选择你需要删除的产品',
                        confirmBar: '确定',
                        confirm: function (e) {
                        }
                    })
                    return false;
                }
                data.checkIds = messageId.toString();
            }
            showToast({
                title: "提示",
                msg: "确定彻底删除这" + m + "产品吗？（无法恢复）",
                cancleBar: "取消",
                confirmBar: "确定",
                confirm: function (e) {
                    productPost(domain + 'service/message/d.html', data, function (res) {
                        //请求成功
                        msgToast({
                            title: '提示',
                            msg: '删除成功',
                            confirmBar: "确定",
                            confirm: function () {
                                //重新渲染页面
                                messageVm.messageList(2);
                                messageVm.checkedNames = [];
                                messageVm.checkAll = false;
                                return false;
                            }
                        })

                    }, function (res) {
                        //请求失败
                        console.log("网络异常，请联系管理员！");
                    })
                },
                cancle: function () {
                }
            })
        },
        reShowMessage: function () {
            //重新渲染页面
            messageVm.messageList(1);
            messageVm.checkedNames = [];
            messageVm.checkAll = false;
        },
        checkedMessageFn: function () {
            //当页列表下的全部商品
            var arr = messageVm.messageIds;
            //    获取当前已经选择的商品
            var checkedArr = messageVm.checkedNames;
            //    判断长度一样则为全选
            if (checkedArr.length == arr.length) {
                messageVm.checkAll = true;
            } else {
                messageVm.checkAll = false;
            }
        },
        returnIds: function (arr) {
            var newArr = [];
            for (var i = 0; i < arr.length; i++) {
                newArr.push(arr[i].id)
            }
            return newArr;
        },
        //全选
        checkAllFn: function () {
            //获取当前全选按钮状态
            var flag = messageVm.checkAll;
            //当页列表下的全部商品
            var arr = messageVm.messageIds;
            if (!flag) {
                messageVm.checkedNames = [];
            } else {
                messageVm.checkedNames = arr;
            }
        },
        //获取总页码数
        getPages: function (n) {
            var arr = [];
            for (var i = 1; i < n + 1; i++) {
                arr.push(i)
            }
            return arr;
        },
        //根据当前页码显示前3后3页码
        showpages: function (n) {
            var page = parseInt(n);
            var all = messageVm.allPages;
            if (all < 8) {
                messageVm.showPages = all;
            } else {
                if (page < 4) {
                    messageVm.showPages = all.slice(0, 7);
                } else if (page > all.length - 3) {
                    messageVm.showPages = all.slice(all.length - 7, all.length);
                } else {
                    messageVm.showPages = all.slice(page - 4, page + 3);
                }
            }
        },
        //上一页
        prefPage: function (type, page) {
            if (page > 1) {
                page--;
            } else {
                showTips("已经是第一页了")
            }
            messageVm.messageList(type, page);
            messageVm.pagesIndex = page;
            messageVm.toPage = page;
        },
        //下一页
        nextPage: function (type, page) {
            if (page < messageVm.allPages.length) {
                page++;
            } else {
                showTips("已经是最后一页了")
            }
            messageVm.messageList(type, page);
            messageVm.pagesIndex = page;
            messageVm.toPage = page;
        },

    
        
    }    

})
$(document).ready(function(){
    //加载留言板列表
    // messageList(1);
    // function messageList(type){
    //     let url = domain+ 'service/message/list.html';
    //     let data = {
    //         state:type,
    //         userWebId:userWebId,
    //     };
    //     loadToate();//加载反馈
    //     productPost(
    //         url,
    //         data,
    //         function (res) {
    //             //请求成功
    //             loadClear();
    //             var messages = res.data.messageBoardList;
    //             messageVm.messagelist=messages;
    //             messageVm.messageIds = messageVm.returnIds(messages);
    //         },
    //         function (res) {
    //             console.log("网络异常，请联系管理员！");
    //         }
    //     )
    // }

    // $(".messageclick").on('click',function(){
    //     messageList(1);
    // })
    // $(".recyclebin").on('click',function(){
    //     messageList(2);
    // })

  
    //关闭留言弹窗
    $(".message-close").on('click',function(){
        $(this).parent().parent().parent().hide();
    })
    //点击nav的标题
    var $navLi = $('.leftBox > li'),
    //内容
        $section = $('.right > .section');
    
    //nav 高亮
    function checkNav() {
        var index = $(this).index();
        //console.log(index);
        //active 代表高亮
        $(this).addClass('active').siblings().removeClass("active");
        //show 代表显示
        //内容按照nav高亮显示对应的内容
        $section.eq(index).addClass('show').siblings().removeClass('show');
    }

    $navLi.on('click', checkNav);

});



function toggle(current){
    if ($(current).children().is('.show')) {
        $(current).children().removeClass('show');
        $(current).children().addClass('hides');
        return false;
    }
    if ($(current).children().is('.hides')) {
        $(current).children().removeClass('hides');
        $(current).children().addClass('show');
        return false;
    }
}

