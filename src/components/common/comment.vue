<template>
    <section class="comment-box">
        <div class="avatar-box">
            <img src="/static/images/head-icon.png">
        </div>
        <div class="content-box">
            <div class="title-box"></div>
            <div class="des-box"></div>
            <div class="imgs-box">
                <img-list></img-list>
            </div>
            <div class="date-box"></div>
        </div>
    </section>
</template>
<script>
import imgList from './imgList.vue'

export default {
    data () {
        return {
            commentDatas: [
                {
                    id: 0,
                    author: {
                        name: '大家好，我是ms'
                    },
                    commentContent: '其实吧，没什么想说的，哎，都不容呀！'
                    commentImgs: [
                        '/static/images/bench1.png',
                        '/static/images/bench1.png',
                        '/static/images/bench1.png',
                        '/static/images/bench1.png',
                        '/static/images/bench1.png'
                    ],
                    submitTime: '2017-19-20'
                    responseComment: {
                        id: 1,
                        author: {
                            name: '大家好，我是ms'
                        },
                        commentContent: '其实吧，没什么想说的，哎，都不容呀！'
                        commentImgs: [
                            '/static/images/bench1.png',
                            '/static/images/bench1.png',
                            '/static/images/bench1.png',
                            '/static/images/bench1.png',
                            '/static/images/bench1.png'
                        ],
                        submitTime: '2017-19-21'
                    }
                }
            ]
        }
    },
    methods: {

    },
    components: {
        imgList
    }
}
</script>