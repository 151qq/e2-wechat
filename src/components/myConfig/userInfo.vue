<template>
    <section class="member-detail-box show-message-box">
        <div class="wx-area-img" @click="changeMobile">
            <img :src="coverImg">
            <div class="head-avatar-box">
                <div class="user-logo-box">
                    <img :src="userInfo.userWechatLogo">
                </div>
                <div class="user-info-box">
                    <span class="user-name-box">{{userInfo.userWechatNickname}}</span>
                    <span class="user-tel-box">{{userInfo.userLoginAccount}}</span>
                </div>
            </div>
        </div>
        <div class="avatar-box">
            <div class="img-box">
                <img :src="userInfo.userWechatQrcode">
            </div>
        </div>

        <div class="wx-area-line"></div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box"
                v-for="(item, index) in userInfo.securityRole"
                :key="index">
                <div class="weui-cell__bd">{{item.roleName}}</div>
                <div class="weui-cell__ft">
                    <i class="weui-icon-success"></i>
                </div>
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
            var pathUrl = {
                name: 'registor-message',
                query: {
                    enterpriseCode: data.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    userId: this.userInfo.userWechatUserid,
                    userCode: this.userInfo.userCode,
                    appid: this.userInfo.userWechatAppid
                }
            }

            this.$router.push(pathUrl)
        }
    }
}
</script>