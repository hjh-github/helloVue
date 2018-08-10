define([], () => {
    return {
        props: {
            model: {
                type: Object,
                default: {},
            },
            key: {},
            config: {
                type: String,
                default: {
                    text: '文字编辑：',
                    visible: true,
                }
            }
        },
        data() {
            return {
                ue: null,
            }
        },
        computed: {
            uid(){
                return 'ueditorId_' + this._uid;
            }
        },
        mounted(){
            setTimeout(() => {
            	let ue = UE.getEditor(this.uid, {
            	    toolbars: [
            	        [ 'fullscreen','source', '|',
						'bold', 'italic', 'underline', 'removeformat', 
						'formatmatch','|', 'forecolor','backcolor', 'cleardoc', '|', 'fontfamily', 'fontsize', '|',
						'justifyleft', 'justifycenter', 'justifyright','justifyjustify','lineheight']
            	    ],
            	    autoHeightEnabled: true,
            	    autoFloatEnabled: true
            	});
                let self = this;
                this.ue = ue;
                ue.ready(function () {
                    ue.setHeight(300);
                    //设置编辑器的内容
                    ue.setContent(app.recoverSymbol(self.model[self.key]));
                    //获取html内容，返回: <p>hello</p>
                    ue.addListener("contentChange", function () {
                        self.model[self.key] = ue.getContent();
                    });
                });
            });
        },
    }
});