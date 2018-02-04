<template>
    <section class="member-detail-box">
        <div class="height-1"></div>
        <group title="基本信息" label-width="105px">
            <x-input title="活动标题"
                     v-model="formData.partyTitle"
                     placeholder="请输入文字"></x-input>
            <datetime title="开始时间"
                      v-model="formData.planBeginTime"
                      format="YYYY-MM-DD HH:mm:00"
                      placeholder="请填写时间"
                      value-text-align="left"></datetime>
            <datetime title="结束时间"
                      v-model="formData.planEndTime"
                      format="YYYY-MM-DD HH:mm:00"
                      placeholder="请填写时间"
                      value-text-align="left"></datetime>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">活动地点</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input"
                            placeholder="请输入"
                            v-model="mapData.address"
                            @click="gotoMap">
                </div>
            </div>
        </group>
        
        <div class="weui-cells__title">套券选择</div>
        <div class="weui-cells no-line">
            <attachment-detail :attachment-data="attachmentPage" :is-page="true"></attachment-detail>
            <a class="add-file-btn" @click="gotoCoupon">添加</a>
        </div>

        <div class="weui-cells__title">活动说明</div>
        <div class="weui-cells weui-cells_form no-line no-margin">
            <div class="weui-cell no-line">
                <div class="weui-cell__bd">
                    <textarea class="weui-textarea"
                                placeholder="这一刻的想法..."
                                rows="3"
                                v-model="formData.partyDesc"></textarea>
                </div>
            </div>
        </div>
        <div class="weui-cells no-line no-margin">
            <div class="weui-cell no-line">
                <div class="weui-uploader">
                    <div class="weui-uploader__bd">
                         <ul class="weui-uploader__files" id="uploaderFiles">
                            <li class="weui-uploader__file"
                                v-for="(item, index) in formData.imgData.attachmentSourceCodes"
                                @click="showBigImg(index)">
                                    <img :src="item">
                            </li>
                            <li @click="chooseImage" class="weui-uploader__input-box"></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 附件 -->
        <div class="weui-cells__title">相关附件</div>
        <div class="weui-cells no-line">
            <attachment-detail :attachment-data="attachmentData"></attachment-detail>
            <a class="add-file-btn" @click="gotoAttachment">添加</a>
        </div>
        
        <div class="btn-height-box"></div>

        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="submitComment">保存</a>
        </div>

        <delete-img :index="nowIndex"
                    :img-path="nowPath"
                    :is-show-img="isShowImg"
                    @deleteImg="deleteImg"></delete-img>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import deleteImg from '../common/deleteImg.vue'
import attachmentDetail from '../common/attachmentDetail.vue'
import checkboxList from '../common/checkbox-list.vue'
import { Group, XInput, Datetime} from 'vux'

import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            formData: {
                partyStatus: '',
                partyTitle: '',
                planBeginTime: '',
                planEndTime: '',
                addrLink: '',
                addrDetail: '',
                partyDesc: '',
                partyAlbum: '',
                attachmentTargetType: 'party',
                imgData: {
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
            serverIdList: [],
            themesList: [],
            cityList: [],
            scenarioList: []
        }
    },
    mounted () {
        if (this.detailData.attachmentTargetType) {
            this.formData = Object.assign({}, this.detailData)

            setTimeout(() => {
                this.formData.planBeginTime = this.detailData.planBeginTime
                this.formData.planEndTime = this.detailData.planEndTime
            }, 0)
        }

        if (this.$route.query.partyCode && !this.detailData.attachmentTargetType) {
            this.getBase()
            this.getAttachments()
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            attachmentData: 'getAttachment',
            attachmentPage: 'getAttachmentPage',
            detailData: 'getDetail',
            mapData: 'getMapInfo'
        })
    },
    methods: {
        ...mapActions([
          'setAttachment',
          'setAttachmentPage',
          'setDetail',
          'setMapInfo'
        ]),
        chooseImage () {
            var num = 9 - this.formData.imgData.attachmentSourceCodes.length
            jsSdk.chooseImage(num ,(localIds) => {
                this.formData.imgData.attachmentSourceCodes = this.formData.imgData.attachmentSourceCodes.concat(localIds).splice(0, 9)
            })
        },
        submitComment () {
            jsSdk.uploadImgs(this.formData.imgData.attachmentSourceCodes, (serverIdList) => {
                this.serverIdList = this.serverIdList.concat(serverIdList).splice(0, 9)
                this.submitFn()
            })
        },
        submitFn () {
            var formData = Object.assign({}, this.formData)
            formData.partyOwner = this.userInfo.userCode
            formData.enterpriseCode = this.$route.query.enterpriseCode
            formData.agentId = this.$route.query.agentId
            formData.imgData.attachmentSourceCodes = this.serverIdList
            formData.pageData.attachmentSourceType = this.attachmentData.targetType
            formData.pageData.attachmentSourceCodes = this.attachmentData.attachmentCodes

            formData.addrLink = this.mapData.url,
            formData.addrDetail = this.mapData.address

            formData.couponGroupCode = this.attachmentPage.attachmentCodes

            var interfaceName = 'savePartyInfo'

            if (this.$route.query.partyCode) {
                formData.partyCode = this.$route.query.partyCode
                interfaceName = 'updatePratyInfo'
            }

            util.request({
                method: 'post',
                interface: interfaceName,
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.$message({
                      message: '恭喜你，更新成功！',
                      type: 'success'
                    })

                    this.setDetail({})
                    this.setAttachment({})
                    this.setAttachmentPage({})
                    this.setMapInfo({})

                    if (this.$route.query.partyCode) {
                        this.gotoUser(this.$route.query.partyCode)
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

                    baseData.attachmentTargetType = 'party'

                    baseData.imgData = {
                        attachmentSourceType: 'attachmen_type_1',
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

                    if (this.attachmentData.targetType) {
                        return false
                    }

                    this.formData.imgData = {
                        attachmentSourceType: 'attachmen_type_1',
                        attachmentSourceCodes: data.imgData
                    }

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

                    console.log(this.attachmentData, 'attData')
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
                    agentId: this.$route.query.agentId,
                    redirectUrl: window.encodeURIComponent(window.location.href)
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
                    agentId: this.$route.query.agentId,
                    redirectUrl: window.encodeURIComponent(window.location.href)
                }
            }
            this.$router.push(pathUrl)
        },
        gotoUser (partyCode) {
            this.setDetail(Object.assign({}, this.formData))

            var urlPath = window.location.href.replace('newParty', 'partyDetail')

            if (!this.$route.query.partyCode) {
                urlPath = urlPath + '&partyCode=' + partyCode
            }

            var pathUrl = {
                name: 'user-list',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    partyCode: partyCode,
                    redirectUrl: window.encodeURIComponent(urlPath)
                }
            }

            if (this.$route.query.partyCode) {
                pathUrl.query.isUpdate = '1'
            }

            this.$router.push(pathUrl)
        },
        showBigImg (index) {
            this.nowIndex = index
            this.nowPath = this.formData.imgData.attachmentSourceCodes[index]
            this.isShowImg.value = true
        },
        deleteImg (index) {
            this.formData.imgData.attachmentSourceCodes.splice(index, 1)
        }
    },
    components: {
        deleteImg,
        attachmentDetail,
        checkboxList,
        Group,
        XInput,
        Datetime
    }
}
</script>