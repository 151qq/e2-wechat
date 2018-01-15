<template>
    <section class="party-list-box page__bd show-state-box">
        <div class="weui-cells no-margin" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
            <!-- site.socialmarketingcloud.com  localhost:8890-->
            <div  class="weui-media-box weui-media-box_appmsg"
                @click="goToNext(item)"
                v-for="(item, index) in listData">
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb"
                         :src="item.addrLink">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{item.partyTitle}}</h4>
                    <p class="weui-media-box__desc">
                        {{item.planBeginTime.split(' ')[0] + ' - ' + item.planEndTime.split(' ')[0]}}
                    </p>
                </div>
            </div>
        </div>

        <div class="null-page" v-if="!listData.length && isPage">
            暂无内容！
        </div>

        <div class="btn-height-box"></div>
        <div class="weui-btn-area">
            <router-link class="weui-btn weui-btn_primary"
                            :to="{
                                name: 'new-party',
                                query: {
                                    enterpriseCode: $route.query.enterpriseCode,
                                    agentId: $route.query.agentId
                                }
                            }">
                发起新的地面推广活动
            </router-link>
        </div>

        <sheet :is-show-sheet="isShowSheet" :item-list="sheetList" :cb="creatTask"></sheet>
    </section>
</template>
<script>
import util from '../../utils/tools'
import sheet from '../common/sheet.vue'
import { mapGetters } from 'vuex'

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
    watch: {
        $route () {
            this.pageNumber = 1
            this.isPage = false
            this.getList()
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isLoad () {
            return this.total > this.listData.length
        }
    },
    methods: {
        goToNext (item) {
            var pathName = 'party-detail'

            var pathData = {
                name: pathName,
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
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
                enterpriseCode: this.$route.query.enterpriseCode,
                partyOwner: this.userInfo.userCode,
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

                this.total = res.result.total
                this.isPage = true
                if (!cb) {
                    this.listData = res.result.result
                } else {
                    this.listData = this.listData.concat(res.result.result)
                }
            })
        }
    },
    components: {
        sheet
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