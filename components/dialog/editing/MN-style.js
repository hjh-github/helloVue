define([], () => {
  return {
      props: {
          model: {
              type: Object,
              default: {
                  type: 0,
              },
          },
          key: {
              default: "type",
          },
          config: {
              options: [
                  {image: '', text: ''}
              ],
          },
          props: {
              type: String,
              default: '名称'
          }
      },
      mounted(){
      },
      watch: {
          "model":{
            handler: function (val, oldVal) { 
                console.log(this.model);
             },
            deep: true
          }
      },
      methods: {
          
      }
  }
});