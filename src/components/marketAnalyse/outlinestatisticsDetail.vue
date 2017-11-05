<template>
    <section class="analyse-detail-box">
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">花花外呼</div>
                <div class="weui-cell__ft">预约556人</div>
            </div>
            <div class="weui-panel weui-panel_access">
                <div class="weui-panel__bd">
                    <router-link class="weui-media-box weui-media-box_appmsg"
                            v-for="(article, index) in listData"
                            :to="{}">
                        <div class="weui-media-box__hd">
                            <img class="weui-media-box__thumb" :src="article.imgUrl">
                        </div>
                        <div class="weui-media-box__bd">
                            <h4 class="weui-media-box__title">{{article.title}}</h4>
                            <p class="weui-media-box__desc">{{article.date}}</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="wx-area-line"></div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">懒懒外呼</div>
                <div class="weui-cell__ft">预约556人</div>
            </div>
            <div class="weui-panel weui-panel_access">
                <div class="weui-panel__bd">
                    <router-link class="weui-media-box weui-media-box_appmsg"
                            v-for="(article, index) in listData"
                            :to="{}">
                        <div class="weui-media-box__hd">
                            <img class="weui-media-box__thumb" :src="article.imgUrl">
                        </div>
                        <div class="weui-media-box__bd">
                            <h4 class="weui-media-box__title">{{article.title}}</h4>
                            <p class="weui-media-box__datec">{{article.des}}</p>
                        </div>
                    </router-link>
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
            var listDataITL = [
                {
                    id: 0,
                    imgUrl: '/static/images/detail1.png',
                    title: '爱谁谁爱啥啥',
                    date: '2017-09-08'
                },
                {
                    id: 1,
                    imgUrl: '/static/images/detail1.png',
                    title: '不知道不明了',
                    date: '2017-09-08'
                },
                {
                    id: 2,
                    imgUrl: '/static/images/detail1.png',
                    title: '你瞅啥，你看啥',
                    date: '2017-09-08'
                },
                {
                    id: 3,
                    imgUrl: '/static/images/detail1.png',
                    title: '瞅你咋地',
                    date: '2017-09-08'
                }
            ]

            this.listData = listDataITL
            console.log(this.listData)
        }
    }
}
</script>
<style lang="scss">
.analyse-detail-box {
    .weui-cells, .weui-panel {
        margin-top: 0;
    }

    .show-message-box {
        .weui-cell__ft {
            color: #000000;
            padding: 0;

            &:after {
                right: -100px;
            }
        }
    }
}
</style>