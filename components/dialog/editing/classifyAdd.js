define(['vueLoader'], (loader) => {
    return {
        props: {
            model: {
                type: Object,
                defaulte: {}
            },
            callback: {},
        },
        data() {
            return {
                name: '',
                id: '',
                linkType: 0,
                localLink: '',
                localLinkName:'',
                customLink: '',
                upChannel: '',
                blankYn: '',
                icon: '',
                webId: "",
                visible: false,
                goodsList: [],
                goodsInfo: [],
                selectedLinkType: '',
                link: {
                    type: 0
                },
                domain: '',
                active: 0,
                model: {
                    pages: {}
                },
                linkTypeOptions: [],
                config: {},
                starX: '',
                starY: '',
                editingConfig: {

                    title: '编辑组件（分类目录）',
                    pages: {
                        '常规': {
                            title: {
                                config: {
                                    text: '组件标题',
                                },
                                component: 'dialog/text',
                            },
                            type: {
                                config: {
                                    text: '分类列表',
                                },
                                component: 'dialog/editing/classifyList',
                            },
                        },
                        '高级': {
                            totalModule: {
                                config: {
                                    text: '全站模块：',
                                    radio: [{
                                        name: '启动',
                                        value: '0'
                                    },
                                        {
                                            name: '停用',
                                            value: '1'
                                        }
                                    ]
                                },
                                component: 'dialog/radio'
                            },
                            classification: {
                                config: {
                                    text: '分类图标：',
                                    radio: [{
                                        name: '显示',
                                        value: '0'
                                    },
                                        {
                                            name: '隐藏',
                                            value: '1'
                                        }
                                    ]
                                },
                                component: 'dialog/radio'
                            },
                            Lower: {
                                config: {
                                    text: '有下级菜单时：',
                                    radio: [{
                                        name: '上级菜单可点击',
                                        value: '0'
                                    },
                                        {
                                            name: '不可点击',
                                            value: '1'
                                        }
                                    ]
                                },
                                component: 'dialog/radio'
                            },
                            Expansion: {
                                config: {
                                    name: '展开方式:',
                                    selected: '0',
                                    radio: [{
                                        name: '点击展开',
                                        value: '0'
                                    },
                                        {
                                            name: '滑动展开',
                                            value: '1'
                                        }
                                    ],
                                    showList: {
                                        name: '默认展开',
                                        value: '0',
                                        radio: [{
                                            name: '是',
                                            value: '0',
                                            imgSrc: './images/components/Expansion_true.png'
                                        },
                                            {
                                                name: '否',
                                                value:
                                                    '1',
                                                imgSrc: './images/components/Expansion_false.png'
                                            },
                                        ],
                                    },
                                    imgSrc: './images/components/Expansion.png'
                                },
                                component: 'dialog/editing/chassifyShow'
                            },
                        },
                    },
                },
            }
        },
        watch: {
            'link.type'(v) {
                this.model.link.type = v

            },
            'model.link.type'(v) {
                // alert('changed:' + v);
            },
            'model.link': {
                handler(v) {
                    this.$forceUpdate();
                },
                deep: true,
            },
            domain(v) {
                this.model.link.domain = v;
            }
        },
        computed: {
            styleConfig() {
                let x = this.config.style;
                if (!x)
                    x = {
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%'
                    };
                return x;
            },
            iconStyle() {
                let x = {
                    'background-image': 'url(' + this.icon + ')',
                    'background-size': '100% 100%',
                };
                return x;
            },
            selectedLink: {
                get() {
                    if (this.model)
                        return this.model.link.local;
                    return null;
                },
                set(v) {
                    this.model.link.local = v;
                },
            },
            linkList() {
                let x = [];
                switch (this.selectedLinkType) {
                    case '导航':
                        x = this.navList;
                        break;
                    case '栏目':
                        x = this.naviList;
                        break;
                    case '分类':
                        x = this.goodsList;
                        break;
                    case '商品详情':
                        x = this.goodsInfo;
                        break;
                }
                return x;
            },
            naviList() {
                // let list = {};
                let x = app.firstParentId;
                let result = {};
                x.forEach(e => {
                    let linkUrl = '';
                    if (e.columnCode == 'custom') {
                        linkUrl = e.linkUrl;
                    } else {
                        linkUrl = e.id;
                    }
                    // console.log(e)
                    if (e.parentId == 0) {
                        if (result[e.menuId]) {
                            result[e.menuId].splice(0, 0, {
                                name: e.name,
                                key: e.menuId,
                                menuId: e.menuId,
                                link: linkUrl,
                            });
                        } else {
                            result[e.menuId] = [{
                                name: e.name,
                                key: e.menuId,
                                menuId: e.menuId,
                                link: linkUrl,
                            }];
                        }
                    } else {
                        if (result[e.parentId]) {
                            result[e.parentId].push({
                                name: '--' + e.name,
                                key: e.menuId,
                                menuId: e.menuId,
                                link: linkUrl,
                            });
                        } else {
                            result[e.parentId] = [{
                                name: '--' + e.name,
                                key: e.menuId,
                                menuId: e.menuId,
                                link: linkUrl,
                            }];
                        }
                    }
                    // console.log(JSON.stringify(result))
                });
                let r = [];
                for (v in result) {
                    r = r.concat(result[v]);
                }
                // console.log(r);
                return r;
            },

        },
        beforeMount() {
            if (!this.model.link) {
                this.model.link = {};
            }
            if (this.model.link.type == null) {
                this.model.link.type = 1;
            }

            // console.log(' link create');
        },
        mounted() {
            console.log('对话框挂载');
            setTimeout(() => {
                $('#dialog').draggable({
                    handle: '#DialogTitle'
                });
            });
            let self = this;
            this.domain = this.model.link.domain == undefined ? 'http://' : this.model.link.domain;

            if (app.toSessionStorage('webcode') != 'SHOW') {
                self.linkTypeOptions = ['栏目', '导航', '分类', '商品详情'];
            }
            this.link.type = this.model.link.type;
            app.loadGoodsNav({
                userId: app.toSessionStorage('userId'),
                webcode: app.toSessionStorage('webcode')
            }, (arr) => {
                this.navList = self.getInnerLink(arr);
            });
            app.loadGoodsInfo({
                userId: app.toSessionStorage('userId'),
                type: '2'
            }, (arr) => {
                this.goodsList = self.getInnerLink(arr);
            });
            app.loadGoodsInfo({
                userId: app.toSessionStorage('userId'),
                type: '3'
            }, (arr) => {
                this.goodsInfo = self.getInnerLink(arr);
            });

            if (!this.model.link.selectedLinkType) {
                this.selectedLinkType = "栏目";
            } else {
                this.selectedLinkType = this.model.link.selectedLinkType;
            }
        },
        methods: {
            open(callback) {
                this.callback = callback;
                //setTimeout可以保证在mounted后再行渲染

                this.visible = true;
            },
            setModel(model) {
                this.model = JSON.parse(JSON.stringify(model));
            },
            setData(id) {
                let self=this;
                app.classifyLook((res) => {
                    let data = res.data.catalogueList;
                    self.name = data.name;
                    self.id = data.id;
                    self.linkType = parseInt(data.linkType);
                    self.localLink = data.localLink;
                    self.localLinkName = data.localLinkName;
                    self.customLink = data.customLink;
                    if(data.upChannel!=0)  self.upChannel = data.upChannel;
                    self.blankYn = data.blankYn;
                    self.icon = data.icon;
                    self.webId = data.webId;
                }, () => {
                }, id)
            },
            ok() {
                let self = this;
                if (self.name !== '' && self.linkType !== '' && self.icon !== '') {
                    if (self.linkType === 0) {
                        if (self.localLink !== '') {
                            this.classifyAdd();
                            return;
                        }
                    } else if (self.linkType === 1) {
                        if (self.customLink !== '') {
                            this.classifyAdd();
                            return;
                        }
                    }
                }
                this.$alert('请将必要条件输入完', '错误', {
                    confirmButtonText: '确定',
                });
            },
            classifyAdd() {
                let self = this;
                if (self.upChannel === '') self.upChannel = 0;
                let data = {
                    name: self.name,
                    id: self.id,
                    linkType: self.linkType,
                    localLink: self.localLink,
                    customLink: self.customLink,
                    upChannel: self.upChannel,
                    blankYn: self.blankYn,
                    icon: self.icon,
                    webId: self.webId,
                    localLinkName:self.localLinkName,
                };
                app.classifyAdd(data, () => {
                    showTips('添加数据成功');
                }, () => {
                    showTips('添加数据失败');
                    return;
                });
                this.goBack()
            },
            goBack() {
                let self = this;
                loader.createVue('dialog/dialog', dialogVue => {
                    self.editDialog = dialogVue;
                    self.editDialog.setModel(self.model);
                    self.editDialog.setConfig(this.editingConfig);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(() => {
                        self.$forceUpdate();
                    });
                });
            },
            cancel(event) {
                this.visible = false;
                event.stopPropagation();
                this.goBack();
            },
            open(res) {
                this.visible = true;
            },
            changeType() {
                this.model.link.selectedLinkType = this.selectedLinkType;
                if (this.linkList.length == '0') {
                    this.model.link.local = '';
                } else {
                    this.model.link.local = this.linkList[0].link;
                }
            },
            getInnerLink(arr) {
                let arr1 = [];
                arr.forEach(e => {
                    let obj = {
                        name: e.name,
                        link: e.url
                    }
                    arr1.push(obj);
                })
                return arr1;
            },
            setConfig(config) {
                this.config = config;
                setTimeout(() => {
                    for (let k in this.config.pages) {
                        let contentVue = this.$refs[k];
                        $(contentVue).empty();
                        let c = config.pages[k];
                        let p;
                        for (let ck in c) {
                            //加载内容vue
                            if (c[ck].component) {
                                if (p)
                                    p = p.then(() => {
                                        return loader.createVue(c[ck].component, v => {
                                            this.append(v, c, ck, contentVue);
                                        });
                                    });
                                else
                                    p = loader.createVue(c[ck].component, v => {
                                        this.append(v, c, ck, contentVue);
                                    })
                            } else {
                                if (ck != 'check')
                                    throw ck + ' 没有定义component'
                            }
                        }
                    }
                });
            },
            append(v, c, ck, contentVue) {
                if (v.$props == null) {
                    throw '组件' + c[ck].component + '必须定义props'
                }
                if (c[ck].config)
                    v.$props.config = c[ck].config;
                v.$props.model = this.model;
                v.$props.key = ck;
                loader.append(contentVue, v);
            },
            selectImage() {
                let self = this;
                loader.loadImageDialog({
                    model: {
                        src: self.icon,
                    },
                    callback(model) {
                        self.loading = true;
                        self.icon = model.src;
                        setTimeout(() => {
                            self.loading = false;
                        }, 1000);
                    },
                    selectChanged(selected, item, index) {
                    },
                    multiselect: false,
                })
            },
        }
    }
});
