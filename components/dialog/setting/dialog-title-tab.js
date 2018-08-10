define(['vueLoader'], (loader) => {
    return {
        props: ['model', 'parent'],
        data() {
            return {}
        },
        components: {
            fontedit: loader.load('dialog/setting/font-edit'),
            bgedit: loader.load('dialog/setting/background-edit'),
        },
        computed: {
            title: {
                get() {
                    return app.recoverSymbol(this.model.title);
                },
                set(v) {
                    this.model.title = v;
                }
            },
            subtitle: {
                get() {
                    return app.recoverSymbol(this.model.subtitle);
                },
                set(v) {
                    this.model.subtitle = v;
                }
            }
        },
        watch: {
            'model.def.defTitleBackground' (v) {
                if (!v) {
                    let ds = app.defaultModel.titleStyle;
                    for (let k in ds) {
                        this.model.titleStyle[k] = ds[k];
                    }
                }
            },
            'model.def.defTitle' (v) {
                if (v == 0) {
                    let ds = app.defaultModel.titleWordStyle;
                    this.emptyObject(this.model.titleWordStyle);
                    for (let k in ds) {
                        this.model.titleWordStyle[k] = ds[k];
                    }
                    this.model.titleWordStyle.display = '';
                } else if (v == 1) {
                    this.model.titleWordStyle.display = 'none';
                } else {
                    this.model.titleWordStyle.display = '';
                }
                this.parent.$forceUpdate();
            },
            'model.def.defSubTitle' (v) {
                if (v == 0) {
                    let ds = app.defaultModel.subTitleWordStyle;
                    this.emptyObject(this.model.subTitleWordStyle);
                    for (let k in ds) {
                        this.model.subTitleWordStyle[k] = ds[k];
                    }
                    this.model.subTitleWordStyle.display = '';
                } else if (v == 1) {
                    this.model.subTitleWordStyle.display = 'none';
                } else {
                    this.model.subTitleWordStyle.display = '';
                }
                this.parent.$forceUpdate();
            }
        },
        methods: {
            emptyObject(obj) {
                Object.keys(obj).forEach(k => delete obj[k]);
            },
            restore(keys) {
                for (k in keys) {
                    keys[k].forEach(e => {
                        this.model[k][e] = app.titleConfig[k][e];
                    });
                }
            },

        }
    };
});