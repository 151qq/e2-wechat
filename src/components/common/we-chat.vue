<template>
    <section>
        <div class="height-1"></div>
        <div class="weui-cells no-margin show-message-box">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">讨论组名称</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" placeholder="请输入文字" v-model="groupName">
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>
        </div>
        
        <div class="btn-height-box"></div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="goWeChat">创建讨论组</a>
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            groupName: ''
        }
    },
    mounted () {
        jsSdk.init()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            userData: 'getUser'
        })
    },
    methods: {
        ...mapActions([
          'setUser'
        ]),
        goWeChat () {
            if (!this.groupName) {
                this.$message({
                    message: '请填写讨论组名称!',
                    type: 'warning'
                })
                return false
            }

            if (!this.userData.userCodes || !this.userData.userCodes.length) {
                this.$message({
                    message: '请先选择组员!',
                    type: 'warning'
                })
                return false
            }

            var _self = this

            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                userCodes: this.userData.userCodes
            }

            util.request({
                method: 'post',
                interface: 'getUserIds',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.setUser({})
                    var stringIds = res.result.result.join(';')

                    window.wx.openEnterpriseChat({
                        userIds: stringIds,
                        groupName: _self.groupName,
                        success: function(res) {
                            // alert(JSON.stringify(res))
                        },
                        fail: function(res) {
                            if(res.errMsg.indexOf('function not exist') > -1){
                                alert('版本过低请升级')
                            }
                        }
                    })
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>