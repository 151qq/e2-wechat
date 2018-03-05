<template>
    <section class="product-list-box page__bd show-state-box">
        <div class="weui-cells no-margin" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
            <!-- site.socialmarketingcloud.com  localhost:8890-->
            <div  class="weui-media-box weui-media-box_appmsg"
                @click="goToNext(item)"
                v-for="(item, index) in listData">

                <div v-if="item.outbandStatus == '0'" class="no-read"></div>
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" :src="item.memberImage">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{item.memberWechatNickname}}</h4>
                    <p class="weui-media-box__desc">{{item.workBeginTime}}</p>
                </div>
            </div>
        </div>

        <div class="null-page" v-if="!listData.length && isPage">
            暂无内容！
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
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
        jsSdk.init()
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
            var pathData = {
                name: 'noline-detail',
                query: {
                    enterpriseCode: this.userInfo.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    outbandWorkCode: item.outbandWorkCode
                }
            }

            this.$router.push(pathData)
        },
        showMore (cb) {
            this.pageNumber++
            this.getList(cb)
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
                interface: 'outBandWorkList',
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
    }
}
</script>