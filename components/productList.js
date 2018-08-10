define([], () => {
    return {
        props: {
            model: {
                default: {
                    currentPage: 0,
                    title: '产品展示',
                    titleBarStyle: {
                        show: false
                    },
                    subtitle: '副标题',
                    type: app.channel == '2' ? 7 : 0,
                    hoverEffect: 0,
                    productIds: [],
                    style: {
                        width: app.channel == 2 ? '100%' : '1200px',
                        height: '552px',
                        'overflow-x': 'hidden'
                    },
                    imageStyle: {
                        width: '180px',
                        height: '180px',
                    },
                    argShowConfig: {
                        type: 0,
                        columns: [{
                            key: 'name',
                            visible: true,
                            fixed: true,
                            prefix: '',
                            style: {
                                'font-size': '14px',
                                'color': '#ccc',
                                'line-height': '20px',
                            },
                            label: '产品名字'
                        }, {
                            key: 'price',
                            visible: true,
                            fixed: true,
                            prefix: '¥',
                            style: {
                                'font-size': '14px',
                                'color': '#f12305',
                                'line-height': '20px',
                            },
                            label: '价格(交易价格)'
                        },
                            {
                                key: 'marketPrice',
                                visible: true,
                                fixed: false,
                                prefix: '¥',
                                style: {
                                    'font-size': '12px',
                                    'line-height': '20px',
                                    'color': '#ccc',
                                    'text-decoration': 'line-through',
                                },
                                label: '价格(市场价格)',
                            },
                            {
                                key: 'spu',
                                visible: true,
                                fixed: false,
                                prefix: '编号:',
                                style: {
                                    'font-size': '14px',
                                    'color': '#ccc',
                                    'line-height': '20px',
                                },
                                label: '编号'
                            },
                            // {
                            //     key: 'summary',
                            //     visible: true,
                            //     fixed: false,
                            //     prefix: '',
                            //     label: '产品介绍',
                            // }
                        ],
                    },
//显示更多
                    //展示设置
                    showConfig: {
                        showPage: true, //是否分页
                        capacity: app.channel == '2' ? 2 : 10, //产品个数


                        useSlide: false, //支持幻灯片

                        //点击产品
                        clickConfig: {
                            showType: true, // 0-产品详情页 ,1-幻灯片
                            detailShowType: 0, //详情打开方式  0-当前窗口,1-新窗口
                        },
                    },

                    effectBorder: 0,
                    effectColor: '',
                    effectWidth: '10px',
                    effectStyle: 0,
                }
            },
            settingConfig: ['常规', '标题', '动画', '样式'],
            editingConfig: {
                default: {
                    title: '编辑组件(产品展示)',
                    pages: {
                        '常规': {
                            title: {
                                config: {
                                    text: '组件标题',
                                    placeholder: '请填写页面名称/导航名称',
                                },
                                component: 'dialog/text',
                            },
                            type: {
                                config: {
                                    text: '组件样式：',
                                    options: [{
                                        channel: 1,
                                        text: '纯文本展示',
                                        image: './images/components/product-style1.png',
                                    },
                                        {
                                            channel: 1,
                                            text: '横向平铺样式',
                                            image: './images/components/product-style2.png',
                                        },
                                        {
                                            channel: 1,
                                            text: '走马灯展示',
                                            image: './images/components/imgs-sty4.gif',
                                        },
                                        {
                                            channel: 1,
                                            text: '箭头滚动展示',
                                            image: './images/components/product-style4.png',
                                        },
                                        {
                                            channel: 1,
                                            text: '两列图文展示',
                                            image: './images/components/product-style5.png',
                                        },
                                        {
                                            channel: 1,
                                            text: '首图全文展示',
                                            image: './images/components/product-style6.png',
                                        },
                                        {
                                            channel: 1,
                                            text: '单列图文展示',
                                            image: './images/components/product-style7.png',
                                        },
                                        {
                                            channel: 2,
                                            text: '纯文本展示',
                                            image: './images/components/img_cpzs_zj_a.png',
                                        },
                                        {
                                            channel: 2,
                                            text: '纯文本展示',
                                            image: './images/components/img_cpzs_zj_b.png',
                                        },
                                        {
                                            channel: 2,
                                            text: '横向平铺样式',
                                            image: './images/components/img_cpzs_zj_c.png',
                                        },
                                        /*,
                                         {
                                         channel:2,
                                         text: '走马灯展示',
                                         image: './images/components/img_cpzs_zj_d.png',
                                         },*/
                                        {
                                            channel: 2,
                                            text: '箭头滚动展示',
                                            image: './images/components/img_cpzs_zj_e.png',
                                        },
                                        {
                                            channel: 2,
                                            text: '两列图文展示',
                                            image: './images/components/img_cpzs_zj_f.png',
                                        }
                                    ],
                                    style: {
                                        width: '70px',
                                        height: '48px'
                                    }
                                },
                                component: 'dialog/editing/style-list',
                            },
                            imageStyle: {
                                config: {
                                    text: '图片大小',
                                },
                                component: 'dialog/editing/size',
                            },
                            productIds: {
                                component: 'dialog/editing/product-category-list',
                            }
                        },
                        '悬停特效': {
                            hoverEffect: {
                                config: {
                                    data: [{
                                        src: './images/components/1.png',
                                        desc: '无效果',
                                        style: {
                                            width: '200px',
                                            height: '100px',
                                            border: '1px solid #cccccc',
                                            'margin-left': '0px'
                                        }
                                    }, {
                                        src: './images/components/2.png',
                                        desc: '出现边框',
                                        style: {
                                            width: '200px',
                                            height: '100px',
                                            border: '1px solid #cccccc',
                                            'margin-left': '10px'
                                        }
                                    }, {
                                        src: './images/components/7.png',
                                        desc: '悬浮移动',
                                        style: {
                                            width: '200px',
                                            height: '100px',
                                            border: '1px solid #cccccc',
                                            'margin-left': '10px'
                                        }
                                    }, {
                                        src: './images/components/6.png',
                                        desc: '悬浮放大',
                                        style: {
                                            width: '200px',
                                            height: '100px',
                                            border: '1px solid #cccccc',
                                            'margin-left': '10px'
                                        }
                                    }, {
                                        src: './images/components/3.png',
                                        desc: '出现放大器',
                                        style: {
                                            width: '200px',
                                            height: '100px',
                                            border: '1px solid #cccccc',
                                            'margin-left': '0px'
                                        }
                                    }, {
                                        src: './images/components/4.png',
                                        desc: '图片描述蒙层',
                                        style: {
                                            width: '200px',
                                            height: '100px',
                                            border: '1px solid #cccccc',
                                            'margin-left': '10px'
                                        }
                                    }, {
                                        src: './images/components/5.png',
                                        desc: '图片底部表述',
                                        style: {
                                            width: '200px',
                                            height: '100px',
                                            border: '1px solid #cccccc',
                                            'margin-left': '10px'
                                        }
                                    },
                                    ]

                                },
                                component: 'dialog/editing/hover-effect'
                            },
                        },
                        '展示设置': {
                            showMore: {
                                component: 'dialog/editing/pt-showmore'
                            },

                            showConfig: {
                                component: 'dialog/editing/show-product-config',
                            }
                        },
                        '展示参数': {
                            // type: {
                            //     config: {
                            //         title: '参数布局样式:',
                            //         style: {
                            //             width: '100px',
                            //             height: '70px'
                            //         },
                            //         data: [
                            //             {
                            //                 src: './images/components/product-param1.png',
                            //                 desc: '无效果',
                            //             },
                            //             {
                            //                 src: './images/components/product-param2.png',
                            //                 desc: '无效果',
                            //             },
                            //             {
                            //                 src: './images/components/product-param3.png',
                            //                 desc: '无效果',
                            //             },
                            //             {
                            //                 src: './images/components/product-param4.png',
                            //                 desc: '无效果',
                            //             },
                            //             {
                            //                 src: './images/components/product-param5.png',
                            //                 desc: '无效果',
                            //             },
                            //             {
                            //                 src: './images/components/product-param6.png',
                            //                 desc: '无效果',
                            //             },
                            //         ]
                            //     },
                            //     component: 'dialog/editing/pickrect'
                            // },
                            argShowConfig: {
                                component: 'dialog/editing/product-arg-config',
                            }
                        }
                    }
                }
            }
        },
        data() {
            return {
                currentPage: 0,
                moduleConfig: {},
                products: [],
                loadedImage: {},
                selectedProduct: null,
                timeId: -1,
                imgbox: {
                    width: '',
                    height: '',
                    overflow: 'hidden',
                    position: 'absolute',
                    'margin-left': '0px',
                },
            }
        },
        computed: {
            carouselHeight() {
                let h1 = this.model.style.height;
                let h2 = this.model.titleBarStyle.height;
                let i = h1.indexOf('px');
                if (i == -1) {
                    return '300px';
                }
                return parseInt(h1.substr(0, i)) - parseInt(h2) + 'px';
            },
            wid(){
                return "width:calc(100% - " + this.model.imageStyle.width + " - 15px)";
            },
            selectedPro() {
                if (this.selectedProduct == null && this.products.length > 0) {
                    this.selectedProduct = this.products[0];
                }
                return this.selectedProduct;
            },
            // argShowConfig(){
            //     return this.model.argShowConfig;
            // },
            total() {
                return Math.ceil(this.products.length / this.capacity);
            },
            productList() {
                if (this.model.showConfig.showPage === false) {
                    return this.products;
                }
                let capacity = this.capacity <= 0 ? 1 : this.capacity;
                capacity = parseInt(capacity);

                let total = this.products.length,
                    start = capacity * this.currentPage,
                    end = start + capacity;
                let ps = [];
                for (; start < end && start < total;) {
                    ps.push(this.products[start++]);
                }
                return ps;
            },
            start() {
                return this.currentPage * this.capacity;
            },
            capacity() {
                if (this.model.showConfig.capacity)
                    return this.model.showConfig.capacity;
                return 1;
            }
        },
        watch: {
            'model.productIds' (v) {
                this.products = [];
                this.model.productIds.forEach(id => {
                    app.loadProductSummary({
                        id
                    }, (result) => {
                        if (result) {
                            this.products.push(result);
                        }
                    });
                })
            },
            'model.type'() {
                if (this.model.type == 2) {
                    this.carousel();
                } else {
                    clearInterval(this.timeId)
                }
            }
        },
        methods: {
            clickClumn(row) {
                let self = this;
                self.showDetail(row.id);
            },
            showDetail(p) {
                if (this.model.showConfig.clickConfig.showType)
                    app.changePage(app.toWebsessionStorage('pdId'), p, '', this.model.showConfig.clickConfig.detailShowType);
                else {
                    lantern.open({
                        images: [{
                            src: p.image,
                            desc: p.name,
                        }]

                    }, 0);
                }
            },
            setSelectedProduct(p) {
                this.selectedProduct = p;
            },
            selectedClass(p) {
                if (this.selectedProduct == p)
                    return {
                        'border': '2px solid red'
                    };
                return {
                    'border': '1px solid #ccc',
                }
            },
            pictureClick() {
            },
            imgLoad($event) {
            },
            loading(k) {
                if (this.loadedImage[k])
                    this.loadedImage[k] = false;
                return !this.loadedImage[k];
            },
            loaded(k) {
                this.loadedImage[k] = true;
            },
            // paging(i)
            // {
            //     let end = this.start + this.capacity;
            //     return this.start <= i && end > i;
            // }
            paging(i, n, capa = this.capacity) {
                let start = (i - 1) * parseInt(capa);
                let end = start + parseInt(capa);
                return start <= n && end > n;
            },
            customTotal(capa) {
                return Math.ceil(this.products.length / capa);

            },
            carousel() {
                setTimeout(() => {
                    clearInterval(this.timeId);
                    let w = this.model.imageStyle.width;
                    let l = this.model.imageStyle['margin-left'];
                    let t = this.model.imageStyle['margin-top'];
                    if (w.indexOf('rem') > -1) {
                        w = w.replace(/rem/, '') * 16;
                    }
                    if (l && l.indexOf('rem') > -1) {
                        l = l.replace(/rem/, '') * 16;
                    }
                    if (t && t.indexOf('rem') > -1) {
                        t = t.replace(/rem/, '') * 16;
                    }
                    l = l || 0;
                    t = t || 0;

                    let width = parseInt(w);
                    let mLeft = parseInt(l);
                    let length = this.products.length;
                    let mTop = parseInt(t);

                    this.imgbox.width = ( width + mLeft) * length * 2 + "px";
                    this.imgbox.height = (width + mTop ) + "px";
                    let imgbox = this.$refs.imgbox;
                    let i = 0;
                    if (this.model.type == 3 || this.model.type == 6) i = -( width + mLeft) * length
                    this.timeId = setInterval(() => {
                        // if(this.model.type==2 || this.model.type==5){
                        i--;
                        imgbox.style['margin-left'] = i + 'px';
                        if (-parseInt(this.imgbox.width) / 2 == parseInt(imgbox.style['margin-left'])) i = 0;
                        // } else if(this.model.type==3 || this.model.type==6){
                        //     i++;
                        //     imgbox.style['margin-left'] = i + 'px';
                        //     if(parseInt(imgbox.style['margin-left'])==0)  i=-( width+ mLeft) * length
                        // }
                    }, 20);
                }, 100)
            }
        },
        mounted() {
            var width = this.model.imageStyle.width;
            var height = this.model.imageStyle.height;
            this.model.imageStyle.width = app.mobileFit(width);
            this.model.imageStyle.height = app.mobileFit(height);
        },
    }
});