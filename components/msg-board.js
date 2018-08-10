/**
 * 留言板
 */
define([], () => {
    return {
        props: {
            model: {
                default: {
                    btnBg: 'rgb(255, 59, 48)',
                    title: '留言板',
                    titleStyle: {
                        display: 'inline-block',
                        padding: '10px',
                        'font-size': '14px',
                    },
                    titleBarStyle: {
                        'background-color': '#fff',
                        'background-image': '',
                        height: 40,
                        show: true,
                        // 'border-bottom': '',
                        // 'border-color': '',
                        useDefault: true,
                    },
                    titleStyle: {
                        vertical: 1, //0-上 1-居中 2-下
                        horizontal: 0, //0-左 1-居中 2-右
                        color: '#5ca6e2',
                        'font-size': 14,
                        'font-family': '宋体',
                        'font-weight': 'normal',
                        'font-style': 'normal',
                        'text-decoration': 'normal',
                        useDefault: true,
                    },
                    backgroundStyle: {
                        useDefault: true,
                        'background-color': '#fff',
                        'background-image': '',
                    },
                    type: app.channel=='2'?2:0,
                    buttonImg: 'mobile-btn-1',
                    message: '',
                    name: '',
                    phone: '',
                    email: '',
                    style: {
                        width: app.channel ==2?'90%':'60%',
                        height: '500px',
                    },
                },
            },
        },
        computed: {
            btnStyle() {
                return {
                    width: this.model.type ? '100%' : '270px',
                    'padding-left': '70px',
                };
            }
        },
        data() {
            return {

                rules: {
                    name: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur',
                    }, {
                        min: 2,
                        max: 15,
                        message: '长度在 2 到 15 个字符',
                        trigger: 'blur'
                    }],
                    email: [{
                        required: true,
                        message: '请输入邮箱',
                        trigger: 'blur',
                    }, {
                        message: '请输入正确的邮箱地址',
                        trigger: 'blur'
                    }],
                    phone: [{
                        required: true,
                        message: '请输入手机号',
                        trigger: 'blur',
                    }, {
                        min: 11,
                        max: 11,
                        message: '请输入正确的手机号',
                        trigger: 'blur'
                    }],
                    message: [{
                            required: true,
                            message: '请输入留言',
                            trigger: 'blur',
                        }, {
                            min: 3,
                            max: 150,
                            message: '长度在 3 到 150 个字符',
                            trigger: 'blur'
                        }

                    ],
                },
                editingConfig: {
                    title: '编辑组件（留言板）',
                    pages: {
                        '常规': {
                            title: {
                                config: {
                                    text: '组件标题'
                                },
                                component: 'dialog/text',
                            },
                            type: {
                                config: {
                                    text: '布局样式：',
                                    style: {
                                        width: '175px',
                                        height: '120px',
                                    },
                                    options: [{
                                            channel: 1,
                                            image: 'images/components/moren.png',
                                            text: '0',
                                        },
                                        {
                                            channel: 1,
                                            image: 'images/components/teshu.png',
                                            text: '1',
                                        },
                                        {
                                            channel: 2,
                                            image: 'images/components/msg_mobile_1.png',
                                            text: '0',
                                        },
                                        {
                                            channel: 2,
                                            image: 'images/components/msg_mobile_2.png',
                                            text: '1',
                                        },
                                        {
                                            channel: 2,
                                            image: 'images/components/msg_mobile_3.png',
                                            text: '1',
                                        },
                                    ],
                                },
                                component: 'dialog/editing/style-list',
                            },
                            buttonImg: {
                                config: {
                                    current_2: '',
                                    color1: '',
                                    colorSize: '按钮颜色:',
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
                                    ]
                                },
                                component: 'dialog/editing/msg-border-btn',
                            },
                        }
                    },
                },
                settingConfig: {},
            }
        },

        methods: {
            submitMessage() {
                var formdata = JSON.stringify(this.model);
                formdata = JSON.parse(formdata);
                var phoneTest = /0?(13|14|15|18)[0-9]{9}/;
                var emailTest = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
                var name = formdata.name,
                    email = formdata.email,
                    message = formdata.message,
                    phone = formdata.phone;

                if (name == '') {
                    this.$message.error('请输入姓名!');
                    return
                }
                if (name.length < 2 || name.length > 15) {
                    this.$message.error('请输入正确姓名!');
                    return
                }
                if (!emailTest.test(email)) {
                    this.$message.error('请输入有效的邮箱地址!');
                    return
                }
                if (!phoneTest.test(phone)) {
                    this.$message.error('请输入有效的手机号码!');
                    return
                }
                if (message == '') {
                    this.$message.error('请输入留言内容!');
                    return
                }
                app.userMsg(formdata);
                this.$refs['form'].resetFields();
            },

        },
    }
});