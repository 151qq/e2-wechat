<template>
    <section class="article-list-box page__bd">
        <div class="weui-cells no-margin" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
            <!-- site.socialmarketingcloud.com  localhost:8890-->
            <div  class="weui-media-box weui-media-box_appmsg"
                @click="addAttachment(item)"
                v-for="(item, index) in listData">
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" :src="item.pageCover">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{item.pageTitle}}</h4>
                    <p class="weui-media-box__desc">{{item.pageAbstract}}</p>
                </div>
                <div class="weui-cell__ft">
                    <span :class="attachmentList.indexOf(item) > -1 ? 'weui-icon-success' : 'weui-icon-circle'"></span>
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
    },
    computed: {
        ...mapGetters({
            attachmentData: 'getAttachment'
        }),
        isLoad () {
            return this.total > this.listData.length
        }
    },
    methods: {
        ...mapActions([
          'setAttachment'
        ]),
        saveAttachment () {
            var attData = {
                targetType: this.$route.query.targetType,
                attachmentList: [],
                attachmentCodes: []
            }

            if (this.attachmentData.targetType && this.attachmentData.attachmentList && this.attachmentData.targetType == attData.targetType) {
                attData.attachmentList = this.attachmentData.attachmentList.concat(this.attachmentList)
                attData.attachmentCodes = this.attachmentData.attachmentCodes.concat(this.attachmentCodes)
            } else {
                attData.attachmentList = [].concat(this.attachmentList)
                attData.attachmentCodes = [].concat(this.attachmentCodes)
            }

            this.setAttachment(attData)

            var pathUrl = util.formDataUrl(window.decodeURIComponent(this.$route.query.redirectUrl))
            this.$router.push(pathUrl)
        },
        addAttachment (item) {
            var index = this.attachmentList.indexOf(item)

            if (index > -1) {
                this.attachmentCodes.splice(index, 1)
                this.attachmentList.splice(index, 1)
            } else {
                this.attachmentCodes.push(item.pageCode)
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
                pageType: 'speech_material',
                pageStatus: '1',
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }

            util.request({
                method: 'get',
                interface: 'html5PageList',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.total = res.result.total
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