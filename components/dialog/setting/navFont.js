define(["vueLoader"], (loader) => {
  return {
      props: {
          model: {
              type: Object,
              default: {},
          },
          save: {
              type: Function
          }
      },
      data() {
          return {
              // fontTop: 'fontTop',
              // fonts: [
              //     "宋体",
              //     "新细明体",
              //     "仿宋_GB2312",
              //     "微软雅黑",
              //     "隶书",
              //     "幼圆",
              //     "华文楷体",
              //     "方正舒体",
              //     "华文彩云",
              //     "华文行楷",
              //     "华文宋体",
              //     "楷体",
              //     "黑体",
              //     "Arial",
              //     "Tahoma",
              //     "impact",
              //     "Arial Serif",
              //     "Georgia",
              //     "Garamond",
              // ],
              sizes: ['12px','13px', '14px', '15px', '16px', '17px', '18px', '19px', '20px', '21px', '22px','26px','28px','36px','48px'],
              // lineHeights: [
              //     '1',
              //     '1.25',
              //     '1.5',
              //     '1.75',
              //     '2.0',
              //     '2.5',
              //     '3.0',
              // ],
              // aligns: [{
              //     label: '左对齐',
              //     value: 'left',
              // }, {
              //     label: '右对齐',
              //     value: 'right',
              // }, {
              //     label: '居中对齐',
              //     value: 'center',
              // }, {
              //     label: '两端对齐',
              //     value: 'justify',
              // }, ]
          };
      },
      // methods: {
      //     swap(key, value) {
      //         this.model.fontStyle[key] = (this.model.fontStyle[key] == value) ? '' : value;
      //         this.$forceUpdate();
      //         // console.log(this.model.fontStyle);
      //     }
      // },
      mounted() {
          // if (this.model.toClass == 'from') {
          //     this.fontTop = ""
          //     // $(".fonttool").removeClass("fontTop")
          // } else if (this.model.toClass == 'top') {
          //     this.fontTop = 'fontTop'
          //     // $('.fonttool').addClass("fontTop")
          // }
      },
      watch: {
          // 'model.toClass' () {
          //     // console.log(this.model.toClass);
          //     if (this.model.toClass == 'from') {
          //         this.fontTop = ""
          //         // $(".fonttool").removeClass("fontTop")
          //     } else if (this.model.toClass == 'top') {
          //         this.fontTop = 'fontTop'
          //         // $('.fonttool').addClass("fontTop")
          //     }
          // }
      },
  }
});