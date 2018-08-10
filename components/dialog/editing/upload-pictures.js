define(['vueLoader'], (loader) => {
    return {
        props: {
            model: {
                type: Object,
                default: {
                    type: 0,
                },
            },
            key: {
                default: "type",
            },
            config: {

            },
        },
        mounted(){
            // console.log('upload-pictures',app);
            // this.getFirst(data=>{
            //   var newData=data.data.picLibs;
            //   this.config.getImgS(newData,function(){
            //   });
            // });
        },
        updata(){

        },
        methods: {
            upImg(e){
                var self=this;
                let file = e.target.files[0];
                if(!file){
                    return false;
                }else{
                    this.loading = true;
                    let param = new FormData();
                    param.append('imageFile',file,file.name);
                    param.append('userWebId',app.saveParams.id);
                    param.append('param','page');
                    //
                    $.ajax({
                        url:domain + 'user/page/uploadImg.html',
                        type:"post",
                        // Form数据
                        data: param,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success(data){
                            self.loading = false;
                            self.config.callback(data.data);
                        }
                    });
                }
            },

        },
        created:function(){

        },
        data(){
            return {
                loading:false
            }
        },
    }
});