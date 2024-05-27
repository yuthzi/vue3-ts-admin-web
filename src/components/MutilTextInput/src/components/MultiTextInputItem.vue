<template>
  <span class="inputItem" :class="itemClassName">
    <span>{{ val[dataKey] }}</span>
    <span class="deleteButton" v-on:click="handleItemRemove(val)">
      <slot name="deleteButton">
        <!-- 默认内容 -->
        <span class="delete">&times;</span>
      </slot>
    </span>
  </span>
</template>

<script setup lang="ts" name="MultiTextInputItem">
/**
 * @description: props类型定义
 * @param value               - 值       ==> 必传
 * @param handleItemRemove    - 删除     ==> 必传
 */
export interface ItemProps {
  val: any
  dataKey?: string
  itemClassName?: string
  handleItemRemove?: (data: any) => any
}

// 组件props的ts定义必须在组件中声明
withDefaults(defineProps<ItemProps>(), {
  val: {
    data: 'hi',
  },
  dataKey: 'data',
  itemClassName: '',
  handleItemRemove: (e: any) => console.log('remove ' + e),
})
</script>

<style scoped lang="css">
.inputItem {
  padding: 5px;
  background: #ccc;
  margin-right: 5px;
}
.deleteButton {
  padding-left: 5px;
  cursor: pointer;
}
.delete {
  color: #d81e06;
}
</style>
