import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userStore = new Vuex.Store({
  state: {
    userInfo: {},
    detailData: {},
    giftData: [],
    attachmentData: []
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
    }
  }
})

export default userStore
