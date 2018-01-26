<template>
    <section class="registor-box" v-if="isShowPage">
        
    </section>
</template>
<script>
import tools from '../../utils/tools'

export default {
    data () {
        return {
            isShowPage: false
        }
    },
    mounted () {
        var code = this.$route.query.code

        if (!code) {
            this.corpWechatRedirectUrl()
        } else {
            this.getCorpWechatUserInfo()
        }
    },
    methods: {
        corpWechatRedirectUrl () {
            tools.request({
              method: 'post',
              interface: 'corpWechatRedirectUrl',
              data: {
                redirectUri: window.encodeURIComponent(window.location.href),
                enterpriseCode: this.$route.query.enterpriseCode,
                agentId: this.$route.query.agentId
              }
            }).then(res => {
              if (res.result.success == '1') {
                var data = res.result.result

                if(data.startsWith('https')){
                  window.location.href = data
                }
              } else {
                alert(res.result.message)
              }
            })
        },
        getCorpWechatUserInfo () {
            var formData = {
                code: this.$route.query.code,
                enterpriseCode: this.$route.query.enterpriseCode,
                agentId: this.$route.query.agentId
            }

            tools.request({
              method: 'post',
              interface: 'getCorpWechatUserInfo',
              data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    var data = res.result.result

                    if (data) {
                        var path = 'http://site.socialmarketing.com/enterpriseRegistor?enterpriseCode=' + data.enterpriseCode + '&userId=' + data.userWechatUserid + '&redirectUrl=' + window.encodeURIComponent(this.$route.query.redirectUrl) + '&userCode=' + data.userCode

                        var pathUrl = util.formDataUrl(path)
                        this.$router.replace(pathUrl)
                    } else {

                        var pathUrl = util.formDataUrl(window.decodeURIComponent(this.$route.query.redirectUrl))
                        this.$router.replace(pathUrl)
                    }
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>