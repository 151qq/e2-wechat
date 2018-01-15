<template>
    <section class="task-detail-box">
        <div class="height-1"></div>
        <group title="基本信息" label-width="105px">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">姓名</div>
                <div class="weui-cell__ft">{{base.promoterBaseInfoForm.memberName}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">手机号</div>
                <div class="weui-cell__ft">{{base.promoterBaseInfoForm.memberMobile}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">性别</div>
                <div class="weui-cell__ft">
                    {{base.promoterBaseInfoForm.memberGender == 'gender_2' ? '女' : '男'}}
                </div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">每次转发</div>
                <div class="weui-cell__ft">{{base.promoterBaseInfoForm.shareCost}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">每次阅读</div>
                <div class="weui-cell__ft">{{base.promoterBaseInfoForm.readingCost}}</div>
            </div>
            <selector title="渠道类型"
                      placeholder="请选择"
                      :value-map="scenarioMap"
                      :options="scenarioList"
                      v-model="base.promoterBaseInfoForm.accuntType"></selector>
        </group>
        <div class="weui-cells__title">统计信息</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">推广次数</div>
                <div class="weui-cell__ft">{{base.promoterCountForm.promoterSum}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">阅读总数</div>
                <div class="weui-cell__ft">{{base.promoterCountForm.spreadReadingSum}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">新增潜客</div>
                <div class="weui-cell__ft">{{base.promoterCountForm.spreadHotLeadsSum}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">推广效率</div>
                <div class="weui-cell__ft">{{base.promoterCountForm.promoterEfficiency}}</div>
            </div>
        </div>
        <div class="weui-cells__title">粉丝信息</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">粉丝性别</div>
                <div class="weui-cell__ft">{{base.fansCountForm.age}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">粉丝年龄</div>
                <div class="weui-cell__ft">{{base.fansCountForm.gender}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">粉丝学历</div>
                <div class="weui-cell__ft">{{base.fansCountForm.education}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">粉丝消费</div>
                <div class="weui-cell__ft">{{base.fansCountForm.consumeLevel}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">粉丝职业</div>
                <div class="weui-cell__ft">{{base.fansCountForm.career}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">粉丝行业</div>
                <div class="weui-cell__ft">{{base.fansCountForm.industry}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">粉丝单位</div>
                <div class="weui-cell__ft">{{base.fansCountForm.unit}}</div>
            </div>
        </div>

        <div class="btn-height-box" v-if="base.promoterBaseInfoForm.adChannelStatus == '0'"></div>
        <div class="weui-btn-area" v-if="base.promoterBaseInfoForm.adChannelStatus == '0'">
            <a class="weui-btn weui-btn_primary" @click="changeStatus">确认</a>
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
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                memberCode: this.$route.query.memberCode
            }

            util.request({
                method: 'post',
                interface: 'updateChannelStatus',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.scenarioList = res.result.result
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