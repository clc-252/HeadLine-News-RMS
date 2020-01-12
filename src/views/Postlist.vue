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
          <!-- 使用作用域插槽来使用过滤器 -->
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
      postList: []
    }
  },
  async mounted () {
    let res = await getPostList()
    this.postList = res.data.data
    console.log(this.postList)
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
