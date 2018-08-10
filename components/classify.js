define(['vueLoader'], (loader) => {
    return {
        props: {
            model: {
                default: {
                    title: '栏目标题',
                    subtitle:'',
                    style: {
                        width: '180px',
                        height: '',
                        overflow: 'none',
                    },
                    titlestyle: {
                        width: '100%',
                        height: '40px',
                        'font-size': '16px',
                        'color': '#fff',
                        'padding-left': '20px',
                        'line-height': '40px',
                    },
                    listyleOne: {
                        width: '100%',
                        height: '40px',
                        'padding-left': '20px',
                        'padding-right': '20px',
                        'line-height': '40px',
                        'border-bottom': '1px dashed #b8b8b8'
                    },
                    listyleTwo: {
                        width: '100%',
                        // height: '40px',
                        // 'padding-left': '20px',
                        // 'padding-right': '20px',
                        'line-height': '40px',
                    },
                    'background-color': '#e6e6e6',
                    hoverColor: '#AAA',
                    type: 0,
                    cates: [],
                    totalModule: '0',
                    classification: '0',
                    Lower: '0',
                    Expansion: '0',
                    defaultLShow: '0',
                    classify: [],
                    backgroundStyle: {
                        useDefault: true,
                        'background-color': 'inherit',
                        'background-image': '',
                    },
                    titleBarStyle: {
                        show: true,
                        'background-color': '#5ca6e2',
                        'border-radius':'',
                    },
                    openMod: '_blank',
                },
            },
            editingConfig: {
                default: {
                    title: '编辑组件（分类目录）',
                    pages: {
                        '常规': {
                            title: {
                                config: {
                                    text: '组件标题',
                                },
                                component: 'dialog/text',
                            },
                            type: {
                                config: {
                                    text: '分类列表',
                                },
                                component: 'dialog/editing/classifyList',
                            },
                        },
                        '高级': {
                            totalModule: {
                                config: {
                                    text: '全站模块：',
                                    radio: [{
                                        name: '启动',
                                        value: '0'
                                    },
                                        {
                                            name: '停用',
                                            value: '1'
                                        }
                                    ]
                                },
                                component: 'dialog/radio'
                            },
                            classification: {
                                config: {
                                    text: '分类图标：',
                                    radio: [{
                                        name: '显示',
                                        value: '0'
                                    },
                                        {
                                            name: '隐藏',
                                            value: '1'
                                        }
                                    ]
                                },
                                component: 'dialog/radio'
                            },
                            Lower: {
                                config: {
                                    text: '有下级菜单时：',
                                    radio: [{
                                        name: '上级菜单可点击',
                                        value: '0'
                                    },
                                        {
                                            name: '不可点击',
                                            value: '1'
                                        }
                                    ]
                                },
                                component: 'dialog/radio'
                            },
                            Expansion: {
                                config: {
                                    name: '展开方式:',
                                    selected: '0',
                                    radio: [{
                                        name: '点击展开',
                                        value: '0'
                                    },
                                        {
                                            name: '滑动展开',
                                            value: '1'
                                        }
                                    ],
                                    showList: {
                                        name: '默认展开',
                                        value: '0',
                                        radio: [{
                                            name: '是',
                                            value: '0',
                                            imgSrc: './images/components/Expansion_true.png'
                                        },
                                            {
                                                name: '否',
                                                value:
                                                    '1',
                                                imgSrc: './images/components/Expansion_false.png'
                                            },
                                        ],
                                    },
                                    imgSrc: './images/components/Expansion.png'
                                },
                                component: 'dialog/editing/chassifyShow'
                            },
                        },
                    },
                },
            },
            settingConfig: {
                default: {
                    visible: true,
                }
            },
        },
        data() {
            return {};
        },
        watch: {},
        computed: {},
        mounted() {
            if (this.model.Expansion === "0" && this.model.defaultLShow === "0") {
                let ele = $(".classifyShow");
                for (let i = 0; i < ele.length; i++) {
                    ele[i].style.display = 'block';
                }
            } else if (this.model.Expansion === "0" && this.model.defaultLShow === "1") {
                let ele = $(".classifyShow");
                for (let i = 0; i < ele.length; i++) {
                    ele[i].style.display = 'none';
                }
            }
        },
        methods: {
            click(item){
                if(this.model.Lower==1&&this.model.upChannel==0) return;
                if(app.isPreview){
                    if(item.columnCode=='custom'){
                        window.location.href=item.linkUrl;
                    }else{
                        app.changePage(item.id);
                    }
                }else{
                    if(item.columnCode=='custom'){
                        if(item.linkUrl.indexOf('.html')>-1){
                            window.location.href='http://'+app.toSessionStorage('domainUrl')+item.linkUrl;
                        }else{
                            window.location.href=item.linkUrl;
                        }
                    }else{
                        app.changePage(item.id);
                    }
                }
            },
            hover(i) {
                if (this.model.Expansion === "1") {
                    if (this.model.classify[i].children && this.model.classify[i].children.length > 0) {
                        let ele = this.$refs[i][0].children[3];
                        console.log(ele)
                        ele.style.display = 'block';
                    }
                }
            },
            out(i) {
                if (this.model.Expansion === "1") {
                    let ele = this.$refs[i][0].children[3]
                    ele.style.display = 'none';
                }
            },
            cShow(i) {
                if (this.model.classify[i].children && this.model.classify[i].children.length > 0) {
                    let ele = this.$refs[i][0].children[1]
                    let ed = ele.style.display;
                    if (ed === 'none') {
                        ele.style.display = 'block'
                    } else if (ed === 'block') {
                        ele.style.display = 'none'
                    }
                }
            }
        }
    }
});