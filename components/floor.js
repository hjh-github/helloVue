define(['vueLoader'], () => {
    return {
        props: {
            model: {
                default: {
                    floorListName:'',
                    floorListId:'',
                    classList:[],
                    selectClass:'',
                    goodsList:[],
                    masterImage:'',
                    masterLinkUrl:'',
                    imgSrc:'',
                    currentPage: 0,
                    title: '楼层组件',
                    titleColor:'#234aaa',
                    theme:'#999999',
                    type: 0,
                    hoverEffect: 0,
                    floorListIds: [],
                    visible:true,
                    style: {
                        width: '1200px',
                    },
                }
            },
            settingConfig: {},
            editingConfig: {
                default: {
                    title: '编辑模块（楼层组件）',
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
                                    text: '展示样式:',
                                    style: {
                                        width: '80px',
                                        height: '50px',
                                        border: '1px solid #cccccc',
                                    },
                                    options: [
                                        {
                                            channel: 1,
                                            image: 'images/components/img_wzlb_ys_a.png',
                                            text: '基础样式',
                                        },
                                        {
                                            channel: 2,
                                            image: 'images/components/img_wzlb_ys_a.png',
                                            text: '基础样式',
                                        }
                                    ]
                                },
                                component: 'dialog/editing/style-list',
                            },
                            floorListName: {
                                component: 'dialog/editing/floorList',
                            },
                        },

                        /*'悬停特效': {

                            hoverEffect: {
                                config: {
                                    style: {
                                        width: '200px',
                                        height: '100px',
                                        border: '1px solid #cccccc'
                                    },
                                    options: [
                                        {
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
                                        {
                                            channel: 2,
                                            src: './images/components/1.png',
                                            desc: '无效果',

                                        }, {
                                            channel: 2,
                                            src: './images/components/2.png',
                                            desc: '出现边框',
                                        }, {
                                            channel: 2,
                                            src: './images/components/7.png',
                                            desc: '悬浮移动',
                                        }, {
                                            channel: 2,
                                            src: './images/components/6.png',
                                            desc: '悬浮放大',
                                        }, {
                                            channel: 2,
                                            src: './images/components/3.png',
                                            desc: '出现放大器',
                                        }, {
                                            channel: 2,
                                            src: './images/components/4.png',
                                            desc: '图片描述蒙层',
                                        }, {
                                            channel: 2,
                                            src: './images/components/5.png',
                                            desc: '图片底部表述',
                                        }
                                    ]
                                }
                                ,

                                component: 'dialog/editing/style-list'
                            }
                        },*/
                        '高级': {
                            visible: {
                                config: {
                                    text: '楼层导航'
                                },
                                component: 'dialog/editing/pt-visible'
                            },
                            titleColor:{
                                config:{
                                    text:"标题颜色"
                                },
                                component:'dialog/color-picker'
                            },
                            theme:{
                                config:{
                                    text:"边框颜色"
                                },
                                component:'dialog/color-picker'
                            },
                            // imageWidth: {
                            //     config: {
                            //         text: '图片宽度',
                            //         unit: 'px',
                            //     },
                            //     component: 'dialog/text',
                            // },
                            // imageHeight: {
                            //     config: {
                            //         text: '图片高度',
                            //         unit: 'px',
                            //     },
                            //     component: 'dialog/text',
                            // },
                            // capacity: {
                            //     config: {
                            //         text: '分页容量'
                            //     },
                            //     component: 'dialog/text',
                            // },
                            // showMore: {
                            //     component: 'dialog/editing/pt-showmore'
                            // },
                            
                        }
                        ,
                    },
                },
            }
        },
        data(){
            return {

            }
        },
        created(){

        },
        watch: {
            'model.floorListId'(){
                var model = this.model;
                var floorListid = model.floorListId;
                var classList=[];
                for(var i =0;i<model.floorListIds.length;i++){
                    if(floorListid === model.floorListIds[i].id){
                        model.floorListName = model.floorListIds[i].name;
                        model.masterImage = model.floorListIds[i].masterImage;
                        model.masterLinkUrl = model.floorListIds[i].masterLinkUrl;
                        app.loadFloorList({
                            floorId:floorListid,
                        }, (art) => {
                            if(art.length<6){
                                for(var i = 0;i<art.length;i++){
                                    classList.push(art[i]);
                                    model.selectClass = art[0].id;
                                }
                            }else{
                                for(var i = 0;i<6;i++){
                                    classList.push(art[i]);
                                    model.selectClass = art[0].id;
                                }
                            }
                        });
                    }
                }
                model.classList = classList;
            },
            'model.selectClass'(){
                var goodsList = [];
                var id = this.model.selectClass;
                app.loadGoodsList({
                    floorClassId:id,
                },(arr)=>{
                    if(arr.length<8){
                        for(var i = 0;i<arr.length;i++){
                            goodsList.push(arr[i]);
                        }
                    }else{
                        for(var i = 0;i<8;i++){
                            goodsList.push(arr[i]);
                        }
                    }
                    this.model.goodsList = goodsList;
                });
            },
        },
        mounted(){

        },
        methods: {

        },

    };
});