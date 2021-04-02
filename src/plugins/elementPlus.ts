import { ElButton, ElInput, ElForm, ElFormItem } from 'element-plus'

export default (app: any) => {
  app.use(ElButton)
  app.use(ElInput)
  app.use(ElForm)
  app.use(ElFormItem)
}
