/**
 * 分页相关
 */

// 处理返回的数据格式
export const dataCallback = (data: any) => {
  return {
    list: data?.records,
    total: data?.total,
  }
}
