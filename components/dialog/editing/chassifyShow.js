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
        watch:{
            "model.Expansion":{
                handler(){

                },
                deep:true
            }
        },
        mounted(){
        }
    }
});