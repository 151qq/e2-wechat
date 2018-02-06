<template>
    <section class="member-detail-box">
        <div class="height-1"></div>
        <group title="基本信息" label-width="105px">
            <x-input title="任务标题"
                     v-model="formData.taskTitle"
                     placeholder="请输入文字"></x-input>
            <!-- <datetime title="开始时间"
                      v-model="formData.taskBeginTime"
                      format="YYYY-MM-DD HH:mm:00"
                      placeholder="请填写时间"
                      value-text-align="left"></datetime>
            <datetime title="结束时间"
                      v-model="formData.taskEndTime"
                      format="YYYY-MM-DD HH:mm:00"
                      placeholder="请填写时间"
                      value-text-align="left"></datetime> -->

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">开始时间</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="datetime-local" v-model="formData.taskBeginTime">
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">结束时间</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="datetime-local" v-model="formData.taskEndTime">
                </div>
            </div>
            
            <x-number title="文章数量"
                      align="left"
                      v-model="formData.pageNum"
                      button-style="round"
                      :min="0"></x-number>
            <selector title="写作目的"
                      placeholder="请选择"
                      :value-map="scenarioMap"
                      :options="scenarioList"
                      v-model="formData.pageScenario"></selector>
        </group>
        
        <template v-if="['XPTJ', 'CPCX'].indexOf(formData.pageScenario) > -1">
            <div class="weui-cells__title">宣传产品</div>
            <div class="weui-cells no-line">
                <attachment-detail :attachment-data="attachmentPage" :is-page="true"></attachment-detail>
                <a class="add-file-btn" @click="gotoArticle">添加</a>
            </div>
        </template>

        <template v-if="['DTHDXC', 'XSXF', 'XXYL'].indexOf(formData.pageScenario) > -1">
            <div class="weui-cells__title">线下活动</div>
            <div class="weui-cells no-line">
                <attachment-detail :attachment-data="attachmentPage" :is-page="true"></attachment-detail>
                <a class="add-file-btn" @click="gotoParty">添加</a>
            </div>
        </template>

        <group title="文章目标读者" label-width="105px">
            <x-address title="所在城市"
                       value-text-align="left"
                       v-model="formData.pageReaderCity"
                       :list="addressData"></x-address>

            <selector title="客户性别"
                    :options="tagList.gender"
                    :value-map="valueMap"
                    v-model="formData.pageReaderGender"></selector>

            <div class="weui-cell weui-cell_access" @click="showAgeSelect">
                <div class="weui-cell__hd"><label class="weui-label">客户年龄</label></div>
                <div class="weui-cell__bd">
                   {{formData.pageReaderAgeLabel}}
                </div>
                <div class="weui-cell__ft"></div>
            </div>
            <checkbox-list :is-show-sheet="isAgeSheet"
                           :item-list="tagList.age"
                           :map-data="valueMap"
                           ref="ageSelect"
                           @selectChange="ageChange"></checkbox-list>

            <div class="weui-cell weui-cell_access" @click="showEducationSelect">
                <div class="weui-cell__hd"><label class="weui-label">教育背景</label></div>
                <div class="weui-cell__bd">
                   {{formData.pageReaderEduLabel}}
                </div>
                <div class="weui-cell__ft"></div>
            </div>
            <checkbox-list :is-show-sheet="isEducationSheet"
                           :item-list="tagList.education"
                           :map-data="valueMap"
                           ref="educationSelect"
                           @selectChange="educationChange"></checkbox-list>

            <div class="weui-cell weui-cell_access" @click="showConsumeLevelSelect">
                <div class="weui-cell__hd"><label class="weui-label">消费能力</label></div>
                <div class="weui-cell__bd">
                   {{formData.pageReaderConsumeLevelLabel}}
                </div>
                <div class="weui-cell__ft"></div>
            </div>
            <checkbox-list :is-show-sheet="isConsumeLevelSheet"
                           :item-list="tagList.consume_level"
                           :map-data="valueMap"
                           ref="consumeLevelSelect"
                           @selectChange="consumeLevelChange"></checkbox-list>

            <div class="weui-cell weui-cell_access" @click="showCareerSelect">
                <div class="weui-cell__hd"><label class="weui-label">客户职业</label></div>
                <div class="weui-cell__bd">
                   {{formData.pageReaderCareerLabel}}
                </div>
                <div class="weui-cell__ft"></div>
            </div>
            <checkbox-list :is-show-sheet="isCareerSheet"
                           :item-list="tagList.career_type"
                           :map-data="valueMap"
                           ref="careerSelect"
                           @selectChange="careerChange"></checkbox-list>

            <div class="weui-cell weui-cell_access" @click="showEnterpriseSelect">
                <div class="weui-cell__hd"><label class="weui-label">工作单位</label></div>
                <div class="weui-cell__bd">
                   {{formData.pageReaderEnterpriseLabel}}
                </div>
                <div class="weui-cell__ft"></div>
            </div>
            <checkbox-list :is-show-sheet="isEnterpriseSheet"
                           :item-list="tagList.industry_type"
                           :map-data="valueMap"
                           ref="enterpriseSelect"
                           @selectChange="enterpriseChange"></checkbox-list>
        </group>

        <div class="weui-cells__title">任务详情</div>
        <div class="weui-cells weui-cells_form no-line no-margin">
            <div class="weui-cell no-line">
                <div class="weui-cell__bd">
                    <textarea class="weui-textarea"
                                placeholder="这一刻的想法..."
                                rows="3"
                                v-model="formData.taskDesc"></textarea>
                </div>
            </div>
        </div>
        <div class="weui-cells no-line no-margin">
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
        <div class="weui-cells__title">任务附件</div>
        <div class="weui-cells no-line">
            <attachment-detail :attachment-data="attachmentData"></attachment-detail>
            <a class="add-file-btn" @click="gotoAttachment">添加</a>
        </div>
        
        <div class="btn-height-box"></div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="submitComment">分派任务</a>
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
import checkboxList from '../common/checkbox-list.vue'
import { Group, XInput, Selector, Datetime, XNumber, ChinaAddressV4Data, XAddress, Value2nameFilter as value2name } from 'vux'

