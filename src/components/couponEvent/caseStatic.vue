<template>
    <section class="chart-case" id="caseStatic"></section>
</template>
<script>
import myEcharts from 'echarts'

export default {
    data () {
        return {
            numDatas: [],
            option: {
                series: [
                    {
                        type: 'funnel',
                        left: '10%',
                        width: '80%',
                        sort: 'none',
                        funnelAlign: 'left',
                        label: {
                            normal: {
                                formatter: '{b}-{c}'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: []
                    }
                ]
            }
        }
    },
    mounted () {
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
                    this.numDatas = res.result.result
                    
                    setTimeout(() => {
                        this.drawEchart()
                    })
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        drawEchart () {
            if (!this.numDatas.length) {
                return false
            }

            this.option.series.data = [].concat(this.numDatas)

            // 基于准备好的dom，初始化echarts实例
            var myChart = myEcharts.init(document.getElementById('caseStatic'))
            // 绘制图表
            myChart.setOption(this.option)
        }
    }
}
</script>
<style lang="scss">
.chart-case {
    background: #ffffff;
    width: 100%;
}
</style>