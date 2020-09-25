<template>
  <div class="return-reason">
    <el-card v-loading="loading">
      <div class="crud-cateory">
        <el-button size="small" type="success" @click="addReturnReasonDialog = true">添加原因</el-button>
        <el-button size="small" type="primary" @click="init">刷新</el-button>
      </div>
      <el-table size="small" :data="returnReasonList">
        <el-table-column width="100px" label="ID" align="center" prop="id"></el-table-column>
        <el-table-column label="退货原因" align="center" prop="cause"></el-table-column>
        <el-table-column label="状态" align="center" prop="standard">
          <template slot-scope="scope">
            <el-switch
              :disabled="true"
              :value="scope.row.status === 1"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column align="center" width="120px" label="操作">
          <template slot-scope="scope">
            <el-col :span="12">
              <el-button size="mini" type="primary" @click="editClick(scope.$index, scope.row)">
                <i class="el-icon-edit"></i>
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-popconfirm
                confirmButtonText="删除"
                cancelButtonText="取消"
                confirmButtonType="danger"
                cancelButtonType="default"
                icon="el-icon-info"
                iconColor="red"
                title="此操作不可逆，是否删除该项？"
                @onConfirm="deleteClick(scope.$index, scope.row)"
              >
                <el-button slot="reference" size="mini" type="danger">
                  <i class="el-icon-delete-solid"></i>
                </el-button>
              </el-popconfirm>
            </el-col>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        style="float: right;min-height: 50px;margin-top: 20px;"
        layout="prev, pager, next"
        @current-change="currentChange"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        :page-count="total / pageSize + 1"
      ></el-pagination>
    </el-card>

    <el-dialog title="退货原因信息" :visible.sync="returnReasonDetailDialog" width="650px">
      <el-form
        :model="returnReasonDetail"
        size="small"
        :inline="true"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="id">
          <el-input v-model="returnReasonDetail.id"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="returnReasonDetail.updateTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="returnReasonDetail.createTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="可用状态">
          <el-switch
            v-model="returnReasonDetail.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
        <el-form-item label="退货原因">
          <el-input style="width: 495px" type="textarea" v-model="returnReasonDetail.cause"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="default" @click="returnReasonDetailDialog = false">取消</el-button>
        <el-button size="small" type="success" @click="modifyReturnReasonDetailClick">修改</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加退货原因" :visible.sync="addReturnReasonDialog" width="650px">
      <el-form
        :model="insertReturnReason"
        size="small"
        :inline="true"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="退货原因">
          <el-input style="width: 495px" type="textarea" v-model="insertReturnReason.cause"></el-input>
        </el-form-item>
        <el-form-item label="可用状态">
          <el-switch
            v-model="insertReturnReason.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="default" @click="addReturnReasonDialog = false">取消</el-button>
        <el-button size="small" type="success" @click="addReturnReasonConfirmClick">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    deleteOrderReturnReasonById,
    insertOrderReturnReason,
    listOrderReturnReasons,
    updateOrderReturnReason
  } from "../../../api/order";

  export default {
    name: "Return",
    data() {
      return {
        loading: false,
        returnReasonList: [],
        insertReturnReason: {},
        total: null,
        currentPage: 1,
        pageSize: 7,
        returnReasonDetailDialog: false,
        addReturnReasonDialog: false,
        returnReasonDetail: {}
      }
    },
    methods: {
      deleteClick(index, row) {
        deleteOrderReturnReasonById(row.id).then(response => {
          this.$message({type: 'success', message: response.message});
          if ((this.total - 1) % this.pageSize === 0) {
            this.currentPage = this.currentPage - 1;
          }
          this.init()
        })
      },
      editClick(index, row) {
        this.returnReasonDetail = {...row}
        this.returnReasonDetailDialog = true
      },
      currentChange(index) {
        this.currentPage = index;
        this.init();
      },
      modifyReturnReasonDetailClick() {
        updateOrderReturnReason(this.returnReasonDetail).then(response => {
          this.$message({type: 'success', message: response.message});
          this.returnReasonDetailDialog = false;
          this.init()
        })
      },
      addReturnReasonConfirmClick() {
        insertOrderReturnReason(this.insertReturnReason).then(response => {
          this.$message({type: 'success', message: response.message});
          this.addReturnReasonDialog = false;
          this.insertReturnReason = {}
          this.init()
        })
      },
      init() {

        this.loading = true;

        this.$store.dispatch("changeMenu", {hover: "4-2"});
        this.$store.dispatch("changeBreadcrumb", {value: ['订单管理', '退货原因']});

        listOrderReturnReasons(this.currentPage, this.pageSize).then(response => {
          if (response.code === 200) {
            this.returnReasonList = response.data.content;
            this.total = response.data.total
            this.loading = false
          }
        })
      }
    },
    mounted() {
      this.init();
    }
  }
</script>

<style scoped>

</style>
