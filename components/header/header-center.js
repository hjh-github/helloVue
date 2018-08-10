define(['vueLoader'], (loader) => {
    return {
        props: {
            model: {},
            webcode: {},

        },
        data() {
            return {
                setStyle:false,
                setting: {
                    barlist: {
                        'common': {
                            id: 'common',
                            name:'常规',
                            config: {
                                tyep:'common'
                            }
                        },
                        'header': {
                            id: 'header',
                            name:'顶栏',
                        },
                        'banner': {
                            id: 'banner',
                            name:'横幅',
                        },
                        'body': {
                            id: 'body',
                            name:'内容',
                        },
                        'bottom': {
                            id: 'bottom',
                            name:'底栏',
                        }
                    }


                }
            }
        },
        methods: {
            //去到小后台
            gotoNewPage: function (shref) {
                window.location.href = shref;
            },
            baseConfig() {
                let self = this;
                loader.createVue('dialog/setting/base-area', dialogVue => {
                    dialogVue.getModel(self.model);
                    dialogVue.setting(self.setting)
                    loader.fill("#tempdialog", dialogVue);
                    dialogVue.open(callback =>{});
                });
            },

        }
    }
});