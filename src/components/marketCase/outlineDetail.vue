<template>
    <section class="analyse-detail-box">
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">新增潜客目标</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">营销积分</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <router-link class="weui-cell weui-cell_access"
                            :to="{name: 'activity-target'}">
                <div class="weui-cell__bd">活动目标</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link class="weui-cell weui-cell_access"
                            :to="{}">
                <div class="weui-cell__bd">活动排期</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link class="weui-cell weui-cell_access"
                            :to="{name: 'case-detail'}">
                <div class="weui-cell__bd">详细方案</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link class="weui-cell weui-cell_access"
                            :to="{name: 'case-coupon'}">
                <div class="weui-cell__bd">优惠券</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link class="weui-cell weui-cell_access"
                            :to="{}">
                <div class="weui-cell__bd">礼品</div>
                <div class="weui-cell__ft"></div>
            </router-link>
        </div>

        <div class="wx-bottom-nav">
            <router-link class="wx-nav-item"
                            :to="{name: 'stop-activity'}">
                终止活动
            </router-link>
            <router-link class="wx-nav-item"
                            :to="{}">
                编辑任务
            </router-link>
            <router-link class="wx-nav-item"
                            :to="{}">
                分享推广
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
}
</style>