define([], () => {
    return {
        props: {
            model: {
                default: {
                    title: '在线视频',
                    subtitle: '副标题',
                    src: '',
                    titleBarStyle: {
                        'background-image': '',
                        height: 50,
                        show: true,
                        useDefault: true,
                    },
                    style: {},
                    titleStyle: {
                        //     position: 0, //0-左 1-居中 2-右
                        //     color: '#fff',
                        //     'font-size': 16,
                        //     'font-family': '宋体',
                        //     'font-weight': 'normal',
                        //     'font-style': 'normal',
                        //     'text-decoration': 'normal',
                        //     useDefault: true,
                    },
                    backgroundStyle: {
                        //     useDefault: true,
                        //     'background-color': '#fff',
                        //     'background-image': '',
                    },
                },
            },
            editingConfig: {
                default: {
                    title: '在线视频',
                    pages: {
                        '常规': {
                            title: {
                                config: {
                                    text: '视频标题',
                                },
                                component: 'dialog/text',
                            },
                            style: {
                                config: {
                                    text: '视频宽高',
                                },
                                component: 'dialog/editing/size',
                            },
                            src: {
                                config: {
                                    text: '视频地址'
                                },
                                component: 'dialog/text',
                            },
                            helper: {
                                component: 'dialog/youkuHelper',
                            }
                        }
                    }
                }
            },
            settingConfig: {},
        },
        data() {
            return {
                player: null,
            };
        },
        computed: {
            uid() {
                return 'video' + this._uid;
            },
            src(){
                var src = this.model.src;
                if (src.endsWith('/v.swf')) {
                    src = "http://player.youku.com/embed/" + src.substring("http://player.youku.com/player.php/sid/".length, src.indexOf('/v.swf'));
                }
                return src;
            },
            style(){
                return {
                    width: '100%',
                    height: 'calc(100% -' + ' ' + this.model.titleBarStyle.height + 'px )',
                    position: 'relative',
                }
            }
        },
        watch: {
            'model' () {
                if (this.player) {
                    this.player.src(this.model.url);
                    this.player.load(this.model.url);
                    // this.player.width(this.model.options.width - 50);
                    // this.player.width(this.model.options.height - 50);
                }
            },
        },
        mounted() {
            this.player = videojs(this.uid, this.model.options, () => {
                this.player.src(this.model.url);
                this.player.load(this.model.url);
                this.player.play();
            });
        }
    }
});