import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userStore = new Vuex.Store({
  state: {
    userInfo: {
      userCode: '15164369647',
      userLoginName: '杨宁'
    },
    detailData: {},
    giftData: [],
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
