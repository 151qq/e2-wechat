<template>
    <section class="article-list-box page__bd">
        <div class="weui-cells no-margin" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
            <!-- site.socialmarketingcloud.com  localhost:8890-->
            <div  class="weui-media-box weui-media-box_appmsg"
                @click="addAttachment(item)"
                v-for="(item, index) in listData">
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" :src="item.userImage">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{item.userLoginName}}</h4>
                </div>
                <div class="weui-cell__ft">
                    <span :class="userList.indexOf(item) > -1 ? 'weui-icon-success' : 'weui-icon-circle'"></span>
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
        this.getList()
    },
    computed: {
        ...mapGetters({
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
            } else {
                var pathUrl = util.formDataUrl(window.decodeURIComponent(this.$route.query.redirectUrl))
                this.$router.push(pathUrl)
            }
        },
        addAttachment (item) {
            var index = this.userList.indexOf(item)

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
        setRole () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
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
                    this.$router.push(pathUrl)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>