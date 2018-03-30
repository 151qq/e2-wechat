<template>
    <section class="party-list-box page__bd show-state-box">
        <div class="weui-cells no-margin" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
            <!-- site.socialmarketingcloud.com  localhost:8890-->
            <div  class="weui-media-box weui-media-box_appmsg"
                @click="goToNext(item)"
                v-for="(item, index) in listData">

                <!-- <div v-if="item.partyStatus == '1' && item.partyOwner != userInfo.userCode" class="no-read"></div> -->
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb"
                         :src="item.partyCover">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{item.partyTitle}}</h4>
                    <p class="weui-media-box__desc">
                        {{item.planBeginTime.split(' ')[0] + ' - ' + item.planEndTime.split(' ')[0]}}
                    </p>
                </div>
                <!-- <div class="weui-cell__ft" v-if="item.partyStatus == '3'"><span class="is-doing">执行</span></div>
                <div class="weui-cell__ft" v-if="item.partyStatus == '4'"><span class="has-done">结束</span></div>
                <div class="weui-cell__ft" v-if="item.partyStatus == '5'"><span class="has-done">取消</span></div>
                <div class="weui-cell__ft" v-if="item.partyStatus == '2'"><span class="is-waiting">准备</span></div>
                <div class="weui-cell__ft" v-if="item.partyStatus == '1'"><span class="no-done">草稿</span></div> -->
            </div>
        </div>

        <div class="null-page" v-if="!listData.length && isPage">
            暂无内容！
        </div>

        <div class="btn-height-box"></div>
        <div class="wx-bottom-nav">
            <router-link class="wx-nav-item"
                         v-if="isRoot"
                         :to="{
                            name: 'case-static',
                            query: {
                                enterpriseCode: userInfo.enterpriseCode,
                                agentId: $route.query.agentId
                            }
                        }">
                营销指标
            </router-link>
            <router-link class="wx-nav-item"
                         :to="{
                            name: 'case-list',
                            query: {
                                enterpriseCode: userInfo.enterpriseCode,
                                agentId: $route.query.agentId,
                                formNav: '1'
                            }
                        }">
                促销活动
            </router-link>
            <router-link class="wx-nav-item nav-now"
                         :to="{
                            name: 'party-list',
                            query: {
                                enterpriseCode: userInfo.enterpriseCode,
                                agentId: $route.query.agentId
                            }
                        }">
                地推活动
            </router-link>
            <router-link class="wx-nav-item nav-blue"
                         :to="{
                            name: 'new-party',
                            query: {
                                enterpriseCode: userInfo.enterpriseCode,
                                agentId: $route.query.agentId
                            }
                        }">
                新建活动
            </router-link>
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            isPage: false,
            listData: [],
            pageSize: 20,
            pageNumber: 1,
            total: 0
        }
    },
    mounted () {
        this.getList()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isLoad () {
            return this.total > this.listData.length
        },
        isRoot () {
            var roleCodes = []
            this.userInfo.securityRole.forEach((item) => {
                roleCodes.push(item.roleCode)
            })

            return roleCodes.indexOf('platform_root') > -1 || roleCodes.indexOf('enterprise_root') > -1 || roleCodes.indexOf('coupon_manager') > -1
        }
    },
    methods: {
        ...mapActions([
          'setAttachment',
          'setAttachmentPage',
          'setDetail',
          'setMapInfo'
        ]),
        gotoNewParty () {
            this.setDetail({})
            this.setAttachment({})
            this.setAttachmentPage({})
            this.setMapInfo({})

            var pathUrl = {
                name: 'new-party',
                query: {
                    enterpriseCode: this.userInfo.enterpriseCode,
                    agentId: this.$route.query.agentId
                }
            }

            this.$router.push(pathUrl)
        },
        goToNext (item) {
            var pathName = 'party-detail'

            if (this.userInfo.userCode == item.partyOwner && item.partyStatus == '0') {
                pathName = 'new-party'
            }

            var pathData = {
                name: pathName,
                query: {
                    enterpriseCode: this.userInfo.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    partyCode: item.partyCode
                }
            }

            this.$router.push(pathData)
        },
        showMore (cb) {
            this.pageNumber++
            this.getList(cb)
        },
        setStatus (type) {
            if (this.interface == type) {
                return false
            }
            this.interface = type
            this.getList()
        },
        getList (cb) {
            var formData = {
                enterpriseCode: this.userInfo.enterpriseCode,
                userCode: this.userInfo.userCode,
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }

            util.request({
                method: 'get',
                interface: 'partyInfoList',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.total = Number(res.result.total)
                this.isPage = true
                if (!cb) {
                    this.listData = res.result.result
                } else {
                    this.listData = this.listData.concat(res.result.result)
                }
            })
        }
    }
}
</script>
<style lang="scss">
.party-list-box {
    .weui-media-box__hd {
        overflow: hidden;
    }

    .weui-media-box__thumb {
        width: auto;
        height: 100%;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>