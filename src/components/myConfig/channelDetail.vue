<template>
    <section class="member-detail-box">
        <div class="wx-area-img">
            <img :src="coverImg">
        </div>
        <div class="avatar-box">
            <div class="img-box">
                <img :src="base.memberImage">
            </div>
            <div class="name-box">
                {{base.memberName}}
            </div>
        </div>

        <div class="weui-cells show-message-box">
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd"><label class="weui-label">推广身份</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select"
                            v-model="base.accuntType">
                        <option value=""></option>
                        <option
                            v-for="(item, index) in scenarioList" :key="index"
                            :value="item.keyCode">
                            {{item.keyValue}}
                        </option>
                    </select>
                </div>
                <div class="weui-cell__ft red-color">*</div>
            </div>
        </div>
        
        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin">
            <router-link class="weui-cell weui-cell_access"
                        :to="{
                            name: 'member-counts',
                            query: {
                                enterpriseCode: $route.query.enterpriseCode,
                                agentId: $route.query.agentId,
                                memberCode: $route.query.memberCode
                            }
                        }">
                <div class="weui-cell__hd"><label class="weui-label">积分</label></div>
                <div class="weui-cell__bd">{{base.promoterIncentiveCount}}</div>
                <div class="weui-cell__ft"></div>
            </router-link>
        </div>

        <div class="wx-area-line"></div>
        <div class="weui-cells no-margin">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__hd"><label class="weui-label">会员</label></div>
                <div class="weui-cell__bd">{{countData.memberCount}}</div>
            </div>  
            <div class="weui-cell weui-cell_access no-center">
                <div class="weui-cell__hd"><label class="weui-label">传播</label></div>
                <div class="weui-cell__bd">
                   {{countData.promoterSpreadCount}}
                </div>
            </div>            
        </div>

        <div class="btn-height-box"></div>
        <div class="weui-btn-area" v-if="base.adChannelStatus == '0'">
            <a class="weui-btn weui-btn_primary" @click="changeStatus">捆绑</a>
        </div>

        <div class="weui-btn-area" v-else>
            <a class="weui-btn weui-btn_primary" @click="changeStatus">修改</a>
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
            isPage: false,
            base: {
                memberImage: '',
                memberName: '',
                accuntType: '',
                adChannelStatus: ''
            },
            scenarioList: [],
            countData: {
                memberCount: '',
                promoterSpreadCount: ''
            }
        }
    },
    mounted () {
        this.coverImg = '/static/images/B' + Math.ceil(Math.random() * 13) + '.jpg'
        this.getBase()
        this.getTypes()
        this.getCounts()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        getBase () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                memberCode: this.$route.query.memberCode
            }

            util.request({
                method: 'get',
                interface: 'getChannelInfo',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.base = res.result.result.promoterBaseInfoForm
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getCounts () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                memberCode: this.$route.query.memberCode
            }

            util.request({
                method: 'get',
                interface: 'getPromoterCountInfo',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.countData = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getTypes () {
            util.request({
                method: 'get',
                interface: 'getPromoterAccuntType',
                data: {}
            }).then(res => {
                if (res.result.success == '1') {
                    this.scenarioList = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        changeStatus () {
            if (!this.base.accuntType) {
                this.$message({
                    message: '请选择推广身份!',
                    type: 'warning'
                })
                return false
            }

            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                memberCode: this.$route.query.memberCode,
                accuntType: this.base.accuntType
            }

            util.request({
                method: 'get',
                interface: 'updateChannelStatus',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.$message({
                      message: '恭喜你，操作成功！',
                      type: 'success'
                    })
                    this.getBase()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>