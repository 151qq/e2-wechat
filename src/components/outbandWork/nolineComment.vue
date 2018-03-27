<template>
    <section class="noline-end-box">
        <div class="height-1"></div>
        <div class="weui-cells no-margin show-message-box">
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">外呼结果</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            v-model="formData.outbandResult">
                        <option value=""></option>
                        <option
                            v-for="(item, index) in selectList.result" :key="index"
                            :value="item.key">
                            {{item.value}}
                        </option>
                    </select>
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">外呼时间</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="datetime-local" v-model="formData.outbandRealTimeD">
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>

            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">外呼方式</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            v-model="formData.outbandRealType">
                        <option value=""></option>
                        <option
                            v-for="(item, index) in selectList.type" :key="index"
                            :value="item.key">
                            {{item.value}}
                        </option>
                    </select>
                </div>
                <div class="weui-cell__ft red-color">*</div>
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
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            coverImg: '',
            formData: {
                outbandResult: '',
                outbandRealType: '',
                enterpriseCode: '',
                outbandWorkCode: '',
                outbandRealTime: '',
                outbandRealTimeD: '',
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
            }
        }
    },
    mounted () {
        jsSdk.init()
        this.coverImg = '/static/images/B' + Math.ceil(Math.random() * 13) + '.jpg'
        this.formData.outbandRealTimeD = util.formatDate(new Date().getTime(), 'yyyy-MM-ddThh:mm:ss')
        this.getSelectOut()
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
            if (!this.formData.outbandResult) {
                this.$message({
                    message: '请选择外呼结果!',
                    type: 'warning'
                })
                return false
            }

            if (!this.formData.outbandRealTimeD) {
                this.$message({
                    message: '请填写外呼时间!',
                    type: 'warning'
                })
                return false
            }

            if (!this.formData.outbandRealType) {
                this.$message({
                    message: '请选择外呼方式!',
                    type: 'warning'
                })
                return false
            }

            this.formData.outbandRealTime = util.formatDate(this.formData.outbandRealTimeD, 'yyyy-MM-dd hh:mm:ss')

            var formData = Object.assign({}, this.formData)
            formData.outbandWorkType = this.$route.query.outbandWorkType
            formData.userCode = this.userInfo.userCode
            formData.memberCode = this.$route.query.memberCode
            formData.enterpriseCode = this.$route.query.enterpriseCode
            formData.agentId = this.$route.query.agentId
            formData.outbandWorkCode = this.$route.query.outbandWorkCode
            formData.attachmentTargetCode = this.$route.query.outbandWorkCode

            util.request({
                method: 'post',
                interface: 'outBandWorkMange',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    
                    // var pathData = {
                    //     name: 'noline-list',
                    //     query: {
                    //         enterpriseCode: this.$route.query.enterpriseCode,
                    //         agentId: this.$route.query.agentId
                    //     }
                    // }

                    // this.$router.replace(pathData)
                    
                    this.$router.go(-2)
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