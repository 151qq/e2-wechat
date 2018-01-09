<template>
    <section class="stop-activity-box">
        <div class="weui-cells__title">详情</div>
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
        <div class="weui-cell no-line">
            <div class="weui-uploader">
                <div class="weui-uploader__bd">
                     <ul class="weui-uploader__files" id="uploaderFiles">
                        <li class="weui-uploader__file"
                            v-for="(item, index) in commentData.attachments"
                            @click="showBigImg(index)">
                                <img :src="item">
                        </li>
                        <li @click="chooseImage" class="weui-uploader__input-box"></li>
                    </ul>
                </div>
            </div>
        </div>
        
        <!-- 附件 -->
        <div class="wx-area-line"></div>
        <div class="weui-cells__title" @click="gotoAttachment">附件</div>
        <attachment-detail :attachment-data="attachmentData"></attachment-detail>
        <a class="add-file-btn">添加附件</a>

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

export default {
    data () {
        return {
            commentData: {
                commentContent: '',
                attachments: []
            },
            nowIndex: '',
            nowPath: '',
            isShowImg: {
                value: false
            },
            serverIdList: [],
            fileList: []
        }
    },
    mounted () {
        jsSdk.init()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        ...mapGetters({
            attachmentData: 'getAttachment'
        })
    },
    methods: {
        ...mapActions([
          'setAttachment'
        ]),
        chooseImage () {
            var num = 9 - this.commentData.attachments.length
            jsSdk.chooseImage(num ,(localIds) => {
                this.commentData.attachments = this.commentData.attachments.concat(localIds).splice(0, 9)
            })
        },
        submitComment () {
            jsSdk.uploadImgs(this.commentData.attachments, (serverIdList) => {
                this.serverIdList = this.serverIdList.concat(serverIdList).splice(0, 9)
                this.submitFn()
            })
        },
        submitFn () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                eventCode: this.$route.query.eventCode,
                attachmentImgs: this.serverIdList,
                eventCancalMemo: this.commentData.commentContent
            }

            util.request({
                method: 'post',
                interface: 'publishComment',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.setAttachment({})
                    var pathUrl = {
                        name: 'attachment',
                        query: {
                            enterpriseCode: this.$route.query.enterpriseCode,
                            agentId: this.$route.query.agentId,
                            eventCode: this.$route.query.eventCode
                        }
                    }
                    this.$router.push(pathUrl)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        gotoAttachment () {
            var pathUrl = {
                name: 'attachment',
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
            this.nowPath = this.commentData.attachments[index]
            this.isShowImg.value = true
        },
        deleteImg (index) {
            this.commentData.attachments.splice(index, 1)
        }
    },
    components: {
        deleteImg,
        attachmentDetail
    }
}
</script>
<style lang="scss">
.stop-activity-box {
    background: #ffffff;

    .weui-cells {
        margin-top: 0;
    }

    .no-line {
        &:before {
            height: 0;
            border: none;
        }

        &:after, &:before {
            height: 0;
            border: none;
        }
    }

    .weui-uploader__file {
        background: #e5e5e5;
        position: relative;
        overflow: hidden;

        img {
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translate(0,-50%);
        }
    }
}
</style>