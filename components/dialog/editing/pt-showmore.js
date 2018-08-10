define(['vueLoader'], (loader) => {
    return {

        components: {
            addlink: loader.load('dialog/editing/addlink'),
        },
        props: {
            model: {
                default: {},
            },
            key: {
                default: '',
            },
            config: {
                default: [],
            },
        },
        computed: {
            showMore(){
                let x = this.model[this.key];
                if (!x) {
                    x = this.model[this.key] = {};
                }
                return x;
            },
        },
        methods: {
            addLink(v){
                this.model[this.key] = v;
            },
        },

    }
})
;