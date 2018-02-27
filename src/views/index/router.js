const routers = [
  {
    // 首页
    path: '/',
    name: 'home',
    component (resolve) {
      require(["./home.vue"], resolve)
    }
  },
  {
    // 注册
    path: '/registor',
    name: 'registor',
    component (resolve) {
      require(["./registor.vue"], resolve)
    }
  },
  {
    // 注册提示页面
    path: '/registorMessage',
    name: 'registor-message',
    component (resolve) {
      require(["./registorMessage.vue"], resolve)
    }
  },
  {
    // 地图搜索
    path: '/search-map',
    name: 'search-map',
    component (resolve) {
      require(["../../components/common/search-map.vue"], resolve)
    }
  },
  {
    // 选择用户
    path: '/user-list',
    name: 'user-list',
    component (resolve) {
      require(["../../components/common/user-list.vue"], resolve)
    }
  },
  {
    // 附件分类
    path: '/attachment',
    name: 'attachment',
    component (resolve) {
      require(["../../components/attachment/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'attachment-list',
        component: resolve => require(["../../components/attachment/attachmentList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'activityAttachment',
        name: 'activity-attachment',
        component: resolve => require(["../../components/attachment/activityAttachment.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'taskAttachment',
        name: 'task-attachment',
        component: resolve => require(["../../components/attachment/taskAttachment.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'articleAttachment',
        name: 'article-attachment',
        component: resolve => require(["../../components/attachment/articleAttachment.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'partyAttachment',
        name: 'party-attachment',
        component: resolve => require(["../../components/attachment/partyAttachment.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'productAttachment',
        name: 'product-attachment',
        component: resolve => require(["../../components/attachment/productAttachment.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'couponAttachment',
        name: 'coupon-attachment',
        component: resolve => require(["../../components/attachment/couponAttachment.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'reserveAttachment',
        name: 'reserve-attachment',
        component: resolve => require(["../../components/attachment/reserveAttachment.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  },
  {
    // 产品分类
    path: '/productCenter',
    name: 'productCenter',
    component (resolve) {
      require(["../../components/productCenter/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'product-list',
        component: resolve => require(["../../components/productCenter/itemList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'productDetail',
        name: 'product-detail',
        component: resolve => require(["../../components/productCenter/articleDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'productLog',
        name: 'product-log',
        component: resolve => require(["../../components/productCenter/articleLog.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'productSpec',
        name: 'product-spec',
        component: resolve => require(["../../components/productCenter/productSpec.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'productSenior',
        name: 'product-senior',
        component: resolve => require(["../../components/productCenter/productSenior.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'productimg',
        name: 'product-img',
        component: resolve => require(["../../components/productCenter/imgList.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  },
  {
    // 企业相册
    path: '/enterpriseAlbum',
    name: 'enterpriseAlbum',
    component (resolve) {
      require(["../../components/enterpriseAlbum/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'enterprise-dirs',
        component: resolve => require(["../../components/enterpriseAlbum/itemList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'imgList',
        name: 'img-list',
        component: resolve => require(["../../components/enterpriseAlbum/imgList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'mediaList',
        name: 'media-list',
        component: resolve => require(["../../components/enterpriseAlbum/mediaList.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  },
  {
    // 外呼工作
    path: '/outbandWork',
    name: 'outbandWork',
    component (resolve) {
      require(["../../components/outbandWork/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'noline-list',
        component: resolve => require(["../../components/outbandWork/itemList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'nolineRemark',
        name: 'noline-remark',
        component: resolve => require(["../../components/outbandWork/nolineRemark.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'nolineDetail',
        name: 'noline-detail',
        component: resolve => require(["../../components/outbandWork/nolineDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'nolineQz',
        name: 'noline-qz',
        component: resolve => require(["../../components/outbandWork/nolineQz.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'nolineSj',
        name: 'noline-sj',
        component: resolve => require(["../../components/outbandWork/nolineSj.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'nolineComment',
        name: 'noline-comment',
        component: resolve => require(["../../components/outbandWork/nolineComment.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  },
  {
    // 推广文章
    path: '/spreadPage',
    name: 'spreadPage',
    component (resolve) {
      require(["../../components/spreadPage/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'article-list',
        component: resolve => require(["../../components/spreadPage/itemList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'articleDetail',
        name: 'article-detail',
        component: resolve => require(["../../components/spreadPage/articleDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'resComment',
        name: 'res-comment',
        component: resolve => require(["../../components/spreadPage/resComment.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'oprateMessage',
        name: 'oprate-message',
        component: resolve => require(["../../components/spreadPage/oprateMessage.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'aboutArticle',
        name: 'about-article',
        component: resolve => require(["../../components/spreadPage/aboutArticle.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'submitArticle',
        name: 'submit-article',
        component: resolve => require(["../../components/spreadPage/submitArticle.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'articleLog',
        name: 'article-log',
        component: resolve => require(["../../components/spreadPage/articleLog.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  },
  {
    // 券营销活动
    path: '/couponEvent',
    name: 'couponEvent',
    component (resolve) {
      require(["../../components/couponEvent/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'case-list',
        component: resolve => require(["../../components/couponEvent/itemList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'caseDetail',
        name: 'case-detail',
        component: resolve => require(["../../components/couponEvent/caseDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'couponDetail',
        name: 'coupon-detail',
        component: resolve => require(["../../components/couponEvent/couponDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'stopActivity',
        name: 'stop-activity',
        component: resolve => require(["../../components/couponEvent/stopActivity.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  },
  {
    // 营销分析
    path: '/marketingAnalysis',
    name: 'marketingAnalysis',
    component (resolve) {
      require(["../../components/marketingAnalysis/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'analyse-list',
        component: resolve => require(["../../components/marketingAnalysis/itemList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'analyseNorm',
        name: 'analyse-norm',
        component: resolve => require(["../../components/marketingAnalysis/analyseNorm.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'analyseCoupon',
        name: 'analyse-coupon',
        component: resolve => require(["../../components/marketingAnalysis/analyseCoupon.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'analyseWx',
        name: 'analyse-wx',
        component: resolve => require(["../../components/marketingAnalysis/analyseWx.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'analyseArticle',
        name: 'analyse-article',
        component: resolve => require(["../../components/marketingAnalysis/analyseArticle.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'analyseOutband',
        name: 'analyse-outband',
        component: resolve => require(["../../components/marketingAnalysis/analyseOutband.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'analyseParty',
        name: 'analyse-party',
        component: resolve => require(["../../components/marketingAnalysis/analyseParty.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'analyseQuestion',
        name: 'analyse-question',
        component: resolve => require(["../../components/marketingAnalysis/analyseQuestion.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  },
  {
    // 营销红包
    path: '/myConfig',
    name: 'myConfig',
    component (resolve) {
      require(["../../components/myConfig/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'user-info',
        component: resolve => require(["../../components/myConfig/userInfo.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'setRole',
        name: 'set-role',
        component: resolve => require(["../../components/myConfig/setRole.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'submitRole',
        name: 'submit-role',
        component: resolve => require(["../../components/myConfig/submitRole.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  },
  {
    // 推广注册
    path: '/wxPromotion',
    name: 'wxPromotion',
    component (resolve) {
      require(["../../components/wxPromotion/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'channel-list',
        component: resolve => require(["../../components/wxPromotion/itemList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'channelDetail',
        name: 'channel-detail',
        component: resolve => require(["../../components/wxPromotion/channelDetail.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  },
  {
    // 在线预约
    path: '/reserveOnline',
    name: 'reserveOnline',
    component (resolve) {
      require(["../../components/reserveOnline/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'reserve-list',
        component: resolve => require(["../../components/reserveOnline/itemList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'addReserve',
        name: 'add-reserve',
        component: resolve => require(["../../components/reserveOnline/addReserve.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'reserveSummary',
        name: 'reserve-summary',
        component: resolve => require(["../../components/reserveOnline/reserveSummary.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'reserveDetail',
        name: 'reserve-detail',
        component: resolve => require(["../../components/reserveOnline/reserveDetail.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  },
  {
    // 地推活动
    path: '/partyTool',
    name: 'partyTool',
    component (resolve) {
      require(["../../components/partyTool/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'party-list',
        component: resolve => require(["../../components/partyTool/itemList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'partyDetail',
        name: 'party-detail',
        component: resolve => require(["../../components/partyTool/partyDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'newParty',
        name: 'new-party',
        component: resolve => require(["../../components/partyTool/newParty.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'stopParty',
        name: 'stop-party',
        component: resolve => require(["../../components/partyTool/stopParty.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'partyGift',
        name: 'party-gift',
        component: resolve => require(["../../components/partyTool/partyGift.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  },
  {
    // 营销任务
    path: '/taskManagement',
    name: 'taskManagement',
    component (resolve) {
      require(["../../components/taskManagement/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'task-list',
        component: resolve => require(["../../components/taskManagement/itemList.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'submitTask',
        name: 'submit-task',
        component: resolve => require(["../../components/taskManagement/submitTask.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'editComment',
        name: 'edit-comment',
        component: resolve => require(["../../components/taskManagement/editComment.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'activityTask',
        name: 'activity-task',
        component: resolve => require(["../../components/taskManagement/activityTask.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'activityDetail',
        name: 'activity-detail',
        component: resolve => require(["../../components/taskManagement/activityDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'editTask',
        name: 'edit-task',
        component: resolve => require(["../../components/taskManagement/editTask.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'editDetail',
        name: 'edit-detail',
        component: resolve => require(["../../components/taskManagement/editDetail.vue"], resolve),
        meta: {
          token:false
        }
      },
      {
        path: 'taskReport',
        name: 'task-report',
        component: resolve => require(["../../components/taskManagement/taskReport.vue"], resolve),
        meta: {
          token:false
        }
      }
    ]
  }
]

export default routers
