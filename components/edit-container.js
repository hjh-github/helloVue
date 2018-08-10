define(['vueLoader','vuedraggable'], (loader,draggable) => {
    return {
        props: {
            'model': {
                default:{

                }
            }
        },
        data() {
            return {
                loaded: false,
                timeout: false,
                _self:this,
                method:{
                    del:(model) => {
                        //移除通栏模型
                        let rr = this.model.cpts;
                        rr.splice($.inArray(model, rr), 1);
                        _self.$forceUpdate();
                    }
                }
            }
        },
        computed: {
            canEdit() {
                return !app.isPreview;
            },
            cpts:{
                get(){
                    return this.model.cpts;
                },
                set(v){
                    this.model.cpts = v;
                }
            }
        },
        mounted() {
            let self = this;
            if (this.canEdit) {
                let el = $(this.$el)
                // 接受放置通栏
                $(this.$el).sortable({
                    items: ".grouparea",
                    placeholder: "ui-state-highlight",//可以根据这个class修改占位的样式
                    cursor: 'move',
                    axis: 'y',
                    receive: function (event, ui) {
                        // 使用helper站位添加
                        ui.helper.remove();
                        self.append(ui.helper.model.type);
                    }
                })
                // 假装loading
                if (app.pageLoaded) {
                    setTimeout(() => {
                        self.loaded = true;
                        self.timeout = true;
                    }, 2000);
                }
            }
        },
        methods: {
            plus() {
                app.iconName = 'tplList';
            },
            /**
             * 根据模型添加组件
             */
            append(component, s) {
                let self = this;
                //根据itemModel.component(来自modulelist)创建一个vue实例v
                loader.createVue(component, v => {
                    let create = (model, save = true) => {
                        v.model = model.model;
                        v.setting = model.settingConfig;
                        v.model.__componentType = component;
                        if (model == null)
                            throw '组件[' + component + ']定义里必须包含model!';
                        if (save) {
                            self.model.cpts.push(model);
                        }
                    };

                    // 参数s如果传递的是model，也执行直接初始化
                    if (typeof (s) == 'object') {
                        create(s, false);
                    } else {
                        //新建通栏，v.model是对应组件的预设模型
                        let model = {
                            model: JSON.parse(JSON.stringify(v.model)),
                            settingConfig: JSON.parse(JSON.stringify(v.setting)),
                            __componentType: component
                        }
                        create(model);
                    }
                });

            },
            sortfn(v){
                
            }
        },
        components: {
            empty: loader.load('../components/widget/cpt-empty'),
            draggable:draggable
        }
    }
});