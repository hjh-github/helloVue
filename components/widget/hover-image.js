define([], () => {
    return {
        props: {
            //如果是string，则认为是src，如果是object则认为是{src:'',hsrc:''，}

            'src': {},
            'hoverEffect': {},
            'background-color': {
                default: '#000'
            },
            'style': {},
            'color': {
                default: '#FFF'
            },
            opacity: {
                default: 0.5,
            },
            desc: {},
            delay: {
                default: 200,
            },
            link: {},
            'addon': {},
        },
        data() {
            return {
                hover: false,
                LH: '',
            }
        },
        computed: {
            imageSrc(){
                if (typeof(this.src) == 'object') {
                    if (this.hover && this.src.hsrc && this.hoverEffect == 7)
                        return this.src.hsrc;
                    return this.src.src;
                }
                return this.src;
            },
            //图片链接
            imageHref() {
                if (this.link) {
                    switch (this.link.type) {
                        case 1:
                            return this.link.local;
                        case 2:
                            return this.link.net;
                    }
                }

                return 'javascript:void(0);';
            },
            //跳转方式
            jumpMod() {
                if (this.link) {
                    return this.link.open;
                }
            },
            maskStyle() {

                if (!this.addon) {
                    this.addon = {}
                }
                if (!this.addon.bgColor) {
                    this.addon.bgColor = '#000';
                }

                if (!this.addon.textColor) {
                    this.addon.textColor = '#fff';
                }

                if (!this.addon.opacity) {
                    this.addon.opacity = 0.5;
                }

                if (!this.addon.textAlign) {
                    this.addon.textAlign = 'center';
                }
                if (!this.addon.fontSize) {
                    this.addon.fontSize = '14px';
                }

                return {
                    'background-color': this.addon.defBg ? '#000' : this.addon.bgColor,
                    'color': this.addon.defBgText ? '#fff' : this.addon.textColor,
                    opacity: this.addon.defBg ? .5 : this.addon.opacity,
                    'text-align': this.addon.defBgText ? 'center' : this.addon.textAlign,
                    'font-size': this.addon.defBgText ? '14px' : this.addon.fontSize,
                }
            },
            //悬浮时图片的效果
            imageStyle() {
                let result = this.addon ? {
                    'border-radius': this.addon['border-radius'],
                } : {};
                switch (this.hoverEffect) {
                    case 1:
                        if (!this.addon) {
                            this.addon = {}
                        }
                        if (!this.addon.borderStyle) {
                            this.addon.borderStyle = {
                                'border-color': '#ccc',
                                'border-style': 'solid',
                                'border-width': '1px',
                            }
                        }
                        //边框效果
                        if (this.addon.defBorder) {
                            result.border = this.hover ? '1px solid #CCC' : '';
                        } else
                            result = {
                                'border-color': this.hover ? this.addon.borderStyle['border-color'] : '',
                                'border-style': this.hover ? this.addon.borderStyle['border-style'] : '',
                                'border-width': this.hover ? this.addon.borderStyle['border-width'] : '',
                            };
                        break;
                    case 2:
                        result.transform = this.hover ? 'translateX(20px)' : '';
                        break;
                    case 3:
                        result.transform = this.hover ? 'scale(1.4)' : '';
                        break;

                }


                return result;
            },
        },
        methods: {
            hoverStart() {
                this.st = setTimeout(() => {
                    this.hover = true;
                }, this.delay);
            },
            hoverEnd() {
                if (this.st)
                    clearTimeout(this.st);
                this.hover = false;
            },
        },
        watch: {
            'hover': {
                handler: function (val, oldVal) {
                    if (this.hover == true) {
                        if (this.hoverEffect == 1) {
                            this.$refs.hoverImg.style.width = 'calc(100% - 2px)'
                            this.$refs.hoverImg.style.height = 'calc(100% - 2px)'
                        } else if (this.hoverEffect == 5) {
                            this.LH = this.src.style.height
                        }
                    }
                    if (this.hover == false) {
                        if (this.hoverEffect == 1) {
                            this.$refs.hoverImg.style.width = '100%'
                            this.$refs.hoverImg.style.height = '100%'
                        }
                    }
                },
                deep: true
            },
            'src': {
                handler: function () {
                    this.desc = this.src.imgInput != undefined ? this.src.imgInput : this.desc
                },
                deep: true
            }
        },
        mounted() {
        }
    }
});