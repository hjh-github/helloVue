define(['vueLoader'], (loader) => {
    return {
        props: {
            model: {
                default: {
                    style: {},
                    def: {},
                },
            },
            parent: {},
        },
        computed: {
            duration: {
                set(v) {
                    this.model.style['animation-duration'] = v;
                    this.parent.$forceUpdate();
                },
                get(){
                    return this.model.style['animation-duration'];
                }
                // get() {
                // let d = this.model.style['animate-duration'];
                // if (!d) {
                //     d = this.model.style['animate-duration'] = '0s';
                // }
                // return parseInt(d.substr(d.indexOf('s')));
                // },
            },

            delay: {
                set(v) {
                    this.model.style['animation-delay'] = v;

                    this.parent.$forceUpdate();
                },

                get(){
                    return this.model.style['animation-delay'];
                }
                // get() {
                //     let d = this.model.style['animate-delay'];
                //     if (!d) {
                //         d = this.model.style['animate-delay'] = '0s';
                //     }
                //     return parseInt(d.substr(d.indexOf('s')));
                // },
            },
        },

        methods: {
            playAnimate() {
                // this.model.animation = v;
                let animate = this.model.animation;
                this.model.animation = '';
                setTimeout(() => {
                    this.model.animation = animate;
                }, 100)
            },
            durationChange(v){
                this.model.style['animation-duration'] = v;
                this.$forceUpdate();
                this.parent.$forceUpdate();
            },
            delayChange(v){
                this.model.style['animation-delay'] = v;
                this.$forceUpdate();
                this.parent.$forceUpdate();
            }
            /* getAnimateDuration(){
             var durationObj = {
             "animation-duration": this.duration+'s',
             "-webkit-animation-duration": this.duration+'s',
             "-moz-animation-duration": this.duration+'s',
             "-ms-animation-duration": this.duration+'s',
             "-o-animation-duration": this.duration+'s',
             }
             this.model.style.cssText = this.getCssText(durationObj);
             },
             getAnimateDelay(){
             var delyObj = {
             "animation-delay": this.delay+'s',
             "-webkit-animation-delay": this.delay+'s',
             "-moz-animation-delay": this.delay+'s',
             "-ms-animation-delay": this.delay+'s',
             "-o-animation-delay": this.delay+'s',
             }
             this.model.style.cssText = this.getCssText(delyObj);
             },
             getCssText(obj){
             var text = [];
             for(var o in obj) {
             text.push(o + ":" + obj[o])
             }
             return text.join(';')
             } */
        },
        data() {
            return {
                value7: 0,
                value8: 0,
                duration: .3,
                delay: 0,
                animOpts: [{
                    label: '弹性',
                    options: [{
                        label: '弹出',
                        value: 'bounceIn'
                    },
                        {
                            label: '下方弹出',
                            value: 'bounceInDown'
                        },
                        {
                            label: '左方弹出',
                            value: 'bounceInLeft'
                        },
                        {
                            label: '右方弹出',
                            value: 'bounceInRight'
                        },
                        {
                            label: '上方弹出',
                            value: 'bounceInUp'
                        },
                    ]
                },

                    {
                        label: '渐显',
                        options: [

                            {
                                label: '渐显',
                                value: 'fadeIn',
                            },

                            {
                                label: '下方渐显',
                                value: 'fadeInDown',
                            },

                            {
                                label: '左方渐显',
                                value: 'fadeInLeft',
                            },

                            {
                                label: '右方渐显',
                                value: 'fadeInRight',
                            },

                            {
                                label: '上方渐显',
                                value: 'fadeInUp',
                            },
                        ]
                    },

                    {
                        label: '旋转',
                        options: [{
                            label: '旋转',
                            value: 'rotateIn',
                        },
                            {
                                label: '左下旋转',
                                value: 'rotateInDownLeft',
                            },
                            {
                                label: '右下旋转',
                                value: 'rotateInDownRight',
                            },
                            {
                                label: '左上旋转',
                                value: 'rotateInUpLeft',
                            },
                            {
                                label: '右上旋转',
                                value: 'rotateInUpRight',
                            },
                        ]
                    },


                    {
                        label: '滑动',
                        options: [{
                            label: '上滑进入',
                            value: 'slideInUp',
                        },
                            {
                                label: '下滑进入',
                                value: 'slideInDown',
                            },
                            {
                                label: '左滑进入',
                                value: 'slideInDown',
                            },
                            {
                                label: '右滑进入',
                                value: 'slideInRight',
                            },
                        ]
                    },


                    {
                        label: '其他',
                        options: [{
                            label: '滚动进入',
                            value: 'rollIn',
                        },
                            {
                                label: '不规则进入',
                                value: 'jackInTheBox',
                            },
                        ]
                    },


                ]
            }
        },
    };
});