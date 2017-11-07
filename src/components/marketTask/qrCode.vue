<template>
    <section class="qr-code-page">
        <div class="ewm-box">
            <img src="">
        </div>
        <div class="weui-cells no-margin">
            <router-link class="weui-media-box weui-media-box_appmsg"
                    :to="{name: 'tiket-list'}">
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" src="/static/images/detail1.png">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">地推活动标题</h4>
                    <p class="weui-media-box__desc">
                        感谢您的参加我们的活动，先领取优惠券，还有机会领取我们精心准备的礼品哦
                    </p>
                </div>
            </router-link>
        </div>
    </section>
</template>
<script>
export default {
    data () {
        return {}
    }
}
</script>
<style lang="scss">
.qr-code-page {
    .ewm-box {
        img {
            display: block;
            width: 200px;
            height: 200px;
            margin: 30px auto 10px;
        }
    }
}
</style>