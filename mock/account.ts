import { resultSuccess } from './_utils'
// mock/account.ts

export default [
  // 用户登录
  {
    url: '/dev-api/admin/acl/user/save',
    method: 'post',
    response: ({ body }) => {
      const { username, password, name } = body
      console.log({ username, password, name })

      return resultSuccess('添加用户成功！')
    },
  },
]
