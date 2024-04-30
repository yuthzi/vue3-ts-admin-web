import { resultError, resultSuccess, getRequestToken } from './_utils'
// mock/user.ts

function createUserList() {
  return [
    {
      userId: 1,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'admin',
      password: '111111',
      desc: '平台管理员',
      roles: ['平台管理员'],
      routes: [
        'User',
        'Category',
        'Discount',
        'ActivityEdit',
        'CouponRule',
        'Product',
        'Activity',
        'CouponAdd',
        'Trademark',
        'Attr',
        'ActivityAdd',
        'ASD',
        'CouponEdit',
        'OrderShow',
        'Permission',
        'Spu',
        'ClientUser',
        'UserList',
        'ClientLabel',
        'Order',
        'Report',
        'Coupon',
        'permision',
        'Acl',
        'ActivityRule',
        'Role',
        'RoleAuth',
        'RefundList',
        'OrderList',
        'OrderStatList',
        'SkuSellStatList',
        'Sku',
      ],
      buttons: [
        'cuser.detail',
        'cuser.update',
        'cuser.delete',
        'btn.User.add',
        'btn.User.remove',
        'btn.User.update',
        'btn.User.assgin',
        'btn.Role.assgin',
        'btn.Role.add',
        'btn.Role.update',
        'btn.Role.remove',
        'btn.Permission.add',
        'btn.Permission.update',
        'btn.Permission.remove',
        'btn.Activity.add',
        'btn.Activity.update',
        'btn.Activity.rule',
        'btn.Coupon.add',
        'btn.Coupon.update',
        'btn.Coupon.rule',
        'btn.OrderList.detail',
        'btn.OrderList.Refund',
        'btn.UserList.lock',
        'btn.Category.add',
        'btn.Category.update',
        'btn.Category.remove',
        'btn.Trademark.add',
        'btn.Trademark.update',
        'btn.Trademark.remove',
        'btn.Attr.add',
        'btn.Attr.update',
        'btn.Attr.remove',
        'btn.Spu.add',
        'btn.Spu.addsku',
        'btn.Spu.update',
        'btn.Spu.skus',
        'btn.Spu.delete',
        'btn.Sku.updown',
        'btn.Sku.update',
        'btn.Sku.detail',
        'btn.Sku.remove',
        'btn.all',
        'btn.test.2',
        'btn.User.addbtn',
      ],
      token: 'Admin_Token',
    },
    {
      userId: 2,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'system',
      password: '111111',
      desc: '系统管理员',
      roles: ['系统管理员'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: ['home'],
      token: 'System_Token',
    },
  ]
}

export default [
  // 用户登录
  // {
  //   url: '/dev-api/admin/login',
  //   method: 'post',
  //   response: ({ body }) => {
  //     const { username, password } = body
  //     const checkUser = createUserList().find(
  //       (item) => item.username === username && item.password === password,
  //     )
  //     if (!checkUser) {
  //       return resultError('Incorrect username or password！')
  //     }
  //     const { token } = checkUser
  //     return resultSuccess(token)
  //   },
  // },
  // 获取用户信息
  {
    url: '/dev-api/admin/acl/index/info',
    method: 'get',
    response: (request) => {
      const token = getRequestToken(request)
      console.log('info' + token)
      const checkUser = createUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError(
          'The corresponding user information was not obtained!',
        )
      }
      return resultSuccess(checkUser)
    },
  },
  // 一个失败的请求
  {
    url: '/dev-api/error',
    method: 'get',
    response: () => {
      return {
        code: 1,
        message: '密码错误',
        data: null,
      }
    },
  },
]
