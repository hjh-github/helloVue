define([], () => {

    return {
        props: {
            model: {
                default: {},
            },
            config: {},
            key: '',
        },
        data() {
            return {
                cate:'',
                loading: true,
                cates: [],
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'children'
                },
                aprops: {
                    key: 'id',
                    label: 'title',
                },
                aloading: false,
                allArticles: [],
                selectedArticles: [],
                loaded: {},
                currentCategory: -1,
            };
        },
        mounted() {
            app.loadNewsCate({
                userId:app.toSessionStorage('userId'),
            },r => {
                this.cates = r;
                this.loading = false;
                if (this.model.articleSource) {
                    this.preLoad(this.model.articleSource,this.model.newsCate);
                }
            });
        },

        methods: {

            preLoad(v,r) {
                //预加载
                this.loading = false;
                this.selectedArticles = v;
                this.cate = r;
                if(this.model.newsCate){
                    app.loadNewsArticles({
                        typeId: r[0],
                    }, e => {
                        this.loaded[0] = true;
                        this.aloading = false;
                        if (e.length)
                            this.allArticles = e;
                    })
                }  
            },
            selectedChanged(arr) {
                this.model.articleSource = arr;
            },
            change(r) {
                let self = this;
                this.aloading = true;
                app.loadNewsArticles({
                    typeId: r[0],
                }, e => {
                    this.loaded[0] = true;
                    this.aloading = false;
                    this.allArticles = e;
                })
                this.model.newsCate = r;
            },
            // filterMethod(query, arr, v) {
            //     if (arr.length == 0)
            //         return true;
            //     let e = arr instanceof Array ? arr[arr.length - 1] : arr;
            //     if (e.newsCateId != this.currentCategory) {
            //         for (let i = 0; i < this.selectedArticles.length; i++) {
            //             if (this.selectedArticles[i] == e.id) {
            //                 return true;
            //             }
            //         }
            //         return false;
            //     }
            //     if (query.length > 0 && e && e.name)
            //         return e.name.indexOf(query) > -1;
            //     return true;
            // },
        }
    }
});