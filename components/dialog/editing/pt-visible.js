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
    }
})
;