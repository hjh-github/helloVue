define(['vueLoader'], (loader) => {
    return {
        data() {
            return {
                navList:[],
                editingConfig: {
                    needInitial: false,
                    customToolbar: true,
                },
                editing: false,
                btnShow: false,
                showToClass: false,
                toClass: '',
                hoverClass:'',
            }
        },

        props: {
            model: {
                default: {
                    link: {
                        type: 0,
                        local: '',
                        net: '',
                        open: '',
                    },
                    style: {
                        width: '1000px',
                        height: '40px',
                        'background-color': 'inherit',
                    },
                    value: '',
                    titleBarStyle: {
                        show: false,
                    },
                    'background-color':'#fff',
                    'text-color':'#333',
                    'active-text-color':'#666',
                    'font-size':'12px',

                }
            },
            settingConfig() {

            },
            editingConfig: {
                default: {
                    needInitial:false,
                    title: '导航编辑',
                    pages: {
                        '常规': {
                            'background-color': {
                                config: {
                                    text: '背景颜色'
                                },
                                component: 'dialog/color-picker'
                            },
                            'text-color': {
                                config: {
                                    text: '文本颜色'
                                },
                                component: 'dialog/color-picker'
                            },
                            'active-text-color': {
                                config: {
                                    text: '选中颜色'
                                },
                                component: 'dialog/color-picker'
                            },
                            'font-size': {
                                config: {
                                    text: '字体大小'
                                },
                                component: 'dialog/setting/navFont'
                            }
                        },
                    },
                    resize: 'e,w',
                }
            },
            drag: {
                // 用来控制组件容器可否拖拽
                type: Boolean,
                default: true,
            },
        },
        created(){
            app.loadGoodsNav({
                userId:app.toSessionStorage('userId'),
                webcode:app.toSessionStorage('webcode')
            },(arr)=>{
                this.navList=arr; 
            });
        },
        mounted() {
            var i = 0;
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
            });
        },
        methods: {
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
                this.editing = true;
            },
            remove() {
                this._beforeDestroy();
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
            mouseenter(e){
                e.target.children[0].style.backgroundColor=this.model['active-text-color'];
            }
        }
    }
});