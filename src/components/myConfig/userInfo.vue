<template>
    <section class="member-detail-box">
        <div class="wx-area-img">
            <img :src="coverImg">
        </div>
        <div class="avatar-box">
            <div class="img-box">
                <img :src="userInfo.userWechatLogo">
            </div>
            <div class="name-box">
                {{userInfo.userWechatNickname}}
            </div>
        </div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">姓名</div>
                <div class="weui-cell__ft">{{userInfo.userWechatNickname}}</div>
            </div>
            <div class="weui-cell weui-cell_access" @click="changeMobile">
                <div class="weui-cell__bd">手机</div>
                <div class="weui-cell__ft">{{userInfo.userLoginAccount}}</div>
            </div>
        </div>
        <div class="weui-cells__title">权限</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box"
                v-for="(item, index) in userInfo.securityRole"
                :key="index">
                <div class="weui-cell__bd">{{index + 1}}</div>
                <div class="weui-cell__ft">{{item.roleName}}</div>
            </div>
        </div>

        <div class="btn-height-box" v-if="isRoot"></div>
        <div class="weui-btn-area" v-if="isRoot">
            <router-link class="weui-btn weui-btn_primary"
                            :to="{
                                name: 'set-role',
                                query: {
                                    enterpriseCode: userInfo.enterpriseCode,
                                    agentId: $route.query.agentId
                                }
                            }">
                授权
            </router-link>
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            coverImg: ''
        }
    },
    mounted () {
        this.coverImg = '/static/images/B' + Math.ceil(Math.random() * 13) + '.jpg'
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isRoot () {
            var roleCodes = []
            this.userInfo.securityRole.forEach((item) => {
                roleCodes.push(item.roleCode)
            })

            return roleCodes.indexOf('platform_root') > -1 || roleCodes.indexOf('enterprise_root') > -1
        }
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