<template>
    <section class="stop-activity-box">
        <div class="height-1"></div>
        <div class="weui-cells no-margin no-line show-message-box">
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">评论情绪</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select" name="select1"
                            v-model="commentData.commentEmotion">
                        <option
                            v-for="(item, index) in contentEmotionList" :key="index"
                            :value="item.key">
                            {{item.value}}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        
        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line show-message-box">
            <div class="weui-cell weui-cell_access no-center">
                <div class="weui-cell__hd"><label class="weui-label">评论内容</label></div>
                <div class="weui-cell__bd">
                   <textarea class="weui-textarea"
                        placeholder="请输入文字"
                        :rows="commentData.commentContent ? 3 : 1"
                        v-model="commentData.commentContent"></textarea>
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
                                v-for="(item, index) in commentData.imgData.localIds"
                                @click="showBigImg(index)">
                                    <img :src="item">
                            </li>
                            <li @click="chooseImage"
                                v-if="commentData.imgData.localIds.length < 9"
                                class="weui-uploader__input-box"></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="btn-height-box"></div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="submitFn">发布</a>
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

export default {
    data () {
        return {
            commentData: {
                commentEmotion: '1',
                attachmentTargetType: 'articleComment',
                commentContent: '',
                imgData: {
                    localIds: [],
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
            contentEmotionList: [
                {
                    key: '1',
                    value: '正面'
                },
                {
                    key: '0',
                    value: '负面'
                },
                {
                    key: '2',
                    value: '中性'
                }
            ]
        }
    },
    mounted () {
        jsSdk.init()
        if (this.detailData.attachmentTargetType) {
            this.commentData = Object.assign({}, this.detailData)
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
            jsSdk.chooseImage((localId ,serverId) => {
                this.commentData.imgData.localIds.push(localId)
                this.commentData.imgData.attachmentSourceCodes.push(serverId)
            })
        },
        submitFn () {
            var formData = Object.assign({}, this.commentData)
            formData.enterpriseCode = this.$route.query.enterpriseCode
            formData.agentId = this.$route.query.agentId
            formData.userCode = this.userInfo.userCode
            formData.pageCode = this.$route.query.pageCode
            formData.commentType = this.$route.query.commentType,
            formData.commentReplyCode = this.$route.query.commentReplyCode
            formData.memberCode = this.userInfo.userCode
            formData.pageData.attachmentSourceType = this.attachmentData.targetType
            formData.pageData.attachmentSourceCodes = this.attachmentData.attachmentCodes

            util.request({
                method: 'post',
                interface: 'replyComment',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.setDetail({})
                    this.setAttachment({})
                    
                    var pathUrl = util.formDataUrl(window.decodeURIComponent(this.$route.query.url))
                    this.$router.replace(pathUrl)
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
                    pageCode: this.$route.query.pageCode,
                    type: 'submit'
                }
            }
            this.$router.push(pathUrl)
        },
        showBigImg (index) {
            this.nowIndex = index
            this.nowPath = this.commentData.imgData.localIds[index]
            this.isShowImg.value = true
        },
        deleteImg (index) {
            this.commentData.imgData.localIds.splice(index, 1)
            this.commentData.imgData.attachmentSourceCodes.splice(index, 1)
        }
    },
    components: {
        deleteImg,
        attachmentDetail
    }
}
</script>