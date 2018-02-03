<template>
    <section class="attachment-delete-box">
        <div class="weui-cells no-margin">
            <swipeout>
                <!-- 营销活动方案 -->
                <template v-if="attachmentData.targetType == 'attachmen_type_2'">
                    <swipeout-item transition-mode="follow"
                                    v-for="(item, index) in attachmentData.attachmentList">

                        <div slot="right-menu">
                            <swipeout-button @click.native="deleteItem(index)" type="warn">
                                删除
                            </swipeout-button>
                        </div>
                        <router-link class="weui-media-box weui-media-box_appmsg"
                                slot="content"
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
                    </swipeout-item>
                </template>
                <!-- 任务列表 -->
                <template v-if="attachmentData.targetType == 'attachmen_type_3'">
                    <swipeout-item transition-mode="follow"
                                    v-for="(item, index) in attachmentData.attachmentList">

                        <div slot="right-menu">
                            <swipeout-button @click.native="deleteItem(index)" type="warn">
                                删除
                            </swipeout-button>
                        </div>
                        <router-link class="weui-media-box weui-media-box_appmsg"
                                slot="content"
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
                    </swipeout-item>
                </template>
                <!-- 推广文章 -->
                <template v-if="attachmentData.targetType == 'attachmen_type_4'">
                    <swipeout-item transition-mode="follow"
                                    v-for="(item, index) in attachmentData.attachmentList">

                        <div slot="right-menu">
                            <swipeout-button @click.native="deleteItem(index)" type="warn">
                                删除
                            </swipeout-button>
                        </div>
                        <router-link class="weui-media-box weui-media-box_appmsg"
                                slot="content"
                                :to="{
                                        name: 'article-detail',
                                        query: {
                                            enterpriseCode: $route.query.enterpriseCode,
                                            agentId: $route.query.agentId,
                                            pageCode: item.pageCode,
                                            appid: item.pubWechatAppId,
                                            templateCode: item.templateCode,
                                            S: userInfo.userCode,
                                            C: 'e2nochannel',
                                            T: 'e2nospread'
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
                    </swipeout-item>
                </template>
                <!-- 产品中心 -->
                <template v-if="attachmentData.targetType == 'attachmen_type_5'">
                    <swipeout-item transition-mode="follow"
                                    v-for="(item, index) in attachmentData.attachmentList">

                        <div slot="right-menu">
                            <swipeout-button @click.native="deleteItem(index)" type="warn">
                                删除
                            </swipeout-button>
                        </div>
                        <router-link class="weui-media-box weui-media-box_appmsg"
                                slot="content"
                                :to="{
                                        name: 'product-detail',
                                        query: {
                                            enterpriseCode: $route.query.enterpriseCode,
                                            agentId: $route.query.agentId,
                                            pageCode: item.pageCode,
                                            templateCode: item.templateCode
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
                    </swipeout-item>
                </template>
                <!-- 地推活动 -->
                <template v-if="attachmentData.targetType == 'attachmen_type_7'">
                    <swipeout-item transition-mode="follow"
                                    v-for="(item, index) in attachmentData.attachmentList">

                        <div slot="right-menu">
                            <swipeout-button @click.native="deleteItem(index)" type="warn">
                                删除
                            </swipeout-button>
                        </div>
                        <router-link class="weui-media-box weui-media-box_appmsg"
                                slot="content"
                                :to="{
                                        name: 'party-detail',
                                        query: {
                                            enterpriseCode: $route.query.enterpriseCode,
                                            agentId: $route.query.agentId,
                                            partyCode: item.partyCode
                                        }
                                    }">
                            <div class="weui-media-box__hd">
                                <img class="weui-media-box__thumb" :src="item.addrLink">
                            </div>
                            <div class="weui-media-box__bd">
                                <h4 class="weui-media-box__title">{{item.partyTitle}}</h4>
                                <p class="weui-media-box__desc">
                                    {{item.planBeginTime.split(' ')[0] + ' - ' + item.planEndTime.split(' ')[0]}}
                                </p>
                            </div>
                        </router-link>
                    </swipeout-item>
                </template>
                <!-- 地推活动 -->
                <template v-if="attachmentData.targetType == 'attachmen_type_8'">
                    <swipeout-item transition-mode="follow"
                                    v-for="(item, index) in attachmentData.attachmentList">

                        <div slot="right-menu">
                            <swipeout-button @click.native="deleteItem(index)" type="warn">
                                删除
                            </swipeout-button>
                        </div>
                        <a class="weui-media-box weui-media-box_appmsg"
                            slot="content">
                            <div class="weui-media-box__hd">
                                <img class="weui-media-box__thumb" :src="item.couponGroupCover">
                            </div>
                            <div class="weui-media-box__bd">
                                <h4 class="weui-media-box__title">{{item.couponGroupName}}</h4>
                                <p class="weui-media-box__desc">
                                    {{item.couponGroupIntro}}
                                </p>
                            </div>
                        </a>
                    </swipeout-item>
                </template>
                <!-- 预约 -->
                <template v-if="attachmentData.targetType == 'attachmen_type_6'">
                        
                    <swipeout-item transition-mode="follow"
                                    v-for="(item, index) in attachmentData.attachmentList">

                        <div slot="right-menu">
                            <swipeout-button @click.native="deleteItem(index)" type="warn">
                                删除
                            </swipeout-button>
                        </div>
                        <router-link class="weui-media-box weui-media-box_appmsg"
                                slot="content"
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
                    </swipeout-item>
                </template>
            </swipeout>
        </div>

        <div class="null-box" v-if="!attachmentData.attachmentList || !attachmentData.attachmentList.length">
            暂无内容!
        </div>
    </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'

export default {
    props: ['attachmentData', 'isPage'],
    data () {
        return {}
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        ...mapActions([
          'setAttachment',
          'setAttachmentPage'
        ]),
        deleteItem (index) {
            this.attachmentData.attachmentCodes.splice(index, 1)
            this.attachmentData.attachmentList.splice(index, 1)

            if (this.isPage) {
                this.setAttachmentPage(Object.assign({}, this.attachmentData))
            } else {
                this.setAttachment(Object.assign({}, this.attachmentData))
            }
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
.attachment-delete-box {
    .vux-swipeout-item {
        border-bottom: 1px solid #D9D9D9;
    }
}
</style>