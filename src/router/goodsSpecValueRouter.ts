
export const routes = [
{
    // 商品规格值管理
    name: 'GoodsSpecValue',
    path: '/goods/spec/value',
    component: LAYOUT,
    redirect: '/goods/spec/value/index',
    meta: {
      title: '商品规格值',
      icon: 'User',
    },
    children: [
      {
        name: 'GoodsSpecValueList',
        path: '/goods/spec/value/index',
        component: () => import('@/views/goods/spec/value/index.vue'),
        meta: {
          title: '商品规格值列表',
          icon: 'User',
        },
      },
    ],
  },
]
