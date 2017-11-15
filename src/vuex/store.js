import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userStore = new Vuex.Store({
  state: {
    detailData: {}
  },
  getters: {
    getDetail (state) {
      return state.detailData
    }
  },
  mutations: {
    setDetail (state, detailData) {
      state.detailData = detailData
    }
  },
  actions: {
    setDetail ({ commit }, detail) {
      commit('setDetail', detail)
    }
  }
})

export default userStore
