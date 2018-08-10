define(['vueLoader'], (loader) => {

    return {
        data(){
            return {
                visible: true,
            }
        },
        props: {
            model: {
                type: Object,
                default: {},
            },
            key: {},
            config: {
                type: String,
                default: '名称'
            },
        },
        computed(){
            return this.visible ? 'arrow-right' : 'arrow-down';
        },
        mounted(){
            console.log('imagesetting mounted')
            window.ims = this;
        }
    }
});