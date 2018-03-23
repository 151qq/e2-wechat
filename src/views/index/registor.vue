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
                this.$message.error(res.result.message)
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

                    if (data == 'noLimited') {
                        var pathUrl = {
                            name: 'registor-warning',
                            query: {
                                enterpriseCode: data.enterpriseCode,
                                agentId: this.$route.query.agentId
                            }
                        }

                        this.$router.replace(pathUrl)
                    } else if (data) {
                        var pathUrl = {
                            name: 'registor-message',
                            query: {
                                enterpriseCode: data.enterpriseCode,
                                agentId: this.$route.query.agentId,
                                userId: data.userWechatUserid,
                                userCode: data.userCode,
                                appid: data.appId
                            }
                        }

                        this.$router.replace(pathUrl)
                    } else {
                        window.location.href = window.decodeURIComponent(this.$route.query.redirectUrl)
                    }
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>