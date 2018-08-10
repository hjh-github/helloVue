define(['util'], (util) => {
    return {
        props: ['iconName', 'hasSysWeb', 'tplTopLevelArr', 'tplThemeColorArr', 'webcode'],
        data() {
            return {
                modelId: '',
                type: 'tpl',
                showElement: false,
                /**模板筛选  */
                isFirstCheckTemplate: 0,
                isThisWebType: '', //当前选中的一级导航
                tplChildLevelArr: [], //模板二级分类数组 
                tempaltesData: { //模板列表筛选条件集合
                    industryCode: '',
                    themeCode: this.webcode,
                    colorCode: '',
                    levelCode: '',
                    name: '',
                    orderBy: 'create_time'
                },
                /**模板筛选  end*/
                tplLevelCode: '', //请求网站模板数据时要传网站级别参数(免费或者会员)
                tplWebName: '', //网站名称,
                tplWebInfoList: [], //二级网站列表数组
                items: [],
                dialogFormVisible: false,
                form: {
                    radio: '0',
                },
                formLabelWidth: '120px',

            }
        },

        created() {
            let _this = this;
            if (!_this.tplThemeColorArr) {
                app.reqTplcategory();
                _this.tplThemeColorArr = app.tplThemeColorArr; //主题颜色
                _this.tplTopLevelArr = app.tplTopLevelArr; //网站类型 
            }
        },
        mounted() {

        },
        methods: {
            toggleIcon: function () {
                app.iconName = this.iconName = this.iconName === this.type ? "" : this.type;
                if (this.isFirstCheckTemplate == 0) {
                    this.isFirstCheckTemplate++;

                    this.showTplIndustry();
                }
                //加载内容的代码转移到此处
            },
            themeColorSaveT: function (color) {
                this.saveTemplate.msg = '';
                this.saveTemplate.colorCode = color;
            },
            changeFirstCodeT: function () {
                this.saveTemplate.msg = '';
                this.saveTemplate.industryCode = '';
            },
            openTplDialog: function () {
                closeDialog();
                this.destroyOldInfoT();
                this.saveTemplateisDialogShow = true;
            },
            counterSaveTpl: function () {
                var _this = this,
                    $dom = $("#tplthumbImg");
                if (this.emptyTpl()) {
                    _this.saveTemplate.msg = '';
                    loadToate();
                    var option = {
                        type: "POST",
                        url: domain + "service/uploadTemplate.html",
                        data: $dom.parents('form').serialize(),
                        dataType: "json",
                        success: function (path) {
                            _this.saveTemplate.thumbImage = path;
                            productPost(
                                'service/user/web/saveForTemplate.html',
                                _this.saveTemplate,
                                function (res) {
                                    if (res.success) {
                                        loadClear();
                                        showTips('添加成功');
                                        _this.destroyOldInfoT();
                                    } else {
                                        loadClear();
                                        showTips(res.message);
                                    }
                                },
                                function (res) {
                                    loadClear();
                                    showTips('网络不给力，请重试');
                                }
                            )
                        },
                        error: function () {
                            loadClear();
                            showTips('数据加载失败！');
                        }
                    };
                    $dom.parent().ajaxSubmit(option);
                };
            },
            emptyTpl: function () {
                // 非空判断
                var tpl = this.saveTemplate,
                    flag = true;
                if (tpl.themeCode == '') {
                    tpl.msg = "请选择一个网站类型";
                    flag = false;
                } else if (tpl.industryCode == '') {
                    tpl.msg = "请选择一个行业分类";
                    flag = false;
                } else if (tpl.colorCode == '') {
                    tpl.msg = "请选择一个主题颜色";
                    flag = false;
                }
                // else if(tpl.levelCode == ''){
                //     tpl.msg="请选择一个网站收费等级";
                //     flag = false;
                // }
                else if (tpl.name == '') {
                    tpl.msg = "请填写模板名称";
                    flag = false;
                } else if ($('#tplthumbImg').val() == '') {
                    tpl.msg = "需要上传一张缩略图";
                    flag = false;
                }

                return flag;
            },
            destroyOldInfoT: function () {
                this.saveTemplate = {
                    themeCode: this.webcode, //网站类型
                    industryCode: '', //行业分类
                    firstCode: '', //选中的一级分类
                    colorCode: '', //主题色系
                    levelCode: '', //等级
                    name: '', //名称
                    msg: '', //校验提示
                    thumbImage: '' //缩略图
                }
                $("#tplthumbImg").parent().resetForm();
                $("#thumbImg").attr('src', "");
            },
            // 添加为系统模板 end --- >

            /* 网站模板拿走的东西 */

            //请求行业模板列表
            showTplIndustry: function () {
                var url = "service/system/web/list.html";
                var data = this.tempaltesData;
                var _this = this;

                function successfn(res) {
                    _this.tplWebInfoList = res.data.sysWebList;
                };

                function errorfn() {};
                productPost(url, data, successfn, errorfn);

            },
            /** 选择模板 **/
            checkModle: function (id, themeCode) {
                var _this = this;
                this.modelId = id;
                if (themeCode == app.toSessionStorage('webcode')) {
                    // 类型相同的模板切换
                    if (app.toWebsessionStorage('sysWebId')) {
                        this.dialogFormVisible = true;
                    } else {
                        _this.comfirms();
                    }
                } else {

                    // 不可直接切换 方案一
                    msgToast({
                        title: '提示',
                        msg: '您当前选择的网站类型暂不支持切换这个模板，敬请期待！',
                        confirmBar: "确定",
                        confirm: function () {
                            //点击关闭的时候执行的函数
                            return false;
                        }
                    })

                }

            },
            // 确认选择默认
            comfirms() {
                let self = this;
                // this.dialogFormVisible = false;
                let url = 'service/system/web/chose.html';
                let data = {
                    sysWebId: self.modelId,
                    isReplace: self.form.radio
                };
                console.log(data)
                productPost(
                    url,
                    data,
                    function (callback) {
                        if (callback.success) {
                            setTimeout(() => {
                                window.location.reload();
                            })
                        } else {
                            if (callback.message) {
                                showTips(callback.message);
                            }
                        }
                    },
                    function (callback) {}
                );
            },
            // 搜索筛选
            tplSearch: function () {
                this.showTplIndustry();
                $(".tplDownDialog").slideUp();
            },
            // 匹配一级分类是否处在选中状态
            firstWebType: function (code, parentCode) {
                var _this = this;
                if (parentCode == 0 && _this.tempaltesData.industryCode == code) {
                    // 当前选中导航为一级分类，且标记为选中状态
                    _this.isThisWebType = code;

                } else if (parentCode == 0 && _this.tempaltesData.industryCode == '') {
                    // 当前选中导航为一级分类，且标记为取消选中状态
                    _this.isThisWebType = '';
                    // $(".tplDownDialog").slideUp();  这里是显示二级分类，暂时隐藏，2018年1月18日
                } else if (parentCode != 0) {
                    // 当前选中的是二级分类，则父级分类处在选中状态
                    _this.isThisWebType = parentCode;
                }
            },
            //选择行业分类
            chosenOneLevel: function (index, code, parentCode) {
                var _this = this;
                if (parentCode == 0) {
                    // 一级分类
                    _this.tplTopLevelCode = code;
                    this.tplTopLevelArrIndex = index;
                    if (_this.tempaltesData.industryCode === code) {
                        // 清空当前选中分类状态
                        _this.tempaltesData.industryCode = '';
                        // 取消选中类型，展示 取消该筛选条件 模板列表
                        _this.firstWebType(code, parentCode);
                        _this.showTplIndustry();
                    } else {
                        // 选中类型，展示模板列表
                        _this.tempaltesData.industryCode = code;
                        // 检测当前分类是否有上级分类,有则匹配选中状态
                        _this.firstWebType(code, parentCode);
                        _this.showTplIndustry();
                        var arr = [];
                        arr.push(this.OnetplLevelArr, this.TwotplLevelArr, this.ThreetplLevelArr);
                        this.secondLevelTpl = arr[index];
                        // $(".tplDownDialog").slideDown();这里是隐藏二级分类，暂时隐藏，2018年1月18日
                    }
                } else {
                    // 暂时不会有二级分类，2018年1月18日
                    if (_this.tempaltesData.industryCode === code) {
                        // 清空当前二级分类选中状态
                        _this.tempaltesData.industryCode = parentCode;
                        // 取消当前二级分类选中状态，并展示 该分类上级分类 模板列表
                        _this.firstWebType(code, parentCode);
                        _this.showTplIndustry();
                    } else {
                        // 选中类型，展示模板列表
                        _this.tempaltesData.industryCode = code;
                        // 检测当前分类是否有上级分类,有则匹配选中状态
                        _this.firstWebType(code, parentCode);
                        _this.showTplIndustry();

                    }
                }


            },

            //选择模板主题颜色
            chosenTplThemeColor: function (tplThemeColorCode) {
                var _this = this;
                if (_this.tempaltesData.colorCode == tplThemeColorCode) {
                    // 取消选中，并刷新数据
                    _this.tempaltesData.colorCode = '';
                    _this.showTplIndustry();
                } else {
                    // 选中，并刷新数据
                    _this.tempaltesData.colorCode = tplThemeColorCode;
                    _this.showTplIndustry();
                }
            },
            checkOrderBy: function (str) {
                var _this = this;
                if (_this.tempaltesData.orderBy == str) {
                    // 再次选中，不刷新数据
                    return false;
                } else {
                    // 选中，并刷新数据
                    _this.tempaltesData.orderBy = str;
                    _this.showTplIndustry();
                }
            },
            //模板网站预览
            previewWebTpl: function (sysWebId) {     
                var url = "/service/system/generate.html",
                    data = {
                        sysWebId: sysWebId
                    };
                function successfn(res) {    
                    if (res.backUrl == "B2C") {
                        window.open("http://" + res.data);
                    } else {
                        window.open("http://" + res.data + "/" + sysWebId + "/" + "index.html");
                    }

                };

                function errorfn() {

                };
                productPagePost(url, data, successfn, errorfn);
            },
            /* 网站模板拿走的东西 */
            tplDialog: function () {
                if (app.hasSysWeb) {
                    this.iconName = ''
                } else {
                    msgToast({
                        title: '提示',
                        msg: '您未选择模板，请先选择一个模板',
                        confirmBar: '确定',
                        confirm: function () {
                        }
                    })
                }
            },
            hover(e){
                $(e.target).addClass("slideInUp animated");
            },
            out(e){
                setTimeout(() => {
                    $(e.target).removeClass("slideInUp animated");
                }, 2000);
            }
        }
    }
});