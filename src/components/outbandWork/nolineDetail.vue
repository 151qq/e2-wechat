<template>
    <section class="member-detail-box">
        <div class="wx-area-img">
            <img :src="coverImg">
        </div>
        <div class="avatar-box">
            <div class="img-box">
                <img :src="base.memberImage">
            </div>
            <div class="name-box">
                {{base.memberWechatNickname}}
            </div>
        </div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">外呼协助</label></div>
                <div class="weui-cell__bd">{{base.memberReferCode}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">外呼方式</label></div>
                <div class="weui-cell__bd">{{base.outbandRealType}}</div>
            </div>
            <div class="weui-cell weui-cell_access no-center">
                <div class="weui-cell__hd"><label class="weui-label">推荐策略</label></div>
                <div class="weui-cell__bd">
                   {{base.productRecommendRule}}
                </div>
            </div>
            <div class="weui-cell weui-cell_access no-center">
                <div class="weui-cell__hd"><label class="weui-label">导购策略</label></div>
                <div class="weui-cell__bd">
                   {{base.shoppingGuideRule}}
                </div>
            </div>            
        </div>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line">
            <router-link class="weui-cell weui-cell_access"
                        :to="{
                            name: 'noline-qz',
                            query: {
                                enterpriseCode: $route.query.enterpriseCode,
                                agentId: $route.query.agentId,
                                pipelineCode: base.pipelineCode
                            }
                        }">
                <div class="weui-cell__hd"><label class="weui-label">商机来源</label></div>
                <div class="weui-cell__bd"></div>
                <div class="weui-cell__ft"></div>
            </router-link>   
        </div>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line">
                <router-link class="weui-cell weui-cell_access"
                        :to="{
                            name: 'noline-sj',
                            query: {
                                enterpriseCode: $route.query.enterpriseCode,
                                agentId: $route.query.agentId,
                                memberCode: base.memberCode,
                                pipelineCode: base.pipelineCode
                            }
                        }">
                <div class="weui-cell__hd"><label class="weui-label">商机推进</label></div>
                <div class="weui-cell__bd">{{tuiMessage}}</div>
                <div class="weui-cell__ft"></div>
            </router-link>
        </div>
        
        <div class="btn-height-box"></div>
        <div class="wx-bottom-nav" v-if="base.outbandStatus == '0'">
            <a class="wx-nav-item-20" @click="submitGift">
                券
            </a>
            <router-link class="wx-nav-item nav-blue"
                         :to="{name: 'noline-comment', query: {
                            enterpriseCode: $route.query.enterpriseCode,
                            agentId: $route.query.agentId,
                            pipelineCode: this.base.pipelineCode,
                            outbandWorkType: '0',
                            outbandWorkCode: $route.query.outbandWorkCode
                         }}">
                外呼会报
            </router-link>
        </div>

        <div class="weui-btn-area">
            <router-link class="weui-btn weui-btn_primary"
                         :to="{name: 'noline-remark', query: {
                            enterpriseCode: $route.query.enterpriseCode,
                            agentId: $route.query.agentId,
                            outbandWorkCode: $route.query.outbandWorkCode
                         }}">
                外呼会报
            </router-link>
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            coverImg: '',
            base: {
                memberImage: '',
                memberMobile: '',
                memberWechatNickname: '',
                memberReferCode: '',
                outbandRealType: '',
                pipelineCode: ''
            },
            tuiMessage: '',
            recordList: []
        }
    },
    mounted () {
        this.coverImg = '/static/images/B' + Math.ceil(Math.random() * 13) + '.jpg'
        this.getData()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        submitGift () {
            if (!this.base.reserveCode) {
                return false
            }

            var link = 'http://site.socialmarketingcloud.com/groupDetail?enterpriseCode=' + this.$route.query.enterpriseCode + '&agentId=' + this.$route.query.agentId + '&userCode=' + this.userInfo.userCode + '&appid=' + this.userInfo.userWechatAppid + '&userId=' + this.userInfo.userWechatUserid + '&couponGroupType=coupon_scenario_6'

            window.wx.invoke("shareWechatMessage", {
                title: '卡券赠送',
                desc: '请点击链接领取您的卡券！',
                link: link,
                imgUrl: this.userInfo.userWechatLogo
            }, (res) => {
                    if (res.err_msg != "shareWechatMessage:ok") {
                        this.$message.error('请更新企业微信版本！！！')
                    }
            })
        },
        getData () {
            var formData = {
                outbandWorkCode: this.$route.query.outbandWorkCode
            }

            util.request({
                method: 'get',
                interface: 'selectOutBandWork',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.base = res.result.result
                    this.getTui()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getTui () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                pipelineCode: this.base.pipelineCode,
                outbandWorkType: this.base.outbandWorkType
            }

            util.request({
                method: 'get',
                interface: 'tuiSelect',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.tuiMessage = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>