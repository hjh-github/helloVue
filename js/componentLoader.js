/**
 * 组件加载器
 */

//缓存Vue对象
var pool = {};


define([], () => {
    //根据path获取名称
    function cal(path) {
        let r = path.split('/');
        return r[r.length - 1];
    }

    return {
        /**
         * 加载全局配置单
         * @param configs
         */
        config(configs, res) {
            return new Promise(() => {
                configs.forEach((path, index) => {
                    require(['text!../components/' + path + '.html', '../components/' + path], (html, js) => {
                        let v = {
                            template: html,
                            mixins: [
                                js
                            ]
                        };
                        pool[path] = v;
                        let name = cal(path);
                        try {
                            Vue.component('v-' + name, pool[path]);
                        } catch (e) {
                            console.error('加载全局组件失败: ', name, v);
                        }
                        if (res && index == configs.length - 1)
                            res();
                    });
                });
            });
        },

        createVue(path, callback) {
            return new Promise(res => {
                this.load(path)(
                    config => {
                        callback(new Vue(config));
                        res();
                    }
                );
            });
        },
        /**
         * 加载指定path的组件，返回Promise
         * @param path
         * @returns {function(*)}
         */
        load(path) {
            return res => {
                let t;
                if (t = pool[path])
                    res(t);
                else
                    require(['text!../components/' + path + '.html', '../components/' + path], (html, js) => {
                        let v = {
                            template: html,
                            mixins: [
                                js
                            ]
                        };
                        pool[path] = v;
                        res(v);
                    });
            }
        },

        loadLinkDialog({
            model,
            callback
        }) {

            let config = {
                title: '添加链接',
                canCancel: false,
                pages: {
                    '链接设置': {
                        link: {
                            component: 'dialog/link'
                        }
                    }
                },
                style: {
                    top: '5%',
                    left: '5%',
                    height: '90%',
                    width: '90%',
                }
            };


            this.createVue('dialog/dialog', dialogVue => {
                let editDialog = dialogVue;
                editDialog.setModel(model);

                editDialog.setConfig(config);
                this.fill("#tempdialog1", editDialog);
                editDialog.open(callback);
            });
        },

        /**
         *
         * @param model
         * @param callback
         * @param selectChanged
         * @param multiselect
         */
        loadImageDialog({
            model,
            callback,
            selectChanged,
            multiselect
        }) {
            let config = {
                title: '添加图片',
                needInitial: false,
                // canCancel: false,
                pages: {
                    "我的文件": {
                        updateImg: {
                            config: {
                                style: {
                                    height: '40px',
                                    'line-height': '40px'
                                },
                                callback(r) {
                                    app.cellList.push({
                                        src: r.imgPath,
                                        id: r.id
                                    });
                                },
                            },
                            component: 'dialog/editing/upload-pictures',
                        },
                    },
                    "系统图库": {}
                }
            };

            if (multiselect) {
                config.pages['我的文件'].images = {
                    config: {
                        selectChanged,
                        multiselect
                    },
                    component: 'dialog/editing/pictures-list',
                };

                config.pages['系统图库'].images = {
                    config: {
                        selectChanged,
                        multiselect
                    },
                    component: 'dialog/editing/system-img'
                };
            } else {
                config.pages['我的文件'].src = {
                    config: {
                        selectChanged,
                        multiselect
                    },
                    component: 'dialog/editing/pictures-list',
                };

                config.pages['系统图库'].src = {
                    config: {
                        selectChanged,
                        multiselect
                    },
                    component: 'dialog/editing/system-img'
                };
            }


            this.createVue('dialog/dialog', dialogVue => {

                let editDialog = dialogVue;
                editDialog.setModel(model);

                editDialog.setConfig(config);
                this.fill("#tempdialog1", editDialog);
                editDialog.open(callback);
            });
        },
        /**
         *
         * @param el 容器el
         * @param vue 需要加载的组件
         */
        append(el, vue) {
            let x = $('<temp></temp>');
            $(el).append(x);
            vue.$mount(x.get(0));
        },
        fill(el, vue) {
            $(el).empty();
            this.append(el, vue);
        },
        grid() {
            return [2, 2]
        }

    };
});