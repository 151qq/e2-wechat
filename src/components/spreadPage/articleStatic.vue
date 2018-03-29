<template>
    <section class="num-statistic-box">
        <div class="chart-title">阅读统计</div>
        <div class="chart-box">
            <num-chart :id-name="'readNum'" :num-datas="numDatas" ref="readNum"></num-chart>
        </div>

        <div class="chart-title">转发统计</div>
        <div class="chart-box">
            <num-chart :id-name="'shareNum'" :num-datas="shareDatas" ref="shareNum"></num-chart>
        </div>
    </section>
</template>
<script>
import $ from 'Jquery'
import util from '../../utils/tools'
import numChart from '../common/num-chart'

export default {
    data () {
        return {
            numDatas: [],
            shareDatas: []
        }
    },
    mounted () {
        $('.num-statistic-box').height($(document).height())
        this.getData()
    },
    methods: {
        getData () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                pageCode: this.$route.query.pageCode
            }

            util.request({
                method: 'get',
                interface: 'countPageHit',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.numDatas = res.result.result.pageReadCounts
                    this.shareDatas = res.result.result.pageSpreadCounts
                    
                    setTimeout(() => {
                        this.$refs['readNum'].drawEchart()
                        this.$refs['shareNum'].drawEchart()
                    })
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    },
    components: {
        numChart
    }
}
</script>
<style lang="scss">
.num-statistic-box {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    background: #494b68;
    overflow: auto;

    .chart-title {
        color: #82849a;
        font-size: 18px;
        line-height: 30px;
        padding-top: 10px;
        text-align: center;

        &:after {
            display: block;
            content: "";
            width: 15px;
            margin: auto;
            border-bottom: 2px solid #ffffff;
        }
    }
}
</style>