<template>
    <section class="party-gift-box">
        <template v-if="isPage">
            <div class="ewm-box" v-if="base.userQrcode">
                <img :src="base.userQrcode">
            </div>

            <div class="null-page" v-else>
                请上传您的微信二维码！
            </div>
            
            <div class="weui-btn-area bottom-2">
                <a class="weui-btn weui-btn_primary" @click="submitLog">活动现场直播</a>
            </div>

            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" @click="submitGift">赠送礼品</a>
            </div>
        </template>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'

import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            isPage: false,
            base: {
                userQrcode: '',
                userMobile: '',
                userName: ''
            }
        }
    },
    mounted () {
        jsSdk.init()
        this.getBase()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        getBase () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                partyCode: this.$route.query.partyCode,
                userCode: this.userInfo.userCode
            }

            util.request({
                method: 'get',
                interface: 'partyLocal',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.isPage = true
                    this.base = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        submitLog () {
            var pathUrl = {
                name: 'gift-log',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    partyCode: this.$route.query.partyCode,
                    partyAlbum: this.$route.query.partyAlbum
                }
            }

            this.$router.push(pathUrl)
        },
        submitGift () {
            var status = this.$route.query.partyStatus

            if (status == '1' || status == '2') {
                this.$message({
                    message: '活动未启动！',
                    type: 'success'
                })
                return false
            }

            if (status == '4') {
                this.$message({
                    message: '活动已结束！',
                    type: 'success'
                })
                return false
            }

            if (status == '5') {
                this.$message({
                    message: '活动已取消！',
                    type: 'success'
                })
                return false
            }

            var link = 'http://site.socialmarketingcloud.com/receiveGift?enterpriseCode=' + this.$route.query.enterpriseCode + '&agentId=' + this.$route.query.agentId + '&userCode=' + this.userInfo.userCode + '&appid=' + this.userInfo.userWechatAppid + '&userId=' + this.userInfo.userWechatUserid + '&partyCode=' + this.$route.query.partyCode

            window.wx.invoke("shareWechatMessage", {
                title: '卡券赠送',
                desc: '请点击链接领取您的卡券！',
                link: link,
                imgUrl: this.userInfo.userWechatLogo
            }, (res) => {
                    // if (res.err_msg != "shareWechatMessage:ok") {
                    //     this.$message.error('请更新企业微信版本！！！')
                    // }
            })
        }
    }
}
</script>
<style lang="scss">
.party-gift-box {
    background: #ffffff;
    padding-bottom: 90px;

    .ewm-box {
        padding: 15px;

        img {
            display: block;
            width: 100%;
        }
    }

    .text-box {
        line-height: 2;
        font-size: 16px;
        text-align: center;
    }
}
</style>