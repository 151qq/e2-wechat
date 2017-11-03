const routers = [
  {
    path: '/marketKnowledge',
    name: 'marketKnowledge',
    component (resolve) {
      require(["../../components/marketKnowledge/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'market-category',
        component: resolve => require(["../../components/marketKnowledge/index.vue"], resolve),
        meta: {
          title: '营销知识库',
          token:false
        }
      },
      {
        path: 'list/:listType',
        name: 'market-list',
        component: resolve => require(["../../components/marketKnowledge/itemList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'detail/:detailType',
        name: 'market-detail',
        component: resolve => require(["../../components/marketKnowledge/itemDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'imgList',
        name: 'market-img',
        component: resolve => require(["../../components/marketKnowledge/imgList.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  }
]

export default routers
