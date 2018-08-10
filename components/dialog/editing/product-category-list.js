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
                    children: 'children'
                },
                aloading: false,
                aprops: {
                    key: 'id',
                    label: 'name',
                },
                loaded: {},
                currentCategory: -1,
            };
        },
        mounted(){
            app.loadProductCate({
                level: -1,
            }, (r) => {
                this.cates = this.treefy(r);
                this.loading = false;
                if (this.model.productIds) {
                    this.preload();
                }
            });
        },

        methods: {
            preload(){
                let self = this;
                this.model.productIds.forEach(id => {
                    self.aloading = true;
                    self.selectedProducts.push(id);
                    app.loadProductSummary({id}, (result) => {
                        if (!self.loaded[result.productCateId]) {
                            app.loadProductList({
                                productCateId: result.productCateId,
                            }, r => {
                                // console.log(JSON.stringify(self.loaded),
                                //     self.loaded[result.productCateId],result.productCateId);

                                self.aloading = false;
                                //双重验证
                                if (self.loaded[result.productCateId])
                                    return;
                                self.loaded[result.productCateId] = true;


                                // console.log('---------', id, result);
                                // r.forEach(x => {
                                //     console.log(x.id);
                                // });
                                //
                                // console.log('-----------------');

                                self.allProducts.push.apply(self.allProducts, r);
                            });
                        }
                    });
                });
            },
            selectedChanged(arr){
                this.model[this.key] = arr;
            },
            change(selectedCate){
                this.currentCategory = selectedCate[selectedCate.length - 1];
                let cc = this.currentCategory;
                if (this.loaded[cc]) {
                    return;
                }
                this.aloading = true;
                app.loadProductList({
                    productCateId: cc,
                    // name:this.model[this.key].searchName,
                }, r => {
                    this.loaded[cc] = true;
                    this.aloading = false;
                    this.allProducts.push.apply(this.allProducts, r);
                });
            },
            filterMethod(query, arr, v){
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