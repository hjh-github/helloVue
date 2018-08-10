define(['vueLoader'], () => {
    return {
        props: {
            model: {
                default: {
                    title: '文章列表',
                    type: app.channel=='2'?7:0, //0基础 1多列配图 2多行配图 3置顶配图
                    showPage: true,
                    categories: ['未分类', '新闻中心', '热门专题'],
                    articleStyle: {
                        'font-family': 'STSongti',
                        'font-size': '14px',
                        'color': '#444',
                        'font-weight': 'bold',
                    },
                    imageWidth: '120px',
                    imageHeight: '120px',
                    hoverEffect: 0,
                    style: {
                        width: app.channel==2?'100%':'1200px',
                        height: '470px',
                    },
                    articleSource: [], //0直接添加 1筛选条件
                    capacity: 3,
                }
            },
            settingConfig: {},
            editingConfig: {
                default: {
                    title: '编辑模块（文章列表）',
                    pages: {
                        '常规': {
                            title: {
                                config: {
                                    text: '组件标题'
                                },
                                component: 'dialog/text'
                            },
                            type: {
                                config: {
                                    text: '列表样式:',
                                    style: {
                                        width: '80px',
                                        height: '50px',
                                        border: '1px solid #cccccc',
                                    },
                                    options: [{
                                            channel: 1,
                                            image: 'images/components/img_wzlb_ys_a.png',
                                            text: '基础样式',
                                        }, {
                                            channel: 1,
                                            image: 'images/components/img_wzlb_ys_b.png',
                                            text: '多列配图',
                                        }, {
                                            channel: 1,
                                            image: 'images/components/img_wzlb_ys_c.png',
                                            text: '多行配图',
                                        }, {
                                            channel: 1,
                                            image: 'images/components/img_wzlb_ys_d.png',
                                            text: '置顶配图',
                                        }, {
                                            channel: 1,
                                            image: 'images/components/img_wzlb_ys_e.png',
                                            text: '时间轴',
                                        }, {
                                            channel: 1,
                                            image: 'images/components/img_wzlb_ys_f.png',
                                            text: '基础带简介',
                                        }, {
                                            channel: 1,
                                            image: 'images/components/img_wzlb_ys_g.png',
                                            text: '日期前置',
                                        },
                                        {
                                            channel: 2,
                                            image: 'images/components/img_wzlb_ys_a.png',
                                            text: '基础样式',
                                        }, {
                                            channel: 2,
                                            image: 'images/components/img_wzlb_ys_b.png',
                                            text: '多列配图',
                                        }, {
                                            channel: 2,
                                            image: 'images/components/img_wzlb_ys_c.png',
                                            text: '多行配图',
                                        }, {
                                            channel: 2,
                                            image: 'images/components/img_wzlb_ys_d.png',
                                            text: '置顶配图',
                                        }, {
                                            channel: 2,
                                            image: 'images/components/img_wzlb_ys_e.png',
                                            text: '时间轴',
                                        }, {
                                            channel: 2,
                                            image: 'images/components/img_wzlb_ys_f.png',
                                            text: '基础带简介',
                                        }, {
                                            channel: 2,
                                            image: 'images/components/img_wzlb_ys_g.png',
                                            text: '日期前置',
                                        }

                                    ]
                                },
                                component: 'dialog/editing/style-list',
                            },
                            articleSource: {
                                component: 'dialog/editing/articleSource',
                            },
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
                        '高级': {
                            imageWidth: {
                                config: {
                                    text: '图片宽度',
                                    unit: 'px',
                                },
                                component: 'dialog/text',
                            },
                            imageHeight: {
                                config: {
                                    text: '图片高度',
                                    unit: 'px',
                                },
                                component: 'dialog/text',
                            },
                            capacity: {
                                config: {
                                    text: '分页容量'
                                },
                                component: 'dialog/text',
                            },
                            showPage: {
                                component: 'dialog/editing/paginationEdit'
                            },
                            showMore: {
                                component: 'dialog/editing/pt-showmore'
                            }
                        },
                    },
                },
            }
        },
        data() {
            return {
                articles: [],
                currentPage: 0,
                loading: true,
            }
        },
        methods: {
            showDetail(id, allInfo) {
                app.changePage(app.toWebsessionStorage('ndId'), id, allInfo);
            },
            date(art) {
                return art.year + '/' + art.month + '/' + art.day;
            },
            paging(i) {
                let end = this.start + parseInt(this.model.capacity);
                // console.log(this.start,end,i);
                return this.start <= i && end > i;
            },
        },
        watch: {
            'model.articleSource' () {
                this.loading = true;
                this.articles = [];
                if (this.model.articleSource.length) {
                    this.model.articleSource.forEach(e => {
                        app.loadArticleSummary({
                            id: e,
                        }, (e) => {
                            this.loading = false;
                            this.articles.push(e);
                        })
                    });
                } else {
                    this.loading = false;
                }
            },
        },
        mounted() {
            var width=this.model.imageWidth;
            var height=this.model.imageHeight;
            this.model.imageWidth = app.mobileFit(width);
            this.model.imageHeight = app.mobileFit(height);
        },
        computed: {
            start() {
                return this.currentPage * this.model.capacity;
            },
            wid(){
                return this.model.type=='11'?'width:100%':'width:75%';
            },
        },
        components: {
            avs: {
                template: ' <div :style="{width:st,height:ht}"> <div style="width:100%;height:40px;line-height: 40px;"> ' +
                    ' <span style="float:left;color: #5ca6e2;font-size: 14px;white-space:nowrap;overflow: hidden;text-overflow: ellipsis" :style="wid2">{{art.name}}</span>' +
                    '<span v-if="model.type!= 6 && model.type!=13" style="float:right;font-size: 13px;color: #999;">{{art.createTime.slice(0,10)}}</span></div>' +
                    ' <div style="font-size: 13px;color: #999; height: 40px!important;" class="line-2-hide">{{art.summary}}</div></div>',
                props: ['art', 'st', 'model'],
                mounted() {},
                computed:{
                    wid2(){
                        if(this.model.type=='12' || this.model.type=='2' || this.model.type=='5'){
                            if(this.model.type=='12'){
                            }
                            return 'width:75%';
                        }else if(this.model.type=='13' || this.model.type=='6'){
                            return 'width:100%'
                        }else if(this.model.type=='9'){
                            return 'width:39%'
                        }
                    },
                    ht(){
                        if(this.model.type=='12'){
                            return '120px!important'
                        }else{
                            return 'auto'
                        }

                    }
                },
            }
        }
    };
});
