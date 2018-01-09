<template>
    <section class="attachment-img-box page__bd">
        <section class="wx-img-list weui-grids" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
            <template v-for="(item, index) in listData">
                <div class="weui-grid" @click="addAttachment(item)">
                    <img :src="item.fileCode">

                    <div class="check-btn-box">
                        <span :class="attachmentList.indexOf(item) > -1 ? 'weui-icon-success' : 'weui-icon-circle'"></span>
                    </div>
                </div>
                <div class="margin-box" v-if="index % 3 != 2"></div>
            </template>
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
            window.location.href = this.$route.query.redirectUrl
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
                docType: 'pic',
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
.attachment-img-box {
    .wx-img-list {
        margin-bottom: 0 !important;

        .weui-grid {
            padding: 0;
            padding-top: 33%;
        }
    }

    .weui-cell {
        padding: 10px 15px;

        &:before {
            border: none;
        }
    }

    .weui-grid {
        position: relative;
        width: 33%;
        overflow: hidden;
        margin-bottom: 0.15em;

        img {
            position: absolute;
            width: 100%;
            display: block;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }

        .check-btn-box {
            position: absolute;
            width: 32px;
            height: 23px;
            top: 2px;
            right: 0px;
        }
    }

    .margin-box {
        float: left;
        width: 0.5%;
        height: 1px;
    }
}
</style>