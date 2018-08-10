define([], () => {
    return {
        props: {
            model: {
                defaulte: {}
            }
        },
        computed: {
            mw() {
                let v = this.model.value;
                if (this.model.def)
                    v = 1200;
                return v;
            },
            leftLine() {
                return{
                    'margin-left':-this.mw/2-1 + 'px'
                }
            },
            rightLine() {
                return{
                    'margin-left':this.mw/2 + 'px'
                }
            },
        }
    }
})