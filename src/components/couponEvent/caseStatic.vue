<template>
    <section class="chart-case" id="caseStatic"></section>
</template>
<script>
import util from '../../utils/tools'
import myEcharts from 'echarts'

export default {
    data () {
        return {
            numDatas: [],
            option: {
                series: {
                    type: 'funnel',
                    left: '10%',
                    width: '80%',
                    sort: 'none',
                    funnelAlign: 'left',
                    color: ['#bed7ed', '#9dc3e3', '#3276b3', '#214f77', '#203963', '#222a35'],
                    label: {
                        normal: {
                            color: '#000',
                            formatter: '{b}-{c}'
                        }
                    },
                    itemStyle: {
                        borderColor: '#e5e5e5'
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: []
                }
            }
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode
            }

            util.request({
                method: 'get',
                interface: 'getEventQuota',
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
            console.log(this.numDatas)

            if (!this.numDatas.length) {
                return false
            }

            this.option.series.data = [].concat(this.numDatas)

            console.log(this.option)

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
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
}
</style>