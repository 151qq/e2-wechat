import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userStore = new Vuex.Store({
  state: {
    userInfo: {
      userCode: '15164369647',
      userWechatUserid: 'YangNing',
      userImage: 'http://p.qlogo.cn/bizmail/vrch5KVpXx5Y1ZEV06hTsd8des35JhGGKo96NS0921LLicaFRRBCpUw/0',
      userLoginName: '杨宁',
      userInfo: {
        userMobile: '15164369647'
      },
      securityUserRoles: [
        {
          roleCode: 'product_admin',
          roleDesc: '产品发布'
        },
        {
          roleCode: 'enterprise_member_admin',
          roleDesc: '会员管理'
        }
      ]
    },
    detailData: {},
    giftData: [],
    attachmentPage: {},
    attachmentData: {},
    mapData: {},
    userData: {},
    iosUrl: ''
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    },
    getDetail (state) {
      return state.detailData
    },
    getGift (state) {
      return state.giftData
    },
    getAttachment (state) {
      return state.attachmentData
    },
    getAttachmentPage (state) {
      return state.attachmentPage
    },
    getMapInfo (state) {
      return state.mapData
    },
    getUser (state) {
      return state.userData
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setDetail (state, detailData) {
      state.detailData = detailData
    },
    setGift (state, giftData) {
      state.giftData = giftData
    },
    setAttachment (state, attachmentData) {
      state.attachmentData = attachmentData
    },
    setAttachmentPage (state, attachmentPage) {
      state.attachmentPage = attachmentPage
    },
    setUser (state, userData) {
      state.userData = userData
    },
    setMapInfo (state, mapData) {
      state.mapData = mapData
    },
    setUrl (state, url) {
      state.iosUrl = url
    }
  },
  actions: {
    setUserInfo ({ commit }, userInfo) {
      commit('setUserInfo', userInfo)
    },
    setDetail ({ commit }, detail) {
      commit('setDetail', detail)
    },
    setGift ({ commit }, gift) {
      commit('setGift', gift)
    },
    setAttachment ({ commit }, attachment) {
      commit('setAttachment', attachment)
    },
    setAttachmentPage ({ commit }, attachmentPage) {
      commit('setAttachmentPage', attachmentPage)
    },
    setUser ({ commit }, userData) {
      commit('setUser', userData)
    },
    setMapInfo ({ commit }, mapData) {
      commit('setMapInfo', mapData)
    },
    setUrl ({ commit }, url) {
      commit('setUrl', url)
    }
  }
})

export default userStore
