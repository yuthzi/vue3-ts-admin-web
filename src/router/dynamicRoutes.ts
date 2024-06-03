/*
 * @Description: 动态路由。图标：https://element-plus.gitee.io/zh-CN/component/icon.html
 */

import { RouteRecordRaw } from 'vue-router'

const LAYOUT = () => import('@/layouts/index.vue')

export const dynamicRoutes: RouteRecordRaw[] = [
  // 权限管理
  {
    name: 'Acl',
    path: '/acl',
    component: LAYOUT,
    redirect: '/acl/user',
    meta: {
      title: '权限管理',
      icon: 'Lock',
    },
    children: [
      {
        name: 'User',
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'UserFilled',
        },
      },
      {
        name: 'Role',
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'Avatar',
        },
      },
      {
        name: 'Permission',
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'Menu',
        },
      },
    ],
  },
  // dev
  {
    name: 'Dev',
    path: '/dev',
    component: LAYOUT,
    redirect: '/dev/ing',
    meta: {
      title: '组件demo',
      icon: 'Goods',
    },
    children: [
      {
        name: 'DevShareDataByReactive',
        path: '/dev/shareData/reactive',
        component: () => import('@/views/dev/shareData/reactiveObj/index.vue'),
        meta: {
          title: '组件共享数据reactive',
          icon: 'Grid',
        },
      },
      {
        name: 'DevShareDataByModelValue',
        path: '/dev/shareData/modelValue',
        component: () => import('@/views/dev/shareData/modelValue/index.vue'),
        meta: {
          title: '组件共享数据modelValue',
          icon: 'Grid',
        },
      },
      {
        name: 'DevCascader',
        path: '/dev/cascader',
        component: () => import('@/views/dev/cascader/indexLazyLoad.vue'),
        meta: {
          title: '级联选择器',
          icon: 'Grid',
        },
      },
    ],
  },
  // 营销管理
  {
    name: 'Marketing',
    path: '/marketing',
    component: LAYOUT,
    redirect: '/marketing/attr',
    meta: {
      title: '营销管理',
      icon: 'Coin',
    },
    children: [
      {
        name: 'Activity',
        path: '/marketing/activity',
        component: () => import('@/views/marketing/activity/index.vue'),
        meta: {
          title: '活动管理',
          icon: 'Grid',
        },
      },
      {
        name: 'Coupon',
        path: '/marketing/coupon',
        component: () => import('@/views/marketing/coupon/index.vue'),
        meta: {
          title: '优惠券管理',
          icon: 'Grid',
        },
      },
      {
        name: 'Seckill',
        path: '/marketing/seckill',
        component: () => import('@/views/marketing/seckill/index.vue'),
        meta: {
          title: '秒杀管理',
          icon: 'Grid',
        },
      },
    ],
  },
  // 客户管理
  {
    name: 'CustomerDir',
    path: '/customer',
    component: LAYOUT,
    redirect: '/customer/list',
    meta: {
      title: '客户管理',
      icon: 'User',
    },
    children: [
      {
        name: 'Customer',
        path: '/customer/list',
        component: () => import('@/views/customer/list/index.vue'),
        meta: {
          title: '客户列表',
          icon: 'User',
        },
      },
      {
        name: 'CustomerLevel',
        path: '/customer/level',
        component: () => import('@/views/customer/level/index.vue'),
        meta: {
          title: '客户等级',
          // icon: 'Grid',
          customIcon: 'level',
        },
      },
    ],
  },
  {
    // 商品管理
    name: 'Goods',
    path: '/goods',
    component: LAYOUT,
    redirect: '/goods/sku/index',
    meta: {
      title: '商品管理',
      icon: 'User',
    },
    children: [
      {
        name: 'Category',
        path: '/goods/category',
        component: () => import('@/views/goods/category/index.vue'),
        meta: {
          title: '分类列表',
          icon: 'Grid',
        },
      },
      {
        name: 'Brand',
        path: '/goods/brand',
        component: () => import('@/views/goods/brand/index.vue'),
        meta: {
          title: '品牌列表',
          icon: 'Grid',
        },
      },
      {
        name: 'GoodsSku',
        path: '/goods/sku/index',
        component: () => import('@/views/goods/sku/index.vue'),
        meta: {
          title: 'SKU列表',
          icon: 'User',
        },
      },
      {
        name: 'GoodsSpec',
        path: '/goods/spec/index',
        component: () => import('@/views/goods/spec/index.vue'),
        meta: {
          title: '规格列表',
          icon: 'User',
        },
      },
      {
        name: 'GoodsSpu',
        path: '/goods/spu/index',
        component: () => import('@/views/goods/spu/index.vue'),
        meta: {
          title: 'SPU列表',
          icon: 'User',
        },
      },
    ],
  },
  // 订单管理
  {
    name: 'Order',
    path: '/order',
    component: LAYOUT,
    redirect: '/order/list',
    meta: {
      title: '订单管理',
      icon: 'ShoppingTrolley',
    },
    children: [
      {
        name: 'OrderBasis',
        path: '/order/list',
        component: () => import('@/views/order/basis/index.vue'),
        meta: {
          title: '订单列表',
          icon: 'Grid',
        },
      },
      {
        name: 'Refund',
        path: '/order/refund',
        component: () => import('@/views/order/refund/index.vue'),
        meta: {
          title: '退款管理',
          icon: 'Grid',
        },
      },
    ],
  },
  // 报表管理
  {
    name: 'Report',
    path: '/report',
    component: LAYOUT,
    redirect: '/report/order/statList',
    meta: {
      title: '报表管理',
      icon: 'PieChart',
      // customIcon: 'report',
    },
    children: [
      {
        name: 'OrderStatList',
        path: '/report/order/statList',
        component: () => import('@/views/report/order/index.vue'),
        meta: {
          title: '订单统计',
          icon: 'Histogram',
        },
      },
    ],
  },
  // 系统管理
  {
    name: 'Setting',
    path: '/setting',
    component: LAYOUT,
    redirect: '/setting/banner',
    meta: {
      title: '系统管理',
      icon: 'Setting',
    },
    children: [
      {
        name: 'Banner',
        path: '/setting/banner',
        component: () => import('@/views/setting/banner/index.vue'),
        meta: {
          title: 'banner管理',
          icon: 'Grid',
        },
      },
      {
        name: 'Notification',
        path: '/setting/notification',
        component: () => import('@/views/setting/notification/index.vue'),
        meta: {
          title: '消息通知管理',
          icon: 'Grid',
        },
      },
    ],
  },
  // 日志管理
  {
    name: 'Log',
    path: '/log',
    component: LAYOUT,
    redirect: '/log/loginLog',
    meta: {
      title: '日志管理',
      icon: 'Setting',
    },
    children: [
      {
        name: 'LoginLog',
        path: '/log/loginLog',
        component: () => import('@/views/log/login/index.vue'),
        meta: {
          title: '登录日志',
          icon: 'Grid',
        },
      },
    ],
  },
  {
    // 代码生成
    name: 'Generator',
    path: '/sys/generator',
    component: LAYOUT,
    redirect: '/sys/generator/index',
    meta: {
      title: '代码生成',
      icon: 'User',
    },
    children: [
      {
        name: 'SysTableList',
        path: '/sys/generator/index',
        component: () => import('@/views/sys/table/index.vue'),
        meta: {
          title: '代码生成',
          icon: 'User',
        },
      },
    ],
  },
]

// console.log(JSON.stringify(dynamicRoutes))
