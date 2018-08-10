define([], () => {
    return {
        props: {
            model: {
                default: {
                    currentPage: 0,
                    title: '商品列表',
                    type: app.channel=='2'?5:0,
                    hoverEffect: 0,
                    catesIds: [],
                    productIds: [],
                    style: {
                        width: '1200px',
                        height: '552px',
                        'overflow-x': 'hidden'
                    },
                    argShowConfig: {
                        type: 0,
                        columns: [{
                                key: 'name1',
                                visible: true,
                                fixed: true,
                                prefix: '',
                                style: {
                                    'display': '-webkit-box',
                                    '-webkit-line-clamp': '3',
                                    '-webkit-box-orient': 'vertical',
                                    'white-space':'normal',
                                    'overflow': 'hidden',
                                    'color': '#9DCAEE',
                                },
                                label: '商品名称'
                            }, {
                                key: 'mallPcPrice',
                                visible: true,
                                fixed: true,
                                prefix: '¥',
                                style: {
                                    'font-size': '14px',
                                    'color': 'red',
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
                                key: 'productCode',
                                visible: true,
                                fixed: false,
                                prefix: '编号:',
                                style: {
                                    'font-size': '12px',
                                    'line-height': '20px',
                                    'color': '#ccc',
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

                    //展示设置
                    showConfig: {
                        showPage: true, //是否分页
                        capacity: app.channel=='2'?4:10, //产品个数

                        //显示更多
                        showMore: {
                            visible: 0, //0-默认,1-隐藏,2-自定义
                            link: {
                                type: 0,
                                local: '',
                                net: '',
                                open: '',
                            },
                        },
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
                    title: '编辑组件(商品展示)',
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
                                            image: './images/components/product-style3.png',
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
                                        /*{
                                            channel: 1,
                                            text: '首图全文展示',
                                            image: './images/components/product-style6.png',
                                        },
                                        {
                                            channel: 1,
                                            text: '单列图文展示',
                                            image: './images/components/product-style7.png',
                                        },*/
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
                                        /*{
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
                            productIds: {
                                component: 'dialog/editing/goods-category-list',
                            }
                        },
                        '悬停特效': {
                            // hoverEffect: {
                            //     config: {
                            //         data: [
                            //             {
                            //                 src: './images/components/pro-effect-1.png',
                            //                 desc: '无效果',
                            //                 style: {
                            //                     width: '140px',
                            //                     height: '90px'
                            //                 }
                            //             }, {
                            //                 src: './images/components/pro-effect-2.png',
                            //                 desc: '出现边框',
                            //                 style: {
                            //                     width: '140px',
                            //                     height: '90px'
                            //                 }
                            //             }, {
                            //                 src: './images/components/pro-effect-3.png',
                            //                 desc: '出现放大器',
                            //                 style: {
                            //                     width: '140px',
                            //                     height: '90px'
                            //                 }
                            //             }, {
                            //                 src: './images/components/pro-effect-4.png',
                            //                 desc: '图片描述蒙层',
                            //                 style: {
                            //                     width: '140px',
                            //                     height: '90px'
                            //                 }
                            //             }, {
                            //                 src: './images/components/pro-effect-5.png',
                            //                 desc: '图片底部表述',
                            //                 style: {
                            //                     width: '140px',
                            //                     height: '90px'
                            //                 }
                            //             }, {
                            //                 src: './images/components/pro-effect-6.png',
                            //                 desc: '悬浮放大',
                            //                 style: {
                            //                     width: '140px',
                            //                     height: '90px'
                            //                 }
                            //             }, {
                            //                 src: './images/components/pro-effect-7.png',
                            //                 desc: '悬浮移动',
                            //                 style: {
                            //                     width: '140px',
                            //                     height: '90px'
                            //                 }
                            //             }
                            //         ],
                            //
                            //     }
                            //     ,
                            //     component: 'dialog/editing/pickrect'
                            // },
                            hoverEffect: {
                                config: {
                                    style: {
                                        width: '200px',
                                        height: '100px',
                                        border: '1px solid #cccccc'
                                    },
                                    options: [{
                                            channel: 1,
                                            src: './images/components/1.png',
                                            desc: '无效果',

                                        }, {
                                            channel: 1,
                                            src: './images/components/2.png',
                                            desc: '出现边框',
                                        }, {
                                            channel: 1,
                                            src: './images/components/7.png',
                                            desc: '悬浮移动',
                                        }, {
                                            channel: 1,
                                            src: './images/components/6.png',
                                            desc: '悬浮放大',
                                        }, {
                                            channel: 1,
                                            src: './images/components/3.png',
                                            desc: '出现放大器',
                                        }, {
                                            channel: 1,
                                            src: './images/components/4.png',
                                            desc: '图片描述蒙层',
                                        }, {
                                            channel: 1,
                                            src: './images/components/5.png',
                                            desc: '图片底部表述',
                                        },
                                        /*{
                                            channel: 2,
                                            src: './images/components/img_cpzs_zj_a.png',
                                            desc: '无效果',

                                        }, {
                                            channel: 2,
                                            src: './images/components/img_cpzs_zj_b.png',
                                            desc: '出现边框',
                                        }, {
                                            channel: 2,
                                            src: './images/components/img_cpzs_zj_c.png',
                                            desc: '悬浮移动',
                                        }, {
                                            channel: 2,
                                            src: './images/components/img_cpzs_zj_d.png',
                                            desc: '悬浮放大',
                                        }, {
                                            channel: 2,
                                            src: './images/components/img_cpzs_zj_e.png',
                                            desc: '出现放大器',
                                        }, {
                                            channel: 2,
                                            src: './images/components/img_cpzs_zj_f.png',
                                            desc: '图片描述蒙层',
                                        }*/
                                        // {
                                        //     src: './images/components/8.png',
                                        //     desc: '图片替换',
                                        // },
                                    ]
                                },

                                component: 'dialog/editing/style-list'
                            },


                            // effectBorder: {
                            //     config: {
                            //         text: '边框',
                            //         options: [
                            //             {
                            //                 text: "默认",
                            //                 label: 0,
                            //             }, {
                            //                 text: '自定义',
                            //                 label: 1,
                            //             },
                            //         ]
                            //     },
                            //     component: 'dialog/setting/radio'
                            // },
                            // effectColor: {
                            //     config: {
                            //         text: '颜色',
                            //     },
                            //     component: 'dialog/color-picker',
                            // },
                            // effectWidth: {
                            //     config: {
                            //         text: '宽度',
                            //     },
                            //     component: 'dialog/text',
                            // },
                            // effectStyle: {
                            //     config: {
                            //         text: '样式',
                            //         options: [
                            //             {
                            //                 text: "------",
                            //                 label: "0",
                            //             }, {
                            //                 text: '-------',
                            //                 label: "1",
                            //             },
                            //             {
                            //                 text: '-----',
                            //                 label: "2",
                            //             }
                            //         ]
                            //     },
                            //     component: 'dialog/setting/radio'
                            // },
                        },
                        '展示设置': {
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
            }
        },
        computed: {
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
                    app.loadB2CProduct({
                        productId: id,
                    }, (result) => {
                        if (result) {
                            this.products.push(result);
                        }
                    });
                })
            }
        },
        methods: {
            clickClumn(row) {
                // app.savePage();
                window.open("http://" + app.saveParams.domainUrl + "/product/" + row.id + ".html");
            },
            showDetail(p) {
                // app.savePage();
                window.open("http://" + app.saveParams.domainUrl + "/product/" + p.id + ".html");
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
            pictureClick() {},
            imgLoad($event) {},
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

            }
        },
        mounted() {
        },
    }
});