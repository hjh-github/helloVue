define(['vueLoader'], (loader) => {
    return {
        props: ['model'],
        data() {
            return {
                active: 0,
                visible: false,
                model: {
                    pages: {}
                },
                config: {},
                flag: false,
                starX: '',
                starY: ''
            }
        },
        mounted() {
            console.log('对话框挂载');
            setTimeout(() => {
                $('#dialog').draggable({
                    handle: '#DialogTitle'
                });
            });
        },
        computed: {
            styleConfig() {
                let x = this.config.style;
                if (!x)
                    x = {
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%'
                    };
                return x;
            },
        },
        methods: {
            open(callback) {
                this.callback = callback;
                //setTimeout可以保证在mounted后再行渲染

                this.visible = true;
            },
            setModel(model) {
                this.model = JSON.parse(JSON.stringify(model));
            },
            ok() {
                this.callback(JSON.parse(JSON.stringify(this.model)));
                this.visible = false;

            },
            cancel(event) {
                this.visible = false;
                event.stopPropagation();
            },
            /**
             * 根据配置单构建页面
             * @param config
             */
            setConfig(config) {
                this.config = config;
                setTimeout(() => {
                    for (let k in this.config.pages) {
                        let contentVue = this.$refs[k];
                        $(contentVue).empty();
                        let c = config.pages[k];
                        let p;
                        for (let ck in c) {
                            //加载内容vue
                            if (c[ck].component) {
                                if (p)
                                    p = p.then(() => {
                                        return loader.createVue(c[ck].component, v => {
                                            // v.$props.config = c[ck].config;
                                            // v.$props.model = this.model;
                                            // v.$props.key = ck;
                                            // loader.append(contentVue, v);
                                            this.append(v, c, ck, contentVue);
                                        });
                                    });
                                else
                                    p = loader.createVue(c[ck].component, v => {
                                        this.append(v, c, ck, contentVue);
                                    })
                            } else {
                                if (ck != 'check')
                                    throw ck + ' 没有定义component'
                            }
                        }
                    }
                });
            },
            append(v, c, ck, contentVue) {
                if (v.$props == null) {
                    throw '组件' + c[ck].component + '必须定义props'
                }
                if (c[ck].config)
                    v.$props.config = c[ck].config;
                v.$props.model = this.model;
                v.$props.key = ck;
                loader.append(contentVue, v);
            },
        }
    }
});