<template>
    <section class="product-list-box page__bd">
        <div class="weui-cells no-margin" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
            <!-- site.socialmarketingcloud.com  localhost:8890-->
            <div  class="weui-media-box weui-media-box_appmsg"
                @click="goToNext(item)"
                v-for="(item, index) in listData">
                <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" :src="item.catalogImage">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{item.catalogCname}}</h4>
                    <p class="weui-media-box__desc">{{item.catalogDesc}}</p>
                </div>
                <div class="weui-cell__ft" v-if="item.catalogType == 'dir'">
                    <img src="/static/images/dir-icon.png">
                </div>
            </div>
        </div>

        <div class="null-page" v-if="!listData.length && isPage">
            暂无内容！
        </div>

        <!-- <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="saveAttachment">确定</a>
        </div> -->
    </section>
</template>
<script>
import util from '../../utils/tools'

export default {
    data () {
        return {
            isPage: false,
            listData: [],
            pageSize: 20,
            pageNumber: 1,
            total: 0
        }
    },
    mounted () {
        this.getList()
    },
    watch: {
        $route () {
            this.pageNumber = 1
            this.isPage = false
            this.getList()
        }
    },
    computed: {
        isLoad () {
            return this.total > this.listData.length
        }
    },
    methods: {
        goToNext (item) {
            if (item.catalogType == 'dir') {
                var pathData = {
                    name: 'product-list',
                    query: {
                        enterpriseCode: item.enterpriseCode,
                        catalogCode: item.catalogCode
                    }
                }

                this.$router.push(pathData)
            } else {
                var pathData = {
                    name: 'product-article',
                    query: {
                        enterpriseCode: item.enterpriseCode,
                        catalogCode: item.catalogCode
                    }
                }

                this.$router.push(pathData)
            }
        },
        showMore (cb) {
            this.pageNumber++
            this.getList(cb)
        },
        getList (cb) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                catalogParentCode: this.$route.query.catalogCode ? this.$route.query.catalogCode : 'e2',
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }

            util.request({
                method: 'get',
                interface: 'pruductCatalogList',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.total = res.result.total
                this.isPage = true
                if (!cb) {
                    this.listData = res.result.result
                } else {
                    this.listData = this.listData.concat(res.result.result)
                }
            })
        }
    }
}
</script>