define(['vueLoader'], (loader) => {
    return {
        data() {
            return {
                visible: false,
                activeTab: 'common',

            }
        },
        components: {
            'base-content': loader.load('dialog/setting/base-content'),
        },
        props: {
            tabs: {},
            model: {}
        },
        mounted() {
            // console.log(this.model)
        },
        watch: {
            activeTab(a) {
                console.log(a)
            }
        },
        methods: {
            reBase(t) {
                // console.log(t.name);
            },
            toTab(k) {
                this.activeTab = k;
            },
            _reset(k) {
                let old = JSON.parse(JSON.stringify(this.old));
                this.model[k] = old[k];
                this.$forceUpdate();
            },
            getModel(m) {
                this.model = m;
                this.old = JSON.parse(JSON.stringify(m));
            },
            open(callback) {
                this.visible = true;
            },
            setting(s) {
                this.tabs = s.barlist;
            }
        },
        computed: {
            isEdit(){
                return app.isPreview;
            }
        }
    };
});