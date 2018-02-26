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
        
        <div class="weui-cells" v-if="base.taskPageEdit">
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
                   选择了{{attachmentData.attachmentList ? attachmentData.attachmentList.length : 0}}个附件
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

        <div class="wx-area-line"></div>
        <div class="wx-area-padding">
            <comment-show :comment-url="'edit-comment'" :text-title="textTitle" :is-edit="true"></comment-show>
        </div>

        <!-- <div class="btn-height-box"></div>
        <div class="wx-bottom-nav">
            <router-link class="wx-nav-item"
                            :to="{name: 'marketPacket'}">
                红包
            </router-link>
            <router-link class="wx-nav-item"
                            :to="{}">
                研讨
            </router-link>
            <router-link class="wx-nav-item-30"
                            :to="{name: 'comment-chat'}">
                未读汇报（2）
            </router-link>
            <router-link class="wx-nav-item"
                            :to="{name: 'marketPacket'}">
                发表意见
            </router-link>
        </div> -->
    </section>
</template>
<script>
import jsSdk from '../../utils/jsSdk'
import imgList from '../common/imgList.vue'
import commentShow from './commentShow.vue'
import attachmentShow from '../common/attachmentShow.vue'
import util from '../../utils/tools'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
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
            },
            textTitle: '任务汇报'
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
        })
    },
    methods: {
        getBase () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                taskCode: this.$route.query.taskCode
            }

            util.request({
                method: 'get',
                interface: 'getTask',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.base = res.result.result
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
        }
    },
    components: {
        imgList,
        commentShow,
        attachmentShow
    }
}
</script>