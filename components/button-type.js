define(['vueLoader'], (loader) => {
    return {
        components: {
            cptborder: loader.load('cptborder'),
        },
        mounted() {

        },
        props: {
            model: {
                type: Object,
                default: {
                    text: '按钮',
                    image: {
                        src: '',
                        style: {
                            width: '100px',
                            height: '200px',
                        },
                        margin: '0px',
                        link: 'www.baidu.com',
                        useDefaultMargin: true,
                        desc: '图片描述',
                        repeat: 'no-repeat',
                        size: 'cover',
                        position: 'center',
                    },
                    link: {
                        type: 0,
                        local: '',
                        net: '',
                        open: '',
                    },
                    btnStatus: '',
                    btnBg: '',
                    btnBgImg: '',
                    title: '',
                    hoverColor: '',
                    color: '',
                    style: {
                        width: '280px',
                        height: '100px',
                        opacity: 1,
                        'border-radius': '0px',
                        'background-image': '',
                        'border-style': 'solid',
                        'border-color': 'black',
                        'border-width': '1px',
                        'border-bottom': 'medium none',
                    },
                    titleBarStyle: {
                        show: false,
                    },
                    container: {
                        common: {}
                    },
                    def: {},
                    backgroundStyle: {
                        useDefault: true,
                        'background-color': 'inherit',
                        'background-image': '',
                    }
                },
            },
            editingConfig: {
                default: {
                    color1: '#cccccc',
                    title: '按钮组件',
                    pages: {
                        "常规": {
                            text: {
                                config: {
                                    text: '按钮名称',
                                    placeholder: '请输入按钮名称',
                                },
                                component: 'dialog/text',
                            },
                            color: {
                                config: {
                                    text: '文字悬浮颜色',
                                },
                                component: 'dialog/color-picker',
                            },
                            hoverColor: {
                                config: {
                                    text: '按钮悬浮颜色',
                                },
                                component: 'dialog/color-picker',
                            },
                            image: {
                                config: {
                                    name: '样式:',
                                    current_1: '',
                                    current_2: '',
                                    selected: '0',
                                    showStyle: '2',
                                    radio: [{
                                        name: '默认',
                                        value: '0'
                                    },
                                        {
                                            name: '自定义',
                                            value: '1'
                                        }
                                    ],
                                    showList: [{
                                        name: '平铺',
                                        value: '0'
                                    },
                                        {
                                            name: '拉伸',
                                            value: '1'
                                        },
                                        {
                                            name: '填充',
                                            value: '2'
                                        },
                                    ],
                                    text: '按钮样式:',
                                    cellList: [{
                                        imgSrc: 'images/components/1-0.png',
                                        value: 'btn-type-1'
                                    },
                                        // {
                                        //     imgSrc:'images/components/1-1.png',
                                        //     value:'btn-type-2'
                                        // },
                                        {
                                            imgSrc: 'images/components/1-2.png',
                                            value: 'btn-type-3'
                                        },
                                        {
                                            imgSrc: 'images/components/1-3.png',
                                            value: 'btn-type-4'
                                        },
                                    ],
                                    colorSize: '按钮颜色:',
                                    colorList: [{
                                        color: '#FF3B30'
                                    },
                                        {
                                            color: '#FF9500'
                                        },
                                        {
                                            color: '#FFCC00'
                                        },
                                        {
                                            color: '#4CD964'
                                        },
                                        {
                                            color: '#007AFF'
                                        },
                                        {
                                            color: '#5856D6'
                                        },
                                    ]
                                },
                                component: 'dialog/editing/button-style'
                            },
                        }
                    }
                },
            },
            //设置属性对话框的配置
            settingConfig: {
                "set": {
                    test: {
                        component: 'dialog/setting/article-set-area'
                    },
                }
            }
        },
        data() {
            return {
                fc: '',
                bc: '',
            };
        },
        created() {
            let self = this;
            let channel = app.channel;
            if (channel == 2) {
                self.model.style.height = '50px';
                self.model.image.style.height = '50px';
            }
        },
        mounted() {
        },
        methods: {
            selectImage() {
                let self = this;
                loader.loadImageDialog({
                    model: {
                        src: self.model[self.key].src,
                    },
                    callback(model) {
                        // self.selected.src = model.src;
                        self.loading = true;
                        self.model[self.key].src = model.src;
                        setTimeout(() => {
                            self.loading = false;
                        }, 1000);
                    },
                    selectChanged(selected, item, index) {
                    },
                    multiselect: false,
                })
            },
            hover(event) {
                this.fc = $(this.$refs.button.$el).css('color');
                this.bc = $(this.$refs.button.$el).css('background-color');
                $(this.$refs.button.$el).css({'color': this.model.color, 'border-color': this.model.hoverColor, 'background-color': this.model.hoverColor,});
                event.stopPropagation();
            },
            out() {
                $(this.$refs.button.$el).css({'color': this.fc, 'border-color': this.bc, 'background-color': this.bc,});
            }
        },
        watch: {
            model: {
                handler: function (val, oldValue) {
                },
                deep: true
            }
        }
    }
});