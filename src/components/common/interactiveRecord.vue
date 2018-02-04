<template>
    <section class="record-box">
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
export default {
    props: ['recordList'],
    data () {
        return {}
    }
}
</script>
<style lang="scss">
.record-box {
    padding-top: 4px;

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