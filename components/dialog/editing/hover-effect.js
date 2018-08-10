define(['vueLoader'], (loader) => {
    return {
        props: {
            'model': {}, 'key': {}, config: {
                default: {
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
                        {
                            src: './images/components/8.png',
                            desc: '图片替换',
                            style: {
                                width: '200px',
                                height: '100px',
                                border: '1px solid #cccccc',
                                'margin-left': '10px'
                            }
                        },
                    ]
                },

            }
        },
        data () {
            return {
                loading: false,
            };
        },
        components: {
            'pickrect': loader.load('dialog/editing/pickrect'),
        },
        mounted(){
            if (!this.model.addon) {
                this.model.addon = {}
            }
            if (this.model.addon.defBorder == null)
                this.model.addon.defBorder = true;
            if (!this.model.addon.borderStyle) {
                this.model.addon.borderStyle = {
                    'border-color': '#222',
                    'border-style': 'solid',
                    'border-width': '1px',
                };
            }

            if (this.model.addon.defBg == null)
                this.model.addon.defBg = true;

            if (this.model.addon.defBgText == null)
                this.model.addon.defBgText = true;

            if (!this.model.addon.bgColor) {
                this.model.addon.bgColor = '#000';
            }

            if (!this.model.addon.textColor) {
                this.model.addon.textColor = '#fff';
            }

            if (!this.model.addon.opacity) {
                this.model.addon.opacity = 0.5;
            }

            if (!this.model.addon.textAlign) {
                this.model.addon.textAlign = 'center';
            }
            if (!this.model.addon.fontSize) {
                this.model.addon.fontSize = '14px';
            }
            this.$forceUpdate();
        },
        watch: {
            'model.addon': {
                handler(v){
                },
                deep: true,
            },
            'model.addon.borderStyle'(){
            }
        },
        computed: {
            opacity: {
                get(){
                    return Math.round(this.model.addon.opacity * 100);
                },
                set(v){
                    this.model.addon.opacity = v / 100;
                },
            },

            getConfig(){

            },
            images(){
                let x = this.model.images;
                if (!x)
                    x = [this.model];
                return x;
            },
            imageList(){
                let x = model.images;
                if (!x)
                    x = [model];
                return x;
            },
            defBg: {
                get(){
                    return this.model.addon.defBg;
                },
                set(v){
                    this.model.addon.defBg;
                }
            },
            defBgText: {
                get(){
                    return this.model.addon.defBgText;
                },
                set(v){
                    this.model.addon.defBgText = v;
                },
            },
            bgColor: {
                get(){
                    return this.model.addon.bgColor;
                },
                set(v){
                    this.model.addon.bgColor = v;
                }
            },
            textColor: {
                get(){
                    return this.model.addon.textColor;
                },
                set(v){
                    this.model.addon.textColor = v;
                }
            },

        },
        methods: {
            colorChanged(m, k){
                this.$forceUpdate();
            },
            hoverSrc(m){
                let x = m.hsrc;
                if (!x)
                    x = 'images/components/default-img.png';
                return x;
            },
            handleEdit(scope, i, m){
                let self = this;
                loader.loadImageDialog({
                    model: {},
                    callback(model) {
                        m.hsrc = model.src;
                        scope._self.$forceUpdate();
                    },
                    selectChanged(selected, item, index) {
                    },
                    multiselect: false,
                });
            }
        }
    }
});