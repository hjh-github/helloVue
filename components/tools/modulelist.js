define(['vueLoader'], (loader) => {
    return {
        props: ['module', 'thisModule', 'moduleList', 'addModuleListIndex', 'icon-name'],
        data() {
            return {
                activeName: '1',
                thisModule: '组件',
                showElement: false,
                type: 'tplList',
                showWitch: '0',
                moduleCategoryList: [{
                        name: '组件分类'
                    },
                    // {name: '组件模块'}
                ],
                moduleConfig: [{
                        name: "元素组件",
                        show: true,
                        modules: [{
                                name: '文字',
                                component: 'font',
                                image: 'images/components/icon_wenzi.png',
                                code: ['SHOW', 'B2C', 'B2B2C', 'NEWS'],//区分展示版/商城版
                                status:['1','2'],//区分微站/PC
                            },
                            /*{
                                name: '产品详情',
                                component: 'productDetails',
                                image: 'images/components/icon_wenzi.png',
                                code: ['SHOW', 'B2C', 'B2B2C', 'NEWS'],
                                status:['1','2'],
                            },
                            {
                                name: '文章详情',
                                component: 'articleDetails',
                                image: 'images/components/icon_wenzi.png',
                                code: ['SHOW', 'B2C', 'B2B2C', 'NEWS'],
                                status:['1','2'],
                            },*/
                            {
                                name: '图片',
                                component: 'add-picture',
                                image: 'images/components/icon_tupian.png',
                                code: ['SHOW', 'B2C', 'B2B2C', 'NEWS'],
                                status:['1','2'],
                            },
                            {
                                name: '按钮',
                                component: 'button-type',
                                image: 'images/components/icon_anniu.png',
                                code: ['SHOW', 'B2C', 'B2B2C', 'NEWS'],
                                status:['1','2'],
                            },

                        ]
                    },
                    {
                        name: "内容组件",
                        show: true,
                        modules: [{
                                name: '图文组件',
                                component: 'article',
                                image: 'images/components/icon_tuwen.png',
                                code: ['SHOW', 'B2C', 'B2B2C', 'NEWS'],
                                status:['1','2'],
                            },
                            {
                                name: '列表多图',
                                component: 'imagelist',
                                image: 'images/components/icon_duotu.png',
                                code: ['SHOW', 'B2C', 'B2B2C', 'NEWS'],
                                status:['1','2'],
                            },
                            {
                                name: '轮播多图',
                                component: 'carousel',
                                image: 'images/components/icon_lunboduotu.png',
                                code: ['SHOW', 'B2C', 'B2B2C', 'NEWS'],
                                status:['1','2'],
                            },
                            {
                                name: '文章列表',
                                component: 'articlelist',
                                image: 'images/components/icon_wenzlb.png',
                                code: ['SHOW'],
                                status:['1','2'],
                            },
                            {
                                name: '新闻列表',
                                component: 'articlelistNews',
                                image: 'images/components/icon_wenzlb.png',
                                code: ['B2C', 'B2B2C', 'NEWS'],
                                status:['1','2'],
                            },
                            {
                                name:'分类目录',
                                component:'classify',
                                image:'images/components/icon_flml.png',
                                code: ['B2C', 'B2B2C', 'NEWS'],
                                status:['1','2'],
                            },
                            {
                                name: '商城分类',
                                component: 'mall-navi',
                                image: 'images/components/icon_cpdh.png',
                                code: ['B2C', 'B2B2C', 'NEWS'],
                                status:['1'],
                            },
                            {
                                name: '产品导航',
                                component: 'product-navi',
                                image: 'images/components/icon_cpdh.png',
                                code: ['SHOW'],
                                status:['1'],
                            },
                            {
                                name: '产品展示',
                                component: 'productList',
                                image: 'images/components/icon_cpzs.png',
                                code: ['SHOW'],
                                status:['1','2'],
                            },
                            {
                                name: '商品楼层',
                                component: 'floor',
                                image: 'images/components/icon_tupian.png',
                                code: ['B2B2C', 'NEWS'],
                                status:['1'],
                            },
                            {
                                name: '商城导航',
                                component: 'shop-head',
                                image: 'images/components/icon_tupian.png',
                                code: ['B2C', 'B2B2C', 'NEWS'],
                                status:['1'],
                            },
                            {
                                name: '商品列表',
                                component: 'productShowList',
                                image: 'images/components/icon_tupian.png',
                                code: ['B2C', 'B2B2C', 'NEWS'],
                                status:['1','2'],
                            },
                            {
                                name: '魔方导航',
                                component: 'magicNavi',
                                image: 'images/components/icon_tuwen.png',
                                code: ['SHOW', 'B2C', 'B2B2C', 'NEWS'],
                                status:['2'],
                            },
                        ],
                    },
                    {
                        name: "容器组件",
                        show: true,
                        modules: [{
                                name: '通栏',
                                type: 'group-container',
                                image: 'images/components/icon_tognlan.png',
                                code: ['SHOW', 'B2C', 'B2B2C', 'NEWS'],
                                status:['1','2'],
                            },
                            {
                                name: '标签',
                                component: 'tabs',
                                image: 'images/components/icon_biaoqian.png',
                                code: ['SHOW', 'B2C', 'B2B2C', 'NEWS'],
                                status:['1','2'],
                            },
                        ]
                    },
                    {
                        name: "功能组件",
                        show: false,
                        modules: [{
                                name: '在线地图',
                                component: 'map',
                                image: 'images/components/icon_zxdt.png',
                                code: ['SHOW', 'B2C', 'B2B2C', 'NEWS'],
                                status:['1','2'],
                            },
                            {
                                name: '购物车',
                                component: 'cart',
                                image: 'images/icon_gwc.png',
                                code: ['B2C', 'B2B2C', 'NEWS'],
                                status:['1'],
                            },
                            {
                                name: '产品搜索',
                                component: 'search',
                                image: 'images/components/icon_chanpss.png',
                                code: ['SHOW', 'B2C', 'B2B2C', 'NEWS'],
                                status:['1','2'],
                            },
                            {
                                name: '在线客服',
                                component: 'customer-service',
                                image: 'images/components/icon_kefu.png',
                                code: ['SHOW', 'B2C', 'B2B2C', 'NEWS'],
                                status:['1','2'],
                            },
                            {
                                name: '在线视频',
                                component: 'youku',
                                image: 'images/components/icon_zxsp.png',
                                code: ['SHOW', 'B2C', 'B2B2C', 'NEWS'],
                                status:['1','2'],
                            },
                            {
                                name: '留言板',
                                component: 'msg-board',
                                image: 'images/components/icon_zxly.png',
                                code: ['SHOW', 'B2C', 'B2B2C', 'NEWS'],
                                status:['1','2'],
                            },
                        ]
                    }

                ],
            }
        },
        created() {
            // console.log('module-list create');
        },
        methods: {
            //添加模板切换功能加显示对应的模块列表
            showModuleList: function (index, moduleName) {
                app.showModuleList(index, moduleName);
            },
            toggleIcon() {
                // 修改三个按钮的打开状态
                app.iconName = this.iconName = this.iconName == this.type ? "" : this.type;
                //加载内容的代码转移到此处
            },
            /* showClum(i){
             var show=this.moduleConfig[i].show;
             if(show){
             this.moduleConfig[i].show=false;
             }else{
             this.moduleConfig[i].show=true;
             }
             } */
        },
        components: {
            'palette-item': loader.load('tools/palette-item'),
        }
    }
});