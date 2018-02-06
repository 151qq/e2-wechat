<template>
    <section class="user-role-list">
        <div class="height-1"></div>
        <div class="weui-cells__title">推荐阅读</div>
        <div class="weui-cells no-margin">
            <swipeout>
                <swipeout-item transition-mode="follow"
                                v-for="(item, index) in attachmentData.attachmentList" :key="index">

                    <div slot="right-menu">
                        <swipeout-button @click.native="deleteItem(index)" type="warn">
                            删除
                        </swipeout-button>
                    </div>
                    <a class="weui-media-box weui-media-box_appmsg"
                                slot="content">
                        <div class="weui-media-box__hd">
                            <img class="weui-media-box__thumb" :src="item.pageCover">
                        </div>
                        <div class="weui-media-box__bd">
                            <h4 class="weui-media-box__title">{{item.pageTitle}}</h4>
                            <p class="weui-media-box__desc">{{item.pageAbstract}}</p>
                        </div>
                    </a>
                </swipeout-item>
            </swipeout>
            
            <div class="null-box" v-if="attachmentData.attachmentList && !attachmentData.attachmentList.length && isPage">暂无内容！</div>

            <a class="add-file-btn" @click="gotoAttachment">添加</a>
        </div>
        
        <div class="btn-height-box"></div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="submitComment">确定</a>
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import { mapGetters, mapActions } from 'vuex'
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'

export default {
    data () {
        return {
            isPage: false
        }
    },
    mounted () {
        jsSdk.init()
        if (!this.attachmentData.targetType) {
            this.getArticles()
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            attachmentData: 'getAttachment'
        })
    },
    methods: {
        ...mapActions([
          'setAttachment'
        ]),
        getArticles () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                pageCode: this.$route.query.pageCode
            }

            util.request({
                method: 'get',
                interface: 'getExtendPages',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    var codes = []

                    if (res.result.result.length) {
                        res.result.result.forEach((item) => {
                            codes.push(item.pageCode)
                        })
                    }

                    var attData = {
                        targetType: 'attachmen_type_4',
                        attachmentList: [].concat(res.result.result),
                        attachmentCodes: codes
                    }

                    this.setAttachment(attData)
                    this.isPage = true
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        submitComment () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                pageCode: this.$route.query.pageCode,
                extentsPageCodes: this.attachmentData.attachmentCodes
            }

            util.request({
                method: 'post',
                interface: 'ediltExtendsPage',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.$message({
                      showClose: true,
                      message: '更新成功！',
                      type: 'success'
                    })
                    this.setAttachment({})
                    var pathUrl = util.formDataUrl(window.decodeURIComponent(this.$route.query.url))
                    this.$router.replace(pathUrl)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        deleteItem (index) {
            var attachmentCodes = [].concat(this.attachmentData.attachmentCodes)
            var attachmentList = [].concat(this.attachmentData.attachmentList)

            attachmentCodes.splice(index, 1)
            attachmentList.splice(index, 1)

            var attData = {
                targetType: 'attachmen_type_4',
                attachmentList: attachmentList,
                attachmentCodes: attachmentCodes
            }

            this.setAttachment(attData)
        },
        gotoAttachment () {
            var pathUrl = {
                name: 'article-attachment',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    type: 'submit',
                    redirectUrl: window.encodeURIComponent(window.location.href)
                }
            }
            this.$router.push(pathUrl)
        }
    },
    components: {
        Swipeout,
        SwipeoutItem,
        SwipeoutButton
    }
}
</script>
<style lang="scss">
.user-role-list {
    .add-btn {
        display: inline-block;
        background: #2f7dcd;
        border-radius: 3px;
        padding: 2px 6px;
        font-size: 14px;
        color: #ffffff;
    }

    .vux-swipeout-item {
        border-bottom: 1px solid #D9D9D9;
    }
}
</style>