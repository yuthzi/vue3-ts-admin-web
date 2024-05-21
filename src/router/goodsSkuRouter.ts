
export const routes = [
{
    // SKU管理
    name: 'GoodsSku',
    path: '/goods/sku',
    component: LAYOUT,
    redirect: '/goods/sku/index',
    meta: {
      title: 'SKU',
      icon: 'User',
    },
    children: [
      {
        name: 'GoodsSkuList',
        path: '/goods/sku/index',
        component: () => import('@/views/goods/sku/index.vue'),
        meta: {
          title: 'SKU列表',
          icon: 'User',
        },
      },
    ],
  },
]
