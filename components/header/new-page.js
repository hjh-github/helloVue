define(['vueLoader'], (loader) => {
    return {
        props: {
            navList: {
                default: {}
            },
            model: {
                default: {
                    link: {
                        type: 0,
                        local: '',
                        net: '',
                        open: '',
                    },
                }
            }
        },
        data() {
            return {
                loading: false,
                newNavList: [],
                navType: [{
                    name: '自定义',
                    code: 'custom',
                    id: '0'
                }, {
                    name: '新闻列表',
                    code: 'news',
                    id: '1'
                }, {
                    name: '产品展示',
                    code: 'pro',
                    id: '2'
                }, {
                    name: '空白',
                    code: 'blank',
                    id: '3'
                }],
                showTips: false,
                pageInfo: {
                    columnCode: '',
                    parentId: null,
                    target: 0,
                    name: null,
                    linkUrl: null,
                },
                httpHeader: 'https://',
            }
        },
        watch: {
            'pageInfo.name'() {
                this.showTips = false;
            }
        },
        mounted() {
            app.isUpdatePage=true;
        },
        computed: {
            navList1() {
                let old = JSON.parse(JSON.stringify(this.navList));
                let obj = {
                    menuId: 0,
                    name: '无'
                }
                old['0'] = obj;
                return old;
            }
        },
        components: {
            addlink: loader.load('dialog/editing/addlink'),
        },
        methods: {
            setModel(model) {
                this.pageInfo = model;
            },
            addLink(v) {
                app.isUpdatePage=false;
                let open='', link = v.link;
                if (link.type == 2) {
                    this.pageInfo.domain = link.domain;
                    this.pageInfo.linkUrl = link.domain+link.net;
                    this.pageInfo.linkType = 3;
                } else if (link.type == 1) {
                    this.pageInfo.linkUrl = link.local;
                    this.pageInfo.selectedLinkType=link.selectedLinkType;
                    this.pageInfo.linkType = 2;
                }
                if (link.open == '') open = 1;
                else if (link.open == '_blank') {
                    open = 2
                }
                this.pageInfo.target = open;
            },
            addNavigation() {
                let self = this;
                this.loading = true;
                if (this.pageInfo.name == null || this.pageInfo.name == '') {
                    this.$message.error('输入导航名称，再重试！');
                    setTimeout(() => {
                        this.loading = false;
                    }, 1000)
                } else if (this.pageInfo.columnCode == '') {
                    this.$message.error('请选择页面类型，再重试！');
                    setTimeout(() => {
                        this.loading = false;
                    }, 1000)
                } else if (this.pageInfo.columnCode == 'custom' && (this.pageInfo.linkUrl == null || this.pageInfo.linkUrl == '')) {
                    this.$message.error('请输入自定义链接，再重试！');
                    setTimeout(() => {
                        this.loading = false;
                    }, 1000)
                } else {
                    let pid = this.pageInfo.parentId;
                    this.pageInfo.linkUrl = this.pageInfo.linkUrl;
                    if (pid == 0) {
                        let l = Object.keys(self.navList1)
                        if (l.length > 8) {
                            this.$message.error('一级导航不可以超过8个哦！');
                            setTimeout(() => {
                                this.loading = false;
                            }, 100)
                            return false;
                        }
                    } else {
                        let l = this.getCate(pid);
                        if (l.length > 4) {
                            this.$message.error('二级导航不可以超过5个哦！');
                            setTimeout(() => {
                                this.loading = false;
                            }, 100)
                            return false;
                        }
                    }
                    this.$message.success('添加成功');
                    this.$parent.addNavigation(this.pageInfo);
                }
            },
            close() {
                app.isUpdatePage=false;
                this.$parent.closeNewPage();
            },
            log() {

            },
            getCate(pid) {
                // 获取指定上级栏目
                let res = [];
                app.firstParentId.forEach(e => {
                    if (e['parentId'] == pid) {
                        res.push(e);
                    }
                });
                return res;
            }
        },
    }
});