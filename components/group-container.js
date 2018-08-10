define(['vueLoader'], (loader) => {

    let defaultModel = {
        titleVisible: true,
        def: {
            defheight: true,
            seheight: true,
            height: '400px',
            searchH: '40px',
            defmargin: true,
            'margin-top': '0',
            'margin-bottom': '0',
            'margin-left': '0',
            'margin-right': '0',

            defbackground: true,
            'background-color': '',
            'background-image': '',
            defborder: true,
            // 'border-style': 'solid',
            // 'border-color': '#ccc',
            // 'border-width': '1px',

            // 'border': '1px solid #ccc',
            //
            // 'border-left': '',
            // 'border-right': '',
            // 'border-top': '',
            // 'border-bottom': '',

            defTitle: 0,
            defSubTitle: 0,
            defTitleBackground: false,
        },

        borderStyle: {
            'border-color': '#CCC',
            'border-width': 1,
            'border-style': 'solid',

            showBorderLeft: false,
            showBorderRight: false,
            showBorderTop: false,
            showBorderBottom: false,
        },
        // titleStyle: {
        //     'text-align': 'center',
        //     'position': 'relative',
        //     'text-aligin': 'center',
        //     'height': '40px',
        //     'color': '#ccc',
        //     'background-color': '#8BF',
        //     'font-family': '宋体',
        //     'font-size': '16px',
        //     'line-height': '50px',
        //     'font-weight': 'normal',
        //     'font-style': 'normal',
        //     'text-decoration': 'normal',
        //     'margin': '10px',
        // },
        // titleWordStyle: {},
        // subTitleWordStyle: {},
        animation: '',
        style: {
            left: '0px',
            top: '0px',
            width: '400px',
            height: '300px',
            opacity: 1,
            'z-index': 10,
            'border-radius': '0px',
            'background-color': '',
            'background-image': '',
            'animation-duration': '0s',
            'animation-delay': '1s',

        }
    };
    app.defaultModel = defaultModel;
    return {
        props: {
            method: {
                type: Object
            },
            pmodel: {
                default: null
            },
            container: {},
            height: {},
            /*可添加组件过滤器*/
            filter: {},
            canEdit: {
                default: true,
            },
            afterDrop: {
                type: Function,
                default: null,
            },
            editing: {
                type: Object,
                default: {
                    title: '编辑组件（通栏）',
                    pages: {
                        "常规": {
                            canvasStyle: {
                                config: {
                                    name: '通栏背景：',
                                    current_2: '',
                                    selected: 0,
                                    showStyle: 0,
                                    radio: [{
                                        name: '默认',
                                        value: 0
                                    },
                                        {
                                            name: '自定义',
                                            value: 1
                                        }
                                    ],
                                    showList: [{
                                        name: '平铺',
                                        value: 0,
                                        s: {
                                            repeat: 'repeat',
                                            size: 'contain',
                                            position: 'unset'
                                        }
                                    },
                                        {
                                            name: '拉伸',
                                            value: 1,
                                            s: {
                                                repeat: 'no-repeat',
                                                size: 'auto',
                                                position: 'center'
                                            }
                                        },
                                        {
                                            name: '填充',
                                            value: 2,
                                            s: {
                                                repeat: 'no-repeat',
                                                size: 'cover',
                                                position: 'center'
                                            }
                                        },
                                    ],
                                },
                                component: 'dialog/editing/group-bg'
                            },
                        }
                    }
                }

            },
            setting: {
                default: {
                    canvasStyle: {
                        color: '#f2f2f2',
                        src: '',
                        repeat: '',
                        size: '',
                        position: ''
                    },
                    config: {
                        def: 0,
                        bgStyle: 0
                    },
                    style: {
                        height: '300px',
                        padding: '',
                        border: {},
                        margin: ''
                    }
                }
            },
            model: {
                type: Object,
                default: {
                    cpts: [],
                }
            },

        },
        create() {

        },
        computed: {
            unit() {
                return app.unit;
            },
            canvasStyle() {
                // 通栏背景设置
                let config = {};
                if (this.setting.config.def) {
                    // 非默认背景
                    config = this.setting.canvasStyle;
                } else {
                    // 默认背景
                    config = app.groupItemconfig.settingConfig.canvasStyle;
                }

                if (config != undefined) {
                    let cs = config;
                    let bg = '';
                    if (cs['src'] != undefined && cs['src'] != '')
                    // 无src 不添加url()
                        bg = 'url("' + cs.src + '")';
                    return {
                        'background-color': app.recoverSymbol(cs.color),
                        'background-image': bg,
                        'background-repeat': cs.repeat,
                        'background-size': cs.size,
                        'background-position': cs.position,
                    }
                }
            },
            areaStyle() {
                // 内容区修改
                let w = '100%';
                // 非通栏内容区||微端
                if (this.filter || app.channel == 2) {
                    return {
                        width: w
                    };
                } else {
                    if (!app.groupContainer.common.def) {
                        w = app.groupContainer.common.value;
                    } else {
                        w = '1200';
                    }
                }
                return {
                    width: w
                };

            },
            containerStyle() {
                // 高度修改
                let h = this.height ? (this.height + '') : this.setting.style.height;
                if (h.indexOf('%') > 0) {
                    h = h;
                    return
                } else if (h.indexOf('px') == -1) {
                    h += this.unit;
                }

                return {
                    height: h,
                };
            },
            canEdit() {
                return !app.isPreview;
            }
        },
        watch: {
            model(v) {
                //模型修改时添加
                if (!this.loaded || this.timeout) {
                    $(this.$refs.container).empty();
                    v.cpts.forEach(e => {
                        this.loaded = true;
                        this.append(e.__componentType, e);
                    });
                }
                if (v.cpts.length == 0) {
                    this.loaded = true;
                }
            },
            canEdit(v) {
                let container = this.$refs.container;
                let el = $(container);
                this.isUI(el, v);
                this.loaded = true;
            },
            pmodel(v) {
                this.initDrag();
            }
        },
        data() {
            return {
                showBtns: false,
                loaded: false,
                timeout: false,
            }
        },
        mounted() {
            //初始化时添加
            let self = this;
            let bg = $(this.$refs.bgContainer);
            if (app.isPreview) {
                $(self.$el).removeClass('editBb')
                $('.ui-resizable-handle').css("display", 'none')
            }
            this.initDrag();
            if (!this.loaded) {
                this.model.cpts.forEach(e => {
                    this.loaded = true;
                    this.append(e.__componentType, e);
                });
            }
            bg.mouseenter(() => {
                if (!app.isPreview) {
                    this.showBtns = true;
                }
            });

            bg.mouseleave(() => {
                this.showBtns = false;
            });
        },
        methods: {
            initDrag() {
                let self = this;
                // 接受组件放置通栏
                let container = this.$refs.container;
                // 如果是横幅的通栏取到横幅的坐标
                if (!container)
                    container = this.container;
                let el = $(container);
                let Fpos = {
                    y: el.offset().top,
                    x: el.offset().left
                }


                let dropConfig = {
                    //阻止事件冒泡
                    greedy: true,
                    accept: ".dragView:not('.group-container')",
                    tolerance: "fit",
                    over(e, ui) {

                    },
                    drop(e, ui) {
                        // 更新当前容器的pos
                        Fpos = {
                            y: el.offset().top,
                            x: el.offset().left
                        }
                        let pos = {
                            y: ui.offset.top - Fpos.y,
                            x: ui.offset.left - Fpos.x
                        }
                        let cpt = ui.helper.model.component;
                        if (cpt && (!self.filter || self.filter(cpt))) {
                            self.append(cpt, pos.x, pos.y);
                        }
                    },
                    out(e, ui) {

                    }
                };
                let resizeConfig = {
                    greedy: true,
                    handles: 's',
                    resize(e,ui){
                        self.setting.style.height = ui.size.height + 'px';
                        self.height = ui.size.height;
                    },
                    stop(e, ui) {
                        self.setting.style.height = ui.size.height + 'px';
                        self.height = ui.size.height;
                    }
                };

                if (this.canEdit) {
                    el.droppable(dropConfig).resizable(resizeConfig);
                    if (app.pageLoaded) {
                        setTimeout(() => {
                            this.loaded = true;
                            this.timeout = true;
                        }, 2000);
                    }
                }
            },
            isUI(el, n) {
                // 启用/暂停拖拽
                let isAble = 'enable';
                if (!n)
                    isAble = 'disable';
                el.resizable(isAble).droppable(isAble);
            },
            plus() {
                app.iconName = 'tplList';
            },
            /**
             * 根据模型添加元素
             */
            append(component, s, y, copy = false) {
                app.iconName = ''
                let self = this;
                //根据itemModel.component(来自modulelist)创建一个vue实例
                loader.createVue(component, v => {
                    let create = (model, fromInit = true) => {
                        if (model == null)
                            throw '组件[' + component + ']定义里必须包含model!';
                        if (fromInit) {
                            self.model.cpts.push(model);
                        }


                        v.$props.model = model;
                        if (!v.copy) {
                            //用于复制组件
                            v.copy = (c, l, t, oldModel) => {
                                self.append(c, l, t, oldModel);
                            };
                        }

                        v.model.__componentType = component;

                        // self.$children.push[v];

                        loader.append(self.$refs.container, v);
                        if (self.afterDrop) {
                            self.afterDrop(model);
                        }

                        //预览模式下不能删除
                        if (!app.isPreview)
                            v._beforeDestroy = () => {
                                console.log('组件', component, v._uid, '移除');
                                //移除模型
                                let rr = self.model.cpts;
                                $(v.$el).remove();
                                // v.$destroy();
                                rr.splice($.inArray(model, rr), 1);
                            }
                    };
                    let isCopyModel = v.model;
                    let cTypes = ['font', 'add-picture', 'button-type'];
                    //参数s如果传递的是model，也执行直接初始化
                    if (typeof (s) == 'object') {
                        self.check(s);
                        create(s, false);
                        return;
                    } else {

                        // 根据拖拽的位置初始化位置
                        if (copy)
                            isCopyModel = JSON.parse(JSON.stringify(copy));
                        if (!isCopyModel.style)
                            isCopyModel.style = {};
                        let mobileLeft;
                        if (app.channel == 2) {
                            if (cTypes.indexOf(component) > -1) {
                                mobileLeft = s;
                            } else {
                                mobileLeft = 0;
                            }
                        } else {
                            mobileLeft = s;
                        }
                        isCopyModel.style.left = mobileLeft + self.unit;
                        isCopyModel.style.top = y + self.unit;

                        self.check(isCopyModel);
                    }

                    if (!copy && v.editingConfig && v.editingConfig.needInitial != false) {
                        //打开一个创建对话框，生成model，然后把model绑定给v，并且添加
                        self.openEditDialog(v.model, v.editingConfig, create);
                    } else {
                        //新建组件，v.model是对应组件的预设模型

                        create(JSON.parse(JSON.stringify(isCopyModel)));

                    }
                    // throw itemModel.component + '[' + itemModel.name + '] 必须具备editingConfig属性';
                });

            },
            check(model) {
                if (model.checked != true) {
                    if (model.titleVisible == null)
                        model.titleVisible = true;
                }
                if (!model.addon) {
                    model.addon = {};
                    if (!this.model.addon) {
                        this.model.addon = {
                            defBorder: true,
                            defBg: true,
                            defBgText: true,
                            bgColor: '000',
                            textColor: '#fff',
                            borderStyle: {
                                'border-color': '#222',
                                'border-style': 'solid',
                                'border-width': '1px',
                            },
                            opacity: .5,
                            fontSize: '14px',
                            textAlign: 'center',
                        }
                    }
                }

                if (model.style == null) {
                    model.style = this.copyDefaultModel(defaultModel.style);
                } else {
                    let style = this.copyDefaultModel(defaultModel.style);
                    for (let k in style) {
                        if (!model.style[k])
                            model.style[k] = style[k];
                    }
                }

                if (model.def == null) {

                    model.def = this.copyDefaultModel(defaultModel.def);
                } else {
                    let def = this.copyDefaultModel(defaultModel.def);
                    for (let k in def) {
                        if (model.def[k] == null)
                            model.def[k] = def[k];
                    }
                }
                if (!model.animation)
                    model.animation = defaultModel.animation;
                // 标题区初始化设置
                this.initProps(model, 'titleBarStyle', this.copyDefaultModel(app.titleConfig.titleBarStyle));

                this.initProps(model, 'titleStyle', this.copyDefaultModel(app.titleConfig.titleStyle));
                this.initProps(model, 'subTitleStyle', this.copyDefaultModel(app.titleConfig.subTitleStyle))
                this.initProps(model, 'showMore', this.copyDefaultModel(app.titleConfig.showMore));


                //内容区
                this.initProps(model, 'paddingStyle', this.copyDefaultModel(app.contentConfig.paddingStyle));

                this.initProps(model, 'backgroundStyle', this.copyDefaultModel(app.contentConfig.backgroundStyle));

                if (model.borderStyle == null) {
                    model.borderStyle = this.copyDefaultModel(defaultModel.borderStyle);
                }
            },
            initProps(model, key, def) {
                if (model[key])
                    for (let k in def) {
                        if (model[key][k] == null)
                            model[key][k] = def[k];
                    }
                else
                    this.$set(model, key, def);
            },
            copyDefaultModel(m) {
                return JSON.parse(JSON.stringify(m));
            },
            /**
             * 打开编辑对话框
             * @param model
             * @param callback
             */
            openEditDialog(model, config, callback) {
                //TODO 这里你来填写打开对话框的功能，config是对话框配置单，callback会把model生成一个vue

                if (config) {
                    // if (this.editDialog == null) {
                    loader.createVue('dialog/dialog', dialogVue => {
                        this.editDialog = dialogVue;
                        this.editDialog.setModel(model);
                        this.editDialog.setConfig(config);
                        //全局dialog
                        loader.fill("#tempdialog", dialogVue);
                        this.editDialog.open(callback);
                    });
                    //     return;
                    // }
                    // this.editDialog.setModel(model);
                    // this.editDialog.open(callback);
                } else
                    callback(JSON.parse(JSON.stringify(model)));
            },
            edit() {
                let self = this;
                loader.createVue('dialog/dialog', dialogVue => {
                    self.editDialog = dialogVue;
                    self.editDialog.setModel(self.setting);
                    self.editDialog.setConfig(self.editing);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(model => {
                        for (let k in model) {
                            self.setting[k] = model[k];
                        }
                    });
                });
            },
            remove() {
                this.method.del(this.pmodel)
            },
        },
        components: {
            empty: loader.load('../components/widget/cpt-empty'),
        }
    }
});