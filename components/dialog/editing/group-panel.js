define(['vueLoader', 'vuedraggable'], (loader, draggable) => {
    return {
        props: {
            model: {
                default: {}
            },
            key: {
                default: '',
            },
        },
        watch: {
            model: {
                deep: true,
                handler(v) {
                    this.cpts = {};
                    this.cpts = v.model.cpts;
                }
            }
        },
        data() {
            return {
                selected: {},
                cpts: [],
                onSrc: '',
                inx: -1,
                loading: false
            }
        },
        methods: {
            setSelection(im, n) {
                im.selected = im.selected ? false : true;
                let src = im.settingConfig.canvasStyle.src;
                this.onSrc = src;
                this.inx = n;
                if (im.selected) {
                    this.selected = im;
                    this.selected['src'] = src;
                } else if (src === this.selected.src) {
                    this.selected = {};
                    this.onSrc = '';
                    for (let i = 0; i < this.cpts.length; i++) {
                        let s = this.cpts[i];
                        if (s.selected) {
                            this.selected = s;
                            break;
                        }

                    }
                }
                this.$forceUpdate();
            },
            sorted(e) {
                this.model.model.cpts = this.cpts;
            },
            selectAll() {
                this.cpts.forEach((e, i) => {
                    e.selected = true;
                });
                this.$forceUpdate();
            },
            deselectAll() {
                this.cpts.forEach(e => {
                    e.selected = false;
                });
                this.$forceUpdate();
            },
            deleteImage() {
                this.onSrc = '';
                this.inx = -1;
                for (let i = 0; i < this.cpts.length;) {
                    if (this.cpts[i].selected) {
                        this.model.model.cpts.splice(i, 1);
                    } else i++;
                }
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                }, 500);
            },
            change() {
                let self = this;
                loader.loadImageDialog({
                    model: {},
                    callback(model) {
                        self.onSrc = '';
                        setTimeout(() => {
                            self.onSrc = model.src;
                        }, 100);
                        self.model.model.cpts[self.inx].settingConfig.canvasStyle.src = model.src;
                        self.$forceUpdate()
                    },
                    selectChanged(selected, item, index) {},
                    multiselect: false,
                });

            },
            add() {
                let temp = {
                    images: [],
                };
                let self = this;
                loader.loadImageDialog({
                    model: {},
                    callback() {
                        if (temp.images) {
                            temp.images.forEach(e => {
                                let mod = JSON.parse(JSON.stringify(app.groupItemconfig));
                                mod.settingConfig.config.def = 1;
                                mod.settingConfig.canvasStyle.src = e.src;
                                self.model.model.cpts.push(JSON.parse(JSON.stringify(mod)));
                            });
                        }
                        self.$forceUpdate()
                    },
                    selectChanged(selected, item, index) {
                        if (selected && item.src) {
                            item.selected = false;
                            temp.images.push(item);
                        } else {
                            temp.images.splice($.inArray(item, temp.images), 1);
                        }
                    },
                    multiselect: true,
                });
            },
            addLink(model) {
                let lk = this.model.model.cpts[this.inx].model;
                lk['link'] = model.link;
            },

        },
        mounted() {
            window.imp = this;
        },

        components: {
            addlink: loader.load('dialog/editing/addlink'),
            draggable: draggable,
        },
    }
});