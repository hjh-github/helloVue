define(['util'], (util) => {
    return {
        props: {
            model: {
                type: Object,
                defaulte: {}
            },
            callback: {

            },
        },
        data(){
            return {
                visible: false,
                firstParentId: [],
                isShow: 'nones',
                type: 0,
                linkTypeOptions: [''],
                navList:[],
                goodsList:[],
                goodsInfo:[],
                selectedLinkType:'',
                link:{
                    type:0
                },
                domain:''
            }
        },
        watch: {
            'link.type'(v){
                this.model.link.type=v
                
            },
            'model.link.type'(v){
                // alert('changed:' + v);
            },
            'model.link': {
                handler(v){
                    this.$forceUpdate();
                },
                deep: true,
            },
            domain(v){
                this.model.link.domain = v;
            }
        },
        computed: {
            isUpdatePages(){
                if(app.toSessionStorage('webcode')=='SHOW'){
                    if(app.isUpdatePage){
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    return true;
                }
            },

            selectedLink: {
                get(){
                    if (this.model)
                        return this.model.link.local;
                    return null;
                },
                set(v){
                    this.model.link.local = v;
                },
            },
            linkList(){
                let x = [];
                switch (this.selectedLinkType) {
                    case '导航':
                        x = this.navList;
                        break;
                    case '栏目':
                        x = this.naviList;
                        break;
                    case '分类':
                        x = this.goodsList;
                        break;
                    case '商品详情':
                        x = this.goodsInfo;
                        break;
                }
                return x;
            },
            naviList(){
                // let list = {};
                let x = app.firstParentId;
                let result = {};
                x.forEach(e => {
                    let linkUrl='';
                    if(e.columnCode=='custom'){
                        linkUrl=e.linkUrl;
                    }else{
                        linkUrl=e.id;
                    }
                    // console.log(e)
                    if (e.parentId == 0) {
                        if (result[e.menuId]) {
                            result[e.menuId].splice(0, 0, {
                                name: e.name,
                                key: e.menuId,
                                menuId: e.menuId,
                                link: linkUrl,
                            });
                        } else {
                            result[e.menuId] = [{
                                name: e.name,
                                key: e.menuId,
                                menuId: e.menuId,
                                link: linkUrl,
                            }];
                        }
                    } else {
                        if (result[e.parentId]) {
                            result[e.parentId].push({
                                name: '--' + e.name,
                                key: e.menuId,
                                menuId: e.menuId,
                                link: linkUrl,
                            });
                        } else {
                            result[e.parentId] = [{
                                name: '--' + e.name,
                                key: e.menuId,
                                menuId: e.menuId,
                                link: linkUrl,
                            }];
                        }
                    }
                    // console.log(JSON.stringify(result))
                });
                let r = [];
                for (v in result) {
                    r = r.concat(result[v]);
                }
                // console.log(r);
                return r;
            },

        },
        beforeMount(){
            if (!this.model.link) {
                this.model.link = {};
            }
            if (this.model.link.type == null) {
                this.model.link.type = 1;
            }

            // console.log(' link create');
        },
        mounted(){
            let self = this;
            this.domain = this.model.link.domain == undefined ? 'http://':this.model.link.domain;

            if(app.toSessionStorage('webcode')!='SHOW'){
                if(app.isUpdatePage){
                    self.linkTypeOptions=['导航','分类','商品详情'];
                }else{
                    self.linkTypeOptions=['栏目','导航','分类','商品详情'];
                }
            }else{
                self.linkTypeOptions=['栏目'];
            }
            this.link.type=this.model.link.type;
            app.loadGoodsNav({
                userId:app.toSessionStorage('userId'),
                webcode:app.toSessionStorage('webcode')
            },(arr)=>{
                this.navList = self.getInnerLink(arr);
            });
            app.loadGoodsInfo({
                userId:app.toSessionStorage('userId'),
                type:'2'
            },(arr)=>{
                this.goodsList = self.getInnerLink(arr);
            });
            app.loadGoodsInfo({
                userId:app.toSessionStorage('userId'),
                type:'3'
            },(arr)=>{
                this.goodsInfo = self.getInnerLink(arr);
            });

            if(!this.model.link.selectedLinkType){
                this.selectedLinkType = "栏目";
            }else{
                this.selectedLinkType = this.model.link.selectedLinkType;
            }
        },
        methods: {
            open(res){
                this.visible = true;
            },
            changeType(){
                this.model.link.selectedLinkType = this.selectedLinkType;
                if(this.linkList.length=='0'){
                    this.model.link.local='';
                }else{
                    this.model.link.local= this.linkList[0].link;
                }
            },
            getInnerLink(arr){
                let arr1 = [];
                arr.forEach(e =>{
                    let obj = {
                        name:e.name,
                        link:e.url
                    }
                    arr1.push(obj);
                })
                return arr1;
            }
        }
    }
});
