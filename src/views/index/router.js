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
    // 营销方案
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
        path: 'list',
        name: 'analyse-list',
        component: resolve => require(["../../components/marketAnalyse/itemList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'magagemonthDetail',
        name: 'magagemonth-detail',
        component: resolve => require(["../../components/marketAnalyse/magagemonthDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'activitydayDetail',
        name: 'activityday-detail',
        component: resolve => require(["../../components/marketAnalyse/activitydayDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'activityspreedDetail',
        name: 'activityspreed-detail',
        component: resolve => require(["../../components/marketAnalyse/activityspreedDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'activitynolineDetail',
        name: 'activitynoline-detail',
        component: resolve => require(["../../components/marketAnalyse/activitynolineDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'nolinedayDetail',
        name: 'nolineday-detail',
        component: resolve => require(["../../components/marketAnalyse/nolinedayDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'spreedweekDetail',
        name: 'spreedweek-detail',
        component: resolve => require(["../../components/marketAnalyse/spreedweekDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'editmonthDetail',
        name: 'editmonth-detail',
        component: resolve => require(["../../components/marketAnalyse/editmonthDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'spreedsummaryDetail',
        name: 'spreedsummary-detail',
        component: resolve => require(["../../components/marketAnalyse/spreedsummaryDetail.vue"], resolve),
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
  }
]

export default routers
