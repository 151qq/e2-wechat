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
            <div class="weui-cells no-margin no-line">
                <div class="weui-cell weui-cell_access">
                    <div class="weui-cell__hd">
                        <label class="weui-label">{{group.couponGroutScenarioName}}</label>
                    </div>
                    <div class="weui-cell__bd wx-placeholder">
                       {{group.couponGroupName}}
                    </div>
                </div>
            </div>
            
            <div class="weui-cells no-margin left-padding big-font">
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
        
        <template v-if="base.eventStatus == '4'">
            <div class="wx-area-line"></div>
            <div class="weui-cells no-margin no-line">
                <div class="weui-cell weui-cell_access no-center">
                    <div class="weui-cell__hd"><label class="weui-label">活动终止</label></div>
                    <div class="weui-cell__bd">
                       {{base.eventCancalMemo}}
                    </div>
                </div>       
            </div>
            
            <template v-if="base.pageData.length">
                <div class="wx-area-line"></div>
                <div class="weui-cells no-margin no-line">
                    <div class="weui-cell weui-cell_access">
                        <div class="weui-cell__hd"><label class="weui-label">相关附件</label></div>
                        <div class="weui-cell__bd wx-placeholder">
                           选择了{{base.pageData ? base.pageData.length : 0}}个附件
                        </div>
                    </div>
                </div>

                <div class="weui-cells no-margin left-padding">
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

            <template v-if="base.imgData.length">
                <div class="wx-area-line"></div>
                <div class="weui-cells no-margin no-line">
                    <div class="weui-cell weui-cell_access">
                        <div class="weui-cell__hd"><label class="weui-label">附加图片</label></div>
                        <div class="weui-cell__bd wx-placeholder">
                           选择{{base.imgData.length}}张图片
                        </div>
                        <div class="weui-cell__ft"></div>
                    </div>
                </div>
                <div class="weui-cells no-margin left-padding">
                    <img-list :img-list="base.imgData"></img-list>
                </div>
            </template>
        </template>

        <div class="weui-toast" v-if="isPage && isLoading">
            <i class="weui-loading weui-icon_toast"></i>
            <p class="weui-toast__content">正在发布</p>
        </div>
        
        <template v-if="base.eventStatus != '4' && base.eventStatus != '5'">
            <div class="btn-height-box"></div>
            <div class="wx-bottom-nav">
                <a class="wx-nav-item-20" @click="goToChat">
                    沟通
                </a>
                <a class="wx-nav-item nav-blue"
                    v-if="base.eventStatus != '3' && isRoot"
                    @click="submitCase">
                    发布
                </a>
                <a class="wx-nav-item nav-blue"
                    v-if="base.eventStatus != '3' && !isRoot"
                    @click="gotoUser">
                    申请
                </a>
                <router-link class="wx-nav-item nav-blue"
                             v-if="base.eventStatus == '3' && isRoot"
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
import { mapGetters, mapActions } from 'vuex'

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
            total: 0,
            isLoading: false
        }
    },
    mounted () {
        this.getBase()
        this.getCouponList()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            userData: 'getUser'
        }),
        isRoot () {
            var roleCodes = []
            this.userInfo.securityRole.forEach((item) => {
                roleCodes.push(item.roleCode)
            })

            return roleCodes.indexOf('platform_root') > -1 || roleCodes.indexOf('enterprise_root') > -1 || roleCodes.indexOf('coupon_manager') > -1
        }
    },
    watch: {
        $route () {
            this.getBase()
            this.getCouponList()
        }
    },
    methods: {
        ...mapActions([
          'setUser'
        ]),
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
                    // res.result.result.eventStartTime = res.result.result.eventStartTime.split(' ')[0]
                    // res.result.result.eventEndTime = res.result.result.eventEndTime.split(' ')[0]

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
        gotoUser () {
            var pathUrl = {
                name: 'user-list',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    eventCode: this.$route.query.eventCode,
                    type: 'unique',
                    roleType: 'coupon_manager',
                    redirectUrl: window.encodeURIComponent(window.location.href)
                }
            }
            this.$router.push(pathUrl)
        },
        submitCase () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                eventCode: this.$route.query.eventCode,
                couponCodes: this.couponCodeList
            }

            this.isLoading = true

            util.request({
                method: 'post',
                interface: 'publishEvent',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.isLoading = false
                    this.$message({
                      showClose: true,
                      message: '恭喜你，发布成功！',
                      type: 'success'
                    })
                    this.getBase()
                } else {
                    this.isLoading = false
                    this.$message.error(res.result.message)
                }
            })
        },
        goToChat () {
            var attData = {
                userList: [],
                userCodes: []
            }

            if (this.base.eventDesigner) {
                attData.userCodes.push(this.base.eventDesigner)
            }

            if (this.base.eventApprover) {
                attData.userCodes = attData.userCodes.concat(this.base.eventApprover.split(','))
            }

            this.setUser(attData)

            var urlPath = 'http://mobile.socialmarketingcloud.com/we-chat'
                urlPath = urlPath + '?enterpriseCode=' + this.$route.query.enterpriseCode + '&agentId=' + this.$route.query.agentId + '&eventCode=' + this.$route.query.eventCode

            var pathUrl = {
                name: 'user-list',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    redirectUrl: window.encodeURIComponent(urlPath)
                }
            }
            this.$router.push(pathUrl)
        }
    },
    components: {
        imgList
    }
}
</script>
<style lang="scss">
.big-font {
    .weui-media-box__title {
        font-size: 17px;
    }
}
</style>