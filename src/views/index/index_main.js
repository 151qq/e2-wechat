import Vue from 'vue'
import VueRouter from 'vue-router'
import $ from 'Jquery'
import routes from './router'
import store from '../../vuex/store'
import tools from '../../utils/tools'
import { mapActions } from 'vuex'
import jsCookie from 'js-cookie'
import '../../assets/scss/common.scss'

Vue.use(VueRouter)

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
    var e2Token = jsCookie.get('e2_enterprise_staff')

    next()

    // if (!e2Token && to.name != 'registor') {
    //     var path = '/registor?enterpriseCode=' + to.query.enterpriseCode + '&agentId=' + to.query.agentId + '&redirectUrl=' + window.encodeURIComponent(window.location.href)

    //     window.location.href = path
    // } else {
    //     next()
    // }
})

new Vue({
    el: '#app',
    router,
    store,
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
              if (res.result.success == '1') {

                if (res.result.result) {
                    this.setUserInfo(res.result.result)
                } else {
                    jsCookie.remove('e2_enterprise_staff')
                    var pathData = {
                        name: 'registor',
                        query: {
                            enterpriseCode: jsCookie.get('enterpriseCode'),
                            agentId: jsCookie.get('agentId'),
                            redirectUrl: window.location.href
                        }
                    }
                    this.$router.replace(pathData)
                }
              } else {
                jsCookie.remove('e2_enterprise_staff')
                var pathData = {
                    name: 'registor',
                    query: {
                        enterpriseCode: jsCookie.get('enterpriseCode'),
                        agentId: jsCookie.get('agentId'),
                        redirectUrl: window.location.href
                    }
                }
                this.$router.replace(pathData)
              }
            })
        }
    }
})
