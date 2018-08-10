define(['vueLoader'], loader => {
    return {
        props: {
            'model': {},
            'setting': {},
            'editing': {
                default: {}
            },
            'drag': {},
        },
        data() {
            return {
                showToClass: false,
                showBtns: false,
                editDialog: null,
                isDrop: app.isPreview,
                // grid: loader.grid(),
                toolP: 'nor',
                toClass: 'top',
                wireShow: false,
                width: '',
                height: '',
            }
        },
        computed: {

            showSetting() {
                return (!this.setting) || this.setting.visible != false;
            },
            showMore() {
                let x = this.model.showMore;
                if (!x) {
                    x = this.model.showMore = {};
                }
                return x;

            },
            showMoreLink() {
                switch (this.showMore.link.type) {
                    case 0:
                        return 'javascript:void(0)';
                    case 1:
                        return this.showMore.link.local;
                    case 2:
                        return this.showMore.link.net;
                }
                return 'javascript:void(0)';
            },
            isEdit() {
                return !app.isPreview;
            },
            // defTitle(){
            //     if (!this.model.def)
            //         this.model.def = {};
            //     return this.model.def.defTitle;
            // },

            showTitle() {
                if (!this.model.titleBarStyle) {
                    this.model.titleBarStyle = {};
                }
                ;
                return this.model.titleBarStyle.show;
            },
            titleBarStyle() {

                if (!this.model.titleBarStyle) {
                    this.model.titleBarStyle = {};
                }
                return {
                    height: this.model.titleBarStyle.height + app.unit,
                    'background-color': this.model.titleBarStyle['background-color'],
                    'background-image': this.model.titleBarStyle['background-image'],
                }
            },
            showMoreStyle() {
                if (!this.model.showMore) {
                    this.model.showMore = {};
                }
                return {
                    color: this.model.showMore.color,
                    'font-size': this.model.showMore['font-size'] + app.unit,
                    'font-family': this.model.showMore['font-family'],
                    'font-weight': this.model.showMore['font-weight'],
                    'font-style': this.model.showMore['font-style'],
                    'text-decoration': this.model.showMore['text-decoration'],
                }

            },
            titleStyle() {
                if (!this.model.titleStyle) {
                    this.model.titleStyle = {};
                }
                return {
                    color: this.model.titleStyle.color,
                    'font-size': this.model.titleStyle['font-size'] + app.unit,
                    'font-family': this.model.titleStyle['font-family'],
                    'font-weight': this.model.titleStyle['font-weight'],
                    'font-style': this.model.titleStyle['font-style'],
                    'text-decoration': this.model.titleStyle['text-decoration'],
                }
            },
            titleBlockStyle() {
                if (!this.model.titleStyle) {
                    this.model.titleStyle = {};
                }
                if (this.model.titleStyle.horizontal == null) {
                    this.model.titleStyle.horizontal = 0;
                }
                if (this.model.titleStyle.vertical == null) {
                    this.model.titleStyle.vertical = 1;
                }
                let s = {
                    float: 'none',
                };
                switch (this.model.titleStyle.horizontal) {
                    case 0:
                        s.float = 'left';
                        break;
                    case 1:
                        s.width = '100%';
                        s['text-align'] = 'center';
                        break;
                    case 2:
                        s.float = 'right';
                }

                switch (this.model.titleStyle.vertical) {
                    case 0:
                        break;
                    case 2:
                        s['margin-top'] = '100%';
                        s['transform'] = 'translateY(-50%)';
                        break;
                    case 1:
                    default:
                        s['top'] = '50%';
                        s['transform'] = 'translateY(-50%)';
                        break;
                }

                return s;
            },
            subTitleStyle() {
                if (!this.model.subTitleStyle) {
                    this.model.subTitleStyle = {};
                }
                return {
                    color: this.model.subTitleStyle.color,
                    'font-size': this.model.subTitleStyle['font-size'] + app.unit,
                    'font-family': this.model.subTitleStyle['font-family'],
                    'font-weight': this.model.subTitleStyle['font-weight'],
                    'font-style': this.model.subTitleStyle['font-style'],
                    'text-decoration': this.model.subTitleStyle['text-decoration'],
                }

            },
            //内容区样式
            contentStyle() {

                if (!this.model.paddingStyle)
                    this.model.paddingStyle = {};

                if (!this.model.backgroundStyle)
                    this.model.backgroundStyle = {};

                let x = {
                    'padding-left': this.model.paddingStyle['padding-left'] + app.unit,
                    'padding-right': this.model.paddingStyle['padding-right'] + app.unit,
                    'padding-top': this.model.paddingStyle['padding-top'] + app.unit,
                    'padding-bottom': this.model.paddingStyle['padding-bottom'] + app.unit,

                    'background-color': this.model.backgroundStyle['background-color'],
                    'background-image': this.model.backgroundStyle['background-image'],
                };

                return x;
            },
            //容器区样式
            containerStyle() {

                if (!this.model.borderStyle) {
                    this.model.borderStyle = {
                        'border-color': '#CCC',
                        'border-width': 1,
                        'border-style': 'solid',

                        showBorderLeft: false,
                        showBorderRight: false,
                        showBorderTop: false,
                        showBorderBottom: false,
                    };
                }
                if (!this.model.style['overflow']) {
                    this.model.style['overflow'] = 'hidden';
                }


                let x = {
                    'border-left': this.model.borderStyle.showBorderLeft ? this.borderStyle : '0',
                    'border-right': this.model.borderStyle.showBorderRight ? this.borderStyle : '0',
                    'border-top': this.model.borderStyle.showBorderTop ? this.borderStyle : '0',
                    'border-bottom': this.model.borderStyle.showBorderBottom ? this.borderStyle : '0',
                    'opacity': this.model.style.opacity,
                    'border-radius': this.model.style['border-radius'],
                    'overflow': this.model.style['overflow'],
                };


                return x;
            },
            paddingStyle(){
                if (!this.model.style['overflow']) {
                    this.model.style['overflow'] = 'hidden';
                }
                let x = {
                    'overflow': this.model.style['overflow'],
                };

                return x;
            },

            positionStyle() {
                if (!this.model.style)
                    this.model.style = {};
                // 微端适配
                let pos = {
                    x: this.model.style.left,
                    y: this.model.style.top,
                    w: this.model.style.width,
                    h: this.model.style.height
                };
                if (!this.model.style['animation-delay']) this.model.style['animation-delay'] = 0;
                if (!this.model.style['animation-duration']) this.model.style['animation-duration'] = 1;
                let flag = ['font', 'add-picture', 'button-type'];
                if (app.channel == 2) {
                    if (app.isPreview) {
                        let fz = 16;
                        pos.x = (pos.x.replace(/px/, '')) / fz + 'rem';
                        pos.y = (pos.y.replace(/px/, '')) / fz + 'rem';
                        pos.w = ((pos.w.replace(/px/, ''))-1) / fz + 'rem';
                        pos.h = (pos.h.replace(/px/, '')) / fz + 'rem';
                    }
                    if (flag.indexOf(this.model.__componentType) < 0) {
                        pos.w = '100%';
                    }
                }
                return {
                    'width': pos.w,
                    'height': pos.h,
                    'top': pos.y,
                    'left': pos.x,
                    'border-radius': this.model.style['border-radius'],
                    'padding-left': this.model.style['padding-left'],
                    'z-index': this.model.style['z-index'],
                    'opacity': this.model.style.opacity,
                    'animation-duration': this.model.style['animation-duration'] + 's',
                    'animation-delay': this.model.style['animation-delay'] + 's',
                }
            },
            borderStyle() {
                return this.model.borderStyle['border-width'] + 'px ' +
                    this.model.borderStyle['border-style'] + ' ' + this.model.borderStyle['border-color'];
            },
            title() {
                return app.recoverSymbol(this.model.title);
            },
            subtitle() {
                return app.recoverSymbol(this.model.subtitle);
            }
        },
        watch: {
            drag: function (n, o) {
                let el = $(this.$el);
                this.isDrag(el, n)
            },
            'model.style': {
                handler(newValue) {
                    // this.$forceUpdate();
                },
                deep: true,
            },
            'model': {
                handler(newValue) {
                    this.wireShow = false;
                },
                deep: true,
            },
        },
        mounted() {
            this.width = this.$el.style.width;
            this.height = this.$el.style.height;
            this.titleBarStyle['background-image'] = app.recoverSymbol(this.titleBarStyle['background-image'])
            let el = $(this.$el);
            let self = this;
            let pel = self.$parent.$el;
            let h = el.get(0).style.height;
            h = h.split('px')[0];
            let Maxis='',handler='',mleft='';
            let canFineTurn=['font','add-picture','button-type'];
            if(app.channel==2){
                if(canFineTurn.indexOf(this.model.__componentType)>-1){
                    handler='w,n,s,e,se';
                    Maxis="x,y";
                    mleft=pel.offsetLeft;
                }else{
                    handler='n,s';
                    Maxis="y";
                    mleft='0'
                }
            }else{
                handler='w,n,s,e,se';
                Maxis="x,y"
                mleft=pel.offsetLeft;
            }
            // 当前拖拽的组件相对父级坐标
            let pos = {
                y: pel.offsetTop,
                x: mleft
            }
            let dragconfig = {
                scroll: true,
                snapMode: "outer",
                // containment:'parent',
                axis: Maxis,
                start() {
                    $("#toolbar").empty();
                },
                stop(e) {
                    let style = $(this).get(0).style;
                    let ss = self.model.style;
                    if (self.model.style) {
                        ss.top = style.top;
                        ss.left = style.left;
                    }
                },
                drag(e) {
                    self.wireShow = true;
                    let ah = $(el).parents('.editBb')[0].clientHeight;
                    pos = {
                        y: pel.offsetTop,
                        x: pel.offsetLeft
                    }
                    let top = pos.y;
                    let t = '';
                    let u = ''
                    // 50 来源自toolbar的高度
                    if ((parseInt(h) + 50) >= ah) {
                        t = 'autoshow';
                        u = 'from';
                    } else {
                        if (top < 50) {
                            t = 'overtop';
                            u = 'from'
                        } else {
                            t = 'nor';
                            u = 'top'
                        }
                    }
                    self.toolP = t;
                    self.toClass = u;
                    self.model.toClass = u
                },
                snap: true,
                snapTolerance: 8
            };

            let resizeConfig = {
                stop(e) {
                    let style = $(this).get(0).style;
                    let ss = self.model.style;
                    if (ss) {
                        ss.width = style.width;
                        ss.height = style.height;
                        ss.left = style.left;
                        ss.top = style.top;
                    }
                },
                resize(event, ui) {
                    self.width = self.$el.style.width
                    self.height = self.$el.style.height
                    self.wireShow = true
                },
                containment: 'parent',
                handles: handler
            };
            if (this.isEdit) {
                el.resizable(resizeConfig).draggable(dragconfig);
                var i = 0;
                el.mouseenter(() => {
                    // 新toolbar 不要删
                    let poss = {
                        top: $(pel).offset().top,
                        left: $(pel).offset().left
                    }
                    loader.createVue('tools/toolbar', tool => {
                        tool.toolStyle = poss;
                        tool.model = self.model;
                        tool.setting = self.setting;
                        tool.editing = self.editing;
                        tool.showSetting = self.showSetting;
                        tool.par = self.$parent;
                        tool.copy = (callback) => {
                            //复制组件
                            let pos = {
                                left: parseInt(self.model.style.left.replace(/px/, '')) + 10,
                                top: parseInt(self.model.style.top.replace(/px/, '')) + 10,
                            }
                            self.$parent.copy(self.model.__componentType, pos.left, pos.top, self.model);
                        };
                        loader.fill("#toolbar", tool);
                    })
                    /*let ah = $(el).parents('.editBb')[0].clientHeight;
                    let v = '';
                    let w = '';
                    let top = pos.y;
                    if (i) {
                        clearTimeout(i);
                    }
                    if ((parseInt(h) + 50) >= ah) {
                        v = 'autoshow';
                        w = 'from';
                    } else {
                        if (top < 50) {
                            v = 'overtop';
                            w = 'from';
                        } else {
                            v = 'nor';
                            w = 'top';
                        }
                    }
                    self.toolP = v;
                    self.toClass = w;
                    this.model.toClass = w;
                    this.showBtns = true;*/
                });

                el.mouseleave(() => {
                    //TODO 需要改造 验证toolbar
                    i = setTimeout(() => {
                        this.showBtns = false;
                        this.showToClass = false;
                    }, 500);
                });
            }


        },

        methods: {
            fineTurn(el) {
                // console.log(el.target)
                app.fineTurn(el.target,this.model);
            },
            isDrag(el, n) {
                // 启用/暂停拖拽
                let isAble = 'enable';
                if (!n) isAble = 'disable';
                el.draggable(isAble);
            },
            remove() {
                this.$parent._beforeDestroy();

            },
            openShowMore() {
                //TODO
                // console.log(this.model.showMore);
            },
            beforeDestroy() {
                alert(123);
            }
            
        },
        components: {},

    }
});