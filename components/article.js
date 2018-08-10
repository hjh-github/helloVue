define(['vueLoader'], (loader) => {
    return {
        components: {
            cptborder: loader.load('cptborder'),
        },
        props: {
            model: {
                //这里是图文组件的示例
                default: {
                    title: '图文组件',
                    subtitle: '副标题',
                    type: app.channel==2?7:0, //0-6中选
                    image: {
                        src: 'http://0.ss.faisys.com/image/default/demo.png',
                        style: {
                            width: '314px',
                            height: '210px',
                        },
                        defMargin: true,
                        margin: '0px',
                        link: {
                            type: 0, //0-无 //1-本地 2-自定义
                            local: '',
                            open: '_blank',
                            net: '',
                        },
                        // open: '_blank',
                        useDefaultMargin: true,
                        desc: '图片描述样式',
                    },
                    titleVisible: true,
                    style: {
                        width: app.channel == 2?'100%':'1000px',
                        // height: '80%',
                        // opacity: 1,
                        // 'border-radius': '0px',
                        // 'background-color': '#fff',
                    },
                    useDefaultMargin: true,
                    // useDefaultPadding: true,
                    content: '请填写文本内容',
                    // showMore: {
                    //     open: false,
                    //     link: '',
                    //     newWindow: false,
                    // },
                    container: {
                        common: {}
                    },
                    firstStyle: {
                        'text-indent': '2em',
                    },
                    // titleStyle: {
                    //     'text-align': 'center',
                    //     'position': 'relative',
                    //     'width': '100px',
                    //     'height': '40px',
                    //     'color': '#FFF',
                    //     'background-color': '#8BF',
                    //     'font-family': '宋体',
                    //     'font-size': '16px',
                    //     'line-height': '50px',
                    //     'font-weight': 'normal',
                    //     'font-style': 'normal',
                    //     'text-decoration': 'normal',
                    //     'margin': '10px',
                    // },
                    // titleWordStyle: {},
                    // subTitleWordStyle: {},
                    def: {
                        defheight: true,
                        height: '400px',
                        defbackground: true,
                        'background-color': '#fff',
                        'background-image': '',
                        defborder: false,
                        'border-style': 'solid',
                        'border-color': '#ccc',
                        'border-width': '1px',

                        'border': '1px solid #ccc',

                        'border-left': '',
                        'border-right': '',
                        'border-top': '',
                        'border-bottom': '',

                        defTitle: 0,
                        defSubTitle: 0,
                        defTitleBackground: false,
                    },

                },
            }
        },
        watch: {
          'model'(){
            // console.log(this.model);
          }  
        },
        mounted() {
            this.model.content=app.recoverSymbol(this.model.content);
            let width = this.model.image.style.width;
            let height = this.model.image.style.height;
            this.model.image.style.width = app.mobileFit(width);
            this.model.image.style.height = app.mobileFit(height);
        },
        computed: {
            imageHref() {
                switch (this.model.image.link.type) {
                    case 0:
                        return 'javascript:void(0)';
                    case 1:
                        return this.model.image.link.local;
                    case 2:
                        return this.model.image.link.net;
                }
                return 'javascript:void(0)';
            },
            imageMargin() {
                return this.model.image.defMargin ? '5px' : this.model.image.margin;
            },
            type5Style() {
                let style = this.model.image.style;
                style['margin-left'] = this.model.image.margin;
                return style;
            },
            imgContainerStyle() {
                let style = this.model.image.style;

                return style;
            },
            content() {
                return app.recoverSymbol(this.model.content);
            }
        },
        data() {
            return {
                //编辑内容对话框的配置
                editingConfig: {
                    title: '创建图文组件',
                    pages: {
                        "常规": {
                            title: {
                                config: {
                                    text: '组件标题',
                                    placeholder: '请填写组件名',
                                },
                                component: 'dialog/text',
                            },
                            type: {
                                config: {
                                    text: '组件样式：',
                                    style: {
                                        width: '80px',
                                        height: '50px'
                                    },
                                    options: [{
                                            channel: 1,
                                            text: '纯文字',
                                            image: './images/stylelist/buju_a.png',
                                        }, {
                                            channel: 1,
                                            text: '图上文下',
                                            image: './images/stylelist/buju_b.png',
                                        }, {
                                            channel: 1,
                                            text: '图下文上',
                                            image: './images/stylelist/buju_c.png',
                                        }, {
                                            channel: 1,
                                            text: '图左文右',
                                            image: './images/stylelist/buju_d.png',
                                        }, {
                                            channel: 1,
                                            text: '图右文左',
                                            image: './images/stylelist/buju_e.png',
                                        }, {
                                            channel: 1,
                                            text: '图左上',
                                            image: './images/stylelist/buju_f.png',
                                        }, {
                                            channel: 1,
                                            text: '图右上',
                                            image: './images/stylelist/buju_g.png',
                                        },
                                        {
                                            channel: 2,
                                            text: '纯文字',
                                            image: './images/stylelist/buju_a.png',
                                        }, {
                                            channel: 2,
                                            text: '图上文下',
                                            image: './images/stylelist/buju_b.png',
                                        }, {
                                            channel: 2,
                                            text: '图下文上',
                                            image: './images/stylelist/buju_c.png',
                                        }, {
                                            channel: 2,
                                            text: '图左文右',
                                            image: './images/stylelist/buju_d.png',
                                        }, {
                                            channel: 2,
                                            text: '图右文左',
                                            image: './images/stylelist/buju_e.png',
                                        }, {
                                            channel: 2,
                                            text: '图左上',
                                            image: './images/stylelist/buju_f.png',
                                        }, {
                                            channel: 2,
                                            text: '图右上',
                                            image: './images/stylelist/buju_g.png',
                                        }

                                    ],
                                },
                                component: 'dialog/editing/style-list'
                            },
                            image: {
                                component: 'dialog/editing/image',
                            },

                            content: {
                                config: {
                                    text: '文字编辑'
                                },
                                component: 'dialog/editing/ue-editor',
                            }
                        },
                        "高级": {
                            showMore: {
                                component: 'dialog/editing/pt-showmore',
                            },
                            // scrollable: {
                            //     component: 'dialog/editing/pt-scrollable',
                            // }
                        },
                    }
                },
                //设置属性对话框的配置
                settingConfig: {
                    "set": {
                        test: {
                            component: 'dialog/setting/article-set-area'
                        },
                    }
                }
            };
        }
    }
});