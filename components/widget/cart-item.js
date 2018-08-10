define(['vueLoader'], (loader) => {
    return {
        props: {
            model: {
                default: {
                    type: 0,
                    title: '我的购物车',
                    titleBarStyle: {
                        show: false,
                    },
                    style: {
                        width: '160' + app.unit,
                        height: '45' + app.unit,
                    },
                    titleStyle: {
                        color: '#fff',
                        'font-size': 18,
                    },
                }
            },
        },
        computed: {
            items(){
                if (!this.model.items) {
                    this.model.items = [];
                }
                var x = this.model.items.length;
                return x;
            },
            cartStyle(){
                if (!this.model.titleStyle) {
                    this.model.titleStyle = {
                        'font-size': '14' + app.unit,
                    }
                }
                if (!this.model.bgStyle) {
                    this.model.bgStyle = {
                        'background-color': '20' + app.unit,
                    }
                }
                let x = {
                    'font-size': this.model.titleStyle['font-size'] + app.unit,
                    'width': this.model.style['width'],
                    'height': this.model.style['height'],
                };

                switch (this.model.type) {
                    case 0:
                        x['background-color'] = this.model.bgStyle['background-color'];
                        x['border-radius'] = '0' + app.unit;
                        break;
                    case 1:
                        x['background-color'] = '#FFF';
                        x['border'] = '1px solid #ccc';
                        break;
                    case 2:
                        x['background-color'] = '#4c4c4c';
                        break;
                    case 3:
                        x['background-color'] = '#FFF';
                        x['border'] = '1px solid #ccc';
                        x['border-radius'] = '15' + app.unit;
                        break;
                    case 4:
                        x['background-color'] = '#4c4c4c';
                        x['border-radius'] = '15' + app.unit;
                        break;
                }
                return x;
            },
            textContainerStyle(){

                let x = {};

                switch (this.model.type) {
                    case 0:
                        x['float'] = 'right';
                        break;
                    case 1:
                        x['float'] = 'right';
                        break;
                    case 2:
                        x['float'] = 'left';
                        break;
                    case 3:
                        x['float'] = 'left';
                        break;
                    case 4:
                        x['float'] = 'left';
                        break;
                }
                return x;
            },
            textStyle(){
                let x = {};

                switch (this.model.type) {
                    case 0:
                        x['color'] = '#fff';
                        break;
                    case 1:
                        x['color'] = '#444';
                        break;
                    case 2:
                        x['color'] = '#fff';
                        break;
                    case 3:
                        x['color'] = '#444';
                        break;
                    case 4:
                        x['color'] = '#fff';
                        break;
                }
                return x;
            },
            iconStyle(){
                let x = {};
                switch (this.model.type) {
                    case 0:
                        x['color'] = '#fff';
                        break;
                    case 1:
                        x['color'] = this.model.bgStyle['background-color'];
                        break;
                    case 2:
                        x['color'] = '#fff';
                        break;
                    case 3:
                        x['color'] = this.model.bgStyle['background-color'];
                        break;
                    case 4:
                        x['color'] = '#fff';
                        break;
                }
                return x;
            },

            iconBgStyle(){
                let x = {};
                switch (this.model.type) {
                    case 1:
                    case 3:
                        x['opacity'] = 0;
                        break;
                    case 2:
                        x['background-color'] = this.model.bgStyle['background-color'];
                        x['opacity'] = 1;
                        break;
                    case 4:
                        // x['width'] = '60%';
                        // x['height'] = '0';
                        // x['padding-top'] = '60%';
                        // x['border-radius'] = '50%';
                        // x['left'] = '20%';
                        // x['top'] = '10%';
                        x['opacity'] = 1;
                        x['background-color'] = this.model.bgStyle['background-color'];
                }
                return x;

            },
            iconContainerStyle(){
                let x = {};
                switch (this.model.type) {
                    case 0:
                    case 1:
                        x['float'] = 'left';
                        break;
                    case 2:
                    case 3:
                    case 4:
                        x['float'] = 'right';
                        break;
                }
                return x;

            },
            iconClass(){
                return {
                    'icon-gouwuche': this.model.type == 1,
                    'icon-gouwuche1': this.model.type == 0,
                    'icon-gouwuche2': this.model.type == 2,
                    'icon-gouwuche3': this.model.type == 3,
                    'icon-gouwuchekong': this.model.type == 4,
                }
            },
        },
        methods: {},
        data(){
            return {
                timeout: -1,
                menuVisible: false,
            }
        },
        mounted(){
        },
    }
});