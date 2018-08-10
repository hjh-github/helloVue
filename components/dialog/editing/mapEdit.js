define(['vueLoader'], loader => {
    return {
        props: {
            model: {
                default: {}
            },
            config: {
                default: {}
            },
            key: {}
        },
        methods: {
            mark(){
                this.$refs.map.paint = true;
            }
        },
        components: {
            bmap: loader.load('dialog/bmap'),
        }
    }
});