define(['vueLoader'], (loader) => {
    return {
        data() {
            return {
                showToClass: false,
                toolType: ''
            }
        },
        computed: {
            canEdit() {
                return !app.isPreview;
            },
            pos() {
                let p = 'translateY(-100%)';
                if (this.toolStyle.top < 100) {
                    let H = this.model.style.height;
                    p = 'translateY(' + H + ')';
                }
                return {
                    left: this.toolStyle.left + 'px',
                    top: this.toolStyle.top + 'px',
                    transform: p,
                }
            },
            c(){
                let c = 'top';
                if (this.toolStyle.top < 100) {
                    c = 'from';
                }
                return c;
            },
            hasLink() {
                let t = this.toolType;
                if (t == "font" || t == "add-picture")
                    return true;
                return false;
            }
        },
        watch: {
            toolStyle(c) {
            }
        },
        mounted() {
            this.toolType = this.model.__componentType;
        },
        methods: {
            remove() {
                this.par._beforeDestroy();
                $("#toolbar").empty();
            },
            link() {
                loader.loadLinkDialog({
                    model: this.model,
                    callback: this.backLink
                });
            },
            backLink(l) {
                this.model.link = l.link;
            },
            settin() {
                let self = this;
                if (typeof (this.setting) == 'function') {
                    this.setting();
                } else
                    loader.createVue('dialog/setting/dialog', dialogVue => {
                        self.editDialog = dialogVue;
                        self.editDialog.setModel(self.model);
                        //这句别删，会影响功能
                        let a = self.model.style;
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
                    self.editDialog.setConfig(self.editing);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(model => {
                        for (let k in model) {
                            self.model[k] = model[k];
                        }
                        self.$forceUpdate();
                    });
                });

            },
            upimg() {
                let self = this;
                loader.createVue('dialog/dialog', dialogVue => {
                    self.editDialog = dialogVue;
                    self.editDialog.setModel(self.model);
                    self.editDialog.setConfig(self.editing);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(model => {
                        for (let k in model) {
                            self.model[k] = model[k];
                        }
                        self.$forceUpdate();
                    });
                });

            },
            fontEdit() {

            },
            /*调层级*/
            //最大
            toClassMax() {
                this.$el.style.zIndex = 20;
                this.$el.__vue__.model.style['z-index'] = 20;
            },
            // 最小
            toClassMin() {
                this.$el.style.zIndex = 1;
                this.$el.__vue__.model.style['z-index'] = 1;
            },
            // 每次加一层
            toClassAdd() {
                this.$el.style.zIndex++;
                this.$el.__vue__.model.style['z-index']++;
                if (this.$el.style.zIndex > 20 || this.$el.__vue__.model.style['z-index'] > 20) {
                    this.$el.style.zIndex = 20;
                    this.$el.__vue__.model.style['z-index'] = 20;
                }
            },
            // 每次减一层
            toClassMinus() {
                this.$el.style.zIndex--;
                this.$el.__vue__.model.style['z-index']--;
                if (this.$el.style.zIndex < 1 || this.$el.__vue__.model.style['z-index'] < 1) {
                    this.$el.style.zIndex = 1;
                    this.$el.__vue__.model.style['z-index'] = 1;
                }
            },
        }
    }
})
