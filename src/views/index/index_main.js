import Vue from 'vue'
import VueRouter from 'vue-router'
import $ from 'Jquery'
import routes from './router'
import store from '../../vuex/store'
import tools from '../../utils/tools'
import { mapActions } from 'vuex'
import jsCookie from 'js-cookie'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import queryString from 'query-string'
import '../../assets/scss/common.scss'
import jsSdk from '../../utils/jsSdk'
import FastClick from 'fastclick'

FastClick.attach(document.body)

Vue.use(VueRouter)
Vue.use(Element)

window.ISLOAD = true

// 注册全局滚动加载指令
Vue.directive('scroll-load', {
    inserted (el, binding) {
        window.ISLOAD = binding.value.isLoad

        $(window).scroll(function(){  
            var wScrollY = window.scrollY               // 当前滚动条位置
            var wInnerH = window.innerHeight            // 设备窗口的高度
            var bScrollH = document.body.scrollHeight   // 滚动条总高度

            if (wScrollY + wInnerH >= bScrollH && window.ISLOAD && !$(el).children('.more-box').length) {         
                // showMore
                $(el).append('<div class="more-box"><i class="weui-loading"></i></div>')

                binding.value['showMore'](function(){
                    $(el).children('.more-box').remove()
                })
            }    
        })
    },
    update (el, binding) {
        window.ISLOAD = binding.value.isLoad
    }
})

// 实例化VueRouter
const router = new VueRouter({
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
    var e2Token = jsCookie.get('socialmarketing_cloud_user')
    // jsSdk.init()
    // next()

    // 处理jssdk签名,兼容history模式
    if (!store.state.iosUrl) {
      store.commit('setUrl', document.URL)
    }

    if (!e2Token && to.name != 'registor') {
        var path = '/registor?enterpriseCode=' + to.query.enterpriseCode + '&agentId=' + to.query.agentId + '&redirectUrl=' + window.encodeURIComponent(window.location.href)
        window.location.href = path
    } else {
        jsSdk.init()
        next()
    }
})

new Vue({
    el: '#app',
    router,
    store,
    data: {
        isPage: true
    },
    mounted () {
        if (window.location.pathname.indexOf('registor') < 0) {
            // this.getUserInfo()
        }
    },
    methods: {
        ...mapActions([
          'setUserInfo'
        ]),
        getUserInfo () {
            tools.request({
              method: 'get',
              interface: 'userInfoGet',
              data: {}
            }).then(res => {
              if (res.result.success == '1' && res.result.result) {
                this.setUserInfo(res.result.result)
                this.isPage = true
              } else {
                jsCookie.remove('socialmarketing_cloud_user')
                const parsed = queryString.parse(location.search)
                var path = '/registor?enterpriseCode=' + parsed.enterpriseCode + '&agentId=' + parsed.agentId + '&redirectUrl=' + window.encodeURIComponent(window.location.href)
                window.location.href = path
              }
            })
        }
    }
})
