define(['vueLoader'], (loader) => {
    return {
        data () {
            return {
                radio: '1',
                loading: false,
            };
        },
        props: {
            model: {
                type: Object,
                default: {
                    image: {}
                },
            },
            key: {
                default: 'image',
            },
            config: {
                type: Object,
                default: {
                    text: '图片样式'
                }
            }
        },
        components:{
            addlink: loader.load('dialog/editing/addlink'),
        },
        watch:{
            'model':{
                 handler:function () {
                     if(this.config.selected==1){
                            this.model.btnBg='transparent'
                     }else{
                         this.model.image.src=''
                     }
                 },
                deep:true
            }
        },
        methods:{
            getLink(res){
                this.model['link'] = res.link;
                this.model['open'] = res.open;
            },
            selectImage(){
                let self = this;
                loader.loadImageDialog({
                    model: {
                        src: self.model[self.key].src,
                    },
                    callback(model){
                        // self.selected.src = model.src;
                        self.loading = true;
                        self.model[self.key].src = model.src;
                        setTimeout(() => {
                            self.loading = false;
                        }, 1000);
                    },
                    selectChanged(selected, item, index){
                    },
                    multiselect: false,
                })
            },
            choose(){
                let self = this;
                let _val = self.config.showStyle;
                if(_val=='0'){
                    self.model[self.key].repeat='repeat';
                    self.model[self.key].size='contain';
                    self.model[self.key].position='unset';
                }else if(_val=='1'){
                    self.model[self.key].repeat='no-repeat';
                    self.model[self.key].size='auto';
                    self.model[self.key].position='center';
                }else if(_val=='2'){
                    self.model[self.key].repeat='no-repeat';
                    self.model[self.key].size='cover';
                    self.model[self.key].position='center';
                }
            },
            setLink(){
                this.openLinkDialog();
            },
            delImg(){
                this.model[this.key].src =  ''; 
            }
        }
    }
});