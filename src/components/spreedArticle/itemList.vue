<template>
    <section class="article-list-box page__bd">
        <div class="weui-cells no-margin">
            <!-- site.socialmarketingcloud.com  localhost:8890-->
            <a  class="weui-media-box weui-media-box_appmsg"
                v-for="(article, index) in listData"
                :href="'http://site.socialmarketingcloud.com/spreedArticle/detail?enterpriseCode=' + article.enterpriseCode + '&pageCode=' + article.pageCode + '&templateCode=' + article.templateCode + '&userId=' + userId + '&openId=000000'">
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" :src="article.pageCover">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{article.pageTitle}}</h4>
                    <p class="weui-media-box__desc">{{article.pageAbstract}}</p>
                </div>
            </a>
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
                pageStatus: '1',
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