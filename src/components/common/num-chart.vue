<template>
    <section class="chart-box" :id="idName"></section>
</template>
<script>
import myEcharts from 'echarts'

export default {
    props: ['numDatas', 'idName'],
    data () {
        return {
            totalNum: '',
            option: {
                title: {
                    text: '',
                    left: 'center',
                    top: 'center',
                    textStyle: {
                        color: '#fff',
                        fontSize: 20,
                        align: 'center'
                    }
                },
                series: {
                    name: 'pie',
                    type: 'pie',
                    radius: ['42%', '50%'],
                    hoverAnimation: false,
                    color: ['#9dc3e3', '#3276b3', '#214f77', '#203963'],
                    label: {
                        formatter: {},
                        rich: {
                            yellow: {
                                color: "#ffc72b",
                                fontSize: 20,
                                padding: [5, 4],
                                align: 'center'
                            },
                            black: {
                                color: "#000",
                                align: 'center',
                                fontSize: 14
                            },
                            blue: {
                                color: '#49dff0',
                                fontSize: 14,
                                align: 'center'
                            },
                            hr: {
                                borderColor: '#0b5263',
                                width: '100%',
                                borderWidth: 1,
                                height: 0
                            }
                        }
                    },
                    labelLine: {
                        lineStyle: {
                            color: '#e5e5e5'
                        }
                    },
                    data: []
                }
            }
        }
    },
    methods: {
        drawEchart () {
            if (!this.numDatas.length) {
                return false
            }

            this.option.series.label.formatter = (params, ticket, callback) => {
                var percent = 0
                var total = 0
                this.numDatas.forEach(function(value, index, array) {
                    total += value.value;
                })

                if (!this.option.title.text) {
                    this.option.title.text = total
                }

                percent = ((params.value / total) * 100).toFixed(1)
                return '{black|' + params.name + '}\n{black|' + params.value + '}{black|' + '-' + percent + '%}'
            }

            this.option.series.data = [].concat(this.numDatas)

            // 基于准备好的dom，初始化echarts实例
            var myChart = myEcharts.init(document.getElementById(this.idName))
            // 绘制图表
            myChart.setOption(this.option)
        }
    }
}
</script>
<style lang="scss">
.chart-box {
    width: 100%;
    height: 240px;
    margin-top: -30px;
}
</style>