define([], () => {
    return {
        watch: {
            'model.type'(v) {
                setTimeout(() => {
                    this.refresh();
                });
            },
        },
        props: {
            model: {
                default: {
                    // title: '产品搜索',
                    placeholder: '请输入搜索内容',
                    text: '',
                    type: app.channel=='2'?8:0,
                    inputStyle: {
                        width: '300px',
                        height: '50px',
                    },
                    keywords: [],
                    titleBarStyle: {
                        height: 40
                    },
                    titleVisible: false,
                    style: {
                        width: app.channel == 2 ? '300px' : '600px',
                        height: '80px',
                        opacity: 1,
                        searchH:'40px',
                        background: 'inherit',
                    },
                    checked: true, //关闭model检查
                    btnBg: 'rgb(96,166,226)',
                },
            },
            editingConfig: {
                default: {
                    title: '组件编辑（产品搜索）',
                    pages: {
                        '常规': {
                            title: {
                                config: {
                                    text: '组件标题',
                                    placeholder: '请填写页面名称',
                                },
                                component: 'dialog/text'
                            },
                            type: {
                                config: {
                                    text: '组件样式',
                                    style: {
                                        width: '175px',
                                        height: '120px',
                                    },
                                    options: [{
                                        channel: 1,
                                        image: 'images/components/img_cpss_a.png',
                                        text: '1',
                                    },
                                        {
                                            channel: 1,
                                            image: 'images/components/img_cpss_b.png',
                                            text: '1',
                                        },
                                        {
                                            channel: 1,
                                            image: 'images/components/img_cpss_c.png',
                                            text: '1',
                                        },
                                        {
                                            channel: 1,
                                            image: 'images/components/img_cpss_d.png',
                                            text: '1',
                                        },
                                        {
                                            channel: 1,
                                            image: 'images/components/img_cpss_e.png',
                                            text: '1',
                                        },
                                        {
                                            channel: 1,
                                            image: 'images/components/img_cpss_f.png',
                                            text: '1',
                                        },
                                        {
                                            channel: 1,
                                            image: 'images/components/img_cpss_g.png',
                                            text: '1',
                                        },
                                        {
                                            channel: 1,
                                            image: 'images/components/img_cpss_h.png',
                                            text: '1',
                                        },
                                        {
                                            channel: 2,
                                            image: 'images/components/img_cpss_a.png',
                                            text: '1',
                                        },
                                        {
                                            channel: 2,
                                            image: 'images/components/img_cpss_b.png',
                                            text: '1',
                                        },
                                        {
                                            channel: 2,
                                            image: 'images/components/img_cpss_c.png',
                                            text: '1',
                                        },
                                        {
                                            channel: 2,
                                            image: 'images/components/img_cpss_d.png',
                                            text: '1',
                                        },
                                        {
                                            channel: 2,
                                            image: 'images/components/img_cpss_e.png',
                                            text: '1',
                                        },
                                        {
                                            channel: 2,
                                            image: 'images/components/img_cpss_f.png',
                                            text: '1',
                                        },
                                        {
                                            channel: 2,
                                            image: 'images/components/img_cpss_g.png',
                                            text: '1',
                                        },
                                        {
                                            channel: 2,
                                            image: 'images/components/img_cpss_h.png',
                                            text: '1',
                                        },
                                    ],
                                },
                                component: 'dialog/editing/style-list',
                            },
                            colorSize: {
                                config: {
                                    text: '按钮颜色',
                                    colorList: [{
                                        color: '#FF3B30'
                                    },
                                        {
                                            color: '#FF9500'
                                        },
                                        {
                                            color: '#FFCC00'
                                        },
                                        {
                                            color: '#4CD964'
                                        },
                                        {
                                            color: '#007AFF'
                                        },
                                        {
                                            color: '#5856D6'
                                        },
                                    ],
                                    current_2: 123,
                                },
                                component: 'dialog/editing/searchColor'
                            },
                        },

                        '展示设置': {
                            placeholder: {
                                config: {
                                    text: '搜索提示',
                                    placeholder: '请输入搜索提示',
                                },
                                component: 'dialog/text',
                            },
                            // inputStyle: {
                            //     config: {
                            //         text: '搜索框宽高',
                            //     },
                            //     component: 'dialog/editing/size'
                            // },
                            keywords: {
                                component: 'dialog/editing/keywords'
                            },
                        }
                    },
                }
            },
            settingConfig: {},
        },
        data() {
            return {}
        },
        computed: {
            slot() {
                switch (this.model.type) {
                    case 0:
                    case 1:
                    case 2:
                    case 8:
                    case 9:
                    case 10:
                        return 'append';
                    case 3:
                    case 4:
                    case 7:
                    case 11:
                    case 12:
                    case 15:
                        return 'suffix';
                    case 5:
                    case 13:
                        return 'prefix';
                }
            },
            // inputStyle(){
            //     switch (this.model.type) {
            //         case 0:
            //             return {
            //                 'border-color': 'RGB(92,116,166)',
            //             };
            //         case 3:
            //             return {
            //                 'border-color': 'RGB(92,116,166)',
            //             };
            //         case 6:
            //             return {
            //                 'border-raduis': '10px',
            //             };
            //         case 7:
            //             return {
            //                 'border': 'none'
            //             };
            //     }
            // },
            showButton() {
                switch (this.model.type) {
                    case 0:
                    case 1:
                    case 2:
                    case 8:
                    case 9:
                    case 10:
                        return true;
                }
                return false;
            },
            showICON() {
                switch (this.model.type) {
                    case 0:
                    case 1:
                    case 2:
                    case 8:
                    case 9:
                    case 10:
                        return false;
                }
                return true;
            },
            icon() {
                switch (this.model.type) {
                    case 0:
                    case 1:
                    case 8:
                    case 9:
                        return '';
                }
                return "el-icon-search";
            },
            suffix() {
                switch (this.model.type) {
                    case 3:
                    case 4:
                    case 6:
                    case 7:
                    case 11:
                    case 12:
                    case 14:
                    case 15:
                        return 'el-icon-search';
                }
                return "";
            },
            prefix() {
                switch (this.model.type) {
                    case 5:
                    case 13:
                        return 'el-icon-search';
                }
                return "";

            },
            text() {
                switch (this.model.type) {
                    case 0:
                    case 1:
                    case 8:
                    case 9:
                        return "搜索";
                }
                return '';
            },
            restaurants() {
                let r = [];

                this.model.keywords.forEach(e => {
                    r.push({
                        value: e,
                    });
                });

                return r;
            },
        },
        mounted() {
            this.model.titleBarStyle.show = false;
            // this.model.backgroundStyle['background-color'] = 'transparent';
            this.refresh();
            window.s = this;
        },
        methods: {
            reset() {
                this.append = $(this.$el).find('.el-input-group__append')[0];
                this.inner = $(this.$el).find('.el-input__inner')[0];
                this.suffixEl = $(this.$el).find('.el-input__suffix')[0];
                this.prefixEl = $(this.$el).find('.el-input__prefix')[0];
                let SH=this.model.style.searchH;
                $(this.inner).css({
                    height:SH,
                    'line-height':SH
                });
                if (this.append && this.appendStyle == null)
                    this.appendStyle = {
                        border: this.append.style.border,
                        color: this.append.style.border.color,
                        'background-color': this.append.style['backgound-color'],
                    };

                if (this.inner && this.innerStyle == null)
                    this.innerStyle = {
                        border: this.inner.style.border,
                        'border-radius': this.inner.style.border,
                        'border-bottom': null,
                    };

                if (this.suffixEl) {
                    // setTimeout(() => {
                    $(this.suffixEl).css("transform", '');
                    // },500);
                }

                if (this.appendStyle && this.append)
                    for (let key in this.appendStyle) {
                        this.append.style[key] = this.appendStyle[key];
                    }

                if (this.innerStyle)
                    for (let key in this.innerStyle) {
                        this.inner.style[key] = this.innerStyle[key];
                    }

            },
            refresh() {
                setTimeout(() => {
                    this.reset();
                    let append = this.append;
                    let suffixEl = this.suffixEl;
                    let inner = this.inner;
                    let prefixEl = this.prefixEl;
                    let color = this.model.btnBg;
                    if (this.model.type < 3 || (this.model.type > 7 && this.model.type < 11)) {
                        if (append) {
                            $(append).css({
                                border: '1px solid ' + color,
                                color: 'white',
                                'background-color': color,
                            });
                        }

                        if (inner && (this.model.type != 0 && this.model.type != 8)) {
                            if (inner) {
                                $(inner).css({
                                    border: '1px solid #ccc',
                                });
                            }
                        } else if (this.model.type == 0 || this.model.type == 8) {
                            if (inner) {
                                $(inner).css({
                                    border: '1px solid ' + color,
                                });
                            }
                        }
                    } else {
                        if (suffixEl) {
                            $(suffixEl).css({
                                color: color,
                            });
                        }
                        if (prefixEl) {
                            $(prefixEl).css({
                                color: color,
                            });
                        }

                        if (this.model.type == 3 || this.model.type == 11) {
                            if (inner) {
                                $(inner).css({
                                    border: '1px solid ' + color,
                                });
                            }
                        } else if (this.model.type == 6 || this.model.type == 14) {
                            if (inner) {
                                $(inner).css({
                                    'border-radius': '20px',
                                });
                            }
                        } else if (this.model.type == 7 || this.model.type == 15) {
                            if (inner) {
                                $(inner).css({
                                    'border': 'none',
                                    'border-radius': '0',
                                    'border-bottom': '1px solid #ccc',
                                });
                            }
                        }
                    }
                });
            },


            querySearchAsync(queryString, cb) {

                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            search() {
                var pageid = app.toWebsessionStorage('proId');
                var webcode = app.toSessionStorage('webcode');
                if (webcode == 'SHOW') {
                    if (pageid != undefined) {
                        if (app.channel == 1) {
                            window.open('http://' + app.toWebsessionStorage('domainUrl') + '/preview.html?pageid=' + pageid)
                        } else if (app.channel == 2) {
                            window.open('http://' + app.toWebsessionStorage('domainUrl') + '/mobilepreview.html?pageid=' + pageid)
                        }
                    } else {
                        this.$message({
                            message: '暂无内容！',
                            type: 'warning'
                        });
                    }
                } else {
                    window.open('http://' + app.toWebsessionStorage('domainUrl') + '/search.html?keyword=' + this.model.text);
                }

            }
        },
        watch: {
            'model': {
                handler: function (val, oldVal) {
                    this.refresh();
                },
                deep: true
            }
        }
    }
});