<template>
    <section class="article-list-box page__bd show-message-box">
        <div class="weui-cells no-margin" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
            <!-- site.socialmarketingcloud.com  localhost:8890-->
            <div class="weui-cell weui-cell_access"
                @click="addAttachment(item)"
                v-for="(item, index) in listData">
                <div class="weui-cell__hd">
                    <img class="small-img" :src="item.memberImage">
                </div>
                <div class="weui-cell__bd weui-cell_primary">
                    <div>{{item.memberWechatNickname}}</div>
                </div>
                <div class="weui-cell__ft">
                    <span :class="userCodes.indexOf(item.memberCode) > -1 ? 'weui-icon-success' : 'weui-icon-circle'"></span>
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

        if (this.channelData.userCodes) {
            this.userCodes = this.channelData.userCodes.concat([])
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            channelData: 'getChannel'
        }),
        isLoad () {
            return this.total > this.listData.length
        }
    },
    methods: {
        ...mapActions([
          'setChannel'
        ]),
        saveAttachment () {
            var attData = {
                userList: [],
                userCodes: []
            }

            if (this.$route.query.type != 'unique' && this.channelData.userList) {
                attData.userList = this.channelData.userList.concat(this.userList)
                attData.userCodes = this.channelData.userCodes.concat(this.userCodes)
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

            this.setChannel(attData)

            // 是否是给用户授权角色
            this.$router.go(-1)
        },
        addAttachment (item) {
            var index = this.userCodes.indexOf(item.memberCode)

            if (index > -1) {
                this.userCodes.splice(index, 1)
                this.userList.splice(index, 1)
            } else {
                this.userCodes.push(item.memberCode)
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
                adManager: this.userInfo.userCode,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
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
        }
    }
}
</script>