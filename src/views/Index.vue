<template>
  <div class="index">
    <!-- 使用container布局容器 -->
    <el-container>
      <el-aside width="200px">
        <!-- logo部分 -->
        <div class="logo"></div>
      </el-aside>
      <el-container>
        <el-header>
          <span class="el-icon-s-operation toggle-btn"></span>
          <span class="system-title">黑马头条后台管理系统</span>
          <div class="welcome">
            <span>欢迎你：管理员</span>
            <span>退出</span>
          </div>
          </el-header>
        <el-main>欢迎你使用黑马头条后台管理系统</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userData: ''
    }
  }
}
</script>

<style lang='less' scoped>
.index {
  height: 100%;
  .el-menu{
      border-right: none;
  }
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
