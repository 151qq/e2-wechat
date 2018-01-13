<template>
    <section class="member-detail-box">
        <section class="weui-cells weui-cells_form no-line no-margin">
            <!-- <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">预约人</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" placeholder="请输入" v-model="formData.reserverName">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">预约手机</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="tel" placeholder="请输入" v-model="formData.reserverMobile">
                </div>
            </div> -->
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">预约人</div>
                <div class="weui-cell__ft">{{base.reserverName}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">预约手机</div>
                <div class="weui-cell__ft">{{base.reserverMobile}}</div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">开始时间</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="datetime-local" v-model="formData.reserveBeginTime">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">结束时间</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="datetime-local" v-model="formData.receptionEndTime">
                </div>
            </div>
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">接待结果</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" v-model="formData.receptionResult">
                        <option v-for="(item, index) in selectList.result"
                                :key="index"
                                :value="item.key">{{item.value}}</option>
                    </select>
                </div>
            </div>
        </section>
        <div class="weui-cells__title">接待备忘</div>
        <div class="weui-cells weui-cells_form no-line no-margin">
            <div class="weui-cell no-line">
                <div class="weui-cell__bd">
                    <textarea class="weui-textarea"
                                placeholder="这一刻的想法..."
                                rows="3"
                                v-model="formData.receptionMemo"></textarea>
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
        <div class="weui-cells__title">体验产品</div>
        <div class="weui-cells no-line">
            <attachment-detail :attachment-data="attachmentData"></attachment-detail>
            <a class="add-file-btn" @click="gotoAttachment">添加</a>
        </div>
        
        <div class="weui-cells__title">客户洞察</div>
        <section class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">客户姓名</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" placeholder="请输入" v-model="formData.name">
                </div>
            </div>
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">客户性别</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" v-model="formData.gender">
                        <option v-for="(item, index) in tagList.gender"
                                :key="index"
                                :value="item.tagValue">{{item.tagValueCname}}</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">客户年龄</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" v-model="formData.age">
                        <option v-for="(item, index) in tagList.age"
                                :key="index"
                                :value="item.tagValue">{{item.tagValueCname}}</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">教育背景</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" v-model="formData.education">
                        <option v-for="(item, index) in tagList.education"
                                :key="index"
                                :value="item.tagValue">{{item.tagValueCname}}</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">消费能力</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" v-model="formData.consumeLevel">
                        <option v-for="(item, index) in tagList.consume_level"
                                :key="index"
                                :value="item.tagValue">{{item.tagValueCname}}</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">消费决策</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" v-model="formData.consumeDecisionType">
                        <option v-for="(item, index) in tagList.consume_decision_type"
                                :key="index"
                                :value="item.tagValue">{{item.tagValueCname}}</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">导购特征</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" v-model="formData.shoppingGuide">
                        <option v-for="(item, index) in tagList.shopping_guide"
                                :key="index"
                                :value="item.tagValue">{{item.tagValueCname}}</option>
                    </select>
                </div>
            </div>
            <!-- <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">客户职业</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" v-model="tagData.age">
                        <option v-for="(item, index) in tagList.age"
                                :key="index"
                                :value="item.tagValue">{{item.tagValueCname}}</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label for="" class="weui-label">工作单位</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" v-model="tagData.age">
                        <option v-for="(item, index) in tagList.age"
                                :key="index"
                                :value="item.tagValue">{{item.tagValueCname}}</option>
                    </select>
                </div>
            </div> -->
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
                receptionMemo: '',
                name: '',
                age: '',
                consumeDecisionType: '',
                consumeLevel: '',
                education: '',
                gender: '',
                shoppingGuide: '',
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
                shopping_guide: []
            }
        }
    },
    mounted () {
        jsSdk.init()
        if (this.detailData.attachmentTargetType) {
            this.formData = Object.assign({}, this.detailData)
        }
        this.getData()
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
            formData.pageData.attachmentSourceType = this.attachmentData.targetType
            formData.pageData.attachmentSourceCodes = this.attachmentData.attachmentCodes

            util.request({
                method: 'post',
                interface: 'listResponseReserveInfo',
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
                enterpriseCode: this.$route.query.enterpriseCode,
                reserveCode: this.$route.query.reserveCode
            }

            util.request({
                method: 'get',
                interface: 'selectAll',
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
                name: 'product-attachment',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    targetType: 'attachmen_type_5',
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
        attachmentDetail
    }
}
</script>