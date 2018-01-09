<template>
    <section class="case-target">
        <div class="weui-cells__title">活动目标</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">新增潜客</div>
                <div class="weui-cell__ft">{{base.eventLeads}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">新增预约</div>
                <div class="weui-cell__ft">{{base.eventHotLeads}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">新增销售</div>
                <div class="weui-cell__ft">{{base.eventSalesOpp}}</div>
            </div>
        </div>
        <div class="weui-cells__title">详细方案</div>
        <div class="wx-area-text">
            {{base.eventPlanDesc}}
        </div>
        <div class="wx-area-line"></div>
        <div class="weui-cells__title">活动优惠</div>
        <div class="weui-cells" v-if="couponList.length">
            <router-link class="weui-media-box weui-media-box_appmsg"
                    v-for="(item, index) in couponList"
                    :to="{name: 'coupon-detail', query: {couponCode: item.couponCode}}">
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" :src="item.couponIconUrl">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{item.couponTitle}}</h4>
                    <p class="weui-media-box__desc">{{item.couponDescription}}</p>
                </div>
            </router-link>
        </div>
        <div class="null-box" v-if="!couponList.length && isPage">
            暂无内容！
        </div>
        <div class="wx-area-line"></div>
        <div class="weui-cells__title">活动统计</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">线上阅读</div>
                <div class="weui-cell__ft">{{base.eventLeads}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">线上分享</div>
                <div class="weui-cell__ft">{{base.eventHotLeads}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">线下签到</div>
                <div class="weui-cell__ft">{{base.eventSalesOpp}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">线下阅读</div>
                <div class="weui-cell__ft">{{base.eventHotLeads}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">外呼赠券</div>
                <div class="weui-cell__ft">{{base.eventSalesOpp}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">预约赠券</div>
                <div class="weui-cell__ft">{{base.eventSalesOpp}}</div>
            </div>
        </div>
        <template v-if="base.eventPlanStatus == 'closed'">
            <div class="wx-area-line"></div>
            <div class="weui-cells__title">活动终止</div>
            <div class="wx-area-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.
            </div>
            <div class="wx-area-text">
                <img-list :img-list="stopImgs"></img-list>
            </div>
            <div class="weui-cells__title">附件</div>
            <div class="weui-cells no-margin">
                <router-link class="weui-media-box weui-media-box_appmsg"
                        v-for="(item, index) in fileList"
                        :to="{}">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" :src="item.imgUrl">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{item.title}}</h4>
                        <p class="weui-media-box__desc">{{item.des}}</p>
                    </div>
                </router-link>
            </div>
        </template>
        
        <div class="btn-height-box" v-if="base.eventPlanStatus != 'closed'"></div>
        <div class="wx-bottom-nav" v-if="base.eventPlanStatus != 'closed'">
            <a class="wx-nav-item" v-if="base.eventPlanStatus == 'draft'" @click="submitCase">
                发布
            </a>

            <router-link class="wx-nav-item"
                         v-if="base.eventPlanStatus == 'submitted'"
                         :to="{name: 'stop-activity', query: {eventCode: $route.query.eventCode, enterpriseCode: $route.query.enterpriseCode, agentId: $route.query.agentId}}">
                退回
            </router-link>
        </div>
    </section>
</template>
<script>
import imgList from '../common/imgList.vue'
import util from '../../utils/tools'

export default {
    data () {
        return {
            isPage: false,
            base: {
                eventLeads: '',
                eventHotLeads: '',
                eventSalesOpp: '',
                eventPlanDesc: ''
            },
            couponList: [],
            couponCodeList: [],
            pageNumber: 1,
            pageSize: 20,
            total: 0,
            stopImgs: [
                '/static/images/bench1.png',
                '/static/images/bench1.png',
                '/static/images/bench1.png',
                '/static/images/bench1.png',
                '/static/images/bench1.png'
            ],
            fileList: [
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
        }
    },
    mounted () {
        this.getBase()
        this.getCouponList()
    },
    methods: {
        getBase () {
            var formData = {
                eventCode: this.$route.query.eventCode
            }

            util.request({
                method: 'get',
                interface: 'eventInfoGet',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.base = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getCouponList () {
            var formData = {
                eventCode: this.$route.query.eventCode
            }

            util.request({
                method: 'get',
                interface: 'couponInfoList',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.total = res.result.total
                this.isPage = true

                this.couponList = res.result.result
                var atts = []
                res.result.result.forEach((item) => {
                    atts.push(item.couponCode)
                })
                this.couponCodeList = atts
            })
        },
        submitCase () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                eventCode: this.$route.query.eventCode,
                couponCodes: this.couponCodeList
            }

            util.request({
                method: 'post',
                interface: 'publistEvent',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.$message({
                      showClose: true,
                      message: '恭喜你，发布成功！',
                      type: 'success'
                    })
                    this.getBase()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    },
    components: {
        imgList
    }
}
</script>
<style lang="scss">
</style>