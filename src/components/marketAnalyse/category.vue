<template>
    <section class="case-list-box page__bd">
        <div class="weui-panel weui-panel_access">
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_small-appmsg">
                    <div class="weui-cells">
                        <router-link class="weui-cell weui-cell_access"
                                v-for="(categroy, index) in listData"
                                :to="{name: 'analyse-list', query: {id: categroy.id, type: categroy.type}}">
                            <div class="weui-cell__bd weui-cell_primary">{{categroy.title}}</div>
                            <div class="weui-cell__ft"></div>
                        </router-link>
                    </div>
                </div>
            </div>
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
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            var listDataTL = [
                {
                    id: 0,
                    title: '营销管理月报',
                    type: 'magagemonth'
                },
                {
                    id: 1,
                    title: '营销活动日报',
                    type: 'activityday'
                },
                {
                    id: 2,
                    title: '地推活动报告',
                    type: 'activityspreed'
                },
                {
                    id: 3,
                    title: '外呼营销活动报告',
                    type: 'activitynoline'
                },
                {
                    id: 4,
                    title: '销售外呼日报',
                    type: 'nolineday'
                },
                {
                    id: 5,
                    title: '推广周报',
                    type: 'spreedweek'
                },
                {
                    id: 6,
                    title: '编辑月报',
                    type: 'editmonth'
                },
                {
                    id: 7,
                    title: '地推活动自动总结',
                    type: 'spreedsummary'
                }
            ]

            this.listData = listDataTL
        }
    }
}
</script>
<style lang="scss">
.case-list-box {
    .year-box {
        line-height: 1.47058824;
        font-size: 17px;
    }

    .weui-panel {
        margin-top: 0;
    }
}
</style>