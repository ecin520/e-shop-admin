<template>
  <div class="product-add">
    <el-card>
      <el-steps finish-status="success" style="background: #ffffff" simple :active="active" align-center>
        <el-step>
          <span class="pointer" @click="active = 1" slot="title">填写商品信息</span>
        </el-step>
        <el-step title="填写商品属性">
          <span class="pointer" @click="active = 2" slot="title">填写商品属性</span>
        </el-step>
        <el-step title="填写商品展示">
          <span class="pointer" @click="active = 3" slot="title">填写商品展示</span>
        </el-step>
        <el-step title="填写营销活动">
          <span class="pointer" @click="active = 4" slot="title">填写营销活动</span>
        </el-step>
      </el-steps>
      <br>

      <div v-if="active === 1">
        <div style="display: flex;justify-content: center">
          <el-form
            style="border: 1px solid #DCDFE6;padding: 15px;"
            size="small"
            :inline="true"
            label-width="80px"
            label-position="right"
            :model="insertProduct"
          >
            <br>
            <el-form-item label="商品名称">
              <el-input style="width: 434px" v-model="insertProduct.name"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="商品价格">
              <el-input style="width: 434px" v-model="insertProduct.price"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="出售时间">
              <el-date-picker
                v-model="insertProduct.saleTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="是否上架">
              <el-switch
                v-model="insertProduct.shelfStatus"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-form-item>
            <br>
            <el-form-item label="成长值">
              <el-input style="width: 434px" v-model="insertProduct.growthValue"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="赠送积分">
              <el-input style="width: 434px" v-model="insertProduct.integral"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="商品参数">
              <div v-for="(item, index) in parameter" style="margin-bottom: 5px;">
                <el-row :gutter="8">
                  <el-col :span="6">
                    <el-input placeholder="参数名" v-model="item.key"></el-input>
                  </el-col>
                  <el-col :span="14">
                    <el-input placeholder="参数值" v-model="item.value"></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-button @click="deleteParameterItem(item)" size="small" type="danger">
                      <i class="el-icon-delete"></i>
                    </el-button>
                  </el-col>

                </el-row>
              </div>
              <el-button :plain="true" style="width: 100%;" @click="parameter.push({key: '', value: ''})">添加</el-button>
            </el-form-item>
          </el-form>

        </div>
        <div style="text-align: center;margin: 10px;">
          <el-button size="small" @click="$router.go(-1)" :plain="true" style="justify-content: center">返回</el-button>
          <el-button size="small" @click="active = 2" :plain="true" style="justify-content: center">下一步</el-button>
        </div>
      </div>


      <div v-if="active === 2">
        <div style="display: flex;justify-content: center;">
          <div style="width: 800px">
            <div style="border: 1px solid #DCDFE6;padding: 15px;">
              <el-row style="margin: 10px">
                <span>选择分类</span>
                <el-select size="small" @change="changeProductCategory" v-model="productCategoryId" placeholder="请选择分类">
                  <el-option
                    v-for="item in productCategoryList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <el-select size="small" no-data-text="请选择分类" v-model="productCategoryDetailId" placeholder="请选择分类详情">
                  <el-option
                    v-for="item in productCategoryDetailList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-row>
              <div v-if="productSpecList.length > 0" style="border: 1px solid #DCDFE6;padding: 10px;margin: 10px">
                <div v-for="(productSpec, i) in productSpecList" :key="i">
                  <p>{{productSpec.name}}</p>
                  <span style="margin: 15px;" v-for="(productSpecDetail, j) in productSpec.details" :key="j">
                  <el-checkbox v-model="productSpecDetail.checked" @change="changeSpecDetail">
                    <span style="line-height: 25px">{{productSpecDetail.name}}</span>
                  </el-checkbox>
                  </span>
                  <p style="margin: 15px;">
                    <input class="my-button" v-model="productSpec.addSpec" style="width: 100px"></input>
                    <el-button :plain="true" size="small" @click="addProductSpec(productSpec)">添加</el-button>
                  </p>
                </div>
              </div>
              <!--              <div v-else style="border: 1px solid #DCDFE6;padding: 10px;margin: 10px">-->
              <!--                <p>规格</p>-->
              <!--                <p style="margin: 15px;">-->
              <!--                  <el-input size="small" style="width: 100px"></el-input>-->
              <!--                  <el-button :plain="true" size="small">添加</el-button>-->
              <!--                </p>-->
              <!--              </div>-->

              <div>
                <el-table size="small" :data="productSkuList">
                  <template v-for="(item,index) in productSkuHead">
                    <el-table-column align="center" :label="item">
                      <template slot-scope="scope">
                        {{scope.row[item].name}}
                      </template>
                    </el-table-column>
                  </template>
                  <el-table-column align="center" prop="price" label="价格">
                    <template slot-scope="scope">
                      <el-input style="width: 60px" size="small" v-model="scope.row.price"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="stock" label="库存">
                    <template slot-scope="scope">
                      <el-input style="width: 60px" size="small" v-model="scope.row.stock"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="stock" label="展示图片">
                    <template slot-scope="scope">
                      <span class="pointer" @click="selectedRowClick(scope.row)">
                        <el-avatar shape="square" fit="cover" :size="35" :src="scope.row.showImage"></el-avatar>
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>

          </div>
        </div>
        <!--        <el-button @click="submit">提交</el-button>-->
        <div style="text-align: center;margin: 10px;">
          <el-button size="small" @click="active = 1" :plain="true" style="justify-content: center">上一步</el-button>
          <el-button size="small" @click="active = 3" :plain="true" style="justify-content: center">下一步</el-button>
        </div>
      </div>


      <div v-if="active === 3">

        <div style="display: flex;justify-content: center;">
          <div style="width: 812px">
            <div style="border: 1px solid #DCDFE6;padding: 15px;">
              <div>
                <p>商品展示图片：</p>
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :on-remove="removeImage"
                  :http-request="uploadImage"
                  :file-list="uploadImageList"
                  :on-success="handleImageUploadSuccess"
                  :limit="10"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div>
              <div>
                <p>文案编辑：</p>
                <mark-editor v-model="insertProduct.description" :isClear="isClear"></mark-editor>
              </div>
            </div>

            <div style="text-align: center;margin: 10px;">
              <el-button size="small" @click="active = 2" :plain="true" style="justify-content: center">上一步</el-button>
              <el-button size="small" @click="active = 4" :plain="true" style="justify-content: center">下一步</el-button>
            </div>

          </div>
        </div>


      </div>

      <div v-if="active === 4">
        <div style="display: flex;justify-content: center;">
          <div style="width: 800px">
            <div style="border: 1px solid #DCDFE6;padding: 15px;">
              <div>
                <el-form
                  style="border: 1px solid #DCDFE6;padding: 15px;"
                  size="small"
                  :inline="true"
                  label-width="80px"
                  label-position="right"
                >
                  <el-form-item label="秒杀活动">
                    <el-date-picker
                      disabled
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                  <br>
                  <el-form-item label="首页展示">
                    <el-input style="width: 220px" disabled></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
        <div style="text-align: center;margin: 10px;">
          <el-button size="small" @click="active = 3" :plain="true" style="justify-content: center">上一步</el-button>
          <el-button size="small" type="primary" style="justify-content: center" @click="submit">提交商品信息</el-button>
        </div>
      </div>

      <el-dialog title="图片上传" :visible.sync="uploadShowImageDiaog" width="500px">
        <el-upload
          class="avatar-uploader"
          action="#"
          :http-request="uploadFile"
          :show-file-list="false">
          <el-image
            style="width: 450px; height: 450px"
            :src="selectedRow.showImage"
            fit="cover">
            <h1 slot="error" style="margin-top: 200px">
              点击上传图片
            </h1>
          </el-image>

        </el-upload>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
  import {
    listProductCategories,
    listProductCategoryDetailByCategoryId,
    listProductSpecsByCategoryId,
    listProductSpecDTOsByCategoryId
  } from "../../../../api/category";
  import {insertProductByParam} from "../../../../api/product";
  import {insertProductSpecDetail} from "../../../../api/spec";
  import MarkEditor from "../../../widgets/MarkEditor";

  export default {
    name: "ProductAdd",
    components: {
      MarkEditor
    },
    data() {
      return {
        isClear: false,
        productId: null,
        shopId: null,
        shopName: null,
        active: 1,
        parameter: [
          {
            key: '',
            value: ''
          }
        ],
        productCategoryList: [],
        productCategoryId: null,
        productCategoryShow: false,
        productCategoryDetailList: [],
        productCategoryDetailId: null,
        insertProduct: {},
        uploadImageList: [],
        productSpecList: [],
        productSkuList: [],
        productSkuHead: [],
        specList: [],
        selectedRow: {},
        uploadShowImageDiaog: false
      }
    },
    methods: {
      test() {

      },
      /**
       * 删除参数
       * */
      deleteParameterItem(item) {
        this.parameter = this.parameter.filter(i => {
          return i.key !== item.key
        })
      },
      addProductSpec(productSpec) {
        if (productSpec.addSpec === '' || productSpec.addSpec === null) {
          this.$message({type: 'warning', message: '输入不能为空'})
          return
        }
        insertProductSpecDetail({productSpecId: productSpec.id, name: productSpec.addSpec}).then(response => {
          if (response.code === 200) {
            productSpec.details.push({id: response.data.id, name: response.data.name})
            productSpec.addSpec = null
          }
        })

      },
      /**
       * 选择图片的时候，显示dialog，同时赋值给selectedRow
       * */
      selectedRowClick(row) {
        this.selectedRow = row;
        this.uploadShowImageDiaog = true;
      },
      /**
       * 上传成功的手动回调函数
       * */
      handleImageUploadSuccess(response, file, fileList) {
        file.url = response.data.content
        this.uploadImageList.push(file)
        // console.log(fileList)
      },
      removeImage(file, fileList) {
        this.uploadImageList = fileList;
        // this.$message({type: 'success', message: fileList})
      },
      uploadImage(data) {
        let formdata = new FormData();
        formdata.append('file', data.file);
        this.$axios({
          url: 'http://www.pytap.com/api/file/imageUpload',
          method: 'post',
          data: formdata,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          this.$message({message: '上传成功', type: 'success'})
          data.onSuccess(response)
        }).catch(error => {
          console.log(error)
        });
      },
      uploadFile(data) {

        let formdata = new FormData();
        formdata.append('file', data.file);

        this.$axios({
          url: 'http://www.pytap.com/api/file/imageUpload',
          method: 'post',
          data: formdata,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          this.$message({message: '上传成功', type: 'success'})
          this.selectedRow.showImage = response.data.content
        }).catch(error => {
          console.log(error)
        });

      },
      /**
       * 商品提交
       * */
      submit() {
        let submitSkuList = []
        let skuSpec = []
        for (let i = 0; i < this.productSkuList.length; i++) {
          this.productSkuList[i].specDetails = []
          for (let j = 0; j < this.productSkuHead.length; j++) {
            let specDetailId = this.productSkuList[i][this.productSkuHead[j]].id
            this.productSkuList[i].specDetails.push(specDetailId)
          }
        }

        // 将图片列表合并到一个字符串并给inserProduct赋值
        let imgList = ''
        for (let i = 0; i < this.uploadImageList.length; i++) {
          if (i === this.uploadImageList.length - 1) {
            imgList += this.uploadImageList[i].url
          } else {
            imgList += this.uploadImageList[i].url + ','
          }
        }
        this.insertProduct.showImage = imgList

        // 商品参数列表添加到insertProduct
        this.insertProduct.parameter = JSON.stringify(this.parameter)
        this.insertProduct.shopId = this.shopId;
        this.insertProduct.productCategoryDetailId = this.productCategoryDetailId;
        this.insertProduct.shopName = this.shopName;


        this.productCategoryDetailList.forEach(item => {
          if (item.id === this.productCategoryDetailId) {
            this.insertProduct.productCategoryDetailName = item.name
          }
        })


        insertProductByParam({product: this.insertProduct, skuProductList: this.productSkuList}).then(response => {
          if (response.code === 200) {
            this.$message({type: 'success', message: response.message})
          } else {
            this.$message({type: 'error', message: response.message})
          }
        })


      },
      changeProductCategory(value) {

        this.productSkuList = []
        this.productCategoryShow = true
        this.productCategoryDetailId = null
        this.productSpecList = []

        listProductCategoryDetailByCategoryId(0, 0, value).then(response => {
          this.productCategoryDetailList = response.data.content
        })

        listProductSpecDTOsByCategoryId(value).then(response => {

          let temp = response.data
          temp.forEach((value, index) => {
            temp[index] = value
            temp[index].details = value.details.filter(item => {
              return item.standard === 1;
            })
          })

          this.productSpecList = temp

          for (let i = 0; i < this.productSpecList.length; i++) {
            for (let j = 0; j < this.productSpecList[i].details.length; j++) {
              this.productSpecList[i].details[j].checked = false;
            }
            this.productSpecList[i].addSpec = null;
          }
        })

      },
      skuOperation(data, deep, path) {
        if (deep === data.length) {
          let insert = []
          for (let i = 0; i < path.length; i++) {
            insert.push(path[i])
          }
          this.specList.push(insert);
          return;
        }

        for (let i = 0; i < data[deep].length; i++) {
          path[deep] = data[deep][i]
          this.skuOperation(data, deep + 1, path)
        }
      },
      changeSpecDetail() {
        this.productSkuList = []
        this.specList = []
        let tempSku = []
        let head = []
        for (let i = 0; i < this.productSpecList.length; i++) {
          let temp = []
          for (let j = 0; j < this.productSpecList[i].details.length; j++) {
            if (this.productSpecList[i].details[j].checked === true) {
              temp.push({id: this.productSpecList[i].details[j].id, name: this.productSpecList[i].details[j].name})
            }
          }
          head.push(this.productSpecList[i].name)
          tempSku.push(temp)
        }
        // 去重
        this.productSkuHead = head.filter((item, index) => {
          return head.indexOf(item) === index;
        })
        if (this.productSkuHead.length !== this.productSpecList.length) {
          return;
        }
        // 递归排列出商品sku
        this.skuOperation(tempSku, 0, [])
        for (let i = 0; i < this.specList.length; i++) {
          let save = {}
          for (let j = 0; j < this.specList[i].length; j++) {
            save[this.productSkuHead[j]] = this.specList[i][j]
          }
          save.price = 0
          save.stock = 0
          save.showImage = ''
          save.specDetails = []
          this.productSkuList.push(save)
        }
        this.$forceUpdate()
      },
      init() {
        this.$store.dispatch("changeMenu", {hover: '6-1'});
        this.$store.dispatch("changeBreadcrumb", {value: ['商家管理', '店铺管理', '添加商品']});
        this.shopId = this.$route.query.shopId
        this.shopName = this.$route.query.shopName

        listProductCategories(0, 0, '').then(response => {
          this.productCategoryList = response.data.content
        })

      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style scoped>

</style>
