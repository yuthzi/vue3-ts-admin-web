<template>
  <span class="item" :class="itemClassName">
    <span class="itemText">{{ val[dataKey] }}</span>
    <span class="deleteButton" v-on:click="handleItemRemove(val)">
      <slot name="deleteButton">
        <!-- 默认内容 -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          class="delete"
        >
          <path
            fill="currentColor"
            d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
          ></path>
        </svg>
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
.item {
  background-color: #ecf5ff;
  border-color: #d9ecff;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  padding-top: 5px;
  padding-bottom: 5px;
}

.itemText {
  color: #409eff;
  font-size: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 9px;
}

.deleteButton {
  margin-left: 2px;
  margin-right: 5px;
  cursor: pointer;
}

.deleteButton:hover {
  background-color: #409eff;
  border-radius: 50%;
}

.delete:hover {
  color: #ffffff;
}

.delete {
  color: #409eff;
  font-size: 12px;
  height: 14px;
  width: 14px;
  display: inline-block;
  vertical-align: middle;
}
</style>
