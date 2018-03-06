<template>
    <section class="party-gift-box">

        <div class="ewm-box">
            <img :src="userInfo.userInfo.userQrcode">
        </div>
        <div class="text-box">
            {{userInfo.userWechatNickname + '-' + userInfo.userLoginAccount}}
        </div>

        <div class="btn-gigt-box">
            <a class="weui-btn weui-btn_primary" @click="submitLog">活动现场直播</a>
        </div>

        <div class="btn-gist-box" v-if="$route.query.partyStatus == '3'">
            <a class="weui-btn weui-btn_primary" @click="submitGift">赠送礼品</a>
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'

import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            base: {}
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
            var link = 'http://site.socialmarketingcloud.com/receiveGift?enterpriseCode=' + this.$route.query.enterpriseCode + '&agentId=' + this.$route.query.agentId + '&userCode=' + this.userInfo.userCode + '&appid=' + this.userInfo.userWechatAppid + '&userId=' + this.userInfo.userWechatUserid + '&partyCode=' + this.$route.query.partyCode

            window.wx.invoke("shareWechatMessage", {
                title: '卡券赠送',
                desc: '请点击链接领取您的卡券！',
                link: link,
                imgUrl: this.userInfo.userWechatLogo
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
.party-gift-box {
    background: #ffffff;

    .ewm-box {
        width: 260px;
        height: 260px;
        margin: 15px auto;
        border: 1px solid #f5f5f5;
        border-radius: 3px;

        img {
            display: block;
            width: 260px;
            height: 260px;
        }
    }

    .text-box {
        line-height: 2;
        font-size: 16px;
        text-align: center;
    }

    .btn-gigt-box {
        margin: 30px 15px 10px;
    }

    .btn-gist-box {
        margin: 10px 15px 0;
    }
}
</style>