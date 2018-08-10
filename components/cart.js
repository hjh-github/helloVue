define(['vueLoader'], (loader) => {
    return {
        props: {
            model: {
                default: {
                    title: '我的购物车',
                    type: 0,
                    bgStyle: {
                        'background-color': '#424242',
                    },
                    titleBarStyle: {
                        show: false,
                    },
                    style: {
                        width: '160px',
                        height: '45px',
                        overflow:'none',
                    },
                    titleStyle: {
                        color: '#fff',
                        'font-size': 18,
                    },
                    items: [],
                }
            },
            settingConfig: {},
            editingConfig: {
                default: {
                    title: '添加模块(购物车)',
                    pages: {
                        '常规': {
                            title: {
                                config: {
                                    text: '文本内容',
                                    placeholder: '请填写购物车描述',
                                },
                                component: 'dialog/text',
                            },
                            style: {
                                component: 'dialog/editing/cart-style',
                            }
                        }
                    },
                }
            },
        },
        methods: {
            mouseEnter(){
                this.menuVisible = true;
                clearTimeout(this.timeout);
            },
            mouseLeave(){
                this.timeout = setTimeout(() => {
                    this.menuVisible = false;
                }, 300);
            },
        },
        data(){
            return {
                timeout: -1,
                menuVisible: false,
                loading: false,
                items: [],
                scrollTop: 0,
                argShowConfig: {
                    type: 0,
                    columns: [{
                        key: 'name',
                        visible: true,
                        fixed: true,
                        prefix: '',
                        style: {},
                        label: '产品名字'
                    }, {
                        key: 'price',
                        visible: true,
                        fixed: true,
                        prefix: '¥',
                        style: {
                            'font-size': '14px',
                            'color': '#9DCAEE',
                            'line-height': '20px',
                        },
                        label: '价格(交易价格)'
                    },
                    ],
                },

            }
        },
        computed: {
            totalPrice(){
                let x = 0;
                if (this.items) {
                    this.items.forEach(item => {
                        x += parseInt(item['price']);
                    });
                }
                return x;
            },
            menuStyle(){
                let x = {
                    'transform': 'translateY( -' + this.scrollTop + 'px)',
                };
                return x;
            },
        },
        watch(){

        },
        created(){
            //临时代码

            this.model.items = [683, 684, 685];
            this.loading = true;
            let i = 0;
            let self = this;
            self.loading = true;
            this.model.items.forEach(id => {
                app.loadProductSummary({
                    id
                }, (result) => {
                    if (result) {
                        self.items.push(result);
                    }
                    if (++i == self.model.items.length) {
                        self.loading = false;
                    }
                });
            })

        },
        mounted(){
            this.scrollTop = app.getScrollTop();
            window.addEventListener('scroll', (v) => {
                this.scrollTop = app.getScrollTop();
            });
        },
    }
});