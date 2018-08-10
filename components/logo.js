define(['vueLoader'], (loader) => {
  return {
    props: ['model'],
    data() {
      return {
        loading: false,
      };
    },
    create() {},
    mounted() {
      let self = this;
      let ele = $(this.$el)
      let dragConfig = {
        containment: "parent"
      };
      ele.resizable({
        stop: function () {
          self.model.style.width=this.style.width;
          self.model.style.height=this.style.height;
        }
      }).draggable(dragConfig, {
        stop: function () {
          self.model.style.top=this.style.top;
          self.model.style.left=this.style.left;
        }
      });
    },
    methods: {
      selectImage() {
        let self = this;
        if(self.model===undefined){
            self.model=app.app.groupContainer.navContainer.settingConfig.logo
        }
        loader.loadImageDialog({
          model: {
            src: self.model.src,
          },
          callback(model) {
            self.loading = true;
            self.model.src = model.src;
            setTimeout(() => {
              self.loading = false;
            }, 1000);
          },
          selectChanged(selected, item, index) {},
          multiselect: false,
        })
      },
    },
    components: {}
  }
});