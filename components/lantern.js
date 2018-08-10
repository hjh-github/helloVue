define([], () => {
    return {
        data(){
            return {
                visible: false,
                model: {},
                index: 0,
            };
        },
        computed: {
            arrow(){
                if (this.model.images && this.model.images.length > 1) {
                    return 'always';
                }
                return 'never';
            },
            indicator(){
                if (this.model.images && this.model.images.length > 1) {
                    return 'outside';
                }
                return 'none';
            }
        },
        methods: {
            open(model, index){
                this.model = JSON.parse(JSON.stringify(model));
                this.visible = true;
                this.index = index;
            }
        },
        mounted(){
            window.lantern = this;
        },
    }
});