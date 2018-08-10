/**
 * Created by GDCL-A201011 on 2017/9/6.
 */
//http://192.168.30.175:8080/
var domain = sessionStorage.getItem("domain")
var defaultImg = '../../images/product/sctp.png';
var productVm = new Vue({
    el: '#product',
    
    data: {
        //建议尺寸
        compatSize: '',
        //当前选中的产品
        checkedProduct: [],
        //全选按钮flag
        checkAll: false,
        //产品列表
        products: [],
        //产品列表id，用于判断全选状态
        productIds: [],
        //搜索框显示flag
        canSearch: true,
        //一级分类列表
        firstCates: [],
        //二级分类列表
        secondCates: [],
        //三级分类列表
        thirdCates: [],
        //是否有二级||三级分类
        hasSecond: false,
        hasThird: false,
        //新增产品的select效果
        firstCateflag: false,
        secondCateflag: false,
        thirdCateflag: false,
        //新增产品的checked效果
        firstChecked: '',
        secondChecked: '',
        thirdChecked: '',
        // 已选一级分类下的二级分类列表
        childsSeconds: '',
        childsThirds: '',
        //新增产品的所属分类
        productCateId: '',
        productPath: '',
        productId: null,
        //    图片预览
        imgs: {
            0: defaultImg,
            1: defaultImg,
            2: defaultImg,
            3: defaultImg,
            4: defaultImg
        },

        //该次选择过的文件
        files: '',
        //    分类选择框
        tispsTag: false,

        productName: '',
        productImgs: [],
        marketPrice:'',
        productPrice: '',
        spu:'',
        productSummary: '',
        productDescription: '',
        searchKey: '',
        //分页页码s
        allPages: [],
        //显示的页码
        showPages: [],
        //    当前页码数
        pagesIndex: 1,
        toPage: 1,
        //分类添加校验是否存在未保存分类
        cateSaveFlag: -1,
        //编辑中的分类
        cateLevel: 0,
        // 当前获取焦点的分类名称input
        cateName: -1,
        // 保存验证
        canSave: true,
        imgI: 1,
        imgItem: '',
        newImg: null,
        checkImgs: -1,
        sImages: '',
        image: "",
        cate: '',
        productType: 1,
        changeInfo: 0,
        thisPageId: 0
    },
    watch: {
        firstCates: {
            handler: function (val, oldVal) {
                if (productVm.cateName != -1) {
                    if (val[productVm.cateName].name.length > 8) {
                        showTips('分类名称不可超过8个字');
                        productVm.canSave = false;
                    } else {
                        productVm.canSave = true;
                    }
                }
            },
            deep: true
        },
        secondCates: {
            handler: function (val, oldVal) {
                if (productVm.cateName != -1) {
                    if (val[productVm.cateName].name.length > 8) {
                        showTips('分类名称不可超过8个字');
                    }
                }
            },
            deep: true
        },
        thirdCates: {
            handler: function (val, oldVal) {
                if (productVm.cateName != -1) {
                    if (val[productVm.cateName].name.length > 8) {
                        showTips('分类名称不可超过8个字');
                    }
                }
            },
            deep: true
        }
    },
    mounted: function () {
        this.$nextTick(function () {
                productVm.productType = 1;
                productVm.getProducts(1,1)
        });
    },
    methods: {

        toSearch: function () {
            var data = {
                state: 1,
                type: productVm.productType,
                name: productVm.searchKey
            };
            productPagePost('service/product/list.html', data, function (res) {
                //请求成功
                var products = res.data.productList;
                productVm.products = products;
                productVm.productIds = productVm.returnIds(products);
            }, function (res) {
                //请求失败
                console.log("网络异常，请联系管理员！");
            })
        },
        redelProduct: function (id) {
            //根据id去判断否是批量，根据type去判断删除？恢复？

            var m = '个';
            var productsId = productVm.checkedProduct;
            var data = {
                checkIds: id,
            };
            if (id == -1) {
                m = '些'
                if (productsId.length < 1) {
                    //校验是否已经选了产品
                    msgToast({
                        title: '提示',
                        msg: '请选择你需要删除的产品',
                        confirmBar: '确定',
                        confirm: function (e) {}
                    })
                    return false;
                }
                data.checkIds = productsId.toString();
            }
            showToast({
                title: "提示",
                msg: "确定彻底删除这" + m + "产品吗？（无法恢复）",
                cancleBar: "取消",
                confirmBar: "确定",
                confirm: function (e) {
                    productPagePost('service/product/d.html', data, function (res) {
                        //请求成功
                        msgToast({
                            title: '提示',
                            msg: '删除成功',
                            confirmBar: "确定",
                            confirm: function () {
                                //重新渲染页面
                                productVm.getProducts(2);
                                productVm.checkedProduct = [];
                                productVm.checkAll = false;
                                return false;
                            }
                        })

                    }, function (res) {
                        //请求失败
                        console.log("网络异常，请联系管理员！");
                    })
                },
                cancle: function () {}
            })
        },
        //导航切换
        navChange: function (n) {
            //初始化列表选中状态
            productVm.checkAll = false;
            productVm.checkedProduct = [];
            //n: 1>>产品列表 2 >> 产品分类 3 >> 添加产品 4 >> 回收站
            switch (n) {
                case 1:
                    productVm.getProducts(1, 1);
                    productVm.canSearch = true;
                    break;
                case 2:
                    productVm.getCate(1);
                    productVm.canSearch = false;
                    break;
                case 3:
                    productVm.changeInfo = 1;
                    productVm.initialize();
                    productVm.canSearch = false;
                    um.setHeight(300);
                    break;
                case 4:
                    productVm.getProducts(2, 1);
                    productVm.canSearch = true;
                    break;
            }
        },
        //获取产品列表（type[ 1是产品列表，2是回收站 ]）
        getProducts: function (type, page) {
            if (page > productVm.allPages.length && productVm.allPages.length != 0) {
                showTips("当前页码不在范围");
                return false;
            }
            //当前选中的产品
            productVm.productType = type;
            productVm.checkedProduct = [];
            //全选按钮flag
            productVm.checkAll = false;
            var data = {
                state: type,
                type: productVm.productType,
                page: page,
                rows: 14,

            }
            productVm.pagesIndex = page;
            productVm.toPage = page;
            loadToate();
            productPagePost('service/product/list.html', data, function (res) {
                //请求成功
                loadClear();
                if (res.data == null) {
                    return false;
                }
                var products = res.data.productList,
                    total = res.total, //
                    pageSize = res.data.pageSize,
                    pages = Math.ceil(total / pageSize) //总页码数;
                productVm.allPages = productVm.getPages(pages);
                productVm.showpages(page);
                productVm.products = products;
                productVm.productIds = productVm.returnIds(products);

            }, function (res) {
                //请求失败
                console.log("网络异常，请联系管理员！");
            })
        },
        //产品编辑
        productEdit: function (id) {
            var _this = this;
            um.setHeight(300);
            editProduct();
            var data = {
                id: id
            }
            productPagePost('product/' + id + '.html', data, function (res) {
                //请求成功
                productVm.changeInfo = 1;
                var product = res.data.product;
                //分类级联初始化
                var paths = res.data.product.productCatePath.split("/");
                var catesLen = paths.length;
                _this.getCate(1);
                switch (catesLen) {
                    case 1:
                        productVm.firstChecked = paths[0];
                        productVm.hasSecond = false;
                        productVm.hasThird = false;
                        break;
                    case 2:
                        productVm.firstChecked = paths[0];
                        productVm.secondChecked = paths[1];
                        productVm.hasSecond = true;
                        productVm.hasThird = false;
                        _this.getCate(2)
                        break;
                    case 3:
                        productVm.firstChecked = paths[0];
                        productVm.secondChecked = paths[1];
                        productVm.thirdChecked = paths[2];
                        productVm.hasSecond = true;
                        productVm.hasThird = true;
                        _this.getCate(3)
                        break;
                }
                //    名称等input内容初始化
                for (var i = 1; i < 5; i++) {
                    if (i > product.sImageList.length) {
                        productVm.imgs[i] = defaultImg;
                    } else {
                        productVm.imgs[i] = product.sImageList[i - 1].image
                    }
                }
                productVm.imgs[0] = product.image;
                productVm.image = product.image;
                productVm.productName = res.data.product.name;
                productVm.productPrice = res.data.product.price;
                productVm.marketPrice = res.data.product.marketPrice;
                productVm.spu = res.data.product.spu;
                productVm.productId = res.data.product.id;
                

                productVm.productCateId = res.data.product.productCateId;
                productVm.productSummary = res.data.product.summary;
                productVm.sImages = productVm.fuimg(res.data.product.sImageList);
                UE.getEditor('myEditor').setContent(res.data.product.description);
                productVm.productDescription = res.data.product.description;
            }, function (res) {
                //请求失败
                console.log("网络异常，请联系管理员！");
            })
        },
        returnIds: function (arr) {
            var newArr = [];
            for (var i = 0; i < arr.length; i++) {
                newArr.push(arr[i].id)
            }
            return newArr;
        },
        returnImgs: function (arr) {
            var newArr = [];
            for (var i = 0; i < arr.length; i++) {
                newArr.push(arr[i].image)
            }
            return newArr;
        },
        //获取总页码数
        getPages: function (n) {
            var arr = [];
            for (var i = 1; i < n + 1; i++) {
                arr.push(i)
            }
            return arr;
        },
        //根据当前页码显示前3后3页码
        showpages: function (n) {
            var page = parseInt(n);
            var all = productVm.allPages;
            if (all < 8) {
                productVm.showPages = all;
            } else {
                if (page < 4) {
                    productVm.showPages = all.slice(0, 7);
                } else if (page > all.length - 3) {
                    productVm.showPages = all.slice(all.length - 7, all.length);
                } else {
                    productVm.showPages = all.slice(page - 4, page + 3);
                }
            }
        },
        //上一页
        prefPage: function (type, page) {
            if (page > 1) {
                page--;
            } else {
                showTips("已经是第一页了")
            }
            productVm.getProducts(type, page);
            productVm.pagesIndex = page;
            productVm.toPage = page;
        },
        //下一页
        nextPage: function (type, page) {
            if (page < productVm.allPages.length) {
                page++;
            } else {
                showTips("已经是最后一页了");
            }
            productVm.getProducts(type, page);
            productVm.pagesIndex = page;
            productVm.toPage = page;
        },
        //全选
        checkAllFn: function () {
            //获取当前全选按钮状态
            var flag = productVm.checkAll;
            //当页列表下的全部商品
            var arr = productVm.productIds;
            if (!flag) {
                productVm.checkedProduct = [];
            } else {
                productVm.checkedProduct = arr;
            }
        },
        //批量转移
        allMove: function () {
            productVm.initialize();
            var arr = productVm.checkedProduct;
            if (arr.length < 1) {
                //校验是否已经选了产品
                msgToast({
                    title: '提示',
                    msg: '请选择你需要转移的产品',
                    confirmBar: '确定',
                    confirm: function (e) {}
                })
            } else {
                productVm.tispsTag = true;
            }
        },
        //转移分类
        changeCates: function () {
            var products = productVm.checkedProduct;
        },
        //分类弹窗隐藏
        tispsTagHide: function () {
            productVm.tispsTag = false;
        },
        //确认选择分类
        tispsTagComfire: function () {
            productVm.tispsTag = false;
            var cateId = productVm.productCateId;
            var productsId = productVm.checkedProduct;
            var data = {
                productCateId: cateId,
                productCatePath: productVm.productPath,
                checkIds: productsId.toString()
            }

            productPagePost('service/product/transfer.html', data, function (res) {
                //请求成功
                showTips('操作成功');
                //重新渲染页面
                productVm.reShowProduct();
            }, function (res) {
                //请求失败
                console.log("网络异常，请联系管理员！");
            })

        },
        reShowProduct: function () {
            //重新渲染页面
            productVm.getProducts(1);
            productVm.checkedProduct = [];
            productVm.checkAll = false;
        },
        checkedProductFn: function () {
            //当页列表下的全部商品
            var arr = productVm.productIds;
            //    获取当前已经选择的商品
            var checkedArr = productVm.checkedProduct;
            //    判断长度一样则为全选
            if (checkedArr.length == arr.length) {
                productVm.checkAll = true;
            } else {
                productVm.checkAll = false;
            }
        },
        // 截取时间的 年 月 日，若时间基数为空则返回 - -
        getFDate: function (value) {
            if (value != null && value != "") {
                var date = new Date(value.replace(/-/g, "/"));
                var year = date.getFullYear().toString();
                var month = (date.getMonth() + 1);
                var day = date.getDate().toString();
                var hour = date.getHours().toString();
                var minutes = date.getMinutes().toString();
                var seconds = date.getSeconds().toString();
                if (month < 10) {
                    month = "0" + month;
                }
                if (day < 10) {
                    day = "0" + day;
                }
                if (hour < 10) {
                    hour = "0" + hour;
                }
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                return year + "-" + month + "-" + day;
            } else {
                return '-';
            }
        },
        //        删除 && 恢复
        delProduct: function (id, type) {
            //根据id去判断否是批量，根据type去判断删除？恢复？
            var m = '个';
            var productsId = productVm.checkedProduct;
            var data = {
                checkIds: id,
                state: type
            };
            if (id == -1) {
                m = '些'
                if (productsId.length < 1) {
                    //校验是否已经选了产品
                    msgToast({
                        title: '提示',
                        msg: '请选择你需要转移的产品',
                        confirmBar: '确定',
                        confirm: function (e) {}
                    })
                    return false;
                }
                data.checkIds = productsId.toString();
            }

            showToast({
                title: "提示",
                msg: type == 2 ? "确定删除这" + m + "产品吗？" : "确定恢复这" + m + "产品吗？",
                cancleBar: "取消",
                confirmBar: "确定",
                confirm: function (e) {
                    productPagePost('service/product/r.html', data, function (res) {
                        //请求成功
                        if (type == 2) {
                            msgToast({
                                title: '提示',
                                msg: '删除成功！（可在回收站中恢复！）',
                                confirmBar: "确定",
                                confirm: function () {
                                    //重新渲染页面
                                    productVm.reShowProduct();
                                    return false;
                                }
                            })
                        } else if (type == 1) {
                            msgToast({
                                title: '提示',
                                msg: '恢复成功',
                                confirmBar: "确定",
                                confirm: function () {
                                    //重新渲染页面
                                    productVm.getProducts(2);
                                    productVm.checkedProduct = [];
                                    productVm.checkAll = false;
                                    return false;
                                }
                            })
                        }

                    }, function (res) {
                        //请求失败
                        console.log("网络异常，请联系管理员！");
                    })
                },
                cancle: function () {}
            })
        },
        /*
         * 产品分类相关
         * */
        //点击分类，获取所有对应分类
        getCate: function (n) {
            productVm.cateSaveFlag = -1;
            productVm.cateName = -1;
            productVm.cate = n;

            loadToate();
            if (n == 1 || n == 2) {
                //获取一级分类列表
                var data = {
                    level: 1
                };
                productPagePost('service/productCate/list.html', data, function (res) {
                    //请求成功
                    loadClear();
                    if (res.data.productCateList.length == 0) {
                        msgToast({
                            title: '提示',
                            msg: '当前类型下没有分类，可到产品分类下添加分类',
                            confirmBar: "确定",
                            confirm: function () {
                                // productVm.navChange(1);
                                editCate();
                                return false;
                            }
                        })
                    }
                    var Cates = res.data.productCateList;
                    productVm.firstCates = Cates;
                }, function (res) {
                    //请求失败
                    console.log("网络异常，请联系管理员！");
                })
            }
            if (n == 2 || n == 3) {
                //获取二级分类列表
                var data = {
                    level: 2
                };
                productPagePost('service/productCate/list.html', data, function (res) {
                    //请求成功
                    loadClear();
                    var Cates = res.data.productCateList;
                    productVm.secondCates = Cates;
                }, function (res) {
                    //请求失败
                    console.log("网络异常，请联系管理员！");
                })
            }
            if (n == 3) {
                //获取三级分类列表
                var data = {
                    level: 3
                };
                productPagePost('service/productCate/list.html', data, function (res) {
                    //请求成功
                    loadClear();
                    var Cates = res.data.productCateList;
                    productVm.thirdCates = Cates;

                }, function (res) {
                    //请求失败
                    console.log("网络异常，请联系管理员！");
                })
            }
        },
        //分类保存
        cateSave: function (index, type) {
            var _this = this;
            if (!productVm.canSave) {
                //校验名称长度
                showTips('分类名称不可超过8个字');
                return false;
            }
            //初始化编辑状态索引
            productVm.cateName = -1;
            if (type == 1) {
                //保存一级分类
                var data = productVm.firstCates[index];
                data.type = productVm.productType;
                //校验分类名称不能为空
                var name = productVm.firstCates[index].name;
                // for (var i = 0; i < productVm.firstCates.length; i++) {
                //     if (i != index) {
                //         if (name == productVm.firstCates[i].name) {
                //             showTips('分类名称不能相同');
                //             return false;
                //         }
                //     }

                // }
                if (_this.Trim(name) == '') {
                    msgToast({
                        title: '提示',
                        msg: '分类名称不能为空',
                        confirmBar: "确定",
                        confirm: function () {
                            return false;
                        }
                    })
                } else {
                    loadToate();
                    productPagePost('service/productCate/save.html', data, function (res) {
                        loadClear();
                        showTips('保存成功');
                        productVm.cateSaveFlag = -1;
                        productVm.getCate(1);
                    })

                }

            } else if (type == 2) {
                //保存二级分类
                var data = productVm.secondCates[index];
                data.type = productVm.productType;
                //校验是否已选择上级分类
                if (data.parentId == 0) {
                    msgToast({
                        title: '提示',
                        msg: '请选择上一级分类',
                        confirmBar: "确定",
                        confirm: function () {
                            return false;
                        }
                    })
                    return false;
                }
                //校验分类名称不能为空
                var name = productVm.secondCates[index].name;
                // for (var i = 0; i < productVm.secondCates.length; i++) {
                //     if (i != index) {
                //         if (name == productVm.secondCates[i].name) {
                //             showTips('分类名称不能相同');
                //             return false;
                //         }
                //     }

                // }
                if (_this.Trim(name) == '') {
                    msgToast({
                        title: '提示',
                        msg: '分类名称不能为空',
                        confirmBar: "确定",
                        confirm: function () {
                            return false;
                        }
                    })
                } else {
                    loadToate();
                    productPagePost('service/productCate/save.html', data, function (res) {
                        loadClear();
                        showTips('保存成功');
                        productVm.cateSaveFlag = -1;
                        productVm.getCate(2);
                    })

                }

            } else if (type == 3) {
                //保存三级分类
                var data = productVm.thirdCates[index];
                data.type = productVm.productType;
                //校验是否已选择上级分类
                if (data.parentId == 0) {
                    msgToast({
                        title: '提示',
                        msg: '请选择上一级分类',
                        confirmBar: "确定",
                        confirm: function () {
                            return false;
                        }
                    })
                    return false;
                }
                //校验分类名称不能为空
                var name = productVm.thirdCates[index].name;
                // for (var i = 0; i < productVm.thirdCates.length; i++) {
                //     if (i != index) {
                //         if (name == productVm.thirdCates[i].name) {
                //             showTips('分类名称不能相同');
                //             return false;
                //         }
                //     }

                // }
                if (_this.Trim(name) == '') {
                    msgToast({
                        title: '提示',
                        msg: '分类名称不能为空',
                        confirmBar: "确定",
                        confirm: function () {
                            return false;
                        }
                    })
                } else {
                    loadToate();
                    productPagePost('service/productCate/save.html', data, function (res) {
                        loadClear();
                        showTips('保存成功');
                        productVm.cateSaveFlag = -1;
                        productVm.getCate(3);
                    })
                }
            }
        },
        //二级分类选择父级分类,
        secondParent: function (n, id, name) {
            productVm.secondCates[n].parentId = id;
            //筛选id 为选中的id的父级分类，
            productVm.secondCates[n].parentName = name;
        },
        //三级分类选择父级分类,
        thirdParent: function (n, id, name) {
            productVm.thirdCates[n].parentId = id;
            //筛选id 为选中的id的父级分类，
            productVm.thirdCates[n].parentName = name;
        },
        //分类删除,不分等级分类
        cateDel: function (id, n) {
            var data = {
                id: id
            }
            // 若删除未保存的分类时，直接删除！
            if (id == null) {
                showTips('删除成功');
                productVm.getCate(n);
                return false;
            }
            // 删除已保存的分类时
            showToast({
                title: "提示",
                msg: "确定删除这个分类吗？",
                cancleBar: "取消",
                confirmBar: "确定",
                confirm: function (e) {
                    loadToate();
                    productPagePost('service/productCate/del.html', data, function (res) {
                        //若该分类存在下级分类 或者 其他 异常状态 弹窗提示
                        if (res.success == false) {
                            loadClear();
                            msgToast({
                                title: '提示',
                                msg: res.message,
                                confirmBar: "确定",
                                confirm: function () {
                                    return false;
                                }
                            })
                        } else {
                            //删除成功
                            loadClear();
                            showTips('删除成功');
                            productVm.getCate(n);
                        }
                    }, function () {
                        console.log("网络异常，请联系管理员！");
                    })
                },
                cancle: function () {}
            })
        },
        cateChange: function (n, cateLv) {
            //修改分类名称时记录当前存在未保存项
            var flag = productVm.cateSaveFlag;
            if (flag == -1 || flag == -2) {
                productVm.cateSaveFlag = n;
            }
        },
        cateFocus: function (n, cateLv) {
            //点击分类名称时记录当前编辑项索引
            var cateName;
            var flag = productVm.cateSaveFlag;
            productVm.cateName = n;
            productVm.cateLevel = cateLv;
            if (flag == -1 || flag == -2) {
                return false;
            } else if (flag == n) {
                return false;
            } else {
                if (cateLv == 1) {
                    cateName = productVm.firstCates[flag].name;
                } else if (cateLv == 2) {
                    cateName = productVm.secondCates[flag].name;
                } else if (cateLv == 3) {
                    cateName = productVm.thirdCates[flag].name;
                }
                showToast({
                    title: '提示',
                    msg: '分类 ' + cateName + ' 未保存，</br>是否保存？',
                    cancleBar: '取消',
                    confirmBar: '保存',
                    confirm: function (e) {
                        //右边按钮函数
                        productVm.cateSave(flag, cateLv)
                        
                    },
                    cancle: function () {
                        return false;
                    }
                })

            }
        },
        //    添加分类
        cateAdd: function (index) {
                //添加分类，创建一个基础对象
                var newObj = {
                    id: null,
                    parentId: 0,
                    level: index,
                    name: '',
                    sort: 0,
                    parentName: '',
                    type: 1
                }
                var flag = productVm.cateSaveFlag;
                if (index == 1) {
                    //一级分类
                    if (flag == -1) {
                        productVm.firstCates.push(newObj);
                        productVm.cateSaveFlag = -2;
                    } else {
                        msgToast({
                            title: '提示',
                            msg: '当前还存在未保存分类，请保存后再重试',
                            confirmBar: "确定",
                            confirm: function () {
                                return false;
                            }
                        })
                    }

                } else if (index == 2) {
                    //二级分类
                    if (flag == -1) {
                        newObj.parentId = 0;
                        productVm.secondCates.push(newObj);
                        productVm.cateSaveFlag = -2;
                    } else {
                        msgToast({
                            title: '提示',
                            msg: '当前还存在未保存分类，请保存后再重试',
                            confirmBar: "确定",
                            confirm: function () {
                                return false;
                            }
                        })
                    }

                } else if (index == 3) {
                    //三级分类
                    if (flag == -1) {
                        newObj.parentId = 0;
                        productVm.thirdCates.push(newObj);
                        productVm.cateSaveFlag = -2;
                    } else {
                        msgToast({
                            title: '提示',
                            msg: '当前还存在未保存分类，请保存后再重试',
                            confirmBar: "确定",
                            confirm: function () {
                                return false;
                            }
                        })
                    }
                }
            }

            ,
        /*
         * 添加产品相关
         * */
        //  获取一级分类
        getFirstCate: function (state) {
            var newState = state ? false : true;
            productVm.getCate(2);
            productVm.firstCateflag = newState;
        },

        //    选取一级分类
        getCatef: function (cate, id, path) {
            var arr = productVm.secondCates;
            //获取对应下级分类
            var newArr = productVm.returnCates(arr, id);
            var newArrLen = newArr.length;
            if (newArrLen != 0) {
                productVm.secondChecked = '';
                productVm.hasSecond = true;
            } else {
                //当没下级分类隐藏下级select
                productVm.hasSecond = false;
            }
            productVm.hasThird = false;
            ////显示对应下级分类
            productVm.childsSeconds = id;
            productVm.productCateId = id;
            productVm.productPath = path;
            productVm.firstChecked = cate;
            productVm.firstCateflag = false;
        },
        //    获取二级分类
        getSecondCate: function (state) {
            var newState = state ? false : true;
            productVm.secondCateflag = newState;
            productVm.getCate(3);

        },
        getSecondc: function (cate, id, path) {
            var arr = productVm.thirdCates;
            //获取对应下级分类
            var newArr = productVm.returnCates(arr, id);
            var newArrLen = newArr.length;
            if (newArrLen != 0) {
                productVm.thirdChecked = '';
                productVm.hasThird = true;
            } else {
                //当没下级分类隐藏下级select
                productVm.hasThird = false;
            }
            ////显示对应下级分类
            productVm.childsThirds = id;
            productVm.productCateId = id;
            productVm.secondChecked = cate;
            productVm.productPath = path;
            productVm.secondCateflag = false;
        },
        //    获取三级分类
        getThirdCate: function (state) {
            var newState = state ? false : true;
            productVm.thirdCateflag = newState;
        },
        getThirdc: function (cate, id, path) {
            productVm.productCateId = id;
            productVm.thirdChecked = cate;
            productVm.productPath = path;
            productVm.thirdCateflag = false;
        },
        //选择上级分类，获取对应下级分类
        returnCates: function (arr, parentId) {
            var newArr = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].parentId == parentId) {
                    var obj = arr[i];
                    if (obj != undefined) {
                        newArr.push(obj)
                    }
                }
            }
            return newArr;
        },
        checkImg: function (n) {
            productVm.checkImgs = n;
            if (productVm.imgs[n] != defaultImg) {
                productVm.imgItem = productVm.imgs[n];
            } else {
                productVm.imgItem = '';
            }

        },
        closeImg: function (n) {
            productVm.checkImgs = -1;
        },
        // 上传图片
        comfireImg: function () {
            var _this = this;
            if (_this.newImg == null || $("#flieInput").val() == '') {
                return showTips("请选择图片");
            }
            loadToate();
            var arr = $('#setProduct').formToArray();
            if (arr[0].value.size > 500 * 1024) {
                loadClear();
                showTips('图片大于500kb！');
                imageSize = false;
                return false;
            };
            
            var data = $('#setProduct').serialize();
            var options = {
                url: domain + 'user/page/uploadImg.html',
                type: 'post',
                data: data,
                success: function (res) {
                    loadClear();
                    showTips('保存成功');
                    _this.imgs[_this.checkImgs] = res.data.imgPath;
                    _this.checkImgs = -1;
                    var hostImg = _this.imgs[0] == defaultImg ? '' : _this.imgs[0];
                    // 取出 上传的细节图
                    _this.sImages = _this.fuimg().join(",");
                    _this.image = hostImg;
                    _this.newImg = null;
                }
            };

            $('#setProduct').ajaxSubmit(options);

        },
        // 取出 上传的细节图
        fuimg: function () {
            var fuImgs = [];
            for (var i = 1; i < 5; i++) {
                if (productVm.imgs[i] != defaultImg) {
                    fuImgs.push(productVm.imgs[i]);
                }

            }
            productVm.sImages = fuImgs.join(",");
            return fuImgs;
        },
        // 预览图片
        upImg: function (event) {
            var _this = this;
            var imgEvent = event.currentTarget;
            if ($("#flieInput").val() === "" && _this.newImg === null){
                return showTips("你没有选择图片");
            }
            if(imgEvent.files[0]){
                productVm.newImg = imgEvent.files[0];
                productVm.imgItem = getObjectURL(imgEvent.files[0]);
            }
            
        },
        // 删除详情图
        imgDel: function (n) {
            var _this = this;
            // 如果有被选删除图片时
            if (_this.imgs[n] != defaultImg) {
                showToast({
                    title: '提示',
                    msg: '是否删除该图片',
                    cancleBar: '否',
                    confirmBar: '是',
                    confirm: function (e) {
                        _this.imgs[n] = defaultImg;
                        // 取出 上传的细节图
                        productVm.sImages = _this.fuimg().join(",");
                    },
                    cancle: function () {
                        return false;
                    }
                })
            }
        },
        Trim: function (str) {
            // 返回一个去除前后空格的字符串
            return str.replace(/(^\s*)|(\s*$)/g, "");
        },
        //    产品保存
        saveProduct: function () {
            //非空验证
            var _this = this;
            if (productVm.productCateId == "") {
                showTips('请选择分类');
                loadClear();
                return false;
            }
            if ( _this.Trim(productVm.productName) == "") {
                showTips('名称不能为空');
                loadClear();
                return false;
            }
            if (productVm.productPrice == "") {
                showTips('交易价格不能为空');
                loadClear();
                return false;
            } else if (productVm.productPrice.length > 12) {
                showTips('交易价格最多为12位');
                loadClear();
                return false;
            }
            if (productVm.marketPrice == "") {
                showTips('市场价格不能为空');
                loadClear();
                return false;
            } else if (productVm.marketPrice.length > 12) {
                showTips('市场价格最多为12位');
                loadClear();
                return false;
            }
            if (productVm.spu == "") {
                showTips('产品编号不能为空');
                loadClear();
                return false;
            } else if (productVm.spu.length > 12) {
                showTips('价格最多为12位');
                loadClear();
                return false;
            }
            if (productVm.imgs[0] == defaultImg) {
                showTips('主图不能为空');
                loadClear();
                return false;
            }
            if (productVm.productSummary == "") {
                showTips('摘要不能为空');
                loadClear();
                return false;
            }
            loadToate();
            var data = $('#addProduct').serialize();
            var options = {
                url: domain + 'service/product/save.html',
                type: 'post',
                data: data,
                success: function (res) {
                    loadClear();
                    showTips('保存成功');
                    productVm.initialize();
                }
            };
            if ($('#addProduct').form('validate')) {

                $('#addProduct').ajaxSubmit(options);
            }
            var data2 = decodeURIComponent(options.data,true);
        },
        defaultPag: function () {
            productVm.imgI = -1;
        },
        //添加产品列表清空
        initialize: function () {
            productVm.firstCateflag = false;
            productVm.secondCateflag = false;
            productVm.thirdCateflag = false;
            productVm.hasSecond = false;
            productVm.hasThird = false;
            productVm.firstChecked = '';
            productVm.productName = '';
            productVm.productImgs = [];
            productVm.image = '';
            productVm.sImages = '';
            productVm.imgs = {
                0: defaultImg,
                1: defaultImg,
                2: defaultImg,
                3: defaultImg,
                4: defaultImg
            };
            productVm.marketPrice='';
            productVm.productPrice = '';
            productVm.spu='';
            productVm.productSummary = '';
            productVm.productId = '';
            productVm.productCateId = '';
            UE.getEditor('myEditor').execCommand('cleardoc');
            $("#addProduct").resetForm();
            var userWebId = get_cache("id");
            productVm.userWebId = userWebId;
        },
    },

});

