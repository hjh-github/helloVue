define(['vueLoader'], (loader) => {
    return {
        props: {
            model: {
                default: {
                    title: '商城分类',
                    subtitle:'',
                    style: {
                        width: '120px',
                        height: '180px',
                        overflow: 'none',
                    },
                    'background-color': '#123',
                    color1: '#FFF',
                    color2: '#ccc',
                    color3: '#999',
                    color1hover: '#AAA',
                    type: 0,
                    cates: [],
                    backgroundStyle: {
                        useDefault: true,
                        'background-color': 'inherit',
                        'background-image': '',
                    },
                    titleBarStyle: {
                        show: false
                    },
                    openMod: '_blank',
                },
            },
            editingConfig: {
                default: {
                    title: '编辑组件（商城分类）',
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
                                    text: '组件样式',
                                    style: {
                                        width: '80px',
                                        height: '50px',
                                    },
                                    options: [{
                                        channel: 1,
                                        image: 'images/components/pro-nav1.png',
                                        text: '0',
                                    },
                                        {
                                            channel: 1,
                                            image: 'images/components/pro-nav2.png',
                                            text: '1',
                                        },
                                        {
                                            channel: 1,
                                            image: 'images/components/pro-nav2.png',
                                            text: '1',
                                        },
                                        {
                                            channel: 1,
                                            image: 'images/components/pro-nav2.png',
                                            text: '1',
                                        },
                                    ],
                                },
                                component: 'dialog/editing/style-list',
                            },
                            cates: {
                                component: 'dialog/editing/mall-cates',
                            }
                        },
                        '展示设置': {
                            openMod: {
                                component: 'dialog/editing/openMod',
                            },
                            'background-color': {
                                config: {
                                    text: '背景颜色(样式1有效)'
                                },
                                component: 'dialog/color-picker'
                            },
                            color1: {
                                config: {
                                    text: '  主文本颜色'
                                },
                                component: 'dialog/color-picker'
                            },
                            // color2: {
                            //     config: {
                            //         text: '二级分类颜色'
                            //     },
                            //     component: 'dialog/color-picker'
                            // },
                            // color3: {
                            //     config: {
                            //         text: '二级分类颜色'
                            //     },
                            //     component: 'dialog/color-picker'
                            // },
                        },
                    },
                },

            },
            settingConfig: {
                default: {
                    visible: false,
                }
            },
        },
        data() {
            return {
                hoverList: {},
                activeIndex: '1',
                allCates: [],
            };
        },
        watch: {
            'model.allCates': {
                deep: true,
                handler(v) {
                    // 未编辑时通过接口取到所以
                    if (this.model.allCates)
                        this.allCates = app.mallTreefy(this.model.allCates);
                    else {
                        app.loadB2CProductCate(-1, (r) => {
                            this.allCates = app.mallTreefy(r);
                        });
                    }

                }
            }
        },
        computed: {
            openMod() {
                return this.model.openMod;
            },
        },
        mounted(){
            this.checkUpConfig();
        },
        methods: {
            handleSelect() {
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            linkHover($event, hover){
                $event.target.style.color = hover ? this.model.color1 : 'black';
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            checkUpConfig(){
                if (!this.model.color3) {
                    this.model.color3 = '999';
                }
            }
        }
    }
});