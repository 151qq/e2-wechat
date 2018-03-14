<template>
    <section class="reserve-box">
        <div class="height-1"></div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">预约标题</label></div>
                <div class="weui-cell__bd">{{base.reserveTitle}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">预约人</label></div>
                <div class="weui-cell__bd">{{base.reserverName}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">预约手机</label></div>
                <div class="weui-cell__bd">{{base.reserverMobile}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">开始时间</label></div>
                <div class="weui-cell__bd">{{base.reserveBeginTime}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">结束时间</label></div>
                <div class="weui-cell__bd">{{base.reserveEndTime}}</div>
            </div>
            <div class="weui-cell weui-cell_access" @click="goToMap">
                <div class="weui-cell__hd"><label class="weui-label">预约地点</label></div>
                <div class="weui-cell__bd">{{base.reserveCity}}</div>
                <div class="weui-cell__ft"></div>
            </div>
        </div>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line">
            <div class="weui-cell weui-cell_access no-center">
                <div class="weui-cell__hd"><label class="weui-label">预约详情</label></div>
                <div class="weui-cell__bd">
                   {{base.reserveDesc}}
                </div>
            </div>       
        </div>

        <template v-if="newReserveImgData.length">
            <div class="wx-area-line"></div>
            <div class="weui-cells no-margin no-line">
                <div class="weui-cell weui-cell_access">
                    <div class="weui-cell__hd"><label class="weui-label">附加图片</label></div>
                    <div class="weui-cell__bd wx-placeholder">
                       选择{{newReserveImgData.length}}张图片
                    </div>
                    <div class="weui-cell__ft"></div>
                </div>
            </div>
            <div class="weui-cells no-margin left-padding">
                <img-list :img-list="newReserveImgData"></img-list>
            </div>
        </template>

        <!-- <div class="weui-cells__title">预约产品</div>
        <div class="weui-cells no-margin">
            <router-link class="weui-media-box weui-media-box_appmsg"
                    v-for="(item, index) in newReservePageData"
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
        <div class="null-box" v-if="!reservePageData.length && isPage">
            暂无内容！
        </div> -->
        <template v-if="base.receptionResult">
            <div class="wx-area-line"></div>
            <div class="weui-cells">
                <div class="weui-cell weui-cell_access show-message-box">
                    <div class="weui-cell__hd"><label class="weui-label">接待开始时间</label></div>
                    <div class="weui-cell__bd">{{base.receptionBeginTime}}</div>
                </div>
                <div class="weui-cell weui-cell_access show-message-box">
                    <div class="weui-cell__hd"><label class="weui-label">接待结束时间</label></div>
                    <div class="weui-cell__bd">{{base.receptionEndTime}}</div>
                </div>
                <div class="weui-cell weui-cell_access show-message-box">
                    <div class="weui-cell__hd"><label class="weui-label">接待结果</label></div>
                    <div class="weui-cell__bd">{{base.receptionResult}}</div>
                </div>
            </div>

            <div class="wx-area-line"></div>
            <div class="weui-cells no-margin no-line">
                <div class="weui-cell weui-cell_access no-center">
                    <div class="weui-cell__hd"><label class="weui-label">接待备忘</label></div>
                    <div class="weui-cell__bd">
                       {{base.receptionMemo}}
                    </div>
                </div>       
            </div>

            <div v-if="reservedImgData.length" class="wx-area-line"></div>
            <div v-if="reservedImgData.length" class="weui-cells no-margin">
                <div class="wx-area-line"></div>
                <div class="weui-cells no-margin no-line">
                    <div class="weui-cell weui-cell_access">
                        <div class="weui-cell__hd"><label class="weui-label">附加图片</label></div>
                        <div class="weui-cell__bd wx-placeholder">
                           选择{{reservedImgData.length}}张图片
                        </div>
                        <div class="weui-cell__ft"></div>
                    </div>
                </div>
                <div class="weui-cells no-margin left-padding">
                    <img-list :img-list="reservedImgData"></img-list>
                </div>
            </div>

            <!-- <div class="weui-cells__title">体验产品</div>
            <div class="weui-cells no-margin">
                <router-link class="weui-media-box weui-media-box_appmsg"
                        v-for="(item, index) in reserveInfoNext"
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
            <div class="null-box" v-if="!receptionPageData.length && isPage">
                暂无内容！
            </div> -->

            <template v-if="couponData.length">
                <div class="wx-area-line"></div>
                <div class="weui-cells no-margin no-line">
                    <div class="weui-cell weui-cell_access">
                        <div class="weui-cell__hd"><label class="weui-label">活动赠品</label></div>
                        <div class="weui-cell__bd wx-placeholder">
                           选择了{{couponData ? couponData.length : 0}}个赠品
                        </div>
                    </div>
                </div>

                <div class="weui-cells no-line left-padding">
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
            </template>

            <template v-if="base.reserveNext">
                <div class="wx-area-line"></div>
                <div class="weui-cells no-margin no-line">
                    <div class="weui-cell weui-cell_access">
                        <div class="weui-cell__hd"><label class="weui-label">新增预约</label></div>
                        <div class="weui-cell__bd wx-placeholder">
                           新增了1个预约
                        </div>
                    </div>
                </div>

                <div class="weui-cells no-line left-padding">
                    <router-link class="weui-media-box weui-media-box_appmsg"
                            slot="content"
                            :to="{
                                    name: 'reserve-detail',
                                    query: {
                                        enterpriseCode: $route.query.enterpriseCode,
                                        agentId: $route.query.agentId,
                                        reserveCode: reserveInfoNext.reserveCode
                                    }
                                }">
                        <div class="weui-media-box__hd">
                            <img class="weui-media-box__thumb" :src="reserveInfoNext.reserveAddr">
                        </div>
                        <div class="weui-media-box__bd">
                            <h4 class="weui-media-box__title">{{reserveInfoNext.reserveTitle}}</h4>
                            <p class="weui-media-box__desc">
                                {{reserveInfoNext.reserveBeginTime.split(' ')[0] + ' - ' + reserveInfoNext.reserveEndTime.split(' ')[0]}}
                            </p>
                        </div>
                    </router-link>
                </div>
            </template>
        </template>
        
        <div class="btn-height-box" v-if="base.reserveStatus != '3'"></div>
        <div class="weui-btn-area" v-if="!base.receptionResult && base.reserveStatus == '2'">
            <router-link class="weui-btn weui-btn_primary"
                         :to="{name: 'reserve-summary', query: {
                            reserveCode: $route.query.reserveCode,
                            enterpriseCode: $route.query.enterpriseCode,
                            agentId: $route.query.agentId
                         }}">
                汇报客户体验结果
            </router-link>
        </div>

        <div class="weui-btn-area" v-if="!base.receptionResult && base.reserveStatus == '1'">
            <a class="weui-btn weui-btn_primary" @click="submitGift">
                分享
            </a>
        </div>
    </section>
</template>
<script>
import imgList from '../common/imgList.vue'
import jsSdk from '../../utils/jsSdk'
import util from '../../utils/tools'

export default {
    data () {
        return {
            isPage: false,
            base: {
                reserveTitle: '',
                reserverName: '',
                reserverMobile: '',
                reserveBeginTime: '',
                reserveEndTime: '',
                reserveAddr: '',
                reserveCity: '',
                reserveReceptionName: '',
                reserveDesc: '',
                receptionBeginTime: '',
                receptionEndTime: '',
                receptionResult: '',
                receptionMemo: '',
                addrBaiduGps: ''
            },
            newReserveImgData: [],
            newReservePageData: [],
            reservedImgData: [],
            reservedPageData: [],
            reserveInfoNext: {

            }
        }
    },
    mounted () {
        jsSdk.init()
        this.getBase()
    },
    watch: {
        $route () {
            jsSdk.init()
            this.getBase()
        }
    },
    methods: {
        submitGift () {
            var link = 'http://site.socialmarketingcloud.com/reserveOnline?enterpriseCode=' + this.$route.query.enterpriseCode + '&agentId=' + this.$route.query.agentId + '&userCode=' + this.userInfo.userCode + '&appid=' + this.userInfo.userWechatAppid + '&userId=' + this.userInfo.userWechatUserid + '&reserveCode=' + this.$route.query.reserveCode

            window.wx.invoke("shareWechatMessage", {
                title: '预约邀请',
                desc: '请点击链接确认邀请！',
                link: link,
                imgUrl: this.userInfo.userWechatLogo
            }, (res) => {
                    if (res.err_msg != "shareWechatMessage:ok") {
                        this.$message.error('请更新企业微信版本！！！')
                    }
            })
        },
        getBase () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                reserveCode: this.$route.query.reserveCode
            }

            util.request({
                method: 'get',
                interface: 'selectAll',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    var data = res.result.result
                    this.base = data.reserveInfo
                    this.reserveInfoNext = data.reserveInfoNext
                    this.newReserveImgData = data.newReserveImgData,
                    this.newReservePageData = data.newReservePageData,
                    this.reservedImgData = data.reservedImgData,
                    this.reservedPageData = data.reservedPageData
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        goToMap () {
            var pathUrl = {
                name: 'search-map',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    point: this.base.addrBaiduGps
                }
            }
            this.$router.push(pathUrl)
        }
    },
    components: {
        imgList
    }
}
</script>