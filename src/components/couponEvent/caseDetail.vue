<template>
    <section class="case-target">
        <div class="height-1"></div>
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
        <template v-for="(group, index) in couponList">
            <div class="weui-cells__title">{{group.couponGroupName}}</div>
            <div class="weui-cells"
                 v-for="(item, index) in group.couponInfoList">
                <router-link class="weui-media-box weui-media-box_appmsg"
                        :to="{
                            name: 'coupon-detail',
                            query: {
                                enterpriseCode: $route.query.enterpriseCode,
                                agentId: $route.query.agentId,
                                couponCode: item.couponCode
                            }
                        }">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" :src="item.couponCover">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{item.couponTitle}}</h4>
                        <p class="weui-media-box__desc">{{item.couponDetailTxt}}</p>
                    </div>
                </router-link>
            </div>
        </template>
        <div class="null-box" v-if="!couponList.length && isPage">
            暂无内容！
        </div>
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
        <template v-if="base.eventStatus == 'cancelled'">
            <div class="weui-cells__title">活动终止</div>
            <div class="wx-area-text">{{base.eventCancalMemo}}</div>
            <div class="wx-area-text">
                <img-list :img-list="base.imgData"></img-list>
            </div>
            <div class="weui-cells__title">附件</div>
            <div class="weui-cells no-margin">
                <router-link class="weui-media-box weui-media-box_appmsg"
                        v-for="(item, index) in base.pageData"
                        :to="{name: 'case-detail', query: {
                                enterpriseCode: $route.query.enterpriseCode,
                                agentId: $route.query.agentId,
                                eventCode: item.eventCode
                            }}">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" :src="item.eventPlanCover">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{item.eventPlanTitle}}</h4>
                        <p class="weui-media-box__desc">{{item.eventPlanDesc}}</p>
                    </div>
                </router-link>
            </div>
        </template>
        
        <template v-if="base.eventStatus != 'cancelled' && base.eventStatus != 'end'">
            <div class="btn-height-box"></div>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary"
                    v-if="base.eventStatus == 'draft'"
                    @click="submitCase">
                    发布
                </a>

                <router-link class="weui-btn weui-btn_primary"
                             v-if="base.eventStatus == 'submitted'"
                             :to="{
                                name: 'stop-activity',
                                query: {
                                    eventCode: $route.query.eventCode,
                                    enterpriseCode: $route.query.enterpriseCode,
                                    agentId: $route.query.agentId
                                }
                            }">
                    退回
                </router-link>
            </div>
        </template>
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
                eventPlanDesc: '',
                eventCancalMemo: '',
                imgData: [],
                pageData: []
            },
            couponList: [],
            couponCodeList: [],
            pageNumber: 1,
            pageSize: 20,
            total: 0
        }
    },
    mounted () {
        this.getBase()
        this.getCouponList()
    },
    watch: {
        $route () {
            this.getBase()
            this.getCouponList()
        }
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
                enterpriseCode: this.$route.query.enterpriseCode,
                eventCode: this.$route.query.eventCode,
                pageNumber: 1,
                pageSize: 100
            }

            util.request({
                method: 'get',
                interface: 'couponGroupOfPage',
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
                if (res.result.result.length) {
                    res.result.result.forEach((item) => {
                        if (item.couponInfoList.length) {
                            item.couponInfoList.forEach((coupon) => {
                                atts.push(coupon.couponCode)
                            })
                        }
                    })
                }
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
                interface: 'publishEvent',
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