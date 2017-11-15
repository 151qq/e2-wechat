<template>
    <section class="case-target">
        <div class="weui-cells__title">活动目标</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">新增潜客</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">新增体验</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">新增销售</div>
                <div class="weui-cell__ft">556</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">新增体验</div>
                <div class="weui-cell__ft">556</div>
            </div>
        </div>
        <div class="weui-cells__title">活动产品</div>
        <div class="weui-cells">
            <router-link class="weui-media-box weui-media-box_appmsg"
                    v-for="(item, index) in listData"
                    :to="{name: 'case-detail', query: {id: item.id}}">
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" :src="item.imgUrl">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{item.title}}</h4>
                    <p class="weui-media-box__desc">{{item.des}}</p>
                </div>
            </router-link>
        </div>
        <div class="weui-cells__title">目标客户</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">客户性别</div>
                <div class="weui-cell__ft">男</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">客户年龄</div>
                <div class="weui-cell__ft">青年人</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">客户阶层</div>
                <div class="weui-cell__ft">高层</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">客户职业</div>
                <div class="weui-cell__ft">教师</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">客户消费习惯</div>
                <div class="weui-cell__ft">大手大脚</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">客户群</div>
                <div class="weui-cell__ft">老客户</div>
            </div>
        </div>
        <div class="weui-cells__title">活动排期</div>
        <div class="weui-cells">
            <date-show></date-show>
        </div>
        <div class="weui-cells__title">详细方案</div>
        <div class="wx-area-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.
        </div>
        <div class="weui-cells__title">活动优惠</div>
        <div class="wx-area-text">
            待定
        </div>

        <div class="wx-bottom-nav">
            <router-link class="wx-nav-item"
                            :to="{}">
                {{btnText}}
            </router-link>
        </div>
    </section>
</template>
<script>
import dateShow from '../common/date-show.vue'

export default {
    data () {
        return {
            listData: [
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
                }
            ],
            btnText: ''
        }
    },
    mounted () {
        switch (this.$route.query.state) {
            case '0':
                this.btnText = '申请'
                break
            case '1':
                this.btnText = '审核'
                break
            default:
                this.btnText = '活动统计分析'
                break
        }
    },
    components: {
        dateShow
    }
}
</script>
<style lang="scss">
</style>