define(['vueLoader'], (loader) => {
    return {
        data () {
            return {
                loading: false,
            };
        },
        component: {
            linkBtn: loader.load('dialog/editing/addlink'),
        },
        props: {
            model: {
                type: Object,
                default: {
                    image: {}
                },
            },
            key: {
                default: 'image',
            },
            config: {
                type: Object,
                default: {
                    text: '图片样式'
                }
            }
        },
        methods: {
            openLinkDialog(){
                let self = this;
                loader.loadLinkDialog({
                    model: self.model.image, callback: (m) => {
                        // console.log(m);
                        self.model.image.link = m.link;
                        self.model.image.open = m.open;
                    }
                });
            },
            selectImage(){
                let self = this;
                loader.loadImageDialog({
                    model: {
                        src: self.model[self.key].src,
                    },
                    callback(model){
                        // self.selected.src = model.src;
                        self.loading = true;
                        self.model[self.key].src = model.src;
                        setTimeout(() => {
                            self.loading = false;
                        }, 1000);
                    },
                    selectChanged(selected, item, index){
                    },
                    multiselect: false,
                })
            },
            // setLink(){
            //     this.openLinkDialog();
            // },
            // openLinkDialog(model){
            //     loader.createVue('dialog/link', dialogVue => {
            //         this.editDialog = dialogVue;
            //
            //         // this.editDialog.setModel(model);
            //         loader.fill("#tempdialog1", dialogVue);
            //         this.editDialog.open();
            //     });
            // },
            getImageWidth(url, callback){
                let img = new Image();
                img.src = url;

                // 如果图片被缓存，则直接返回缓存数据
                if (img.complete) {
                    callback(img.width, img.height);
                } else {
                    // 完全加载完毕的事件
                    img.onload = function () {
                        callback(img.width, img.height);
                    }
                }

            },
        },
        computed: {
            showMargin(){
                switch (this.model['type']) {
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        return true;
                    default:
                        return false;
                }
            },
            width: {
                get(){
                    return this.model[this.key].style.width;
                },
                set(v){
                    if (v == '' || v == null)
                        v = 'auto';
                    this.model[this.key].style.width = v;
                }
            },
            height: {
                get(){
                    return this.model[this.key].style.height;
                },
                set(v){
                    if (v == '' || v == null)
                        v = 'auto';
                    this.model[this.key].style.height = v;
                },
            }

        },
    }
});