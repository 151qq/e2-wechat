<template>
    <section class="case-target">
        <div class="height-1"></div>
        <div class="weui-cells no-margin">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">新增潜客</label></div>
                <div class="weui-cell__bd">{{base.eventLeads}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">新增预约</label></div>
                <div class="weui-cell__bd">{{base.eventHotLeads}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">新增销售</label></div>
                <div class="weui-cell__bd">{{base.eventSalesOpp}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">开始时间</label></div>
                <div class="weui-cell__bd">{{base.eventStartTime}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">结束时间</label></div>
                <div class="weui-cell__bd">{{base.eventEndTime}}</div>
            </div>
        </div>
        
        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line">
            <div class="weui-cell weui-cell_access no-center">
                <div class="weui-cell__hd"><label class="weui-label">详细方案</label></div>
                <div class="weui-cell__bd">
                   {{base.eventPlanDesc}}
                </div>
            </div>       
        </div>

        <template v-for="(group, index) in couponList">
            <div class="wx-area-line"></div>
            <div class="weui-cells no-margin left-padding">
                <div class="left-title">{{group.couponGroutScenarioName}}</div>
                <router-link class="weui-media-box weui-media-box_appmsg"
                        v-for="(item, index) in group.couponInfoList"
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
        
        <template v-if="base.eventStatus == 'cancelled'">
            <div class="wx-area-line"></div>
            <div class="weui-cells no-margin no-line">
                <div class="weui-cell weui-cell_access no-center">
                    <div class="weui-cell__hd"><label class="weui-label">活动终止</label></div>
                    <div class="weui-cell__bd">
                       {{base.eventCancalMemo}}
                    </div>
                </div>       
            </div>
            
            <div class="wx-area-line"></div>
            <div class="weui-cells no-line left-padding">
                <div class="left-title">相关附件</div>
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
            
            <template v-if="base.imgData.length">
                <div class="wx-area-line"></div>
                <div class="weui-cells no-margin">
                    <div class="weui-cell weui-cell_access no-center">
                        <div class="weui-cell__hd"><label class="weui-label">附加图片</label></div>

                        <div class="weui-cell__bd">
                            <img-list :img-list="base.imgData"></img-list>
                        </div>
                    </div>
                </div>
            </template>
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
                    终止营销活动
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
        formDataDate (str) {
            var dateStr = new Date(str)
            var year = dateStr.getFullYear()
            var monthStr = dateStr.getMonth() + 1
            var dayStr = dateStr.getDate()
            var month = monthStr < 10 ? '0' + monthStr : monthStr
            var day = dayStr < 10 ? '0' + dayStr : dayStr
            return year + '-' + month + '-' + day
        },
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
                    res.result.result.eventStartTime = this.formDataDate(res.result.result.eventStartTime)
                    res.result.result.eventEndTime = this.formDataDate(res.result.result.eventEndTime)

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