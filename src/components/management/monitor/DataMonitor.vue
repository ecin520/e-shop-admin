<template>
  <div>
    <iframe
      class="api-iframe"
      width="100%"
      :style="'height:' + (height - 95) + 'px'"
      :src="url">
    </iframe>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        url: 'http://127.0.0.1:8001/druid/index.html',
        flag: true,
        height: document.body.clientHeight
      }
    },
    methods: {
      getHeight() {
        this.height = document.body.clientHeight
      },
      init() {
        this.$store.dispatch("changeBreadcrumb", {value: ['系统监控', '数据监控']});
        this.$store.dispatch("changeMenu", {hover: '7-3'});

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
