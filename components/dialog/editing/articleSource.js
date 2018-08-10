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
                loading: true,
                cates: [],
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'children'
                },
                aloading: false,
                aprops: {
                    key: 'id',
                    label: 'name',
                },
                allArticles: [],
                selectedArticles: [],
                loaded: {},
                currentCategory: -1,
            };
        },
        mounted(){
            app.loadArticleCate({
                level: -1,
            }, (r) => {
                this.cates = this.treefy(r);
                this.loading = false;

                if (this.model.articleSource) {
                    this.preLoad();
                }
            });
        },

        methods: {

            preLoad(){
                //预加载
                this.model.articleSource.forEach(e => {
                    this.loading = false;
                    //加载已选
                    this.selectedArticles.push(e);
                    // console.log(this.selectedArticles);
                    
                    app.loadArticleSummary({id: e}, (art) => {
                        if (!this.loaded[art.newsCateId])
                            app.loadArticles({
                                newsCateId: art.newsCateId,
                            }, (artList) => {
                                this.aloading = false;

                                //异步双重验证
                                if (this.loaded[art.newsCateId])return;
                                this.loaded[art.newsCateId] = true;

                                if (artList.length)
                                    this.allArticles.push.apply(this.allArticles, artList);

                            });
                        this.loading = true;
                    });
                });

            },
            selectedChanged(arr){
                this.model[this.key] = arr;
            },
            change(r){
                this.currentCategory = r[r.length - 1];
                if (this.loaded[r[r.length - 1]]) {
                    return;
                }
                this.aloading = true;
                app.loadArticles({
                    newsCateId: r[r.length - 1],
                }, (e) => {
                    this.loaded[r[r.length - 1]] = true;
                    this.aloading = false;
                    if (e.length)
                        this.allArticles.push.apply(this.allArticles, e);
                })
            },
            filterMethod(query, arr, v){
                if (arr.length == 0)
                    return true;
                let e = arr instanceof Array ? arr[arr.length - 1] : arr;
                if (e.newsCateId != this.currentCategory) {
                    for (let i = 0; i < this.selectedArticles.length; i++) {
                        if (this.selectedArticles[i] == e.id) {
                            return true;
                        }
                    }
                    return false;
                }
                if (query.length > 0 && e && e.name)
                    return e.name.indexOf(query) > -1;
                return true;
            },
            treefy(r){
                let list = {};
                let result = [];

                r.forEach(e => {
                    if (list[e.id]) {
                        e.children = list[e.id].children;
                    }
                    list[e.id] = e;

                    if (e.parentId == 0) {
                        result.push(e);
                    } else {
                        if (list[e.parentId]) {
                            if (list[e.parentId].children == null) {
                                list[e.parentId].children = [];
                            }
                        } else {
                            list[e.parentId] = {children: []};
                        }
                        list[e.parentId].children.push(e);
                    }
                });
                return result;
            },

        }
    }
});