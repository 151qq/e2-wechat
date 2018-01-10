<template>
    <section class="attachment-media-box page__bd">
        <section v-scroll-load="{showMore:showMore, isLoad: isLoad}">
            <div class="sou-box"
                 @click="addAttachment(item)"
                 v-for="(item, index) in listData"
                 :key="index">
                <div class="cover-box">
                    <img :src="item.docCover">
                </div>
                <div class="title-box" v-text="item.docTitle"></div>

                <div class="check-btn-box">
                    <span :class="attachmentList.indexOf(item) > -1 ? 'weui-icon-success' : 'weui-icon-circle'"></span>
                </div>
            </div>
        </section>
        
        <div class="null-page" v-if="!listData.length && isPage">
            暂无内容！
        </div>
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
                attachmentList: []
            }

            if (this.attachmentData.targetType && this.attachmentData.attachmentList && this.attachmentData.targetType == attData.targetType) {
                attData.attachmentList = this.attachmentData.attachmentList.concat(this.attachmentList)
            } else {
                attData.attachmentList = [].concat(this.attachmentList)
            }

            this.setAttachment(attData)
            var pathUrl = util.formDataUrl(window.decodeURIComponent(this.$route.query.redirectUrl))
            this.$router.push(pathUrl)
        },
        addAttachment (item) {
            var index = this.attachmentList.indexOf(item)

            if (index > -1) {
                this.attachmentList.splice(index, 1)
            } else {
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
                docType: 'media',
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }

            util.request({
                method: 'get',
                interface: 'listPage',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.total = res.result.total
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
<style lang="scss">
.attachment-media-box {
    overflow: hidden;

    .sou-box {
        position: relative;
        float: left;
        width: 46%;
        margin: 2%;

        .check-btn-box {
            position: absolute;
            width: 32px;
            height: 23px;
            top: 2px;
            right: 0px;
        }

        .cover-box {
            height: 160px;
            overflow: hidden;
            
            img {
                display: block;
                width: 100%;
                min-height: 160px;
            }
        }

        .title-box {
            display: block;
            text-align: center;
            font-size: 14px;
            line-height: 2;
            color: #000000;
        }
    }
}
</style>