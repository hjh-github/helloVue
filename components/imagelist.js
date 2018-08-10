define(['vueLoader'], (loader) => {
    return {
        components: {
            himg: loader.load('widget/hover-image'),
        },
        props: {
            model: {
                default: {
                    type: app.channel =='2'?4:0,
                    images: [],
                    imageContainerStyle: {
                        width: app.channel=='2'?'175px':'200px',
                        height: '150px',
                        'margin-left': app.channel=='2'?'5px':'20px',
                        'margin-top': app.channel=='2'?'5px':'20px',
                    },
                    imageStyle: {
                        width: '100%',
                        height: '100%',
                    },
                    imageSetting: {
                        descVisible: true,
                        clickEffect: 0, //0无效果 1幻灯片 2图片链接
                        open: 1, //0当前窗口 1新窗口
                    },
                    style: {
                        width: app.channel == 2 ? '100%' : '928px',
                        height: '500px',
                    },
                    title: '列表多图',
                    subtitle: '副标题',
                    hoverEffect: 1,
                    sliderEffect: 0,
                    showPage: false,
                    capacity: 4,
                    animation: 'fadeIn',
                    animateSetting: {
                        'animation-duration': '2s',
                        'animation-delay': '1s',
                    },
                    'z-index': '11',
                },
            },

            editingConfig: {
                default: {
                    title: '添加模块(列表多图)',
                    pages: {

                        '常规': {
                            images: {
                                component: 'dialog/editing/imagePanel',
                            },

                        },
                        '组件样式': {
                            type: {
                                config: {
                                    style: {
                                        width: '200px',
                                        height: '100px'
                                    },
                                    options: [{
                                        channel: 1,
                                        image: './images/components/imgs-sty1.png',
                                        text: '多行排布',
                                    }, {
                                        channel: 1,
                                        image: './images/components/imgs-sty2.png',
                                        text: '单行排布',
                                    }, {
                                        channel: 1,
                                        image: './images/components/imgs-sty3.gif',
                                        text: '左滚动排布',
                                    }, {
                                        channel: 1,
                                        image: './images/components/imgs-sty4.gif',
                                        text: '右滚动排布',
                                    }, {
                                        channel: 2,
                                        image: './images/components/mobile-imglist-1.png',
                                        text: '多行排布',
                                    }],
                                },
                                component: 'dialog/editing/style-list',
                            },
                        },
                        '悬停特效': {
                            hoverEffect: {
                                component: 'dialog/editing/hover-effect',
                            }
                        },
                        // '幻灯片': {
                        //     sliderEffect: {
                        //         config: [
                        //             {
                        //                 src: '',
                        //                 desc: '1',
                        //             },
                        //             {
                        //                 src: '',
                        //                 desc: '2',
                        //             },
                        //         ],
                        //         component: 'dialog/editing/pickrect'
                        //     },
                        //     check(model){
                        //         return model.imageSetting.clickEffect == 1;
                        //     }
                        // },
                        '高级': {
                            showPage: {
                                component: 'dialog/editing/paginationEdit'
                            },
                            imageSetting: {
                                component: 'dialog/editing/imageSetting',
                            },
                            imageContainerStyle: {
                                config: {
                                    text: '图片大小',
                                },
                                component: 'dialog/editing/size',
                            },
                        }
                    }
                },
            },
            settingConfig: {},
        },
        data() {
            return {
                currentPage: 0,
                //用于hover效果class，需要补全
                config: ['', '', '', '', '', '', ''],
                imgbox: {
                    width: '',
                    height: '',
                    overflow: 'hidden',
                    position: 'absolute',
                    'margin-left': '0px',
                },
                timeId: 0,
            }
        },
        computed: {
            carouselPosition(){
                return this.model.showPage?'outside':'none';
            },
            imageContainerStyle() {
                let x= {
                    'width': this.model.imageContainerStyle.width,
                    'height': this.model.imageContainerStyle.height,
                    'margin-left': this.model.imageContainerStyle['margin-left'],
                    'margin-top': this.model.imageContainerStyle['margin-top'],
                };
                return x;
            },
            showDesc() {
                return (this.model.hoverEffect < 5) && this.model.imageSetting.descVisible;
            },
            swiperId() {
                return this._uid + "swiper";
            },
            length() {
                return Math.ceil(this.model.images.length / this.model.capacity);
            },
            clickEffect() {
                return this.model.imageSetting.clickEffect;
            }
        },
        mounted() {
            let width = this.model.imageContainerStyle.width;
            let height = this.model.imageContainerStyle.height;
            let marginLeft = this.model.imageContainerStyle['margin-left'];
            let marginTop = this.model.imageContainerStyle['margin-top'];
            this.model.imageContainerStyle.width = app.mobileFit(width);
            this.model.imageContainerStyle.height = app.mobileFit(height);
            this.model.imageContainerStyle['margin-left'] = app.mobileFit(marginLeft);
            this.model.imageContainerStyle['margin-top'] = app.mobileFit(marginTop);
        },
        watch: {
            'model':{
              handler:function () {
              },
                deep:true
            },
            'model.hoverEffect'() {
                // if (this.model.hoverEffect == 1) {
                //     this.model.imageContainerStyle = {
                //         width: '202px',
                //         height: '152px',
                //         'margin-left':this.model.imageContainerStyle['margin-left'],
                //         'margin-top':this.model.imageContainerStyle['margin-top']
                //     }
                // } else {
                //     this.model.imageContainerStyle = {
                //         width: '200px',
                //         height: '150px',
                //         'margin-left':this.model.imageContainerStyle['margin-left'],
                //         'margin-top':this.model.imageContainerStyle['margin-top']
                //     }
                // }
            },
            'model.type'() {
                if (this.model.type == 2||this.model.type==3||this.model.type==5||this.model.type==6) {
                    this.carousel();
                }else{
                    clearInterval(this.timeId)
                }
            }
        },
        methods: {
            clickImg(im, index) {
                if (this.clickEffect == 1) {
                    //幻灯片
                    lantern.open(this.model, index);
                    return true;
                }
                //  else if (this.model.imageSetting.clickEffect == 2) {
                //     if (this.model.imageSetting.open == 1) {
                //         window.location.href = im.src;
                //     } else if (this.model.imageSetting.open == 0) {
                //         window.open(im.src);
                //     }
                // }
                return true;
            },
            getLink(im) {
                let x = this.clickEffect == 1 ? 'javascript:void(0);' : im.link;
                return x;
            },
            paging(i) {
                let start = this.currentPage * parseInt(this.model.capacity);
                let end = start + parseInt(this.model.capacity);
                return start <= i && end > i;
            },
            p(i, n) {
                // i*model.capacity<n && n<(i+1)*model.capacity
                let start = (i - 1) * parseInt(this.model.capacity);
                let end = start + parseInt(this.model.capacity);
                return start <= n && end > n;
            },
            carousel() {
                setTimeout(()=>{
                    clearInterval(this.timeId);
                    let w=this.model.imageContainerStyle.width;
                    let l=this.model.imageContainerStyle['margin-left'];
                    let t=this.model.imageContainerStyle['margin-top'];
                    if(w.indexOf('rem')>-1){
                        w=w.replace(/rem/, '')*16;
                    }
                    if(l.indexOf('rem')>-1){
                        l=l.replace(/rem/, '')*16;
                    }
                    if(t.indexOf('rem')>-1){
                        t=t.replace(/rem/, '')*16;
                    }

                    let width=parseInt(w)
                    let mLeft=parseInt(l)
                    let length=this.model.images.length
                    let mTop=parseInt(t)

                    this.imgbox.width = ( width+ mLeft) * length * 2 + "px";
                    this.imgbox.height = (width +mTop ) + "px";
                    let imgbox = this.$refs.imgbox;
                    let i = 0;
                    if(this.model.type==3 || this.model.type==6)  i=-( width+ mLeft) * length
                    this.timeId = setInterval(() => {
                        if(this.model.type==2 || this.model.type==5){
                        i--;
                        imgbox.style['margin-left'] = i + 'px';
                        if(-parseInt(this.imgbox.width)/2==parseInt(imgbox.style['margin-left'])) i=0;
                        } else if(this.model.type==3 || this.model.type==6){
                            i++;
                            imgbox.style['margin-left'] = i + 'px';
                            if(parseInt(imgbox.style['margin-left'])==0)  i=-( width+ mLeft) * length
                        }
                    }, 20);
                },100)
            }
        },
    }
});