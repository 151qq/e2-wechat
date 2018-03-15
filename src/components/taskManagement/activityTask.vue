<template>
    <section class="member-detail-box">
        <div class="height-1"></div>
        <group class="no-margin show-message-box" label-width="105px">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">任务标题</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" placeholder="请输入文字" v-model="formData.taskTitle">
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">开始时间</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="datetime-local" v-model="formData.taskBeginTimeD">
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">结束时间</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="datetime-local" v-model="formData.taskEndTimeD">
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>
        </group>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line">
            <div class="weui-cell weui-cell_access no-center">
                <div class="weui-cell__hd"><label class="weui-label">任务详情</label></div>
                <div class="weui-cell__bd">
                   <textarea class="weui-textarea"
                        placeholder="请输入文字"
                        :rows="formData.taskDesc ? 3 : 1"
                        v-model="formData.taskDesc"></textarea>
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

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line">
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__hd"><label class="weui-label">任务封面</label></div>
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
                                v-if="formData.taskCover"
                                @click="showBigImage">
                                    <img :src="formData.taskCover">
                            </li>
                            <li v-if="!formData.taskCover" @click="chooseImg" class="weui-uploader__input-box"></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="btn-height-box"></div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="submitComment">分派任务</a>
        </div>

        <delete-img :index="nowIndex"
                    :img-path="nowPath"
                    :is-show-img="isShowImg"
                    @deleteImg="deleteImg"></delete-img>

        <delete-img :index="nowIndex"
                    :img-path="nowPath"
                    :is-show-img="isShowImage"
                    @deleteImg="deleteImage"></delete-img>
    </section>
</template>
<script>
import util from '../../utils/tools'
import deleteImg from '../common/deleteImg.vue'
import jsSdk from '../../utils/jsSdk'
import attachmentDetail from '../common/attachmentDetail.vue'
import { mapGetters, mapActions } from 'vuex'
import { Group, XInput, Datetime } from 'vux'

export default {
    data () {
        return {
            formData: {
                taskType: '0',
                taskTitle: '',
                taskBeginTime: '',
                taskEndTime: '',
                taskBeginTimeD: '',
                taskEndTimeD: '',
                taskDesc: '',
                taskCover: '',
                attachmentTargetType: 'task',
                localIds: [],
                imgData: {
                    attachmentSourceType: 'attachmen_type_1',
                    attachmentSourceCodes: []
                },
                pageData: {
                    attachmentSourceType: '',
                    attachmentSourceCodes: []
                }
            },
            nowIndex: '',
            nowPath: '',
            isShowImg: {
                value: false
            },
            isShowImage: {
                value: false
            },
            serverId: '',
            serverIdList: []
        }
    },
    mounted () {
        jsSdk.init()
        if (this.detailData.attachmentTargetType) {
            this.formData = Object.assign({}, this.detailData)

            setTimeout(() => {
                this.formData.taskBeginTimeD = this.detailData.taskBeginTimeD
                this.formData.taskEndTimeD = this.detailData.taskEndTimeD
            }, 0)
        } else {
            this.formData.taskBeginTimeD = util.formatDate(new Date().getTime(), 'yyyy-MM-ddThh:mm:ss')
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            attachmentData: 'getAttachment',
            detailData: 'getDetail'
        })
    },
    methods: {
        ...mapActions([
          'setAttachment',
          'setDetail'
        ]),
        chooseImage () {
            var num = 9 - this.formData.imgData.attachmentSourceCodes.length
            jsSdk.chooseImage(num ,(localIds) => {
                this.formData.imgData.attachmentSourceCodes = this.formData.imgData.attachmentSourceCodes.concat(localIds).splice(0, 9)
            })
        },
        chooseImg () {
            var num = this.formData.taskCover ? 0 : 1
            jsSdk.chooseImage(num ,(localIds) => {
                this.formData.taskCover = localIds[0]
            })
        },
        submitComment () {
            var num = 0

            var coverArr = []

            if (this.formData.taskCover) {
                coverArr = [this.formData.taskCover]
            }

            jsSdk.uploadImgs(coverArr, (serverIdList) => {
                this.serverId = serverIdList[0]
                num++
                if (num == 2) {
                    this.submitFn()
                }
            })

            jsSdk.uploadImgs(this.formData.imgData.attachmentSourceCodes, (serverIdList) => {
                this.serverIdList = this.serverIdList.concat(serverIdList).splice(0, 9)
                num++
                if (num == 2) {
                    this.submitFn()
                }
            })
        },
        submitFn () {
            if (!this.formData.taskTitle) {
                this.$message({
                    message: '请填写任务标题!',
                    type: 'warning'
                })
                return false
            }

            // this.formData.taskBeginTimeD = '2017-01-02 11:11:11'
            // this.formData.taskEndTimeD = '2017-01-05 11:11:11'

            if (!this.formData.taskBeginTimeD) {
                this.$message({
                    message: '请填写开始时间!',
                    type: 'warning'
                })
                return false
            }

            if (!this.formData.taskEndTimeD) {
                this.$message({
                    message: '请填写结束时间!',
                    type: 'warning'
                })
                return false
            }

            if (new Date(this.formData.taskBeginTimeD).getTime() > new Date(this.formData.taskEndTimeD).getTime()) {
                this.$message({
                    message: '开始应小于结束时间!',
                    type: 'warning'
                })
                return false
            }

            this.formData.taskBeginTime = util.formatDate(this.formData.taskBeginTimeD, 'yyyy-MM-dd hh:mm:ss')
            this.formData.taskEndTime = util.formatDate(this.formData.taskEndTimeD, 'yyyy-MM-dd hh:mm:ss')

            var formData = Object.assign({}, this.formData)
            formData.userCode = this.userInfo.userCode
            formData.enterpriseCode = this.$route.query.enterpriseCode
            formData.agentId = this.$route.query.agentId
            formData.imgData.attachmentSourceCodes = this.serverIdList
            formData.pageData.attachmentSourceType = this.attachmentData.targetType
            formData.pageData.attachmentSourceCodes = this.attachmentData.attachmentCodes
            formData.taskCover = this.serverId

            util.request({
                method: 'post',
                interface: 'saveTask',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.setDetail({})
                    this.setAttachment({})
                    this.gotoUser(res.result.result)
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
        gotoUser (taskCode) {
            var urlPath = window.location.href.replace('activityTask', 'activityDetail')
            urlPath = urlPath + '&taskCode=' + taskCode

            var pathUrl = {
                name: 'user-list',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    taskCode: taskCode,
                    taskType: '0',
                    taskTitle: this.formData.taskTitle,
                    redirectUrl: window.encodeURIComponent(urlPath)
                }
            }
            this.$router.replace(pathUrl)
        },
        showBigImg (index) {
            this.nowIndex = index
            this.nowPath = this.formData.imgData.attachmentSourceCodes[index]
            this.isShowImg.value = true
        },
        deleteImg (index) {
            this.formData.imgData.attachmentSourceCodes.splice(index, 1)
        },
        showBigImage () {
            this.nowPath = this.formData.taskCover
            this.isShowImage.value = true
        },
        deleteImage () {
            this.formData.taskCover = ''
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