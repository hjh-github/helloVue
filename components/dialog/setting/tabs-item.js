define(['vueLoader'], (loader) => {
    return {
        props: ['model', 'parent'],
        data(){
            return {

                fonts: [
                    "宋体",
                    "新细明体",
                    "仿宋_GB2312",
                    "微软雅黑",
                    "隶书",
                    "幼圆",
                    "华文楷体",
                    "方正舒体",
                    "华文彩云",
                    "华文行楷",
                    "华文宋体",
                    "楷体",
                    "黑体",
                    "Arial",
                    "Tahoma",
                    "impact",
                    "Arial Serif",
                    "Georgia",
                    "Garamond",
                ],

            }
        },
        computed: {
            radius: {
                get(){
                    let ra = this.model.tabStyle['border-radius'];
                    return parseInt(ra);
                },
                set(v){
                    this.model.tabStyle['border-radius'] = v
                },
            },
        },
        components: {
            fontedit: loader.load('dialog/setting/font-edit'),
            bgedit: loader.load('dialog/setting/background-edit'),
        },
        watch: {},
        methods: {
            restore(keys){
                // this.model.tabStyle[key] = app.tabsConfig.tabStyle[key];
                for (k in keys) {
                    keys[k].forEach(e => {
                        this.model[k][e] = app.tabsConfig[k][e];
                    });
                }
            },
        },
    };
});