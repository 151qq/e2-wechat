<template>
    <section class="member-detail-box">
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

        <div class="weui-cells text-align-right">
            <router-link class="weui-cell weui-cell_access"
                        :to="{
                            name: 'user-counts',
                            query: {
                                enterpriseCode: $route.query.enterpriseCode,
                                agentId: $route.query.agentId,
                                userCode: $route.query.userCode
                            }
                        }">
                <div class="weui-cell__hd"><label class="weui-label">积分</label></div>
                <div class="weui-cell__bd">{{countData.userIncentiveCount}}</div>
                <!-- <div class="weui-cell__ft"></div> -->
            </router-link>           
        </div>
        
        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin show-message-box text-align-right">
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__hd"><label class="weui-label">推广会员</label></div>
                <div class="weui-cell__bd">{{countData.promoterCount}}</div>
            </div>
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__hd"><label class="weui-label">会员</label></div>
                <div class="weui-cell__bd">{{countData.memberCount}}</div>
            </div>
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__hd"><label class="weui-label">商机</label></div>
                <div class="weui-cell__bd">
                   {{countData.pipelineCount}}
                </div>
            </div>
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__hd"><label class="weui-label">销售中</label></div>
                <div class="weui-cell__bd">
                   {{countData.trailPipelineCount}}
                </div>
            </div>   
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__hd"><label class="weui-label">商机转换率</label></div>
                <div class="weui-cell__bd">
                   {{countData.pipelineCVR}}
                </div>
            </div>   
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__hd"><label class="weui-label">传播</label></div>
                <div class="weui-cell__bd">
                   {{countData.userSpreadCount}}
                </div>
            </div>            
        </div>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin">
            <div class="weui-cell weui-cell_access show-message-box"
                v-for="(item, index) in userInfo.securityRole"
                :key="index">
                <div class="weui-cell__bd"><span class="color666">{{item.roleName}}</span></div>
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
            coverImg: '',
            countData: {
                memberCount: '',
                pipelineCVR: '',
                pipelineCount: '',
                promoterCount: '',
                trailPipelineCount: '',
                userSpreadCount: ''
            }
        }
    },
    mounted () {
        this.coverImg = '/static/images/B' + Math.ceil(Math.random() * 13) + '.jpg'
        this.getCounts()
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
        getCounts () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                userCode: this.userInfo.userCode
            }

            util.request({
                method: 'get',
                interface: 'getUserCountInfo',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.countData = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        changeMobile () {
            var pathUrl = {
                name: 'registor-message',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
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