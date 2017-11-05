<template>
    <section class="analyse-detail-box">
        <section class="weui-cells weui-cells_form">
            <div class="weui-cell weui-cell_select">
                <div class="weui-cell__bd">
                    <select class="weui-select" name="select2">
                        <option value="1" selected>2017-09-08</option>
                        <option value="2">2017-09-09</option>
                        <option value="3">2017-09-10</option>
                    </select>
                </div>
            </div>
        </section>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">会员总数</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">新增会员</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">潜客总数</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">软文新增潜客</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">地推新增潜客</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">会员互动</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">潜客互动</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">阅读</div>
                <div class="weui-cell__ft">556次</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">评论</div>
                <div class="weui-cell__ft">556次</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">分享</div>
                <div class="weui-cell__ft">556次</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">咨询</div>
                <div class="weui-cell__ft">556次</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">领券</div>
                <div class="weui-cell__ft">556张</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">参加地推活动</div>
                <div class="weui-cell__ft">556次</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">外呼次数</div>
                <div class="weui-cell__ft">556次</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">新增预约</div>
                <div class="weui-cell__ft">556次</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">体验良好</div>
                <div class="weui-cell__ft">556次</div>
            </div>
        </div>
        <div class="wx-area-line"></div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">地推获潜客中位数</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">微信推广获潜客客中位数</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">可外呼客户/客户和潜客</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">体验良好客户/客户和潜客</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">获取潜客/分配积分</div>
                <div class="weui-cell__ft">556分</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">外呼机会/分配积分</div>
                <div class="weui-cell__ft">556分</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">体验客户/分配积分</div>
                <div class="weui-cell__ft">556分</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">体验良好客户/分配积分</div>
                <div class="weui-cell__ft">556分</div>
            </div>
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