import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            formData: {
                taskType: '1',
                taskTitle: '',
                taskBeginTime: '',
                taskEndTime: '',
                taskDesc: '',
                pageNum: 0,
                pageScenario: '',
                pageReaderGender: '',
                pageReaderCity: [],
                pageReaderAge: '',
                pageReaderEdu: '',
                pageReaderConsumeLevel: '',
                pageReaderCareer: '',
                pageReaderEnterprise: '',
                pageReaderAgeLabel: '',
                pageReaderEduLabel: '',
                pageReaderConsumeLevelLabel: '',
                pageReaderCareerLabel: '',
                pageReaderEnterpriseLabel: '',
                attachmentTargetType: 'editTask',
                imgData: {
                    attachmentSourceType: 'attachmen_type_1',
                    attachmentSourceCodes: []
                },
                pageData: {
                    attachmentSourceType: '',
                    attachmentSourceCodes: []
                },
                codes: [],
                objectType: ''
            },
            addressData: ChinaAddressV4Data,
            valueMap: ['tagValue', 'tagValueCname'],
            scenarioMap: ['scenario', 'scenarioKey'],
            nowIndex: '',
            nowPath: '',
            isShowImg: {
                value: false
            },
            serverIdList: [],
            themesList: [],
            cityList: [],
            scenarioList: [],
            tagList: {
                age: [],
                consume_level: [],
                education: [],
                gender: [],
                industry_type: [],
                career_type: []
            },
            isAgeSheet: {
                value: false,
                selectData: {
                    values: [],
                    labels: []
                }
            },
            isEducationSheet: {
                value: false,
                selectData: {
                    values: [],
                    labels: []
                }
            },
            isConsumeLevelSheet: {
                value: false,
                selectData: {
                    values: [],
                    labels: []
                }
            },
            isCareerSheet: {
                value: false,
                selectData: {
                    values: [],
                    labels: []
                }
            },
            isEnterpriseSheet: {
                value: false,
                selectData: {
                    values: [],
                    labels: []
                }
            }
        }
    },
    mounted () {
        jsSdk.init()
        if (this.detailData.attachmentTargetType) {
            this.formData = Object.assign({}, this.detailData)

            setTimeout(() => {
                this.formData.taskBeginTime = this.detailData.taskBeginTime
                this.formData.taskEndTime = this.detailData.taskEndTime
            }, 0)
        }
        this.getPageScenario()
        this.getTags()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            attachmentData: 'getAttachment',
            attachmentPage: 'getAttachmentPage',
            detailData: 'getDetail'
        })
    },
    methods: {
        ...mapActions([
          'setAttachment',
          'setAttachmentPage',
          'setDetail'
        ]),
        chooseImage () {
            var num = 9 - this.formData.imgData.attachmentSourceCodes.length
            jsSdk.chooseImage(num ,(localIds) => {
                this.formData.imgData.attachmentSourceCodes = this.formData.imgData.attachmentSourceCodes.concat(localIds).splice(0, 9)
            })
        },
        submitComment () {
            jsSdk.uploadImgs(this.formData.imgData.attachmentSourceCodes, (serverIdList) => {
                this.serverIdList = this.serverIdList.concat(serverIdList).splice(0, 9)
                this.submitFn()
            })
        },
        submitFn () {
            if (!this.formData.taskTitle) {
                this.$message({
                    message: '请填写任务标题!',
                    type: 'warning'
                })
                return false
            }

            if (!this.formData.taskBeginTime) {
                this.$message({
                    message: '请填写开始时间!',
                    type: 'warning'
                })
                return false
            }

            if (!this.formData.taskEndTime) {
                this.$message({
                    message: '请填写结束时间!',
                    type: 'warning'
                })
                return false
            }

            if (new Date(this.formData.taskBeginTime).getTime() > new Date(this.formData.taskEndTime).getTime()) {
                this.$message({
                    message: '开始应小于结束时间!',
                    type: 'warning'
                })
                return false
            }

            if (!this.formData.pageScenario) {
                this.$message({
                    message: '请选择写作目的!',
                    type: 'warning'
                })
                return false
            }

            var formData = Object.assign({}, this.formData)
            formData.userCode = this.userInfo.userCode
            formData.enterpriseCode = this.$route.query.enterpriseCode
            formData.agentId = this.$route.query.agentId
            formData.pageReaderCity = value2name(this.formData.pageReaderCity, ChinaAddressV4Data)
            formData.imgData.attachmentSourceCodes = this.serverIdList
            formData.pageData.attachmentSourceType = this.attachmentData.targetType
            formData.pageData.attachmentSourceCodes = this.attachmentData.attachmentCodes

            if (['XPTJ', 'CPCX'].indexOf(formData.pageScenario) > -1) {
                formData.codes = this.attachmentPage.attachmentCodes
                formData.objectType = 1
            }

            if (['DTHDXC', 'XSXF', 'XXYL'].indexOf(formData.pageScenario) > -1) {
                formData.codes = this.attachmentPage.attachmentCodes
                formData.objectType = 2
            }

            util.request({
                method: 'post',
                interface: 'saveTask',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.setDetail({})
                    this.setAttachment({})
                    this.setAttachmentPage({})
                    this.gotoUser(res.result.result)
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
        getPageScenario () {
            util.request({
                method: 'get',
                interface: 'getPageScenario',
                data: {}
            }).then(res => {
                if (res.result.success == '1') {
                    this.scenarioList = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        gotoAttachment () {
            this.setDetail(Object.assign({}, this.formData))

            var pathUrl = {
                name: 'attachment-list',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    redirectUrl: window.encodeURIComponent(window.location.href)
                }
            }
            this.$router.push(pathUrl)
        },
        gotoArticle () {
            this.setDetail(Object.assign({}, this.formData))

            var pathUrl = {
                name: 'product-attachment',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    isPage: 1,
                    redirectUrl: window.encodeURIComponent(window.location.href)
                }
            }
            this.$router.push(pathUrl)
        },
        gotoParty () {
            this.setDetail(Object.assign({}, this.formData))

            var pathUrl = {
                name: 'party-attachment',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    isPage: 1,
                    redirectUrl: window.encodeURIComponent(window.location.href)
                }
            }
            this.$router.push(pathUrl)
        },
        gotoUser (taskCode) {
            this.setDetail(Object.assign({}, this.formData))

            var urlPath = window.location.href.replace('editTask', 'submitTask')
            urlPath = urlPath + '&taskType=1&taskCode=' + taskCode

            var pathUrl = {
                name: 'user-list',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    redirectUrl: window.encodeURIComponent(urlPath)
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
        },
        showAgeSelect () {
            this.$refs.ageSelect.resetData()
            this.isAgeSheet.value = true
        },
        ageChange (data) {
            this.isAgeSheet.selectData = data
            this.formData.pageReaderAge = data.values.join(',')
            this.formData.pageReaderAgeLabel = data.labels.join(',')
        },
        showEducationSelect () {
            this.$refs.educationSelect.resetData()
            this.isEducationSheet.value = true
        },
        educationChange (data) {
            this.isEducationSheet.selectData = data
            this.formData.pageReaderEdu = data.values.join(',')
            this.formData.pageReaderEduLabel = data.labels.join(',')
        },
        showConsumeLevelSelect () {
            this.$refs.consumeLevelSelect.resetData()
            this.isConsumeLevelSheet.value = true
        },
        consumeLevelChange (data) {
            this.isConsumeLevelSheet.selectData = data
            this.formData.pageReaderConsumeLevel = data.values.join(',')
            this.formData.pageReaderConsumeLevelLabel = data.labels.join(',')
        },
        showCareerSelect () {
            this.$refs.careerSelect.resetData()
            this.isCareerSheet.value = true
        },
        careerChange (data) {
            this.isCareerSheet.selectData = data
            this.formData.pageReaderCareer = data.values.join(',')
            this.formData.pageReaderCareerLabel = data.labels.join(',')
        },
        showEnterpriseSelect () {
            this.$refs.enterpriseSelect.resetData()
            this.isEnterpriseSheet.value = true
        },
        enterpriseChange (data) {
            this.isEnterpriseSheet.selectData = data
            this.formData.pageReaderEnterprise = data.values.join(',')
            this.formData.pageReaderEnterpriseLabel = data.labels.join(',')
        }
    },
    components: {
        deleteImg,
        attachmentDetail,
        checkboxList,
        Group,
        XInput,
        Selector,
        Datetime,
        XNumber,
        XAddress
    }
}
</script>