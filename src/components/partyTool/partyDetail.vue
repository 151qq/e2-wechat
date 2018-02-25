<template>
    <section class="task-detail-box">
        <div class="height-1"></div>
        <div v-if="base.addrLink" class="mapBox">
            <img :src="base.addrLink">
        </div>
        <div class="weui-cells no-margin">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">预约地点</label></div>
                <div class="weui-cell__bd">{{base.addrDetail}}</div>
            </div>
        </div>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">活动标题</label></div>
                <div class="weui-cell__bd">{{base.partyTitle}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">开始时间</label></div>
                <div class="weui-cell__bd">{{base.planBeginTime}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">结束时间</label></div>
                <div class="weui-cell__bd">{{base.planEndTime}}</div>
            </div>
        </div>

        <template v-if="couponData.length">
            <div class="wx-area-line"></div>
            <div class="weui-cells no-line left-padding">
                <div class="left-title">活动赠品</div>
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

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line">
            <div class="weui-cell weui-cell_access no-center">
                <div class="weui-cell__hd"><label class="weui-label">活动说明</label></div>
                <div class="weui-cell__bd">
                   {{base.partyDesc}}
                </div>
            </div>       
        </div>
        
        <div class="wx-area-line"></div>
        <attachment-show :attachment-data="attachmentData"></attachment-show>
        
        <template v-if="attachmentData.imgData.length">
            <div class="wx-area-line"></div>
            <div class="weui-cells no-margin">
                <div class="weui-cell weui-cell_access no-center">
                    <div class="weui-cell__hd"><label class="weui-label">附加图片</label></div>

                    <div class="weui-cell__bd">
                        <img-list :img-list="attachmentData.imgData"></img-list>
                    </div>
                </div>
            </div>
        </template>

        <template v-if="base.partyStatus == '4'">
            <div class="wx-area-line"></div>
            <div class="weui-cells no-margin no-line">
                <div class="weui-cell weui-cell_access no-center">
                    <div class="weui-cell__hd"><label class="weui-label">活动总结</label></div>
                    <div class="weui-cell__bd">
                       {{base.partySummary}}
                    </div>
                </div>       
            </div>
            
            <div class="wx-area-line"></div>
            <attachment-show :attachment-data="attachmentData"></attachment-show>
            
            <div v-if="partyImgs.length" class="wx-area-line"></div>
            <div v-if="partyImgs.length" class="weui-cells no-margin">
                <div class="weui-cell weui-cell_access no-center">
                    <div class="weui-cell__hd"><label class="weui-label">附加图片</label></div>

                    <div class="weui-cell__bd">
                        <img-list :img-list="partyImgs"></img-list>
                    </div>
                </div>
            </div>
        </template>
        

        <div class="btn-height-box" v-if="base.partyStatus != '4' && base.partyStatus != '5'"></div>
        <template v-if="base.partyOwner == userInfo.userCode && base.partyStatus != '4' && base.partyStatus != '5'">
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary"
                    @click="showSheet">
                    管理推广活动
                </a>
            </div>
        </template>
        <template v-if="base.partyOwner != userInfo.userCode && base.partyStatus != '4' && base.partyStatus != '5'">
            <div class="weui-btn-area">
                <router-link class="weui-btn weui-btn_primary"
                            :to="{
                                name: 'party-gift',
                                query: {
                                    enterpriseCode: $route.query.enterpriseCode,
                                    agentId: $route.query.agentId,
                                    partyCode: $route.query.partyCode
                                }
                            }">
                    进入活动现场
                </router-link>
            </div>
        </template>

        <sheet :is-show-sheet="isShowSheet" :item-list="sheetList" :cb="publistOpt"></sheet>
    </section>
</template>
<script>
import imgList from '../common/imgList.vue'
import attachmentShow from '../common/attachmentShow.vue'
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import sheet from '../common/sheet.vue'
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
                partyDesc: '',
                partySummary: '',
                partyAlbum: ''
            },
            couponData: [],
            attachmentData: {
                sourceType: '',
                imgData: [],
                pageData: []
            },
            partyImgs: [],
            isShowSheet: {
                value: false
            },
            sheetList: []
        }
    },
    mounted () {
        jsSdk.init()
        this.getBase()
        this.getAttachments()
    },
    watch: {
        $route () {
            jsSdk.init()
            this.getBase()
            this.getAttachments()
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isStart () {
            if (this.base.partyStatus = '0' && this.base.planBeginTime && this.base.planEndTime) {
                var nowDateStr = new Date().getTime()
                var startDateStr = new Date(this.base.planBeginTime).getTime()
                var stopDateStr = new Date(this.base.planEndTime).getTime()

                if (nowDateStr >= startDateStr && nowDateStr <= stopDateStr) {
                    return true
                }
                return false
            }
            return false
        }
    },
    methods: {
        showSheet () {
            this.isShowSheet.value = true
        },
        publistOpt (item) {
            if (item.pathName == 'close') {
                var pathUrl = {
                        name: 'stop-party',
                        query: {
                            enterpriseCode: this.$route.query.enterpriseCode,
                            agentId: this.$route.query.agentId,
                            partyCode: this.$route.query.partyCode,
                            partyAlbum: this.base.partyAlbum,
                            partyResult: '1',
                            partyStatus: '4'
                        }
                    }

                this.$router.push(pathUrl)
            } else if (item.pathName == 'end') {
                var pathUrl = {
                        name: 'stop-party',
                        query: {
                            enterpriseCode: this.$route.query.enterpriseCode,
                            agentId: this.$route.query.agentId,
                            partyCode: this.$route.query.partyCode,
                            partyAlbum: this.base.partyAlbum,
                            partyResult: '2',
                            partyStatus: '5'
                        }
                    }

                this.$router.push(pathUrl)
            } else if (item.pathName == 'start') {
                this.updateStatus('3')
            } else if (item.pathName == 'add') {
                this.gotoUser()
            } else if (item.pathName == 'edit') {
                var pathUrl = {
                        name: 'new-party',
                        query: {
                            enterpriseCode: this.$route.query.enterpriseCode,
                            agentId: this.$route.query.agentId,
                            partyCode: this.$route.query.partyCode
                        }
                    }

                this.$router.push(pathUrl)
            } else if (item.pathName == 'activity') {
                var pathUrl = {
                        name: 'party-gift',
                        query: {
                            enterpriseCode: this.$route.query.enterpriseCode,
                            agentId: this.$route.query.agentId,
                            partyCode: this.$route.query.partyCode
                        }
                    }

                this.$router.push(pathUrl)
            }
        },
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
                    if (res.result.result.couponGroup) {
                        this.couponData = res.result.result.couponGroup
                    }

                    if (this.base.partyStatus == '2' || this.base.partyStatus == '1') {
                        this.sheetList = [
                            {
                                label: '更新活动',
                                pathName: 'edit'
                            },
                            {
                                label: '启动活动',
                                pathName: 'start'
                            },
                            {
                                label: '邀请参与活动',
                                pathName: 'add'
                            }
                        ]
                    } else if (this.base.partyStatus == '3') {
                        this.sheetList = [
                            {
                                label: '结束活动',
                                pathName: 'close'
                            },
                            {
                                label: '取消活动',
                                pathName: 'end'
                            },
                            {
                                label: '邀请参与活动',
                                pathName: 'activity'
                            }
                        ]
                    } else {
                        this.getReviewList()
                    }

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
        },
        getReviewList () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                partyCode: this.$route.query.partyCode
            }

            util.request({
                method: 'get',
                interface: 'reviewList',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    var partyImgs = []
                    res.result.result.materialLiblist.forEach((item) => {
                        partyImgs.push(item.fileCode)
                    })

                    this.partyImgs = partyImgs
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        updateStatus (status) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                partyCode: this.$route.query.partyCode,
                partyStatus: status
            }

            util.request({
                method: 'post',
                interface: 'updateStatus',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.getBase()
                    this.isShowSheet.value = false
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        gotoUser () {
            var urlPath = window.location.href

            var pathUrl = {
                name: 'user-list',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    partyCode: this.$route.query.partyCode,
                    isUpdate: '1',
                    redirectUrl: window.encodeURIComponent(urlPath)
                }
            }
            this.$router.push(pathUrl)
        }
    },
    components: {
        imgList,
        attachmentShow,
        sheet
    }
}
</script>