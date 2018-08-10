define(['vueLoader'], (loader) => {
    return {
        mounted() {
            this.model.removeShow = false;
            this.model.style['padding-left'] = '0px';
        },
        data() {
            return {
                share: false,
                bgImg: '',
                productDetails: {},
            }
        },
        created() {
            let self = this;
            let id = app.getRequest().detailid;
            let picsUrl = domain + 'product/' + id + '.html';
            $.ajax({
                url: picsUrl,
                type: 'POST',
                data: {
                    id: id
                },
                dataType: 'json',
                success: function (response) {
                    if (response.success && response.data) {
                        self.productDetails = response.data.product;
                        self.productDetails.price += '元';
                    } else {
                        // console.log(response.message);
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });

            var channel = app.channel;
            if (channel == 2) {

            }
        },
        methods: {

        },
        computed: {
            sty() {
                if (this.model.type == '0' || this.model.type == '2')
                    return 'show-style-1'
                else {
                    return 'show-style-2'
                }
            }
        },
        props: {
            model: {
                type: Object,
                default: {
                    smallImg: [{
                            'bgImg': 'background:url(images/components/img_zhanwt.png) no-repeat center;background-size: cover;'
                        },
                        {
                            'bgImg': 'background:url(images/components/img_zhanwt.png) no-repeat center;background-size: cover;'
                        },
                        {
                            'bgImg': 'background:url(images/components/img_zhanwt.png) no-repeat center;background-size: cover;'
                        },
                        {
                            'bgImg': 'background:url(images/components/img_zhanwt.png) no-repeat center;background-size: cover;'
                        },
                        {
                            'bgImg': 'background:url(images/components/img_zhanwt.png) no-repeat center;background-size: cover;'
                        }
                    ],
                    nextPro: '0',
                    offers: '0',
                    customer: '0',
                    magnify: '0',
                    size: {
                        radio: '0',
                        width: '320px',
                        height: '320px'
                    },
                    border: {
                        checked: '',
                        radio: '0',
                        color: '#dddddd',
                        width: '0px',
                        style: 'sty-bd-1',
                    },
                    share: true,
                    parameter: ['0', '1', '2', '3'],
                    type: app.channel=='2'?2:0,
                    name: '',
                    desc: '',
                    style: {
                        height: '600px',
                        opacity: 1,
                        'border-radius': '0px',
                        'background-color': '#fff',
                        'background-image': '',
                        'border-style': 'solid',
                        'border-color': 'black',
                        'border-width': '1px',
                        'border-bottom': 'medium none',
                    },
                    title: '',
                }
            },
            settingConfig: {},
            editingConfig: {
                default: {
                    title: '编辑组件（产品详情）',
                    pages: {
                        '常规': {
                            type: {
                                config: {
                                    text: '组件样式：',
                                    style: {
                                        width: '80px',
                                        height: '50px'
                                    },
                                    options: [{
                                            channel: 1,
                                            text: '左右排列',
                                            image: './images/components/pro_buju_a.png',
                                        },
                                        {
                                            channel: 1,
                                            text: '上下排列',
                                            image: './images/components/pro_buju_b.png',
                                        },
                                        {
                                            channel: 2,
                                            text: '产品展示',
                                            image: './images/components/buju_b_mobile.png',
                                        },
                                        {
                                            channel: 2,
                                            text: '无产品展示',
                                            image: './images/components/buju_a_mobile.png',
                                        },

                                    ],
                                },
                                component: 'dialog/editing/style-list'
                            },
                            share: {
                                component: 'dialog/editing/productDetails-share'
                            },
                            parameter: {
                                config: {
                                    text: '展示参数：',
                                    checkbox: [{
                                            name: '价格（交易价格）',
                                            value: '0'
                                        },
                                        {
                                            name: '价格（市场价格）',
                                            value: '1'
                                        },
                                        {
                                            name: '编号',
                                            value: '2'
                                        },
                                        {
                                            name: '产品介绍',
                                            value: '3'
                                        },
                                    ]
                                },
                                component: 'dialog/editing/productDetails-parameter'
                            },
                            /*editor:{
                                config:{
                                    text:'编辑产品：',
                                },
                                component: 'dialog/editing/ue-editor'
                            }*/
                        },
                        '高级': {
                            nextPro: {
                                config: {
                                    text: '上/下一个产品：',
                                    st: 'nextPro',
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
                            offers: {
                                config: {
                                    text: '优惠信息：',
                                    st: 'offers',
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
                            customer: {
                                config: {
                                    text: '在线客服：',
                                    st: 'customer',
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
                            magnify: {
                                config: {
                                    text: '图片放大效果：',
                                    st: 'magnify',
                                    radio: [{
                                            name: '开启',
                                            value: '0'
                                        },
                                        {
                                            name: '关闭',
                                            value: '1'
                                        }
                                    ]
                                },
                                component: 'dialog/radio'
                            },
                            size: {
                                config: {
                                    text: '图片尺寸：',
                                    st: 'size',
                                    radio: [{
                                            name: '默认',
                                            value: '0'
                                        },
                                        {
                                            name: '自定义',
                                            value: '1'
                                        }
                                    ],
                                    width: '320px',
                                    height: '320px',
                                },
                                component: 'dialog/editing/image-size'
                            },
                            border: {
                                config: {
                                    text: '图片边框：',
                                    st: 'border',
                                    color: '#dddddd',
                                    width: '0px',
                                    radio: [{
                                            name: '默认',
                                            value: '0'
                                        },
                                        {
                                            name: '自定义',
                                            value: '1'
                                        }
                                    ],
                                    style: [{
                                            value: 'sty-bd-1'
                                        },
                                        {
                                            value: 'sty-bd-2'
                                        },
                                        {
                                            value: 'sty-bd-3'
                                        }
                                    ],
                                },
                                component: 'dialog/editing/image-border'
                            }
                        }
                    },
                }

            }
        },

    }
});;