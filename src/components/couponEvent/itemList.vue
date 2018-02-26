<template>
    <section class="case-article-list-box page__bd">
        <div class="weui-cells" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
            <router-link class="weui-media-box weui-media-box_appmsg show-state-box"
                    v-for="(item, index) in listData"
                    :to="{name: 'case-detail', query: {
                        enterpriseCode: $route.query.enterpriseCode,
                        agentId: $route.query.agentId,
                        eventCode: item.eventCode
                    }}">

                <div v-if="item.eventStatus == 'draft'" class="no-read"></div>
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" :src="item.eventPlanCover">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{item.eventPlanTitle}}</h4>
                    <p class="weui-media-box__desc">{{item.eventPlanDesc}}</p>
                </div>
                <!-- <div class="weui-cell__ft" v-if="item.eventStatus == 'draft'">
                    <span class="no-done">草稿</span>
                </div>
                <div class="weui-cell__ft" v-if="item.eventStatus == 'end'">
                    <span class="has-done">结束</span>
                </div>
                <div class="weui-cell__ft" v-if="item.eventStatus == 'submitted'">
                    <span class="is-doing">发布</span>
                </div>
                <div class="weui-cell__ft" v-if="item.eventStatus == 'cancelled'">
                    <span class="is-waiting">终止</span>
                </div> -->
            </router-link>
        </div>

        <div class="null-page" v-if="!listData.length && isPage">
            暂无内容！
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
        this.getData()
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
        showMore (cb) {
            this.pageNumber++
            this.getData(cb)
        },
        getData (cb) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                pageSize: this.pageSize,
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
<style lang="scss">
.case-article-list-box {
    .weui-cells {
        margin-top: 0;
    }
}
</style>