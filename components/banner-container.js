define(['vueLoader'], (loader) => {
    return {
        data() {
            return {
                cpts: [],
                loaded: false,
                showBtns: false,
                mod: {},
                carHeight: '200px'
            }
        },
        props: {
            model: {},
            setting: {},
            editing: {
                default: {
                    title: '横幅编辑',
                    pages: {
                        '常规': {
                            images: {
                                component: 'dialog/editing/group-panel',
                            },
                            // imageSetting: {
                            //     component: 'dialog/editing/imageSetting',
                            // },

                        },
                        '切换样式': {
                            type: {
                                config: {
                                    style: {
                                        width: '200px',
                                        height: '100px',
                                        border: '1px solid #cccccc',
                                    },
                                    options: [{
                                        channel: 1,
                                        image: './images/components/c-dot.png',
                                        text: '长条指示器',
                                    }, {
                                        channel: 1,
                                        image: './images/components/c-num.png',
                                        text: '数字指示器',
                                    }, {
                                        channel: 1,
                                        image: './images/components/c-thumb.png',
                                        text: '图片指示器',
                                    }],
                                },
                                component: 'dialog/editing/style-list',
                            },
                        },
                        '轮播设置': {
                            carousel: {
                                component: 'dialog/editing/carouselEdit',
                            },
                        }
                    }
                },
            },
        },
        computed: {
            isEdit() {
                return !app.isPreview;
            }
        },
        watch: {
            model: {
                deep: true,
                handler(v) {
                    this.cpt(v);
                }
            }
        },
        mounted() {
            // 初始化banner
            let self = this;
            this.cpt(this.model);
            let bg = $(this.$refs.bgContainer);
            let resizeConfig = {
                greedy: true,
                handles: 's',
                stop(e, ui) {

                    self.mod.settingConfig.style.height = ui.size.height;
                }
            };
            if (this.isEdit) {
                bg.resizable(resizeConfig);
            }
            bg.mouseenter(() => {
                this.showBtns = true;
            });

            bg.mouseleave(() => {
                this.showBtns = false;
            });
        },
        methods: {
            rebg(src) {
                if (src) {
                    let bg = 'url("' + src + '")';
                    return bg;
                }


            },
            cpt(model) {
                let type = 'pageBanner';
                if (model.isAlone == 2)
                    type = 'webBanner';
                this.cpts = this.model[type].model.cpts;
                this.mod = this.model[type];
                this.carHeight = this.mod.settingConfig.style.height + 'px';
            },
            plus() {
                this.edit();
            },
            edit() {
                let self = this;
                loader.createVue('dialog/dialog', dialogVue => {
                    self.editDialog = dialogVue;
                    self.editDialog.setModel(self.mod);
                    self.editDialog.setConfig(self.editing);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(model => {
                        for (let k in model) {

                            self.mod[k] = model[k];

                        }
                        self.$forceUpdate();
                    });
                });
            },
            setImg(i) {
                this.$refs.carousel2.setActiveItem(i);
            },
        },
        components: {
            empty: loader.load('../components/widget/cpt-empty'),
        }
    }
});