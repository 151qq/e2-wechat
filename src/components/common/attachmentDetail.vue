<template>
    <section>
        <div class="weui-cells no-margin">
            <!-- 营销活动方案 -->
            <template v-if="attachmentData.targetType == 'attachmen_type_2'">
                <router-link class="weui-media-box weui-media-box_appmsg"
                        v-for="(item, index) in attachmentData.attachmentList"
                        :to="{name: 'case-detail', query: {
                                enterpriseCode: $route.query.enterpriseCode,
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
            <template v-if="attachmentData.targetType == 'attachmen_type_3'">
                <router-link class="weui-media-box weui-media-box_appmsg"
                        v-for="(item, index) in attachmentData.attachmentList"
                        :to="{name: 'case-detail', query: {
                                enterpriseCode: $route.query.enterpriseCode,
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
            <!-- 推广文章 -->
            <template v-if="attachmentData.targetType == 'attachmen_type_4'">
                <router-link class="weui-media-box weui-media-box_appmsg"
                        v-for="(item, index) in attachmentData.attachmentList"
                        :to="{}">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" :src="item.pageCover">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{item.pageTitle}}</h4>
                        <p class="weui-media-box__desc">{{item.pageAbstract}}</p>
                    </div>
                </router-link>
            </template>
            <!-- 产品中心 -->
            <template v-if="attachmentData.targetType == 'attachmen_type_5'">
                <router-link class="weui-media-box weui-media-box_appmsg"
                        v-for="(item, index) in attachmentData.attachmentList"
                        :to="{}">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" :src="item.catalogImage">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{item.catalogCname}}</h4>
                        <p class="weui-media-box__desc">{{item.catalogDesc}}</p>
                    </div>
                </router-link>
            </template>
            <!-- 宣传材料 -->
            <template v-if="attachmentData.targetType == 'attachmen_type_8'">
                <router-link class="weui-media-box weui-media-box_appmsg"
                        v-for="(item, index) in attachmentData.attachmentList"
                        :to="{}">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" :src="item.pageCover">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{item.pageTitle}}</h4>
                        <p class="weui-media-box__desc">{{item.pageAbstract}}</p>
                    </div>
                </router-link>
            </template>
            <!-- 预约 -->
            <template v-if="attachmentData.targetType == 'attachmen_type_6'">
                <router-link class="weui-media-box weui-media-box_appmsg"
                        v-for="(item, index) in attachmentData.attachmentList"
                        :to="{name: 'case-detail', query: {
                                enterpriseCode: $route.query.enterpriseCode,
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
        </div>

        <div class="null-box" v-if="!attachmentData.attachmentList || !attachmentData.attachmentList.length">
            暂无内容!
        </div>
    </section>
</template>
<script>
export default {
    props: ['attachmentData'],
    data () {
        return {}
    }
}
</script>