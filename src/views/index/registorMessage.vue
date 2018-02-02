<template>
    <section class="register-list-box page__bd show-state-box">
        <div class="message-box">
            <div class="message-title">您还没有注册成为营销精英，请遵循如下步骤注册</div>
            <div class="message-content">
                1.点击立即注册，选择您自己，分享链接到微信中
            </div>
            <div class="message-content">
                2.在微信中点击分享链接，输入姓名、手机号和您的微信二维码，点击注册
            </div>
            <div class="message-content">
                3.在微信中注册成功后，重新登录您的企业微信
            </div>
        </div>

        <div class="btn-height-box"></div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="goRegister">立即注册</a>
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'

export default {
    data () {
        return {
            enterpriseLogo: ''
        }
    },
    mounted () {
        this.getLogo()
    },
    methods: {
        getLogo () {
            util.request({
              method: 'post',
              interface: 'getEnterpriseLogo',
              data: {
                enterpriseCode: this.$route.query.enterpriseCode
              }
            }).then(res => {
              if (res.result.success == '1') {
                this.enterpriseLogo = res.result.result
              } else {
                this.$message.error(res.result.message)
              }
            })
        },
        goRegister () {
            var path = 'http://site.socialmarketingcloud.com/enterpriseRegistor?enterpriseCode=' + this.$route.query.enterpriseCode + '&userId=' + this.$route.query.userId + '&userCode=' + this.$route.query.userCode + '&appid=' + this.$route.query.appid

            window.wx.invoke("shareWechatMessage", {
                title: '微信企业员工注册邀请',
                desc: '诚邀您成为企业员工',
                link: path,
                imgUrl: this.enterpriseLogo
            }, (res) => {
                    if (res.err_msg != "shareWechatMessage:ok") {
                        this.$message.error('请更新企业微信版本！！！')
                    }
            })
        }
    }
}
</script>
<style lang="scss">
.register-list-box {
    .message-box {
        padding: 15px;
        background: #ffffff;

        .message-title {
            padding-bottom: 10px;
            margin-bottom: 10px;
            font-size: 18px;
            color: #000000;
            line-height: 30px;
            border-bottom: 1px solid #e5e5e5;
        }

        .message-content {
            font-size: 16px;
            color: #999999;
            line-height: 30px;
        }
    }
}
</style>