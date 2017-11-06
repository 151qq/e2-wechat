<template>
    <section class="case-list-box page__bd">
        <div class="weui-cells">
            <router-link class="weui-cell weui-cell_access"
                    :to="{name: 'task-list', query: {type: 'activity'}}">
                <div class="weui-cell__bd weui-cell_primary">启动营销活动任务</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link class="weui-cell weui-cell_access"
                    :to="{name: 'task-list', query: {type: 'edit'}}">
                <div class="weui-cell__bd weui-cell_primary">启动编辑任务</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link class="weui-cell weui-cell_access"
                    :to="{name: 'task-list', query: {type: 'spreed'}}">
                <div class="weui-cell__bd weui-cell_primary">启动推广任务</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link class="weui-cell weui-cell_access"
                    :to="{name: 'task-list', query: {type: 'push'}}">
                <div class="weui-cell__bd weui-cell_primary">启动地推任务</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link class="weui-cell weui-cell_access"
                    :to="{name: 'task-list', query: {type: 'noline'}}">
                <div class="weui-cell__bd weui-cell_primary">启动外呼任务</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link class="weui-cell weui-cell_access"
                    :to="{name: 'task-list', query: {type: 'receive'}}">
                <div class="weui-cell__bd weui-cell_primary">预约接待任务</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link class="weui-cell weui-cell_access"
                    :to="{name: 'task-list', query: {type: 'response'}}">
                <div class="weui-cell__bd weui-cell_primary">评论回复任务</div>
                <div class="weui-cell__ft"></div>
            </router-link>
        </div>
    </section>
</template>
<script>
export default {
    data () {
        return {
            listData: []
        }
    },
    methods: {
    }
}
</script>
<style lang="scss">
.case-list-box {
    .weui-cells {
        margin-top: 0;
    }
}
</style>