<template>
    <section class="registor-box" v-if="isShowPage">
        <div class="wx-area-img">
            <img :src="coverImg">
        </div>
        <div class="avatar-box">
            <div class="img-box">
                <img :src="memberInfo.userImage">
            </div>
            <div class="name-box">{{memberInfo.userWechatNickname}}</div>
        </div>
        <section class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="memberInfo.userLoginName" placeholder="请输入">
                </div>
            </div>
            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__hd">
                    <label class="weui-label">手机</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="memberInfo.userMobile" type="tel" placeholder="请输入手机号">
                </div>
                <div class="weui-cell__ft">
                    <button class="weui-vcode-btn">获取验证码</button>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" placeholder="请输入">
                </div>
            </div>
        </section>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="saveUserInfo">确认</a>
        </div>
    </section>
</template>
<script>
import tools from '../../utils/tools'

export default {
    data () {
        return {
            isShowPage: false,
            coverImg: '/static/images/bench1.png',
            memberInfo: {
                userImage: '',
                enterpriseCode: '',
                userMobile: '',
                userLoginName: '',
                userWechatUserid: '',
                userWechatImg: '',
                userWechatNickname: '',
                userGender: ''
            }
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
                  window.location.href=data
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

                    if (!data.userCode) {
                        var memberInfo = {
                            userImage: data.avatar,
                            enterpriseCode: this.$route.query.enterpriseCode,
                            userMobile: '',
                            userLoginName: '',
                            userWechatUserid: data.userid,
                            userWechatImg: data.avatar,
                            userWechatNickname: data.name,
                            userGender: data.gender
                        }

                        this.isShowPage = true
                        this.memberInfo = memberInfo
                    } else {
                        window.location.href = this.$route.query.redirectUrl
                    }
                } else {
                    alert(res.result.message)
                }
            })
        },
        saveUserInfo () {
            tools.request({
              method: 'post',
              interface: 'saveUserInfo',
              data: this.memberInfo
            }).then(res => {
              if (res.result.success == '1') {
                window.location.href = this.$route.query.redirectUrl
              } else {
                alert(res.result.message)
              }
            })
        }
    }
}
</script>
<style lang="scss">
.registor-box {
    .avatar-box {
        position: relative;
        z-index: 10;
        height: 60px;
        overflow: hidden;
        margin-top: -40px;

        div {
            float: right;

            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }

        .img-box {
            width: 60px;
            height: 60px;
            border: 1px solid #E5E5E5;
            background: #ffffff;
            margin-right: 15px;
            box-sizing: border-box;
        }

        .name-box {
            font-size: 16px;
            line-height: 40px;
            margin-right: 20px;
            color: #ffffff;
        }
    }
}
</style>