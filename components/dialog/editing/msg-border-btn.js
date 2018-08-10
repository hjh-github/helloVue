define([], () => {
    return {
        props: {
            model: {
                default: {}
            },
            config: {
                default: {}
            },
            key: {}
        },
        data() {
            return {
                btnOpts: [
                    "line-item has-border blue-color",
                    "line-item no-border blue-color",
                    "line-item has-border-radius blue-color",
                    "line-item has-border yellow-color",
                    "line-item no-border yellow-color",
                    "line-item has-border-radius yellow-color",
                    "line-item has-border red-color",
                    "line-item no-border red-color",
                    "line-item has-border-radius red-color",
                ],
                btnOptsMobile: [
                    "mobile-btn-1",
                    "mobile-btn-2",
                    "mobile-btn-3",
                    "mobile-btn-4",
                ],
            }
        },
        methods: {
            btnClass(e) {
                let btnClass = e.target.className
                let pel = $(e.target).parent()
                if (this.model.type == 1) {
                    if (btnClass == "line-item has-border blue-color" || btnClass == "line-item has-border yellow-color" || btnClass == "line-item has-border red-color") {
                        btnClass = btnClass.replace("has-border", "has-border-two")
                    }
                    pel.addClass('cur-img').siblings().removeClass("cur-img")
                    this.model.buttonImg = btnClass
                } else if (this.model.type == 0) {
                    this.model.buttonImg = btnClass
                }
            }
        },
        watch: {
            'model.type' (e) {
                if (this.model.type == 1) {
                    if (this.model.buttonImg == "line-item has-border blue-color" || this.model.buttonImg == "line-item has-border yellow-color" || this.model.buttonImg == "line-item has-border red-color") {
                        this.model.buttonImg = this.model.buttonImg.replace("has-border", "has-border-two")
                    }
                }
            }
        }
    }
});