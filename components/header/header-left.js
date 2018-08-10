define(['vueLoader'], (loader) => {
    return {
        props: ['model', 'webcode'],
        data(){
            return {
                showMenus: false,
                logo: 'images/logo.png'
            }
        },
        methods: {
            pageflag(){
                // 开关页面管理弹窗
                this.showMenus = !this.showMenus;
            },
            closeMenu(){
                this.showMenus = false;
            }
        },
        components: {
            'page-menus': loader.load('header/page-menus'),
        }
    }
});