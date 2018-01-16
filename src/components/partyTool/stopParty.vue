<template>
    <section class="member-detail-box">
        <div class="height-1"></div>
        <div class="weui-cells weui-cells_form no-line no-margin">
            <div class="weui-cell no-line">
                <div class="weui-cell__bd">
                    <textarea class="weui-textarea"
                                placeholder="这一刻的想法..."
                                rows="3"
                                v-model="formData.partySummary"></textarea>
                </div>
            </div>
        </div>
        <div class="weui-cells no-line no-margin">
            <div class="weui-cell no-line">
                <div class="weui-uploader">
                    <div class="weui-uploader__bd">
                         <ul class="weui-uploader__files" id="uploaderFiles">
                            <li class="weui-uploader__file"
                                v-for="(item, index) in formData.imgList"
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
                partyResult: '',
                partySummary: '',
                attachmentTargetType: 'partyResult',
                imgList: []
            },
            nowIndex: '',
            nowPath: '',
            isShowImg: {
                value: false
            },
            serverIdList: [],
            themesList: [],
            cityList: [],
            scenarioList: []
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
            var num = 9 - this.formData.imgList.length
            jsSdk.chooseImage(num ,(localIds) => {
                this.formData.imgList = this.formData.imgList.concat(localIds).splice(0, 9)
            })
        },
        submitComment () {
            jsSdk.uploadImgs(this.formData.imgList, (serverIdList) => {
                this.serverIdList = this.serverIdList.concat(serverIdList).splice(0, 9)
                this.submitFn()
            })
        },
        submitFn () {
            var formData = Object.assign({}, this.formData)
            formData.enterpriseCode = this.$route.query.enterpriseCode
            formData.agentId = this.$route.query.agentId
            formData.imgList = this.serverIdList
            formData.partyCode = this.$route.query.partyCode
            formData.partyResult = this.$route.query.result
            formData.partyAlbum = this.$route.query.partyAlbum

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
            this.nowPath = this.formData.imgList[index]
            this.isShowImg.value = true
        },
        deleteImg (index) {
            this.formData.imgList.splice(index, 1)
        }
    }
}
</script>