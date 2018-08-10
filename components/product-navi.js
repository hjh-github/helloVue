define([], () => {
    return {
        props: {
            model: {
                default: {
                    title: '产品导航',
                    subtitle:'',
                    type: 0,
                    cates: [],
                    titleStyle: {
                        height: '50px',
                        'line-height': '50px',
                        'margin-left': '20px'
                    },
                    titleInner: {
                        display: 'inline-block',
                        width: '100px',
                        height: '50px',
                        'line-height': '50px',
                        'background-color': '#5ca6e2'
                    },
                    style: {
                        width: app.channel==2?'100%':'988px',
                        height: '400px'
                    }
                },
            },
            editingConfig: {
                default: {
                    title: '编辑组件（产品导航）',
                    pages: {
                        '常规': {
                            title: {
                                config: {
                                    text: '组件标题',
                                },
                                component: 'dialog/text',
                            },
                            canvasStyle: {
                                config: {
                                    text: '背景颜色'
                                },
                                component: 'dialog/editing/blackground-color'
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
                                            channel: 2,
                                            image: 'images/components/pro-nav1.png',
                                            text: '0',
                                        },
                                        {
                                            channel: 2,
                                            image: 'images/components/pro-nav2.png',
                                            text: '1',
                                        }
                                    ],
                                },
                                component: 'dialog/editing/style-list',
                            },
                            cates: {
                                component: 'dialog/editing/product-cates',
                            }
                        },
                    },
                },
            },
            settingConfig: {
                default: {},
            },
        },
        data() {
            return {
                allCates: [],
                liStyle: ''
            }
        },
        watch: {
            'model.allCates': {
                deep: true,
                handler(v) {
                    // 未编辑时通过接口取到所以
                    if (this.model.allCates)
                        this.allCates = app.treefy(this.model.allCates);
                    else {
                        app.loadProductCate(-1, (r) => {
                            this.allCates = app.treefy(r);
                        });
                    }

                }
            }
        },

        mounted() {
            console.log(this)
            // this.allCates;
            // this.model.cates.forEach(e => {
            //
            // });
        },
        methods: {
            goInfo(){
                var pageid = app.toWebsessionStorage('proId');
                if (pageid != undefined) {
                    if (app.channel == 1) {
                        window.open('http://' + app.toWebsessionStorage('domainUrl') + '/preview.html?pageid=' + pageid)
                    }
                } else {
                    this.$message({
                        message: '暂无内容！',
                        type: 'warning'
                    });
                }
            }
        }
    }
});