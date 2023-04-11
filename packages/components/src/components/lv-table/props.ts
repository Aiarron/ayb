import type { ExtractPropTypes, PropType } from 'vue'

export type TableColumnProps = {
  cellSlot?: string
  columnSlot?: string
} & Record<string, any>

export const lvTableProps = {
  tableData: {
    type: Array as PropType<Record<string, any>[]>,
    required: true,
    default() {
      return []
    }
  }, // table 所绑定的数据
  tableProps: {
    type: Object as PropType<Record<string, any>>,
    default() {
      return {}
    }
  },
  tableEvents: {
    type: Object as PropType<Record<string, any>>,
    default() {
      return {}
    }
  },
  tableColumnKey: {
    type: String,
    default: ''
  }, // 默认渲染 tableColumn 的key是下标，但是如果存在对列的新增和删除，为了有良好的性能，可以传入一个基于 tableData 的唯一的key值
  tableColumnProps: {
    type: Object as PropType<TableColumnProps[]>,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 20
  },
  total: {
    type: Number,
    default: 0
  },
  paginationOptions: {
    type: Object as PropType<Record<string, any>>,
    default() {
      return {}
    }
  },
  updateMethods: {
    type: Function as PropType<(...args: any[]) => any>
  }
}

export type LvTableProps = ExtractPropTypes<typeof lvTableProps>