//实例化编辑器
var um = UE.getEditor('myEditor');

// 将图片路径转换成本地路径，用于预览图片
function getObjectURL(file) {
    var url = null;
    if(file){
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
    }
    return url;
}

function editProduct() {
    //active 代表高亮
    $('.leftBox > li').eq(2).addClass('active').siblings().removeClass("active");
    //show 代表显示
    //内容按照nav高亮显示对应的内容
    $('.right > .section').eq(2).addClass('show').siblings().removeClass('show');
}

function editCate() {
    //active 代表高亮
    $('.leftBox > li').eq(1).addClass('active').siblings().removeClass("active");
    //show 代表显示
    //内容按照nav高亮显示对应的内容
    $('.right > .section').eq(1).addClass('show').siblings().removeClass('show');
}
// 用jq辅助写效果
(function () {

    //侧边栏高亮
    var $leftNavA = $('.left-nav li');

    function changeLeftNav() {
        $(this).addClass('on').siblings().removeClass('on');
    }

    //点击页面侧边栏
    $leftNavA.on('click', changeLeftNav);

    function changeNewLeft() {
        $(this).addClass('active').siblings().removeClass('active');
    }

    //点击新闻侧边栏
    var $contentLeftLi = $('.content > .left li');
    $contentLeftLi.on('click', changeNewLeft);

    //点击nav的标题
    var $navLi = $('.leftBox > li'),
        //内容
        $section = $('.right > .section');
    //nav 高亮
    function checkNav() {
        var index = $(this).index();
        //active 代表高亮
        $(this).addClass('active').siblings().removeClass("active");
        //show 代表显示
        //内容按照nav高亮显示对应的内容
        $section.eq(index).addClass('show').siblings().removeClass('show');
    }

    $navLi.on('click', checkNav);

    //点击删除除按钮 调用utils里的弹框方法
    var $delete = $('.delete');
    /*
     * 删除信息
     * 传入要删除的选择器
     * */
    function getMsg(selector) {
        showToast({
            title: "提示",
            msg: "确定删除选中的新闻吗？删除后可在回收站中恢复！",
            cancleBar: "取消",
            confirmBar: "确定",
            confirm: function (e) {
                selector.remove();
                showTips('操作成功');
            },
            cancle: function () {

            }
        })
    }

    //点击删除图标事件
    $delete.on('click', function (event) {
        var element = $(this).parents('.dataLi');
        getMsg(element);

    });

    //新闻分类里面 点击一级分类和二级分类
    var $classNav = $('.classify > .navL > .navInner');

    function changeClass() {
        var index = $(this).index();
        //高亮
        $(this).addClass('active').siblings().removeClass('active');
        $('.classify .section').eq(index).addClass('active').siblings('.section').removeClass('active');
    }

    $classNav.on('click', changeClass);

    //在二级分类里点击删除按钮
    var $erjiDelete = $('.classify > .secondLevl > .addTto .shift');

    $erjiDelete.on('click', function () {
        var selecterji = $(this).parents('.addTto');
        getMsg(selecterji);
    });

})();

