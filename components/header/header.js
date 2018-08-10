define([], function() {
    return{
        props:['webcode'],
        data(){
            return{
                saveLoading:false,
                channelflag:[
                    {name:'移动',img:'images/mobile/mob.png',src:'./mobileIndex.html'},
                    {name:'PC',img:'images/mobile/pc.png',src:'./index.html'},
                ],
            }
        },
        methods:{
            savePage(){
                this.saveLoading = true;
                app.savePage((res)=>{
                    if(res.success){
                        this.saveLoading = false;
                    }
                    else{
                        setTimeout(() => {
                            this.saveLoading = false;
                        }, 3000);
                    }
                });
            },
        }
    }
});