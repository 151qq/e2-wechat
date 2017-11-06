<template>
    <section class="case-list-box page__bd">
        <div class="weui-cells">
            <router-link class="weui-cell weui-cell_access"
                    :to="{name: 'spreedstatistics-list'}">
                <div class="weui-cell__bd weui-cell_primary">微信推广任务统计列表</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link class="weui-cell weui-cell_access"
                    :to="{name: 'spreedactivity-list'}">
                <div class="weui-cell__bd weui-cell_primary">微信推广活动报告列表</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link class="weui-cell weui-cell_access"
                    :to="{name: 'pushstatistics-list'}">
                <div class="weui-cell__bd weui-cell_primary">地推任务统计列表</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link class="weui-cell weui-cell_access"
                    :to="{name: 'pushactivity-list'}">
                <div class="weui-cell__bd weui-cell_primary">地推活动报告列表</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link class="weui-cell weui-cell_access"
                    :to="{name: 'outlinestatistics-list'}">
                <div class="weui-cell__bd weui-cell_primary">外呼任务统计列表</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link class="weui-cell weui-cell_access"
                    :to="{name: 'outlinereport-list'}">
                <div class="weui-cell__bd weui-cell_primary">外呼活动报告列表</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link class="weui-cell weui-cell_access"
                    :to="{name: 'appointmentstatistics-list'}">
                <div class="weui-cell__bd weui-cell_primary">预约接待任务统计列表</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link class="weui-cell weui-cell_access"
                    :to="{name: 'marketmonth-detail'}">
                <div class="weui-cell__bd weui-cell_primary">营销管理月报</div>
                <div class="weui-cell__ft"></div>
            </router-link>
        </div>
    </section>
</template>
<script>
export default {
    data () {
        return {
            listData: []
        }
    },
    methods: {
    }
}
</script>
<style lang="scss">
.case-list-box {
    .weui-cells {
        margin-top: 0;
    }
}
</style>