//添加新闻select模拟
var $selectBox = $('.selcet  .selectBox'),
    $li = $('.option > li');
//点击selectBox
$selectBox.on('click', ".option", function () {
    //小三角动画 加下滑option
    $(this).parents('.input-box').addClass('checked');
    $(this).siblings('.option').slideDown(100);
});
//鼠标离开即 blur
$selectBox.on('blur', function () {
    //小三角动画 加上滑option
    $(this).parents('.input-box').removeClass('checked');
    $(this).siblings('.option').slideUp(100);
})
//点击列表
$li.on('click', function () {
    var $this = $(this);
    $this.parent('.option').prev().attr('value', $(this).text());
    $this.parent('.option').slideUp(100);
})
//新闻分类输入框的可输入状态和只读状态切换

var $save = $('.firstLevl .save'),
    $categoryedit = $('.firstLevl .edit');
//新闻分类里的添加和修改分类
// 一级 点保存
//$save.on('click', function () {
//    $(this).parent().siblings().find('input').attr('readonly', 'readonly');
//    //发数据
//
//})

//一级 点编辑
$categoryedit.on('click', function () {
    $(this).parent().siblings().find('input').removeAttr('readonly')
})
//二级里模拟select
var $secondSlect = $('.secondCateBox');
$secondSlect.on('click', '.checkUpLevel', function () {
    //小三角转电话
    //下拉
    $(this).next().slideDown(100);

})

//失去焦点
$secondSlect.on('blur', '.checkUpLevel', function () {
    $(this).next().slideUp('100');
})


//二级 点保存
var $secondsave = $('.secondLevl .save');
$secondsave.on('click', function () {
    $(this).parent().siblings().find('input').attr('readonly', 'readonly');
    //发数据
    $.ajax({
        type: 'POST',
        url: 'service/productCate/save.html',
        data: $(this).parents('form').serialize(),
        dataType: "json",
        success: function (data) {}
    })
})