define(['async!BMap'], () => {
    return {
        props: {
            'model': {
                default: {
                    address: '广州'
                }
            },
            'config': {
                default: {}
            },
            'key': {}
        },
        data() {
            return {
                paint: false,
                marker: null,
                label: null,
            }
        },
        computed: {
            mapId() {
                return 'map_' + this._uid;
            }
        },
        watch: {
            'model.address' () {
                this.map.centerAndZoom(this.model.address, 15);
            },
            'model.marker.desc' (v) {
                if (this.label)
                    this.label.setContent(v);
            },
            'model.marker.point' (v) {
                if (this.marker)
                    this.marker.setPosition(v);
                else {
                    this.createMarker(v);
                }
                this.map.centerAndZoom(v, 15);
            },
        },
        methods: {
            createMarker(point) {
                this.marker = new BMap.Marker(point);
                // this.label = new BMap.Label(this.model.desc, {offset: new BMap.Size(20, -10)});
                // this.label.setStyle({
                //     border: '1px solid #555',
                //     padding: '6px 6px',
                // });
                // this.marker.setLabel(this.label);

                this.label = new BMap.InfoWindow(this.model.marker.desc, {
                    width: 150, // 信息窗口宽度
                    height: 80, // 信息窗口高度
                    enableCloseOnClick: false,
                });

                this.label.setContent(this.model.marker.desc);
                this.map.addOverlay(this.marker);
                this.marker.openInfoWindow(this.label);
            }
        },
        mounted() {
            this.map = new BMap.Map(this.mapId);
            this.map.centerAndZoom(this.model.address, 15);


            var top_left_control = new BMap.ScaleControl({
                anchor: BMAP_ANCHOR_TOP_LEFT
            }); // 左上角，添加比例尺
            // var top_left_navigation = new BMap.ScaleControl(); //左上角，添加默认缩放平移控件

            //添加控件和比例尺
            this.map.addControl(top_left_control);
            // this.map.addControl(top_left_navigation);
            this.map.disableDoubleClickZoom();

            if (this.model.marker) {
                if (this.model.marker.point) {
                    this.createMarker(this.model.marker.point);
                    this.map.centerAndZoom(this.model.marker.point, 15);
                }
            }

            this.map.addEventListener('click', e => {
                if (this.paint) {
                    // this.map.centerAndZoom(e.point, 15);
                    this.model.marker.point = e.point;
                    this.paint = false;
                }
            });
        },
    }
});