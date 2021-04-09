<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card class="box-card">
      <el-row>
        <el-col :span="7"
          ><el-input placeholder="请输入内容" clearable> </el-input>
        </el-col>
        <el-col :span="2">
          <el-button icon="el-icon-search" type="info" plain></el-button>
        </el-col>
        <el-col :span="15">
          <el-button type="primary" @click="addUserBtn">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <el-table :data="userTableData" style="width: 100%" border>
        <el-table-column type="index" width="50" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="statusSwitchChange(scope.row)"
              inactive-color="#F67D7D"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editUserInfoBtn(scope.row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteUserInfoBtn(scope.row)"
            ></el-button>
            <!-- 设置按钮 -->
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="setUserRole(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="userPaginationSizeChange"
        @current-change="userPaginationCurrentChange"
        :current-page="pagenum"
        :page-sizes="computedPageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 编辑用户信息对话框 -->
    <el-dialog title="修改用户" v-model="editUserInfoDialogVisible" width="50%">
      <el-form
        label-width="80px"
        :model="editUserInfoForm"
        :rules="editUserInfoFormRules"
        ref="editUserInfoFormRef"
      >
        <el-form-item label="用户名">
          <el-input
            v-model="editUserInfoForm.username"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserInfoForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editUserInfoForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editUserInfoDialogVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" @click="editUserInfoDialogVisibleBtn"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>

    <!-- 分配用户角色对话框 -->
    <el-dialog
      title="分配角色"
      v-model="setUserRoleDialogVisible"
      width="50%"
      @close="setUserRoleDialogClose"
    >
      <div>
        <p>当前的用户：{{ setUserRoleData.username }}</p>
        <p>当前的角色：{{ setUserRoleData.roleName }}</p>
        <p>
          分配新角色：
          <el-select
            v-model="setUserRoleData.selectValue"
            placeholder="请选择"
            @change="selectOptionsValue"
          >
            <el-option
              v-for="item in setUserRoleData.options"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="setUserRoleDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="setUserRoleDialogVisibleBtn"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  getCurrentInstance,
  computed
} from 'vue'
import {
  getUserInfo,
  updateUserStatus,
  editUserInfo,
  deleteUserInfo,
  getUserRoleList,
  setUserRoleApi
} from '../../api'
export default defineComponent({
  name: 'Users',
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: ''
    }
  },
  setup() {
    // 自定义邮箱校验规则
    const checkEmail = (rule, value, cb) => {
      const emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (emailReg.test(value)) {
        cb()
      } else {
        cb(new Error('邮箱格式不正确'))
      }
    }
    // 响应数据
    const userReactive = reactive({
      // 用户表格数据
      userTableData: [],
      // 用户总数
      total: 0,
      // 当前页数
      pagenum: 0,
      // 每页显示条目个数
      pageSize: 2,
      // 控制编辑用户信息对话框
      editUserInfoDialogVisible: false,
      // 编辑用户信息
      editUserInfoForm: {},
      // 编辑用户信息表单验证规则
      editUserInfoFormRules: {
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          {
            required: true,
            message: '请输入用户邮箱',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 11,
            message: '长度在 3 到 11 个字符',
            trigger: 'blur'
          }
        ]
      },
      // 控制分配用户角色对话框
      setUserRoleDialogVisible: false,
      // 分配角色的数据
      setUserRoleData: {
        id: '',
        username: '',
        options: [],
        roleName: '',
        rid: '',
        selectValue: ''
      }
    })

    // 实例
    const { proxy } = getCurrentInstance()

    // 数据已真实渲染到页面上了
    onMounted(() => {
      // 获取用户表格数据
      getUserTableData()
    })

    // 获取用户表格数据
    const getUserTableData = async () => {
      console.log(proxy)
      const { data, meta } = await getUserInfo(1, 2)
      if (meta.status !== 200) return proxy.$message.error(meta.msg)
      proxy.$message.success(meta.msg)
      // 保存用户数据
      userReactive.userTableData = data.users
      //  保存用户数据总数
      userReactive.total = data.total
      // 保存当前页数
      userReactive.pagenum = data.pagenum

      console.log(userReactive.userTableData)
    }

    // 用户状态Switch
    const statusSwitchChange = async row => {
      const { mg_state: status, id } = row
      const { meta } = await updateUserStatus(`users/${id}/state/${status}`)
      if (meta.status !== 200) return proxy.$message.error('修改用户状态失败')
      proxy.$message.success('修改用户状态成功')
    }

    // 修改用户信息
    const editUserInfoBtn = row => {
      console.log(row)
      // 编辑用户信息对话框
      userReactive.editUserInfoDialogVisible = true
      // 将当前用户信息传递给编辑用户信息对话框
      userReactive.editUserInfoForm = row
    }

    // 删除用户信息按钮
    const deleteUserInfoBtn = async row => {
      try {
        const res = await proxy.$confirm('是否删除此用户', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        if (res === 'confirm') {
          const { meta } = await deleteUserInfo(`users/${row.id}`)
          // 判断状态码是否一致
          if (meta.status !== 200) return proxy.$message.error('用户删除失败')
          // 找到当前要删除的对象
          const index = userReactive.userTableData.findIndex(
            item => item.id === row.id
          )
          userReactive.userTableData.splice(index, 1)
          // 提示删除成功的消息
          proxy.$message.success(meta.msg)
        }
      } catch (e) {
        proxy.$message('取消删除用户')
      }
    }

    // 编辑用户信息对话框按钮
    const editUserInfoDialogVisibleBtn = () => {
      proxy.$refs.editUserInfoFormRef.validate(async validate => {
        // 判断校验是否通过
        if (!validate) return false

        // 发送请求的参数
        const { email, id, mobile } = userReactive.editUserInfoForm
        // 发送请求
        const { meta } = await editUserInfo(`users/${id}`, email, mobile)
        // 如果修改失败
        if (meta.status !== 200) return proxy.$message.error(meta.msg)
        // 修改成功
        proxy.$message.success(meta.msg)
        // 关闭编辑用户信息对话框
        userReactive.editUserInfoDialogVisible = false
      })
    }

    // pageSize => 每页显示条目个数 改变时会触发
    const userPaginationSizeChange = async pageSize => {
      // 重新发送请求获取每页条目个数
      const {
        data: { users }
      } = await getUserInfo(userReactive.pagenum, pageSize)
      // 每页显示条目个数
      userReactive.pageSize = pageSize
      // 重新赋值为响应式
      userReactive.userTableData = users
      console.log('pageSize', pageSize)
    }

    // currentPage => 当前页数  改变时会触发
    const userPaginationCurrentChange = async currentPage => {
      const {
        data: { users },
        pagenum
      } = await getUserInfo(currentPage, userReactive.pageSize)
      // 当前页码
      userReactive.pagenum = currentPage
      // 重新赋值为响应式
      userReactive.userTableData = users
      console.log('currentPage', currentPage)
    }

    // 计算每页显示个数选择器的选项设置
    const computedPageSizes = computed(() => {
      const pageSizesOptions = [1, 2, 5]
      if (userReactive.total > 5) pageSizesOptions.push(10)
      return pageSizesOptions
    })

    // 设置用户角色
    const setUserRole = async row => {
      console.log(row)
      const { id, role_name: roleName, username } = row
      userReactive.setUserRoleData.id = id
      userReactive.setUserRoleData.roleName = roleName
      userReactive.setUserRoleData.username = username
      // 打开分配角色对话框
      userReactive.setUserRoleDialogVisible = true
      // 发送请求获取角色列表
      const { data } = await getUserRoleList('/roles')
      userReactive.setUserRoleData.options = data

      console.log(userReactive.setUserRoleData)
    }

    // select 选中的值放生变化
    const selectOptionsValue = e => {
      userReactive.setUserRoleData.rid = e
    }

    // 设置角色对话框的确认按钮
    const setUserRoleDialogVisibleBtn = async () => {
      const { id, rid } = userReactive.setUserRoleData
      const { meta } = await setUserRoleApi(`/users/${id}/role`, rid)
      if (meta.status !== 200) return proxy.$message.success('分配角色失败')
      proxy.$message.success(meta.msg)

      // 关闭对话框
      userReactive.setUserRoleDialogVisible = false
      // 获取用户表格数据
      getUserTableData()
    }

    // 关闭设置角色对话框的回调
    const setUserRoleDialogClose = () => {
      userReactive.setUserRoleData = {}
    }

    // 添加用户
    const addUserBtn = () => {
      console.log('ok')
    }

    return {
      ...toRefs(userReactive),
      statusSwitchChange,
      editUserInfoBtn,
      editUserInfoDialogVisibleBtn,
      deleteUserInfoBtn,
      userPaginationSizeChange,
      userPaginationCurrentChange,
      computedPageSizes,
      setUserRole,
      selectOptionsValue,
      setUserRoleDialogVisibleBtn,
      setUserRoleDialogClose,
      addUserBtn
    }
  }
})
</script>

<style lang="less" scoped>
.el-table {
  margin: 30px 0;
}
</style>
