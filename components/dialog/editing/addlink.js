define(['vueLoader'], (loader) => {
    return {
        props: {
            model: {
                default: {}
            },
            callback: {}
        },
        methods: {
            addlink(){
                loader.loadLinkDialog({model: this.model, callback: this.callback});
            }
        }
    }
});