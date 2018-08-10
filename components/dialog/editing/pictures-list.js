define(['vueLoader'], (loader) => {
    return {
        props: {
            model: {},
            key: {
                default: 'src'
            },
            config: {
                default: {
                    selectChanged(){
                    },
                    multiselect: false,
                }
            }
        },
        mounted () {
        },
        methods: {
            delImg(id,i){
                let self = this;
                this.loading = true;
                $.ajax({
                    url:domain + 'picture/delete.html',
                    type:"GET",
                    // Form数据
                    data: {'ids':id},
                    success(data){ 
                        if(data.success){
                            app.cellList.splice(i,1);
                            self.$forceUpdate();
                            setTimeout(()=>{
                                self.loading = false;  
                            },300)
                            // $('i[id='+id+']').parents('.pictures-list').remove();
                        }
                    }
                });
            },
            setSelection(item){
                if (this.config.multiselect) {
                    if (this.selected[item.src]) {
                        this.selected[item.src] = null;
                        this.config.selectChanged(false, item);
                    } else {
                        this.selected[item.src] = item;
                        this.config.selectChanged(true, item);
                    }
                } else {
                    this.model[this.key] = item.src;
                }
                this.$forceUpdate();
            },
            imageClass(item){
                if (this.config.multiselect) {
                    return {
                        active: this.selected[item.src],
                    };
                }
                return {
                    active: item.src == this.model[this.key],
                };
            },

            UploadImages(event){
                var $this = event.currentTarget;
            },

        },
        data(){
            return {
                selected: {},
                loading:false
            }

        }
    }
});