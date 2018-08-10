define([], () => {
    return {
        props: {
            model: {
                default: {
                    title: '在线视频',
                    url: '//vjs.zencdn.net/v/oceans.mp4',
                    options: {
                        width: 350,
                        height: 350,
                    },
                    style: {
                        width: '300px',
                        height: '300px',
                    },
                    titleBarStyle: {
                        'background-color': '#2C88AA',
                        'background-image': '',
                        height: 50,
                        show: true,
                        // 'border-bottom': '',
                        // 'border-color': '',
                        useDefault: true,
                    },
                    titleStyle: {
                        position: 0, //0-左 1-居中 2-右
                        color: '#fff',
                        'font-size': 16,
                        'font-family': '宋体',
                        'font-weight': 'normal',
                        'font-style': 'normal',
                        'text-decoration': 'normal',
                        useDefault: true,
                    },
                    backgroundStyle: {
                        useDefault: true,
                        'background-color': '#fff',
                        'background-image': '',
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
                            options: {
                                config: {
                                    text: '视频宽高',
                                },
                                component: 'dialog/editing/size',
                            },
                            url: {
                                config: {
                                    text: '视频地址'
                                },
                                component: 'dialog/text',
                            },
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
            }
        },
        watch: {
            'model' () {
                if (this.player) {
                    this.player.src(this.model.url);
                    this.player.load(this.model.url);
                    this.player.width(this.model.options.width - 50);
                    this.player.width(this.model.options.height - 50);
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