<template>
  <div class="multiple-value-text-input">
    <div class="label" :class="labelClassName">{{ label }}</div>
    <div class="values">
      <span
        v-for="item in valuesRef"
        :key="item"
        class="item"
        :class="itemClassName"
      >
        <MultiTextInputItem
          :val="item"
          :handleItemRemove="handleItemRemove"
          :itemClassName="itemClassName"
        />
      </span>
    </div>
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
</template>

<script setup lang="tsx" name="MutilTextInput">
import { ref } from 'vue'
import MultiTextInputItem from './components/MultiTextInputItem.vue'

/**
 * props类型定义
 */
export interface MultiTextInputProps {
  values: any // 数据
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
  values: [],
  onItemAdded: (newValue: any, all: any) => {
    console.log(newValue, all)
  },
  onItemDeleted: (e: any) => {
    console.log(e)
  },
  label: '值',
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
const valuesRef = ref<string[]>(props.values)
const inputRef = ref()
const nonCharacterKeyLabels: string[] = ['Enter', 'Tab']
const delimiters: string[] = props.submitKeys.filter(
  (element: string) => !nonCharacterKeyLabels.includes(element),
)

function setValue(value: string) {
  console.log('setValue: ' + value)
  inputRef.value = value
}

function handleItemRemove(data: any) {
  console.log('handleItemRemove=' + data)
  const currentValues = valuesRef.value
  // 只删除一个
  const idx = currentValues.indexOf(data)
  if (idx < 0) {
    return
  }

  currentValues.splice(idx, 1)
  props.onItemDeleted(data)
  console.log('handleItemRemove, after remove: ' + valuesRef.value)
}

function handleKeypress(e: any) {
  console.log('handleKeypress=' + e.key)
  // Defaults: Enter, Comma (e.key === 'Enter' or ',')
  if (props.submitKeys.includes(e.key)) {
    e.preventDefault()
    handleItemAdd(e.currentTarget.value)
  }
}

function handleEnter(e: any) {
  console.log('handleEnter=' + e.key)
  // Defaults: Enter, Comma (e.key === 'Enter' or ',')
  if (props.submitKeys.includes(e.key)) {
    e.preventDefault()
    handleItemAdd(e.currentTarget.value)
  }
}

function handlePaste(e: any) {
  console.log('handlePaste=' + e)
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
  console.log('handleItemAdd, ' + addedValue)
  if (!addedValue) {
    setValue('')
    return
  }

  valuesRef.value.push(addedValue)
  setValue('')
  props.onItemAdded(addedValue, valuesRef.value)
}

/**
 * 批量添加
 * @param datas
 */
function handleItemsAdd(datas: string[]) {
  console.log('handleItemsAdd, ' + datas)
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
  values: props.values,
})
</script>

<style scoped lang="scss">
.label {
  margin: 10px;
}

.values {
  width: 100%;
  margin: 10px;
}

.item {
  height: 20px;
  width: 100%;
}

.inputLabel {
  width: 100%;
}

.inputElement {
  width: 100%;
}
</style>
