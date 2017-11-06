<template>
    <section class="case-list-box page__bd">
        <template v-for="(item, index) in listData">
            <div class="weui-cells__title">{{item.year}}</div>
            <div class="weui-cells">
                <div class="weui-media-box weui-media-box_small-appmsg">
                    <div class="weui-cells">
                        <router-link class="weui-cell weui-cell_access"
                                v-for="(categroy, index) in item.datas"
                                :to="{name: 'case-list', query: {id: categroy.id, type: categroy.type}}">
                            <div class="weui-cell__bd weui-cell_primary">{{categroy.title}}</div>
                            <div class="weui-cell__ft"></div>
                        </router-link>
                    </div>
                </div>
            </div>
        </template>
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
                    year: '2017',
                    datas: [
                        {
                            id: 0,
                            title: '微信推广活动方案',
                            type: 'online'
                        },
                        {
                            id: 1,
                            title: '地面推广活动方案',
                            type: 'outline'
                        },
                        {
                            id: 2,
                            title: '外呼广活动方案',
                            type: 'noline'
                        }
                    ]
                },
                {
                    year: '2016',
                    datas: [
                        {
                            id: 3,
                            title: '你瞅啥，你看啥',
                            type: 'outline'
                        },
                        {
                            id: 4,
                            title: '瞅你咋地',
                            type: 'noline'
                        },
                        {
                            id: 5,
                            title: '爱咋咋地',
                            type: 'online'
                        }
                    ]
                }
            ]

            this.listData = listDataTL
        }
    }
}
</script>
<style lang="scss">
.case-list-box {
}
</style>