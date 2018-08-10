/**
 * Created by zcn on 2018/3/18.
 */
define([],()=>{
    return {
        props: {
            model: {
                default: {},
            },
            config: {
                type: Object,
                default: {
                    text: '名称',
                }
            },
            key:{
                type:String,
                default:'desc',
            }
        },
        mounted(){
        }
    }
});