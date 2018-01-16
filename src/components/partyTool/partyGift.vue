<template>
    <section class="party-gift-box">

        <div class="ewm-box">
            <img src="">
        </div>
        <div class="text-box">
            {{userInfo.userLoginName + '-' + userInfo.userInfo.userMobile}}
        </div>
        
        <div class="btn-height-box"></div>

        <div class="btn-gigt-box">
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
        return {}
    },
    mounted () {
        jsSdk.init()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        submitGift () {
            var link = 'http://site.socialmarketingcloud.com/receiveGift?enterpriseCode=' + this.$route.query.enterpriseCode + '&agentId=' + this.$route.query.agentId + '&userCode=' + this.userInfo.userCode

            window.wx.invoke("shareWechatMessage", {
                title: '卡券赠送',
                desc: '请点击链接领取您的卡券！',
                link: link,
                imgUrl: this.userInfo.userImage
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
    .ewm-box {
        width: 400px;
        height: 400px;
        margin: 15px auto;

        img {
            display: block;
            width: 400px;
            height: 400px;
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
}
</style>