import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userStore = new Vuex.Store({
  state: {
    userInfo: {
      "id": 151,
      "userCode": "20180125175421023684",
      "enterpriseCode": "20180125172000480",
      "userWechatUserid": "20180125182918589898",
      "userWechatOpenid": "oFOk40bprwbmfmr_ajRjnT71hD5I",
      "userWechatAppid": "",
      "userWechatNickname": "杨宁",
      "userLoginAccount": "15164369647",
      "userWechatLogo": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTInQXtupVJGRoLCRTQALhGajuCAB5fofhtpjUYLG4LiatyyBfjI6rqHc2icJziaIXhy99fJdlEm3Jjrw/132",
      "userEmail": "",
      "userType": "",
      "userReferee": "",
      "userRegDate": "2018-01-25 00:00:00",
      "userWechatQrcode": "",
      "userStatus": "1",
      "userPosition": "",
      "status": "1",
      "remark": "",
      "userInfo": {
        "id": 151,
        "userCode": "20180125175421023684",
        "userMobile": "",
        "userRegDate": "2018-01-25 00:00:00",
        "userLoginAccount": "15164369647",
        "userPassword": "",
        "userLastPassword": "",
        "userPasswpordUpdatetime": "",
        "userName": "",
        "userWechatLogo": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTInQXtupVJGRoLCRTQALhGajuCAB5fofhtpjUYLG4LiatyyBfjI6rqHc2icJziaIXhy99fJdlEm3Jjrw/132",
        "userWechatNickname": "杨宁",
        "userEmail": "",
        "userQrcode": "",
        "userBirthday": "",
        "userQq": "",
        "userSinaMicroblog": "",
        "userIdentityCard": "",
        "userPassport": "",
        "userNation": "",
        "userNationality": "",
        "userAge": "",
        "userGender": "",
        "userCareer": "",
        "userEdu": "",
        "userIndustry": "",
        "userWorkingUnit": "",
        "userSocialLevel": "",
        "userConsumeLevel": "",
        "userLogisticCity": "",
        "userLogisticAddr": "",
        "userStatus": "1",
        "status": "1",
        "remark": "",
        "loginType": ""
      },
      "securityRole": [{
        "id": 1,
        "roleCode": "platform_root",
        "roleName": "平台超级管理员",
        "roleChoiceOpt": "0",
        "roleCatalog": "0",
        "status": "",
        "remark": "",
        "userInfoList": ""
      }]
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
