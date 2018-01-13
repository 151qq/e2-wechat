<template>
    <section class="submit-comment-box">
        <div class="weui-cells no-line no-margin">
            <div class="wx-upload-img"
                @click="showBigImg(index)">
                    <img :src="formData.mediaId">
            </div>

            <div v-if="!formData.mediaId" class="wx-uploader"></div>
            
            <a class="add-file-btn" @click="chooseImage">添加图片</a>
        </div>
        <div class="weui-cells__title">附言</div>
        <div class="weui-cells weui-cells_form no-line no-margin">
            <div class="weui-cell no-line">
                <div class="weui-cell__bd">
                    <textarea class="weui-textarea"
                                placeholder="这一刻的想法..."
                                rows="3"
                                v-model="formData.message"></textarea>
                </div>
            </div>
        </div>
        
        <div class="btn-height-box"></div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="submitComment">发送任务</a>
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
            formData: {
                taskCode: '',
                taskReceiver: [],
                message: '',
                url: '',
                mediaId: ''
            },
            nowIndex: '',
            nowPath: '',
            isShowImg: {
                value: false
            },
            serverId: ''
        }
    },
    mounted () {
        jsSdk.init()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            userData: 'getUser'
        }),
        userName () {
            if (this.userData.userList && this.userData.userList.length) {
                return this.this.userData.userList[0].userLoginName
            } else {
                return this.userInfo.userLoginName
            }
        }
    },
    methods: {
        ...mapActions([
          'setUser'
        ]),
        chooseImage () {
            var num = 1
            jsSdk.chooseImage(num ,(localIds) => {
                this.formData.mediaId = localIds[0]
            })
        },
        submitComment () {
            var imgList = this.formData.mediaId ? [this.formData.mediaId] : []
            jsSdk.uploadImgs(imgList, (serverIdList) => {
                this.serverId = serverIdList[0]
                this.submitFn()
            })
        },
        submitFn () {
            var formData = Object.assign({}, this.formData)
            formData.userCode = this.userInfo.userCode
            formData.enterpriseCode = this.$route.query.enterpriseCode
            formData.agentId = this.$route.query.agentId
            formData.taskCode = this.$route.query.taskCode
            formData.taskReceiver = this.userData.userCodes
            formData.mediaId = this.serverId

            var pathUrl = window.location.href

            var pathData = util.formDataUrl(pathUrl)
            if (pathData.query.taskType == '1') {
                pathUrl = pathUrl.replace('submitTask', 'editTask')
            } else {
                pathUrl = pathUrl.replace('submitTask', 'editTask')
            }

            formData.url = window.encodeURIComponent(pathUrl)

            util.request({
                method: 'post',
                interface: 'sendTask',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.setUser({})
                    window.location.replace(pathUrl)
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
    },
    components: {
        deleteImg
    }
}
</script>
<style lang="scss">
.submit-comment-box {
    .wx-uploader {
        position: relative;
        height: 200px;
        border: 1px solid #d9d9d9;
        margin: 15px;
    }

    .wx-uploader:before {
        width: 80%;
        height: 1px;
        content: " ";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #d9d9d9;
    }

    .wx-uploader:after {
        height: 80%;
        width: 1px;
        content: " ";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #d9d9d9;
    }

    .wx-upload-img {
        width: 100%;

        img {
            display: block;
            width: 100%;
        }
    }
}
</style>