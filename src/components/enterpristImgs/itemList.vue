<template>
    <section class="enterprise-img-dir page__bd">
        <div class="weui-cells no-margin" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
            <!-- site.socialmarketingcloud.com  localhost:8890-->
            <section class="sou-box">
                <div class="cover-box" @click="goToNext(item, index)">
                    <img :src="item.docCover">
                </div>
                <div class="title-box" v-text="item.docTitle"></div>
            </section>
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
            var pathData = {
                name: 'img-list',
                query: {
                    enterpriseCode: item.enterpriseCode,
                    docFolder: item.docCode
                }
            }

            this.$router.push(pathData)
        },
        showMore (cb) {
            this.pageNumber++
            this.getList(cb)
        },
        getList (cb) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                docFolder: 'e2_pic',
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }

            util.request({
                method: 'get',
                interface: 'listPage',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.total = res.result.total

                res.result.result.forEach((item) => {
                    item.docCreateTime = item.docCreateTime.split(' ')[0]
                })

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
<style lang="scss">
.enterprise-img-dir {
    overflow: hidden;

    .sou-box {
        float: left;
        width: 46%;
        margin: 2%;

        .cover-box {
            height: 160px;
            overflow: hidden;
            
            img {
                display: block;
                width: 100%;
                min-height: 160px;
            }
        }

        .title-box {
            display: block;
            text-align: center;
            font-size: 14px;
            line-height: 1.6;
            color: #000000;
        }
    }
}
</style>