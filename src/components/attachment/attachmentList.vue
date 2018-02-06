<template>
    <section class="market-list-box page__bd">
        <div class="weui-cells">
            <router-link class="weui-cell_access weui-media-box weui-media-box_appmsg"
                    v-for="(item, index) in listData"
                    :to="{name: item.pathName + '-attachment', query: {enterpriseCode: $route.query.enterpriseCode, targetType: item.type, redirectUrl: $route.query.redirectUrl}}">
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
import jsSdk from '../../utils/jsSdk'
export default {
    data () {
        return {
            listData: [
                {
                    title: '营销活动方案',
                    pathName: 'activity',
                    type: 'attachmen_type_2',
                    icon: '/static/images/case-icon.png'
                },
                {
                    title: '任务列表',
                    pathName: 'task',
                    type: 'attachmen_type_3',
                    icon: '/static/images/task-icon.png'
                },
                {
                    title: '推广文章',
                    pathName: 'article',
                    type: 'attachmen_type_4',
                    icon: '/static/images/article-icon.png'
                },
                // {
                //     title: '产品中心',
                //     pathName: 'product',
                //     type: 'attachmen_type_5',
                //     icon: '/static/images/product-icon.png'
                // },
                {
                    title: '预约',
                    pathName: 'reserve',
                    type: 'attachmen_type_6',
                    icon: '/static/images/reserve-icon.png'
                },
                {
                    title: '地推活动',
                    pathName: 'party',
                    type: 'attachmen_type_7',
                    icon: '/static/images/spreed-icon.png'
                }
            ]
        }
    },
    mounted () {
        jsSdk.init()
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