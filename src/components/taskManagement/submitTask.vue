<template>
    <section class="submit-comment-box">
        <div class="weui-cells weui-cells_form no-line no-margin">
            <div class="weui-cell no-line">
                <div class="weui-cell__bd">
                    <textarea class="weui-textarea"
                                placeholder="有什么要对他说..."
                                rows="9"
                                v-model="formData.message"></textarea>
                </div>
            </div>
        </div>
        
        <div class="btn-height-box"></div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="submitFn">发送任务</a>
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
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
    mounted () {},
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            userData: 'getUser'
        })
    },
    methods: {
        ...mapActions([
          'setUser'
        ]),
        submitFn () {
            var formData = Object.assign({}, this.formData)
            formData.userCode = this.userInfo.userCode
            formData.enterpriseCode = this.$route.query.enterpriseCode
            formData.agentId = this.$route.query.agentId
            formData.taskCode = this.$route.query.taskCode
            formData.taskReceiver = this.userData.userCodes
            formData.mediaId = this.serverId
            formData.taskType = this.$route.query.taskType

            var pathUrl = 'http://mobile.socialmarketingcloud.com/taskManagement?enterpriseCode=' + this.$route.query.enterpriseCode + '&agentId=' + this.$route.query.agentId

            formData.url = window.encodeURIComponent(pathUrl)

            util.request({
                method: 'post',
                interface: 'sendTask',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.setUser({})
                    
                    var pathData = util.formDataUrl(pathUrl)
                    this.$router.replace(pathData)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
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