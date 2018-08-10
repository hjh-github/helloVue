define(['vueLoader'], (loader) => {
    return {
        props: {
            model: {
                default: {
                    title: '魔方导航',
                    style: {
                        width: '200px',
                        height: '100px',
                    },
                    subtitle: '',
                    'background-color': '#123',
                    color1: '#FFF',
                    color2: '#ccc',
                    type: 0,
                    cates: [],
                    mgNavList: [
                        {
                            name: '入住商家',
                            src: 'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-1.png',
                            'link': {
                                type: 0, //0-无 //1-本地 2-自定义
                                local: '',
                                open: '_blank',
                                net: '',
                            },
                            isShow: true,
                            isUpdate: false,
                        },
                        {
                            name: '品牌白酒',
                            src: 'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-2.png',
                            'link': {
                                type: 0, //0-无 //1-本地 2-自定义
                                local: '',
                                open: '_blank',
                                net: '',
                            },
                            isShow: true,
                            isUpdate: false,
                        },
                        {
                            name: '热门推荐',
                            src: 'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-3.png',
                            'link': {
                                type: 0, //0-无 //1-本地 2-自定义
                                local: '',
                                open: '_blank',
                                net: '',
                            },
                            isShow: true,
                            isUpdate: false,
                        },
                        {
                            name: '精品热卖',
                            src: 'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-4.png',
                            'link': {
                                type: 0, //0-无 //1-本地 2-自定义
                                local: '',
                                open: '_blank',
                                net: '',
                            },
                            isShow: true,
                            isUpdate: false,
                        },
                        {
                            name: '新闻动态',
                            src: 'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-5.png',
                            'link': {
                                type: 0, //0-无 //1-本地 2-自定义
                                local: '',
                                open: '_blank',
                                net: '',
                            },
                            isShow: true,
                            isUpdate: false,
                        },
                        {
                            name: '特色专题',
                            src: 'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-6.png',
                            'link': {
                                type: 0, //0-无 //1-本地 2-自定义
                                local: '',
                                open: '_blank',
                                net: '',
                            },
                            isShow: true,
                            isUpdate: false,
                        },
                        {
                            name: '行业文化',
                            src: 'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-7.png',
                            'link': {
                                type: 0, //0-无 //1-本地 2-自定义
                                local: '',
                                open: '_blank',
                                net: '',
                            },
                            isShow: true,
                            isUpdate: false,
                        },
                        {
                            name: '行业资讯',
                            src: 'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-8.png',
                            'link': {
                                type: 0, //0-无 //1-本地 2-自定义
                                local: '',
                                open: '_blank',
                                net: '',
                            },
                            isShow: true,
                            isUpdate: false,
                        },
                        {
                            name: '招商加盟',
                            src: 'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-9.png',
                            'link': {
                                type: 0, //0-无 //1-本地 2-自定义
                                local: '',
                                open: '_blank',
                                net: '',
                            },
                            isShow: true,
                            isUpdate: false,
                        },
                        {
                            name: '展会信息',
                            src: 'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-10.png',
                            'link': {
                                type: 0, //0-无 //1-本地 2-自定义
                                local: '',
                                open: '_blank',
                                net: '',
                            },
                            isShow: true,
                            isUpdate: false,
                        },
                    ],
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
                        '样式': {
                            type: {
                                config: {},
                                component: 'dialog/editing/MN-style',
                            },
                        },
                        '链接列表': {
                            type: {
                                config: {},
                                component: 'dialog/editing/mgnavList',
                            },
                        },
                    },
                },

            },
            settingConfig: {
                default: {
                    //   visible: false,
                }
            },
        },
        data() {
            return {
                navlist:[]
            };
        },
        watch:{
            'model.mgNavList'(v){
                this.navlist = v;
            }
        },
        methods: {

        },
        mounted(){
            this.navlist = this.model.mgNavList;
        },
    }
});