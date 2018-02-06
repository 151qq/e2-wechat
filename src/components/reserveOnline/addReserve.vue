<template>
    <section class="member-detail-box">
        <div class="height-1"></div>
        <group title="基本信息" label-width="105px">
            <x-input title="预约标题"
                     v-model="formData.reserveTitle"
                     placeholder="请输入"></x-input>
            <x-input title="预约人"
                     v-model="formData.reserverName"
                     placeholder="请输入"></x-input>
            <x-input title="预约手机"
                     v-model="formData.reserverMobile"
                     placeholder="请输入"></x-input>
            <!-- <datetime title="开始时间"
                      v-model="formData.reserveBeginTime"
                      format="YYYY-MM-DD HH:mm:00"
                      placeholder="请填写时间"
                      value-text-align="left"></datetime>
            <datetime title="结束时间"
                      v-model="formData.reserveEndTime"
                      format="YYYY-MM-DD HH:mm:00"
                      placeholder="请填写时间"
                      value-text-align="left"></datetime> -->

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">开始时间</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="datetime-local" v-model="formData.reserveBeginTime">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">结束时间</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="datetime-local" v-model="formData.reserveEndTime">
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">预约地点</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input"
                            placeholder="请输入"
                            v-model="mapData.address"
                            @click="gotoMap">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">预约接待</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input"
                            placeholder="请输入"
                            v-model="userName"
                            @click="gotoUser">
                </div>
            </div>
        </group>
        <div class="weui-cells__title">预约详情</div>
        <div class="weui-cells weui-cells_form no-line no-margin">
            <div class="weui-cell no-line">
                <div class="weui-cell__bd">
                    <textarea class="weui-textarea"
                                placeholder="这一刻的想法..."
                                rows="3"
                                v-model="formData.reserveDesc"></textarea>
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
        <!-- <div class="weui-cells__title">预约产品</div>
        <div class="weui-cells no-line">
            <attachment-detail :attachment-data="attachmentData"></attachment-detail>
            <a class="add-file-btn" @click="gotoAttachment">添加</a>
        </div> -->
        
        <div class="btn-height-box"></div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="submitComment">提交</a>
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
import { mapGetters, mapActions } from 'vuex'
import { Group, XInput, Datetime} from 'vux'

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
                reserveDesc: '',
                reserveCreator: '',
                attachmentTargetType: 'reserve',
                imgData: {
                    attachmentSourceType: 'attachmen_type_1',
                    attachmentSourceCodes: []
                },
                pageData: {
                    attachmentSourceType: 'attachmen_type_5',
                    attachmentSourceCodes: []
                }
            },
            nowIndex: '',
            nowPath: '',
            isShowImg: {
                value: false
            },
            serverIdList: []
        }
    },
    mounted () {
        jsSdk.init()
        if (this.detailData.attachmentTargetType) {
            this.formData = Object.assign({}, this.detailData)

            setTimeout(() => {
                this.formData.reserveEndTime = this.detailData.reserveEndTime
                this.formData.reserveBeginTime = this.detailData.reserveBeginTime
            }, 0)
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            attachmentData: 'getAttachment',
            detailData: 'getDetail',
            userData: 'getUser',
            mapData: 'getMapInfo'
        }),
        userName () {
            if (this.userData.userList && this.userData.userList.length) {
                return this.userData.userList[0].userWechatNickname
            } else {
                return this.userInfo.userWechatNickname
            }
        },
        userCode () {
            if (this.userData.userList && this.userData.userList.length) {
                return this.userData.userList[0].userCode
            } else {
                return this.userInfo.userCode
            }
        }
    },
    methods: {
        ...mapActions([
          'setAttachment',
          'setDetail',
          'setUser',
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
            formData.userCode = this.userInfo.userCode
            formData.enterpriseCode = this.$route.query.enterpriseCode
            formData.reserveCreator = this.userInfo.userCode
            formData.agentId = this.$route.query.agentId
            formData.reserveAddr = this.mapData.url ? this.mapData.url : ''
            formData.reserveCity = this.mapData.address
            formData.imgData.attachmentSourceCodes = this.serverIdList
            formData.pageData.attachmentSourceType = this.attachmentData.targetType
            formData.pageData.attachmentSourceCodes = this.attachmentData.attachmentCodes
            formData.reserveReceptionCode = this.userCode
            formData.reserveReceptionName = this.userWechatNickname

            util.request({
                method: 'post',
                interface: 'insertReserveInfo',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.setDetail({})
                    this.setUser({})
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
        gotoAttachment () {
            this.setDetail(Object.assign({}, this.formData))

            var pathUrl = {
                name: 'product-attachment',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    targetType: 'attachmen_type_5',
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
        gotoUser () {
            this.setDetail(Object.assign({}, this.formData))

            var pathUrl = {
                name: 'user-list',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    type: 'unique',
                    redirectUrl: window.encodeURIComponent(window.location.href)
                }
            }
            this.$router.push(pathUrl)
        },
        getLink (url) {
            this.formData.reserveAddr = url
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
        Group,
        XInput,
        Datetime
    }
}
</script>