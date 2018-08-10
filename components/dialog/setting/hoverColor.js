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
        watch:{

        },
        methods: {
        }
    };
});