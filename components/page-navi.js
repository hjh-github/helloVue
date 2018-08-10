define([], () => {
    return {
        props: {
            model: {
                default: {
                    style:{
                        width:'600px',
                        height:'60px',

                    },
                    titleBarStyle: {
                        'background-color': 'inherit',
                        'background-image': '',
                        height: 0,
                        show: true,
                        // 'border-bottom': '',
                        // 'border-color': '',
                        useDefault: true,
                    },
                }
            },
            settingConfig: {
                default: {},
            }
        },
        data() {
            return {
                mobileNav:false,
                pages:app.firstParentId,
                activeIndex: 0,
                activeIndex2: 0,
                navList: [],
            };
        },
        mounted(){
            if(this.pages){
                this.treefy();
            }
            //全局注册
            app.navigation = this;
        },
        methods: {
            chanPage(id){
                app.changePage(id);
            },
            handleSelect(key, keyPath) {
                // console.log(key, keyPath);
            },
            treefy(){
                let list = {};


                let r = JSON.parse(JSON.stringify(app.firstParentId));

                let result = [];

                r.forEach(e => {
                    if (list[e.menuId]) {
                        e.children = list[e.menuId].children;
                    }
                    list[e.menuId] = e;

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
                this.navList = result;

            },
        }
    }
});