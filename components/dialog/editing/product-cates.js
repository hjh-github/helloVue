define([], () => {
    return {
        props: ['model', 'key', 'config'],
        data(){
            return {
                cates: [],
                defaultProps: {
                    children: 'children',
                    label: 'name',
                },
            }
        },
        mounted(){
            /**
             * 校验this.model.allCates是否存在
             * resolve：使用
             * reject：通过接口获取全部分类列表
             */
            if (!this.model.allCates) {
                app.loadProductCate(-1, (r) => {
                    this.cates = app.treefy(r);
                    r.forEach(i => {
                        this.model[this.key].push(i.id);
                    });
                    this.model.allCates = this.cates;
                })
            } else {
                this.cates = this.model.allCates;
            }

        },
        methods: {
            handleCheckChange(data, checked, indeterminate) {
                /**
                 * data：当前节点
                 * checked:节点选中状态
                 * indeterminate：当前节点子树是否存在选中
                 * -->构造一个 包含带有本身checked状态的分类数组
                 */
                data.checked = checked;
                if (indeterminate)
                    data.checked = true;
                // 更新真实分类列表
                this.model.allCates = this.cates;
                // 更新列表keys 用于初始化勾选
                this.model.cates = this.$refs.tree.getCheckedKeys();
            },
        }
    }
});