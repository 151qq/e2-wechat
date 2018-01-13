<template>
    <section class="article-list-box page__bd">
        <div class="weui-cells no-margin">
            <!-- site.socialmarketingcloud.com  localhost:8890-->
            <template v-for="(article, index) in listData">
                <a class="weui-media-box weui-media-box_appmsg"
                    v-if="item.pageStatus == '1'"
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
                <router-link class="weui-media-box weui-media-box_appmsg"
                        v-if="item.pageStatus != '1'"
                        :to="{
                                name: 'article-detail',
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
            </template>
            
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'

export default {
    data () {
        return {
            listData: [],
            pageSize: 20,
            pageNumber: 1,
            total: 0,
            userId: ''
        }
    },
    mounted () {
        this.getList()
    },
    methods: {
        getList (type) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                pageType: 'propagate_article',
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }

            util.request({
                method: 'get',
                interface: 'html5PageList',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.total = res.result.total
                if (!type) {
                    this.listData = res.result.result
                } else {
                    this.listData = this.listData.concat(res.result.result)
                }
            })
        }
    }
}
</script>
<style lang="scss">
.article-list-box {
}
</style>