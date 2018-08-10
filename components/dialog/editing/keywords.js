define([], () => {
    return {
        props: {
            model: {
                default: {},
            },
            key: {},
            config: {},
        },
        mounted(){
            window.kw = this;
        },
    }
});