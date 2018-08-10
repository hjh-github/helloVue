define(['vueLoader','util'], (loader,util) => {
    return {
        props: ['model','cancleEmpty'],
        data(){
            return{
                tplThemeColorArr:[],
                tplTopLevelArr:[],
                saveTemplate: {
                    themeCode: '', //网站类型
                    industryCode: '', //行业分类
                    firstCode: '', //选中的一级分类
                    colorCode: '', //主题色系
                    levelCode: '', //等级
                    name: '', //名称
                    msg: '' //校验提示
                },
            }
        },
        create(){

        },

        mounted(){
           let _this = this;
            if(!_this.tplThemeColorArr.lenght > 0)
            app.reqTplcategory();
            
            _this.tplThemeColorArr = app.tplThemeColorArr; //主题颜色
            _this.tplTopLevelArr = app.tplTopLevelArr;//网站类型
        },
        methods: {
            handleclick(){

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
            destroyOldInfoT: function () {
                this.saveTemplate = {
                    themeCode: '', //网站类型
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
        },
        components: {
        }
    }
});