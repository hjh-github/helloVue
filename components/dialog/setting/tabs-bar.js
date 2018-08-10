define(['vueLoader'], (loader) => {
    return {
        props: ['model', 'parent'],
        data(){
            return {
            }
        },
        components: {
            bgedit: loader.load('dialog/setting/background-edit'),
            hcolor:loader.load('dialog/setting/hoverColor'),
        },
        methods: {
            restore(keys){
                // this.model.tabStyle[key] = app.tabsConfig.tabStyle[key];
                for (k in keys) {
                    keys[k].forEach(e => {
                        // console.log(keys[k])
                        this.model[k][e] = app.tabsConfig[k][e];
                    });
                }
            },
        },
        mounted(){
        }
    };
});