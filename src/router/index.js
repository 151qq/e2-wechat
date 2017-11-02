import Vue from 'vue'
import Router from 'vue-router'

import actions from '../vuex/actions'
import jsCookie from 'js-cookie'


Vue.use(Router)

const routes = [

  {
    path: '/work',
    name: "我的工作",
    component: resolve => require(["../components/work/work.vue"], resolve),
    meta: {
      token:true
    },
  },

  {
    /**相册**/
    path: '/album',
    components: {
      "subPage": resolve => require(["../components/common/album.vue"], resolve)
    }
  },

  /**二维码**/
  {
    path: '/qrcode',
    components: {"subPage": resolve => require(["../components/work/my-qrcode.vue"], resolve)}
  },

  /**个人信息**/
  {
    path: '/',
    components: {
      "subPage": resolve => require(["../components/common/profile.vue"], resolve) }
  },

  {
    path: '/service`',
    name: "在线导购",
    component: resolve => require(["../components/service/service.vue"], resolve)
  },

  {
    path: '/service/dialogue',
    name: "",
    components: {
      "default": resolve => require(["../components/service/service.vue"], resolve),
      "subPage": resolve => require(["../components/service/dialogue.vue"], resolve)
    }
  },

  {
    path: '/iframe',
    name: "",
    components: {
      "subPage": resolve => require(["../components/common/iframe.vue"], resolve)
    }
  },

  {
    path: '/task',
    name: "任务列表",
    components: {
      "default": resolve => require(["../components/task/task.vue"], resolve)
    }

  },
  {
    path: '/form/:name',
    name: "营销任务表单",
    components: {
      "subPage": resolve => require(["../components/task/form/editor-form.vue"], resolve)
    }

  },

  {
    path: '/stock',
    name: "营销知识库",
    components: {
      "default": resolve => require(["../components/stock/stock.vue"], resolve),
    }
  },

  {
    path: '/excitation',
    name: "群组激励",
    components: {
      "default": resolve => require(["../components/excitation/groupList.vue"], resolve)
    }
  }

]


const  router = new Router({
  base: "/",
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }

})

router.beforeEach((to, from, next) => {
  var code = to.query.code;
  var e2Token = jsCookie.get(e2_enterprise_staff)
  if (code && !e2Token) {
    actions.getTokenByCode(code, (res) => {
      var data = res.result.result;
      jsCookie.set('e2_enterprise_staff', data.e2_enterprise_staff)
      jsCookie.set('token', 'data.token')
      // 清空code
      to.query.code = ''
      next(to)
    })
  } else if (!code && !e2Token) {
    actions.goWechatAuth(window.location.href)
  } else {
    next()
  }
})

export default router
