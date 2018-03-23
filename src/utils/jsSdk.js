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
                    debug: false,
                    appId: res.result.result.corpId,
                    timestamp: timestamp,
                    nonceStr: nonceStr,
                    signature: res.result.result.corpJsdkSign,
                    jsApiList: [
                        'onMenuShareAppMessage',
                        'onMenuShareTimeline',
                        'onMenuShareWechat',
                        'shareWechatMessage',
                        'shareAppMessage',
                        'chooseImage',
                        'uploadImage',
                        'previewImage',
                        'showMenuItems',
                        'hideAllNonBaseMenuItem',
                        'openEnterpriseChat'
                    ]
                })
            } else {
              alert(res.result.message)
            }
        })
    },
    // 本地选择图片
    chooseImage (cb) {
        window.wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success (res) {
                if (res.localIds && res.localIds[0]) {
                    window.wx.uploadImage({
                        localId: res.localIds[0],
                        isShowProgressTips: 1,
                        success: function (data) {
                            cb(res.localIds[0], data.serverId)
                        }
                    })
                }
            }
        })
    }
}

export default jsSdk