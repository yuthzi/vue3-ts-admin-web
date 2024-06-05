<template>
  <div class="el-icon">
    <el-icon v-if="element">
      <component :is="name"></component>
    </el-icon>
    <i v-else :class="['el-icon', spin && 'svg-icon-spin']" :style="getStyle">
      <svg aria-hidden="true">
        <use :xlink:href="symbolId" :fill="color" />
      </svg>
    </i>
  </div>
</template>

<script setup lang="ts" name="SvgIcon">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'

/**
 * @param {string} name: 名称。大写字母开头的当作element-plus图标，小写字母开头的当作自定义图标
 * @param {number} size: 图标大小，px
 */
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#ffffff',
  },
  size: {
    type: [Number, String],
    default: 20,
  },
  spin: {
    type: Boolean,
    default: false,
  },
})

const element = computed(() => {
  return isStartWithUpper(props.name)
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const getStyle = computed((): CSSProperties => {
  const { size } = props
  let s = `${size}`
  s = `${s.replace('px', '')}px`
  return {
    fontSize: s,
  }
})

function isStartWithUpper(s: string) {
  const firstChar = s.slice(0, 1)
  return firstChar.toUpperCase() == firstChar
}
</script>

<style scoped lang="scss">
.el-icon {
  --color: inherit;

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
  font-size: inherit;
  line-height: 1em;
  color: var(--color);
  fill: currentColor;

  svg {
    width: 1em;
    height: 1em;
  }
}

.svg-icon-spin {
  animation: circle 1.5s infinite linear;
}

/* 旋转动画 */
@keyframes circle {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
