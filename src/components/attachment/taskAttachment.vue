<template>
    <section class="article-list-box page__bd">
        <div class="weui-cells no-margin" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
            <!-- site.socialmarketingcloud.com  localhost:8890-->
            <div  class="weui-media-box weui-media-box_appmsg"
                @click="addAttachment(item)"
                v-for="(item, index) in listData">
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" :src="item.bgTaskImg">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{item.taskTitle}}</h4>
                    <p class="weui-media-box__desc">
                        {{item.taskBeginTime.split(' ')[0] + ' - ' + item.taskEndTime.split(' ')[0]}}
                    </p>
                </div>
                <div class="weui-cell__ft">
                    <span :class="attachmentCodes.indexOf(item.taskCode) > -1 ? 'weui-icon-success' : 'weui-icon-circle'"></span>
                </div>
            </div>
        </div>

        <div class="null-page" v-if="!listData.length && isPage">
            暂无内容！
        </div>
        
        <div class="btn-height-box"></div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="saveAttachment">确定</a>
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            isPage: false,
            listData: [],
            attachmentList: [],
            attachmentCodes: [],
            pageSize: 20,
            pageNumber: 1,
            total: 0,
            userId: ''
        }
    },
    mounted () {
        this.getList()

        if (!this.$route.query.isPage && this.attachmentData.targetType  && this.attachmentData.targetType == 'attachmen_type_3') {
            this.attachmentList = this.attachmentData.attachmentList.concat([])
            this.attachmentCodes = this.attachmentData.attachmentCodes.concat([])
        }

        if (this.$route.query.isPage && this.attachmentPage.targetType  && this.attachmentPage.targetType == 'attachmen_type_3') {
            this.attachmentList = this.attachmentPage.attachmentList.concat([])
            this.attachmentCodes = this.attachmentPage.attachmentCodes.concat([])
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            attachmentData: 'getAttachment',
            attachmentPage: 'getAttachmentPage'
        }),
        isLoad () {
            return this.total > this.listData.length
        }
    },
    methods: {
        ...mapActions([
          'setAttachment',
          'setAttachmentPage'
        ]),
        saveAttachment () {
            var attData = {
                targetType: 'attachmen_type_3',
                attachmentList: [].concat(this.attachmentList),
                attachmentCodes: [].concat(this.attachmentCodes)
            }

            if (this.$route.query.isPage) {
                this.setAttachmentPage(attData)
            } else {
                this.setAttachment(attData)
            }
            
            if (this.$route.query.isList) {
                this.$router.go(-2)
            } else {
                this.$router.go(-1)
            }
        },
        addAttachment (item) {
            var index = this.attachmentCodes.indexOf(item.taskCode)

            if (index > -1) {
                this.attachmentCodes.splice(index, 1)
                this.attachmentList.splice(index, 1)
            } else {
                this.attachmentCodes.push(item.taskCode)
                this.attachmentList.push(item)
            }
        },
        showMore (cb) {
            this.pageNumber++
            this.getList(cb)
        },
        getList (cb) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                userCode: this.userInfo.userCode,
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }

            util.request({
                method: 'post',
                interface: 'getSendedTasks',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.total = Number(res.result.total)
                this.isPage = true
                if (!cb) {
                    this.listData = res.result.result
                } else {
                    this.listData = this.listData.concat(res.result.result)
                }
            })
        }
    }
}
</script>