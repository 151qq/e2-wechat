<template>
    <section class="article-detail-box">
        <iframe class="wx-area-con" src=""></iframe>

        <div class="wx-area-line"></div>
        <div class="comments-box">
            <comment></comment>
        </div>
    </section>
</template>
<script>
import comment from '../common/comment.vue'

export default {
    data () {
        return {
        }
    },
    mounted () {
        // this.getData()
    },
    methods: {
        getData () {
        }
    },
    components: {
        comment
    }
}
</script>
<style lang="scss">
.article-detail-box {
    .comments-box {
        padding: 0 15px;
    }
}
</style>