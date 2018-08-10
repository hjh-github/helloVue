define(['vueLoader'], (loader) => {
    return {
        components: {
            bgedit: loader.load('dialog/setting/background-edit'),
        },
        props: {
            model: {
                default: {
                    style: {},
                    def: {},
                }
            },
            parent: {},
            defaultStyles: {},
        },
        watch: {
            "model.def.defborder"(v){
                if (v) {
                    this.model.style['border-style'] = this.model.def['border-style'];
                    this.model.style['border-color'] = this.model.def['border-color'];
                    this.model.style['border-width'] = this.model.def['border-width'];
                    this.model.style['border-left'] = this.model.def['border-left'];
                    this.model.style['border-top'] = this.model.def['border-top'];
                    this.model.style['border-bottom'] = this.model.def['border-bottom'];
                    this.model.style['border-right'] = this.model.def['border-right'];
                }
            },
            //这句也别删除
            'model.style': {
                // deep:true,
                // handler(){
                //     this.parent.$forceUpdate();
                // },
            },
        },
        methods: {
            colorChanged(v, model, key){
                if ('inherit' == v) {
                    model[key] = v;
                }
            },
            change(key, e){
                key = 'border-' + key;
                let v = this.model.style[key];
                if (v != 'none') {
                    // e.srcElement.style.opacity = 0;
                    this[key] = this.model.style[key];
                    this.model.style[key] = 'none';
                } else {
                    if (this[key])
                        this.model.style[key] = '';
                    else {
                        this.model.style[key] =
                            this.model.style['border-width'] + 'px ' +
                            this.model.style['border-style'] + ' ' +
                            this.model.style['border-color']
                    }
                }
            },
            borderButtonStyle(key){
                key = 'border-' + key;

                return {opacity: this.model[key] == 'none' ? 0 : 1};
            },
            resume(config, keys){
                for (k in keys) {
                    keys[k].forEach(e => {
                        this.model[k][e] = app[config][k][e];
                    });
                }
            },

            restore(keys){
                if (this.defaultStyles)
                    for (k in keys) {
                        keys[k].forEach(e => {
                            this.model[k][e] = this.defaultStyles[k][e];
                        });
                    }
            },
        },
        mounted(){
            // let self = this;
            // $(this.$refs.opacityslider).slider({
            //     max: 100,
            //     min: 0,
            //     step: 1,
            //     value: self.opacity,
            //     slide(e, u){
            //         self.opacity = u.value;
            //     },
            // });
            // let str = self.model.style['border-radius'];
            // let index = str.search(/\d/);
            // let borderRadius = parseInt(str.charAt(index));
            // $(this.$refs.radiusslider).slider({
            //     max: 20,
            //     min: 0,
            //     step: 1,
            //     value: borderRadius,
            //     slide(e, u){
            //         self.model.style['border-radius'] = u.value + 'px';
            //     },
            // });
        },
        computed: {
            opacity: {
                get(){
                    return Math.round(this.model.style.opacity * 100);
                },
                set(v){
                    this.model.style.opacity = v / 100;
                },
            },
            radius: {
                get(){
                    let ra = this.model.style['border-radius'];
                    ra = ra.substr(0, ra.lastIndexOf('px'));
                    return parseInt(ra);
                },
                set(v){
                    this.model.style['border-radius'] = v + 'px'
                },
            },
            defheight: {
                get(){
                    return this.model.def.defheight;
                },
                set(v){
                    if (v)
                        this.model.style.height = this.model.def.height;
                    this.model.def.defheight = v;
                }
            },
            seheight: {
                get(){
                    return this.model.def.seheight;
                },
                set(v){
                    if (v)
                        this.model.style.searchH = this.model.def.searchH;
                    this.model.def.seheight = v;
                }
            },

            defmargin: {
                get(){
                    return this.model.def.defmargin;
                },
                set(v){
                    if (v) {
                        this.model.style['margin-top'] = this.model.def['margin-top'];
                        this.model.style['margin-bottom'] = this.model.def['margin-bottom'];
                        this.model.style['margin-left'] = this.model.def['margin-left'];
                        this.model.style['margin-right'] = this.model.def['margin-right'];
                    }
                    this.model.def.defmargin = v;
                }
            },
        }
    };
});