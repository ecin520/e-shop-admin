<template>
  <div class="access-log">
    <el-card v-loading="loading">
      <div class="access-log-operation">
        <el-button size="small" type="danger" @click="clearLogs">清空日志</el-button>
        <el-button size="small" type="success" @click="changeDate">刷新</el-button>
        <el-date-picker style="float: right" size="small" v-model="logDate" type="date"
                        placeholder="查询日期" @change="changeDate"
                        value-format="yyyyMMdd"></el-date-picker>
      </div>
      <el-table size="small" :data="errorLogData">
        <el-table-column align="center" label="用户名" prop="username"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="center" label="描述" prop="name"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="center" label="url" prop="url"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="center" label="方法" prop="method"></el-table-column>
        <el-table-column align="center" label="ip" prop="ip"></el-table-column>
        <el-table-column
          align="center"
          :show-overflow-tooltip="true"
          label="创建时间"
          prop="createTime"
        ></el-table-column>
        <el-table-column align="center" label="结果" prop="result">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="showResultDetail(scope.$index, scope.row)"
            >详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        style="float: right; min-height: 50px; margin-top: 20px;"
        layout="prev, pager, next"
        @current-change="currentChange"
        :total="total"
        :page-size="pageSize"
        :current-page.sync="currentPage"
      ></el-pagination>
    </el-card>
    <el-dialog
      title="异常详情"
      :lock-scroll="true"
      top="110px"
      width="800px"
      :visible.sync="resultDetailDialog"
    >
      <json-viewer :value="param" :expand-depth="3" sort></json-viewer>
      <el-card>
        <pre v-highlightjs="resultDetail"><code class="java"/></pre>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
  import {listErrorLogs, listErrorLogsByDate, listWebLogsByDate} from "../../../api/log";
  import {getTime} from "../../../utils/time";

  export default {
    data() {
      return {
        errorLogData: [],
        pageErrorLogData: [],
        resultDetail: "",
        param: "",
        resultDetailDialog: false,
        total: 0,
        pageSize: 10,
        loading: true,
        currentPage: 1,
        logDate: null
      };
    },
    methods: {
      clearLogs() {
      },
      changeDate() {
        this.loading = true;
        listErrorLogsByDate(this.logDate).then(response => {
          this.pageErrorLogData = response.data;
          this.total = this.pageErrorLogData.length;
          if (this.total < this.pageSize) {
            this.errorLogData = this.pageErrorLogData;
          } else {
            this.errorLogData = this.pageErrorLogData.slice(0, this.pageSize);
          }
          this.currentPage = 1;
          this.loading = false;
        })
      },
      showResultDetail(index, row) {
        this.resultDetail = row.message;
        this.param = row.param;
        this.resultDetailDialog = true;
      },
      currentChange(index) {
        let start = (index - 1) * this.pageSize;
        let end = index * this.pageSize;
        this.errorLogData = this.pageErrorLogData.slice(start, end);
      },
      init() {

        this.$store.dispatch("changeBreadcrumb", {value: ['系统监控', '异常日志']});
        this.$store.dispatch("changeMenu", {hover: '7-2'});

        this.loading = true;
        listErrorLogs().then((response) => {
          this.pageErrorLogData = response.data;
          this.total = this.pageErrorLogData.length;
          if (this.total < this.pageSize) {
            this.errorLogData = this.pageErrorLogData;
          } else {
            this.errorLogData = this.pageErrorLogData.slice(0, this.pageSize);
          }
          this.currentPage = 1;
          this.loading = false;
        });
      },
    },
    mounted() {
      this.logDate = getTime()
      this.init();
    },
  };
</script>

<style lang="scss">
  .access-log {
    .access-log-operation {
      margin-bottom: 15px;
    }

    .java.hljs {
      color: #444;
      background: #ffffff !important;
      height: 400px !important;
      overflow: scroll;
    }
  }
</style>
