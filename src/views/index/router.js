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
    // 券营销活动
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
      },
      {
        // 终止活动
        path: 'stopActivity',
        name: 'stop-activity',
        component: resolve => require(["../../components/marketCase/stopActivity.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        // 活动目标
        path: 'activityTarget',
        name: 'activity-target',
        component: resolve => require(["../../components/marketCase/activityTarget.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        // 详细方案
        path: 'caseDetail',
        name: 'case-detail',
        component: resolve => require(["../../components/marketCase/caseDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        // 优惠券
        path: 'caseCoupon',
        name: 'case-coupon',
        component: resolve => require(["../../components/marketCase/caseCoupon.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        // 传播奖励
        path: 'communicationReward',
        name: 'communication-reward',
        component: resolve => require(["../../components/marketCase/communicationReward.vue"], resolve),
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
    // 营销红包
    path: '/marketPacket',
    name: 'marketPacket',
    component (resolve) {
      require(["../../components/marketPacket/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'logo-list',
        component: resolve => require(["../../components/marketPacket/logoList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'giftPoints',
        name: 'gift-points',
        component: resolve => require(["../../components/marketPacket/giftPoints.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  },
  {
    // 推广注册
    path: '/promotionFranchise',
    name: 'promotionFranchise',
    component (resolve) {
      require(["../../components/promotionFranchise/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'spreed-join',
        component: resolve => require(["../../components/promotionFranchise/spreedJoin.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'registorConfirm',
        name: 'registor-confirm',
        component: resolve => require(["../../components/promotionFranchise/registorConfirm.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  },
  {
    // 在线预约
    path: '/onlineBooking',
    name: 'onlineBooking',
    component (resolve) {
      require(["../../components/onlineBooking/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'appointment-confirm',
        component: resolve => require(["../../components/onlineBooking/appointmentConfirm.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'appointmentCustomer',
        name: 'appointment-customer',
        component: resolve => require(["../../components/onlineBooking/appointmentCustomer.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'pageConfirm',
        name: 'page-confirm',
        component: resolve => require(["../../components/onlineBooking/pageConfirm.vue"], resolve),
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
  },
  {
    // 营销任务
    path: '/marketTask',
    name: 'marketTask',
    component (resolve) {
      require(["../../components/marketTask/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'task-list',
        component: resolve => require(["../../components/marketTask/itemList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'activityTask',
        name: 'activity-task',
        component: resolve => require(["../../components/marketTask/activityTask.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'editTask',
        name: 'edit-task',
        component: resolve => require(["../../components/marketTask/editTask.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'spreedTask',
        name: 'spreed-task',
        component: resolve => require(["../../components/marketTask/spreedTask.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'pushTask',
        name: 'push-task',
        component: resolve => require(["../../components/marketTask/pushTask.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'nolineTask',
        name: 'noline-task',
        component: resolve => require(["../../components/marketTask/nolineTask.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'responsenolineTask',
        name: 'responsenoline-task',
        component: resolve => require(["../../components/marketTask/responsenolineTask.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'receiveTask',
        name: 'receive-task',
        component: resolve => require(["../../components/marketTask/receiveTask.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'responseTask',
        name: 'response-task',
        component: resolve => require(["../../components/marketTask/responseTask.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'assignmentTask',
        name: 'assignment-task',
        component: resolve => require(["../../components/marketTask/assignmentTask.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'checkTask',
        name: 'check-task',
        component: resolve => require(["../../components/marketTask/checkTask.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'nolinecheckTask',
        name: 'nolinecheck-task',
        component: resolve => require(["../../components/marketTask/nolinecheckTask.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'receivecheckTask',
        name: 'receivecheck-task',
        component: resolve => require(["../../components/marketTask/receivecheckTask.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'responsecheckTask',
        name: 'responsecheck-task',
        component: resolve => require(["../../components/marketTask/responsecheckTask.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'qrCode',
        name: 'qr-code',
        component: resolve => require(["../../components/marketTask/qrCode.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'tiketList',
        name: 'tiket-list',
        component: resolve => require(["../../components/marketTask/tiketList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'userCheck',
        name: 'user-check',
        component: resolve => require(["../../components/marketTask/userCheck.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'receiveTiket',
        name: 'receive-tiket',
        component: resolve => require(["../../components/marketTask/receiveTiket.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  }
]

export default routers
