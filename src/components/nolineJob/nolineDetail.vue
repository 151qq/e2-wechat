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
                <div class="weui-cell__bd">外呼协助</div>
                <div class="weui-cell__ft">{{base.memberReferCode}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">外呼方式</div>
                <div class="weui-cell__ft">{{base.outbandRealType}}</div>
            </div>
        </div>
        <div class="weui-cells__title">推荐策略</div>
        <div class="wx-area-text">
            {{base.productRecommendRule}}
        </div>
        <div class="weui-cells__title">导购策略</div>
        <div class="wx-area-text">
            {{base.shoppingGuideRule}}
        </div>

        <div class="weui-cells__title">互动记录</div>
        <div class="wx-area-padding">
            <interactive-record :record-list="recordList"></interactive-record>
        </div>
        
        <div class="btn-height-box"></div>
        <div class="wx-bottom-nav">
            <a class="wx-nav-item-20">
                券
            </a>
            <router-link class="wx-nav-item"
                         :to="{name: 'noline-comment', query: {
                            enterpriseCode: $route.query.enterpriseCode,
                            agentId: $route.query.agentId,
                            outbandWorkCode: $route.query.outbandWorkCode
                         }}">
                外呼会报
            </router-link>
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import interactiveRecord from '../common/interactiveRecord.vue'
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
                outbandRealType: ''
            },
            recordList: []
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
                    this.getLog()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getLog () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                customerCode: this.base.memberCode,
                pageNumber: 1,
                pageSize: 100
            }

            util.request({
                method: 'get',
                interface: 'selectLog',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.recordList = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    },
    components: {
        interactiveRecord
    }
}
</script>