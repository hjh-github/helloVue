define([], () => {

    return {
        props:['themecolor','othertheme'],
        methods: {
            setThemecolorfn: function (event) {
                // 设置网站主题颜色
                let _this = event.srcElement.dataset.value;
                // 连续点击同一个跳出方法
                if (this.themecolor == _this) {
                    return false;
                }
                app.themecolor = _this;
            },
            setOtherthemeFn: function () {
                app.othertheme = this.othertheme;
                app.themecolor = this.othertheme;
            },
        }
    }
});