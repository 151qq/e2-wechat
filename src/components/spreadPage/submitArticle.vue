<template>
    <section class="stop-activity-box">
        <div class="height-1"></div>
        <div class="weui-cells no-margin show-message-box">
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">文章情绪</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            v-model="commentData.contentEmotion">
                        <option value=""></option>
                        <option
                            v-for="(item, index) in tagList.content_emotion" :key="index"
                            :value="item.tagValue">
                            {{item.tagValueCname}}
                        </option>
                    </select>
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>

            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">文章调性</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            v-model="commentData.contentTonality">
                        <option value=""></option>
                        <option
                            v-for="(item, index) in tagList.content_tonality" :key="index"
                            :value="item.tagValue">
                            {{item.tagValueCname}}
                        </option>
                    </select>
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>

            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">文章态度</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            v-model="commentData.contentAttribute">
                        <option value=""></option>
                        <option
                            v-for="(item, index) in tagList.content_attribute" :key="index"
                            :value="item.tagValue">
                            {{item.tagValueCname}}
                        </option>
                    </select>
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>

            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">文章文风</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            v-model="commentData.contentStyle">
                        <option value=""></option>
                        <option
                            v-for="(item, index) in tagList.content_style" :key="index"
                            :value="item.tagValue">
                            {{item.tagValueCname}}
                        </option>
                    </select>
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>

            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">文章题材</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            v-model="commentData.contentType">
                        <option value=""></option>
                        <option
                            v-for="(item, index) in tagList.content_type" :key="index"
                            :value="item.tagValue">
                            {{item.tagValueCname}}
                        </option>
                    </select>
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>

            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">文章思想</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            v-model="commentData.contentPolitics">
                        <option value=""></option>
                        <option
                            v-for="(item, index) in tagList.content_politics" :key="index"
                            :value="item.tagValue">
                            {{item.tagValueCname}}
                        </option>
                    </select>
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>
        </div>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin">
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">传播模型</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            v-model="commentData.contentPromotion">
                        <option value=""></option>
                        <option
                            v-for="(item, index) in tagList.content_promotion" :key="index"
                            :value="item.tagValue">
                            {{item.tagValueCname}}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line">
            <div class="weui-cell weui-cell_access" @click="gotoAttachment">
                <div class="weui-cell__hd"><label class="weui-label">推荐阅读</label></div>
                <div class="weui-cell__bd wx-placeholder">
                   已经选择了{{attachmentData.attachmentList ? attachmentData.attachmentList.length : 0}}个推荐
                </div>
                <div class="weui-cell__ft"></div>
            </div>
        </div>
        <attachment-detail :attachment-data="attachmentData"></attachment-detail>
        
        <div class="btn-height-box"></div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="submitFn">发布文章</a>
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import deleteImg from '../common/deleteImg.vue'
import attachmentDetail from '../common/attachmentDetail.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            commentData: {
                contentEmotion: '',
                contentTonality: '',
                contentAttribute: '',
                contentPromotion: '',
                contentStyle: '',
                contentType: '',
                contentPolitics: '',
                extentsPageCodes: []
            },
            tagList: {
                content_emotion: [],
                content_type: [],
                content_politics: [],
                content_style: [],
                content_promotion: [],
                content_attribute: [],
                content_tonality: []
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
        submitFn () {
            if (!this.commentData.contentEmotion) {
                this.$message({
                    message: '请选择文章情绪!',
                    type: 'warning'
                })
                return false
            }

            if (!this.commentData.contentTonality) {
                this.$message({
                    message: '请选择文章调性!',
                    type: 'warning'
                })
                return false
            }

            if (!this.commentData.contentAttribute) {
                this.$message({
                    message: '请选择文章态度!',
                    type: 'warning'
                })
                return false
            }

            if (!this.commentData.contentStyle) {
                this.$message({
                    message: '请选择文章文风!',
                    type: 'warning'
                })
                return false
            }

            if (!this.commentData.contentType) {
                this.$message({
                    message: '请选择文章题材!',
                    type: 'warning'
                })
                return false
            }

            if (!this.commentData.contentPolitics) {
                this.$message({
                    message: '请选择文章思想!',
                    type: 'warning'
                })
                return false
            }

            var formData = Object.assign({}, this.commentData)
            formData.enterpriseCode = this.$route.query.enterpriseCode
            formData.agentId = this.$route.query.agentId
            formData.userCode = this.userInfo.userCode
            formData.pageCode = this.$route.query.pageCode
            formData.extentsPageCodes = this.attachmentData.attachmentCodes
            formData.url = window.decodeURIComponent(this.$route.query.url)

            util.request({
                method: 'post',
                interface: 'html5PageSubmit',
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
                    type: 'submit'
                }
            }
            this.$router.push(pathUrl)
        }
    },
    components: {
        deleteImg,
        attachmentDetail
    }
}
</script>