/**
 * 封装使用卡片的逻辑
 */
import type { ColumnProps, CardAreaProps, CardProps } from '../types'

export const useCard = (
  cardProps: CardProps | undefined,
  columns: ColumnProps[],
) => {
  if (cardProps) {
    fillCardEnum(columns, cardProps)
    return cardProps
  }

  const useProps = new Set<string>()
  const center = getDefaultCenter(columns, useProps)
  const leftBottom = getDefaultLeftBottom(columns, useProps)
  const rightBottom = getDefaultRightBottom(columns, useProps)
  const leftTop = getDefaultLeftTop(columns, useProps)
  const rightTop = getDefaultRightTop(columns, useProps)

  return {
    leftTop,
    rightTop,
    center,
    leftBottom,
    rightBottom,
  }
}

function getDefaultLeftTop(
  columns: ColumnProps[],
  useProps: Set<string>,
): CardAreaProps | undefined {
  const col = getProp(columns, ['status'], useProps)
  if (col) {
    useProps.add(col.prop!)
    console.log('left top prop: ' + col?.prop)
    return {
      prop: col.prop!,
      fontSize: '16px',
      enum: col.enum,
    }
  }
}

function getDefaultRightTop(
  columns: ColumnProps[],
  useProps: Set<string>,
): CardAreaProps | undefined {
  const col = getProp(columns, ['status'], useProps)
  if (col) {
    useProps.add(col.prop!)
    console.log('right top prop: ' + col?.prop)
    return {
      prop: col.prop!,
      fontSize: '16px',
      enum: col.enum,
    }
  }
}

function getDefaultCenter(
  columns: ColumnProps[],
  useProps: Set<string>,
): CardAreaProps | undefined {
  const col = getProp(columns, ['name', 'title'], useProps)
  if (col) {
    useProps.add(col.prop!)
    console.log('center prop: ' + col?.prop)
    return {
      prop: col.prop!,
      color: 'red',
      fontSize: '16px',
      enum: col.enum,
    }
  }
}

function getDefaultLeftBottom(
  columns: ColumnProps[],
  useProps: Set<string>,
): CardAreaProps | undefined {
  const col = getProp(columns, ['tag', 'gmtCreate'], useProps)
  if (col) {
    useProps.add(col.prop!)
    console.log('left bottom prop: ' + col?.prop)
    return {
      prop: col.prop!,
      fontSize: '16px',
      enum: col.enum,
    }
  }
}

function getDefaultRightBottom(
  columns: ColumnProps[],
  useProps: Set<string>,
): CardAreaProps | undefined {
  const col = getProp(columns, ['gmtCreate', 'gmtModified'], useProps)
  if (col) {
    useProps.add(col.prop!)
    console.log('right bottom prop: ' + col?.prop)
    return {
      prop: col.prop!,
      fontSize: '16px',
      enum: col.enum,
    }
  }
}

function getProp(
  columns: ColumnProps[],
  names: string[],
  useProps: Set<string>,
): ColumnProps | undefined {
  const arr = filterColumn(columns, useProps)
  if (arr.length < 1) {
    return undefined
  }

  let prop = getSimilarProp(arr, names)
  if (!prop) {
    // 选取第一个可用的属性
    prop = arr[0]
  }

  return prop
}

/**
 * 根据名称查找列
 * @param columns
 * @param names
 * @returns
 */
function getSimilarProp(
  columns: ColumnProps[],
  names: string[],
): ColumnProps | undefined {
  return columns.find((item) => {
    for (const e in names) {
      if (item.prop!.toLocaleLowerCase().indexOf(names[e]) > 0) {
        return item
      }
    }
  })
}

/**
 * 过滤出还没使用过、并且prop属性有值的列
 * @param columns
 * @param useProps
 * @returns
 */
function filterColumn(
  columns: ColumnProps[],
  useProps: Set<string>,
): ColumnProps[] {
  return columns.filter(
    (e) =>
      e.prop &&
      e.prop.toLocaleLowerCase().indexOf('id') < 0 &&
      !useProps.has(e.prop),
  )
}

function fillCardEnum(columns: ColumnProps[], cardProps: Record<string, any>) {
  for (const e in cardProps) {
    const v = cardProps[e]
    if (v.prop) {
      const col = columns.find((item) => item.prop && item.prop === v.prop)
      // v.enum = col?.enum
      Object.assign(v, { enum: col?.enum })
    }
  }
}
