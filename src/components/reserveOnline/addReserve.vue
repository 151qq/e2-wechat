<template>
    <section class="member-detail-box">
        <div class="height-1"></div>
        <div class="weui-cells no-margin show-message-box">
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">预约类型</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            @change="reserveTypeChange"
                            v-model="formData.reserveType">
                        <option value=""></option>
                        <option
                            v-for="(item, index) in typeList" :key="index"
                            :value="item.resultType">
                            {{item.resultTypeName}}
                        </option>
                    </select>
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>
        </div>
    
        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin show-message-box">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">预约标题</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" placeholder="请输入" v-model="formData.reserveTitle">
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">预约人</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" placeholder="请输入" v-model="formData.reserverName">
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">预约手机</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="tel" placeholder="请输入" v-model="formData.reserverMobile">
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">开始时间</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="datetime-local" v-model="formData.reserveBeginTimeD">
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">结束时间</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="datetime-local" v-model="formData.reserveEndTimeD">
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>

            <div class="weui-cell" @click="gotoMap">
                <div class="weui-cell__hd"><label class="weui-label">预约地点</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input"
                            placeholder="请输入"
                            v-model="mapData.address">
                </div>
            </div>
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__hd"><label class="weui-label">预约接待</label></div>
                <div class="weui-cell__bd">{{userName}}</div>
                <div class="weui-cell__ft"></div>
            </div>
        </div>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line show-message-box">
            <div class="weui-cell weui-cell_access no-center">
                <div class="weui-cell__hd"><label class="weui-label">预约详情</label></div>
                <div class="weui-cell__bd">
                   <textarea class="weui-textarea"
                        placeholder="请输入"
                        :rows="formData.reserveDesc ? 3 : 1"
                        v-model="formData.reserveDesc"></textarea>
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
                <div class="weui-cell__hd"><label class="weui-label">预约封面</label></div>
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

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin show-message-box">
            <div class="weui-cell" @click="gotoChannel">
                <div class="weui-cell__hd"><label class="weui-label">推广会员</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input"
                            placeholder="请输入"
                            v-model="channelName">
                </div>
            </div>
        </div>

        <!-- 附件 -->
        <!-- <template v-if="['3'].indexOf(formData.reserveType) > -1">
            <div class="wx-area-line"></div>
            <div class="weui-cells no-margin no-line">
                <div class="weui-cell weui-cell_access" @click="gotoAttachmentPage">
                    <div class="weui-cell__hd"><label class="weui-label">新增预约</label></div>
                    <div class="weui-cell__bd wx-placeholder">
                       请添加一个新预约
                    </div>
                    <div class="weui-cell__ft"></div>
                </div>
            </div>
            <attachment-detail :attachment-data="attachmentPage"></attachment-detail>
        </template> -->
        
        <!-- 附件 -->
        <!-- <div class="weui-cells__title">预约产品</div>
        <div class="weui-cells no-line">
            <attachment-detail :attachment-data="attachmentData"></attachment-detail>
            <a class="add-file-btn" @click="gotoAttachment">添加</a>
        </div> -->
        
        <div class="btn-height-box"></div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="submitFn">提交</a>
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
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            formData: {
                reserveTitle: '',
                reserverName: '',
                reserverMobile: '',
                enterpriseCode: '',
                reserveReception: '',
                reserveReceptionCode: '',
                reserveAddr: '',
                reserveEndTime: '',
                reserveBeginTime: '',
                reserveEndTimeD: '',
                reserveBeginTimeD: '',
                reserveDesc: '',
                reserveCreator: '',
                reserveCover: '',
                localId: '',
                addrBaiduGps: '',
                reserveType: '',
                reserveParent: '',
                attachmentTargetType: 'reserve',
                imgData: {
                    localIds: [],
                    attachmentSourceType: 'attachmen_type_1',
                    attachmentSourceCodes: []
                },
                pageData: {
                    attachmentSourceType: 'attachmen_type_5',
                    attachmentSourceCodes: []
                }
            },
            typeList: [],
            nowIndex: '',
            nowPath: '',
            isShowImg: {
                value: false
            },
            isShowImage: {
                value: false
            }
        }
    },
    mounted () {
        jsSdk.init()
        if (this.detailData.attachmentTargetType) {
            this.formData = Object.assign({}, this.detailData)

            setTimeout(() => {
                this.formData.reserveEndTimeD = this.detailData.reserveEndTimeD
                this.formData.reserveBeginTimeD = this.detailData.reserveBeginTimeD
            }, 0)
        }

        if (this.attachmentPage.attachmentCodes && this.attachmentPage.attachmentCodes.length) {
            this.getBase(this.attachmentPage.attachmentCodes[0])
        }

        this.getTypes()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            attachmentData: 'getAttachment',
            attachmentPage: 'getAttachmentPage',
            detailData: 'getDetail',
            userData: 'getUser',
            channelData: 'getChannel',
            mapData: 'getMapInfo'
        }),
        userName () {
            if (this.userData.userList && this.userData.userList.length) {
                return this.userData.userList[0].userWechatNickname
            } else {
                return this.userInfo.userWechatNickname
            }
        },
        channelName () {
            if (this.channelData.userList && this.channelData.userList.length) {
                return this.channelData.userList[0].memberWechatNickname
            } else {
                return ''
            }
        },
        userCode () {
            if (this.userData.userList && this.userData.userList.length) {
                return this.userData.userList[0].userCode
            } else {
                return this.userInfo.userCode
            }
        },
        channelCode () {
            if (this.channelData.userList && this.channelData.userList.length) {
                return this.channelData.userList[0].memberCode
            } else {
                return ''
            }
        }
    },
    methods: {
        ...mapActions([
          'setAttachment',
          'setAttachmentPage',
          'setDetail',
          'setUser',
          'setChannel',
          'setMapInfo'
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
                this.formData.reserveCover = serverId
            })
        },
        submitFn () {
            if (!this.formData.reserveTitle) {
                this.$message({
                    message: '请填写预约标题!',
                    type: 'warning'
                })
                return false
            }

            if (!this.formData.reserverName) {
                this.$message({
                    message: '请填写预约人!',
                    type: 'warning'
                })
                return false
            }

            if (!this.formData.reserverMobile) {
                this.$message({
                    message: '请填写预约人手机!',
                    type: 'warning'
                })
                return false
            }

            if (!(/^1[3|4|5|8][0-9]{9}$/.test(this.formData.reserverMobile.trim()))) {
                this.$message({
                    message: '请填写正确格式手机号!',
                    type: 'warning'
                })
                return false
            }

            if (!this.formData.reserveBeginTimeD) {
                this.$message({
                    message: '请填写开始时间!',
                    type: 'warning'
                })
                return false
            }

            if (!this.formData.reserveEndTimeD) {
                this.$message({
                    message: '请填写结束时间!',
                    type: 'warning'
                })
                return false
            }

            if (util.getDate(this.formData.reserveBeginTimeD).getTime() > util.getDate(this.formData.reserveEndTimeD).getTime()) {
                this.$message({
                    message: '开始应小于结束时间!',
                    type: 'warning'
                })
                return false
            }

            if (!this.userName) {
                this.$message({
                    message: '请填写预约接待!',
                    type: 'warning'
                })
                return false
            }

            if (!this.formData.reserveType) {
                this.$message({
                    message: '请选择预约类型!',
                    type: 'warning'
                })
                return false
            }

            if (['3'].indexOf(this.formData.reserveType) > -1) {
                if (!this.attachmentPage.attachmentCodes || !this.attachmentPage.attachmentCodes.length) {
                    this.$message.error('请选择一个预约！')
                    return false
                }
            }

            this.formData.reserveBeginTime = util.formatDate(this.formData.reserveBeginTimeD, 'yyyy-MM-dd hh:mm:ss')
            this.formData.reserveEndTime = util.formatDate(this.formData.reserveEndTimeD, 'yyyy-MM-dd hh:mm:ss')


            var formData = Object.assign({}, this.formData)
            formData.userCode = this.userInfo.userCode
            formData.enterpriseCode = this.$route.query.enterpriseCode
            formData.reserveCreator = this.userInfo.userCode
            formData.agentId = this.$route.query.agentId
            formData.reserveAddr = this.mapData.url ? this.mapData.url : ''
            formData.reserveCity = this.mapData.address
            formData.pageData.attachmentSourceType = this.attachmentData.targetType
            formData.pageData.attachmentSourceCodes = this.attachmentData.attachmentCodes
            formData.reserveReceptionCode = this.userCode
            formData.reserveReceptionName = this.userName
            formData.reserveReferral = this.channelCode

            if (['3'].indexOf(this.formData.reserveType) > -1) {
                formData.reserveParent = this.attachmentPage.attachmentCodes[0]
            }

            if (this.mapData.point) {
                formData.addrBaiduGps = this.mapData.point
            }

            util.request({
                method: 'post',
                interface: 'insertReserveInfo',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.setDetail({})
                    this.setUser({})
                    this.setChannel({})
                    this.setMapInfo({})
                    this.setAttachment({})
                    var pathUrl = {
                        name: 'reserve-detail',
                        query: {
                            enterpriseCode: this.$route.query.enterpriseCode,
                            agentId: this.$route.query.agentId,
                            reserveCode: res.result.result
                        }
                    }
                    this.$router.replace(pathUrl)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getTypes () {
            util.request({
                method: 'get',
                interface: 'getReserveTypes',
                data: {}
            }).then(res => {
                if (res.result.success == '1') {
                    this.typeList = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getBase (reserveCode) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                reserveCode: reserveCode
            }

            util.request({
                method: 'get',
                interface: 'selectAll',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    var data = res.result.result
                    var dataBase = data.reserveInfo

                    var formData = {
                        reserveTitle: dataBase.reserveTitle,
                        reserverName: dataBase.reserverName,
                        reserverMobile: dataBase.reserverMobile,
                        enterpriseCode: dataBase.enterpriseCode,
                        reserveReception: dataBase.reserveReception,
                        reserveReceptionCode: dataBase.reserveReceptionCode,
                        reserveAddr: '',
                        reserveCity: '',
                        reserveEndTime: '',
                        reserveBeginTime: '',
                        reserveEndTimeD: dataBase.reserveEndTime.replace(' ', 'T'),
                        reserveBeginTimeD: dataBase.reserveBeginTime.replace(' ', 'T'),
                        reserveDesc: dataBase.reserveDesc,
                        reserveCreator: dataBase.reserveCreator,
                        reserveCover: dataBase.reserveCover,
                        localId: dataBase.reserveCover,
                        addrBaiduGps: '',
                        reserveType: '3',
                        reserveParent: reserveCode,
                        attachmentTargetType: 'reserve',
                        imgData: {
                            localIds: [],
                            attachmentSourceType: 'attachmen_type_1',
                            attachmentSourceCodes: []
                        },
                        pageData: {
                            attachmentSourceType: 'attachmen_type_5',
                            attachmentSourceCodes: []
                        }
                    }

                    this.formData = formData

                    if (dataBase.addrBaiduGps) {
                        var mapData = {
                            address: dataBase.reserveCity,
                            url: dataBase.reserveAddr,
                            point: dataBase.addrBaiduGps
                        }

                        this.setMapInfo(mapData)
                    }

                    if (dataBase.reserveReferralName) {
                        var attData = {
                            userList: [{
                                memberWechatNickname: dataBase.reserveReferralName
                            }],
                            userCodes: [dataBase.reserveReferral]
                        }

                        this.setChannel(attData)
                    }

                    if (data.newReserveImgData.length) {
                        formData.imgData.localIds = data.newReserveImgData
                        formData.imgData.attachmentSourceCodes = data.newReserveImgData
                    }

                    if (data.newReservePageData.length) {
                        var attachmentList = data.newReservePageData
                        var attachmentCodes = []

                        data.newReservePageData.forEach((item) => {
                            attachmentCodes.push(item.pageCode)
                        })

                        var attData = {
                            targetType: 'attachmen_type_5',
                            attachmentList: attachmentList,
                            attachmentCodes: attachmentCodes
                        }

                        this.setAttachment(attData)
                    }

                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        reserveTypeChange (value) {
            console.log(value, 'value')

            if (this.formData.reserveType == '3') {
                this.gotoAttachmentPage()
            } else {
                this.setAttachmentPage({})
                this.setAttachment({})
                this.setDetail({})
                this.setMapInfo({})
                this.setChannel({})

                var formData = {
                    reserveTitle: '',
                    reserverName: '',
                    reserverMobile: '',
                    enterpriseCode: '',
                    reserveReception: '',
                    reserveReceptionCode: '',
                    reserveAddr: '',
                    reserveCity: '',
                    reserveEndTime: '',
                    reserveBeginTime: '',
                    reserveEndTimeD: '',
                    reserveBeginTimeD: util.formatDate(new Date().getTime(), 'yyyy-MM-ddThh:mm:ss'),
                    reserveDesc: '',
                    reserveCreator: '',
                    reserveCover: '',
                    localId: '',
                    addrBaiduGps: '',
                    reserveType: this.formData.reserveType,
                    reserveParent: '',
                    attachmentTargetType: 'reserve',
                    imgData: {
                        localIds: [],
                        attachmentSourceType: 'attachmen_type_1',
                        attachmentSourceCodes: []
                    },
                    pageData: {
                        attachmentSourceType: 'attachmen_type_5',
                        attachmentSourceCodes: []
                    }
                }

                this.formData = formData
            }
        },
        gotoAttachment () {
            this.setDetail(Object.assign({}, this.formData))

            var pathUrl = {
                name: 'article-attachment',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    type: 'submit'
                }
            }
            this.$router.push(pathUrl)
        },
        gotoAttachmentPage () {
            this.setDetail(Object.assign({}, this.formData))

            var pathUrl = {
                name: 'reserve-attachment',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    isPage: '1',
                    status: '3',
                    result: '2,3,4',
                    type: 'unique'
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
        gotoUser () {
            this.setDetail(Object.assign({}, this.formData))

            var pathUrl = {
                name: 'user-list',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    type: 'unique'
                }
            }
            this.$router.push(pathUrl)
        },
        gotoChannel () {
            this.setDetail(Object.assign({}, this.formData))

            var pathUrl = {
                name: 'channel-user',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    type: 'unique'
                }
            }
            this.$router.push(pathUrl)
        },
        getLink (url) {
            this.formData.reserveAddr = url
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
            this.formData.reserveCover = ''
            this.formData.localId = ''
        },
        deleteImg (index) {
            this.formData.imgData.attachmentSourceCodes.splice(index, 1)
            this.formData.imgData.localIds.splice(index, 1)
        }
    },
    components: {
        deleteImg,
        attachmentDetail
    }
}
</script>