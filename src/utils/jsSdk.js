import queryString from 'query-string'
import tools from './tools'
import store from '../vuex/store'

const jsSdk = {
    init () {
        const parsed = queryString.parse(location.search)
        const nonceStr = 'Wm3WZYTPz0wzccnW'
        const timestamp = String(Math.floor(new Date().getTime() / 1000))
        let url = ''

        if (window.__wxjs_is_wkwebview === true) {
            url = store.state.iosUrl.split('#')[0]
        } else {
            url = window.location.href.split('#')[0]
        }

        tools.request({
            method: 'post',
            interface: 'getSignature',
            data: {
                enterpriseCode: parsed.enterpriseCode,
                agentId: parsed.agentId,
                noncestr: nonceStr,
                url: url,
                timestamp: timestamp
            }
        }).then(res => {
            if (res.result.success == '1') {

                window.wx.config({
                    beta: true,
                    debug: true,
                    appId: res.result.result.corpId,
                    timestamp: timestamp,
                    nonceStr: nonceStr,
                    signature: res.result.result.corpJsdkSign,
                    jsApiList: [
                        'onMenuShareAppMessage',
                        'onMenuShareWechat',
                        'shareWechatMessage',
                        'chooseImage',
                        'uploadImage',
                        'previewImage',
                        'showMenuItems',
                        'hideAllNonBaseMenuItem'
                    ]
                })

                window.wx.ready(() => {
                    window.wx.hideAllNonBaseMenuItem()
                })
            } else {
              alert(res.result.message)
            }
        })
    },
    // 本地选择图片
    chooseImage (num, cb) {
        window.wx.chooseImage({
            count: num,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success (res) {
                cb(res.localIds)
            }
        })
    },
    //  多上上传微信服务器
    uploadImgs (datas, cb) {
        var serverIdList = []
        var localIds = datas.concat([])
        
        jsSdk.uploadImg(localIds, serverIdList, cb)
    },
    uploadImg (localIds, serverIdList, cb) {

        if (!localIds.length) {
            cb(serverIdList)
            return false
        }

        var localId = localIds.splice(0, 1)[0]

        alert(localId + 'localId')
        
        window.wx.uploadImage({
            localId: localId,
            isShowProgressTips: 1,
            success: function (res) {
                serverIdList.push(res.serverId)

                jsSdk.uploadImg(localIds, serverIdList, cb)
            }
        })
    }
}

export default jsSdk