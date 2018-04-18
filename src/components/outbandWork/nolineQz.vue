<template>
    <section class="member-detail-box qz-box" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
        <div class="wx-area-img">
            <img :src="coverImg">

            <div class="tags-box" v-if="memberInfo.memberTags.length">
                <span class="tag-box" v-for="(item, index) in memberInfo.memberTags" :key="index">
                    {{item}}
                </span>
            </div>
        </div>

        <div class="avatar-box">
            <div class="img-box">
                <img :src="memberInfo.memberImage">
            </div>
            <div class="name-box">
                {{memberInfo.memberName}}
            </div>
        </div>

        <div class="weui-cells no-margin">
            <div class="weui-cell weui-cell_access"
                :style="grayType.indexOf(item.interactionType) > -1 ? backgroundStyle : ''"
                v-for="(item, index) in recordList"
                :key="index"
                @click="goToPage(item)">
                <div class="weui-cell__hd">
                    <label class="weui-label">
                        {{item.interactionDate.split(' ')[0]}}
                    </label>
                </div>
                <div class="weui-cell__bd">
                    {{item.interactionDesc}}
                </div>
                <div class="weui-cell__ft" v-if="navType.indexOf(item.interactionType) > -1"></div>
            </div>
        </div>

        <div class="null-box" v-if="recordList && !recordList.length && isPage">
             暂无记录！
        </div>
        
        <template v-if="$route.query.outbandWorkCode && $route.query.outbandStatus == '0'">
            <div class="btn-height-box"></div>
            <div class="weui-btn-area">
                <router-link class="weui-btn weui-btn_primary"
                             :to="{name: 'noline-comment', query: {
                                enterpriseCode: $route.query.enterpriseCode,
                                agentId: $route.query.agentId,
                                memberCode: memberInfo.memberCode,
                                outbandWorkCode: $route.query.outbandWorkCode
                             }}">
                    外呼会报
                </router-link>
            </div>
        </template>
    </section>
</template>
<script>
import util from '../../utils/tools'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            isPage: false,
            coverImg: '',
            memberInfo: {
                memberImage: '',
                memberMobile: '',
                memberWechatNickname: '',
                memberReferCode: '',
                memberCode: '',
                memberTags: []
            },
            recordList: [],
            backgroundStyle: {
                background: '#f1f1f1'
            },
            grayType: [
                'memberPipelineClose',
                'memberPipelineOpen'
            ],
            navType: [
                'memberReadingRate',
                'memberShareWechatZoneRate',
                'memberShareWechatFriendRate',
                'memberCommentRate',
                'memberCouponRate',
                'memberReserveFeedback',
                'memberReserve',
                'memberOutbandFeedback'
            ],
            pageSize: 20,
            pageNumber: 1,
            total: 0
        }
    },
    mounted () {
        this.coverImg = '/static/images/B' + Math.ceil(Math.random() * 13) + '.jpg'
        this.getBase()
        this.getLog()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isLoad () {
            return this.total > this.recordList.length
        }
    },
    methods: {
        showMore (cb) {
            this.pageNumber++
            this.getLog(cb)
        },
        getBase () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                memberCode: this.$route.query.memberCode
            }

            util.request({
                method: 'get',
                interface: 'outBandMemberInfo',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.memberInfo = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getLog (cb) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                memberCode: this.$route.query.memberCode,
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }

            util.request({
                method: 'get',
                interface: 'outBandMemberLogs',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.total = Number(res.result.total)
                this.isPage = true
                if (!cb) {
                    this.recordList = res.result.result
                } else {
                    this.recordList = this.recordList.concat(res.result.result)
                    cb()
                }
            })
        },
        goToPage (item) {
            var pathName = ''
            var queryData = null

            if (['memberReadingRate', 'memberShareWechatZoneRate', 'memberShareWechatFriendRate', 'memberCommentRate'].indexOf(item.interactionType) > -1) {
                pathName = 'article-detail'
                queryData = {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    pageCode: item.interactionPrimeObject,
                    templateCode: item.interactionOtherObject,
                    isFromLog: '1'
                }

                // 文章传播链专用
                if (item.interactionType == 'memberReadingRate' && item.interactionSubObject != 'N') {
                    queryData.spreadCode = item.interactionSubObject
                }

            } else if (['memberCouponRate'].indexOf(item.interactionType) > -1) {
                pathName = 'coupon-detail'
                queryData = {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    couponCode: item.interactionOtherObject,
                    isFromLog: '1'
                }
            } else if (['memberReserveFeedback', 'memberReserve'].indexOf(item.interactionType) > -1) {
                pathName = 'reserve-detail'
                queryData = {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    reserveCode: item.interactionPrimeObject,
                    isFromLog: '1'
                }
            } else if (['memberOutbandFeedback'].indexOf(item.interactionType) > -1) {
                pathName = 'noline-remark'
                queryData = {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    outbandWorkCode: item.interactionPrimeObject,
                    isFromLog: '1'
                }
            }

            if (!pathName) {
                return false
            }

            var pathUrl = {
                name: pathName,
                query: queryData
            }
            this.$router.push(pathUrl)
        }
    }
}
</script>
<style lang="scss">
.qz-box {
    .tags-box {
        position: absolute;
        top: 15px;
        left: 0;
        height: 170px;
        padding: 0 15px;
        overflow: hidden;

        .tag-box {
            display: inline-block;
            padding: 0 8px;
            font-size: 16px;
            color: #ffffff;
            background: #4c84c4;
            border-radius: 3px;
            line-height: 24px;
            margin: 0 10px 10px 0;
        }
    }
}
</style>