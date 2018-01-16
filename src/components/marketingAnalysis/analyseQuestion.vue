<template>
    <section class="party-list-box page__bd"
             v-scroll-load="{showMore:showMore, isLoad: isLoad}">
        
        <div class="height-1"></div>
        <div class="weui-cells__title">总统计信息</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">调研问卷总数</div>
                <div class="weui-cell__ft">{{base.sum}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">调研完成总数</div>
                <div class="weui-cell__ft">{{base.number}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">正向反馈总数</div>
                <div class="weui-cell__ft">{{base.number1}}</div>
            </div>
        </div>

        <div class="weui-cells__title" v-if="listData.length">统计列表</div>
        
        <template v-for="(item, index) in listData">
            <div class="weui-cells no-margin show-state-box">
                <div  class="weui-media-box weui-media-box_appmsg">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb"
                             :src="item.mobileMemberInfo.memberWechatImg">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{item.mobileMemberInfo.memberName}}</h4>
                        <p class="weui-media-box__desc">
                            {{item.surveyRecord.surveyRecordTime.split(' ')[0]}}
                        </p>
                    </div>
                    <div class="weui-cell__ft"
                        v-if="item.surveyRecord.surveyRecoredStatus == '0'"><span class="is-doing">未完成</span></div>
                    <div class="weui-cell__ft"
                        v-if="item.surveyRecord.surveyRecoredStatus == '1' && item.surveyRecord.surveyRecordResult == '1'"><span class="has-done">正向</span></div>
                    <div class="weui-cell__ft"
                        v-if="item.surveyRecord.surveyRecoredStatus == '1' && item.surveyRecord.surveyRecordResult == '0'"><span class="is-waiting">负向</span></div>
                </div>
            </div>
        </template>
    </section>
</template>
<script>
import util from '../../utils/tools'
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            base: {
                sum: '',
                number: '',
                number1: ''
            },
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
        showMore (cb) {
            this.pageNumber++
            this.getList(cb)
        },
        getList (cb) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }

            util.request({
                method: 'get',
                interface: 'surveyAnalyse',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.base = res.result.result.count
                this.total = res.result.result.count.sum
                if (!cb) {
                    this.listData = res.result.result.SurveyRecordAndMemberInfo
                } else {
                    this.listData = this.listData.concat(res.result.result.SurveyRecordAndMemberInfo)
                }
            })
        }
    }
}
</script>