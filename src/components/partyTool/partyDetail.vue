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
                partyDesc: ''
            },
            couponData: [],
            attachmentData: {
                sourceType: '',
                imgData: [],
                pageData: []
            }
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
        })
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
                    this.couponData = res.result.result.couponGroup

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
        }
    },
    components: {
        imgList,
        attachmentShow
    }
}
</script>