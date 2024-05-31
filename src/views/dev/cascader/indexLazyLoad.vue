<template>
  <div class="m-4">
    <p>Child options expand when hovered</p>
    <el-cascader
      v-model="valueRef"
      :props="props"
      @change="handleChange"
      :options="options"
    />
  </div>
</template>

<script lang="ts" setup>
/**
 * 级联选择器。选项数据懒加载
 */
import { ref } from 'vue'
import { getCategoryList } from '@/api/goods/category/api'

const valueRef = ref([])
const options = ref([])

const lazyLoadData = async (node: any, resolve: any) => {
  const pid = node.value ?? '0'
  const { level } = node
  const data = await getCategoryList({
    pid: pid,
    pageNum: 1,
    pageSize: 1000,
  }).catch((error) => {
    console.log(error)
    resolve([])
    return
  })

  const records = data?.data?.records ?? []
  const options = records.map((e: any) => ({
    value: e.categoryId,
    label: e.categoryName,
    leaf: level > 0,
  }))
  console.log(level, options)
  resolve(options)
}

// 注意：expandTrigger是在props里
const props: any = {
  expandTrigger: 'hover',
  lazy: true,
  lazyLoad: lazyLoadData,
}

const handleChange = (val: any) => {
  console.log(valueRef.value, val)
}
</script>
