define(['vueLoader'], (loader) => {
    return {
        props: {
            'model': {},
            'config': {
                default: [true, true],
            }
        },
        mounted() {
            if ('inherit' == this.model['background-color']) {
                this.model['background-color'] = '';
            }
        },
        methods: {
            clearImage() {
                this.model['background-image'] = null;
            },
            selectImage() {

                let self = this;
                loader.loadImageDialog({
                    model: {},
                    callback(model) {
                        self.model['background-image'] = 'url(' + model.src + ')';
                        self.$forceUpdate();
                    },
                    selectChanged(selected, item, index) {},
                    multiselect: false,
                });
            },
        }
    };
});