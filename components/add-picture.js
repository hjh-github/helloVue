define(['vueLoader'], (loader) => {
    let cellList = [];
    return {
        props: {
            model: {
                type: Object,
                default: {
                    link: {
                        type: 0,
                        local: '',
                        net: '',
                        open: '',
                    },
                    choosePic: '0',
                    title: '添加图片',
                    style: {
                        width: '140px',
                        height: '140px',
                    },
                    titleBarStyle: {
                        show: false,
                    },
                    src: 'http://image.cangluxmt.com/clwebsite/basic/images/components/default-img.png',
                    hoverEffect: 0,
                    backgroundStyle: {
                        useDefault: true,
                        'background-color': 'inherit',
                        'background-image': '',
                    },
                    toClass: 'top',
                }
            },
            editingConfig: {
                default: {
                    customToolbar: true,
                    title: '添加图片',
                    needInitial: false,
                    pages: {
                        "我的文件": {
                            updateImg: {
                                config: {
                                    style: {
                                        height: '40px',
                                        'line-height': '40px'
                                    },
                                    callback(r) {
                                        app.cellList.push({
                                            src: r.imgPath,
                                            id: r.id
                                        });
                                    },
                                },
                                component: 'dialog/editing/upload-pictures',
                            },
                            src: {
                                config: {
                                    cellList,
                                },
                                component: 'dialog/editing/pictures-list',
                            }
                        },
                        "系统图库": {
                            src: {
                                component: 'dialog/editing/system-img',
                            },
                        },
                        '悬停特效': {

                            hoverEffect: {
                                component: 'dialog/editing/hover-effect'
                            }
                        },
                    }
                }
            },
            //设置属性对话框的配置
            settingConfig: {}
        },
        data() {
            return {
                btnShow: false,
                showToClass: false,
                toClass: '',
            };
        },
        mounted() {
            this.editingConfig.customToolbar = true;
            let i = 0;
            let par = $(this.$refs.container.$el);
            par.mouseenter(() => {
                if (i) {
                    clearTimeout(i);
                }
                this.btnShow = true;
            });
            par.mouseleave(() => {
                i = setTimeout(() => {
                    this.btnShow = false;
                    this.showToClass = false;
                }, 1000)
            })
        },
        watch:{
            model:{
                handler:function(val,oldValue){
                },
                deep:true
            }
        },
        methods: {
            // config.cellList[0].imgSrc=item.imgSrc
            link() {
                loader.loadLinkDialog({
                    model: this.model,
                    callback: this.backLink
                });
            },
            backLink(l) {
                this.model.link = l.link;
                this.model.open = l.open;
            },
            settin() {
                let self = this;
                if (typeof (this.setting) == 'function') {
                    this.setting();
                } else
                    loader.createVue('dialog/setting/dialog', dialogVue => {
                        self.editDialog = dialogVue;
                        self.editDialog.setModel(self.model);
                        self.editDialog.setConfig(self.setting);
                        self.editDialog.setParent(self);
                        loader.fill("#tempdialog", dialogVue);
                        self.editDialog.open(model => {
                            // for(let k in model){
                            //     self.model[k] = model[k];
                            // }
                        });
                    });
            },
            edit() {
                let self = this;
                loader.createVue('dialog/dialog', dialogVue => {
                    self.editDialog = dialogVue;
                    self.editDialog.setModel(self.model);
                    self.editDialog.setConfig(self.editingConfig);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(model => {
                        for (let k in model) {
                            self.model[k] = model[k];
                        }
                        self.$forceUpdate();
                    });
                });

            },
            remove() {
                this._beforeDestroy();
            },
            choose(picSrc) {
                var pic = picSrc;
                this.cellList[0].imgSrc = picSrc;
            },

            dbEidit($event) {
                console.log('执行了双击事件');
                var ele = $event.currentTarget;

                // ele.contenteditable = "true";

                /* this.$el.onblur = function(){
                 this.$el.contentEditable = "false";
                 } */
            },
            /*调层级*/
            //最大
            toClassMax() {
                let self = this;
                self.$el.style.zIndex = 20;
                self.$el.__vue__.model.style['z-index'] = 20;
            },
            // 最小
            toClassMin() {
                let self = this;
                self.$el.style.zIndex = 1;
                self.$el.__vue__.model.style['z-index'] = 1;
            },
            // 每次加一层
            toClassAdd() {
                let self = this;
                self.$el.style.zIndex++;
                self.$el.__vue__.model.style['z-index']++;
                if (self.$el.style.zIndex > 20 || self.$el.__vue__.model.style['z-index'] > 20) {
                    self.$el.style.zIndex = 20;
                    self.$el.__vue__.model.style['z-index'] = 20;
                }
            },
            // 每次减一层
            toClassMinus() {
                let self = this;
                self.$el.style.zIndex--;
                self.$el.__vue__.model.style['z-index']--;
                if (self.$el.style.zIndex < 1 || self.$el.__vue__.model.style['z-index'] < 1) {
                    self.$el.style.zIndex = 1;
                    self.$el.__vue__.model.style['z-index'] = 1;
                }
            },
            click() {
                let self = this
                // console.log(self)
            }
        }
    }
});