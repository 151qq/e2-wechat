<template>
    <section class="stop-activity-box">
        <div class="height-1"></div>
        <group title="内容" label-width="105px">
            <selector title="文章情绪"
                    placeholder="请选择"
                    :options="tagList.content_emotion"
                    :value-map="valueMap"
                    v-model="commentData.commentEmotion"></selector>
            <selector title="文章调性"
                      placeholder="请选择"
                      :value-map="valueMap"
                      :options="tagList.content_emotion"
                      v-model="commentData.commentAction"></selector>
            <selector title="文章态度"
                    placeholder="请选择"
                    :options="tagList.content_emotion"
                    :value-map="valueMap"
                    v-model="commentData.commentEmotion"></selector>
            <selector title="传播模型"
                      placeholder="请选择"
                      :value-map="valueMap"
                      :options="tagList.content_emotion"
                      v-model="commentData.commentAction"></selector>
            <selector title="文章模型"
                    placeholder="请选择"
                    :options="tagList.content_emotion"
                    :value-map="valueMap"
                    v-model="commentData.commentEmotion"></selector>
            <selector title="文章题材"
                      placeholder="请选择"
                      :value-map="valueMap"
                      :options="tagList.content_emotion"
                      v-model="commentData.commentAction"></selector>
            <selector title="文章思想"
                      placeholder="请选择"
                      :value-map="valueMap"
                      :options="tagList.content_emotion"
                      v-model="commentData.commentAction"></selector>
        </group>
        
        <!-- 附件 -->
        <div class="weui-cells__title">推荐阅读</div>
        <div class="weui-cells no-line">
            <attachment-detail :attachment-data="attachmentData"></attachment-detail>
            <a class="add-file-btn" @click="gotoAttachment">添加</a>
        </div>
        
        <div class="btn-height-box"></div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="submitComment">发布文章</a>
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
import { Group, Selector} from 'vux'

export default {
    data () {
        return {
            commentData: {
                commentEmotion: '',
                commentAction: '',
                attachmentTargetType: 'taskComment',
                commentContent: '',
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
            serverIdList: [],
            valueMap: ['tagValue', 'tagValueCname'],
            tagList: {
                content_emotion: []
            }
        }
    },
    mounted () {
        if (this.detailData.attachmentTargetType) {
            this.commentData = Object.assign({}, this.detailData)
        }

        this.getTags()
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
            var num = 9 - this.commentData.imgData.attachmentSourceCodes.length
            jsSdk.chooseImage(num ,(localIds) => {
                this.commentData.imgData.attachmentSourceCodes = this.commentData.imgData.attachmentSourceCodes.concat(localIds).splice(0, 9)
            })
        },
        submitComment () {
            jsSdk.uploadImgs(this.commentData.imgData.attachmentSourceCodes, (serverIdList) => {
                this.serverIdList = this.serverIdList.concat(serverIdList).splice(0, 9)
                this.submitFn()
            })
        },
        submitFn () {
            var formData = Object.assign({}, this.commentData)
            formData.enterpriseCode = this.$route.query.enterpriseCode
            formData.agentId = this.$route.query.agentId
            formData.userCode = this.userInfo.userCode
            formData.taskCode = this.$route.query.taskCode
            formData.imgData.attachmentSourceCodes = this.serverIdList
            formData.pageData.attachmentSourceType = this.attachmentData.targetType
            formData.pageData.attachmentSourceCodes = this.attachmentData.attachmentCodes

            util.request({
                method: 'post',
                interface: 'saveTaskReportComment',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.setDetail({})
                    this.setAttachment({})
                    var pathUrl = {
                        name: 'task-list',
                        query: {
                            enterpriseCode: this.$route.query.enterpriseCode,
                            agentId: this.$route.query.agentId
                        }
                    }
                    this.$router.push(pathUrl)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getTags () {
            util.request({
                method: 'get',
                interface: 'selectAllTagDef',
                data: {}
            }).then(res => {
                if (res.result.success == '1') {
                    this.tagList = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        gotoAttachment () {
            this.setDetail(Object.assign({}, this.commentData))

            var pathUrl = {
                name: 'article-attachment',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    redirectUrl: window.encodeURIComponent(window.location.href)
                }
            }
            this.$router.push(pathUrl)
        },
        showBigImg (index) {
            this.nowIndex = index
            this.nowPath = this.commentData.imgData.attachmentSourceCodes[index]
            this.isShowImg.value = true
        },
        deleteImg (index) {
            this.commentData.imgData.attachmentSourceCodes.splice(index, 1)
        }
    },
    components: {
        deleteImg,
        attachmentDetail,
        Group,
        Selector
    }
}
</script>