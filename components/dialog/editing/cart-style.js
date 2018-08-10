define([], () => {
    return {
        props: {
            model: {
                default: {}
            },
            key: {},
        },
        mounted(){
            if (this.model.bgStyle) {
                this.apply(this.temp1);
                this.apply(this.temp2);
                this.apply(this.temp3);
                this.apply(this.temp4);
                this.apply(this.temp5);
            }
        },

        data(){
            let self = {
                bgStyle: {
                    'background-color': '#2c2c2c',
                },
                style: {
                    width: '180px',
                    height: '40px',
                },
                title: '我的购物车',
            };
            return {
                bgStyle: self.bgStyle,
                temp1: {
                    style: self.style, title: self.title, type: 0,
                    bgStyle: self.bgStyle,
                },
                temp2: {
                    style: self.style, title: self.title, type: 1,
                    bgStyle: self.bgStyle,
                },
                temp3: {
                    style: self.style, title: self.title, type: 2,
                    bgStyle: self.bgStyle,
                },
                temp4: {
                    style: self.style, title: self.title, type: 3,
                    bgStyle: self.bgStyle,
                },
                temp5: {
                    style: self.style, title: self.title, type: 4,
                    bgStyle: self.bgStyle,
                },
                config: [
                    '#FA3941',
                    "#FA41A2"
                    ,
                    "#A70000"
                    ,

                    "#FF813F"
                    ,

                    "#FF9100"
                    ,

                    "#51AC21"
                    ,

                    "#02ACBF"
                    ,

                    "#0776C4"
                    ,

                    "#1D50AE"
                    ,

                    "#00A0F1"
                    ,

                    "#2c2c2c"


                ]
            }
        },
        created(){
            if (!this.model.type)
                this.model.type = 0;
        },
        methods: {
            apply(temp){
                temp.bgStyle = this.model.bgStyle;
                temp.title = this.model.title;
                temp.style = this.model.style;
            },
            changeColor(c){
                this.model.bgStyle['background-color'] = c;
                this.bgStyle['background-color'] = c;
            }
        },
    }
});