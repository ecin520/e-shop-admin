<template>
  <div class="return-reason">

  </div>
</template>

<script>
  export default {
    name: "Return",
    data() {
      return {

      }
    },
    methods: {
      init() {
        this.$store.dispatch("changeMenu", {hover: "4-2"});
        this.$store.dispatch("changeBreadcrumb", {value: ['订单管理', '退货原因']});
      }
    },
    mounted() {
      this.init();
    }
  }
</script>

<style scoped>

</style>
