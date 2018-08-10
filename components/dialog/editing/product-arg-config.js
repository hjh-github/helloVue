/**
 * Created by zcn on 2018/3/18.
 */
define([], () => {
    return {
        props: {
            model: {
                default: {

                },
            },
            config: {},
            key: '',
        },
        data() {
            return {

            }
        },
        mounted() {
            this.model.argShowConfig.columns[1].label = app.recoverSymbol(this.model.argShowConfig.columns[1].label)
            this.model.argShowConfig.columns[2].label = app.recoverSymbol(this.model.argShowConfig.columns[2].label)
        },
        methods: {
            up(index, row) {
                let target = this.model[this.key].columns;
                let curr = target[index];
                let prev = target[index - 1];

                this.$set(target, index - 1, curr);
                this.$set(target, index, prev);
            },
            down(index, row) {
                let target = this.model[this.key].columns;
                let curr = target[index];
                let next = target[index + 1];

                this.$set(target, index, next);
                this.$set(target, index + 1, curr);
            }
        }

    }
});