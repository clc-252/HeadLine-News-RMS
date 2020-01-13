<template>
  <div class="poetlist">
    <!-- Breadcrumb 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- table表格 -->
    <el-table :data="postList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="title" label="标题" width="450"></el-table-column>
      <el-table-column prop="user.create_date" label="日期" width="180">
        <!-- 使用自定义模板列来使用过滤器 -->
        <template slot-scope="scope">{{ scope.row.user.create_date | dateFormat }}</template>
      </el-table-column>
      <el-table-column prop="user.nickname" label="作者"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- ToolTip文字提示 -->
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              icon="el-icon-edit"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分享" placement="top">
            <el-button
              type="success"
              @click="handleShare(scope.$index, scope.row)"
              icon="el-icon-share"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              icon="el-icon-delete"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- Pagination 分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
// 引入获取文章列表数据的方法
import { getPostList } from '@/apis/article.js'
// 引入全局过滤器
import { dateFormat } from '@/utils/myfilters.js'
export default {
  data () {
    return {
      postList: [],
      pageSize: 2,
      pageIndex: 1,
      total: 0
    }
  },
  methods: {
    // 获取文章分页数据的方法
    async init () {
      let res = await getPostList({ pageSize: this.pageSize, pageIndex: this.pageIndex })
      this.postList = res.data.data
      console.log(this.postList)
      this.total = res.data.total
    },
    // 切换每页显示数量列表时触发
    handleSizeChange (val) {
      // val是当前选择的每页的条数
      console.log(`每页 ${val} 条`)
      // 重置pageSize
      this.pageSize = val
      // 重新发起请求
      this.init()
    },
    // 切换页码时触发
    handleCurrentChange (val) {
      // val是当前页面
      console.log(`当前页: ${val}`)
      // 重置当前页
      this.pageIndex = val
      // 重新发起请求渲染页面数据
      this.init()
    }
  },
  async mounted () {
    this.init()
  },
  //   注册全局过滤器
  filters: {
    dateFormat
  }
}
</script>

<style lang='less' scoped>
.el-table {
  margin-top: 20px;
}
</style>
