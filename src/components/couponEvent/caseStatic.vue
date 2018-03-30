<template>
    <section class="chart-case-box">
        <section class="chart-box" id="caseStatic"></section>

        <div class="wx-bottom-nav">
            <router-link class="wx-nav-item nav-now"
                         :to="{
                            name: 'case-static',
                            query: {
                                enterpriseCode: userInfo.enterpriseCode,
                                agentId: $route.query.agentId
                            }
                        }">
                营销指标
            </router-link>
            <router-link class="wx-nav-item"
                         :to="{
                            name: 'case-list',
                            query: {
                                enterpriseCode: userInfo.enterpriseCode,
                                agentId: $route.query.agentId,
                                formNav: '1'
                            }
                        }">
                促销活动
            </router-link>
            <router-link class="wx-nav-item"
                         :to="{
                            name: 'party-list',
                            query: {
                                enterpriseCode: userInfo.enterpriseCode,
                                agentId: $route.query.agentId
                            }
                        }">
                地推活动
            </router-link>
            <router-link class="wx-nav-item nav-blue"
                         :to="{
                            name: 'new-party',
                            query: {
                                enterpriseCode: userInfo.enterpriseCode,
                                agentId: $route.query.agentId
                            }
                        }">
                新建活动
            </router-link>
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import myEcharts from 'echarts'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            numDatas: [],
            option: {
                series: {
                    type: 'funnel',
                    left: '10%',
                    sort: 'none',
                    funnelAlign: 'left',
                    color: ['#bed7ed', '#9dc3e3', '#3276b3', '#214f77', '#203963', '#222a35'],
                    label: {
                        normal: {
                            color: '#000',
                            fontSize: 16,
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
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
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
.chart-case-box {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    padding-bottom: 60px;
    box-sizing: border-box;

    .chart-box {
        width: 100%;
        height: 100%;
    }
}
</style>