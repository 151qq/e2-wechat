<template>
    <section class="case-list-box page__bd">
        <div class="weui-panel weui-panel_access"
                v-for="(item, index) in listData">
            <div class="year-box weui-panel__hd">{{item.year}}</div>
            <div class="weui-panel__bd">
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
                    year: '2017',
                    datas: [
                        {
                            id: 0,
                            title: '爱谁谁爱啥啥',
                            type: 'online'
                        },
                        {
                            id: 1,
                            title: '不知道不明了',
                            type: 'noline'
                        },
                        {
                            id: 2,
                            title: '没戏了没戏了',
                            type: 'outline'
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
    .year-box {
        line-height: 1.47058824;
        font-size: 17px;
    }

    .weui-panel {
        margin-top: 0;
    }
}
</style>