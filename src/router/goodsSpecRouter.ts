
export const routes = [
{
    // 商品规格管理
    name: 'GoodsSpec',
    path: '/goods/spec',
    component: LAYOUT,
    redirect: '/goods/spec/index',
    meta: {
      title: '商品规格',
      icon: 'User',
    },
    children: [
      {
        name: 'GoodsSpecList',
        path: '/goods/spec/index',
        component: () => import('@/views/goods/spec/index.vue'),
        meta: {
          title: '商品规格列表',
          icon: 'User',
        },
      },
    ],
  },
]
