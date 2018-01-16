<template>
    <section class="market-list-box page__bd">
        <div class="weui-cells">
            <router-link class="weui-cell_access weui-media-box weui-media-box_appmsg"
                    v-for="(item, index) in listData"
                    :to="{
                            name: 'analyse-' + item.pathName,
                            query: {
                                enterpriseCode: $route.query.enterpriseCode,
                                agentId: $route.query.agentId
                            }
                        }">
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" :src="item.icon">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{item.title}}</h4>
                </div>
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
                    title: '营销指标追踪',
                    pathName: 'norm',
                    icon: '/static/images/norm-analyse.png'
                },
                {
                    title: '营销文章分析',
                    pathName: 'article',
                    icon: '/static/images/article-analyse.png'
                },
                {
                    title: '微信推广分析',
                    pathName: 'wx',
                    icon: '/static/images/wx-analyse.png'
                },
                {
                    title: '地面推广分析',
                    pathName: 'party',
                    icon: '/static/images/party-analyse.png'
                },
                {
                    title: '外呼销售分析',
                    pathName: 'outband',
                    icon: '/static/images/outband-analyse.png'
                },
                {
                    title: '营销券分析',
                    pathName: 'coupon',
                    icon: '/static/images/coupon-analyse.png'
                },
                {
                    title: '调研分析',
                    pathName: 'question',
                    icon: '/static/images/question-analyse.png'
                }
            ]
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