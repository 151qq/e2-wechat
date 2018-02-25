<template>
    <section class="user-role-list">
        <template v-for="(role, index) in userList">
            <div class="wx-area-line" v-if="index"></div>
            <div class="weui-cells no-margin">
                <div class="weui-cell weui-cell_access show-message-box" @click="goToUser(role)">
                    <div class="weui-cell__bd">{{role.roleName}}</div>
                    <div class="weui-cell__ft">
                        <span class="add-btn-icon"></span>
                    </div>
                </div>
            </div>
            <div class="weui-cells no-margin">
                <swipeout>
                    <swipeout-item transition-mode="follow"
                                    v-for="(item, index) in role.userInfoList" :key="index">

                        <div slot="right-menu">
                            <swipeout-button @click.native="deleteItem(role, item)" type="warn">
                                删除
                            </swipeout-button>
                        </div>
                        <a class="weui-media-box weui-media-box_appmsg" slot="content">
                            <div class="weui-media-box__hd">
                                <img class="weui-media-box__thumb" :src="item.userWechatLogo">
                            </div>
                            <div class="weui-media-box__bd">
                                <h4 class="weui-media-box__title">{{item.userWechatNickname}}</h4>
                                <p class="weui-media-box__desc">{{item.userLoginAccount}}</p>
                            </div>
                        </a>
                    </swipeout-item>
                </swipeout>
                <div class="null-box" v-if="role.userInfoList && !role.userInfoList.length">暂无人员！</div>
            </div>
        </template>
    </section>
</template>
<script>
import util from '../../utils/tools'
import { mapGetters } from 'vuex'
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'

export default {
    data () {
        return {
            userList: []
        }
    },
    mounted () {
        this.getRoles()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        getRoles () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode
            }

            util.request({
                method: 'get',
                interface: 'allRole',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.userList = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        deleteItem (role, user) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                roleCode: role.roleCode,
                userCode: user.userCode
            }

            util.request({
                method: 'get',
                interface: 'delectUserRole',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.$message({
                      showClose: true,
                      message: '删除成功！',
                      type: 'success'
                    })
                    this.getRoles()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        goToUser (role) {
            if (role.userInfoList.length) {
                this.$message({
                  showClose: true,
                  message: '该角色下只能有一人！',
                  type: 'warning'
                })
                return false
            }

            var urlPath = window.location.href.replace('setRole', 'submitRole')
            urlPath = urlPath + '&roleCode=' + role.roleCode

            var pathUrl = {
                name: 'user-list',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    roleCode: role.roleCode,
                    type: 'unique',
                    redirectUrl: window.encodeURIComponent(urlPath)
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