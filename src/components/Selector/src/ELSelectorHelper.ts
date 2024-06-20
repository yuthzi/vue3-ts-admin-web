/**
 * element-plus 选择器辅助工具
 */
import { getCategorySelector } from '@/api/goods/category/api'
import { getJobPlatformList } from '@/api/job/platform/api'

function listDataCallback(resp: any) {
  return resp?.data?.records ?? []
}

/**
 * 分类级联选择器的props。
 * 使用例子：
 * {
 *  prop: 'categoryId',
 *  label: '分类',
 *  search: {
 *    key: 'categoryId',
 *    el: 'cascader',
 *    props: categorySearchProps,
 *  },
 * }
 */
const categorySearchProps = (() => {
  const lazyLoadData = async (node: any, resolve: any) => {
    const pid = node.value ?? '0'
    const { level } = node
    const data = await getCategorySelector({
      pid: pid,
      pageNum: 1,
      pageSize: 1000,
    }).catch((error) => {
      console.log(error)
      resolve([])
      return
    })

    const records = listDataCallback(data)
    const options = records.map((e: any) => ({
      value: e.categoryId,
      label: e.categoryName,
      leaf: level > 0, // level从0开始。目前数据只支持2级分类
    }))
    // console.log(level, options)
    resolve(options)
  }

  return {
    'show-all-levels': false, // 输入框中是否显示选中值的完整路径
    props: {
      expandTrigger: 'hover',
      lazy: true,
      lazyLoad: lazyLoadData,
    },
  }
})()

/**
 * 招聘平台选择器的props。
 * 使用例子：
 * {
 *  prop: 'platformId',
 *  label: '平台',
 *  search: {
 *    key: 'platformId',
 *    el: 'select',
 *    props: jobPlatformSearchProps,
 *  },
 * }
 */
const jobPlatformEnum = async () => {
  return await getJobPlatformList({
    status: 1,
    pageNum: 1,
    pageSize: 1000,
  }).then(function (resp) {
    const records = listDataCallback(resp)
    const arr = records.map((e: any) => {
      return { value: e.platformId, label: e.name }
    })
    return {
      data: arr,
    }
  })
}

export { categorySearchProps, jobPlatformEnum }
