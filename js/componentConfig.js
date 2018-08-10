/**
 * 全局组件配置单，所有组件存放在/components文件夹下，会自动加载同名html和js作为vue组件
 * 调用方式是使用 <v-组件名>作为标签
 * 比如 <v-palette-item  :model='数据源'></v-palette-item>
 * 'group-container','edit-container',要确定最后加载以保证所引用的全局组件已经生成
 */
define(() => {
    return [
        'widget/cart-item', 'widget/menu-item', 'widget/submenu', 'widget/navi', 'widget/hr-line', 'widget/hover-image', 'header/nav-container', 'header/navigation', 'tools/modulelist', 'tools/palette-item', 'tools/tpl', 'tools/my-tpl', 'lantern', 'cptborder', 'href', 'header/theme', 'dialog/text', 'save-template', 'header/header-left', 'header/header-center', 'header/header', 'banner-container', 'page-navi', 'page-navi-mobile', 'nav', 'loading', 'logo', 'footer/mobile-footer', 'group-container', 'edit-container'
    ];
});