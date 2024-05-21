
export const routes = [
{
    // SPU管理
    name: 'GoodsSpu',
    path: '/goods/spu',
    component: LAYOUT,
    redirect: '/goods/spu/index',
    meta: {
      title: 'SPU',
      icon: 'User',
    },
    children: [
      {
        name: 'GoodsSpuList',
        path: '/goods/spu/index',
        component: () => import('@/views/goods/spu/index.vue'),
        meta: {
          title: 'SPU列表',
          icon: 'User',
        },
      },
    ],
  },
]
