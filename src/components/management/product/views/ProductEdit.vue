<template>
  <div>
    <el-card>
      <el-steps finish-status="success" :active="active" align-center>
        <el-step>
          <span class="pointer" @click="active = 1" slot="title">填写商品信息</span>
        </el-step>
        <el-step title="填写商品属性">
          <span class="pointer" @click="active = 2" slot="title">填写商品属性</span>
        </el-step>
        <el-step title="填写营销活动">
          <span class="pointer" @click="active = 3" slot="title">填写营销活动</span>
        </el-step>
      </el-steps>
      <br>
      <div v-if="active === 1">

      </div>
      <div v-if="active === 2">

      </div>
      <div v-if="active === 3">

      </div>

    </el-card>
  </div>
</template>

<script>
  import {getProduct} from "../../../../api/product";

  export default {
    name: "ProductEdit",
    data() {
      return {
        productId: null,
        shopId: null,
        active: 1,
        productData: {}
      }
    },
    methods: {
      init() {

        this.$store.dispatch("changeBreadcrumb", {value: ['商品管理', '商品管理', '商品编辑']});
        this.$store.dispatch("changeMenu", {hover: '3-1'});

        this.productId = this.$route.query.productId
        this.shopId = this.$route.query.shopId

        if (this.productId !== undefined) {
          getProduct({id: this.productId}).then(response => {
            this.productData = response.data
            console.log(response.data)
          })
        }
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style scoped>

</style>
