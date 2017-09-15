import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [

  {
    path: '/service',
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
    name: "营销任务列表",
    components: {
      "default": resolve => require(["../components/task/task.vue"], resolve)
    }

  },
  {
    path: '/form/:type',
    name: "营销任务表单",
    components: {
      "subPage": resolve => require(["../components/task/task-form.vue"], resolve)
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
  },

  {
    path: '/work',
    name: "我的工作",
    component: resolve => require(["../components/work/work.vue"], resolve)
  },
  {
    path: '/work/album',
    components: {
      "default": resolve => require(["../components/work/work.vue"], resolve),
      "subPage": resolve => require(["../components/common/album.vue"], resolve)
    }
  },

  {
    path: '/work/profile/my-qrcode',
    components: {"subPage": resolve => require(["../components/work/my-qrcode.vue"], resolve)}
  }

]
export default new Router({
  base: "/",
  //mode: 'history',
  routes,
   scrollBehavior(to, from, savedPosition) {
       if (savedPosition) {
           return savedPosition
       } else {
           return { x: 0, y: 0 }
       }
   }

})
