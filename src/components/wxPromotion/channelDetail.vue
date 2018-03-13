<template>
    <section class="member-detail-box">
        <div class="wx-area-img">
            <img :src="coverImg">
        </div>
        <div class="avatar-box">
            <div class="img-box">
                <img :src="base.promoterBaseInfoForm.memberImage">
            </div>
            <div class="name-box">
                {{base.promoterBaseInfoForm.memberName}}
            </div>
        </div>

        <group title="" label-width="105px">
            <selector title="推广身份"
                      placeholder="请选择"
                      :value-map="scenarioMap"
                      :options="scenarioList"
                      v-model="base.promoterBaseInfoForm.accuntType"></selector>
        </group>

        <div class="btn-height-box"></div>
        <div class="weui-btn-area" v-if="base.promoterBaseInfoForm.adChannelStatus == '0'">
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
import { Group, Selector } from 'vux'

export default {
    data () {
        return {
            coverImg: '',
            isPage: false,
            base: {
                fansCountForm: {},
                promoterBaseInfoForm: {
                    accuntType: ''
                },
                promoterCountForm: {}
            },
            scenarioMap: ['keyCode', 'keyValue'],
            scenarioList: []
        }
    },
    mounted () {
        this.coverImg = '/static/images/B' + Math.ceil(Math.random() * 13) + '.jpg'
        this.getBase()
        this.getTypes()
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
                    this.base = res.result.result
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
            if (!this.base.promoterBaseInfoForm.accuntType) {
                this.$message({
                    message: '请选择推广身份!',
                    type: 'warning'
                })
                return false
            }

            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                memberCode: this.$route.query.memberCode,
                accuntType: this.base.promoterBaseInfoForm.accuntType
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
    },
    components: {
        Group,
        Selector
    }
}
</script>