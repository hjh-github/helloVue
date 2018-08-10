define(['vueLoader'], (loader) => {
    return {
        props: {
            model: {
                default: {
                    link:{}
                }
            },
            setting: {
                default: {
                    config: {
                        def: 0,
                        bgStyle: 0
                    },
                }
            },
            settingConfig: {
                default: {
                    title: '导航编辑',
                    pages: {
                        '样式': {

                            'background-color': {
                                config: {
                                    text: '背景颜色'
                                },
                                component: 'dialog/color-picker'
                            },
                            'color': {
                                config: {
                                    text: '文本颜色'
                                },
                                component: 'dialog/color-picker'
                            },
                            /*'active-text-color': {
                                config: {
                                    text: '选中颜色'
                                },
                                component: 'dialog/color-picker'
                            },*/
                        },
                        '链接列表':{
                            'navList': {
                                config: {
                                    text:'链接'
                                },
                                component: 'dialog/editing/mobileFooterList'
                            }
                        },
                    },
                },
            }
        },
        data() {
            return {
                pages: app.firstParentId,
                imgSrc:'',
                showBtns:false,
                canvasStyle:{},
                setting:{},
            };
        },
        computed: {

            webName() {
                let n = '';
                let pageid = '';
                if(app.getRequest().pageid==undefined || app.getRequest().pageid == null){
                    pageid=app.toWebsessionStorage('firstPage');
                }else{
                    pageid=app.getRequest().pageid;
                }
                app.toWebsessionStorage('allPageList').forEach(e => {
                    if (e.id == pageid) {
                        n = e.name;
                    }
                })

                return n;
            },

        },
        created(){

        },
        mounted() {
            if (this.pages) {
                this.treefy();
            }
            //全局注册
            app.navigation = this;
        },
        methods: {
            chanPage(id) {
                app.changePage(id);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            editNav() {
                let self = this;
                loader.createVue('dialog/dialog', dialogVue => {
                    self.editDialog = dialogVue;
                    self.editDialog.setModel(self.model);
                    self.editDialog.setConfig(self.settingConfig);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(model => {
                        for (let k in model) {
                            self.model[k] = model[k];
                        }
                    });
                });
            },
            treefy() {
                let self = this;
                let navList = self.model.navList;
                let footList =[
                    {
                        'name':'导航名称',
                        'imgSrc':'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-1.png',
                        'isShow':true,
                        'isUpdate':false,
                        'link': {
                            type: 0, //0-无 //1-本地 2-自定义
                            local: '',
                            open: '_blank',
                            net: '',
                        },
                    },
                    {
                        'name':'导航名称',
                        'imgSrc':'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-2.png',
                        'isShow':true,
                        'isUpdate':false,
                        'link': {
                            type: 0, //0-无 //1-本地 2-自定义
                            local: '',
                            open: '_blank',
                            net: '',
                        },
                    },
                    {
                        'name':'导航名称',
                        'imgSrc':'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-3.png',
                        'isShow':true,
                        'isUpdate':false,
                        'link': {
                            type: 0, //0-无 //1-本地 2-自定义
                            local: '',
                            open: '_blank',
                            net: '',
                        },
                    },
                    {
                        'name':'导航名称',
                        'imgSrc':'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-4.png',
                        'isShow':true,
                        'isUpdate':false,
                        'link': {
                            type: 0, //0-无 //1-本地 2-自定义
                            local: '',
                            open: '_blank',
                            net: '',
                        },
                    }
                ];

                self.model.navList = navList!='undefined' && navList.length>0?navList:footList;
            },
        }
    }
});