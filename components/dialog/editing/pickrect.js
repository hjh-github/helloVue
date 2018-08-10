define(['vueLoader'], (loader) => {
    return {
        props:['model','store','config'],
        mounted(){
            console.log('pick rect ', this)
        }

    }
});