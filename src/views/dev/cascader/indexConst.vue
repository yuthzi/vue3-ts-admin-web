<template>
  <div class="m-4">
    <p>Child options expand when hovered</p>
    <el-cascader
      v-model="value"
      :options="options"
      :props="props"
      clearable
      :filterable="true"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts" setup>
/**
 * 级联选择器。选项数据是常量
 */
import { ref } from 'vue'

const value = ref([])

// 注意：expandTrigger是在props里
const props: any = {
  expandTrigger: 'hover',
}

const handleChange = (value: any) => {
  console.log(value)
}

const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
]
</script>
