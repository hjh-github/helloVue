define([], () => {
    return {
        props: {
            model: {
                type: String,
                default: {},
            },
            config: {
                type: Object,
                default: {
                    text: '名称',
                    options: [
                        {
                            label: 0,
                            text: '选项一'
                        }, {
                            label: 1,
                            text: '选项二'
                        }
                    ]
                }
            },
            key: {
                type: String,
            }
        },
    }
});