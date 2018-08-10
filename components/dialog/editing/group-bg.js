define(['vueLoader'], (loader) => {
    return {
        data() {
            return {
                radio: '1',
                loading: false,
            };
        },
        props: {
            model: {
                type: Object,
                default: {
                    image: {}
                },
            },
            key: {
                default: 'canvasStyle',
            },
            config: {
                type: Object,
                default: {}
            }
        },
        mounted() {
        },
        components: {},
        computed: {
            canvasStyle() {
                let cs = this.model.canvasStyle;
                return {
                    'background-image': 'url("' + cs.src + '")',
                    'background-repeat': cs.repeat,
                    'background-size': cs.size,
                    'background-position': cs.position,
                }
            },
            def: {
                get() {
                    return this.model.config.def;
                },
                set(v) {
                    this.model.config.def = v;
                }
            },
            bgStyle: {
                get() {
                    return this.model.config.bgStyle;
                },
                set(v) {
                    this.model.config.bgStyle = v;
                }
            },
            color: {
                get() {
                    return app.recoverSymbol(this.model.canvasStyle.color);
                },
                set(v) {
                    this.model.canvasStyle.color = v;
                }
            }
        },
        methods: {
            selectImage() {
                let self = this;
                loader.loadImageDialog({
                    model: {
                        src: self.model[self.key].src,
                    },
                    callback(model) {
                        // self.selected.src = model.src;
                        self.loading = true;
                        self.model.canvasStyle.src = model.src;
                        setTimeout(() => {
                            self.loading = false;
                        }, 1000);
                    },
                    selectChanged(selected, item, index) {},
                    multiselect: false,
                })
            },
            choose(s) {
                this.model.canvasStyle.repeat = s.repeat;
                this.model.canvasStyle.size = s.size;
                this.model.canvasStyle.position = s.position;
            },
            delImg() {
                this.model.canvasStyle.src = '';
            }
        }
    }
});