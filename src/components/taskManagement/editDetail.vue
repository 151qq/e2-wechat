<template>
    <section class="task-detail-box">
        <div class="height-1"></div>
        <div class="weui-cells no-margin">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">任务标题</label></div>
                <div class="weui-cell__bd">{{base.taskTitle}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">开始时间</label></div>
                <div class="weui-cell__bd">{{base.taskBeginTime}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">结束时间</label></div>
                <div class="weui-cell__bd">{{base.taskEndTime}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">文章数量</label></div>
                <div class="weui-cell__bd">{{base.taskPageEdit.pageNum}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">文章主题</label></div>
                <div class="weui-cell__bd">{{base.taskPageEdit.pageScenarioName}}</div>
            </div>
        </div>
        
        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin" v-if="base.taskPageEdit">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">客户性别</label></div>
                <div class="weui-cell__bd">{{base.taskPageEdit.pageReaderGender}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">所在城市</label></div>
                <div class="weui-cell__bd">{{base.taskPageEdit.pageReaderCity}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">客户年龄</label></div>
                <div class="weui-cell__bd">{{base.taskPageEdit.pageReaderAge}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">教育背景</label></div>
                <div class="weui-cell__bd">{{base.taskPageEdit.pageReaderEdu}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">消费能力</label></div>
                <div class="weui-cell__bd">{{base.taskPageEdit.pageReaderConsumeLevel}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">客户职业</label></div>
                <div class="weui-cell__bd">{{base.taskPageEdit.pageReaderCareer}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">工作单位</label></div>
                <div class="weui-cell__bd">{{base.taskPageEdit.pageReaderEnterprise}}</div>
            </div>
        </div>
        
        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line">
            <div class="weui-cell weui-cell_access no-center">
                <div class="weui-cell__hd"><label class="weui-label">任务详情</label></div>
                <div class="weui-cell__bd">
                   {{base.taskDesc}}
                </div>
            </div>       
        </div>
        
        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line">
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__hd"><label class="weui-label">相关附件</label></div>
                <div class="weui-cell__bd wx-placeholder">
                   选择了{{attachmentData.pageData ? attachmentData.pageData.length : 0}}个附件
                </div>
            </div>
        </div>
        <attachment-show :attachment-data="attachmentData"></attachment-show>
        
        <template v-if="attachmentData.imgData.length">
            <div class="wx-area-line"></div>
            <div class="weui-cells no-margin no-line">
                <div class="weui-cell weui-cell_access">
                    <div class="weui-cell__hd"><label class="weui-label">附加图片</label></div>
                    <div class="weui-cell__bd wx-placeholder">
                       选择{{attachmentData.imgData.length}}张图片
                    </div>
                    <div class="weui-cell__ft"></div>
                </div>
            </div>
            <div class="weui-cells no-margin left-padding">
                <img-list :img-list="attachmentData.imgData"></img-list>
            </div>
        </template>

        <div class="btn-height-box"></div>
        <template v-if="isPage && editType == '1'">
            <div class="wx-bottom-nav">
                <a class="wx-nav-item-20" @click="goToChat">
                    沟通
                </a>
                <router-link class="wx-nav-item nav-blue"
                                :to="{
                                    name: 'task-report',
                                    query: {
                                        enterpriseCode: $route.query.enterpriseCode,
                                        agentId: $route.query.agentId,
                                        taskCode: $route.query.taskCode,
                                        editType: editType,
                                        taskType: 'edit'
                                    }
                                }">
                    {{textBtn}}
                </router-link>
            </div>
        </template>
        <template v-if="isPage && editType != '1'">
            <div class="weui-btn-area">
                <router-link class="weui-btn weui-btn_primary"
                                :to="{
                                    name: 'task-report',
                                    query: {
                                        enterpriseCode: $route.query.enterpriseCode,
                                        agentId: $route.query.agentId,
                                        taskCode: $route.query.taskCode,
                                        editType: editType,
                                        taskType: 'edit'
                                    }
                                }">
                    {{textBtn}}
                </router-link>
            </div>
        </template>
    </section>
</template>
<script>
import jsSdk from '../../utils/jsSdk'
import imgList from '../common/imgList.vue'
import attachmentShow from '../common/attachmentShow.vue'
import util from '../../utils/tools'
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            textBtn: '任务处理',
            isPage: false,
            base: {
                taskTitle: '',
                taskBeginTime: '',
                taskEndTime: '',
                taskDesc: '',
                pageData: [],
                partyData: [],
                taskPageEdit: {}
            },
            attachmentData: {
                sourceType: '',
                imgData: [],
                pageData: []
            }
        }
    },
    mounted () {
        jsSdk.init()
        this.getBase()
        this.getAttachments()
        if (this.$route.query.interface == 'getSendedTasks') {
            this.textBtn = '任务追踪'
        }
    },
    watch: {
        $route () {
            jsSdk.init()
            this.getBase()
            this.getAttachments()
            if (this.$route.query.interface == 'getSendedTasks') {
                this.textBtn = '任务追踪'
            }
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            userData: 'getUser'
        }),
        editType () {
            if (this.base.taskReceivers && this.base.taskReceivers.indexOf(this.userInfo.userCode) > -1 && this.userInfo.userCode == this.base.taskSender) {
                return '2'
            } else if (this.userInfo.userCode == this.base.taskSender) {
                return '0'
            } else if (this.base.taskReceivers && this.base.taskReceivers.indexOf(this.userInfo.userCode) > -1) {
                return '1'
            }
        }
    },
    methods: {
        ...mapActions([
          'setUser'
        ]),
        getBase () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                taskCode: this.$route.query.taskCode,
                taskReceiver: this.userInfo.userCode
            }

            util.request({
                method: 'get',
                interface: 'getTask',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.base = res.result.result
                    this.isPage = true

                    if (this.base.taskReceivers && this.base.taskReceivers.indexOf(this.userInfo.userCode) > -1 && this.base.taskReplyStatus != '2') {
                        this.changeTaskStatus()
                    }
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getAttachments () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                targetCode: this.$route.query.taskCode,
                targetType: 'editTask'
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
        changeTaskStatus () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                taskCode: this.$route.query.taskCode,
                taskReceiver: this.userInfo.userCode,
                taskReplyStatus: '2'
            }

            util.request({
                method: 'post',
                interface: 'changeTaskStatus',
                data: formData
            }).then(res => {})
        },
        goToChat () {
            var attData = {
                userList: [],
                userCodes: []
            }

            if (this.base.taskSender) {
                attData.userCodes.push(this.base.taskSender)
            }

            this.setUser(attData)

            var urlPath = 'http://mobile.socialmarketingcloud.com/we-chat'
                urlPath = urlPath + '?enterpriseCode=' + this.$route.query.enterpriseCode + '&agentId=' + this.$route.query.agentId + '&taskCode=' + this.$route.query.taskCode

            var pathUrl = {
                name: 'user-list',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    redirectUrl: window.encodeURIComponent(urlPath)
                }
            }
            this.$router.push(pathUrl)
        }
    },
    components: {
        imgList,
        attachmentShow
    }
}
</script>