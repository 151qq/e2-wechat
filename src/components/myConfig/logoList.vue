<template>
    <section class="packet-box page__hd">
        <div class="weui-cells no-margin show-state-box">
            <a  class="weui-media-box weui-media-box_appmsg">
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" :src="userInfo.userWechatLogo">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{userInfo.userWechatNickname}}</h4>
                    <p class="weui-media-box__desc">{{userInfo.userLoginAccount}}</p>
                </div>
                <div class="weui-cell__ft" @click="changeMobile">
                    <span class="is-doing">更新</span>
                </div>
            </a>
        </div>
        <!-- <div class="weui-cells no-margin">
            <div class="wx-cell">
                <div class="wx-left-cell">11月09日</div>
                <div class="wx-right-cell">
                    <div class="wx-cell-title">+2000</div>
                    <div class="wx-cell-des">完成爱咋咋地任务</div>
                </div>
            </div>
            <div class="wx-cell">
                <div class="wx-left-cell">11月09日</div>
                <div class="wx-right-cell">
                    <div class="wx-cell-title">+2000</div>
                    <div class="wx-cell-des">完成爱咋咋地任务</div>
                </div>
            </div>
        </div> -->
        <div class="wx-bottom-nav">
            <router-link class="wx-nav-item"
                            :to="{
                                name: 'set-role',
                                query: {
                                    enterpriseCode: userInfo.enterpriseCode,
                                    agentId: $route.query.agentId
                                }
                            }">
                授权
            </router-link>
            <router-link class="wx-nav-item"
                        :to="{
                            name: 'user-info',
                            query: {
                                enterpriseCode: userInfo.enterpriseCode,
                                agentId: $route.query.agentId
                            }
                        }">
                个人信息
            </router-link>
        </div>
    </section>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    data () {
        return {}
    },
    mounted () {
        console.log(this.userInfo)
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        changeMobile () {
            var path = 'http://site.socialmarketing.com/enterpriseRegistor?enterpriseCode=' + this.$route.query.enterpriseCode + '&agentId=' + this.$route.query.agentId + '&redirectUrl=' + window.encodeURIComponent(window.location.href) + '&userId=' + this.userInfo.userWechatUserid + '&userCode=' + this.userInfo.userCode

            var pathUrl = util.formDataUrl(path)
            this.$router.replace(pathUrl)
        }
    }
}
</script>