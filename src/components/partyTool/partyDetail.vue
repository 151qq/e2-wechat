<template>
    <section class="task-detail-box">
        <div class="height-1"></div>
        <div class="weui-cells__title">基本信息</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">活动标题</div>
                <div class="weui-cell__ft">{{base.partyTitle}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">开始时间</div>
                <div class="weui-cell__ft">{{base.planBeginTime}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">结束时间</div>
                <div class="weui-cell__ft">{{base.planEndTime}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">预约地点</div>
                <div class="weui-cell__ft">{{base.addrDetail}}</div>
            </div>
            <div v-if="base.addrLink" class="mapBox">
                <img :src="base.addrLink">
            </div>
        </div>

        <div class="weui-cells__title" v-if="couponData.length">套券选择</div>
        <div class="weui-cells no-line" v-if="couponData.length">
            <a class="weui-media-box weui-media-box_appmsg"
                    v-for="(item, index) in couponData">
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" :src="item.couponGroupCover">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{item.couponGroupName}}</h4>
                    <p class="weui-media-box__desc">
                        {{item.couponGroutScenario}}
                    </p>
                </div>
            </a>
        </div>

        <div class="weui-cells__title">活动说明</div>
        <div class="wx-area-text">{{base.partyDesc}}</div>
        <div class="wx-area-text" v-if="attachmentData.imgData.length">
            <img-list :img-list="attachmentData.imgData"></img-list>
        </div>
        <div class="weui-cells__title">相关附件</div>
        <attachment-show :attachment-data="attachmentData"></attachment-show>

        <template v-if="base.partyStatus == '2'">
            <div class="weui-cells__title">活动总结</div>
            <div class="wx-area-text">{{base.partySummary}}</div>
            <div class="wx-area-text" v-if="partyImgs.length">
                <img-list :img-list="partyImgs"></img-list>
            </div>
        </template>
        

        <div class="btn-height-box" v-if="base.partyStatus != '2'"></div>
        <div class="wx-bottom-nav" v-if="base.partyOwner == userInfo.userCode && base.partyStatus != '2'">
            <router-link class="wx-nav-item"
                        v-if="base.partyStatus != '2'"
                        :to="{
                            name: 'stop-party',
                            query: {
                                enterpriseCode: $route.query.enterpriseCode,
                                agentId: $route.query.agentId,
                                partyCode: $route.query.partyCode,
                                result: 1
                            }
                        }">
                结束活动
            </router-link>
            <router-link class="wx-nav-item"
                        v-if="base.partyStatus == '1'"
                        :to="{
                            name: 'party-gift',
                            query: {
                                enterpriseCode: $route.query.enterpriseCode,
                                agentId: $route.query.agentId,
                                partyCode: $route.query.partyCode
                            }
                        }">
                活动现场
            </router-link>
        </div>

        <div class="wx-bottom-nav" v-if="base.partyOwner != userInfo.userCode && base.partyStatus != '2'">
            <router-link class="wx-nav-item"
                        v-if="base.partyStatus == '1'"
                        :to="{
                            name: 'party-gift',
                            query: {
                                enterpriseCode: $route.query.enterpriseCode,
                                agentId: $route.query.agentId,
                                partyCode: $route.query.partyCode,
                                partyAlbum: base.partyAlbum
                            }
                        }">
                活动现场
            </router-link>
        </div>

    </section>
</template>
<script>
import imgList from '../common/imgList.vue'
import attachmentShow from '../common/attachmentShow.vue'
import util from '../../utils/tools'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            isPage: false,
            base: {
                partyTitle: '',
                planBeginTime: '',
                planEndTime: '',
                addrLink: '',
                addrDetail: '',
                partyDesc: '',
                partySummary: '',
                partyAlbum: ''
            },
            couponData: [],
            attachmentData: {
                sourceType: '',
                imgData: [],
                pageData: []
            },
            partyImgs: []
        }
    },
    mounted () {
        this.getBase()
        this.getAttachments()
    },
    watch: {
        $route () {
            this.getBase()
            this.getAttachments()
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isStart () {
            if (this.base.partyStatus = '0' && this.base.planBeginTime && this.base.planEndTime) {
                var nowDateStr = new Date().getTime()
                var startDateStr = new Date(this.base.planBeginTime).getTime()
                var stopDateStr = new Date(this.base.planEndTime).getTime()

                if (nowDateStr >= startDateStr && nowDateStr <= stopDateStr) {
                    return true
                }
                return false
            }
            return false
        }
    },
    methods: {
        getBase () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                partyCode: this.$route.query.partyCode
            }

            util.request({
                method: 'get',
                interface: 'partyInfoList',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.base = res.result.result.partyInfo
                    if (res.result.result.couponGroup) {
                        this.couponData = res.result.result.couponGroup
                    }

                    this.isPage = true
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getAttachments () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                targetCode: this.$route.query.partyCode,
                targetType: 'party'
            }

            util.request({
                method: 'post',
                interface: 'getAttachments',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.attachmentData = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getPartyImgs () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                targetCode: this.$route.query.partyCode
            }

            util.request({
                method: 'post',
                interface: 'reviewList',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.partyImgs = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    },
    components: {
        imgList,
        attachmentShow
    }
}
</script>