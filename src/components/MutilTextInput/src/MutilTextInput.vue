<template>
  <div class="multiple-value-text-input">
    <div class="label" :class="labelClassName" v-if="label">
      {{ label }}&#58;
    </div>
    <div class="values">
      <span
        v-for="item in valuesRef"
        :key="item"
        class="item"
        :class="itemClassName"
      >
        <MultiTextInputItem
          :val="item"
          :dataKey="dataKey"
          :handleItemRemove="handleItemRemove"
          :itemClassName="itemClassName"
        />
      </span>
    </div>
    <div class="input__wrapper">
      <input
        :name="name"
        :placeholder="placeholder"
        :value="inputRef"
        type="text"
        @keyup.enter="handleEnter"
        @keypress="handleKeypress"
        @paste="handlePaste"
        @blur="handleBlur"
        class="inputElement"
        :class="className"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="MutilTextInput">
import { ref } from 'vue'
import MultiTextInputItem from './components/MultiTextInputItem.vue'

/**
 * props类型定义
 */
export interface MultiTextInputProps {
  data: any // 数据
  dataKey?: string
  onItemAdded?: (newValue: any, all: any) => any // 添加元素之后的数据响应
  onItemDeleted?: (e: any) => any // 删除元素之后的数据响应
  label?: string // 数据标签
  name?: string // input标签的name属性
  placeholder?: string // input标签的placeholder属性
  submitKeys?: any //触发添加元素的字符，默认是分号和回车
  /** JSX or string which will be used as the control to delete an item from the collection */
  deleteButton?: string
  shouldAddOnBlur?: boolean // Blur时是否触发添加元素
  className?: string // input element class
  labelClassName?: string // input label class
  itemClassName?: string // 列表元素的class
}

// 组件props
const props = withDefaults(defineProps<MultiTextInputProps>(), {
  data: [],
  dataKey: 'data',
  idKey: 'id',
  onItemAdded: (newValue: any, all: any) => {
    console.log(newValue, all)
  },
  onItemDeleted: (e: any) => {
    console.log(e)
  },
  label: '',
  name: 'name',
  placeholder: '输入任意字符，按回车确定',
  submitKeys: ['Enter', ','],
  deleteButton: '<span>&times;</span>',
  shouldAddOnBlur: true,
  className: '',
  itemClassName: 'item',
  labelClassName: '',
})

// 接收 columns 并设置为响应式
const valuesRef = ref<string[]>(props.data)
const inputRef = ref()
const nonCharacterKeyLabels: string[] = ['Enter', 'Tab']
const delimiters: string[] = props.submitKeys.filter(
  (element: string) => !nonCharacterKeyLabels.includes(element),
)

function setValue(value: string) {
  inputRef.value = value
}

function handleItemRemove(data: any) {
  const currentValues = valuesRef.value
  // 只删除一个
  const idx = currentValues.indexOf(data)
  if (idx < 0) {
    return
  }

  currentValues.splice(idx, 1)
  props.onItemDeleted(data)
}

function handleKeypress(e: any) {
  // Defaults: Enter, Comma (e.key === 'Enter' or ',')
  if (props.submitKeys.includes(e.key)) {
    e.preventDefault()
    handleItemAdd(e.currentTarget.value)
  }
}

function handleEnter(e: any) {
  // Defaults: Enter, Comma (e.key === 'Enter' or ',')
  if (props.submitKeys.includes(e.key)) {
    e.preventDefault()
    handleItemAdd(e.currentTarget.value)
  }
}

function handlePaste(e: any) {
  const pastedText = e.clipboardData.getData('text/plain')
  const areSubmitKeysPresent = delimiters.some((d: any) =>
    pastedText.includes(d),
  )
  if (areSubmitKeysPresent) {
    const splitTerms = splitMulti(pastedText)
    if (splitTerms.length > 0) {
      e.preventDefault()
      handleItemsAdd(splitTerms)
    }
  }
}

function handleBlur(e: any) {
  if (props.shouldAddOnBlur) {
    e.preventDefault()
    handleItemAdd(e.target.value)
  }
}

function handleItemAdd(addedValue: string) {
  if (!addedValue) {
    setValue('')
    return
  }

  let row = {}
  row[props.dataKey] = addedValue
  valuesRef.value.push(row)
  setValue('')
  props.onItemAdded(addedValue, valuesRef.value)
}

/**
 * 批量添加
 * @param datas
 */
function handleItemsAdd(datas: string[]) {
  datas.forEach((d) => handleItemAdd(d))
}

function splitMulti(str: string) {
  const tempChar = delimiters[0]
  let result: string = str
  for (let i = 1; i < delimiters.length; i += 1) {
    result = result.split(delimiters[i]).join(tempChar) // Handle scenarios where pasted text has more than one submitKeys in it
  }
  return result.split(tempChar)
}

defineExpose({
  data: props.data,
})
</script>

<style scoped lang="css">
.multiple-value-text-input {
  width: 100%;
}

.values {
  width: 100%;
  padding: 10px 0px;
}

.item {
  height: 20px;
  width: 100%;
}

.inputLabel {
  width: 100%;
}

.input__wrapper {
  width: 100%;
  display: inline-flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  background-image: none;
  border-radius: 4px;
  transition: box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: 0 0 0 1px #dcdfe6 inset;
}

.inputElement {
  width: 100%;
  flex-grow: 1;
  color: #606266;
  font-size: inherit;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  outline: 0;
  border: none;
  background: 0 0;
  box-sizing: border-box;
}
</style>
