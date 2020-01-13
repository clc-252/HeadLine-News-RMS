<template>
  <div class="publish">
    <!-- Breadcrumb 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card" style="margin-top:20px">
      <!-- form表单 -->
      <el-form ref="post" :model="post" label-width="80px">
        <el-form-item label="标题:">
          <el-input v-model="post.name"></el-input>
        </el-form-item>
        <!-- radio单选框 -->
        <el-form-item label="类型:">
          <el-radio-group v-model="post.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 富文本框 -->
        <el-form-item label="内容:">
          <VueEditor :config="config" v-if="post.type===1" />
          <el-upload class="upload-demo" action v-if="post.type===2">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
          </el-upload>
        </el-form-item>
        <!-- Checkbox 多选框 -->
        <el-form-item label="栏目:">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="post.categories" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="cate in cateList" :label="cate.id" :key="cate.id">{{cate.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- upload上传 -->
        <el-form-item label="封面:">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <!-- button按钮 -->
        <el-button type="primary">主要按钮</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入富文本框
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'
// 引入实现获取栏目列表数据的方法
import { getCateList } from '@/apis/cate.js'
export default {
  data () {
    return {
      isIndeterminate: false,
      checkAll: false,
      cateList: [],
      post: {
        title: '',
        content: '',
        categories: [],
        cover: [],
        type: 1
      },
      config: {
        // 上传图片的配置
        uploadImage: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.url)
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.url)
          }
        }
      }
    }
  },
  methods: {
    // 切换全选全不选的状态
    handleCheckAllChange (val) {
      // this.checkedCities = val ? cityOptions : [];
      // this.isIndeterminate = false;
    },
    // 单击复选框组中的某个复选框所触发的事件
    handleCheckedCitiesChange (value) {
      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.cities.length;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    }
  },
  // 获取栏目列表数据
  async mounted () {
    let res = await getCateList()
    // console.log(res)
    this.cateList = res.data.data.splice(1)
  },
  // 注册
  components: {
    VueEditor
  }
}
</script>

<style>
</style>
