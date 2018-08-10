define(['vueLoader'], (loader) => {
    return {
        data() {
            return {
                model: {},
                config: {},
                old: {},
                visible: true,
                activeTab: '常规',
                parent: {},
            }
        },
        components: {
            commtab: loader.load('dialog/setting/dialog-comm-tab'),
            titletab: loader.load('dialog/setting/dialog-title-tab'),
            styletab: loader.load('dialog/setting/dialog-style-tab'),
            animtab: loader.load('dialog/setting/dialog-anim-tab'),
        },
        mounted() {
            let self = this;
            $(this.$el).draggable({
                handle: '#' + self.dialogId,
            });
        },
        computed: {
            dialogId() {
                return 'settingDialog_' + this._uid
            }
        },
        methods: {
            handleClick() {},
            _reset() {
                let temp = JSON.parse(JSON.stringify(this.old));
                for (k in temp) {
                    this.model[k] = temp[k];
                }
                this.parent.$forceUpdate();
            },
            setModel(model) {
                this.model = model;
                this.old = JSON.parse(JSON.stringify(model));
            },
            setConfig(config) {
                this.config = config;
            },
            setParent(parent) {
                this.parent = parent;
            },
            open() {
                this.visible = true;
            },
            reset() {
                for (let k in this.old) {
                    this.model[k] = this.old[k];
                }
            },
            close() {
                this.visible = false;
            }
        }
    }
});