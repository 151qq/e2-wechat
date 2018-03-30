<template>
    <section class="case-article-list-box page__bd">
        <div class="weui-cells" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
            <router-link class="weui-media-box weui-media-box_appmsg show-state-box"
                    v-for="(item, index) in listData"
                    :to="{name: 'case-detail', query: {
                        enterpriseCode: userInfo.enterpriseCode,
                        agentId: $route.query.agentId,
                        eventCode: item.eventCode
                    }}">

                <!-- <div v-if="item.eventStatus == '1'" class="no-read"></div> -->
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" :src="item.eventPlanCover">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{item.eventPlanTitle}}</h4>
                    <p class="weui-media-box__desc">{{item.eventPlanDesc}}</p>
                </div>
            </router-link>
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
            <router-link class="wx-nav-item nav-now"
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
            <router-link class="wx-nav-item"
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
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            isPage: false,
            listData: [],
            pageNumber: 1,
            pageSize: 20,
            total: 0
        }
    },
    mounted () {
        if (this.isRoot && !this.$route.query.formNav) {
            var pathData = {
                name: 'case-static',
                query: {
                    enterpriseCode: this.userInfo.enterpriseCode,
                    agentId: this.$route.query.agentId
                }
            }

            this.$router.push(pathData)
        } else {
            this.getData()
        }
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
        showMore (cb) {
            this.pageNumber++
            this.getData(cb)
        },
        getData (cb) {
            var formData = {
                enterpriseCode: this.userInfo.enterpriseCode,
                pageSize: this.pageSize,
                userCode: this.userInfo.userCode,
                pageNumber: this.pageNumber
            }

            util.request({
                method: 'post',
                interface: 'eventInfoList',
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
.case-article-list-box {
    .weui-cells {
        margin-top: 0;
    }
}
</style>