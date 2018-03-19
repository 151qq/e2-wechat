<template>
    <section class="member-detail-box">
        <div class="height-1"></div>
        <div class="weui-cells no-margin show-message-box">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">预约人</label></div>
                <div class="weui-cell__bd">{{base.reserverName}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">预约手机</label></div>
                <div class="weui-cell__bd">{{base.reserverMobile}}</div>
            </div>

            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">接待结果</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            v-model="formData.receptionResult">
                        <option
                            v-for="(item, index) in selectList" :key="index"
                            :value="item.key">
                            {{item.value}}
                        </option>
                    </select>
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>

            <template v-if="['2','6','7'].indexOf(formData.receptionResult) > -1">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">开始时间</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="datetime-local" v-model="formData.receptionBeginTimeD">
                    </div>
                    <div class="weui-cell__ft red-color">*</div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">结束时间</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="datetime-local" v-model="formData.receptionEndTimeD">
                    </div>
                    <div class="weui-cell__ft red-color">*</div>
                </div>
            </template>

            <template v-if="['5'].indexOf(formData.receptionResult) > -1">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">取消时间</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="datetime-local" v-model="formData.reserveUpdateTimeD">
                    </div>
                    <div class="weui-cell__ft red-color">*</div>
                </div>
            </template>

            <template v-if="['4'].indexOf(formData.receptionResult) > -1">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">更新时间</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="datetime-local" v-model="formData.reserveUpdateTimeD">
                    </div>
                    <div class="weui-cell__ft red-color">*</div>
                </div>
            </template>
        </div>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line show-message-box">
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
        
        <template v-if="['2','6','7'].indexOf(formData.receptionResult) > -1">
            <div class="wx-area-line"></div>
            <div class="weui-cells no-margin no-line show-message-box">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">客户姓名</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" placeholder="请输入" v-model="formData.name">
                    </div>
                </div>

                <div class="weui-cell weui-cell_select weui-cell_select-after">
                    <div class="weui-cell__hd"><label class="weui-label">客户性别</label></div>
                    <div class="weui-cell__bd">
                        <select class="weui-select"
                                v-model="formData.gender">
                            <option
                                v-for="(item, index) in tagList.gender" :key="index"
                                :value="item.tagValue">
                                {{item.tagValueCname}}
                            </option>
                        </select>
                    </div>
                    <div class="weui-cell__ft red-color">*</div>
                </div>

                <div class="weui-cell weui-cell_select weui-cell_select-after">
                    <div class="weui-cell__hd"><label class="weui-label">客户年龄</label></div>
                    <div class="weui-cell__bd">
                        <select class="weui-select"
                                v-model="formData.age">
                            <option
                                v-for="(item, index) in tagList.age" :key="index"
                                :value="item.tagValue">
                                {{item.tagValueCname}}
                            </option>
                        </select>
                    </div>
                    <div class="weui-cell__ft red-color">*</div>
                </div>

                <div class="weui-cell weui-cell_select weui-cell_select-after">
                    <div class="weui-cell__hd"><label class="weui-label">教育背景</label></div>
                    <div class="weui-cell__bd">
                        <select class="weui-select"
                                v-model="formData.education">
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
                            <option
                                v-for="(item, index) in tagList.consume_level" :key="index"
                                :value="item.tagValue">
                                {{item.tagValueCname}}
                            </option>
                        </select>
                    </div>
                    <div class="weui-cell__ft red-color">*</div>
                </div>

                <div class="weui-cell weui-cell_select weui-cell_select-after">
                    <div class="weui-cell__hd"><label class="weui-label">消费决策</label></div>
                    <div class="weui-cell__bd">
                        <select class="weui-select"
                                v-model="formData.consumeDecisionType">
                            <option
                                v-for="(item, index) in tagList.consume_decision_type" :key="index"
                                :value="item.tagValue">
                                {{item.tagValueCname}}
                            </option>
                        </select>
                    </div>
                    <div class="weui-cell__ft red-color">*</div>
                </div>

                <div class="weui-cell weui-cell_select weui-cell_select-after">
                    <div class="weui-cell__hd"><label class="weui-label">导购特征</label></div>
                    <div class="weui-cell__bd">
                        <select class="weui-select"
                                v-model="formData.shoppingGuide">
                            <option
                                v-for="(item, index) in tagList.shopping_guide" :key="index"
                                :value="item.tagValue">
                                {{item.tagValueCname}}
                            </option>
                        </select>
                    </div>
                    <div class="weui-cell__ft red-color">*</div>
                </div>

                <div class="weui-cell weui-cell_select weui-cell_select-after">
                    <div class="weui-cell__hd"><label class="weui-label">客户职业</label></div>
                    <div class="weui-cell__bd">
                        <select class="weui-select"
                                v-model="formData.careerType">
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
                            <option
                                v-for="(item, index) in tagList.unit_type" :key="index"
                                :value="item.tagValue">
                                {{item.tagValueCname}}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </template>
        
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
                reserveUpdateTime: '',
                receptionEndTimeD: '',
                receptionBeginTimeD: '',
                reserveUpdateTimeD: '',
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
                    localIds: [],
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
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        chooseImage () {
            jsSdk.chooseImage((localId ,serverId) => {
                this.formData.imgData.localIds.push(localId)
                this.formData.imgData.attachmentSourceCodes.push(serverId)
            })
        },
        submitFn () {
            if (!this.formData.receptionResult) {
                this.$message({
                    message: '请选择接待结果！',
                    type: 'warning'
                })
                return false
            }

            if (['2','6','7'].indexOf(this.formData.receptionResult) > -1) {
                if (!this.formData.receptionBeginTimeD) {
                    this.$message({
                        message: '请选择开始时间！',
                        type: 'warning'
                    })
                    return false
                }

                if (!this.formData.receptionBeginTimeD) {
                    this.$message({
                        message: '请选择结束时间！',
                        type: 'warning'
                    })
                    return false
                }

                if (util.getDate(this.formData.receptionBeginTimeD).getTime() > util.getDate(this.formData.receptionEndTimeD).getTime()) {
                    this.$message({
                        message: '开始应小于结束时间!',
                        type: 'warning'
                    })
                    return false
                }

                if (!this.formData.gender) {
                    this.$message({
                        message: '请选择客户性别！',
                        type: 'warning'
                    })
                    return false
                }

                if (!this.formData.age) {
                    this.$message({
                        message: '请选择客户年龄！',
                        type: 'warning'
                    })
                    return false
                }

                if (!this.formData.consumeLevel) {
                    this.$message({
                        message: '请选择消费能力！',
                        type: 'warning'
                    })
                    return false
                }

                if (!this.formData.consumeDecisionType) {
                    this.$message({
                        message: '请选择消费决策！',
                        type: 'warning'
                    })
                    return false
                }

                if (!this.formData.shoppingGuide) {
                    this.$message({
                        message: '请选择导购特征！',
                        type: 'warning'
                    })
                    return false
                }

                this.formData.receptionEndTime = util.formatDate(this.formData.receptionEndTimeD, 'yyyy-MM-dd hh:mm:ss')
                this.formData.receptionBeginTime = util.formatDate(this.formData.receptionBeginTimeD, 'yyyy-MM-dd hh:mm:ss')
            }

            if (['5'].indexOf(this.formData.receptionResult) > -1) {
                if (!this.formData.reserveUpdateTimeD) {
                    this.$message({
                        message: '请选择取消时间！',
                        type: 'warning'
                    })
                    return false
                }
                this.formData.reserveUpdateTime = util.formatDate(this.formData.reserveUpdateTimeD, 'yyyy-MM-dd hh:mm:ss')
            }

            if (['4'].indexOf(this.formData.receptionResult) > -1) {
                if (!this.formData.reserveUpdateTimeD) {
                    this.$message({
                        message: '请选择更新时间！',
                        type: 'warning'
                    })
                    return false
                }

                this.formData.reserveUpdateTime = util.formatDate(this.formData.reserveUpdateTimeD, 'yyyy-MM-dd hh:mm:ss')
            }

            var formData = Object.assign({}, this.formData)
            formData.userCode = this.userInfo.userCode
            formData.enterpriseCode = this.$route.query.enterpriseCode
            formData.agentId = this.$route.query.agentId
            formData.reserveCode = this.$route.query.reserveCode
            formData.attachmentTargetCode = this.$route.query.reserveCode

            util.request({
                method: 'post',
                interface: 'updateResponseReserveInfo',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
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
        deleteImg
    }
}
</script>