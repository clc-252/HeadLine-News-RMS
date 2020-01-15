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
          <el-input v-model="post.title"></el-input>
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
          <VueEditor :config="config" v-if="post.type===1" ref="myEditor" />
          <el-upload
            class="upload-demo"
            action="http://localhost:3000/upload"
            v-if="post.type===2"
            :headers="getToken()"
            :on-success="handlerSuccess"
          >
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
          <el-upload
            action="http://localhost:3000/upload"
            list-type="picture-card"
            :headers="getToken()"
            :on-success="handlerPoster"
            :on-remove="removePoster"
            :file-list="post.cover"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <!-- button按钮 -->
        <el-button type="primary" @click="publishPost">{{btntext}}</el-button>
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
// 引入实现文章发布的方法
import { publishPost, getArticleById, getEditArticleById } from '@/apis/article.js'
export default {
  data () {
    return {
      btntext: '发布文章',
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
          // 设置请求头，传递token
          headers: this.getToken(),
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.data.url)
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          // 设置请求头，传递token
          headers: this.getToken(),
          uploadSuccess (res, insert) {
            // console.log(res)
            insert('http://localhost:3000' + res.data.data.url)
          }
        }
      }
    }
  },
  methods: {
    // 切换全选全不选的状态
    handleCheckAllChange (val) {
      // console.log(val) //true或者false，val是当前全选框的状态：true为全选、false为全不选
      // 需要从this.cateList里面获取到所有id，生成一个数组用于全选操作
      this.post.categories = val
        ? this.cateList.map(value => {
          return value.id
        })
        : []
      // 改变当前的状态：全选或者全不选，这是一个确定的状态
      this.isIndeterminate = false
    },
    // 单击复选框组中的某个复选框所触发的事件
    handleCheckedCitiesChange (value) {
      // checkedCount：当前被选择的复选框的数量
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cateList.length
      // 当被选中的数量>0，但是却小于总的复选框的数量，说明有选但没有全选
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cateList.length
    },
    // 发布文章
    async publishPost () {
      let res
      // 如果有id参数，说明是编辑文章
      if (this.$route.params.id) {
        // 处理分类数据
        this.post.categories = this.post.categories.map(value => {
          return { id: value }
        })
        // 实现发布文章
        res = await getEditArticleById(this.$route.params.id, this.post)
      } else {
        // 否则就是发布文章
        if (this.post.type === 1) {
        // 获取富文本框内容
          this.post.content = this.$refs.myEditor.editor.root.innerHTML
        }
        // 处理栏目数据
        this.post.categories = this.post.categories.map(value => {
          return { id: value }
        })
        res = await publishPost(this.post)
      }
      console.log(res)
      if (res.data.message === '文章发布成功') {
        this.$message.success(res.data.message)
        this.$router.push({ name: 'Postlist' })
      }
    },
    // 封装一个设置token的方法
    getToken () {
      let token = localStorage.getItem('userLoginToken_back')
      return { Authorization: token }
    },
    // 文件上传成功的钩子
    handlerSuccess (response, file, fileList) {
      // console.log(response)
      // console.log(file)
      // console.log(fileList)
      if (response.message === '文件上传成功') {
        this.post.content = 'http://127.0.0.1:3000' + response.data.url
      }
    },
    // 封面文件上传成功的钩子
    handlerPoster (response) {
      response.data.url = 'http://127.0.0.1:3000' + response.data.url
      this.post.cover.push({ id: response.data.id, url: response.data.url })
      console.log(this.post.cover)
    },
    // 封面文件列表移除文件时的钩子
    removePoster (file) {
      console.log(file)
      // 将封面图片从post.cover中删除
      let id
      if (this.$route.params.id) {
        id = file.id
      } else {
        id = file.response.data.id
      }
      // 遍历post.cover
      for (let i = 0; i < this.post.cover.length; i++) {
        if (this.post.cover[i].id === id) {
          this.post.cover.splice(i, 1)
          break
        }
      }
    }
  },
  // 获取栏目列表数据
  async mounted () {
    let res = await getCateList()
    // console.log(res)
    let token = localStorage.getItem('userLoginToken_back')
    if (token) {
      this.cateList = res.data.data.splice(2)
    } else {
      this.cateList = res.data.data.splice(1)
    }
    // 获取可能传递的数据
    let obj = this.$route.params
    console.log(obj)
    if (obj.id) {
      // 修改按钮文本内容
      this.btntext = '修改文章'
      let articleData = await getArticleById(obj.id)
      console.log(articleData)
      this.post = articleData.data.data
    }
    // 当文章类型是文章的时候,才需要处理富文本框的内容
    if (this.post.type === 1) {
      this.$refs.myEditor.editor.clipboard.dangerouslyPasteHTML(
        0,
        this.post.content
      )
    }
    // 处理单选框
    this.post.categories = this.post.categories.map(value => {
      return value.id
    })
    // 处理全选复选框的全选或全不选的状态
    if (
      this.post.categories.length === this.cateList.length ||
      this.post.categories.length === 0
    ) {
      this.isIndeterminate = false
    }
    // 处理封面
    this.post.cover = this.post.cover.map(value => {
      return { id: value.id, url: value.url }
    })
    // 处理封面图片路径
    this.post.cover.forEach(value => {
      if (value.url.indexOf('http') === -1) {
        value.url = 'http://127.0.0.1:3000' + value.url
      }
    })
  },
  // 注册
  components: {
    VueEditor
  }
}
</script>

<style>
</style>
