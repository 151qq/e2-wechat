<template>
    <section class="product-list-box page__bd" v-scroll-load="{showMore:showMore, isLoad: isLoad}">
        <img-list :img-list="listData"></img-list>
    </section>
</template>
<script>
import util from '../../utils/tools'
import imgList from '../common/imgList.vue'

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
                var imgList = []
                res.result.result.forEach((item) => {
                    imgList.push(item.fileCode)
                })

                if (!cb) {
                    this.listData = imgList
                } else {
                    this.listData = this.listData.concat(imgList)
                }
            })
        }
    }
}
</script>