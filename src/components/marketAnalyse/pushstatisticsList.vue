<template>
    <section class="case-article-list-box page__bd">
        <div class="weui-panel weui-panel_access">
            <div class="weui-panel__bd">
                <router-link class="weui-media-box weui-media-box_appmsg"
                        v-for="(item, index) in listData"
                        :to="{name: 'pushstatistics-detail', query: {id: item.id}}">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" :src="item.imgUrl">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{item.title}}</h4>
                        <p class="weui-media-box__desc">{{item.des}}</p>
                    </div>
                </router-link>
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
            var listDataITL = [
                {
                    id: 0,
                    imgUrl: '/static/images/detail1.png',
                    title: '爱谁谁爱啥啥',
                    des: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
                },
                {
                    id: 1,
                    imgUrl: '/static/images/detail1.png',
                    title: '不知道不明了',
                    des: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
                },
                {
                    id: 2,
                    imgUrl: '/static/images/detail1.png',
                    title: '你瞅啥，你看啥',
                    des: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
                },
                {
                    id: 3,
                    imgUrl: '/static/images/detail1.png',
                    title: '瞅你咋地',
                    des: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
                }
            ]

            this.listData = listDataITL
            console.log(this.listData)
        }
    }
}
</script>
<style lang="scss">
.case-article-list-box {
    .year-box {
        line-height: 1;
        font-size: 17px;
    }

    .weui-panel {
        margin-top: 0;
    }
}
</style>