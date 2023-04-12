<template>
  <div class="kf-table-wrapper">
    <div class="flex-1 shrink-0 overflow-hidden">
      <el-table
        v-loading="loading"
        class="h-full"
        :data="tableData"
        v-bind="tableProps"
        v-on="tableEvents"
      >
        <template v-for="(columnProps, index) in tableColumnProps">
          <slot
            v-if="columnProps.columnSlot"
            :name="columnProps.columnSlot"
          />
          <template v-else>
            <!-- fix: tableColumnProps 动态变化时，如果有一项设置了 type 属性则会出现渲染列异常 -->
            <el-table-column
              v-if="columnProps.type"
              :key="tableColumnKey ? `${tableData[index][tableColumnKey]}__type` : `${index}__type`"
              v-bind="columnProps"
            >
              <template
                v-if="columnProps.cellSlot"
                #default="scope"
              >
                <slot
                  :name="columnProps.cellSlot"
                  :data="scope.row"
                />
              </template>
            </el-table-column>
            <el-table-column
              v-else
              :key="tableColumnKey ? tableData[index][tableColumnKey] : index"
              v-bind="columnProps"
            >
              <template
                v-if="columnProps.cellSlot"
                #default="scope"
              >
                <slot
                  :name="columnProps.cellSlot"
                  :data="scope.row"
                />
              </template>
            </el-table-column>
          </template>
        </template>

        <template #empty />
      </el-table>
    </div>
    <div class="flex h-50 w-full items-center justify-end bg-white">
      <el-pagination
        v-if="showPagination && !loading && tableData.length"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        size="small"
        :page-sizes="[20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        v-bind="paginationOptions"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue'
import { lvTableProps } from './props'

const props = defineProps(lvTableProps)
const emit = defineEmits<{
  (e: 'update:currentPage', value: number): void
  (e: 'update:pageSize', value: number): void
}>()
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)

watch(() => props.total, (val: number) => {
  total.value = val
}, { immediate: true, deep: true })

watch(() => props.currentPage, (val: number) => {
  currentPage.value = val
}, { immediate: true, deep: true })

watch(() => props.pageSize, (val: number) => {
  pageSize.value = val
}, { immediate: true, deep: true })

const handleSizeChange = (s: number) => {
  const { updateMethods } = props
  pageSize.value = s
  currentPage.value = 1
  emit('update:currentPage', 1)
  emit('update:pageSize', s)
  updateMethods && updateMethods()
}

const handlePageChange = (p: number) => {
  const { updateMethods } = props
  currentPage.value = p
  emit('update:currentPage', p)
  updateMethods && updateMethods()
}
</script>

<script lang="ts">
export default {
  name: 'LvTable'
}
</script>

<style lang="postcss" scoped>

.kf-table-wrapper {
  @apply h-[100%] flex flex-col;

  &:deep(.el-table__header) {
    .el-table__cell {
      @apply bg-[#f7f7f7] pt-12 pb-12;

      .cell {
        @apply text-12 font-[500] whitespace-nowrap text-[#999] leading-none pl-10 pr-10;
      }
    }
  }

  &:deep(.el-table__body-wrapper) {
    @apply overflow-y-auto;

    .el-table__body {
      .el-table__row {
        .el-table__cell {
          @apply pt-15 pb-15 leading-none border-b-[#eee] h-auto;

          .cell {
            @apply text-14 font-[400] text-[#606266] pl-10 pr-10;

            .el-button {
              &.is-link {
                @apply p-0 h-auto text-[#1a66b3];
              }
            }
          }
        }
      }
    }

    &.el-table__empty-text {
      @apply leading-[20px];
    }
  }
}
</style>
