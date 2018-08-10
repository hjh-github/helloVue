define(['vueLoader'], (loader) => {
    return{
        data(){
            return{
                ruler:0,
                defwidth:true,
                
            }
        },
        props:{
            model:{},
            config:{},
            code:{},
            base:{
                type:Function
            },

        },
        mounted () {
        },
        watch:{
            config(v){
                console.log("config:"+v)
            },
            ontab(v){
                console.log("ontab:"+v) 
            }
        },
        components:{
            'base-common':loader.load('dialog/setting/base-common'),
            'base-item':loader.load('dialog/setting/base-item'),
        }
    }
})