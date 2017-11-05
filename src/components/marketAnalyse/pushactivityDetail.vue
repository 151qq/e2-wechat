<template>
    <section class="analyse-detail-box">
        <div class="weui-cells">
            <router-link class="weui-cell weui-cell_access"
                            :to="{}">
                <div class="weui-cell__bd">活动进程</div>
                <div class="weui-cell__ft">第23天</div>
            </router-link>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">新增潜客总计</div>
                <div class="weui-cell__ft">556篇</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">参加人数</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">发放礼品</div>
                <div class="weui-cell__ft">556次</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">发放优惠券</div>
                <div class="weui-cell__ft">556张</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">派发积分</div>
                <div class="weui-cell__ft">556分</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">新派发红包</div>
                <div class="weui-cell__ft">556元</div>
            </div>
            <router-link class="weui-cell weui-cell_access"
                            :to="{}">
                <div class="weui-cell__bd">活动方案</div>
                <div class="weui-cell__ft"></div>
            </router-link>
        </div>

        <div class="wx-bottom-nav">
            <router-link class="wx-nav-item"
                            :to="{}">
                营销研讨
            </router-link>
            <router-link class="wx-nav-item"
                            :to="{}">
                营销红包
            </router-link>
            <router-link class="wx-nav-item"
                            :to="{}">
                营销任务
            </router-link>
        </div>
    </section>
</template>
<script>
export default {
    data () {
        return {
        }
    },
    mounted () {
        // this.getData()
    },
    methods: {
        getData () {
        }
    }
}
</script>
<style lang="scss">
.analyse-detail-box {
    .wx-area-title {
        line-height: 2.4;
        margin-bottom: 0;
        border-color: #333333;
    }

    .weui-cells {
        margin-top: 0;
    }

    .show-message-box {
        .weui-cell__ft {
            color: #000000;
            padding: 0;

            &:after {
                right: -100px;
            }
        }
    }
}
</style>