<template>
  <div
    :style="{
      '--width': width,
      '--leftTopFontSize': leftTopStyle.fontSize,
      '--leftTopColor': leftTopStyle.color,
      '--rightTopFontSize': rightTopStyle.fontSize,
      '--rightTopColor': rightTopStyle.color,
      '--centerFontSize': centerStyle.fontSize,
      '--centerColor': centerStyle.color,
      '--leftBottomFontSize': leftBottomStyle.fontSize,
      '--leftBottomColor': leftBottomStyle.color,
      '--rightBottomFontSize': rightBottomStyle.fontSize,
      '--rightBottomColor': rightBottomStyle.color,
    }"
  >
    <div
      v-for="(item, index) in data"
      :key="item.id"
      :index="index"
      class="card-Item flex"
    >
      <div class="card-top flex">
        <div v-if="leftTop" class="leftTop">
          <component :is="renderCentent(item, leftTop)"></component>
        </div>
        <div v-if="rightTop" class="rightTop">
          <component :is="renderCentent(item, rightTop)"></component>
        </div>
      </div>
      <div v-if="center" class="card-center">
        <component :is="renderCentent(item, center)"></component>
      </div>
      <div class="card-bottom flex">
        <div v-if="leftBottom" class="leftBottom">
          <component :is="renderCentent(item, leftBottom)"></component>
        </div>
        <div v-if="rightBottom" class="rightBottom">
          <component :is="renderCentent(item, rightBottom)"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx" name="Grid">
import type { CardAreaProps } from '../types'

/**
 * 卡片。
 * 卡片的区域：
 * 左上
 * 右上
 * 中间
 * 左下
 * 右下
 */
type CardListProps = {
  leftTop?: CardAreaProps
  rightTop?: CardAreaProps
  center?: CardAreaProps
  leftBottom?: CardAreaProps
  rightBottom?: CardAreaProps
  width?: string
  data: any[]
}

// 组件props的ts定义必须在组件中声明
const props = withDefaults(defineProps<CardListProps>(), {
  isPageable: true,
  pageSize: 5,
  pagination: true,
  initParam: {},
  width: '200px',
  data: () => [],
})

const computeStyle = (param: CardAreaProps | undefined) => {
  return {
    fontSize: param?.fontSize ?? '12px',
    color: param?.color ?? 'black',
  }
}

// 定义局部组件
const renderCentent = (item: any, area: any) => {
  const v = area.render ? area.render({ row: item }) : item[area.prop]
  return <>{v}</>
}

let leftTopStyle = computeStyle(props.leftTop)
let rightTopStyle = computeStyle(props.rightTop)
let centerStyle = computeStyle(props.center)
let leftBottomStyle = computeStyle(props.leftBottom)
let rightBottomStyle = computeStyle(props.rightBottom)
</script>

<style lang="scss" scoped>
.card {
  padding: 10px;
  // background-color: #fff;
}

.card-Item {
  padding: 15px;
  margin-bottom: 9px;
  // height: 100px;
  background-color: #fff;
  border-radius: 12px;
  transition: all 0.2s linear;
  cursor: pointer;
  width: var(--width);

  .flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .card-top {
    margin-bottom: 10px;

    .leftTop {
      font-size: var(--leftTopFontSize);
      color: var(--leftTopColor);
    }

    .rightTop {
      font-size: var(--rightTopFontSize);
      color: var(--rightTopColor);
    }
  }

  .card-center {
    margin: 10px 0;
    font-size: var(--centerFontSize);
    color: var(--centerColor);
  }

  .card-bottom {
    .leftBottom {
      font-size: var(--leftBottomFontSize);
      color: var(--leftBottomColor);
    }

    .rightBottom {
      font-size: var(--rightBottomFontSize);
      color: var(--rightBottomColor);
    }
  }
}
</style>
