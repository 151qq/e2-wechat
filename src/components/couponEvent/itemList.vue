<template>
    <section class="case-article-list-box page__bd">
        <div class="weui-cells">
            <router-link class="weui-media-box weui-media-box_appmsg show-state-box"
                    v-for="(item, index) in listData"
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
                <div class="weui-cell__ft" v-if="item.eventPlanStatus == 'draft'">
                    <span class="no-done">草稿</span>
                </div>
                <div class="weui-cell__ft" v-if="item.eventPlanStatus == 'end'">
                    <span class="has-done">结束</span>
                </div>
                <div class="weui-cell__ft" v-if="item.eventPlanStatus == 'submitted'">
                    <span class="is-doing">发布</span>
                </div>
                <div class="weui-cell__ft" v-if="item.eventPlanStatus == 'cancelled'">
                    <span class="is-waiting">终止</span>
                </div>
            </router-link>
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'

export default {
    data () {
        return {
            listData: [],
            pageNumber: 1,
            pageSize: 20,
            total: 0
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData (type) {
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
                if (!type) {
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