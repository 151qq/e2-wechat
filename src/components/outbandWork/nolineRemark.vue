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
                {{base.memberWechatNickname + '-' + base.memberMobile}}
            </div>
        </div>

        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">外呼结果</label></div>
                <div class="weui-cell__bd">{{base.outbandResult}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">外呼方式</label></div>
                <div class="weui-cell__bd">{{base.outbandRealType}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">外呼时间</label></div>
                <div class="weui-cell__bd">{{base.outbandRealTime.split(' ')[0]}}</div>
            </div>
        </div>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line">
            <div class="weui-cell weui-cell_access no-center">
                <div class="weui-cell__hd"><label class="weui-label">外呼备忘</label></div>
                <div class="weui-cell__bd">
                   {{base.outbandMemo}}
                </div>
            </div>       
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
        
        <template v-if="base.reserveCode">
            <div class="wx-area-line"></div>
            <div class="weui-cells no-line left-padding">
                <div class="left-title">新增预约</div>
                <router-link class="weui-media-box weui-media-box_appmsg"
                        slot="content"
                        :to="{
                                name: 'reserve-detail',
                                query: {
                                    enterpriseCode: $route.query.enterpriseCode,
                                    agentId: $route.query.agentId,
                                    reserveCode: reserveInfo.reserveCode
                                }
                            }">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" :src="reserveInfo.reserveAddr">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{reserveInfo.reserveTitle}}</h4>
                        <p class="weui-media-box__desc">
                            {{reserveInfo.reserveBeginTime.split(' ')[0] + ' - ' + reserveInfo.reserveEndTime.split(' ')[0]}}
                        </p>
                    </div>
                </router-link>
            </div>
        </template>

        <!-- <div class="weui-cells__title">预约产品</div>
        <div class="weui-cells no-margin">
            <router-link class="weui-media-box weui-media-box_appmsg"
                    v-for="(item, index) in base.reservePageData"
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
        <div class="null-box" v-if="!base.reservePageData.length && isPage">
            暂无内容！
        </div> -->
        
        <div class="wx-area-line"></div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">客户性别</div>
                <div class="weui-cell__ft">{{memberTap.memberGender}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">客户年龄</div>
                <div class="weui-cell__ft">{{memberTap.memberAge}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">教育背景</div>
                <div class="weui-cell__ft">{{memberTap.memberEdu}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">消费能力</div>
                <div class="weui-cell__ft">{{memberTap.memberConsumeLevel}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">消费决策</div>
                <div class="weui-cell__ft">{{memberTap.memberConsumeDecision}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">导购特征</div>
                <div class="weui-cell__ft">{{memberTap.memberShopguide}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">客户职业</div>
                <div class="weui-cell__ft">{{memberTap.memberCareer}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">工作单位</div>
                <div class="weui-cell__ft">{{memberTap.memberUnit}}</div>
            </div>
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import imgList from '../common/imgList.vue'
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
                memberCode: '',
                reserveCode: '',
                outbandResult: '',
                outbandRealTime: ''
            },
            memberTap: {
                memberGender: '',
                memberAge: '',
                memberEdu: '',
                memberConsumeLevel: '',
                memberConsumeDecision: '',
                memberShopguide: '',
                memberCareer: '',
                memberUnit: ''
            },
            reserveInfo: {}
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
                    this.reserveInfo = res.result.result.reserveInfo
                    this.getDetails()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getDetails () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                outbandWorkCode: this.$route.query.outbandWorkCode,
                memberCode: this.base.memberCode
            }

            util.request({
                method: 'get',
                interface: 'getDetails',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.memberTap = res.result.result.mobileMemberInfo
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