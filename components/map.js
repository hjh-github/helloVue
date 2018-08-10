define(['vueLoader'], (loader) => {

    return {
        props: {
            model: {
                default: {
                    title: '在线地图',
                    style: {
                        width: '100%',
                        height: '460px',
                    },
                    titleBarStyle: {
                        'background-color': '#2C88AA',
                        'background-image': '',
                        height: 40,
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
                    paddingStyle: {
                        useDefault: true,
                        'padding-top': 20,
                        'padding-bottom': 20,
                        'padding-left': 20,
                        'padding-right': 20,
                    },
                    mapStyle: {
                        width: '1160px',
                        height: '350px',
                        left: 0,
                        top: 0,
                        // border: '1px solid #555','
                    },
                    position: [1, 1],
                    showDesc: true,
                    desc: `<p>联系方式:</p>
                            <p>地址:</p>`,
                    address: '广州',
                    marker: {
                        point: null,
                        desc: '',
                    },
                }
            },
            editingConfig: {
                default: {
                    title: '组件编辑（在线地图）',
                    pages: {
                        '常规': {
                            title: {
                                config: {
                                    text: '组件标题',
                                },
                                component: 'dialog/text',
                            },
                            mapStyle: {
                                config: {
                                    text: '地图尺寸',
                                },
                                component: 'dialog/editing/size'
                            },
                            marker: {
                                config: {
                                    style: {
                                        width: '100%',
                                        height: '400px',
                                    }
                                },
                                component: 'dialog/editing/mapEdit'
                            },
                        },
                        '高级': {
                            showDesc: {
                                config: {
                                    text: '地图详情',
                                    options: [{
                                        text: '显示',
                                        label: true,
                                    }, {
                                        text: '隐藏',
                                        label: false,
                                    }]
                                },
                                component: 'dialog/setting/radio'

                            },
                            desc: {
                                config: {
                                    visible: 'showDesc',
                                },
                                component: 'dialog/editing/ue-editor'
                            }
                        }
                    }
                }
            },
            settingConfig: {

            }
        },
        data() {
            return {}
        },
        components: {
            bmap: loader.load('dialog/bmap'),
        },
        mounted(){
            this.model.desc=app.recoverSymbol(this.model.desc)
        }
    }
});