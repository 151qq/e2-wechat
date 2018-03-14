<template>
    <section class="member-detail-box">
        <div class="height-1"></div>
        <div class="weui-cells no-margin no-line show-message-box">
            <div class="weui-cell weui-cell_access no-center">
                <div class="weui-cell__hd"><label class="weui-label">现场说明</label></div>
                <div class="weui-cell__bd">
                   <textarea class="weui-textarea"
                        placeholder="请输入文字"
                        :rows="formData.partyMemo ? 3 : 1"
                        v-model="formData.partyMemo"></textarea>
                </div>
            </div>       
        </div>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin no-line show-message-box">
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__hd"><label class="weui-label">现场图片</label></div>
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
                                v-for="(item, index) in formData.imageData"
                                @click="showBigImg(index)">
                                    <img :src="item">
                            </li>
                            <li @click="chooseImage" class="weui-uploader__input-box"></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="btn-height-box"></div>

        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="submitComment">提交</a>
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'

import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            formData: {
                partyMemo: '',
                partyAlbum: '',
                imageData: []
            },
            nowIndex: '',
            nowPath: '',
            isShowImg: {
                value: false
            },
            serverIdList: []        }
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
            var num = 9 - this.formData.imageData.length
            jsSdk.chooseImage(num ,(localIds) => {
                this.formData.imageData = this.formData.imageData.concat(localIds).splice(0, 9)
            })
        },
        submitComment () {
            jsSdk.uploadImgs(this.formData.imageData, (serverIdList) => {
                this.serverIdList = this.serverIdList.concat(serverIdList).splice(0, 9)
                this.submitFn()
            })
        },
        submitFn () {
            var formData = Object.assign({}, this.formData)
            formData.enterpriseCode = this.$route.query.enterpriseCode
            formData.agentId = this.$route.query.agentId
            formData.imageData = this.serverIdList
            formData.partyCode = this.$route.query.partyCode
            formData.partyAlbum = this.$route.query.partyAlbum,
            formData.userCode = this.userInfo.userCode

            util.request({
                method: 'post',
                interface: 'savePartyShow',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    var pathUrl = {
                        name: 'gift-log',
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
            this.nowPath = this.formData.imageData[index]
            this.isShowImg.value = true
        },
        deleteImg (index) {
            this.formData.imageData.splice(index, 1)
        }
    }
}
</script>