<template>
    <section class="product-list-box page__bd">
        <div class="weui-cells no-margin">
            <!-- site.socialmarketingcloud.com  localhost:8890-->
            <router-link class="weui-media-box weui-media-box_appmsg"
                         v-for="(item, index) in listData"
                         :to="{name: 'product-detail', query: {enterpriseCode: item.enterpriseCode, pageCode: item.pageCode, templateCode: templateCode}}">
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" :src="item.pageCover">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{item.pageTitle}}</h4>
                    <p class="weui-media-box__desc">{{item.pageAbstract}}</p>
                </div>
            </router-link>
        </div>

        <div class="null-page" v-if="!listData.length && isPage">
            暂无内容！
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'

export default {
    data () {
        return {
            isPage: false,
            listData: [],
            templateCode: ''
        }
    },
    mounted () {
        this.getList()
    },
    computed: {
        isLoad () {
            return this.total > this.listData.length
        }
    },
    methods: {
        getList (cb) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                productCode: this.$route.query.catalogCode
            }

            util.request({
                method: 'get',
                interface: 'pageAndHtml5',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.isPage = true

                this.listData = res.result.result.htmlPageList
                this.templateCode = res.result.result.templateCode
            })
        }
    }
}
</script>