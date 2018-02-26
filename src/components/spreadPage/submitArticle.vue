<template>
    <section class="stop-activity-box show-message-box">
        <div class="height-1"></div>
        <group class="no-margin" label-width="105px">
            <selector title="文章情绪"
                    placeholder="请选择"
                    :options="tagList.content_emotion"
                    :value-map="valueMap"
                    v-model="commentData.contentEmotion"></selector>
            <selector title="文章调性"
                      placeholder="请选择"
                      :value-map="valueMap"
                      :options="tagList.content_tonality"
                      v-model="commentData.contentTonality"></selector>
            <selector title="文章态度"
                    placeholder="请选择"
                    :options="tagList.content_attribute"
                    :value-map="valueMap"
                    v-model="commentData.contentAttribute"></selector>
            <selector title="传播模型"
                      placeholder="请选择"
                      :value-map="valueMap"
                      :options="tagList.content_promotion"
                      v-model="commentData.contentPromotion"></selector>
            <selector title="文章模型"
                    placeholder="请选择"
                    :options="tagList.content_style"
                    :value-map="valueMap"
                    v-model="commentData.contentStyle"></selector>
            <selector title="文章题材"
                      placeholder="请选择"
                      :value-map="valueMap"
                      :options="tagList.content_type"
                      v-model="commentData.contentType"></selector>
            <selector title="文章思想"
                      placeholder="请选择"
                      :value-map="valueMap"
                      :options="tagList.content_politics"
                      v-model="commentData.contentPolitics"></selector>
        </group>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line">
            <div class="weui-cell weui-cell_access" @click="gotoAttachment">
                <div class="weui-cell__hd"><label class="weui-label">推荐阅读</label></div>
                <div class="weui-cell__bd wx-placeholder">
                   已经选择了{{attachmentData.attachmentList ? attachmentData.attachmentList.length : 0}}个推荐
                </div>
                <div class="weui-cell__ft">
                    <span class="add-btn-icon"></span>
                </div>
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
import { Group, Selector} from 'vux'

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
            valueMap: ['tagValue', 'tagValueCname'],
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
                    type: 'submit',
                    redirectUrl: window.encodeURIComponent(window.location.href)
                }
            }
            this.$router.push(pathUrl)
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