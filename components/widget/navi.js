define([], () => {
    return {
        props: {
            model: {
                default: {},
            }
        },
        data(){
            return {
                menuVisible: false,
                hover: false,
                scrollTop: 0,
            }
        },
        computed: {
            titleStyle(){
                let x = {
                    'font-family': '微软雅黑',
                    'font-size': '.5rem',
                    'text-align': 'center',
                };
                switch (this.model.type) {
                    case 0:
                        x['background-color'] = this.model['background-color'];
                        x.color = 'white';
                        x['font-family'] = '微软雅黑';
                        x['font-size'] = '.5rem';
                        break;
                    case 1:
                    case 2:
                    case 3:
                        x['background-color'] = this.model.color1;
                        x.color = 'white';
                        break;
                }

                return x;
            },
            menuStyle(){
                let x = {
                    'transform': 'translateY( -' + this.scrollTop + 'px)',
                    'font-family': '微软雅黑',
                    'font-size': '.4rem',
                };
                switch (this.model.type) {
                    case 0:
                        x['background-color'] = 'white';
                        break;
                    case 1:
                        x['background-color'] = this.model.color1;
                        x.color = 'white';
                        break;
                    case 2:
                    case 3:
                        x.color = 'black';
                        x['background-color'] = "#F1f1f1";
                        break;
                }
                return x;

            },
        },
        mounted(){
            this.scrollTop = app.getScrollTop();
            window.addEventListener('scroll', (v) => {
                this.scrollTop = app.getScrollTop();
            });
        },
        methods: {

            showMenu(){
                this.menuVisible = !this.menuVisible;
            },
        },
    }
});