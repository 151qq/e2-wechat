import Vue from 'vue'
import Vuex from 'vuex'
import contact from './contacts' //存放所有联系人的数据
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"
Vue.use(Vuex)
// 统一管理接口域名

const state = {
  currentLang: "zh", //当前使用的语言 zh：简体中文 en:英文 后期需要
  newMsgCount: 0, //新消息数量
  allContacts: contact.contacts, //所有联系人
  currentPageName: "e2-wechat", //用于在wx-header组件中显示当前页标题
  headerStatus: true, //显示（true）/隐藏（false）wx-header组件
  tipsStatus: false//控制首页右上角菜单的显示(true)/隐藏(false)
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
  }
)
