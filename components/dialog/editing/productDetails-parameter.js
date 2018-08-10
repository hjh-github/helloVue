define(['vueLoader'], (loader) => {
    return {
        props: {
            model: {
                type: String,
                default: '',
            },
            config: {

            },
            key:{
                type:String,
            }
        },
        data:{
            checked:[],
        },
        mounted(){

        },
    }
});