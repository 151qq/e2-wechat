<template>
    <section class="enterprise-media-box page__bd" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
        <a class="sou-box"
            v-for="(item, index) in listData"
            :key="index"
            :href="item.fileCode">
            <div class="cover-box">
                <img :src="item.docCover">
            </div>
            <div class="title-box" v-text="item.docTitle"></div>
        </a>

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
            pageSize: 20,
            pageNumber: 1,
            total: 0
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
        showMore (cb) {
            this.pageNumber++
            this.getList(cb)
        },
        getList (cb) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                docFolder: this.$route.query.docFolder,
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
<style lang="scss">
.enterprise-media-box {
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
            line-height: 2;
            color: #000000;
        }
    }
}
</style>