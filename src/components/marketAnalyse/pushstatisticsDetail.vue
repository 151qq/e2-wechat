<template>
    <section class="analyse-detail-box">
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">新增潜客</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">阅读</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">评论</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">分享</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">领券</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">客户咨询</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">派发积分</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">红包</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <router-link class="weui-cell weui-cell_access"
                            :to="{}">
                <div class="weui-cell__bd">任务详情</div>
                <div class="weui-cell__ft"></div>
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