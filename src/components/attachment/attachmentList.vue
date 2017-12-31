<template>
    <section class="market-list-box page__bd">
        <div class="weui-cells">
            <router-link class="weui-cell weui-cell_access"
                    v-for="(item, index) in listData"
                    :to="{name: item.pathName + '-attachment', query: {enterpriseCode: $route.query.enterpriseCode}}">
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
                    title: '营销活动方案',
                    pathName: 'activity'
                },
                {
                    title: '任务列表',
                    pathName: 'task'
                },
                {
                    title: '推广文章',
                    pathName: 'article'
                },
                {
                    title: '产品中心',
                    pathName: 'product'
                },
                {
                    title: '宣传材料',
                    pathName: 'publicize'
                },
                {
                    title: '素材图片',
                    pathName: 'image'
                },
                {
                    title: '素材媒体',
                    pathName: 'media'
                },
                {
                    title: '预约',
                    pathName: 'reserve'
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