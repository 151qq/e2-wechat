<template>
    <section class="member-detail-box">
        <div class="height-1"></div>
        <div class="weui-cells no-margin no-line show-message-box">
            <div class="weui-cell weui-cell_access no-center">
                <div class="weui-cell__hd"><label class="weui-label">活动总结</label></div>
                <div class="weui-cell__bd">
                   <textarea class="weui-textarea"
                        placeholder="请输入文字"
                        :rows="formData.partySummary ? 3 : 1"
                        v-model="formData.partySummary"></textarea>
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
                                v-for="(item, index) in formData.localIds"
                                @click="showBigImg(index)">
                                    <img :src="item">
                            </li>
                            <li @click="chooseImage"
                                v-if="formData.localIds.length < 9"
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
            formData: {
                partyResult: '',
                partySummary: '',
                partyStatus: '',
                partyAlbum: '',
                mediaId: [],
                localIds: []
            },
            nowIndex: '',
            nowPath: '',
            isShowImg: {
                value: false
            }
        }
    },
    mounted () {
        jsSdk.init()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        chooseImage () {
            jsSdk.chooseImage((localId ,serverId) => {
                this.formData.localIds.push(localId)
                this.formData.mediaId.push(serverId)
            })
        },
        submitFn () {
            var formData = Object.assign({}, this.formData)
            formData.enterpriseCode = this.$route.query.enterpriseCode
            formData.agentId = this.$route.query.agentId
            formData.partyCode = this.$route.query.partyCode
            formData.partyResult = this.$route.query.result
            formData.partyAlbum = this.$route.query.partyAlbum
            formData.partyStatus = this.$route.query.partyStatus

            util.request({
                method: 'post',
                interface: 'reviewInsertImage',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    var pathUrl = {
                        name: 'party-detail',
                        query: {
                            enterpriseCode: this.$route.query.enterpriseCode,
                            agentId: this.$route.query.agentId,
                            partyCode: this.$route.query.partyCode
                        }
                    }
                    this.$router.replace(pathUrl)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        showBigImg (index) {
            this.nowIndex = index
            this.nowPath = this.formData.localIds[index]
            this.isShowImg.value = true
        },
        deleteImg (index) {
            this.formData.mediaId.splice(index, 1)
            this.formData.localIds.splice(index, 1)
        }
    },
    components: {
        deleteImg
    }
}
</script>