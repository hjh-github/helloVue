define([], () => {
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
        mounted(){
            // console.log(this.model);
        }
    }
});