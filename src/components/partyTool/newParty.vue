<template>
    <section class="member-detail-box">
        <div class="height-1"></div>
        <div class="weui-cells no-margin show-message-box">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">活动标题</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" placeholder="请输入文字" v-model="formData.partyTitle">
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">开始时间</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" placeholder="请选择" type="datetime-local" v-model="formData.planBeginTimeD">
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">结束时间</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" placeholder="请选择" type="datetime-local" v-model="formData.planEndTimeD">
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">活动地点</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input"
                            placeholder="请输入"
                            v-model="mapData.address"
                            @click="gotoMap">
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>
        </div>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line">
            <div class="weui-cell weui-cell_access" @click="gotoCoupon">
                <div class="weui-cell__hd"><label class="weui-label">活动赠品</label></div>
                <div class="weui-cell__bd wx-placeholder">
                   已经选择了{{attachmentPage.attachmentList ? attachmentPage.attachmentList.length : 0}}种赠品
                </div>
                <div class="weui-cell__ft"></div>
            </div>
        </div>
        <attachment-detail :attachment-data="attachmentPage"></attachment-detail>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line show-message-box">
            <div class="weui-cell weui-cell_access no-center">
                <div class="weui-cell__hd"><label class="weui-label">活动说明</label></div>
                <div class="weui-cell__bd">
                   <textarea class="weui-textarea"
                        placeholder="请输入文字"
                        :rows="formData.partyDesc ? 3 : 1"
                        v-model="formData.partyDesc"></textarea>
                </div>
            </div>       
        </div>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line">
            <div class="weui-cell weui-cell_access" @click="gotoAttachment">
                <div class="weui-cell__hd"><label class="weui-label">相关附件</label></div>
                <div class="weui-cell__bd wx-placeholder">
                   已经选择了{{attachmentData.attachmentList ? attachmentData.attachmentList.length : 0}}个附件
                </div>
                <div class="weui-cell__ft"></div>
            </div>
        </div>
        <attachment-detail :attachment-data="attachmentData"></attachment-detail>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line show-message-box">
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__hd"><label class="weui-label">本地图片</label></div>
                <div class="weui-cell__bd wx-placeholder">
                   最多可以选择9张图片
                </div>
                <div class="weui-cell__ft"></div>
            </div>
        </div>

        <div class="weui-cells no-margin">
            <div class="weui-cell no-line">
                <div class="weui-uploader">
                    <div class="weui-uploader__bd">
                         <ul class="weui-uploader__files" id="uploaderFiles">
                            <li class="weui-uploader__file"
                                v-for="(item, index) in formData.imgData.localIds"
                                @click="showBigImg(index)">
                                    <img :src="item">
                            </li>
                            <li @click="chooseImage"
                                v-if="formData.imgData.localIds.length < 9"
                                class="weui-uploader__input-box"></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line show-message-box">
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__hd"><label class="weui-label">活动封面</label></div>
                <div class="weui-cell__bd wx-placeholder">
                   请选择一张图片
                </div>
                <div class="weui-cell__ft"></div>
            </div>
        </div>

        <div class="weui-cells no-margin">
            <div class="weui-cell no-line">
                <div class="weui-uploader">
                    <div class="weui-uploader__bd">
                         <ul class="weui-uploader__files" id="uploaderFiles">
                            <li class="weui-uploader__file"
                                v-if="formData.localId"
                                @click="showBigImage">
                                    <img :src="formData.localId">
                            </li>
                            <li v-if="!formData.localId" @click="chooseImg" class="weui-uploader__input-box"></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="btn-height-box"></div>

        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="submitFn">保存</a>
        </div>

        <delete-img :index="nowIndex"
                    :img-path="nowPath"
                    :is-show-img="isShowImg"
                    @deleteImg="deleteImg"></delete-img>

        <delete-img :index="0"
                    :img-path="formData.localId"
                    :is-show-img="isShowImage"
                    @deleteImg="deleteImage"></delete-img>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import deleteImg from '../common/deleteImg.vue'
