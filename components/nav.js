define(['vueLoader'], (loader) => {
    return {
        props: {
            model: {
                default: {
                    style: {
                        width: '100%',
                        height: '60px',
                    },
                    // 'background-color': '"#CD2020"',
                    // 'text-color': '#fff',
                    // 'active-text-color': '#ffd04b',
                },
            },
            pages: {

            },
            ingConfig: {
                default: {
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
                            'hover-color': {
                                config: {
                                    text: '鼠标悬停颜色'
                                },
                                component: 'dialog/color-picker'
                            },
                            'font-size': {
                                config: {
                                    text: '字体大小'
                                },
                                component: 'dialog/setting/navFont'
                            },
                            'nav-fixed': {
                                config: {
                                    text: '是否悬浮'
                                },
                                component: 'dialog/setting/navFiexd'
                            },
                            // 'nav-show':{
                            //     config: {
                            //         text: '是否显示'
                            //     },
                            //     component: 'dialog/setting/navShow'
                            // },
                        },
                    },
                    resize: 'e,w',
                }
            },
            settingConfig() {

            },
        },
        data() {
            return {
                navList: [],
                casual: '',
                show:false,
                style: {
                    'line-height': '60px',
                    'font-size': '14px'
                },
                HC:'',
            }
        },
        watch: {
            'model': {
                handler(newValue, oldValue) {
                    this.style['line-height'] = this.model['line-height'] = this.model.style.height;
                    this.style['font-size'] = this.model['font-size'];
                },
                deep: true,
            },
            'pages': {
                handler(newValue, oldValue) {
                    // console.log('pages: ',newValue)
                    this.treefy();
                },
                deep: true,
            },
        },
        methods: {
            mouseenter: () => {
                this.casual = this.model['background-color']
                this.model['background-color'] = this.model['hover-color']
            },
            mouseleave: () => {
                this.model['background-color'] = this.casual
            },
            chanPage(item) {
                if(item.columnCode=='custom'){
                    window.location.href=item.linkUrl;
                }else{
                    app.changePage(item.id);
                }
                // this.model.index = i;
            },
            treefy() {
                let list = {};
                let r = JSON.parse(JSON.stringify(this.pages));
                let result = [];
                r.forEach(e => {
                    if (list[e.menuId]) {
                        e.children = list[e.menuId].children;
                    }
                    list[e.menuId] = e;
                    if (e.parentId == 0) {
                        result.push(e);
                    } else {
                        if (list[e.parentId]) {
                            if (list[e.parentId].children == null) {
                                list[e.parentId].children = [];
                            }
                        } else {
                            list[e.parentId] = {
                                children: []
                            };
                        }
                        list[e.parentId].children.push(e);
                    }
                });
                this.navList = result;
            },
            hover(i){
                let ele=this.$refs[i][0];
                ele.style.backgroundColor=this.model['hover-color'];
                if(this.navList[i].children&&this.navList[i].children.length>0){
                    let cele=ele.children[1]
                    cele.style.display='block'
                }
            },
            out(i){
                let ele=this.$refs[i][0];
                ele.style.backgroundColor='';
                if(this.navList[i].children&&this.navList[i].children.length>0){
                    let cele=ele.children[1]
                    cele.style.display='none'
                }
            },
            lihover(e){
                let ele=e.target
                ele.style.backgroundColor=this.model['hover-color'];
            },
            liout(e){
                let ele=e.target
                ele.style.backgroundColor=''
            },
        },
        mounted() {
            let self = this;
            let el = $(this.$el);
            let con = $(this.$refs.container);
            self.style['font-size'] = self.model['font-size'];
            self.style['line-height'] = self.model['line-height'];
            con.draggable({
                containment: "parent"
            })
            if (app.isPreview) {
                con.draggable("disable")
            }
            self.model.style['z-index'] = 99
            if (this.pages) {
                this.treefy();
            }
            //全局注册
            app.navigation = this;
        },
        beforeUpdate() {
            this.model.style.width = this.navList.length * 125 + 'px';
        },
        updated() {
            let pageid = app.getRequest().pageid;
            let color = this.model['active-text-color'];
            let bgColor = this.model['background-color'];
            for (let index = 0; index < this.navList.length; index++) {
                let ele = this.$refs[index][0];
                // ele.style['border-bottom-color']=bgColor;
                if (ele.children.length > 0) {
                    ele.children[0].style.height = this.model['line-height'];
                    ele.children[0].style['line-height'] = this.model['line-height'];
                }
                if (this.navList[index].id == pageid) {
                    if (ele.children.length > 0) {
                        ele.children[0].style.color = color
                    }
                    ele.style.color = color;
                }
            }
        },
        computed: {}
    }
});