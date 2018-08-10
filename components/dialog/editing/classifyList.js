define(['vueLoader'], (loader) => {
    return {
        data() {
            return {
                loading: false,
            };
        },
        props: {
            model: {
                type: Object,
                default: {
                    type: 0,
                },
            },
            key: {
                default: "image",
            },
            config: {
                type: Object,
            },
            editingConfig: {
                default: {
                    title: '添加分类',
                    pages: {
                        '常规': {
                            type: {
                                config: {
                                    text: '链接',
                                },
                                component: 'dialog/editing/classifyAdd',
                            },
                        },
                    },
                },
            },
        },
        component: {
            linkBtn: loader.load('dialog/editing/addlink'),
        },
        methods: {
            orderList(operate, ex) {
                var operate = operate,
                    cells = this.model['classify'], //获取数组
                    ex = ex;
                if (operate == '2') {
                    //2表示可以向上移动
                    let u = cells[ex];
                    cells[ex] = cells[ex - 1];
                    cells[ex - 1] = u;
                } else if (operate == '1') {
                    //1表示可以向下移动
                    let u = cells[ex];
                    cells[ex] = cells[ex + 1];
                    cells[ex + 1] = u;
                }
                this.$forceUpdate();
            },
            modify(id) {
                let self = this;
                loader.createVue('dialog/editing/classifyAdd', dialogVue => {
                    self.editDialog = dialogVue;
                    self.editDialog.setModel(self.model);
                    self.editDialog.setConfig(self.editingConfig);
                    self.editDialog.setData(id);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(() => {
                        self.$forceUpdate();
                    });
                });
            },
            del(id) {
                this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    app.classifyDel(id, () => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                        });
                        this.$forceUpdate();
                    },()=>{
                        this.$message({
                            type: 'warning',
                            message: '删除失败!',
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            showList(sh, ex) {
                var isshow = sh,
                    ex = ex,
                    classify = this.model.classify,
                    showLen = 0;
                for (var i = 0; i < classify.length; i++) {
                    if (classify[i].isShow) {
                        showLen++;
                    }
                }
                if (isshow) {
                    this.model['classify'][ex].isShow = false;
                } else {
                    if (this.model.type == 0) {
                        if (showLen >= 10) {
                            this.$message({
                                message: '最多只能显示10条导航信息！',
                                type: 'warning'
                            });
                        } else {
                            this.model['classify'][ex].isShow = true;
                        }
                    }
                    if (this.model.type == 1) {
                        if (showLen >= 8) {
                            this.$message({
                                message: '最多只能显示8条导航信息！',
                                type: 'warning'
                            });
                        } else {
                            this.model['classify'][ex].isShow = true;
                        }
                    }
                }


            },
            selectImage(ex) {
                let self = this;
                loader.loadImageDialog({
                    model: {
                        src: self.model.classify.src,
                    },
                    callback(model) {
                        // self.selected.src = model.src;
                        self.loading = true;
                        self.model['classify'][ex].src = model.src;
                        setTimeout(() => {
                            self.loading = false;
                        }, 1000);
                    },
                    multiselect: false,
                })
            },
            clearSelect(ex) {
                for (var i = 0; i < this.model.classify.length; i++) {
                    if (i != ex) {
                        this.model.classify[i].isUpdate = false;
                    }
                }
            },
            openLinkDialog() {
                let self = this;
                loader.createVue('dialog/editing/classifyAdd', dialogVue => {
                    self.editDialog = dialogVue;
                    self.editDialog.setModel(self.model);
                    self.editDialog.setConfig(self.editingConfig);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(() => {
                        self.$forceUpdate();
                    });
                });
            },
        },
        beforeMount() {
            app.classifyLook((res) => {
                let arr = res.data.catalogueList;
                let a, cArr = [], pArr = [];
                for (a = 0; a < arr.length; a++) {
                    if (arr[a].upChannel === '0') pArr.push(arr[a]);
                    else {
                        cArr.push(arr[a])
                    }
                }
                let b;
                for (b = 0; b < cArr.length; b++) {
                    let c;
                    for (c = 0; c < pArr.length; c++) {
                        if (cArr[b].upChannel == pArr[c].id) {
                            pArr[c].children=[];
                            pArr[c].children.push(cArr[b])
                        }
                    }
                }
                let i;
                for (i = 0; i < pArr.length; i++) {
                    let isShow = true;
                    let isUpdate = false;
                    if (i > 0) isUpdate = true;
                    pArr[i].isShow = isShow;
                    pArr[i].isUpdate = isUpdate;
                }
                this.model.classify = pArr;
            });
        },
    }
});