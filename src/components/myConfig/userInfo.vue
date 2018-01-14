<template>
    <section class="member-detail-box">
        <div class="wx-area-img">
            <img :src="coverImg">
        </div>
        <div class="avatar-box">
            <div class="img-box">
                <img :src="userInfo.userImage">
            </div>
            <div class="name-box">
                {{userInfo.userLoginName}}
            </div>
        </div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">姓名</div>
                <div class="weui-cell__ft">{{userInfo.userLoginName}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">手机</div>
                <div class="weui-cell__ft">{{userInfo.userInfo.userMobile}}</div>
            </div>
        </div>
        <div class="weui-cells__title">权限</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box"
                v-for="(item, index) in userInfo.securityUserRoles"
                :key="index">
                <div class="weui-cell__bd">{{index + 1}}</div>
                <div class="weui-cell__ft">{{item.roleDesc}}</div>
            </div>
        </div>
        
        <div class="btn-height-box"></div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="changeMobile">修改手机</a>
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
        })
    },
    methods: {
        changeMobile () {
            var path = 'http://site.socialmarketing.com/registor?enterpriseCode=' + this.$route.query.enterpriseCode + '&agentId=' + this.$route.query.agentId + '&redirectUrl=' + window.encodeURIComponent(window.location.href) + '&userId=' + this.userInfo.userWechatUserid + '&userCode=' + this.userInfo.userCode

            window.location.href = path
        }
    }
}
</script>