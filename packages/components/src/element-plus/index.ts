import { ElTable, ElPagination, ElLoading } from 'element-plus'
import type { App } from 'vue'

export default {
  install: (app: App): void => {
    app
      .use(ElTable)
      .use(ElPagination)
      .use(ElLoading)
  }
}
