define(['vueLoader'], (loader) => {
    return {
        mounted(){
            $.get('url').then((data) => {
                this.model.style = data.style;
            })
        },
        data(){
            return {
                visible: true,
                name: '123',
            }
        },
        methods: {
            handleClick(){
                this.visible = !this.visible;
            }
        },
        computed: {
            name1: {
                get(){
                    return this.name + '1';
                },
                set(e){
                    this.name = e.substr(e.length - 2);
                },
            }
        },
        props: {
            model: {
                default: {
                    name: 'A',
                    desc: 'B',
                    style: {
                        width: '400px',
                        height: '300px',
                        opacity: 1,
                        'border-radius': '0px',
                        // 'margin-top': '1px',
                        // 'margin-bottom': '1px',
                        // 'margin-left': '1px',
                        // 'margin-right': '1px',
                        // 'padding-top': '10px',
                        // 'padding-bottom': '10px',
                        // 'padding-left': '10px',
                        // 'padding-right': '10px',
                        'background-color': '#fff',
                        'background-image': '',
                        'border-style': 'solid',
                        'border-color': 'black',
                        'border-width': '1px',
                        'border-bottom': 'medium none',
                    },
                    titleVisible: true,
                    title: '新组件',  
                }
            },
            settingConfig: ['常规', '标题', '动画', '样式'],
            editingConfig: {
                default: {
                    title: '新组件创建',
                    pages: {
                        '常规': {
                            name: {
                                config: {
                                    text: '名称'
                                },
                                component: 'dialog/text',
                            },
                            desc: {
                                config: {
                                    text: '描述'
                                },
                                component: 'dialog/text',
                            }
                        }
                    },
                }

            }
        }

    }

});