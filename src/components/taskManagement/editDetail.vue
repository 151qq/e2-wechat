<template>
    <section class="task-detail-box">
        <div class="height-1"></div>
        <div class="weui-cells__title">基本信息</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">任务标题</div>
                <div class="weui-cell__ft">{{base.taskTitle}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">开始时间</div>
                <div class="weui-cell__ft">{{base.taskBeginTime}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">结束时间</div>
                <div class="weui-cell__ft">{{base.taskEndTime}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">文章数量</div>
                <div class="weui-cell__ft">{{base.pageNum}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">文章主题</div>
                <div class="weui-cell__ft">{{base.pageScenario}}</div>
            </div>
        </div>

        <template v-if="['XPTJ', 'CPCX'].indexOf(base.pageScenario) > -1 && base.pageData.length">
            <div class="weui-cells__title">宣传产品</div>
            <div class="weui-cells no-line">
                <router-link class="weui-media-box weui-media-box_appmsg"
                        v-for="(item, index) in base.pageData"
                        :to="{
                                name: 'article-detail',
                                query: {
                                    enterpriseCode: $route.query.enterpriseCode,
                                    agentId: $route.query.agentId,
                                    pageCode: item.pageCode,
                                    appid: item.pubWechatAppId,
                                    templateCode: item.templateCode,
                                    S: userInfo.userCode,
                                    sShareTo: 'F',
                                    C: 'N',
                                    cShareTo: 'N',
                                    T: userInfo.userCode,
                                    tShareTo: 'N',
                                    spreadType: '1'
                                }
                            }">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" :src="item.pageCover">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{item.pageTitle}}</h4>
                        <p class="weui-media-box__desc">{{item.pageAbstract}}</p>
                    </div>
                </router-link>
            </div>
        </template>

        <template v-if="['DTHDXC', 'XSXF', 'XXYL'].indexOf(base.pageScenario) > -1 && base.pageData.length">
            <div class="weui-cells__title">线下活动</div>
            <div class="weui-cells no-line">
                <router-link class="weui-media-box weui-media-box_appmsg"
                        v-for="(item, index) in base.pageData"
                        :to="{
                                name: 'party-detail',
                                query: {
                                    enterpriseCode: $route.query.enterpriseCode,
                                    agentId: $route.query.agentId,
                                    partyCode: item.partyCode
                                }
                            }">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" :src="item.bgPartyImg">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{item.partyTitle}}</h4>
                        <p class="weui-media-box__desc">
                            {{item.partyBeginTime.split(' ')[0] + ' - ' + item.partyEndTime.split(' ')[0]}}
                        </p>
                    </div>
                </router-link>
            </div>
        </template>

        <div class="weui-cells__title" v-if="base.taskPageEdit">文章目标读者</div>
        <div class="weui-cells" v-if="base.taskPageEdit">
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">客户性别</div>
                <div class="weui-cell__ft">{{base.taskPageEdit.pageReaderGender}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">所在城市</div>
                <div class="weui-cell__ft">{{base.taskPageEdit.pageReaderCity}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">客户年龄</div>
                <div class="weui-cell__ft">{{base.taskPageEdit.pageReaderAge}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">教育背景</div>
                <div class="weui-cell__ft">{{base.taskPageEdit.pageReaderEdu}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">消费能力</div>
                <div class="weui-cell__ft">{{base.taskPageEdit.pageReaderConsumeLevel}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">客户职业</div>
                <div class="weui-cell__ft">{{base.taskPageEdit.pageReaderCareer}}</div>
            </div>
            <div class="weui-cell weui-cell_access show-message-box">
                <div class="weui-cell__bd">工作单位</div>
                <div class="weui-cell__ft">{{base.taskPageEdit.pageReaderEnterprise}}</div>
            </div>
        </div>

        <div class="weui-cells__title">任务详情</div>
        <div class="wx-area-text">{{base.taskDesc}}</div>
        <div class="wx-area-text" v-if="attachmentData.imgData.length">
            <img-list :img-list="attachmentData.imgData"></img-list>
        </div>
        <div class="weui-cells__title">任务附件</div>
        <attachment-show :attachment-data="attachmentData"></attachment-show>
        
        <div class="wx-area-line"></div>
        <div class="wx-area-padding">
            <comment-show :comment-url="'edit-comment'" :text-title="textTitle" :is-edit="true"></comment-show>
        </div>

        <!-- <div class="btn-height-box"></div>
        <div class="wx-bottom-nav">
            <router-link class="wx-nav-item"
                            :to="{name: 'marketPacket'}">
                红包
            </router-link>
            <router-link class="wx-nav-item"
                            :to="{}">
                研讨
            </router-link>
            <router-link class="wx-nav-item-30"
                            :to="{name: 'comment-chat'}">
                未读汇报（2）
            </router-link>
            <router-link class="wx-nav-item"
                            :to="{name: 'marketPacket'}">
                发表意见
            </router-link>
        </div> -->
    </section>
</template>
<script>
import imgList from '../common/imgList.vue'
import commentShow from './commentShow.vue'
import attachmentShow from '../common/attachmentShow.vue'
import util from '../../utils/tools'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            isPage: false,
            base: {
                taskTitle: '',
                taskBeginTime: '',
                taskEndTime: '',
                taskDesc: '',
                pageData: [],
                partyData: []
            },
            attachmentData: {
                sourceType: '',
                imgData: [],
                pageData: []
            },
            textTitle: '任务汇报'
        }
    },
    mounted () {
        this.getBase()
        this.getAttachments()
    },
    watch: {
        $route () {
            this.getBase()
            this.getAttachments()
        }
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
                taskCode: this.$route.query.taskCode
            }

            util.request({
                method: 'get',
                interface: 'getTask',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.base = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getAttachments () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                targetCode: this.$route.query.taskCode,
                targetType: 'task'
            }

            util.request({
                method: 'post',
                interface: 'getAttachments',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.attachmentData = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    },
    components: {
        imgList,
        commentShow,
        attachmentShow
    }
}
</script>