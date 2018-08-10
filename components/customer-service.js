define(['vueLoader'], (loader) => {
    return {
        components: {
            cptborder: loader.load('cptborder'),
        },
        mounted() {
            // var len = this.editingConfig.pages.客服列表.image.config.customerList.length;
        },
        props: {
            model: {
                type: Object,
                default: {
                    showCell: {
                        which: '0',
                        text: '联系方式：',
                        st: 'cell',
                        radio: [{
                                name: '显示',
                                value: '0'
                            },
                            {
                                name: '隐藏',
                                value: '1'
                            }
                        ]
                    },
                    titleBarStyle: {
                        'background-color': 'inherit',
                        'background-image': '',
                        height: 40,
                        show: false,
                        // 'border-bottom': '',
                        // 'border-color': '',
                        useDefault: true,
                    },
                    backgroundStyle: {
                        useDefault: true,
                        'background-color': '#fff',
                        'background-image': '',
                    },
                    showTime: {
                        which: '0',
                        text: '工作时间：',
                        st: 'time',
                        radio: [
                            {
                                name: '显示',
                                value: '0'
                            },
                            {
                                name: '隐藏',
                                value: '1'
                            }
                        ]
                    },
                    showType: {
                        which: '0',
                        text: '展示方式：',
                        st: 'show',
                        radio: [
                            {
                                name: '纵向',
                                value: '0'
                            },
                            {
                                name: '横向',
                                value: '1'
                            }
                        ]
                    },
                    qqstyle: {
                        text: 'QQ样式：',
                        which: '0',
                        st: 'sty',
                        radio: [{
                                style: 'qq-s-1',
                                value: '0'
                            },
                            {
                                style: 'qq-s-2',
                                value: '1'
                            }
                        ]
                    },
                    week: [
                        {
                            'text': '周一',
                            'value': '0'
                        },
                        {
                            'text': '周二',
                            'value': '1'
                        },
                        {
                            'text': '周三',
                            'value': '2'
                        },
                        {
                            'text': '周四',
                            'value': '3'
                        },
                        {
                            'text': '周五',
                            'value': '4'
                        },
                        {
                            'text': '周六',
                            'value': '5'
                        },
                        {
                            'text': '周日',
                            'value': '6'
                        },
                    ],
                    time: [
                        {
                            'text': '0:00',
                            'value': '0'
                        },
                        {
                            'text': '0:30',
                            'value': '1'
                        },
                        {
                            'text': '1:00',
                            'value': '2'
                        },
                        {
                            'text': '1:30',
                            'value': '3'
                        },
                        {
                            'text': '2:00',
                            'value': '4'
                        },
                        {
                            'text': '2:30',
                            'value': '5'
                        },
                        {
                            'text': '3:00',
                            'value': '6'
                        },
                        {
                            'text': '3:30',
                            'value': '7'
                        },
                        {
                            'text': '4:00',
                            'value': '8'
                        },
                        {
                            'text': '4:30',
                            'value': '9'
                        },
                        {
                            'text': '5:00',
                            'value': '10'
                        },
                        {
                            'text': '5:30',
                            'value': '11'
                        },
                        {
                            'text': '6:00',
                            'value': '12'
                        },
                        {
                            'text': '6:30',
                            'value': '13'
                        },
                        {
                            'text': '7:00',
                            'value': '14'
                        },
                        {
                            'text': '7:30',
                            'value': '15'
                        },
                        {
                            'text': '8:00',
                            'value': '16'
                        },
                        {
                            'text': '8:30',
                            'value': '17'
                        },
                        {
                            'text': '9:00',
                            'value': '18'
                        },
                        {
                            'text': '9:30',
                            'value': '19'
                        },
                        {
                            'text': '10:00',
                            'value': '20'
                        },
                        {
                            'text': '10:30',
                            'value': '21'
                        },
                        {
                            'text': '11:00',
                            'value': '22'
                        },
                        {
                            'text': '11:30',
                            'value': '23'
                        },
                        {
                            'text': '12:00',
                            'value': '24'
                        },
                        {
                            'text': '12:30',
                            'value': '25'
                        },
                        {
                            'text': '13:00',
                            'value': '26'
                        },
                        {
                            'text': '13:30',
                            'value': '27'
                        },
                        {
                            'text': '14:00',
                            'value': '28'
                        },
                        {
                            'text': '14:30',
                            'value': '29'
                        },
                        {
                            'text': '15:00',
                            'value': '30'
                        },
                        {
                            'text': '15:30',
                            'value': '31'
                        },
                        {
                            'text': '16:00',
                            'value': '32'
                        },
                        {
                            'text': '16:30',
                            'value': '33'
                        },
                        {
                            'text': '17:00',
                            'value': '34'
                        },
                        {
                            'text': '17:30',
                            'value': '35'
                        },
                        {
                            'text': '18:00',
                            'value': '36'
                        },
                        {
                            'text': '18:30',
                            'value': '37'
                        },
                        {
                            'text': '19:00',
                            'value': '38'
                        },
                        {
                            'text': '19:30',
                            'value': '39'
                        },
                        {
                            'text': '20:00',
                            'value': '40'
                        },
                        {
                            'text': '20:30',
                            'value': '41'
                        },
                        {
                            'text': '21:00',
                            'value': '42'
                        },
                        {
                            'text': '21:30',
                            'value': '43'
                        },
                        {
                            'text': '22:00',
                            'value': '44'
                        },
                        {
                            'text': '22:30',
                            'value': '45'
                        },
                        {
                            'text': '23:00',
                            'value': '46'
                        },
                        {
                            'text': '23:30',
                            'value': '47'
                        },
                    ],
                    image: {
                        src: 'http://0.ss.faisys.com/image/default/demo.png',
                        style: {
                            width: '100px',
                            height: '200px',
                        },
                        margin: '0px',
                        link: 'www.baidu.com',
                        desc: '为选择二维码',
                    },
                    timeList: [
                        {
                            checkedsWeek: '0',
                            checkedeWeek: '6',
                            checkedsTime: '16',
                            checkedeTime: '35',
                        },
                        {
                            checkedsWeek: '0',
                            checkedeWeek: '6',
                            checkedsTime: '16',
                            checkedeTime: '35',
                        },
                        {
                            checkedsWeek: '0',
                            checkedeWeek: '6',
                            checkedsTime: '16',
                            checkedeTime: '35',
                        }
                    ],
                    customerList: [
                        {
                            hasImg: false,
                            column: 'QQ',
                            num: '0000000',
                            class: 'qq-style',
                            text: '客服1',
                            checkedList: '0',
                            isShow: true,
                            isUpdate: false,
                            order: 'down'
                        },
                        {
                            hasImg: true,
                            column: '微信',
                            num: '添加二维码',
                            class: 'wx-style',
                            text: '客服1',
                            checkedList: '1',
                            isShow: true,
                            order: 'top'
                        },
                    ],
                    categoryOptions: [
                        {
                            text: '一直在线',
                            value: '0'
                        },
                        {
                            text: '工作时间在线',
                            value: '1'
                        }
                    ],
                    cellList: [
                        {
                            name: '客服热线',
                            text: '400-000-0000',
                            isUpdate: false,
                        },
                        {
                            name: '邮箱',
                            text: '123456789@qq.com',
                            isUpdate: false,
                        },
                        {
                            name: '客服热线',
                            text: '400-000-0000',
                            isUpdate: false,
                        },
                    ],
                    title: '',
                    titleVisible: true,
                    style: {
                        width: '99%',
                        height: '320px',
                        opacity: 1,
                        'border-radius': '0px',
                        'background-color': '#fff',
                        'background-image': '',
                        'border-style': 'solid',
                        'border-color': 'black',
                        'border-width': '1px',
                        'border-bottom': 'medium none',
                    },
                    container: {
                        common: {}
                    },
                    hasImg: false,
                },
            },
            editingConfig: {
                default: {
                    title: '创建在线客服组件',
                    pages: {
                        "客服列表": {
                            title: {
                                config: {
                                    text: '组件标题',
                                    placeholder: '',
                                },
                                component: 'dialog/text',
                            },
                            customerList: {
                                component: 'dialog/editing/customer-service-list'
                            },
                        },
                        "联系方式": {
                            showCell: {
                                component: 'dialog/editing/radio',
                            },
                            cellList: {
                                component: 'dialog/editing/customer-service-cell'
                            },
                        },
                        "工作时间": {
                            showTime: {
                                component: 'dialog/editing/radio',
                            },
                            timeList: {
                                component: 'dialog/editing/customer-service-time'
                            },
                        },
                        "高级": {
                            showType: {
                                component: 'dialog/editing/radio',
                            },
                            qqstyle: {
                                component: 'dialog/editing/qq-style',
                            }
                        }
                    }
                },
            },
            //设置属性对话框的配置
            settingConfig: {
                "set": {
                    test: {
                        component: 'dialog/setting/article-set-area'
                    },
                }
            }
        },
        data() {
            return {
                showCodeImg:false,
                showPop:false,
            };
        },
        methods: {
            showCode(){
                this.showCodeImg=!this.showCodeImg;
                this.showPop=true;
            },
            hideCode(){
                this.showCodeImg=false;
                this.showPop=false;
            },
        },
        computed: {
            sty() {
                return this.model.showType.which == '0' ? 'portait' : 'crosswise';
            },
            qq() {
                return this.model.qqstyle.which == '0' ? 'qq-s-1' : 'qq-s-2';
            },
            phone(){
                for(var i=0;i<this.model.customerList.length;i++){
                    if(this.model.customerList[i].hasImg){
                        return '';
                    }else{
                        return "tel:"+this.model.customerList[i].num;
                    }
                }
            },
        },
    }
});