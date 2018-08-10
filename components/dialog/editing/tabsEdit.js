define([], () => {
    return {
        props: ['model', 'key'],
        methods: {
            moveUp(index, rows){
                let arr = this.model[this.key];

                if (index > 0) {
                    let t = arr[index - 1];
                    arr.splice(index - 1, 1);
                    arr.splice(index, 0, t);
                }
            },
            moveDown(index, row){
                let arr = this.model[this.key];
                if (index < arr.length - 1) {
                    let t = arr[index];
                    arr.splice(index, 1);
                    arr.splice(index + 1, 0, t);
                }
            },
            handleDelete(index, row){
                let arr = this.model[this.key];
                arr.splice(index, 1);
            },
        },
    };
});