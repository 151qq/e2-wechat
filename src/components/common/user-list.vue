<template>
    <section class="article-list-box page__bd show-message-box">
        <div class="weui-cells no-margin" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
            <!-- site.socialmarketingcloud.com  localhost:8890-->
            <div class="weui-cell weui-cell_access"
                @click="addAttachment(item)"
                v-if="userInfo.userCode != item.userCode"
                v-for="(item, index) in listData">
                <div class="weui-cell__hd">
                    <img class="small-img" :src="item.userWechatLogo">
                </div>
                <div class="weui-cell__bd weui-cell_primary">
                    <div class="small-title">{{item.userName}}</div>
                </div>
                <div class="weui-cell__ft">
                    <span :class="userCodes.indexOf(item.userCode) > -1 ? 'weui-icon-success' : 'weui-icon-circle'"></span>
                </div>
            </div>
        </div>

        <div class="null-page" v-if="!listData.length && isPage">
            暂无内容！
        </div>
        
        <div class="btn-height-box"></div>
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
            userList: [],
            userCodes: [],
            pageSize: 20,
            pageNumber: 1,
            total: 0,
            userId: ''
        }
    },
    mounted () {
        if (this.$route.query.roleType) {
            this.getListByRole()
        } else {
            this.getList()
        }
        if (this.$route.query.isUpdate == '1') {
            this.getAdds()
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            userData: 'getUser'
        }),
        isLoad () {
            return this.total > this.listData.length
        }
    },
    methods: {
        ...mapActions([
          'setUser'
        ]),
        saveAttachment () {
            var attData = {
                userList: [],
                userCodes: []
            }

            if (this.$route.query.type != 'unique' && this.userData.userList) {
                attData.userList = this.userData.userList.concat(this.userList)
                attData.userCodes = this.userData.userCodes.concat(this.userCodes)
            } else {
                attData.userList = [].concat(this.userList)
                attData.userCodes = [].concat(this.userCodes)
            }

            if (attData.userList.length > 1 && this.$route.query.type == 'unique') {
                this.$message({
                  showClose: true,
                  message: '最多选中一个用户！',
                  type: 'warning'
                })
                return false
            }

            this.setUser(attData)

            // 是否是给用户授权角色
            if (this.$route.query.roleCode) {
                this.setRole()
            } else if (this.$route.query.partyCode) {
                this.sendParty()
            } else if (this.$route.query.taskCode) {
                this.sendTask()
            } else if (this.$route.query.eventCode) {
                this.sendCase()
            } else {
                var pathUrl = util.formDataUrl(window.decodeURIComponent(this.$route.query.redirectUrl))
                this.$router.replace(pathUrl)
            }
        },
        addAttachment (item) {
            var index = this.userCodes.indexOf(item.userCode)

            if (index > -1) {
                this.userCodes.splice(index, 1)
                this.userList.splice(index, 1)
            } else {
                this.userCodes.push(item.userCode)
                this.userList.push(item)
            }
        },
        showMore (cb) {
            this.pageNumber++
            this.getList(cb)
        },
        getList (cb) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }

            util.request({
                method: 'get',
                interface: 'selectUserInfoOfPage',
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
        getListByRole (cb) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                roleCode: this.$route.query.roleType,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }

            util.request({
                method: 'get',
                interface: 'getUserByRoleCodes',
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
        getAdds () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                partyCode: this.$route.query.partyCode
            }

            util.request({
                method: 'get',
                interface: 'partyAttendee',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    var userCodes = []
                    res.result.result.forEach((item) => {
                        userCodes.push(item.userCode)
                    })

                    this.userCodes = [].concat(userCodes)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        setRole () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                agentId: this.$route.query.agentId,
                roleCode: this.$route.query.roleCode,
                userCodes: this.userCodes
            }

            util.request({
                method: 'post',
                interface: 'authorizeUserRole',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    var pathUrl = util.formDataUrl(window.decodeURIComponent(this.$route.query.redirectUrl))
                    this.$router.replace(pathUrl)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        sendParty () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                agentId: this.$route.query.agentId,
                partyCode: this.$route.query.partyCode,
                userCodes: this.userCodes,
                url: window.decodeURIComponent(this.$route.query.redirectUrl)
            }

            util.request({
                method: 'post',
                interface: 'sendParyMessage',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    var pathUrl = util.formDataUrl(window.decodeURIComponent(this.$route.query.redirectUrl))
                    this.$router.replace(pathUrl)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        sendTask () {
            var formData = Object.assign({}, this.formData)
            formData.userCode = this.userInfo.userCode
            formData.enterpriseCode = this.$route.query.enterpriseCode
            formData.agentId = this.$route.query.agentId
            formData.taskCode = this.$route.query.taskCode
            formData.taskReceiver = this.userCodes
            formData.taskType = this.$route.query.taskType
            formData.message = this.$route.query.taskTitle
            formData.url = window.decodeURIComponent(this.$route.query.redirectUrl)

            util.request({
                method: 'post',
                interface: 'sendTask',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    var pathUrl = util.formDataUrl(window.decodeURIComponent(this.$route.query.redirectUrl))
                    this.$router.replace(pathUrl)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        sendCase () {
            var formData = Object.assign({}, this.formData)
            formData.userCode = this.userInfo.userCode
            formData.enterpriseCode = this.$route.query.enterpriseCode
            formData.agentId = this.$route.query.agentId
            formData.eventCode = this.$route.query.eventCode
            formData.userCodes = this.userCodes
            formData.toUrl = window.decodeURIComponent(this.$route.query.redirectUrl)

            util.request({
                method: 'post',
                interface: 'remindUserToPublishEvent',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    var pathUrl = util.formDataUrl(window.decodeURIComponent(this.$route.query.redirectUrl))
                    this.$router.replace(pathUrl)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>