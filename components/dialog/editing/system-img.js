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
                default: "src",
            },
            config: {
                default: {
                    selectChanged(){
                    },
                    multiselect: false,
                },
            },
        },
        data(){
            return {
                imaList: [],
                selected: {},
            }
        },
        mounted(){
            // console.log('$this', this);
            this.getFirst(data => {
                var newData = data.data.picLibs;
                for (var i = 0, leng = newData; i < leng.length; i++) {
                    this.imaList.push({src: leng[i].imgPath})
                }

            });
        },
        methods: {
            setSelection(item, index){
                if (this.config.multiselect) {
                    if (this.selected[item.src]) {
                        this.selected[item.src] = null;
                        this.config.selectChanged(false, item, index);
                    } else {
                        this.selected[item.src] = item;
                        this.config.selectChanged(true, item, index);
                    }
                } else {
                    this.model[this.key] = item.src;
                }
                this.$forceUpdate();
            },
            imageClass(item, index){
                if (this.config.multiselect) {
                    return {
                        active: this.selected[item.src],
                    };
                }
                return {
                    active: item.src == this.model[this.key],
                };
            },
            getFirst(callback, errorback){
                var picsUrl = domain + '/picture/libs.html';
                $.ajax({
                    url: picsUrl,
                    type: 'POST',
                    data: {userId: 0},
                    dataType: 'json',
                    success: function (response) {
                        if (response.success && response.data) {
                            callback && callback(response)
                        } else {
                            errorback && errorback(response)
                        }
                    },
                    error: function (err) {
                        if (errorback) {
                            errorback();
                        } else {
                            showTips('获取数据失败，请稍后再试');
                        }
                    }
                })
            },
        },
    }
});