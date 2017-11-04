<template>
    <section class="market-list-box page__bd">
        <div class="weui-cells">
            <router-link class="weui-cell weui-cell_access"
                    v-for="(item, index) in listData"
                    :to="{name: 'chat-detail', query: {id: item.id}}">
                <div class="weui-cell__bd">{{item.title}}</div>
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
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            var listDataTL = [
                {
                    id: 0,
                    title: '大三元聊天'
                },
                {
                    id: 1,
                    title: '小四喜聊天'
                },
                {
                    id: 2,
                    title: '十三幺聊天'
                },
                {
                    id: 3,
                    title: '清一色聊天'
                },
                {
                    id: 4,
                    title: '七小对聊天'
                }
            ]

            this.listData = listDataTL
        }
    }
}
</script>
<style lang="scss">
.market-list-box {
    .weui-cells {
        margin-top: 0;
    }
}
</style>