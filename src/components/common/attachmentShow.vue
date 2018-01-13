<template>
    <section>
        <div class="weui-cells no-margin">
            <!-- 营销活动方案 -->
            <template v-if="['attachmen_type_2'].indexOf(attachmentData.attachmentSourceType) > -1">
                <router-link class="weui-media-box weui-media-box_appmsg"
                        v-for="(item, index) in attachmentData.pageData"
                        :to="{name: 'case-detail', query: {
                                enterpriseCode: $route.query.enterpriseCode,
                                agentId: $route.query.agentId,
                                eventCode: item.eventCode
                            }}">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" :src="item.eventPlanCover">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{item.eventPlanTitle}}</h4>
                        <p class="weui-media-box__desc">{{item.eventPlanDesc}}</p>
                    </div>
                </router-link>
            </template>
            <!-- 任务列表 -->
            <template v-if="['attachmen_type_3'].indexOf(attachmentData.attachmentSourceType) > -1">
                <router-link class="weui-media-box weui-media-box_appmsg"
                        v-for="(item, index) in attachmentData.pageData"
                        :to="{
                                name: item.taskType == 1 ? 'edit-detail' : 'activity-detail',
                                query: {
                                    enterpriseCode: $route.query.enterpriseCode,
                                    agentId: $route.query.agentId,
                                    taskCode: item.taskCode
                                }
                            }">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" :src="item.bgTaskImg">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{item.taskTitle}}</h4>
                        <p class="weui-media-box__desc">
                            {{item.taskBeginTime.split(' ')[0] + ' - ' + item.taskEndTime.split(' ')[0]}}
                        </p>
                    </div>
                </router-link>
            </template>
            <!-- 推广文章 产品中心 -->
            <template v-if="['attachmen_type_4', 'attachmen_type_5'].indexOf(attachmentData.attachmentSourceType) > -1">
                <a class="weui-media-box weui-media-box_appmsg"
                        v-for="(item, index) in attachmentData.pageData"
                        :href="'http://site.socialmarketingcloud.com/spreedArticle/detail?enterpriseCode=' + item.enterpriseCode + '&pageCode=' + item.pageCode + '&appid=' + item.appId + '&templateCode=' + item.templateCode + '&S=' + userInfo.userCode + '&C=e2nochannel&T=e2nospread'">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" :src="item.bgTaskImg">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{item.taskTitle}}</h4>
                        <p class="weui-media-box__desc">
                            {{item.taskBeginTime.split(' ')[0] + ' - ' + item.taskEndTime.split(' ')[0]}}
                        </p>
                    </div>
                </a>
            </template>
            <!-- 地推活动 -->
            <template v-if="['attachmen_type_7'].indexOf(attachmentData.attachmentSourceType) > -1">
                <router-link class="weui-media-box weui-media-box_appmsg"
                        v-for="(item, index) in attachmentData.pageData"
                        :to="{
                                name: 'party-detail',
                                query: {
                                    enterpriseCode: $route.query.enterpriseCode,
                                    agentId: $route.query.agentId,
                                    partyCode: item.partyCode
                                }
                            }">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" :src="item.bgTaskImg">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{item.taskTitle}}</h4>
                        <p class="weui-media-box__desc">
                            {{item.taskBeginTime.split(' ')[0] + ' - ' + item.taskEndTime.split(' ')[0]}}
                        </p>
                    </div>
                </router-link>
            </template>
            <!-- 预约 -->
            <template v-if="['attachmen_type_6'].indexOf(attachmentData.attachmentSourceType) > -1">
                <router-link class="weui-media-box weui-media-box_appmsg"
                        v-for="(item, index) in attachmentData.pageData"
                        :to="{
                                name: 'reserve-detail',
                                query: {
                                    enterpriseCode: $route.query.enterpriseCode,
                                    agentId: $route.query.agentId,
                                    reserveCode: item.reserveCode
                                }
                            }">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" :src="item.memberImg">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{item.reserveTitle}}</h4>
                        <p class="weui-media-box__desc">
                            {{item.reserveBeginTime.split(' ')[0] + ' - ' + item.reserveEndTime.split(' ')[0]}}
                        </p>
                    </div>
                </router-link>
            </template>
        </div>

        <div class="null-box" v-if="!attachmentData.pageData || !attachmentData.pageData.length">
            暂无内容!
        </div>
    </section>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    props: ['attachmentData'],
    data () {
        return {}
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    }
}
</script>