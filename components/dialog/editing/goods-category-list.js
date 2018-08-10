define([], () => {
    return {
        props: {
            model: {
                default: {},
            },
            pages: {
                default: {},
            },
            config: {},
            key: '',
        },
        data() {
            return {
                cates: [],
                allProducts: [],
                selectedProducts: [],
                loading: true,
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'childs'
                },
                aloading: false,
                aprops: {
                    key: 'id',
                    label: 'name1',
                },
                loaded: {},
                currentCategory: -1,
                cate: ''
            };
        },
        mounted() {
            this.cate = this.model.catesIds;
            app.loadB2CProductCate({}, (r) => {
                this.cates = this.treefy(r);
                this.loading = false;
                if (this.model.productIds != 0) {
                    this.preload(this.model.productIds);
                }
            });
        },

        methods: {
            preload(c) {
                this.selectedProducts = c;
                this.getProducts(this.cate);
            },
            selectedChanged(arr) {
                this.model[this.key] = arr;
            },
            change(selectedCate) {
                this.model.catesIds = selectedCate;
                this.getProducts(selectedCate);
            },
            filterMethod(query, arr, v) {
                if (arr.length == 0)
                    return true;
                let e = arr instanceof Array ? arr[arr.length - 1] : arr;
                if (e.productCateId != this.currentCategory) {
                    for (let i = 0; i < this.selectedProducts.length; i++) {
                        if (this.selectedProducts[i] == e.id) {
                            return true;
                        }
                    }
                    return false;
                }
                if (query.length > 0 && e && e.name)
                    return e.name.indexOf(query) > -1;
                return true;
            },
            getProducts(selectedCate) {
                this.currentCategory = selectedCate[selectedCate.length - 1];
                let cc = this.currentCategory;
                if (this.loaded[cc]) {
                    return;
                }
                this.aloading = true;
                app.loadB2CProductList({
                    cateId: cc,
                    // name:this.model[this.key].searchName,
                }, r => {
                    this.loaded[cc] = true;
                    this.aloading = false;
                    this.allProducts.push.apply(this.allProducts, r);
                });
                console.log(this.allProducts)
            },
            treefy(r) {
                let list = {};
                let result = [];

                r.forEach(e => {
                    if (list[e.id]) {
                        e.childs = list[e.id].childs;
                    }
                    list[e.id] = e;

                    if (e.pid == 0) {
                        result.push(e);
                    } else {
                        if (list[e.pid]) {
                            if (list[e.pid].childs == null) {
                                list[e.pid].childs = [];
                            }
                        } else {
                            list[e.pid] = {
                                childs: []
                            };
                        }
                        list[e.pid].childs.push(e);
                    }
                });
                return result;
            },

        }
    }
});