<template>
    <section class="task-list-box page__bd">
        <div class="weui-cells">
            <router-link class="weui-media-box weui-media-box_appmsg show-message-box"
                    v-for="(item, index) in listData"
                    :to="{name: $route.query.type + '-task', query: {id: item.id}}">
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" :src="item.imgUrl">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{item.title}}</h4>
                    <p class="weui-media-box__desc">{{item.des}}</p>
                </div>
                <div class="weui-cell__ft no-done" v-if="item.state == '0'">待办</div>
                <div class="weui-cell__ft has-done" v-if="item.state == '1'">完成</div>
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
            var listDataITL = [
                {
                    id: 0,
                    imgUrl: '/static/images/detail1.png',
                    title: '爱谁谁爱啥啥',
                    date: '2017-09-09 上午 10:23',
                    state: '0'
                },
                {
                    id: 1,
                    imgUrl: '/static/images/detail1.png',
                    title: '不知道不明了',
                    date: '2017-09-09 上午 10:23',
                    state: '0'
                },
                {
                    id: 2,
                    imgUrl: '/static/images/detail1.png',
                    title: '你瞅啥，你看啥',
                    date: '2017-09-09 上午 10:23',
                    state: '1'
                },
                {
                    id: 3,
                    imgUrl: '/static/images/detail1.png',
                    title: '瞅你咋地',
                    date: '2017-09-09 上午 10:23',
                    state: '1'
                }
            ]

            this.listData = listDataITL
            console.log(this.listData)
        }
    }
}
</script>
<style lang="scss">
.task-list-box {
    .weui-cells {
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

        .no-done {
            width: 30px;
            height: 16px;
            padding: 1px 3px;
            background: #9E855D;
            font-size: 12px;
            color: #ffffff;
            border-radius: 8px;
            text-align: center;
        }

        .has-done {
            width: 30px;
            height: 16px;
            padding: 1px 3px;
            background: #999999;
            font-size: 12px;
            color: #ffffff;
            border-radius: 8px;
            text-align: center;
        }
    }
}
</style>