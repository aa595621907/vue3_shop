<template>
  <el-container>
    <el-header>
      <div class="header-left">
        <img src="../../assets/logo.png" alt="logo" />
        <h2>电商后台管理系统</h2>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 折叠栏 -->
        <div class="collapse" @click="collapseHandle">|||</div>
        <el-menu
          :uniqueOpened="true"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#2959DF"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-openeds="collapseSubMenu"
          :default-active="menuItemDedefaultActive"
        >
          <el-submenu
            :index="item1.id + ''"
            v-for="item1 in leftMenusData"
            :key="item1.id"
          >
            <template #title>
              <i :class="menuIcon[item1.id]"></i>
              <span>{{ item1.authName }}</span>
            </template>
            <el-menu-item
              :index="'/' + item2.path"
              v-for="item2 in item1.children"
              :key="item2.id"
              @click="clickMenuItemActive('/' + item2.path)"
            >
              <i class="{background}"></i>
              <span>{{ item2.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由填充位 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  toRefs
} from 'vue'
import { getNavMenu } from '../../api/'
export default defineComponent({
  name: 'Home',
  setup() {
    // 响应数据
    const homeReactive = reactive({
      // 左侧菜单数据
      leftMenusData: [],
      // 右侧菜单字体图标
      menuIcon: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      // 控制菜单栏展开与折叠
      isCollapse: false,
      // 控制默认展开的subMenu
      collapseSubMenu: [],
      // 默认展开MenuItem index
      menuItemDedefaultActive: ''
    })

    const { proxy } = getCurrentInstance()

    // 生命周期钩子
    onMounted(() => {
      // 获取左侧菜单列表数据
      getLeftMenuData()

      // 获取MenuItem高亮的值
      homeReactive.menuItemDedefaultActive = localStorage.getItem(
        'MenuItemActivePath'
      )
    })

    // MenuItem高亮效果
    const clickMenuItemActive = path => {
      // 默认高亮
      homeReactive.menuItemDedefaultActive = path
      // 保存到本地
      window.localStorage.setItem('MenuItemActivePath', path)
    }

    // 获取左侧菜单列表数据
    const getLeftMenuData = async () => {
      // 发送请求获取数据
      const res = await getNavMenu()
      homeReactive.leftMenusData = res.data
    }

    // 折叠菜单栏点击事件
    const collapseHandle = () => {
      // 折叠状态
      homeReactive.isCollapse = !homeReactive.isCollapse
    }

    // 退出登录按钮
    const logout = async () => {
      try {
        const res = await proxy.$confirm('是否退出当前用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 提示
        proxy.$message.success('退出成功')
        // 跳转
        proxy.$router.replace('/login')
        // 删除token
        window.localStorage.clear()
      } catch (error) {
        // 提示
        proxy.$message('取消退出')
      }
    }
    return {
      logout,
      ...toRefs(homeReactive),
      collapseHandle,
      clickMenuItemActive
    }
  }
})
</script>

<style lang="less" scoped>
.el-container {
  width: 100%;
  height: 100%;
  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #373d41;
    .header-left {
      display: flex;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
        margin-right: 20px;
        border-radius: 50%;
      }
      h2 {
        margin: 0;
        padding: 0;
        color: #fff;
        font-size: 24px;
        font-weight: 400;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    .iconfont {
      margin-right: 10px;
    }
    .collapse {
      height: 25px;
      line-height: 25px;
      background-color: #4a5064;
      color: #fff;
      text-align: center;
      letter-spacing: 2px;
      font-size: 14px;
      cursor: pointer;
    }
    .el-submenu {
      width: 200px;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
