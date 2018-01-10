<template>
    <section class="market-list-box page__bd">
        <div class="weui-cells no-margin">
            <router-link class="weui-cell weui-cell_access"
                    v-for="(item, index) in listData"
                    :to="{name: item.pathName, query: {enterpriseCode: item.enterpriseCode, agentId: item.agentId}}">
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
            listData: [
                {
                    title: '营销活动',
                    pathName: 'case-list',
                    enterpriseCode: '20171225151720001',
                    agentId: '1000007'
                },
                {
                    title: '营销任务',
                    pathName: 'task-list',
                    enterpriseCode: '20171225151720001',
                    agentId: '1000007'
                },
                {
                    title: '产品相册',
                    pathName: 'enterprise-dirs',
                    enterpriseCode: '20171225151720001',
                    agentId: '1000007'
                },
                {
                    title: '媒体中心',
                    pathName: 'enterprise-medias',
                    enterpriseCode: '20171225151720001',
                    agentId: '1000007'
                },
                {
                    title: '外呼工作',
                    pathName: 'noline-list',
                    enterpriseCode: '20171225151720001',
                    agentId: '1000007'
                },
                {
                    title: '在线预约',
                    pathName: 'appointment-list',
                    enterpriseCode: '20171225151720001',
                    agentId: '1000007'
                },
                {
                    title: '推广文章',
                    pathName: 'article-list',
                    enterpriseCode: '20171225151720001',
                    agentId: '1000007'
                },
                {
                    title: '产品中心',
                    pathName: 'product-list',
                    enterpriseCode: '20171225151720001',
                    agentId: '1000007'
                },
                {
                    title: '营销分析',
                    pathName: 'analyse-list',
                    enterpriseCode: '20171225151720001',
                    agentId: '1000007'
                },
                {
                    title: '营销红包',
                    pathName: 'logo-list',
                    enterpriseCode: '20171225151720001',
                    agentId: '1000007'
                }
            ]
        }
    }
}
</script>