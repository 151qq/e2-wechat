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
        <div class="weui-cells no-margin">
            <router-link class="weui-media-box weui-media-box_appmsg"
                    v-for="(item, index) in base.reservePageData"
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
            </router-link>
        </div>

        <div class="weui-cells__title">外呼汇报</div>
        <div class="wx-area-text">{{base.outbandMemo}}</div>
        <div class="wx-area-text">
            <img-list :img-list="base.imgData"></img-list>
        </div>
        <div class="weui-cells__title">预约产品</div>
        <div class="weui-cells no-margin">
            <router-link class="weui-media-box weui-media-box_appmsg"
                    v-for="(item, index) in base.reservePageData"
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
            </router-link>
        </div>
        <div class="null-box" v-if="!base.reservePageData.length && isPage">
            暂无内容！
        </div>

        <div class="wx-bottom-nav">
            <a class="wx-nav-item-20">
                券
            </a>
            <router-link class="wx-nav-item"
                         v-if="base.outbandStatus == '0'"
                         :to="{name: 'noline-comment', query: {
                            enterpriseCode: $route.query.enterpriseCode,
                            agentId: $route.query.agentId,
                            outbandWorkType: '1',
                            outbandWorkCode: $route.query.outbandWorkCode
                         }}">
                外呼会报
            </router-link>
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import imgList from '../common/imgList.vue'
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
            }
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
                interface: 'selectOutBandWork1',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.base = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    },
    components: {
        imgList
    }
}
</script>