import attachmentDetail from '../common/attachmentDetail.vue'
import checkboxList from '../common/checkbox-list.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            formData: {
                partyStatus: '',
                partyTitle: '',
                planBeginTime: '',
                planEndTime: '',
                planBeginTimeD: '',
                planEndTimeD: '',
                addrLink: '',
                addrDetail: '',
                partyDesc: '',
                partyAlbum: '',
                partyCover: '',
                localId: '',
                addrBaiduGps: '',
                attachmentTargetType: 'party',
                imgData: {
                    localIds: [],
                    attachmentSourceType: 'attachmen_type_1',
                    attachmentSourceCodes: []
                },
                pageData: {
                    attachmentSourceType: '',
                    attachmentSourceCodes: []
                },
                couponGroupCode: []
            },
            nowIndex: '',
            nowPath: '',
            isShowImg: {
                value: false
            },
            isShowImage: {
                value: false
            },
            themesList: [],
            cityList: [],
            scenarioList: []
        }
    },
    mounted () {
        jsSdk.init()
        if (this.detailData.attachmentTargetType) {
            this.formData = Object.assign({}, this.detailData)

            setTimeout(() => {
                this.formData.planBeginTimeD = this.detailData.planBeginTimeD
                this.formData.planEndTimeD = this.detailData.planEndTimeD
            }, 0)
        }

        if (this.$route.query.partyCode && !this.detailData.attachmentTargetType) {
            this.getBase()
            document.title = '更新活动'
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            attachmentData: 'getAttachment',
            attachmentPage: 'getAttachmentPage',
            detailData: 'getDetail',
            mapData: 'getMapInfo',
            userData: 'getUser'
        })
    },
    methods: {
        ...mapActions([
          'setAttachment',
          'setAttachmentPage',
          'setDetail',
          'setMapInfo',
          'setUser'
        ]),
        chooseImage () {
            jsSdk.chooseImage((localId ,serverId) => {
                this.formData.imgData.localIds.push(localId)
                this.formData.imgData.attachmentSourceCodes.push(serverId)
            })
        },
        chooseImg () {
            jsSdk.chooseImage((localId, serverId) => {
                this.formData.localId = localId
                this.formData.partyCover = serverId
            })
        },
        submitFn () {
            if (!this.formData.partyTitle) {
                this.$message({
                    message: '请填写活动标题!',
                    type: 'warning'
                })
                return false
            }

            if (!this.formData.planBeginTimeD) {
                this.$message({
                    message: '请填写开始时间!',
                    type: 'warning'
                })
                return false
            }

            if (!this.formData.planEndTimeD) {
                this.$message({
                    message: '请填写结束时间!',
                    type: 'warning'
                })
                return false
            }

            if (util.getDate(this.formData.planBeginTimeD).getTime() > util.getDate(this.formData.planEndTimeD).getTime()) {
                this.$message({
                    message: '开始应小于结束时间!',
                    type: 'warning'
                })
                return false
            }

            this.formData.planBeginTime = util.formatDate(this.formData.planBeginTimeD, 'yyyy-MM-dd hh:mm:ss')
            this.formData.planEndTime = util.formatDate(this.formData.planEndTimeD, 'yyyy-MM-dd hh:mm:ss')

            if (!this.mapData.address) {
                this.$message({
                    message: '请填活动地点!',
                    type: 'warning'
                })
                return false
            }

            var formData = Object.assign({}, this.formData)
            formData.partyOwner = this.userInfo.userCode
            formData.enterpriseCode = this.$route.query.enterpriseCode
            formData.agentId = this.$route.query.agentId
            formData.pageData.attachmentSourceType = this.attachmentData.targetType
            formData.pageData.attachmentSourceCodes = this.attachmentData.attachmentCodes

            formData.addrLink = this.mapData.url,
            formData.addrDetail = this.mapData.address

            formData.couponGroupCode = this.attachmentPage.attachmentCodes

            if (this.mapData.point) {
                formData.addrBaiduGps = this.mapData.point
            }

            var interfaceName = 'savePartyInfo'

            if (this.$route.query.partyCode) {
                formData.partyCode = this.$route.query.partyCode
                formData.toUrl = window.location.href.replace('newParty', 'partyDetail')
                interfaceName = 'updatePratyInfo'
            }

            util.request({
                method: 'post',
                interface: interfaceName,
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.$message({
                      message: '恭喜你，操作成功！',
                      type: 'success'
                    })

                    this.setDetail({})
                    this.setAttachment({})
                    this.setAttachmentPage({})
                    this.setMapInfo({})

                    if (this.$route.query.partyCode) {
                        this.$router.go(-2)
                    } else {
                        this.gotoUser(res.result.result)
                    }
                    
                } else {
                    this.$message.error(res.result.message)
                }
            })
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
                    var baseData = res.result.result.partyInfo

                    baseData.planBeginTimeD = baseData.planBeginTime.replace(' ', 'T')
                    baseData.planEndTimeD = baseData.planEndTime.replace(' ', 'T')

                    baseData.attachmentTargetType = 'party'

                    baseData.imgData = {
                        attachmentSourceType: 'attachmen_type_1',
                        localIds: [],
                        attachmentSourceCodes: []
                    }

                    baseData.pageData = {
                        attachmentSourceType: '',
                        attachmentSourceCodes: []
                    }

                    if (!this.mapData.address) {
                        var mapData = {
                            address: baseData.addrDetail,
                            url: baseData.addrLink
                        }

                        this.setMapInfo(mapData)
                    }

                    baseData.localId = baseData.partyCover


                    this.formData = baseData

                    if (res.result.result.couponGroup) {
                        var attachmentList = res.result.result.couponGroup ? res.result.result.couponGroup : []
                        var attachmentCodes = []

                        if (res.result.result.couponGroup.length) {
                            res.result.result.couponGroup.forEach((item) => {
                                attachmentCodes.push(item.couponGroupCode)
                            })
                        }

                        var attData = {
                            targetType: 'attachmen_type_8',
                            attachmentList:  attachmentList,
                            attachmentCodes: attachmentCodes
                        }

                        this.setAttachmentPage(attData)
                    }

                    this.getAttachments()
                    
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
                    var data = res.result.result

                    // if (this.attachmentData.targetType) {
                    //     return false
                    // }

                    this.formData.imgData.attachmentSourceCodes = data.imgData
                    this.formData.imgData.localIds = data.imgData

                    var attachmentList = data.pageData
                    var attachmentCodes = []

                    if (data.pageData.length) {
                        data.pageData.forEach((item) => {
                            switch(data.attachmentSourceType){
                                case 'attachmen_type_2': 
                                     attachmentCodes.push(item.couponGroupCode)
                                     break
                                case 'attachmen_type_3': 
                                     attachmentCodes.push(item.taskCode)
                                     break
                                case 'attachmen_type_7': 
                                     attachmentCodes.push(item.partyCode)
                                     break
                                case 'attachmen_type_6': 
                                     attachmentCodes.push(item.reserveCode)
                                     break
                                default: 
                                     attachmentCodes.push(item.pageCode)
                                     break
                            }
                            
                        })
                    }

                    var attData = {
                        targetType: data.attachmentSourceType,
                        attachmentList:  attachmentList,
                        attachmentCodes: attachmentCodes
                    }

                    this.setAttachment(attData)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        gotoAttachment () {
            this.setDetail(Object.assign({}, this.formData))

            var pathUrl = {
                name: 'attachment-list',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId
                }
            }
            this.$router.push(pathUrl)
        },
        gotoCoupon () {
            this.setDetail(Object.assign({}, this.formData))

            var pathUrl = {
                name: 'coupon-attachment',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    isPage: 1,
                    couponGroutScenario: 'coupon_scenario_4',
                    redirectUrl: window.encodeURIComponent(window.location.href)
                }
            }
            this.$router.push(pathUrl)
        },
        gotoMap () {
            this.setDetail(Object.assign({}, this.formData))

            var pathUrl = {
                name: 'search-map',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId
                }
            }
            this.$router.push(pathUrl)
        },
        gotoUser (partyCode) {
            var urlPath = window.location.href.replace('newParty', 'partyDetail')

            if (!this.$route.query.partyCode) {
                urlPath = urlPath + '&partyCode=' + partyCode
            }

            if (this.$route.query.partyCode) {
                var formData = {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    partyCode: this.$route.query.partyCode
                }

                util.request({
                    method: 'get',
                    interface: 'partyAttendee',
                    data: formData
                }).then(res => {
                    if (res.result.success == '1') {
                        var attData = {
                            userList: [],
                            userCodes: []
                        }

                        var userCodes = []
                        res.result.result.forEach((item) => {
                            userCodes.push(item.userCode)
                        })

                        attData.userCodes = [].concat(userCodes)

                        this.setUser(attData)

                        var pathUrl = {
                            name: 'user-list',
                            query: {
                                enterpriseCode: this.$route.query.enterpriseCode,
                                agentId: this.$route.query.agentId,
                                partyCode: partyCode,
                                redirectUrl: window.encodeURIComponent(urlPath)
                            }
                        }

                        this.$router.replace(pathUrl)
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            } else {
                var pathUrl = {
                    name: 'user-list',
                    query: {
                        enterpriseCode: this.$route.query.enterpriseCode,
                        agentId: this.$route.query.agentId,
                        partyCode: partyCode,
                        redirectUrl: window.encodeURIComponent(urlPath)
                    }
                }

                this.$router.replace(pathUrl)
            }
        },
        showBigImg (index) {
            this.nowIndex = index
            this.nowPath = this.formData.imgData.localIds[index]
            this.isShowImg.value = true
        },
        showBigImage () {
            this.isShowImage.value = true
        },
        deleteImage () {
            this.formData.partyCover = ''
            this.formData.localId = ''
        },
        deleteImg (index) {
            this.formData.imgData.attachmentSourceCodes.splice(index, 1)
            this.formData.imgData.localIds.splice(index, 1)
        }
    },
    components: {
        deleteImg,
        attachmentDetail,
        checkboxList
    }
}
</script>