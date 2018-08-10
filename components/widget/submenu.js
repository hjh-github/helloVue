define([], () => {
    return {
        props: {
            model: {
                default: {}
            },
            hasChild: {}
        },
        data(){
            return {
                hover: false,
                height: '2.5rem',
            }
        },
        computed: {
            menuStyle(){
                let x = {
                    height: this.height,
                };
                switch (this.model.type) {
                    case 0:
                        x['border-bottom'] = '1px solid #F2F2F2';
                        x['color'] = this.hover ? 'white' : 'black';
                        x['background-color'] = this.hover ? this.model.color1 : 'white';
                        break;
                    case 1:
                        x['border-top'] = '1px solid rgba(200,200,200,.2)';
                        x['border-bottom'] = '1px solid rgba(180,180,180,.2)';
                        x['opacity'] = this.hover ? .5 : 1;
                        break;
                    case 2:
                        x['border-top'] = this.hover ? '1px solid ' + this.model.color1 : '';
                        x['border-bottom'] = this.hover ? '1px solid ' + this.model.color1 : '1px solid rgba(200,200,200,.5)';
                        x['border-left'] = this.hover ? '1px solid ' + this.model.color1 : '';
                        x['border-right'] = this.hover ? '1px solid white' : '';
                        x['background-color'] = this.hover ? 'white' : 'inherit';
                        x['color'] = this.hover ? this.model.color1 : 'black';

                        break;
                    case 3:
                        x['color'] = this.hover ? this.model.color1 : 'black';
                }

                return x;
            },
            submenuStyle(){
                let x = {
                    'transform': 'translateY( -' + this.height + ')',
                };
                switch (this.model.type) {
                    case 0:
                    case 1:
                        x['border'] = '2px solid ' + this.model.color1;
                        x['color'] = 'black';
                        x['background-color'] = 'white';
                        break;
                    case 2:
                        x['transform'] += ' translateX(-2px)';
                        x['z-index'] = -1;
                        x['border'] = '1px solid ' + this.model.color1;
                        x['color'] = 'black';
                        x['background-color'] = 'white';
                        break;
                    case 3:
                        x['background-color'] = 'white';
                        break;
                }

                return x;
            },
        },
    }
});