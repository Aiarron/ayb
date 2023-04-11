<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import lvTable from './components/lv-table/index.vue'
import type { TableColumnProps } from './components/lv-table/props'

const tableData = ref<Record<string, any>[]>([])
const tableColumnProps = ref<TableColumnProps[]>([
  {
    label: 'id',
    prop: 'id',
    showOverflowTooltip: true
  },
  {
    label: 'Name',
    prop: 'name',
    showOverflowTooltip: true
  },
  {
    label: 'amount1',
    prop: 'amount1',
    sortable: true,
    showOverflowTooltip: true
  },
  {
    label: 'amount2',
    prop: 'amount2',
    showOverflowTooltip: true
  },
  {
    label: 'amount3',
    prop: 'amount3',
    showOverflowTooltip: true
  },
  {
    label: '自定义cell',
    cellSlot: 'customCell'
  },
  {
    columnSlot: 'operate'
  }
])
const tableLoading = ref(false)
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(100)

const mockSyncRequest = (data: any[], time = 1000): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, time)
  })
}

const requestTableData = async () => {
  tableLoading.value = true
  tableData.value = await mockSyncRequest([
    {
      id: '129871221298712212987122129871221298712212987122',
      name: 'Tom',
      amount1: '234',
      amount2: '3.2',
      amount3: 10
    },
    {
      id: '12987123',
      name: 'Tom',
      amount1: '165',
      amount2: '4.43',
      amount3: 12
    },
    {
      id: '12987124',
      name: 'Tom',
      amount1: '324',
      amount2: '1.9',
      amount3: 9
    },
    {
      id: '12987125',
      name: 'Tom',
      amount1: '621',
      amount2: '2.2',
      amount3: 17
    },
    {
      id: '12987126',
      name: 'Tom',
      amount1: '539',
      amount2: '4.1',
      amount3: 15
    }
  ])
  tableLoading.value = false
}

const handleClick = (data: any) => {
  console.log(data)
}

watch(currentPage, (val: number) => {
  console.log(val, '=val==')
})

onMounted(() => {
  requestTableData()
})
</script>

<template>
  <div class="text-[#f00]">
    component
    <div class="h-[600px]">
      <lv-table
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :loading="tableLoading"
        :table-data="tableData"
        :table-column-props="tableColumnProps"
        :update-methods="requestTableData"
      >
        <template #customCell="data">
          <div>
            <p>展示当前完整的数据</p>
            <p>{{ data }}</p>
          </div>
        </template>

        <template #operate>
          <el-table-column
            width="140px"
            label="操作"
            align="left"
          >
            <template #default="scope">
              <span @click="handleClick(scope)">编辑</span>
            </template>
          </el-table-column>
        </template>
      </lv-table>
    </div>
  </div>
</template>
