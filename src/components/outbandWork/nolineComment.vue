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
                {{base.memberWechatNickname}}
            </div>
        </div>

        <div class="weui-cells no-margin show-message-box">
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">外呼结果</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            v-model="formData.outbandResult">
                        <option
                            v-for="(item, index) in selectList.result" :key="index"
                            :value="item.key">
                            {{item.value}}
                        </option>
                    </select>
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>

            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">外呼方式</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            v-model="formData.outbandRealType">
                        <option
                            v-for="(item, index) in selectList.type" :key="index"
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
                <div class="weui-cell__hd"><label class="weui-label">外呼备忘</label></div>
                <div class="weui-cell__bd">
                   <textarea class="weui-textarea"
                        placeholder="请输入文字"
                        :rows="formData.outbandMemo ? 3 : 1"
                        v-model="formData.outbandMemo"></textarea>
                </div>
            </div>
        </div>
        
        <template v-if="formData.outbandResult == '1'">
            <div class="wx-area-line"></div>
            <div class="weui-cells no-margin no-line">
                <div class="weui-cell weui-cell_access" @click="gotoAttachment">
                    <div class="weui-cell__hd"><label class="weui-label">新增预约</label></div>
                    <div class="weui-cell__bd wx-placeholder">
                       请选择一个新预约
                    </div>
                    <div class="weui-cell__ft"></div>
                </div>
            </div>
            <attachment-detail :attachment-data="attachmentData"></attachment-detail>
        </template>

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
                                v-for="(item, index) in formData.imgData.localIds"
                                @click="showBigImg(index)">
                                    <img :src="item">
                            </li>
                            <li @click="chooseImage"
                                v-if="formData.imgData.localIds.length < 9"
                                class="weui-uploader__input-box"></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line show-message-box">
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">客户性别</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            v-model="formData.gender">
                        <option value=""></option>
                        <option
                            v-for="(item, index) in tagList.gender" :key="index"
                            :value="item.tagValue">
                            {{item.tagValueCname}}
                        </option>
                    </select>
                </div>
            </div>

            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">客户年龄</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            v-model="formData.age">
                        <option value=""></option>
                        <option
                            v-for="(item, index) in tagList.age" :key="index"
                            :value="item.tagValue">
                            {{item.tagValueCname}}
                        </option>
                    </select>
                </div>
            </div>

            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">教育背景</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            v-model="formData.education">
                        <option value=""></option>
                        <option
                            v-for="(item, index) in tagList.education" :key="index"
                            :value="item.tagValue">
                            {{item.tagValueCname}}
                        </option>
                    </select>
                </div>
            </div>

            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">消费能力</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            v-model="formData.consumeLevel">
                        <option value=""></option>
                        <option
                            v-for="(item, index) in tagList.consume_level" :key="index"
                            :value="item.tagValue">
                            {{item.tagValueCname}}
                        </option>
                    </select>
                </div>
            </div>

            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">消费决策</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            v-model="formData.consumeDecisionType">
                        <option value=""></option>
                        <option
                            v-for="(item, index) in tagList.consume_decision_type" :key="index"
                            :value="item.tagValue">
                            {{item.tagValueCname}}
                        </option>
                    </select>
                </div>
            </div>

            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">导购特征</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            v-model="formData.shoppingGuide">
                        <option value=""></option>
                        <option
                            v-for="(item, index) in tagList.shopping_guide" :key="index"
                            :value="item.tagValue">
                            {{item.tagValueCname}}
                        </option>
                    </select>
                </div>
            </div>

            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">客户职业</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            v-model="formData.careerType">
                        <option value=""></option>
                        <option
                            v-for="(item, index) in tagList.career_type" :key="index"
                            :value="item.tagValue">
                            {{item.tagValueCname}}
                        </option>
                    </select>
                </div>
            </div>

            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">工作单位</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            v-model="formData.unitType">
                        <option value=""></option>
                        <option
                            v-for="(item, index) in tagList.unit_type" :key="index"
                            :value="item.tagValue">
                            {{item.tagValueCname}}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        
        <div class="btn-height-box"></div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="submitFn">提交</a>
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
                memberCode: '',
                memberWechatNickname: '',
                memberReferCode: '',
                outbandRealType: ''
            },
            formData: {
                outbandResult: '',
                outbandRealType: '',
                enterpriseCode: '',
                outbandWorkCode: '',
                outbandRealTime: '',
                outbandRealTimeD: '',
                reserveCode: '',
                pipelineCode: '',
                age: '',
                consumeDecisionType: '',
                consumeLevel: '',
                education: '',
                gender: '',
                shoppingGuide: '',
                careerType: '',
                unitType: '',
                attachmentTargetType: 'nolineJob',
                attachmentTargetCode: '',
                outbandMemo: '',
                imgData: {
                    localIds: [],
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
            selectList: {
                result: [],
                type: []
            },
            tagList: {
                age: [],
                consume_decision_type: [],
                consume_level: [],
                education: [],
                gender: [],
                shopping_guide: [],
                career_type: [],
                unit_type: []
            }
        }
    },
    mounted () {
        this.coverImg = '/static/images/B' + Math.ceil(Math.random() * 13) + '.jpg'
        jsSdk.init()
        if (this.detailData.attachmentTargetType) {
            this.formData = Object.assign({}, this.detailData)

            setTimeout(() => {
                this.formData.outbandRealTimeD = this.detailData.outbandRealTimeD
            }, 0)
        }
        this.getData()
        this.getSelectOut()
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
            jsSdk.chooseImage((localId ,serverId) => {
                this.formData.imgData.localIds.push(localId)
                this.formData.imgData.attachmentSourceCodes.push(serverId)
            })
        },
        submitFn () {
            if (this.formData.outbandRealTimeD) {
                this.formData.outbandRealTime = util.formatDate(this.formData.outbandRealTimeD, 'yyyy-MM-dd hh:mm:ss')
            }

            var formData = Object.assign({}, this.formData)
            formData.outbandWorkType = this.$route.query.outbandWorkType
            formData.userCode = this.userInfo.userCode
            formData.memberCode = this.base.memberCode
            formData.enterpriseCode = this.$route.query.enterpriseCode
            formData.agentId = this.$route.query.agentId
            formData.outbandWorkCode = this.$route.query.outbandWorkCode
            formData.pipelineCode = this.$route.query.pipelineCode
            formData.attachmentTargetCode = this.$route.query.outbandWorkCode
            formData.reserveCode = this.attachmentData.attachmentCodes[0]
            // formData.pageData.attachmentSourceType = this.attachmentData.targetType
            // formData.pageData.attachmentSourceCodes = this.attachmentData.attachmentCodes

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
                            outbandWorkCode: this.$route.query.outbandWorkCode
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
            this.setDetail(Object.assign({}, this.formData))

            var pathUrl = {
                name: 'reserve-attachment',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    targetType: 'attachmen_type_6',
                    type: 'unique'
                }
            }
            this.$router.push(pathUrl)
        },
        showBigImg (index) {
            this.nowIndex = index
            this.nowPath = this.formData.imgData.localIds[index]
            this.isShowImg.value = true
        },
        deleteImg (index) {
            this.formData.imgData.attachmentSourceCodes.splice(index, 1)
            this.formData.imgData.localIds.splice(index, 1)
        }
    },
    components: {
        deleteImg,
        attachmentDetail
    }
}
</script>