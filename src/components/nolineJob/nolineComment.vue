<template>
    <section class="member-detail-box">
        <div class="wx-area-img">
            <img :src="coverImg">
        </div>
        <div class="avatar-box">
            <div class="img-box">
                <img :src="base.memberImage">
            </div>
            <div class="name-box">
                {{base.memberWechatNickname + '-' + base.memberMobile}}
            </div>
        </div>
        <section class="weui-cells weui-cells_form">
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">外呼结果</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" v-model="formData.outbandResult">
                        <option v-for="(item, index) in selectList.result"
                                :value="item.value">{{item.label}}</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">外呼方式</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" v-model="formData.outbandRealType">
                        <option v-for="(item, index) in selectList.type"
                                :value="item.value">{{item.label}}</option>
                    </select>
                </div>
            </div>
        </section>
        <div class="weui-cells__title">外呼备忘</div>
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
        <div class="weui-cells__title">预约记录</div>
        <div class="weui-cells no-line">
            <attachment-detail :attachment-data="attachmentData"></attachment-detail>
            <a class="add-file-btn" @click="gotoAttachment">添加</a>
        </div>

        <div class="weui-cells__title">客户洞察</div>
        <section class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">客户姓名</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" placeholder="请输入">
                </div>
            </div>
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">客户性别</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" name="select2">
                        <option value="0">男</option>
                        <option value="1">女</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">客户年龄</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" name="select2">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">教育背景</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" name="select2">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">消费能力</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" name="select2">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">消费决策</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" name="select2">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">导购特征</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" name="select2">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">客户职业</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" name="select2">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">工作单位</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" name="select2">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </div>
        </section>
        
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

export default {
    data () {
        return {
            coverImg: '',
            base: {
                memberImage: '',
                memberMobile: '',
                memberWechatNickname: '',
                memberReferCode: '',
                outbandRealType: ''
            },
            formData: {
                outbandResult: '',
                outbandRealType: '',
                enterpriseCode: '',
                outbandCode: '',
                reserve_code: ''
            },
            commentData: {
                attachmentTargetType: 'nolineJob',
                attachmentTargetCode: '',
                commentContent: '',
                imgData: {
                    attachmentSourceType: 'attachmen_type_1',
                    attachmentSourceCodes: []
                },
                pageData: {
                    attachmentSourceType: 'attachmen_type_6',
                    attachmentSourceCodes: []
                }
            },
            nowIndex: '',
            nowPath: '',
            isShowImg: {
                value: false
            },
            serverIdList: [],
            selectList: {
                result: [],
                type: []
            }
        }
    },
    mounted () {
        this.coverImg = '/static/images/B' + Math.ceil(Math.random() * 13) + '.jpg'
        jsSdk.init()
        if (this.detailData.attachmentTargetType) {
            this.formData = Object.assign({}, this.detailData)
        }
        this.getData()
        this.getSelectOut()
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
            var commentData = Object.assign({}, this.commentData)
            commentData.enterpriseCode = this.$route.query.enterpriseCode
            commentData.agentId = this.$route.query.agentId
            commentData.attachmentTargetCode = this.$route.query.outbandCode
            commentData.imgData.attachmentSourceCodes = this.serverIdList
            commentData.pageData.attachmentSourceType = this.attachmentData.targetType
            commentData.pageData.attachmentSourceCodes = this.attachmentData.attachmentCodes

            var formData = Object.assign( this.formData, commentData)

            util.request({
                method: 'post',
                interface: 'outBandWorkMange',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.setDetail({})
                    this.setAttachment({})
                    var pathUrl = {
                        name: 'noline-detail',
                        query: {
                            enterpriseCode: this.$route.query.enterpriseCode,
                            agentId: this.$route.query.agentId,
                            outbandCode: this.$route.query.outbandCode
                        }
                    }
                    this.$router.replace(pathUrl)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getData () {
            var formData = {
                outbandWorkCode: this.$route.query.outbandWorkCode
            }

            util.request({
                method: 'get',
                interface: 'selectOutBandWork',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.base = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getSelectOut () {
            util.request({
                method: 'get',
                interface: 'mangeReady',
                data: {}
            }).then(res => {
                if (res.result.success == '1') {
                    this.selectList = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        gotoAttachment () {
            var pathUrl = {
                name: 'reserve-attachment',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    targetType: 'attachmen_type_6',
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
        attachmentDetail
    }
}
</script>