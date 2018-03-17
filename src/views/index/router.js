const routers = [
  {
    // 首页
    path: '/',
    name: 'home'
  },
  {
    // 注册
    path: '/registor',
    name: 'registor',
    component (resolve) {
      require(["./registor.vue"], resolve)
    },
    meta: {
      title: '营销精英'
    }
  },
  {
    // 注册提示页面
    path: '/registorMessage',
    name: 'registor-message',
    component (resolve) {
      require(["./registorMessage.vue"], resolve)
    },
    meta: {
      title: '营销精英'
    }
  },
  {
    // 地图搜索
    path: '/search-map',
    name: 'search-map',
    component (resolve) {
      require(["../../components/common/search-map.vue"], resolve)
    },
    meta: {
      title: '地图搜索'
    }
  },
  {
    // 选择用户
    path: '/user-list',
    name: 'user-list',
    component (resolve) {
      require(["../../components/common/user-list.vue"], resolve)
    },
    meta: {
      title: '选择同事'
    }
  },
  {
    // 选择用户
    path: '/channel-user',
    name: 'channel-user',
    component (resolve) {
      require(["../../components/common/channel-user.vue"], resolve)
    },
    meta: {
      title: '选择推广会员'
    }
  },
  {
    // 选择用户
    path: '/we-chat',
    name: 'we-chat',
    component (resolve) {
      require(["../../components/common/we-chat.vue"], resolve)
    },
    meta: {
      title: '选择同事'
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
          title: '附件列表'
        }
      },
      {
        path: 'activityAttachment',
        name: 'activity-attachment',
        component: resolve => require(["../../components/attachment/activityAttachment.vue"], resolve),
        meta: {
          title: '选择附件'
        }
      },
      {
        path: 'taskAttachment',
        name: 'task-attachment',
        component: resolve => require(["../../components/attachment/taskAttachment.vue"], resolve),
        meta: {
          title: '选择附件'
        }
      },
      {
        path: 'articleAttachment',
        name: 'article-attachment',
        component: resolve => require(["../../components/attachment/articleAttachment.vue"], resolve),
        meta: {
          title: '选择附件'
        }
      },
      {
        path: 'partyAttachment',
        name: 'party-attachment',
        component: resolve => require(["../../components/attachment/partyAttachment.vue"], resolve),
        meta: {
          title: '选择附件'
        }
      },
      {
        path: 'productAttachment',
        name: 'product-attachment',
        component: resolve => require(["../../components/attachment/productAttachment.vue"], resolve),
        meta: {
          title: '选择附件'
        }
      },
      {
        path: 'couponAttachment',
        name: 'coupon-attachment',
        component: resolve => require(["../../components/attachment/couponAttachment.vue"], resolve),
        meta: {
          title: '选择附件'
        }
      },
      {
        path: 'reserveAttachment',
        name: 'reserve-attachment',
        component: resolve => require(["../../components/attachment/reserveAttachment.vue"], resolve),
        meta: {
          title: '选择附件'
        }
      }
    ]
  },
  // {
  //   // 产品分类
  //   path: '/productCenter',
  //   name: 'productCenter',
  //   component (resolve) {
  //     require(["../../components/productCenter/main.vue"], resolve)
  //   },
  //   children: [
  //     {
  //       path: '',
  //       name: 'product-list',
  //       component: resolve => require(["../../components/productCenter/itemList.vue"], resolve),
  //       meta: {
  //         title: '产品列表'
  //       }
  //     },
  //     {
  //       path: 'productDetail',
  //       name: 'product-detail',
  //       component: resolve => require(["../../components/productCenter/articleDetail.vue"], resolve),
  //       meta: {
  //         title: '产品详情'
  //       }
  //     },
  //     {
  //       path: 'productLog',
  //       name: 'product-log',
  //       component: resolve => require(["../../components/productCenter/articleLog.vue"], resolve),
  //       meta: {
  //         title: '产品评论'
  //       }
  //     },
  //     {
  //       path: 'productSpec',
  //       name: 'product-spec',
  //       component: resolve => require(["../../components/productCenter/productSpec.vue"], resolve),
  //       meta: {
  //         title: '产品规格'
  //       }
  //     },
  //     {
  //       path: 'productSenior',
  //       name: 'product-senior',
  //       component: resolve => require(["../../components/productCenter/productSenior.vue"], resolve),
  //       meta: {
  //         title: '产品场景'
  //       }
  //     },
  //     {
  //       path: 'productimg',
  //       name: 'product-img',
  //       component: resolve => require(["../../components/productCenter/imgList.vue"], resolve),
  //       meta: {
  //         title: '产品相册'
  //       }
  //     }
  //   ]
  // },
  // {
  //   // 企业相册
  //   path: '/enterpriseAlbum',
  //   name: 'enterpriseAlbum',
  //   component (resolve) {
  //     require(["../../components/enterpriseAlbum/main.vue"], resolve)
  //   },
  //   children: [
  //     {
  //       path: '',
  //       name: 'enterprise-dirs',
  //       component: resolve => require(["../../components/enterpriseAlbum/itemList.vue"], resolve),
  //       meta: {
  //         title: '相册目录'
  //       }
  //     },
  //     {
  //       path: 'imgList',
  //       name: 'img-list',
  //       component: resolve => require(["../../components/enterpriseAlbum/imgList.vue"], resolve),
  //       meta: {
  //         title: '图片列表'
  //       }
  //     },
  //     {
  //       path: 'mediaList',
  //       name: 'media-list',
  //       component: resolve => require(["../../components/enterpriseAlbum/mediaList.vue"], resolve),
  //       meta: {
  //         title: '视频列表'
  //       }
  //     }
  //   ]
  // },
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
          title: '外呼工作列表'
        }
      },
      {
        path: 'nolineRemark',
        name: 'noline-remark',
        component: resolve => require(["../../components/outbandWork/nolineRemark.vue"], resolve),
        meta: {
          title: '外呼工作详情'
        }
      },
      {
        path: 'nolineDetail',
        name: 'noline-detail',
        component: resolve => require(["../../components/outbandWork/nolineDetail.vue"], resolve),
        meta: {
          title: '外呼工作详情'
        }
      },
      {
        path: 'nolineQz',
        name: 'noline-qz',
        component: resolve => require(["../../components/outbandWork/nolineQz.vue"], resolve),
        meta: {
          title: '外呼工作记录'
        }
      },
      {
        path: 'nolineSj',
        name: 'noline-sj',
        component: resolve => require(["../../components/outbandWork/nolineSj.vue"], resolve),
        meta: {
          title: '外呼工作记录'
        }
      },
      {
        path: 'nolineComment',
        name: 'noline-comment',
        component: resolve => require(["../../components/outbandWork/nolineComment.vue"], resolve),
        meta: {
          title: '外呼工作总结'
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
          title: '推广文章列表'
        }
      },
      {
        path: 'articleDetail',
        name: 'article-detail',
        component: resolve => require(["../../components/spreadPage/articleDetail.vue"], resolve),
        meta: {
          title: '推广文章详情'
        }
      },
      {
        path: 'resComment',
        name: 'res-comment',
        component: resolve => require(["../../components/spreadPage/resComment.vue"], resolve),
        meta: {
          title: '推广文章评论'
        }
      },
      {
        path: 'oprateMessage',
        name: 'oprate-message',
        component: resolve => require(["../../components/spreadPage/oprateMessage.vue"], resolve),
        meta: {
          title: '操作信息编辑'
        }
      },
      {
        path: 'aboutArticle',
        name: 'about-article',
        component: resolve => require(["../../components/spreadPage/aboutArticle.vue"], resolve),
        meta: {
          title: '推广文章推荐'
        }
      },
      {
        path: 'submitArticle',
        name: 'submit-article',
        component: resolve => require(["../../components/spreadPage/submitArticle.vue"], resolve),
        meta: {
          title: '推广文章发布'
        }
      },
      {
        path: 'articleLog',
        name: 'article-log',
        component: resolve => require(["../../components/spreadPage/articleLog.vue"], resolve),
        meta: {
          title: '推广文章评论'
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
          title: '优惠活动列表'
        }
      },
      {
        path: 'caseDetail',
        name: 'case-detail',
        component: resolve => require(["../../components/couponEvent/caseDetail.vue"], resolve),
        meta: {
          title: '优惠活动详情'
        }
      },
      {
        path: 'couponDetail',
        name: 'coupon-detail',
        component: resolve => require(["../../components/couponEvent/couponDetail.vue"], resolve),
        meta: {
          title: '优惠券详情'
        }
      },
      {
        path: 'stopActivity',
        name: 'stop-activity',
        component: resolve => require(["../../components/couponEvent/stopActivity.vue"], resolve),
        meta: {
          title: '终止优惠活动'
        }
      }
    ]
  },
  // {
  //   // 营销分析
  //   path: '/marketingAnalysis',
  //   name: 'marketingAnalysis',
  //   component (resolve) {
  //     require(["../../components/marketingAnalysis/main.vue"], resolve)
  //   },
  //   children: [
  //     {
  //       path: '',
  //       name: 'analyse-list',
  //       component: resolve => require(["../../components/marketingAnalysis/itemList.vue"], resolve),
  //       meta: {
  //         title:false
  //       }
  //     },
  //     {
  //       path: 'analyseNorm',
  //       name: 'analyse-norm',
  //       component: resolve => require(["../../components/marketingAnalysis/analyseNorm.vue"], resolve),
  //       meta: {
  //         title:false
  //       }
  //     },
  //     {
  //       path: 'analyseCoupon',
  //       name: 'analyse-coupon',
  //       component: resolve => require(["../../components/marketingAnalysis/analyseCoupon.vue"], resolve),
  //       meta: {
  //         title:false
  //       }
  //     },
  //     {
  //       path: 'analyseWx',
  //       name: 'analyse-wx',
  //       component: resolve => require(["../../components/marketingAnalysis/analyseWx.vue"], resolve),
  //       meta: {
  //         title:false
  //       }
  //     },
  //     {
  //       path: 'analyseArticle',
  //       name: 'analyse-article',
  //       component: resolve => require(["../../components/marketingAnalysis/analyseArticle.vue"], resolve),
  //       meta: {
  //         title:false
  //       }
  //     },
  //     {
  //       path: 'analyseOutband',
  //       name: 'analyse-outband',
  //       component: resolve => require(["../../components/marketingAnalysis/analyseOutband.vue"], resolve),
  //       meta: {
  //         title:false
  //       }
  //     },
  //     {
  //       path: 'analyseParty',
  //       name: 'analyse-party',
  //       component: resolve => require(["../../components/marketingAnalysis/analyseParty.vue"], resolve),
  //       meta: {
  //         title:false
  //       }
  //     },
  //     {
  //       path: 'analyseQuestion',
  //       name: 'analyse-question',
  //       component: resolve => require(["../../components/marketingAnalysis/analyseQuestion.vue"], resolve),
  //       meta: {
  //         title:false
  //       }
  //     }
  //   ]
  // },
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
          title: '个人信息'
        }
      },
      {
        path: 'setRole',
        name: 'set-role',
        component: resolve => require(["../../components/myConfig/setRole.vue"], resolve),
        meta: {
          title: '授权列表'
        }
      },
      {
        path: 'submitRole',
        name: 'submit-role',
        component: resolve => require(["../../components/myConfig/submitRole.vue"], resolve),
        meta: {
          title: '角色授权'
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
          title: '会员推广列表'
        }
      },
      {
        path: 'channelDetail',
        name: 'channel-detail',
        component: resolve => require(["../../components/wxPromotion/channelDetail.vue"], resolve),
        meta: {
          title: '会员详情'
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
          title: '在线预约列表'
        }
      },
      {
        path: 'addReserve',
        name: 'add-reserve',
        component: resolve => require(["../../components/reserveOnline/addReserve.vue"], resolve),
        meta: {
          title: '在线预约编辑'
        }
      },
      {
        path: 'reserveSummary',
        name: 'reserve-summary',
        component: resolve => require(["../../components/reserveOnline/reserveSummary.vue"], resolve),
        meta: {
          title: '在线预约汇报'
        }
      },
      {
        path: 'reserveDetail',
        name: 'reserve-detail',
        component: resolve => require(["../../components/reserveOnline/reserveDetail.vue"], resolve),
        meta: {
          title: '在线预约详情'
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
          title: '地推活动列表'
        }
      },
      {
        path: 'partyDetail',
        name: 'party-detail',
        component: resolve => require(["../../components/partyTool/partyDetail.vue"], resolve),
        meta: {
          title: '地推活动详情'
        }
      },
      {
        path: 'newParty',
        name: 'new-party',
        component: resolve => require(["../../components/partyTool/newParty.vue"], resolve),
        meta: {
          title: '编辑地推活动'
        }
      },
      {
        path: 'stopParty',
        name: 'stop-party',
        component: resolve => require(["../../components/partyTool/stopParty.vue"], resolve),
        meta: {
          title: '终止地推活动'
        }
      },
      {
        path: 'partyGift',
        name: 'party-gift',
        component: resolve => require(["../../components/partyTool/partyGift.vue"], resolve),
        meta: {
          title: '地推活动礼品'
        }
      },
      {
        path: 'editLog',
        name: 'edit-log',
        component: resolve => require(["../../components/partyTool/editLog.vue"], resolve),
        meta: {
          title: '编辑记录'
        }
      },
      {
        path: 'giftLog',
        name: 'gift-log',
        component: resolve => require(["../../components/partyTool/giftLog.vue"], resolve),
        meta: {
          title: '地推活动记录'
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
          title: '营销任务列表'
        }
      },
      {
        path: 'submitTask',
        name: 'submit-task',
        component: resolve => require(["../../components/taskManagement/submitTask.vue"], resolve),
        meta: {
          title: '操作信息编辑'
        }
      },
      {
        path: 'editComment',
        name: 'edit-comment',
        component: resolve => require(["../../components/taskManagement/editComment.vue"], resolve),
        meta: {
          title: '营销任务列表'
        }
      },
      {
        path: 'activityTask',
        name: 'activity-task',
        component: resolve => require(["../../components/taskManagement/activityTask.vue"], resolve),
        meta: {
          title: '普通任务'
        }
      },
      {
        path: 'activityDetail',
        name: 'activity-detail',
        component: resolve => require(["../../components/taskManagement/activityDetail.vue"], resolve),
        meta: {
          title: '普通任务详情'
        }
      },
      {
        path: 'editTask',
        name: 'edit-task',
        component: resolve => require(["../../components/taskManagement/editTask.vue"], resolve),
        meta: {
          title: '编辑任务'
        }
      },
      {
        path: 'editDetail',
        name: 'edit-detail',
        component: resolve => require(["../../components/taskManagement/editDetail.vue"], resolve),
        meta: {
          title: '编辑任务详情'
        }
      },
      {
        path: 'taskReport',
        name: 'task-report',
        component: resolve => require(["../../components/taskManagement/taskReport.vue"], resolve),
        meta: {
          title: '任务记录'
        }
      }
    ]
  }
]

export default routers
