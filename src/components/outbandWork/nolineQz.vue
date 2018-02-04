<template>
    <section class="qz-box">
        <template v-for="(item, index) in recordList">
            <route-link class="record-nav"
                        :to="{}">
                <div class="date-box">{{item.customerInteractionLog.interactionDate.split(' ')[0]}}</div>
                <div class="content-box">{{item.customerInteractionLog.interactionDesc}}</div>              
            </route-link>
        </template>
        <div class="null-box" v-if="recordList && !recordList.length">
             暂无记录！
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            recordList: []
        }
    },
    mounted () {
        this.getLog()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        getLog () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                customerCode: this.userInfo.userCode,
                pipelineCode: this.$route.query.pipelineCode
            }

            util.request({
                method: 'get',
                interface: 'selectLog',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.recordList = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>
<style lang="scss">
.qz-box {
    padding: 5px 15px 10px;
    background: #ffffff;

    .record-nav {
        display: flex;
        padding: 4px 0;

        .date-box {
            width: 90px;
            font-size: 14px;
            line-height: 1.6;
            color: #000000;
        }

        .content-box {
            flex: 1;
            font-size: 14px;
            color: #000000;
            line-height: 1.6;
        }
    }
}
</style>