<template>
    <section class="member-detail-box show-message-box">
        <div class="height-1"></div>
        <group class="no-margin" label-width="105px">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">预约人</div>
                <div class="weui-cell__ft">{{base.reserverName}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">预约手机</div>
                <div class="weui-cell__ft">{{base.reserverMobile}}</div>
            </div>
            <selector title="接待结果"
                      placeholder="请选择"
                      :value-map="scenarioMap"
                      :options="selectList"
                      v-model="formData.receptionResult"></selector>

            <template v-if="['2','6','7'].indexOf(formData.receptionResult) > -1">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">开始时间</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="datetime-local" v-model="formData.receptionBeginTime">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">结束时间</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="datetime-local" v-model="formData.receptionEndTime">
                    </div>
                </div>
            </template>

            <template v-if="['5'].indexOf(formData.receptionResult) > -1">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">取消时间</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="datetime-local" v-model="formData.reserveUpdateTime">
                    </div>
                </div>
            </template>

            <template v-if="['4'].indexOf(formData.receptionResult) > -1">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">更新时间</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="datetime-local" v-model="formData.reserveUpdateTime">
                    </div>
                </div>
            </template>
        </group>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line">
            <div class="weui-cell weui-cell_access no-center">
                <div class="weui-cell__hd"><label class="weui-label">接待备忘</label></div>
                <div class="weui-cell__bd">
                   <textarea class="weui-textarea"
                        placeholder="请输入"
                        :rows="formData.receptionMemo ? 3 : 1"
                        v-model="formData.receptionMemo"></textarea>
                </div>
            </div>       
        </div>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line">
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
                                v-for="(item, index) in formData.imgData.attachmentSourceCodes"
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
        <!-- <div class="weui-cells__title">体验产品</div>
        <div class="weui-cells no-line">
            <attachment-detail :attachment-data="attachmentData"></attachment-detail>
            <a class="add-file-btn" @click="gotoAttachment">添加</a>
        </div> -->
        
        <!-- 附件 -->
        <template v-if="['4'].indexOf(formData.receptionResult) > -1">
            <div class="wx-area-line"></div>
            <div class="weui-cells no-margin no-line">
                <div class="weui-cell weui-cell_access" @click="gotoAttachment">
                    <div class="weui-cell__hd"><label class="weui-label">新增预约</label></div>
                    <div class="weui-cell__bd wx-placeholder">
                       请添加一个新预约
                    </div>
                    <div class="weui-cell__ft">
                        <span class="add-btn-icon"></span>
                    </div>
                </div>
            </div>
            <attachment-detail :attachment-data="attachmentData"></attachment-detail>
        </template>
        
        <div class="wx-area-line"></div>
        <group class="no-margin" label-width="105px">
            <x-input title="客户姓名"
                     v-model="formData.name"
                     placeholder="请输入"></x-input>
            <selector title="客户性别"
                      placeholder="请选择"
                      :value-map="valueMap"
                      :options="tagList.gender"
                      v-model="formData.gender"></selector>
            <selector title="客户年龄"
                      placeholder="请选择"
                      :value-map="valueMap"
                      :options="tagList.age"
                      v-model="formData.age"></selector>
            <selector title="教育背景"
                      placeholder="请选择"
                      :value-map="valueMap"
                      :options="tagList.education"
                      v-model="formData.education"></selector>
            <selector title="消费能力"
                      placeholder="请选择"
                      :value-map="valueMap"
                      :options="tagList.consume_level"
                      v-model="formData.consumeLevel"></selector>
            <selector title="消费决策"
                      placeholder="请选择"
                      :value-map="valueMap"
                      :options="tagList.consume_decision_type"
                      v-model="formData.consumeDecisionType"></selector>
            <selector title="导购特征"
                      placeholder="请选择"
                      :value-map="valueMap"
                      :options="tagList.shopping_guide"
                      v-model="formData.shoppingGuide"></selector>
            <selector title="客户职业"
                      placeholder="请选择"
                      :value-map="valueMap"
                      :options="tagList.career_type"
                      v-model="formData.careerType"></selector>
            <selector title="工作单位"
                      placeholder="请选择"
                      :value-map="valueMap"
                      :options="tagList.unit_type"
                      v-model="formData.unitType"></selector>
        </group>
        
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
import { Group, XInput, Datetime, Selector } from 'vux'

export default {
    data () {
        return {
            base: {
                reserverName: '',
                reserverMobile: ''
            },
            formData: {
                reserveCode: '',
                reserverName: '',
                reserverMobile: '',
                enterpriseCode: '',
                receptionResult: '',
                receptionEndTime: '',
                receptionBeginTime: '',
                reserveUpdateTime: '',
                receptionMemo: '',
                name: '',
                age: '',
                consumeDecisionType: '',
                consumeLevel: '',
                education: '',
                gender: '',
                shoppingGuide: '',
                careerType: '',
                unitType: '',
                attachmentTargetType: 'reception',
                attachmentTargetCode: '',
                imgData: {
                    attachmentSourceType: 'attachmen_type_1',
                    attachmentSourceCodes: []
                },
                pageData: {
                    attachmentSourceType: 'attachmen_type_5',
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
            scenarioMap: ['key', 'value'],
            selectList: [],
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
        jsSdk.init()
        if (this.detailData.attachmentTargetType) {
            this.formData = Object.assign({}, this.detailData)

            setTimeout(() => {
                this.formData.receptionEndTime = this.detailData.receptionEndTime
                this.formData.receptionBeginTime = this.detailData.receptionBeginTime
                this.formData.reserveUpdateTime = this.detailData.reserveUpdateTime
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
            var num = 9 - this.formData.imgData.attachmentSourceCodes.length
            jsSdk.chooseImage(num ,(localIds) => {
                this.formData.imgData.attachmentSourceCodes = this.formData.imgData.attachmentSourceCodes.concat(localIds).splice(0, 9)
            })
        },
        submitComment () {
            if (this.formData.receptionResult == '4' && !this.attachmentData.attachmentCodes.length) {
                this.$message.error('必须选择一个新预约！')
                return false
            }

            jsSdk.uploadImgs(this.formData.imgData.attachmentSourceCodes, (serverIdList) => {
                this.serverIdList = this.serverIdList.concat(serverIdList).splice(0, 9)
                this.submitFn()
            })
        },
        submitFn () {
            var formData = Object.assign({}, this.formData)
            formData.userCode = this.userInfo.userCode
            formData.enterpriseCode = this.$route.query.enterpriseCode
            formData.agentId = this.$route.query.agentId
            formData.imgData.attachmentSourceCodes = this.serverIdList
            formData.reserveCode = this.$route.query.reserveCode
            formData.attachmentTargetCode = this.$route.query.reserveCode
            if (this.attachmentData.attachmentCodes.length) {
                formData.reserveNext = this.attachmentData.attachmentCodes[0]
            }
            // formData.pageData.attachmentSourceType = this.attachmentData.targetType
            // formData.pageData.attachmentSourceCodes = this.attachmentData.attachmentCodes

            util.request({
                method: 'post',
                interface: 'updateResponseReserveInfo',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.setDetail({})
                    this.setAttachment({})
                    var pathUrl = {
                        name: 'reserve-detail',
                        query: {
                            enterpriseCode: this.$route.query.enterpriseCode,
                            agentId: this.$route.query.agentId,
                            reserveCode: this.$route.query.reserveCode
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
                enterpriseCode: this.$route.query.enterpriseCode,
                reserveCode: this.$route.query.reserveCode
            }

            util.request({
                method: 'get',
                interface: 'selectAll',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.base = res.result.result.reserveInfo
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getSelectOut () {
            util.request({
                method: 'get',
                interface: 'listResponseReserveInfo',
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
                    type: 'unique',
                    redirectUrl: window.encodeURIComponent(window.location.href)
                }
            }
            this.$router.push(pathUrl)
        },
        showBigImg (index) {
            this.nowIndex = index
            this.nowPath = this.formData.imgData.attachmentSourceCodes[index]
            this.isShowImg.value = true
        },
        deleteImg (index) {
            this.formData.imgData.attachmentSourceCodes.splice(index, 1)
        }
    },
    components: {
        deleteImg,
        attachmentDetail,
        Group,
        XInput,
        Selector,
        Datetime
    }
}
</script>