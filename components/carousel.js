define([], () => {
    return {
        data() {
            return {}
        },
        computed: {
            carouselHeight() {
                if (this.model.titleBarStyle.show == true) {
                    let h1 = this.model.style.height;
                    let h2 = this.model.titleBarStyle.height;
                    let i = h1.indexOf('px');
                    if (i == -1) {
                        return '300px';
                    }
                    return parseInt(h1.substr(0, i)) - parseInt(h2) + 'px';
                } else {
                    return this.model.style.height;
                }
            }
        },
        props: {
            model: {
                default: {
                    type: app.channel=='2'?3:0, //0图形指示器 1数字指示器 2图片指示器
                    images: [],
                    // interval:5000,
                    carousel: {
                        autoplay: true,
                        interval: 3000,
                    },
                    imageContainerStyle: {
                        width: '100px',
                        height: '80px',
                        'margin-left': '20px',
                        'margin-top': '20px',
                    },
                    imageStyle: {
                        width: '100%',
                        height: 'auto',
                    },
                    imageSetting: {
                        descVisible: true,
                        clickEffect: 0, //0无效果 1幻灯片 2图片链接
                        open: 1, //0当前窗口 1新窗口

                    },
                    style: {
                        width: app.channel ==2?'100%':'600px',
                        height: '350px',
                    },
                    title: '轮播多图',
                    subtitle:'',
                    hoverEffect: 0,
                    sliderEffect: 0,
                }
            },
            key: {},
            settingConfig: {},
            editingConfig: {
                default: {
                    title: '轮播多图(只支持八张图片)',
                    pages: {
                        '常规': {
                            images: {
                                component: 'dialog/editing/imagePanel',
                            },
                            // imageSetting: {
                            //     component: 'dialog/editing/imageSetting',
                            // },

                        },
                        '切换样式': {
                            type: {
                                config: {
                                    style: {
                                        width: '200px',
                                        height: '100px',
                                        border: '1px solid #cccccc',
                                    },
                                    options: [{
                                            channel: 1,
                                            image: './images/components/c-dot.png',
                                            text: '长条指示器',
                                        }, {
                                            channel: 1,
                                            image: './images/components/c-num.png',
                                            text: '数字指示器',
                                        }, {
                                            channel: 1,
                                            image: './images/components/c-thumb.png',
                                            text: '图片指示器',
                                        },
                                        {
                                            channel: 2,
                                            image: './images/components/c-dot.png',
                                            text: '长条指示器',
                                        }
                                    ],
                                },
                                component: 'dialog/editing/style-list',
                            },
                        },
                        '轮播设置': {
                            carousel: {
                                component: 'dialog/editing/carouselEdit',
                            },
                        },
                        '高级': {
                            showMore: {
                                config: {
                                    options: [
                                        //TODO 需要网络数据
                                        {
                                            link: '0',
                                            label: '--首页--',
                                        },
                                        {
                                            link: '1',
                                            label: '--页面1--',
                                        },
                                        {
                                            link: '2',
                                            label: '--页面2--',
                                        },
                                    ]
                                },
                                component: 'dialog/editing/pt-showmore'
                            }
                        }
                    }
                },
            },
        },
        mounted() {
            window.caro = this;
            // console.log(this.model)
        },
        watch: {
            'model': {
                handler(newValue) {
                    // this.$forceUpdate();
                },
                deep: true,
            }
        },
        methods: {
            clickImg(im, index) {
                if (this.model.imageSetting.clickEffect == 1) {
                    //幻灯片
                    lantern.open(this.model, index);

                } else if (this.model.imageSetting.clickEffect == 2) {
                    if (this.model.imageSetting.open == 1) {
                        window.location.href = im.src;
                    } else if (this.model.imageSetting.open == 0) {
                        window.open(im.src);
                    }
                }
            },
            setActiveImg(i) {
                this.$refs.carousel2.setActiveItem(i);
            },
        },

    }
});