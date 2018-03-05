<template>
    <section class="weui-media-box weui-media-box_small-appmsg">
        <div class="weui-cells">
            <router-link class="weui-cell weui-cell_access"
                    replace
                    v-for="(item, index) in listData"
                    :to="{
                            name: item.pathName + '-attachment',
                            query: {
                                enterpriseCode: $route.query.enterpriseCode,
                                targetType: item.type,
                                redirectUrl: $route.query.redirectUrl
                            }
                        }">
                <div class="weui-cell__hd">
                    <img :src="item.icon" class="small-img">
                </div>
                <div class="weui-cell__bd weui-cell_primary">
                    <div class="small-title">{{item.title}}</div>
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