define(['util'], (util) => {
    return {
        props: ['iconName', 'hasSysWeb', 'tplTopLevelArr', 'tplThemeColorArr', 'webcode'],
        data() {
            return {
                historyCount: '',
                userWebInfoHisList: [], //我的模板
                historyCount: 3, //我的模板可以存储的最大数
                myTplChangeWay: -1, //区分修改我的模板名字或保存当前模板
                type: 'myTpl',
                mytplCurName: '', //我的模板修改单个名称
                mytplIndex: -1, //匹配我的模板点击时判断
                mytplId: -1, //我的模板选中单个模板时
            }
        },
        mounted(){
        	//add by dengxf  只有编辑页面的时候，才查询历史记录
        	if (!app.isPreview) {
        		this.httpMytpl();
        	}
        },
        methods: {
            chosenMytpl(index, id, name) {
                this.mytplIndex = index;
                //把当前的id存到data数组中 做删除作用
                this.mytplId = id; //
                //把当前的name存到data变量中 做修改作用
                this.mytplCurName = name; //
            },
            previewMytpl: function (mytplId) {
                var _this = this;
                var url = "service/user/web/history/preview.html",
                    data = {
                        webId: app.toSessionStorage("id"),
                        id: mytplId
                    };
    
                function successfn(res) {
                    window.open("http://" + res.data + "/history/index.html");
                };
    
                function errorfn() {
    
                };
                productPost(url, data, successfn, errorfn);
            },
            // 删除我的模板
            deleteMytpl() {
                var _this = this;
                //判断有没有选择
                if (_this.mytplId === -1) {
                    return alert("请选择模板");
                }
                showToast({
                    title: '提示',
                    msg: '您确定要删除选中的模板吗？',
                    cancleBar: '取消',
                    confirmBar: '确定',
                    confirm: function () {
                        var url = "service/user/web/history/d.html",
                            data = {
                                webId: app.toSessionStorage("id"),
                                id: _this.mytplId
                            };

                        function successfn(res) {
                            _this.httpMytpl();
                            showTips("操作成功");
                        };

                        function errorfn() {

                        };
                        productPost(url, data, successfn, errorfn);
                        return false;
                    },
                    cancle: function () {}
                })
            },
            httpMytpl() {
                var _this = this;
                var url = "service/user/web/history/list.html",
                    data = {
                        webId: app.toSessionStorage("id"),
                        type: 2
                    };

                function successfn(res) {
                    //把模板的可添加最大数存起来
                    _this.historyCount = res.data.historyCount;
                    // 复制给app data
                    _this.userWebInfoHisList = res.data.userWebInfoHisList;

                };

                function errorfn() {

                };
                productPost(url, data, successfn, errorfn);
            },
            //修改我的模板名字 或保存当前模板
            eiditTplname(way) {
                var _this = this;
                if (!way) {
                    _this.myTplChangeWay = 0;
                    //修改我的模板名字，判断有没有选择
                    $(".mytplText").text("修改名称");
                    if (_this.mytplId === -1) {
                        return alert("请选择模板");
                    }
                } else {
                    if (_this.historyCount > _this.userWebInfoHisList.length) {
                        $(".mytplText").text("保存当前模板");
                        if (_this.mytplCurName === '') {

                        }
                        _this.myTplChangeWay = 1;
                        //getNowFormatDate(); //获取当前时间
                    } else { //大于或等于
                        return showTips("最多只能添加" + _this.historyCount + "个模板");
                    }
                }
                // myTplCChangeWay 关闭弹窗之后的只要归为-1
                $("#mytpl-nameEiditdialog").show();
            },
            //修改模板弹窗的关闭x
            closeTplnameEidit: function () {
                $("#mytpl-nameEiditdialog").hide();
            },
            eiditNameReq() {
                var _this = this;
                if (Trim(_this.mytplCurName) == "") {
                    _this.mytplCurName = getNowFormatDate(); //获取当前时间
                }
                if (_this.myTplChangeWay == 0) {
                    //修改名称接口
                    var url = "service/user/web/history/update.html",
                        data = {
                            webId: app.toSessionStorage("id"),
                            id: _this.mytplId,
                            name: _this.mytplCurName,
                            dynamicBody: _this.webcode
                        };

                    function successfn(res) {
                        _this.httpMytpl();
                        showTips("操作成功");
                        $("#mytpl-nameEiditdialog").hide();
                        _this.myTplChangeWay = -1; //关闭弹窗之后，myTplChangeWay = -1
                    };

                    function errorfn() {};
                    productPost(url, data, successfn, errorfn);
                } else if (_this.myTplChangeWay == 1) {
                    let url = 'service/user/web/history/save.html';
                    let data = {
                        webId: app.toSessionStorage("id"),
                        historyName: _this.mytplCurName,
                    };

                    function successfn(res) {
                        _this.httpMytpl();
                    };

                    function errorFn() {

                    }

                    productPost(url, data, successfn, errorFn);
                }
            },
            toggleIcon() {
                app.iconName = (app.iconName == this.type) ? "" : this.type;
            },
            //选用
            chosenUse: function (id) {
                let url = domain + 'service/user/web/history/' + id + '.html';
                let data = {
                    id: id,
                    userWebId: app.toSessionStorage("id")
                };
                function callback(res) {
                    //恢复完成刷新页面
                    setTimeout(()=>{
                        if (res.userWebInfoList.length > 0) {
                            window.location.reload();
                        }
                    })
                };
                function error(res) {};
                httpPost(url, data, callback, error);
            },
        }
    }
})