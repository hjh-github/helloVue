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
        computed: {
            // selected(){
            // }
        },
        data() {
            return {
                selected: {},
                loading: false
            }
        },
        methods: {
            setLink(model) {
                this.model.image.link = model;
            },
            setSelection(im) {
                im.selected = im.selected ? false : true;
                if (im.selected)
                    this.selected = im;
                else if (im === this.selected) {
                    this.selected = {};
                    for (let i = 0; i < this.model[this.key].length; i++) {
                        let s = this.model[this.key][i];
                        if (s.selected) {
                            this.selected = s;
                            break;
                        }

                    }
                }
                this.$forceUpdate();
            },
            sort(e) {
                return $.inArray(e, this.model.images);
            },
            sorted(e) {
                // let temp = this.model[this.key][e.oldIndex];
                // this.model[this.key].set = this.model[this.key][e.newIndex];
                // this.model[this.key][e.newIndex] = temp;

                // alert(e.oldIndex+","+e.newIndex);
                // let arr = this.model[this.key];
                // let o = arr[e.oldIndex];
                // arr.splice(e.oldIndex, 1);
                // // let newIndex = e.newIndex > e.oldIndex ? e.newIndex  : e.newIndex+1;
                // arr.splice(e.newIndex, 0, o);
            },
            selectAll() {
                this.model[this.key].forEach((e, i) => {
                    e.selected = true;
                });
                this.$forceUpdate();
            },
            deselectAll() {
                this.model[this.key].forEach(e => {
                    e.selected = false;
                });
                this.$forceUpdate();
            },
            deleteImage() {
                for (let i = 0; i < this.model[this.key].length;) {
                    if (this.model[this.key][i].selected)
                        this.model[this.key].splice(i, 1);
                    else i++;
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
                        self.selected.src = model.src;
                        if (!self.selected.hsrc)
                            self.selected.hsrc = '';
                        self.$forceUpdate();
                    },
                    selectChanged(selected, item, index) {
                    },
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
                                if (self.model[self.key].length < 8) {
                                    let img = JSON.parse(JSON.stringify(e));

                                    img.link = {
                                        type: 0,
                                        local: '',
                                        open: '_blank',
                                        net: '',
                                    };
                                    img.hsrc = '';

                                    self.model[self.key].push(img);


                                }
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
                // console.log(model);
            }
        },
        mounted() {
            window.imp = this;
            this.model.borderStyle['border-color'] = "#0094ff"
            // console.log(this.model)
        },

        components: {
            addlink: loader.load('dialog/editing/addlink'),
            draggable: draggable,
        },
    }
});