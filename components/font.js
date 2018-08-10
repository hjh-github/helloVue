define(['vueLoader'], (loader) => {
    return {
        data() {
            return {
                editing: false,
                btnShow: false,
                showToClass: false,
                toClass: '',
                canEdit: true,
                toolbar: {},
                C: '',
                id:'',
            }
        },
        components: {
            ftool: loader.load('dialog/setting/ftool'),
        },
        props: {
            model: {
                default: {
                    title: '文字组件',
                    subtitle: '副标题',
                    link: {
                        type: 0,
                        local: '',
                        net: '',
                        open: '',
                    },
                    style: {
                        width: '200px',
                        height: '40px',
                        'background-color': 'inherit',
                    },
                    fontStyle: {
                        'font-family': '宋体',
                        'font-size': '20px',
                        'font-weight': '',
                        'font-style': '',
                        'font-decoration': '',
                        'text-align': 'left',
                        'color': '#000000',
                        'line-height': '1.5',
                        'text-decoration': '',
                        height: 'auto'
                    },
                    titleBarStyle: {
                        show: false,
                    },
                    content: '双击编辑内容',
                    hoverColor: '',
                    backgroundStyle: {
                        useDefault: true,
                        'background-color': 'inherit',
                        'background-image': '',
                    },
                    toClass: ''
                }
            },
            settingConfig() {

            },
            editingConfig: {
                default: {
                    needInitial: false,
                    title: '编辑文本内容',
                    pages: {
                        '文本内容编辑': {
                            content: {
                                config: {
                                    text: ''
                                },
                                component: 'dialog/editing/ue-editor',
                            }
                        }
                    },
                },
            },
            drag: {
                // 用来控制组件容器可否拖拽
                type: Boolean,
                default: true,
            },

        },
        mounted() {
            this.id=this._uid
            var i = 0;
            let par = $(this.$refs.container.$el);
            let self = this;
            this.canEdit = !app.isPreview;

            par.mouseenter(() => {
                let pos = {
                    top: $(par).offset().top,
                    left: $(par).offset().left
                }
                /*// 新toolbar 不要删
                loader.createVue('tools/font-tool', tool => {
                    self.toolbar = tool;
                    tool.toolStyle = pos;
                    tool.model = self.model;
                    tool.$props.settin = self.settin;
                    tool.$props.edit = self.edit;
                    tool.$props.save = self.save;
                    tool.$props.remove = self.remove;
                    tool.showSetting = self.showSetting;
                    tool.par = self.$parent;
                    loader.fill("#toolbar", tool);
                })*/

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
        computed: {
            fontStyle() {
                let s = this.model.fontStyle;
                //为了保证改变生效
                return {
                    'font-family': s['font-family'],
                    'font-size': s['font-size'],
                    'font-weight': s['font-weight'],
                    'font-style': s['font-style'],
                    'font-decoration': s['font-decoration'],
                    'text-align': s['text-align'],
                    'color': s['color'],
                    'line-height': s['line-height'],
                    'text-decoration': s['text-decoration'],
                }
            },
            editable() {
                let msg = 'plaintext-only';
                if (app.isPreview)
                    msg = 'false'
                return this.editing ? 'plaintext-only' : 'false';
            },
        },
        watch: {
            canEdit(n) {
                if (!n)
                    $(this.$refs.editor).attr("contenteditable", "false");
            },
        },
        methods: {

            dbEdit() {
                if (app.isPreview)
                    return false;
                this.edit();
            },
            getC(that) {
                that.attr("contenteditable", "plaintext-only");
                that.focus();
                if (document.all) {
                    that.range = document.selection.createRange();
                    that.range.select();
                    that.range.moveStart("character", -1);
                } else {
                    that.range = window.getSelection().getRangeAt(0);
                    that.range.setStart(that.range.startContainer, 0);
                }
            },
            blurEdit($event) {
                // 用于取消文本编辑状态
                let self = this;
                var ele = $event.currentTarget;
                this.drag = true;
                this.editing = false;
                $(ele).attr("contenteditable", "false");
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
            save() {
                this.editing = false;
                this.drag = true;
                let v = '';
                let e = this.$refs.editor;
                $(e).attr("contenteditable", "false");
                v = e.innerHTML;
                this.model.value = v;
                this.$forceUpdate();
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
                $("#toolbar").empty();
            },
            hover() {
                let HC=this.model.hoverColor;
                if(HC==='undefined') HC===''
                this.C = this.fontStyle.color;
                if(HC==='') return;
                $('#'+this.id).css({'color':HC});
            },
            out(){
                $('#'+this.id).css({'color':this.C});
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
            }
        }
    }
});