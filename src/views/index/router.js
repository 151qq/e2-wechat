const routers = [
  {
    // 产品分类
    path: '/productCategory',
    name: 'productCategory',
    component (resolve) {
      require(["../../components/productCategory/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'product-list',
        component: resolve => require(["../../components/productCategory/itemList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'detail',
        name: 'product-detail',
        component: resolve => require(["../../components/productCategory/itemDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'imgList',
        name: 'product-img',
        component: resolve => require(["../../components/productCategory/imgList.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  },
  {
    // 推广文章
    path: '/spreedArticle',
    name: 'spreedArticle',
    component (resolve) {
      require(["../../components/spreedArticle/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'article-list',
        component: resolve => require(["../../components/spreedArticle/itemList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'detail',
        name: 'article-detail',
        component: resolve => require(["../../components/spreedArticle/itemDetail.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  },
  {
    // 营销方案
    path: '/marketCase',
    name: 'marketCase',
    component (resolve) {
      require(["../../components/marketCase/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'case-category',
        component: resolve => require(["../../components/marketCase/category.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'list',
        name: 'case-list',
        component: resolve => require(["../../components/marketCase/itemList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'outlineDetail',
        name: 'outline-detail',
        component: resolve => require(["../../components/marketCase/outlineDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'onlineDetail',
        name: 'online-detail',
        component: resolve => require(["../../components/marketCase/onlineDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'nolineDetail',
        name: 'noline-detail',
        component: resolve => require(["../../components/marketCase/nolineDetail.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  },
  {
    // 营销分析
    path: '/marketAnalyse',
    name: 'marketAnalyse',
    component (resolve) {
      require(["../../components/marketAnalyse/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'analyse-category',
        component: resolve => require(["../../components/marketAnalyse/category.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'spreedstatisticsList',
        name: 'spreedstatistics-list',
        component: resolve => require(["../../components/marketAnalyse/spreedstatisticsList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'spreedactivityList',
        name: 'spreedactivity-list',
        component: resolve => require(["../../components/marketAnalyse/spreedactivityList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'pushstatisticsList',
        name: 'pushstatistics-list',
        component: resolve => require(["../../components/marketAnalyse/pushstatisticsList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'pushactivityList',
        name: 'pushactivity-list',
        component: resolve => require(["../../components/marketAnalyse/pushactivityList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'outlinestatisticsList',
        name: 'outlinestatistics-list',
        component: resolve => require(["../../components/marketAnalyse/outlinestatisticsList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'outlinereportList',
        name: 'outlinereport-list',
        component: resolve => require(["../../components/marketAnalyse/outlinereportList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'appointmentstatisticsList',
        name: 'appointmentstatistics-list',
        component: resolve => require(["../../components/marketAnalyse/appointmentstatisticsList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'spreedstatisticsDetail',
        name: 'spreedstatistics-detail',
        component: resolve => require(["../../components/marketAnalyse/spreedstatisticsDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'spreedactivityDetail',
        name: 'spreedactivity-detail',
        component: resolve => require(["../../components/marketAnalyse/spreedactivityDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'pushstatisticsDetail',
        name: 'pushstatistics-detail',
        component: resolve => require(["../../components/marketAnalyse/pushstatisticsDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'pushactivityDetail',
        name: 'pushactivity-detail',
        component: resolve => require(["../../components/marketAnalyse/pushactivityDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'outlinestatisticsDetail',
        name: 'outlinestatistics-detail',
        component: resolve => require(["../../components/marketAnalyse/outlinestatisticsDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'outlinereportDetail',
        name: 'outlinereport-detail',
        component: resolve => require(["../../components/marketAnalyse/outlinereportDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'marketmonthDetail',
        name: 'marketmonth-detail',
        component: resolve => require(["../../components/marketAnalyse/marketmonthDetail.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  },
  {
    // 营销表单
    path: '/marketForm',
    name: 'marketForm',
    component (resolve) {
      require(["../../components/marketForm/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'from-list',
        component: resolve => require(["../../components/marketForm/itemList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'onlineBooking',
        name: 'outline-booking',
        component: resolve => require(["../../components/marketForm/onlineBooking.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'personnelRegistration',
        name: 'personnel-registration',
        component: resolve => require(["../../components/marketForm/personnelRegistration.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  },
  {
    // 聊天记录
    path: '/chatRecord',
    name: 'chatRecord',
    component (resolve) {
      require(["../../components/chatRecord/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'chat-list',
        component: resolve => require(["../../components/chatRecord/itemList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'detail',
        name: 'chat-detail',
        component: resolve => require(["../../components/chatRecord/itemDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'imgList',
        name: 'chat-img',
        component: resolve => require(["../../components/chatRecord/imgList.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  },
  {
    // 我的会员
    path: '/member',
    name: 'member',
    component (resolve) {
      require(["../../components/member/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'member-list',
        component: resolve => require(["../../components/member/itemList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'detail',
        name: 'member-detail',
        component: resolve => require(["../../components/member/itemDetail.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  }
]

export default routers
