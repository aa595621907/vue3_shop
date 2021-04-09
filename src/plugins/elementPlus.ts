import {
  ElButton,
  ElInput,
  ElForm,
  ElFormItem,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMessageBox,
  ElMessage,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElCard,
  ElRow,
  ElCol,
  ElTable,
  ElTableColumn,
  ElSwitch,
  ElDialog,
  ElPagination,
  locale,
  ElSelect,
  ElOption
} from 'element-plus'

import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'

locale(lang)

export default (app: any) => {
  app.use(ElButton)
  app.use(ElInput)
  app.use(ElForm)
  app.use(ElFormItem)
  app.use(ElContainer)
  app.use(ElHeader)
  app.use(ElAside)
  app.use(ElMain)
  app.use(ElMessageBox)
  app.use(ElMessage)
  app.use(ElMenu)
  app.use(ElSubmenu)
  app.use(ElMenuItem)
  app.use(ElMenuItemGroup)
  app.use(ElBreadcrumb)
  app.use(ElBreadcrumbItem)
  app.use(ElCard)
  app.use(ElRow)
  app.use(ElCol)
  app.use(ElTable)
  app.use(ElTableColumn)
  app.use(ElSwitch)
  app.use(ElDialog)
  app.use(ElPagination)
  app.use(ElSelect)
  app.use(ElOption)
}
