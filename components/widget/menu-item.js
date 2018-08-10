define([], () => {
    return {
        props: {
            model: {
                default: {}
            },
        },
        data(){
            return {
                hover: false,
            }
        },
        computed: {
            menuStyle(){
                let x = {
                    color: this.model.color2,
                };

                return x;
            }
        },
    }
});