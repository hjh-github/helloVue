define([], () => {
    return {
        props: {
            model: {
                default: {},
            },
            pages: {
                default: {},
            },
            config: {},
            key: '',
        },
        data() {
            return {
                floorListIds:[],
            };
        },
        mounted(){
            app.loadFloorCate({}, (art) => {
                this.floorListIds=art;
                this.model.floorListIds = art;
            });
        },

        methods: {

        }
    }
});