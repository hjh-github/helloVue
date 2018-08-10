define(['vueLoader'], (loader) => {
    return {
        props: ['model'],
        create(){

        },
        mounted(){
            var el = $(this.$el);
            let self = this;
            /*
             *   组件区分为组件+通栏
             *   组件 --> 组件
             *   通栏 --> 可添加在内容区，作为一个通栏容器，可以接收组件放置
             */
            if (!el.hasClass('group-container'))
                el.draggable({
                    appendTo: "body",
                    scroll: false,
                    helper: "clone",
                    opacity: 0.7,
                    zIndex: 999,
                    start(e, ui) {
                        // 拖拽时，助手的样式
                        ui.helper.addClass('draging');
                        self.start(e, ui);
                    }
                });
            else
                el.draggable({
                    appendTo: "body",
                    scroll: false,
                    helper: "clone",
                    opacity: 0.7,
                    zIndex: 999,
                    connectToSortable: '.sortContainer',
                    /*
                     *   #editContent 可以接收通栏的内容区
                     * $('.sortContainer').sortable({
                     items: ".moduleItem")}
                     */
                    start(e, ui) {
                        // 拖拽时，助手的样式
                        ui.helper.addClass('draging');

                        self.start(e, ui);
                    }
                });
        },
        methods: {
            start(e, ui){
                // console.log('drag start',e,ui);

                // ui.helper.model = JSON.parse(JSON.stringify(this.model));
                ui.helper.model=this.model;
            },
            handleclick(){

            }
        },
        components: {}
    }
});



