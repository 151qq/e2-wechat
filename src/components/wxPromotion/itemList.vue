<template>
    <section class="channel-list-box page__bd show-state-box">
        <div class="weui-cells no-margin" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
            <!-- site.socialmarketingcloud.com  localhost:8890-->
            <swipeout>
                <swipeout-item transition-mode="follow"
                                v-for="(item, index) in listData" :key="index">

                    <!-- <div slot="right-menu">
                        <swipeout-button @click.native="deleteItem(item)" type="warn">
                            删除
                        </swipeout-button>
                    </div> -->
                    <router-link class="weui-media-box weui-media-box_appmsg"
                                slot="content"
                                :to="{
                                    name: 'channel-detail',
                                    query: {
                                        enterpriseCode: userInfo.enterpriseCode,
                                        agentId: $route.query.agentId,
                                        memberCode: item.memberCode
                                    }
                                }">

                        <div v-if="item.adChannelStatus == '0'" class="no-read"></div>
                        <div class="weui-media-box__hd">
                            <img class="weui-media-box__thumb" :src="item.memberImage">
                        </div>
                        <div class="weui-media-box__bd">
                            <h4 class="weui-media-box__title">{{item.memberWechatNickname}}</h4>
                            <p class="weui-media-box__desc">{{item.memberMobile}}</p>
                        </div>
                        <!-- <div class="weui-cell__ft" v-if="item.adChannelStatus == '1'"><span class="is-doing">正常</span></div>
                        <div class="weui-cell__ft" v-if="item.adChannelStatus == '0'"><span class="is-waiting">待绑</span></div> -->
                    </router-link>
                </swipeout-item>
            </swipeout>
        </div>

        <div class="null-page" v-if="!listData.length && isPage">
            暂无内容！
        </div>

        <div class="btn-height-box"></div>
        <div class="weui-btn-area" @click="addMember">
            <a class="weui-btn weui-btn_primary">添加</a>
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import sheet from '../common/sheet.vue'
import { mapGetters } from 'vuex'
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'

export default {
    data () {
        return {
            isPage: false,
            listData: [],
            pageSize: 20,
            pageNumber: 1,
            total: 0
        }
    },
    mounted () {
        jsSdk.init()
        this.getList()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isLoad () {
            return this.total > this.listData.length
        }
    },
    methods: {
        showMore (cb) {
            this.pageNumber++
            this.getList(cb)
        },
        addMember (type) {
            var link = 'http://site.socialmarketingcloud.com/channelRegister?enterpriseCode=' + this.userInfo.enterpriseCode + '&agentId=' + this.$route.query.agentId + '&userId=' + this.userInfo.userWechatUserid + '&appid=' + this.userInfo.userWechatAppid  + '&userCode=' + this.userInfo.userCode

            window.wx.invoke("shareWechatMessage", {
                title: '微信推广会员邀请',
                desc: '诚邀您成为企业微信推广会',
                link: link,
                imgUrl: this.userInfo.userWechatLogo
            }, (res) => {
                    // if (res.err_msg != "shareWechatMessage:ok") {
                    //     this.$message.error('请更新企业微信版本！！！')
                    // }
            })
        },
        getList (cb) {
            var formData = {
                enterpriseCode: this.userInfo.enterpriseCode,
                adManager: this.userInfo.userCode,
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }

            util.request({
                method: 'get',
                interface: 'getChannels',
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
        },
        deleteItem (item) {
            var formData = {
                enterpriseCode: this.userInfo.enterpriseCode,
                memberCode: item.memberCode
            }

            util.request({
                method: 'get',
                interface: 'deleteChannel',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.$message({
                      showClose: true,
                      message: '删除成功！',
                      type: 'success'
                    })
                    this.getList()
                } else {
                    this.$message.error(res.result.message)
                }
            })
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
.channel-list-box {
    .vux-swipeout-item {
        border-bottom: 1px solid #D9D9D9;
    }
}
</style>