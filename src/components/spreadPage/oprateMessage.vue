<template>
    <section class="stop-activity-box">
        <div class="weui-cells weui-cells_form no-line no-margin">
            <div class="weui-cell no-line">
                <div class="weui-cell__bd">
                    <textarea class="weui-textarea"
                                placeholder="这一刻的想法..."
                                rows="3"
                                v-model="commentData.commentContent"></textarea>
                </div>
            </div>
        </div>
        <div class="weui-cells no-line no-margin">
            <div class="weui-cell no-line">
                <div class="weui-uploader">
                    <div class="weui-uploader__bd">
                         <ul class="weui-uploader__files" id="uploaderFiles">
                            <li class="weui-uploader__file"
                                v-for="(item, index) in commentData.imgData.attachmentSourceCodes"
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
        <div class="weui-cells__title">附件</div>
        <div class="weui-cells no-line">
            <attachment-detail :attachment-data="attachmentData"></attachment-detail>
            <a class="add-file-btn" @click="gotoAttachment">添加附件</a>
        </div>
        
        <div class="btn-height-box"></div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="submitComment">发布</a>
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
                attachmentTargetType: 'refuseArticle',
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
            serverIdList: []
        }
    },
    mounted () {
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
            formData.pageCode = this.$route.query.pageCode
            formData.userCode = this.userInfo.userCode
            formData.taskCode = this.$route.query.taskCode
            formData.imgData.attachmentSourceCodes = this.serverIdList
            formData.pageData.attachmentSourceType = this.attachmentData.targetType
            formData.pageData.attachmentSourceCodes = this.attachmentData.attachmentCodes
            formData.url = window.decodeURIComponent(this.$route.query.url)

            var interfaceName = 'html5PageRefuseSubmit'

            var opt = this.$route.query.opt
            if (opt == 'close') {
                interfaceName = 'undercarriagePage'

                if (!this.attachmentData.attachmentCodes || !this.attachmentData.attachmentCodes.length) {
                    this.$message({
                      showClose: true,
                      message: '请选择替代文章！',
                      type: 'warning'
                    })

                    return false
                }
            }

            if (opt == 'commentClose') {
                interfaceName = 'manageComment'
                formData.pageCommentOpt = '0'
            }

            if (opt == 'commentOn') {
                interfaceName = 'manageComment'
                formData.pageCommentOpt = '1'
            }

            util.request({
                method: 'post',
                interface: interfaceName,
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

            var pathName = 'article-attachment'
            var opt = this.$route.query.opt

            if (opt == 'commentClose') {
                pathName = 'attachment-list'
            }

            if (opt == 'commentOn') {
                pathName = 'attachment-list'
            }

            var pathUrl = {
                name: pathName,
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    redirectUrl: window.encodeURIComponent(window.location.href)
                }
            }

            if (opt == 'close') {
                pathUrl.query.number = 'unique'
                pathUrl.query.type = 'submit'
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