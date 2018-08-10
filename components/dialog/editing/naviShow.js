define([], () => {
    return {
        props: {
            model: {
                type: Object,
                default: {
                    image: {}
                },
            },
            key: {
                default: '',
            },
            config: {
                type: Object,
                default: {}
            }
        },
        mounted(){
            // console.log(this.model);
        },
        computed: {
            showSelect: {
                get() {
                    return this.model.config.showSelect;
                },
                set(v) {
                    this.model.config.showSelect = v;
                }
            },
            showStyle: {
                get() {
                    return this.model.config.showStyle;
                },
                set(v) {
                    this.model.config.showStyle = v;
                }
            },
        },
    }
});