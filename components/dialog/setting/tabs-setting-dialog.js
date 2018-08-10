define(['vueLoader'], (loader) => {
    return {
        components: {
            'tabsbar': loader.load('dialog/setting/tabs-bar'),
            'tabsitem': loader.load('dialog/setting/tabs-item'),
        },
        computed: {
            // dialogId(){
            //     return 'settingDialog_' + this._uid
            // }
        },
        mounted(){
            setTimeout(() => {
                $(this.$el).draggable({
                    handle: '#dialogId'
                });
            });

        },
        data(){
            return {
                visible: false,
                activeTab: '标签栏',
                old:null,
            }
        },
        methods: {
            _reset(){
                let temp = JSON.parse(JSON.stringify(this.old));
                for (k in temp) {
                    this.model[k] = temp[k];
                }
                this.parent.$forceUpdate();
            },
            setModel(model){
                this.model = model;
                this.old = JSON.parse(JSON.stringify(model));
            },
            setConfig(config){
                this.config = config;
            },
            setParent(parent){
                this.parent = parent;
            },
            open(){
                this.visible = true;
            },
            close(){
                this.visible = false;
            }
        },
    };
});