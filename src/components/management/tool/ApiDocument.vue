<template>
<!--  <el-card>-->
    <iframe
      class="api-iframe"
      width="100%"
      :style="'height:' + (height - 95) + 'px'"
      :src="url">
    </iframe>
<!--  </el-card>-->
</template>

<script>
  export default {
    name: "ApiDocument",
    data() {
      return {
        url: 'http://127.0.0.1:1024/doc.html',
        flag: true,
        height: document.body.clientHeight
      }
    },
    methods: {
      changeDoc() {
        if (this.flag) {
          this.url = 'http://127.0.0.1:1024/swagger-ui.html'
          this.flag = false;
        } else {
          this.url = 'http://127.0.0.1:1024/doc.html'
          this.flag = true
        }
      },
      getHeight() {
        this.height = document.body.clientHeight
      },
      init() {
        this.$store.dispatch("changeBreadcrumb", {value: ['工具', 'Api文档']});
        this.$store.dispatch("changeMenu", {hover: '8-1'});

        window.addEventListener("resize", this.getHeight);
        this.getHeight();
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style scoped>
  .api-iframe {
    border: none;
    box-shadow: 0 5px 15px -5px rgba(0,0,0,.5);
  }
  ::-webkit-scrollbar {
    width: 1px;
  }
</style>
