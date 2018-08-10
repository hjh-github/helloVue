// 本地环境
// var domain = 'http://127.0.0.1:8080/';
// var domain = 'http://192.168.30.175:8080/';
// 测试环境
// var domain = 'http://test.jz.cangluxmt.com/';
// 开发环境
var domain = 'http://dev.jz.cangluxmt.com/';
var app = new Vue({
    // el: '#app',
    data() {
        return {
            navShow:true,
            // 单位
            unit: 'px',
            //自由容器默认配置
            groupItemconfig: {
                model: {
                    cpts: [],
                    link: {
                        type: 0,
                        local: '',
                        net: '',
                        open: '',
                    },
                },
                settingConfig: {
                    canvasStyle: {
                        color: '#fff',
                        src: '',
                        repeat: 'no-repeat',
                        size: 'cover',
                        position: 'center',
                        top: '0px'
                    },
                    mobileCanvasStyle: {
                        color: '#66b1ff',
                        src: '',
                        repeat: 'no-repeat',
                        size: 'cover',
                        position: 'center',
                        top: '0px'
                    },
                    mobileFooterStyle: {
                        color: '#fff',
                    },
                    config: {
                        def: 0,
                        bgStyle: 0
                    },
                    style: {
                        height: '200px',
                        padding: '',
                        border: {},
                        margin: ''
                    }
                },

            },
            //标签默认配置
            tabsConfig: {
                barStyle: {
                    height: 70,
                    'background-image': '',
                    'border-color': '#CCC',
                    'border-width': 1,
                    'border-style': 'solid',
                    showBorderLeft: true,
                    showBorderRight: true,
                    showBorderTop: true,
                    showBorderBottom: true,
                },
                tabStyle: {
                    width: 100,
                    height: 40,
                    'border-radius': 0,
                    'hoverColor': {
                        'background-color': ''
                    },
                    'font-size': 14,
                    'font-family': '微软雅黑',
                    'color': '#000',
                    // 'background-color': '#26ecf1',
                    'background-color': '#f2f2f2',
                    'margin-left': 10,
                    'background-image': '',
                },
                tabSelectedStyle: {
                    'background-color': '#5ca5e2',
                    'color': '#e6ecf3',
                    'background-image': '',
                },
            },
            'z-index': 10,
            contentConfig: {
                backgroundStyle: {
                    useDefault: true,
                    'background-color': '#f2f2f2',
                    'background-image': '',
                },
                paddingStyle: {
                    useDefault: true,
                    'padding-top': 0,
                    'padding-bottom': 0,
                    'padding-left': 0,
                    'padding-right': 0,
                },
            },
            titleConfig: {
                showMore: {
                    type: 0,
                    visible: false,
                    link: {
                        open: '_blank',
                        local: '',
                        net: '',
                    },
                    color: '#ccc',
                    'font-size': 10,
                    'font-family': '宋体',
                    'font-weight': 'normal',
                    'font-style': 'normal',
                    'text-decoration': '',
                    useDefault: true,
                },
                titleBarStyle: {
                    'background-color': '#ffffff',
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
                    color: '#000',
                    'font-size': 14,
                    'font-family': '宋体',
                    'font-weight': 'normal',
                    'font-style': 'normal',
                    'text-decoration': 'normal',
                    useDefault: true,
                },
                subTitleStyle: {
                    color: '#666',
                    'font-size': 10,
                    'font-family': '宋体',
                    'font-weight': 'normal',
                    'font-style': 'normal',
                    'text-decoration': 'normal',
                    useDefault: true,
                },
            },
            mobileNav: false,
            // 保存lode
            saveLoading: false,
            // 预览冷却
            toPreivewLoad: false,
            // 当前用户信息
            userInfo: [],
            savePageInfo: {},
            allInfo: {},
            //页面数据缓冲，整页loading
            pageLoaded: false,
            //文章缓存
            aritcleCache: {},
            //文章分类缓存
            aritcleCategoryCache: {},
            pageContent: [], //获取页面信息。保存页面
            /**
             * ------------
             */
            cellList: [],
            firstParentId: [],
            allPageList: [],
            webcode: 'SHOW',
            hasCallBack: false,
            classyDialogTitle: "",
            firstTime: true,
            /**这里只放一些做通用效果变量 */
            // 局部loading是否显示
            topoLoading: false,
            /**这里只放一些做通用效果变量  end*/
            currentModuleID: '',
            showElement: false,
            font: {},
            /** PC移动端区分 */
            channel: '',
            /**预览模式*/
            isPreview: false,
            isShowPC:true,
            groupContainer: {
                common: {
                    def: false,
                    value: 1200,
                    canvasStyle: {
                        color: '#f2f2f2',
                        src: '',
                        repeat: '',
                        size: '',
                        position: ''
                    },
                    config: {
                        def: 0,
                        bgStyle: 0
                    },
                    conts: {
                        header: {
                            name: '顶栏区',
                            visible: true
                        },
                        banner: {
                            name: '横幅区',
                            visible: true
                        },
                        body: {
                            name: '内容区',
                            visible: true
                        },
                        bottom: {
                            name: '底栏区',
                            visible: true
                        },
                    }
                },
                header: {
                    id: 'head',
                    model: {
                        cpts: [],
                    },
                    settingConfig: {
                        canvasStyle: {
                            color: 'rgba(255,255,255,1)',
                            src: '',
                            repeat: '',
                            size: '',
                            position: ''
                        },
                        config: {
                            def: 0,
                            bgStyle: 0
                        },
                        style: {
                            height: '250',
                            padding: '',
                            border: {},
                            margin: ''
                        }
                    },
                },
                navigation: {
                    //读不到数据的时候的默认配置
                    style: {
                        height: '100%',
                    },
                    'line-height': "60px",
                    'font-size': '14px',
                    'navFixed': false,
                    'navShow': true,
                    'background-color': '#f2f2f2',
                    'text-color': '#999',
                    'active-text-color': '#ffd04b',
                    'hover-color': '#f12305',
                },
                banner: {
                    id: 'banner',
                    isAlone: 2,
                    pageBanner: {
                        model: {
                            cpts: [],
                        },
                        type: 0,
                        carousel: {
                            autoplay: true,
                            interval: 3000,
                        },
                        settingConfig: {
                            canvasStyle: {
                                color: '#f2f2f2',
                                src: '',
                                repeat: '',
                                size: '',
                                position: ''
                            },
                            config: {
                                def: 0,
                                bgStyle: 0
                            },
                            style: {
                                height: '450',
                                padding: '',
                                border: {},
                                margin: ''
                            }
                        },
                    },
                    webBanner: {
                        type: 0,
                        carousel: {
                            autoplay: true,
                            interval: 3000,
                        },
                        model: {
                            cpts: [],
                        },
                        settingConfig: {
                            canvasStyle: {
                                color: 'rgba(255,255,255,1)',
                                src: '',
                                repeat: '',
                                size: '',
                                position: ''
                            },
                            config: {
                                def: 0,
                                bgStyle: 0
                            },
                            style: {
                                height: '450',
                                padding: '',
                                border: {},
                                margin: ''
                            }
                        },
                    },
                },
                navContainer: {
                    id: 'navContainer',
                    model: {
                        cpts: [],
                    },
                    settingConfig: {
                        canvasStyle: {
                            color: 'rgba(102,177,255,1)',
                            src: '',
                            repeat: 'no-repeat',
                            size: 'cover',
                            position: 'center',
                            top: '0px',
                            height: '60px',
                        },
                        config: {
                            def: 0,
                            bgStyle: 0,
                            showSelect: 0,
                            showStyle: 0,
                        },
                        showStyle: {
                            s: '',
                        },
                        style: {
                            padding: '',
                            border: {},
                            margin: ''
                        },
                        logo: {
                            src: "",
                            style: {
                                height: '100px',
                                widht: '100px',
                                left: '30px',
                                top: '0px',
                            }
                        }
                    },
                },
                body: {
                    id: 'body',
                    model: {
                        cpts: [],
                    },
                    settingConfig: {
                        canvasStyle: {
                            color: 'rgba(255,255,255,1)',
                            src: '',
                            repeat: '',
                            size: '',
                            position: ''
                        },
                        config: {
                            def: 0,
                            bgStyle: 0
                        },
                        style: {
                            height: '200px',
                            padding: '',
                            border: {},
                            margin: ''
                        }
                    },
                },
                bottom: {
                    id: 'bottom',
                    model: {
                        cpts: [],
                    },
                    settingConfig: {
                        canvasStyle: {
                            color: 'rgba(51,51,51,1)',
                            src: '',
                            repeat: '',
                            size: '',
                            position: '',
                            'background-color': '#fff',
                            navList: [],
                        }
                        ,
                        config: {
                            def: 0,
                            bgStyle: 0
                        },
                        style: {
                            height: '300px',
                            padding: '',
                            border: {},
                            margin: ''
                        }
                    },
                },
            },
            isInfoPage:false,
            images: {},
            search: {},
            /** 设计--》主题颜色&&内容区 */
            hasSysWeb: false,
            setStyle: false, //设置框是否显示
            resolution: 1200, //内容区域大小
            themecolor: '', //当前主题颜色
            othertheme: '', //自定义颜色
            showhistory: false, //显示历史版本


            /*** 页面管理编辑闪存 用于暂时存储显示当前编辑中的数据 */

            /*** 页面管理编辑闪存 end */
            /* 存为系统模板 */
            saveTemplateisDialogShow: 0, //弹窗开关
            /* 存为系统模板 end*/
            //导航类型
            navType: {},
            iconName: '', //模板名字的
            //添加模板功能
            thisModule: '',
            moduleCategoryList: [], //模块分类列表f
            moduleList: [{
                id: '1',
                moduleCode: '11',
                thumbImage: 'https://w2.hoopchina.com.cn/22/ac/c1/22acc14fc3942a35de4ed28c85315bf8001.jpg',
            }, {}], //模块列表


            reqFirstModuleFlg: 0, //默认只请求一次第一个模块
            addModuleListIndex: -1,
            tplTopLevelArr: [], //模板顶级分类数组
            tplTopLevelCode: '',
            tplTopLevelArrIndex: -1, //模板顶级分类数组
            // tplChildLevelArr: [], //模板二级分类数组
            OnetplLevelArr: [], //模板【可以删除的变量】
            TwotplLevelArr: [], //模板【可以删除的变量】
            ThreetplLevelArr: [], //模板三级分类数组【可以删除的变量】
            secondLevelTpl: [], //二级下拉框要遍历的数组
            webTypeArr: [], //网站类型数组
            tplThemeColorArr: [], //模板类型主题颜色数组

            tplLevelCode: '', //请求网站模板数据时要传网站级别参数(免费或者会员)
            tplWebName: '', //网站名称,
            tplWebInfoList: [], //二级网站列表数组
            items: [],
            /*==================================*/
            general: {
                'bgcolor': '',
                'margintop': 0,
                'marginbottom': 0,
                'bgpic': ' ',
                'if': '',
                'pdtop': '',
                'pdbot': ''
            },
            //自定义模块 高度
            selfDefined: "600",
            userWebId: '',
            // ssid:app.toSessionStorage("ssid"),
            toalType: '',
            navs: [],
            themes: [],
            sites: [],
            elementsName: '',
            industryA: [],
            industryB: [],
            industryC: [],
            title: "上传图片",
            //元素分类
            eleclass: [],
            //元素列表
            elementList: [],
            rows: "",
            modlists: [], //模块列表
            modpics: [],
            rowtemplate: {
                sort: 0,
                sorts: 0,
                name: '',
                sex: '',
                province: '',
                provinces: '',
                link: '',
                placelink: '',
                mode: '',
                srcs: '',
            },
            firstPath: [],
            secondPath: [],
            //我的模板历史记录
            myTemplate: [],
            // currentIndex: 0,
            currentMenuId: 0,
            secondary: false,
            //栏目预览样式
            defaultSelect: [],
            theDefaultSelect: [],
            theDefaultSelects: [],
            theDefaultSelecths: [],
            particulars: true,
            firstVal: "", //内容调取栏目一级菜单
            secondVal: "", //内容调取栏目二级菜单
            obtainNumber: "", //内容调取数量
            contentDraw: {
                'mode': ''
            },
            advertising: {
                proImg: "",
                picheight: '600',
                picwidth: '215'
            },
            firstNavigation: "", //栏目一级菜单
            secondNavigation: "", //栏目二级菜单
            columnsPath: { //栏目链接
                firstval: "请选择", //一级栏目
                secondval: "请选择", //二级栏目
                path: "", //自定义链接
            },
            columntype: '',
            columnName: '',
            Classify: { //分类
                pro: { //产品分类
                    oneClassify: [], //分类一级
                    childsSeconds: [], // 二级分类
                    childsThirds: [], // 三级级分类
                },
                news: { //产品分类
                    oneClassify: [], //分类一级
                    childsSeconds: [], // 二级分类
                    childsThirds: [], // 三级级分类
                }
            },
            sbwUserWebInfo: '',
            isUpdatePage:false,
            isB2c: 'shop', //存储商城用户类型
            b2cImaSrc: 'http://test.image.cangluxmt.com/jcshopimage', //存储商城图片路径
            webName: '', //存储网站名称
            saveParams: { //  存储用户数据
                id: null, //  网站ID
                userId: 1, //  用户ID
                domainUrl: ''
            }
        }
    },
    created() {
        this.toSessionStorage('domain', domain);
        var channelflag = window.location.href.indexOf('mobile') >= 0;
        this.channel = channelflag ? 2 : 1; // 1：PC 2: 微站
        var url = '';
        var isMobile = this.toSessionStorage('channel');
        if (isMobile == null || isMobile == "" || isMobile == undefined) {
            this.toSessionStorage('channel', this.channel);
        } else {
            if (isMobile != this.channel) {
                this.toSessionStorage('channel', this.channel);
            }
        }

        /**
         * 校验网站是否已经获取到用户信息&&网站信息
         * 作用：记录网站类型，网站id，用户
         */
        if (window.location.href.indexOf('wave2') >= 0 || window.location.href.indexOf('clauthweb') >= 0 ||
            window.location.href.indexOf('web') >= 0 || window.location.href.indexOf('ali') >= 0 || window.location.href.indexOf('8889') >= 0) {
            this.isPreview = false;
            url = domain + 'service/index.html?channel=' + this.channel;
        } else {
            url = domain + 'index.html?domainUrl=' + window.location.host;
            this.isPreview = true;
        }
        this.init(url);
    },
    mounted: function () {


    },
    computed: {
        infoPage(){
            if(app.isInfoPage){
                return "margin-top:0px;height:100%"
            }else{
                return "";
            }
        },
        overflow(){
            if (app.mobileNav) {
                return 'overflow-y:hidden'
            }
        },
        canvasStyle() {
            // 通栏背景设置
            let config = {};
            if (this.groupContainer.common.config === undefined) {
                return false;
            }
            if (this.groupContainer.common.config.def) {
                // 非默认背景
                config = this.groupContainer.common.canvasStyle;
            } else {
                // 默认背景
                config = app.groupItemconfig.settingConfig.canvasStyle;
            }

            if (config != undefined) {
                let cs = config;
                let bg = '';
                if (cs['src'] != undefined && cs['src'] != '')
                // 无src 不添加url()
                    bg = 'url("' + cs.src + '")';
                return {
                    'background-color': app.recoverSymbol(cs.color),
                    'background-image': bg,
                    'background-repeat': cs.repeat,
                    'background-size': cs.size,
                    'background-position': cs.position,
                }
            }
        }
    },
    methods: {
        getScrollTop(){
            var scrollPos;
            if (typeof window.pageYOffset != 'undefined') {
                scrollPos = window.pageYOffset;
            }
            else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
                scrollPos = document.documentElement.scrollTop;
            }
            else if (typeof document.body != 'undefined') {
                scrollPos = document.body.scrollTop;
            }
            return scrollPos;
        },
        /**
         * 键盘操作坐标
         * @param {需要修改的组件model} model
         */
        fineTurn(el, model){

            //微站定义可键盘控制的的组件数组
            let canFineTurn = ['font', 'add-picture', 'button-type'];
            let pos = {
                left: parseInt(model.style.left),
                top: parseInt(model.style.top)
            }
            $(document).off().keydown(function (ev) {
                let v = 0;
                if (ev.ctrlKey) { //按下ctrl，键盘操作偏移1px
                    v = 1;
                }
                if (ev.shiftKey) { //按下shift，键盘操作偏移10px
                    v = 10;
                }
                switch (ev.which) {
                    case 37:
                        pos.left -= v;
                        break;
                    case 38:
                        pos.top -= v;
                        break;
                    case 39:
                        pos.left += v;
                        break;
                    case 40:
                        pos.top += v;
                        break;
                }
                //移动式清空工具条
                $('#toolbar').empty();
                //判断是微端时执行相应操作
                if (app.channel == 2) {
                    if (canFineTurn.indexOf(model.__componentType) > -1) {
                        model.style.left = pos.left + 'px';
                        model.style.top = pos.top + 'px';
                    } else {
                        model.style.top = pos.top + 'px';
                    }
                } else {
                    model.style.left = pos.left + 'px';
                    model.style.top = pos.top + 'px';
                }
            });
        },
        /**
         * 用于新增配置单属性的更新
         * @param 配置单名称
         */
        navCheck(param, self) {
            //logo
            let config = JSON.parse(param)
            if (config.settingConfig.logo === undefined) {
                config.settingConfig.logo = this.groupContainer.navContainer.settingConfig.logo
            }
            if (config.settingConfig.config.showSelect === undefined) {
                config.settingConfig.config.showSelect = this.groupContainer.navContainer.settingConfig.config.showSelect
            }
            if (config.settingConfig.config.showStyle === undefined) {
                config.settingConfig.config.showStyle = this.groupContainer.navContainer.settingConfig.config.showStyle
            }
            if (config.settingConfig.showStyle === undefined) {
                config.settingConfig.showStyle = this.groupContainer.navContainer.settingConfig.showStyle
            }

            return config
        },
        footerNavCheck(param, self){
            let config = JSON.parse(param);
            if (app.channel == 2) {
                let navList = config.settingConfig.canvasStyle.navList;
                for (var i = 0; i < navList.length; i++) {
                    if (navList[i].imgSrc.indexOf('./images') > -1) {
                        navList[i].imgSrc = "http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-1.png"
                    }
                }
            }
            return config
        },
        init(url) {
            var _this = this;
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                async: 'false',
                success: function (res) {
                	var serviceType = res.data.serviceType;//服务类型(pc+微站、小程序、android、ios、公众号)
                	var status = res.data.status;
                    _this.channel = res.data.channel;
                    if (!res.success) {
                        // 获取用户失败
                        if (res.total == 999) {
                            //登录过期
                            showToast({
                                title: '提示',
                                msg: res.message,
                                cancleBar: '取消',
                                confirmBar: '重新登录',
                                confirm: function (e) {
                                    window.location.href = "http://www.cangluxmt.com/user/index.html";
                                },
                                cancle: function () {

                                }
                            })
                        } else {
                        	//此方法用来判断，如果没有启用pc,则自动跳转到微站，如果微站也没有启用，则提示
                        	if(_this.channel==1 && status!=undefined && status==0){//PC,停用
                        		
                            		window.location.href = domain+"clauthweb/mobileIndex.html";
                            	
                        	}
                        	if(_this.channel==2 && status!=undefined && status==0){//微站,停用
                        		showTips(res.message);
                        	}
                        }
                    } else {
                    	//如果服务类型中，没有pc建站，则不显示，右上角按钮
                    	if(serviceType!=undefined && serviceType.indexOf("2") == -1){
                    		_this.isShowPC = false;
                    	}
                        /**
                         * 登录成功
                         * */
                        var data = res.data.sbwUserWebInfo;
                        let oid = _this.toSessionStorage('userId');
                        //设置网页title信息
                        document.title = data.title == null ? "-" : data.title;
                        // 校验登录的用户信息
                        // 更换用户
                        if (oid != data.userId) {
                            _this.delSessionStorage('pageid');
                            _this.delSessionStorage('id');
                            _this.delSessionStorage('userId');
                        }
                        _this.toSessionStorage('userId', data.userId);
                        _this.sbwUserWebInfo = data.name;
                        app.toSessionStorage('id', data.id); //存储用户网站ID
                        app.toSessionStorage('userId', data.userId); //存储用户id
                        app.toSessionStorage('uname', res.data.uname); //存储用户名称
                        app.toSessionStorage('domainUrl', data.domainUrl);
                        _this.saveParams.id = data.id;
                        _this.saveParams.userId = data.userId;
                        _this.saveParams.domainUrl = data.domainUrl;
                        _this.webcode = data.themeCode; //网站类型
                        _this.toSessionStorage('webcode', data.themeCode);
                        /**
                         * 判断用户类型
                         * */
//                        if (_this.webcode == 'B2C') {
//                            _this.isB2c = 'b2c';
//                            _this.b2cImaSrc = 'http://test.image.cangluxmt.com/clb2cimage';
//                        } else if (_this.webcode == 'B2B2C' || _this.webcode == 'NEWS') {
//                            _this.isB2c = 'shop';
//                            _this.b2cImaSrc = 'http://test.image.cangluxmt.com/jcshopimage';
//                        }


                        _this.toWebsessionStorage('userId', data.userId);
                        _this.toWebsessionStorage('domainUrl', data.domainUrl);
                        _this.toWebsessionStorage('sysWebId', data.sysWebId);
                        if (!data.sysWebId) {
                            _this.pageLoaded = true;
                            msgToast({
                                title: '提示',
                                msg: '您未选择模板，请先选择一个模板',
                                confirmBar: '确定',
                                confirm: function (e) {
                                    // 当用户第一进入（未选择模板时），提示用户选择模板
                                    _this.hasSysWeb = false;
                                    _this.toggleIcon('tpl');
                                    $('#tpl').css({
                                        'z-index': '1000'
                                    })
                                    $('.loading_tier').show();
                                }
                            })

                        } else {
                            // 当用户不是第一进入
                            _this.hasSysWeb = true;
                            _this.resolution = data.resolution; //网站的内容区大小
                            if (data.colorStyle == null) {
                                _this.themecolor = 'ff3d30'; //当前主题色
                                _this.othertheme = 'ff3d30'; //自定义主题色

                            } else {
                                _this.themecolor = data.colorStyle; //当前主题色
                                _this.othertheme = data.colorStyle; //自定义主题色
                            }

                        }
                        // 第一次进来渲染页面
                        _this.loadst();
                        //userList();
                        if (!app.isPreview) {
                            //预加载图片---edit by dengxf 20180414
                            _this.loadImage(data => {
                                let r = data.picLibs;

                                for (var i = 0; i < r.length; i++) {
                                    _this.cellList.push({
                                        src: r[i].imgPath,
                                        id: r[i].id
                                    })
                                }
                            });
                            //end
                            //页面栏目分类
                            let categoryUrl = 'service/system/column/category.html';
                            let categoryUrlData = {};
                            productPost(
                                categoryUrl,
                                categoryUrlData,
                                function (callback) {
                                    app.navType = callback.data.columnList; //栏目类型
                                    app.defaultSelect = callback.data.styleList; //所有栏目预设的样式
                                },
                                function (callback) {
                                }
                            );
                            //请求模板分类信息
                            _this.reqTplcategory();
                        }

                    }

                },
                error: function (e) {
                    console.error(e);
                }
            });
        },
        loadst() {
            let self = this;
            /**
             * 如果需要选择模板时，则不初始化(load)页面
             */
            if (!self.pageLoaded) {
                setTimeout(() => {
                    // 设置30s超时
                    if (!self.pageLoaded) {
                        this.$confirm('网络请求超时，请重试', '提示', {
                            confirmButtonText: '重试',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true,
                        }).then(() => {
                            window.location.reload();
                        }).catch(() => {
                        });
                    }
                }, 30000)
                self.loadAllPages(e => {
                    let pageid = '';
                    /**
                     * 优先加载url的pageid 用来做页面跳转
                     */
                    if (window.location.href.indexOf('pageid') == -1 && app.getRequest().pageid != e.data.userPageList["0"].id) {
                        pageid = e.data.userPageList["0"].id;
                        window.location.href = '?pageid=' + pageid;
                        app.toWebsessionStorage('firstPage', pageid);
                    } else {
                        pageid = app.getRequest().pageid;
                    }
                    let f = self.getFirstParentId(e.data.userPageList);
                    app.firstParentId = f.firstParentId;
                    app.firstTemplate = f.firstTemplatess;
                    //end

                    self.loadPage(pageid, e => {

                        self.pageLoaded = true;
                        let info = JSON.parse(this.recoverSymbol(JSON.stringify(e.data.userPageInfo)));
                        if (info.columnCode != 'index') {
                            //设置网页title信息
                            document.title = info.name == null ? "-" : info.name;
                        }
                        self.savePageInfo['name'] = info.name;
                        self.savePageInfo['id'] = info.id;
                        self.savePageInfo['columnCode'] = info.columnCode;
                        let header = info.head;
                        let body = info.body;
                        let bottom = info.bottom;
                        let banner = info.webBanner;
                        let navigation = info.navigation;
                        let common = info.bodyStyle;
                        let navContainer = info.navContainer;
                        if (common) this.groupContainer.common = JSON.parse(common);
                        if (navigation) this.groupContainer.navigation = JSON.parse(navigation);
                        if (header) this.groupContainer.header = JSON.parse(header);
                        if (banner) this.groupContainer.banner = JSON.parse(banner);
                        if (bottom) this.groupContainer.bottom = this.footerNavCheck(bottom, self);
                        if (body) this.groupContainer.body = JSON.parse(body);
                        if (navContainer) this.groupContainer.navContainer = this.navCheck(navContainer, self)
                    })
                });
            }

        },
        getFirstParentId(arr){
            let firstParentId = [];
            let firstTemplatess = [];
            arr.forEach(e => {
                if (e.pageType != 3) {
                    firstParentId.push(e);
                    if (e.pageType == 2) {
                        if (e.columnCode == 'pro') {
                            app.toWebsessionStorage('proId', e.id);
                        }
                    }
                    if (e.parentId == 0) {
                        firstTemplatess.push(e);
                    }
                    if (e.columnCode == "index") {
                        app.pageContent = e;
                        linkUrl = e.linkUrl;
                    }
                } else {
                    if (e.columnCode == 'newsd') {
                        app.toWebsessionStorage('ndId', e.id);
                    } else if (e.columnCode == 'prod') {
                        app.toWebsessionStorage('pdId', e.id);
                    }
                }
            })
            return {
                firstParentId,
                firstTemplatess
            }
        },
        getPageInfo(params, callback, errorback){
            var picsUrl = domain + 'user/page/' + pageId + '.html';
            $.ajax({
                url: picsUrl,
                type: 'POST',
                data: {
                    id: params
                },
                dataType: 'json',
                success: function (response) {
                    if (response.success && response.data) {
                        callback && callback(response.data.userPageInfo.name);
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },
        //页面切换
        changePage(pageId, detailId, allInfo, openType) {
            if(!app.isPreview){
                app.savePage();
            }
            if (detailId != undefined || detailId != null) {
                app.toSessionStorage('allInfo', JSON.stringify(allInfo));
                if (app.channel == '2') {
                    if(app.getRequest().nav!=undefined){
                        window.location.href = '?pageid=' + pageId + '&detailid=' + detailId+'&nav=0';
                    }else{
                        window.location.href = '?pageid=' + pageId + '&detailid=' + detailId;
                    }
                } else {
                    if (openType == '0') {
                        window.location.href = '?pageid=' + pageId + '&detailid=' + detailId;
                    } else {
                        window.open('?pageid=' + pageId + '&detailid=' + detailId);
                    }
                }
            } else {
                if(app.getRequest().nav!=undefined){
                    window.location.href = '?pageid=' + pageId+'&nav=0';
                }else{
                    window.location.href = '?pageid=' + pageId;
                }


            }
        },
        //获取地址栏参数
        getRequest() {
            var url = window.location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {

                    theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);

                }
            }
            return theRequest;
        },
        /** 用户留言 */
        userMsg(e) {
            var self = this;
            var picsUrl = domain + 'message/save.html';
            var data = {
                content: e.message,
                contract: e.name,
                telephone: e.phone,
                email: e.email,
            };
            $.ajax({
                url: picsUrl,
                type: 'POST',
                data,
                dataType: 'json',
                success: function (response) {

                    if (response.success) {
                        self.$message({
                            message: '留言成功！',
                            type: 'success'
                        });
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        //  预览
        toPreivew() {
            // this.isPreview    = true;
            let self = this;
            self.toPreivewLoad = true;
            this.savePage((res) => {
                if (res.success && res.total == 0) {
                    let url = 'service/user/web/save.html';
                    let data = {
                        userActions: 'preview',
                    };
                    productPost(
                        url,
                        data,
                        function (res) {
                            if (res.success && res.total == 0) {
                                // self.toPreivewLoad = true;
                                if(app.channel==2){
                                    setTimeout(() => {
                                        self.toPreivewLoad = false;
                                        app.$notify({
                                            customClass:'mobile-code',
                                            title: '请使用手机扫描二维码查看预览效果',
                                            position: "top-right",
                                            dangerouslyUseHTMLString: true,
                                            message: '<div id="output" style="width: 200px;height: 200px;"></div><div style="color: #f12305;font-size: 13px;line-height: 40px">http://'+res.data+'</div>',
                                            duration: 0
                                        });
                                        $('#output').qrcode({render:"canvas",width:200,height:200,text:"http://" + res.data +""});
                                    }, 10000);

                                }else{
                                    setTimeout(() => {
                                        self.toPreivewLoad = false;
                                        let msg = res.data;
                                        app.$notify({
                                            title: '点击这个链接预览',
                                            position: "top-right",
                                            dangerouslyUseHTMLString: true,
                                            message: '<a href="http://' + res.data + '" target="_blank">http://' + res.data + '</a>',
                                            duration: 5000
                                        });
                                    }, 10000);
                                }
                            }
                        },
                        function (callback) {
                        }
                    );
                } else {
                    showTips('网络繁忙，请稍后重试！');
                }
            })
        },
        /**
         * 查询图片库列表
         * @param userId 用户ID（0、表示为系统图片库；传任意数字表示为用户上传的图片）
         */
        loadImage(callback, errorback) {
            var picsUrl = domain + '/picture/libs.html';
            $.ajax({
                url: picsUrl,
                type: 'POST',
                data: {
                    userId: 1
                },
                dataType: 'json',
                success: function (response) {
                    if (response.success && response.data) {
                        callback && callback(response.data)
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },
        /**
         * 上传图片接口(单张)  注:<input type="file" name="xxx" /> 需给input添加name属性
         * @param userWebId    用户网站id
         * @param param    参数：(page：设计页面 news：新闻 product：产品)
         */
        uploadImage(params, callback, errorback) {
            var imageUrl = domain + 'user/page/uploadImg.html';
            $.ajax({
                url: imageUrl,
                type: 'POST',
                data: {
                    userWebId: app.saveParams.id,
                    param: params
                },
                dataType: 'json',
                success: function (response) {
                    if (response.success && response.data) {
                        callback && callback(response.data)
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },

        /**
         * 上传图片接口(多张)  注:<input type="file" name="xxx" /> 需给input添加name属性
         * @param userWebId    用户网站id
         * @param param    参数：(page：设计页面 news：新闻 product：产品)
         */
        uploadImageList(params, callback, errorback) {
            var imageListUrl = domain + 'service/user/page/uploadImgList.html';
            $.ajax({
                url: imageListUrl,
                type: 'POST',
                data: {
                    userWebId: app.saveParams.id,
                    param: params
                },
                dataType: 'json',
                success: function (response) {
                    if (response.success && response.data) {
                        callback && callback(response.data)
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },
        /**
         * 加载文章分类列表
         * @param params： level 分类级别(1、一级分类 2、二级分类 3、三级分类  -1、查询所有分类)
         * @param callback
         */
        loadArticleCate(params, callback, errorback) {
            var loadArticleCateUrl = domain + 'service/newsCate/list.html';
            $.ajax({
                url: loadArticleCateUrl,
                type: 'POST',
                data: params,
                dataType: 'json',
                success: function (response) {
                    if (response.success && response.data && Array.isArray(response.data.newsCateList)) {
                        callback && callback(response.data.newsCateList)
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },
        /**
         * 根据分类id加载加载文章列表
         * @param param：
         * state    状态（1、查询产品  2、回收站）  --非必填
         * rows    每页显示条数（分页）  --非必填
         * page    页码（分页）  --非必填
         * name    文章名称（查询条件）  --非必填
         * newsCateId    文章分类ID  --必填
         * @param callback
         */
        loadArticles(params, callback, errorback) {
            //TODO 后台考虑支持-1为所有列表
            if (params.newsCateId != -1) {
                let newsList = app.cacheArticleCatogory(params.newsCateId);
                if (newsList) {
                    callback(newsList);
                    return;
                }
            }
            var loadArticlesUrl = domain + 'service/news/list.html';
            $.ajax({
                url: loadArticlesUrl,
                type: 'POST',
                data: params,
                dataType: 'json',
                success: function (response) {
                    if (response.success && response.data && Array.isArray(response.data.newsList)) {
                        callback && callback(response.data.newsList);
                        if (response.data.newsList && response.data.newsList.length > 0)
                            app.cacheArticleCatogory(params.newsCateId, response.data.newsList);
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },
        /**
         * 文章分类下的所有文章缓存
         * @param newsCateId 文章分类id
         * @param newsList 文章分类列表，为空时为读取，不为空时为保存
         */
        cacheArticleCatogory(newsCateId, newsList) {
            if (newsList) {
                app.aritcleCategoryCache[newsCateId] = newsList;
            }
            return app.aritcleCategoryCache[newsCateId];
        },
        /**
         * 查询文章摘要接口
         * @param id 主键ID
         * @param callback
         */
        loadArticleSummary(params, callback, errorback) {
            //load from cache
            if (params.id) {
                let art = app.cacheArticleSummary(params);
                if (art) {
                    callback(art);
                    return;
                }
            }
            var articleSummaryUrl = domain + 'news/summary.html';
            $.ajax({
                url: articleSummaryUrl,
                type: 'POST',
                data: params,
                dataType: 'json',
                // async:false,
                success: function (response) {
                    if (response.success && response.data) {
                        callback && callback(response.data.news);
                        if (response.data.news) app.cacheArticleSummary(response.data.news.id, response.data.news);
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },
        /**
         * 文章缓存
         * @param id
         * @param news 有内容是保存，没内容是读取
         */
        cacheArticleSummary(id, news) {
            if (news) app.aritcleCache[id] = news;
            return app.aritcleCache[id]
        },
        /**
         * 查询文章详情接口
         * @param id 主键ID
         * @param callback
         */
        loadArticleDetail(params, callback, errorback) {
            var articleDetailUrl = domain + 'news/' + params.id + '.html';
            $.ajax({
                url: articleDetailUrl,
                type: 'POST',
                data: params,
                dataType: 'json',
                success: function (response) {
                    if (response.success && response.data) {
                        callback && callback(repsonse.data)
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },
        /**
         * 查询文章详情接口
         * @param id 主键ID
         * @param callback
         */
        loadNewsCate(params, callback, errorback) {
            var articleDetailUrl = domain + 'shop/news/newsType.html';
            params['userId'] = app.toSessionStorage('userId');
            $.ajax({
                url: articleDetailUrl,
                type: 'GET',
                data: params,
                dataType: 'json',
                success: function (response) {
                    if (response.success && response.data) {
                        callback && callback(response.data.newsTypeList)
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },
        /**
         * 根据分类id加载加载文章列表
         * @param param：
         * state    状态（1、查询产品  2、回收站）  --非必填
         * rows    每页显示条数（分页）  --非必填
         * page    页码（分页）  --非必填
         * name    文章名称（查询条件）  --非必填
         * newsCateId    文章分类ID  --必填
         * @param callback
         */
        loadNewsArticles(params, callback, errorback) {
            var loadArticlesUrl = domain + 'shop/news/news.html';
            $.ajax({
                url: loadArticlesUrl,
                type: 'GET',
                data: params,
                dataType: 'json',
                success: function (response) {
                    if (response.success && response.data && Array.isArray(response.data.newsList)) {
                        callback && callback(response.data.newsList);
                        if (response.data.newsList && response.data.newsList.length > 0)
                            app.cacheArticleCatogory(params.newsCateId, response.data.newsList);
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },
        /**
         * 查询文章摘要接口
         * @param id 主键ID
         * @param callback
         */
        loadNewsSummary(params, callback, errorback) {
            //load from cache
            // if (params.id) {
            //     let art = app.cacheArticleSummary(params);       
            //     if (art) {
            //         callback(art);
            //         return;
            //     }
            // }
            var articleSummaryUrl = domain + 'shop/news/getNews.html';
            $.ajax({
                url: articleSummaryUrl,
                type: 'GET',
                data: params,
                dataType: 'json',
                // async:false,
                success: function (response) {
                    if (response.success && response.data) {
                        callback && callback(response.data.news);
                        if (response.data.news) app.cacheArticleSummary(response.data.news.id, response.data.news);
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },
        /**
         * 加载商品分类接口
         * */
        loadB2CProductCate(params, callback, errorback) {
            var productCateUrl = domain + app.isB2c + '/catelist.html';
            //params['userId'] = app.toSessionStorage('userId');
            $.ajax({
                url: productCateUrl,
                type: 'GET',
                data: {userId: app.toSessionStorage('userId')},
                dataType: "json",
                success: function (response) {
                    if (response.success && response.data && Array.isArray(response.data.cateList)) {
                        callback && callback(response.data.cateList)
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },


        /**
         * 加载商品分类所对应列表接口
         * cateId 商品分类ID
         * */
        loadB2CProductList(params, callback, errorback) {
            var productCateUrl = domain + app.isB2c + '/productList.html';
            $.ajax({
                url: productCateUrl,
                type: 'GET',
                data: params,
                dataType: "json",
                success: function (response) {
                    if (response.success && response.data && Array.isArray(response.data.productList)) {
                        callback && callback(response.data.productList)
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },

        /**
         * 加载商品信息接口
         * productId 商品ID
         * */
        loadB2CProduct(params, callback, errorback) {
            var productCateUrl = domain + app.isB2c + '/product.html';
            $.ajax({
                url: productCateUrl,
                type: 'GET',
                data: params,
                dataType: "json",
                success: function (response) {
                    if (response.success && response.data) {
                        callback && callback(response.data.product)
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },


        /**
         * 加载产品分类接口
         * @param param： level 分类级别(1、一级分类 2、二级分类 3、三级分类  -1、查询所有分类)
         * @param callback
         */
        loadProductCate(params, callback, errorback) {
            var productCateUrl = domain + 'service/productCate/list.html'; //  产品分类url
            $.ajax({
                url: productCateUrl,
                type: 'POST',
                data: params,
                dataType: "json",
                success: function (response) {
                    if (response.success && response.data && Array.isArray(response.data.productCateList)) {
                        callback && callback(response.data.productCateList)
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },
        /**
         * 加载产品列表接口
         * @param param：
         * state    状态（1、查询产品  2、回收站）  --非必填
         * rows    每页显示条数（分页）  --非必填
         * page    页码（分页）  --非必填
         * name    文章名称（查询条件）  --非必填
         * productCateId    产品分类ID  --必填
         * @param callback
         */
        loadProductList(params, callback, errorback) {
            var productListUrl = domain + 'service/product/list.html'; //  产品列表url
            $.ajax({
                url: productListUrl,
                data: params,
                type: 'POST',
                dataType: 'json',
                success: function (response) {
                    if (response.success && response.data && Array.isArray(response.data.productList)) {
                        callback && callback(response.data.productList)
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },
        /**
         * 查询产品展示接口--只显示产品名称、图片、价格、市场价、编号
         * @param id 主键ID
         * @param callback
         */
        loadProductSummary(params, callback, errorback) {
            var productSummaryUrl = domain + 'product/summary.html';
            $.ajax({
                url: productSummaryUrl,
                type: 'POST',
                data: params,
                dataType: 'json',
                success: function (response) {
                    if (response.success && response.data) {
                        callback && callback(response.data.product)
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },
        /**
         * 查询产品详情接口
         * @param id 主键ID
         * @param callback
         */
        loadProductDetail(params, callback, errorback) {
            var productDetailUrl = domain + 'product/' + params.id + '.html';
            $.ajax({
                url: productDetailUrl,
                type: 'POST',
                data: params,
                dataType: 'json',
                success: function (response) {
                    if (response.success && response.data) {
                        callback && callback(response.data)
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },

        /**
         * 加载楼层接口
         * @param param： level 楼层级别(-1、查询所有楼层)
         * @param callback
         */
        loadFloorCate(params, callback, errorback) {
            var productCateUrl = domain + app.isB2c + '/floor.html';
            params['userId'] = app.toSessionStorage('userId');
            $.ajax({
                url: productCateUrl,
                type: 'GET',
                data: params,
                dataType: "json",
                success: function (response) {
                    if (response.success && response.data && Array.isArray(response.data.floorList)) {
                        callback && callback(response.data.floorList)
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },
        /**
         * 加载对应楼层分类列表接口
         * @param param：
         * @param callback
         */
        loadFloorList(params, callback, errorback) {
            var productListUrl = domain + app.isB2c + '/floorClass.html';
            $.ajax({
                url: productListUrl,
                data: params,
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    if (response.success && response.data && Array.isArray(response.data.floorClassList)) {
                        callback && callback(response.data.floorClassList)
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },


        /**
         * 加载对应楼层分类列表下商品数据接口
         * @param param：
         * @param callback
         */
        loadGoodsList(params, callback, errorback) {
            var productListUrl = domain + app.isB2c + '/floorData.html';

            $.ajax({
                url: productListUrl,
                data: params,
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    if (response.success && response.data && Array.isArray(response.data.floorData)) {
                        callback && callback(response.data.floorData)
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },


        /**
         * 加载商品导航数据接口
         * @param param：
         * @param callback
         */
        loadGoodsNav(params, callback, errorback) {
            var productListUrl = domain + 'user/promotional.html';
            $.ajax({
                url: productListUrl,
                data: params,
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    if (response.success && response.data && Array.isArray(response.data.promotional)) {
                        callback && callback(response.data.promotional)
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },
        /**
         * 加载分类/详情数据接口
         * @param param：
         * @param callback
         */
        loadGoodsInfo(params, callback, errorback) {
            var productListUrl = domain + 'user/productCateUrl.html';
            $.ajax({
                url: productListUrl,
                data: params,
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    if (response.success && response.data && Array.isArray(response.data.productCateUrl)) {
                        callback && callback(response.data.productCateUrl)
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },


        /**
         * 查询留言板列表
         * @param state    状态（1、正常  2、已删除）--必填
         * userWebId    用户网站--必填
         * rows    每页显示条数（分页）--非必填
         * page    页码（分页）--非必填
         */
        loadMessageList(params, callback, errorback) {
            var messageUrl = domain + 'message/list.html';
            $.ajax({
                url: messageUrl,
                data: params,
                dataType: 'json',
                type: 'POST',
                success: function (response) {
                    if (response.success && response.data && Array.isArray(response.data.userPageList)) {
                        callback && callback(response.data.userPageList)
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },
        /**
         * 保存留言板信息
         * @param content    留言板内容
         * @param company    公司名称
         * @param contract    联系人
         * @param telephone    联系电话
         * @param email    邮箱
         */
        saveMessage(params, callback, errorback) {
            var saveMessageUrl = domain + 'message/save.html'
            $.ajax({
                url: saveMessageUrl,
                data: params,
                dataType: 'json',
                type: 'POST',
                success: function (response) {
                    if (response.success) {
                        callback && callback(response)
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },
        /**
         * 查看留言板详情
         * @param id    主键ID
         */
        showMessageDetail(params, callback, errorback) {
            var messageDetailUrl = domain + 'message/' + params.id + '.html';
            $.ajax({
                url: messageDetailUrl,
                data: params,
                dataType: 'json',
                type: 'POST',
                success: function (response) {
                    if (response.success) {
                        callback && callback(response)
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (errorback) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },
        /**
         * 分类目录查询,根据id查询
         */
        classifyLook(callback,errorback,id){
            let classifyLookUrl=domain+'service/catalogue/list.html';//查询全部数据
            if(id) classifyLookUrl=domain+'service/catalogue/get.html?id='+id;//根据id查询数据
            $.ajax({
                url:classifyLookUrl,
                dataType:'json',
                type:'GET',
                success:function (response) {
                    if (response.success) {
                        callback && callback(response);
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (errorback) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },
        /**
         * 分类目录添加与修改
         * @data 数据
         */
        classifyAdd(data,callback,errorback){
            let classifyLookUrl=domain+'service/catalogue/save.html';
            $.ajax({
                url:classifyLookUrl,
                data:data,
                dataType:'json',
                type:'POST',
                success:function (response) {
                    if (response.success) {
                        callback && callback(response);
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (errorback) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },
        /**
         * 分类目录删除
         */
        classifyDel(id,callback,errorback){
            let url=domain+'/service/catalogue/del.html?id='+id;
            $.ajax({
                url:url,
                dataType:'json',
                type:'GET',
                success:function (response) {
                    if (response.success) {
                        callback && callback(response);
                    } else {
                        errorback && errorback()
                    }
                },
                error: function (errorback) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            })
        },
        /**
         * 存取缓存 先这样写着吧
         *
         * */
        toSessionStorage(key, value) {
            if (value) {
                sessionStorage.setItem(key, value);
            }
            return sessionStorage.getItem(key);

        },
        delSessionStorage(key) {
            sessionStorage.removeItem(key);
        },
        toLocalStorage(key, value) {
            if (value) {
                localStorage.setItem(key, value);
            }
            return localStorage.getItem(key);
        },


        /**
         * 存储web对象
         * */
        toWebsessionStorage(key, value) {
            var webInfo = sessionStorage.getItem('webInfo');
            if (typeof (webInfo) == 'string')
                webInfo = JSON.parse(webInfo);
            else if (webInfo == "null" || webInfo == undefined) {
                webInfo = {};
            }
            if (value) {
                let w;
                webInfo[key] = value;
                w = JSON.stringify(webInfo);
                sessionStorage.setItem('webInfo', w);
            }
            return webInfo[key];
        },


        //去到小后台
        gotoNewPage: function (shref) {
            window.location.href = shref;
        },

        treefy(r) {
            let list = {};
            let result = [];
            r.forEach(e => {
                if (list[e.id]) {
                    e.children = list[e.id].children;
                }
                list[e.id] = e;

                if (e.parentId == 0) {
                    if (e.checked != false) {
                        result.push(e);
                    }
                } else {
                    if (list[e.parentId]) {
                        if (list[e.parentId].children == null) {
                            if (list[e.parentId].checked != false) {
                                list[e.parentId].children = [];
                            }
                        }
                    } else {
                        if (list[e.parentId].checked != false) {
                            list[e.parentId] = {
                                children: []
                            };
                        }

                    }
                    if (e.checked != false) {
                        list[e.parentId].children.push(e);
                    }

                }
            });
            return result;
        },

        mallTreefy(r) {
            let list = {};
            let result = [];
            r.forEach(e => {
                if (list[e.id]) {
                    e.children = list[e.id].children;
                }
                list[e.id] = e;

                if (e.pid == 0) {
                    if (e.checked != false) {
                        result.push(e);
                    }
                } else {
                    if (list[e.pid]) {
                        if (list[e.pid].children == null) {
                            if (list[e.pid].checked != false) {
                                list[e.pid].children = [];
                            }
                        }
                    } else {
                        if (list[e.pid].checked != false) {
                            list[e.pid] = {
                                children: []
                            };
                        }

                    }
                    if (e.checked != false) {
                        list[e.pid].children.push(e);
                    }

                }
            });
            return result;
        },
        //自定义模块高度
        selfDefindHeightChange: function () {
            var _this = this;
            $(".boxEdit .containment").css({
                height: _this.selfDefined + "px"
            })
        },
        // 局部loading是否显示 1 为显示 0或者任何值为隐藏
        TopoLoadingFlag: function (flag) {
            if (flag == '1') {
                this.topoLoading = true;
            } else {
                this.topoLoading = false;
            }
        },
        getsecondSelect: function (_this) {
            this.selectClassify.CateId = '';
            this.selectClassify.haveChildsSeconds = false;
            this.selectClassify.haveChildsThirds = false;
            this.selectClassify.CateId = this.selectClassify.oneClassifyClassfiyId;
            if (this.selectClassify.childsSeconds.length > 0) {
                for (var i = 0; i < this.selectClassify.childsSeconds.length; i++) {
                    if (this.selectClassify.childsSeconds[i].parentId == this.selectClassify.oneClassifyClassfiyId) {
                        this.selectClassify.haveChildsSeconds = true;
                    }
                }
            }

        },
        getchildsThirds: function (_this) {
            this.selectClassify.CateId = '';
            this.selectClassify.CateId = this.selectClassify.SecondClassifyClassfiyId;
            if (this.selectClassify.childsThirds.length > 0) {
                for (var i = 0; i < this.selectClassify.childsThirds.length; i++) {
                    if (this.selectClassify.childsThirds[i].parentId == this.selectClassify.SecondClassifyClassfiyId) {
                        this.selectClassify.haveChildsThirds = true;
                    }
                }
            }
        },

        getCateId: function (_this) {
            this.selectClassify.CateId = $(_this.srcElement).find('option:selected').attr('data-CateId');
        },
        classify: function () {
            var _this = this;
            let url = domain + 'service/' + this.selectClassify.type + 'Cate/list.html';
            let data = {
                userWebId: app.toSessionStorage("id"),
            };
            _this.TopoLoadingFlag(1);
            $.ajax({
                url: url,
                data: data,
                dataType: "json",
                type: "POST",
                success: function (data) {
                    let list = [];
                    if (app.selectClassify.type == 'news') {
                        list = data.data.newsCateList;
                        app.classifys = data.data.newsCateList;
                    } else if (app.selectClassify.type == 'product') {
                        list = data.data.productCateList;
                        app.classifys = data.data.productCateList;
                    } else {
                        showTips('获取分类失败')
                        return
                    }
                    _this.TopoLoadingFlag(0);
                },
                error: function (msg) {
                    console.log(msg)
                }
            })
        },

        //《---- 这部分是头部设置 主题信息
        setStyleFn: function () {
            if (this.setStyle) {
                this.setStyle = !this.setStyle;
                return false;
            }
            closeDialog(); //所有弹窗
            // 点击设计打开/关闭主题信息设置
            this.setStyle = !this.setStyle;

        },
        closeHistory: function () {
            this.showhistory = false;
        },
        closeDialog: function (flag) {
            var _this = this;
            switch (flag) {
                case 'showPages':
                    // 关闭页面管理，所有相关弹窗也应该关闭
                    _this.showPages = false;
                    _this.addPage = false;
                    _this.alterDialog = '';
                    break;
                case 'alterDialog':
                    // 关闭页面管理
                    _this.alterDialog = '';
                    break;
                case 'addPage':
                    // 关闭页面管理
                    _this.addPage = false;
                    break;
                case 'saveTemplate':
                    _this.saveTemplateisDialogShow = 0;
                    break;
                case 'updateFoot':
                    _this.updateFootNav = false;
                    _this.updateHeadNav = false;
                    break;
            }
        },
        // ---》 这部分是头部设置 end 主题信息
        // ---> 页面管理
        alterPage: function (id) {
            if (this.alterPageId == id) {
                this.alterPageId = ' ';
                return false
            }
            this.alterPageId = id;
            this.addPage = false;
        },

        NavHide: function () {
            //导航开关
            // nav.navFlag = !nav.navFlag;
        },


        newPageNext: function () {
            // 下一步
            var info = this.pageInfo,
                flag = this.checkEmpty();
            if (flag) {
                // 校验通过
                this.pageInfo.newPageStep = 2;
            }
        },
        newPageBack: function () {
            // 上一步
            this.pageInfo.newPageStep = 1;
        },

        checkPagelist: function (code, isMobile) {
            //isMobile 判断是否修改头部或者底部导航
            if (isMobile) {
                var info = this.footInfo;
            } else {
                var info = this.pageInfo;
            }
            info.empty = true;
            // 选择预设样式
            if (info.styleCode == code) {
                info.styleCode = '';
                return false;
            }
            info.styleCode = code;
        },
        hasChildPage: function (menuId) {
            //校验当前选中导航是否有下级导航
            var hasChild = true;
            for (var i = 0; i < this.firstParentId.length; i++) {
                if (this.firstParentId[i].parentId == menuId) {
                    hasChild = false;
                }
            }
            return hasChild;
        },


        checkEmpty: function () {
            // 表单校验 非空校验
            var info = this.pageInfo,
                checkout = true,
                _this = this,
                typeName = _this.pageInfo.pageType == 'pro' ? '产品分类' : '文章分类';

            if (info.newPageStep == 2) {
                if (Trim(info.styleCode) == '') {
                    info.msg = '请选择一个预设样式';
                    info.empty = false;
                    checkout = false;
                }
            } else {
                if (Trim(info.pageType) == '') {
                    info.msg = '请选择一个栏目类型'; //当前修改导航的类型
                    info.empty = false;
                    checkout = false;
                } else if (Trim(info.pageName) == '') {
                    info.msg = '栏目名称是必填项'; //当前填写页面名称
                    info.empty = false;
                    checkout = false;
                } else if (info.pageType == 'pro' || info.pageType == 'news') {
                    if (_this.checkClassifys.length == 0) {
                        info.msg = '请选择一个' + typeName; //当前填写页面名称
                        info.empty = false;
                        checkout = false;
                    }
                }

            }
            return checkout;
        },


        //修改微站导航弹窗
        navPop: function (event, ishead) {
            var _this = this;
            if (ishead) {
                _this.updateHeadNav = true;
            } else {
                _this.updateFootNav = true;
            }
        },

        /** 选择修改底部导航样式 */
        // updataMobileNav: function (navType) {
        //     var _this = this;
        //     var navArry = this.defaultSelect;
        //     var code = $(".alter-page").find(".thumb-img.active").attr("value");
        //     var listStyle = '';
        //     for (var i = "0"; i < navArry.length; i++) {
        //         if (navArry[i].channel == "2" && navArry[i].code == code) {
        //             listStyle = navArry[i].listStyle;
        //             if (navType == 1) {
        //                 $("#mobile_nav_box").html(listStyle);
        //                 $("#mobile_nav_box").find('.replaceHtml').attr('data-webTitle', this.sbwUserWebInfo)
        //                 _this.updateHeadNav = false;
        //                 mobileHeadFn();
        //             } else {
        //                 if (code != 'bottom1') {
        //                     app.navFootStyle = false;
        //                 } else {
        //                     app.navFootStyle = true;
        //                 }
        //                 $("#mob_footer").html(listStyle);
        //                 _this.updateFootNav = false;
        //             }


        //         }
        //     }
        // },

        // ---> 页面管理 end
        // <--- 添加为系统模板

        openTplDialog: function () {
            closeDialog();
            this.destroyOldInfoT();
            this.saveTemplateisDialogShow = '1';
        },
        destroyOldInfoT: function () {
            this.saveTemplate = {
                themeCode: '', //网站类型
                industryCode: '', //行业分类
                firstCode: '', //选中的一级分类
                colorCode: '', //主题色系
                levelCode: '', //等级
                name: '', //名称
                msg: '', //校验提示
                thumbImage: '' //缩略图
            }
            $("#tplthumbImg").parent().resetForm();
            $("#thumbImg").attr('src', "");
        },
        // 添加为系统模板 end --- >

        //选择元素类型
        elementClass: function (code) {
            elementDrap(code);
        },
        Splaceholder: function () {
            //编辑搜索按钮
            var newBtnName = app.$data.search.btnname;
            var newPlaceholder = app.$data.search.placeholder;
            $('.edit input[type=text]').attr('placeholder', newPlaceholder);
            if (newPlaceholder != undefined) {
                $('.edit input[type=text]').attr('placeholder', newPlaceholder);
            }
            if (newBtnName != undefined) {
                $('.edit .search-btn').text(newBtnName);
            }
        },


        //请求模板分类
        reqTplcategory: function () {
            var _this = this;
            var url = "service/system/web/category.html",
                data = {};


            function errorfn() {

            };
            // productPost(url, data, successfn, errorfn);
            productPost(
                url,
                data,
                function successfn(res) {
                    var allCategoryArr = res.data.industry; //网站类型
                    _this.webTypeArr = res.data.theme; //主题
                    _this.tplThemeColorArr = res.data.color; //主题颜色
                    for (var i = 0, len = allCategoryArr.length; i < len; i++) {
                        if (allCategoryArr[i].parentCode == 0) {
                            _this.tplTopLevelArr.push(allCategoryArr[i]);
                        } else {
                            _this.tplChildLevelArr.push(allCategoryArr[i]);
                        }
                    }
                    ;
                },
                errorfn);
        },

        //请求行业模板列表
        showTplIndustry: function () {
            var _this = this;
            var url = "service/system/web/list.html";
            // tempaltesData:{//模板列表筛选条件集合
            //     industryCode:'',
            //     themeCode:'',
            //     colorCode:'',
            //     levelCode:'',
            //     name:'',
            //     orderBy:''
            // }
            _this.tempaltesData.themeCode = _this.webcode;
            data = _this.tempaltesData;

            function successfn(res) {
                _this.tplWebInfoList = res.data.sysWebList;
            };

            function errorfn() {

            };
            productPost(url, data, successfn, errorfn);
        },
        // 搜索筛选
        tplSearch: function () {
            this.showTplIndustry();
            $(".tplDownDialog").slideUp();
        },

        //请求模块分类列表
        reqmoduleList: function () {
            var _this = this;
            var url = "service/module/category.html",
                data = {
                    themeCode: _this.webcode,
                };

            function successfn(res) {
                _this.moduleCategoryList = res.data.module;
            };

            function errorfn() {

            };
            productPost(url, data, successfn, errorfn);
        },
        //添加模板切换功能加显示对应的模块列表
        showModuleList: function (index, moduleName) {
            // 背景高亮
            var _this = this;
            _this.thisModule = _this.moduleCategoryList[index].name
            this.addModuleListIndex = index;
            if (moduleName == 'basics') {
                this.showElement = false;
                if (_this.reqFirstModuleFlg == 1) {
                    _this.reqFirstModuleFlg++;
                    edit();
                }
            } else {
                this.showElement = true;
                // 请求模块数据
                this.reqModule(moduleName);
            }
        },
        //请求具体的模块数据
        reqModule: function (moduleName) {
            var _this = this;
            var url = "service/module/list.html",
                data = {
                    moduleCode: moduleName,
                    themeCode: _this.webcode
                };

            function successfn(res) {
                //这是是放关闭局部loading函数(公共函数)
                _this.moduleList = res.data.ModuleList;
            };

            function errorfn() {

            };
            productPost(url, data, successfn, errorfn);
        },


        navModification: function (event) {
            let $t = $("#navfication .nav-list-flex");
            var str = [];
            for (var i = 0; i <= $t.length - 1; i++) {
                var id = $t[i].dataset.id;
                var name = $t[i].dataset.name;
                var menuId = $t[i].dataset.menuid;
                var parentId = $t[i].dataset.parentid;
                var columnCode = $t[i].dataset.columncode;
                var linkUrl = $t[i].dataset.linkurl;
                var useYn = $t[i].dataset.useyn;
                var target = $t[i].dataset.target;
                var sort = $t[i].dataset.sort;
                var datasd = {
                    id: id,
                    name: name,
                    userWebId: userWebId,
                    menuId: menuId,
                    parentId: parentId,
                    columnCode: columnCode,
                    linkUrl: linkUrl,
                    useYn: useYn,
                    target: target,
                    sort: sort,
                }
                str.push(datasd)
            }
            ;
            // console.log(this.firstPath)
            let SbwUserPageInfo = JSON.stringify(str);
            let data = {
                paramJson: SbwUserPageInfo
            }
            let url = 'service/user/page/batchSave.html';
            productPost(
                url,
                data,
                function (callback) {
                    // console.log(callback)
                    if (callback.success == true) {
                        showTips("保存成功！")
                    }

                    $("#headNavPopup").hide();
                    enableScroll(); //body启用滚动条
                },
                function (callback) {
                    showTips("保存失败！")
                }
            );
        },
        //新增页面---
        addPage: (d, callback) => {
            let data = {
                channel: this.channel,
                linkUrl: d.linkUrl,
                linkType:d.linkType,
                name: d.name, //文本输入
                columnCode: d.columnCode, //栏目类型下拉框
                target: d.target, //打开方式（1、本窗口  2、新窗口）
                parentId: d.parentId, //父级菜单ID
                userWebId: app.toSessionStorage("id"), //用户网站ID
                selectedLinkType : d.selectedLinkType//选中的栏目类型
            };
            app.saveAllPage(data, callback);
        },
        //修改页面
        updatePage: (d, callback) => {
            let data = {
                channel: app.channel,
                linkUrl: d.linkUrl,
                linkType:d.linkType,
                id: d.id,
                name: d.name, //文本输入
                columnCode: d.columnCode, //栏目类型下拉框
                target: d.target, //打开方式（1、本窗口  2、新窗口）
                parentId: d.parentId, //父级菜单ID
                userWebId: app.toSessionStorage("id"), //用户网站ID
                selectedLinkType : d.selectedLinkType//选中的栏目类型
            };
            app.saveAllPage(data, callback);
        },
        //右上角保存页面信息
        savePage: (callback) => {
            app.saveLoading = true;
            let data = {
                id: app.savePageInfo.id,
                name: app.savePageInfo.name,
                columnCode: app.savePageInfo.columnCode,
                colorStyle: app.themecolor,
                head: JSON.stringify(app.groupContainer.header),
                webBanner: JSON.stringify(app.groupContainer.banner),
                bottom: JSON.stringify(app.groupContainer.bottom),
                body: JSON.stringify(app.groupContainer.body),
                userWebId: app.toSessionStorage("id"), //用户网站ID
                navigation: JSON.stringify(app.groupContainer.navigation),
                navContainer: JSON.stringify(app.groupContainer.navContainer),
                bodyStyle: JSON.stringify(app.groupContainer.common),
            };
            app.saveAllPage(data, (res) => {
                if (callback)
                    callback(res);
                let msg = '保存成功';
                app.saveLoading = false;
                if (res.message)
                    msg = res.message;
                app.$message({
                    message: msg,
                    type: 'info',
                    iconClass: ' ',
                    center: true,
                    duration: 2000
                });
            });
        },
        saveAllPage: (data, callback) => {
            $.ajax({
                type: "POST",
                data,
                url: domain + 'service/user/page/save.html',
                dataType: "json",
                success: function (t1) {
                    if (!t1.success && t1.total) {
                        callback(t1);
                        return false;
                    }
                    if (callback) {
                        callback(t1);
                        app.toWebsessionStorage('webName', t1.data.name);
                    }
                },
                error: function (e) {
                    // console.log(e);
                }
            });
        },
        //删除页面
        deletePage: (d, callback) => {
            let data = {
                id: d.id,
            };
            $.ajax({
                type: "POST",
                data,
                url: domain + 'service/user/page/d.html',
                dataType: "json",
                success: function (t1) {
                    if (!t1.success && t1.total) {
                        console.error(t1);
                        return false;
                    }
                    callback(t1);
                },
                error: function (e) {
                    // console.log(e);
                }
            });
        },
        //加载所有页面信息
        loadAllPages(callback){
            if(this.firstParentId[0]){
                callback(this.firstParentId,1)
            }else{
                let data = {
                    userWebId: app.toSessionStorage("id"),
                };
                $.ajax({
                    type: "POST",
                    data,
                    url: domain + 'user/page/list.html',
                    dataType: "json",
                    success: function (t1) {
                        if (!t1.success && t1.total) {
                            console.error(t1);
                            return false;
                        }
                        // console.log('load: ', t1);
                        callback(t1,0);
                        app.toWebsessionStorage('allPageList', t1.data.userPageList);
                    },
                    error: function (e) {
                        console.error(e);
                    }
                });
            }
        },
        //查询单个页面详情
        loadPage: (pageId, callback) => {
            let data = {
                id: pageId,
            };
            $.ajax({
                type: "POST",
                data,
                url: domain + 'user/page/' + pageId + '.html',
                dataType: "json",
                success: function (t1) {
                    if (!t1.success && t1.total) {
                        console.error(t1);
                        return false;
                    }
                    /*if(pageId==app.toWebsessionStorage('ndId')||pageId==app.toWebsessionStorage('pdId')){
                        app.isInfoPage=true;
                    }*/
                    if(app.getRequest().nav!=undefined){
                        app.isInfoPage=true;
                    }
                    callback(t1)
                },
                error: function (e) {
                    // console.log(e);
                }
            });
        },
        /**
         * 特殊转义 < > ( )
         * @param value 需转换的值
         */
        recoverSymbol: (value) => {
            if (value == null) return null;
            if (typeof(value) == 'number') return value;
            value = value.replace(/\[lt\]/g, "\<").replace(/\[gt\]/g, ">");
            value = value.replace(/\[#40\]/g, "(").replace(/\[#41\]/g, ")");
            value = value.replace(/\[#39\]/g, "'");
            value = value.replace(/clscrptxmt/g, "script");
            return value;
        },
        //点击按钮(3个按钮)
        toggleIcon: function (name) {
            var _this = this;
            if (_this.iconName !== name) {
                _this.iconName = name;
                switch (name) {
                    case "myTpl":
                        _this.httpMytpl();
                        break;
                }
            } else {
                _this.iconName = '';
                if (_this.iconName == "tpl") {
                    $(".tplDownDialog").slideUp();
                }
            }

        },
        mobileFit: function (val) {
            let res = val;
            if (app.isPreview && app.channel == 2) {
                if(res.indexOf('rem')>-1){
                    res = res;
                }else{
                    let fz = 16;
                    if (typeof(res) == "number") {
                        res = res / fz + 'rem';
                    } else {
                        if(res.indexOf('px')>-1){
                            res = (res.replace(/px/, '')) / fz + 'rem';
                        }else{
                            res = res / fz + 'rem';
                        }

                    }
                }
            }
            return res;
        },
    },
    watch: {
        isPreview: function (newValue, oldValue) {
            if (newValue === true) {
                // console.log($('.cptborder').draggable("disable").resizable('disable'))
            }
        },
    }
})
app.$watch(function () {
    // 监听其他主题色实时修改
    return this.othertheme;
}, function (newVal, oldVal) {
    if (newVal.length > 2) {
        app.themecolor = newVal;
    }
})
//加载页面 获取用户内容
function userList(isAddpage) {

    let userUrl = domain + 'user/page/list.html';
    var userData = {};
    httpPost(
        userUrl,
        userData,
        function (callback) {
            let firstParentId = [];
            let firstTemplatess = [];
            let nav = callback.userPageList;
            nav.forEach(e => {
                if (e.pageType != 3) {
                    firstParentId.push(e);
                    if (e.pageType == 2) {
                        if (e.columnCode == 'pro') {
                            app.toWebsessionStorage('proId', e.id);
                        }
                    }
                    if (e.parentId == 0) {
                        firstTemplatess.push(e);
                    }
                    if (e.columnCode == "index") {
                        app.pageContent = e;
                        linkUrl = e.linkUrl;
                    }
                } else {
                    if (e.columnCode == 'newsd') {
                        app.toWebsessionStorage('ndId', e.id);
                    } else if (e.columnCode == 'prod') {
                        app.toWebsessionStorage('pdId', e.id);
                    }
                }
            })
            app.firstParentId = firstParentId;

            app.firstTemplate = firstTemplatess;
            // console.log('app:', app.firstTemplate)
        },
        function (callback) {
        }
    );
}
/**
 *后台跳转add by dengxf 20180418
 */
function remoteLogin() {
	var newurl,scmanage_url,seller_url,b2c_url,type,token;
    var name = app.toSessionStorage('uname');
    var newTab = window.open('about:blank');
    $.ajax({
        url: domain + "/getToken.html",
        type: 'post',
        dataType: 'json',
        data: {name: name},
        success: function (data) {
            if (data && null != data.success && data.success == true) {
                type = data.data.type;
                token = data.data.token;
                if(type == undefined){
					$.messager.alert('提示',"未开通商城版应用");
	        		return;
	        	}else if(type==1){//多商家
	        		scmanage_url = data.data.scmanage_url;
	        		newurl=scmanage_url +"/admin/doLoginFromCL.html?name=" + name +"&verifyToken="+token;
	        		newTab.location.href=newurl;
	        	}else if(type==2){//单商家
	        		seller_url = data.data.seller_url;
	        		newurl = seller_url+"/seller/doLoginFromCL.html?name=" + name +"&verifyToken="+token;
	        		newTab.location.href=newurl;
	        	}else if(type==3){//B2C系统
	        		b2c_url = data.data.b2c_url;
	        		newurl = b2c_url+"/shop/doLoginFromCL.html?name=" + name +"&verifyToken="+token;
	        		newTab.location.href=newurl;
	        	}
            } else {
                if (data.message != '') {
                    showTips(data.message)
                    return;
                }
            }
        }
    });
}
function remoteLogin() {
	var newurl,scmanage_url,seller_url,b2c_url,type,token;
    var name = app.toSessionStorage('uname');
    var newTab = window.open('about:blank');
    $.ajax({
        url: domain + "/getToken.html",
        type: 'post',
        dataType: 'json',
        data: {name: name},
        success: function (data) {
            if (data && null != data.success && data.success == true) {
                type = data.data.type;
                token = data.data.token;
                if(type == undefined){
					$.messager.alert('提示',"未开通商城版应用");
	        		return;
	        	}else if(type==1){//多商家
	        		scmanage_url = data.data.scmanage_url;
	        		newurl=scmanage_url +"/admin/doLoginFromCL.html?name=" + name +"&verifyToken="+token;
	        		newTab.location.href=newurl;
	        	}else if(type==2){//单商家
	        		seller_url = data.data.seller_url;
	        		newurl = seller_url+"/seller/doLoginFromCL.html?name=" + name +"&verifyToken="+token;
	        		newTab.location.href=newurl;
	        	}else if(type==3){//B2C系统
	        		b2c_url = data.data.b2c_url;
	        		newurl = b2c_url+"/shop/doLoginFromCL.html?name=" + name +"&verifyToken="+token;
	        		newTab.location.href=newurl;
	        	}
            } else {
                if (data.message != '') {
                    showTips(data.message)
                    return;
                }
            }
        }
    });
}
define(['qrcode'], (qrcode) => {
    // console.log('vue set module init');
    return app;
});