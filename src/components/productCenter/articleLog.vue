<template>
    <section class="product-comment-box">
        <div class="height-1"></div>
        <div class="weui-cells__title">
            评论
        </div>

        <section class="comment-b"
                    :id="'comment-' + item.commentFloor"
                    v-for="(item, index) in commentList">
            <div class="avatar-box">
                <img v-if="item.memberInfo.memberImage" :src="item.memberInfo.memberImage">
            </div>
            <div class="content-box">
                <div class="title-box">
                    <span class="title">{{item.memberInfo.memberName}}</span>
                    <div class="date-box">
                        {{item.commentFloor}}楼 {{item.createTime | getDateDiff}}
                    </div>
                </div>
                <div class="des-box"
                     v-if="item.status == '1' && item.commentContent">
                     <a v-if="item.commentTitle"
                        class="response-nav"
                        :href="'#comment-' + item.commentTitle">@第{{item.commentTitle}}楼：</a>
                    {{item.commentContent}}
                </div>

                <div class="des-box"
                     v-if="item.status == '0'">该评论已被删除！！！</div>

                <div class="imgs-box" 
                     v-if="item.status == '1' && item.attachments && item.attachments.length">
                    <img-list :img-list="item.attachments"></img-list>
                </div>
            </div>
        </section>

        <div class="null-box" v-if="!commentList.length && isPage">
            暂无内容！
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import imgList from '../common/imgList.vue'
import {getDateDiff} from '../../assets/common/utils.js'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            isPage: false,
            commentList: []
        }
    },
    mounted () {
        this.getComments()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        getComments () {
            util.request({
                method: 'get',
                interface: 'commentList',
                data: {
                    pageCode: this.$route.query.pageCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.isPage = true
                    this.commentList = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    },
    filters: {
        getDateDiff
    },
    components: {
        imgList
    }
}
</script>
<style lang="scss">
.product-comment-box {
    padding: 0 15px;

    .response-nav {
        color: #20a0ff;
    }

    .comment-b {
        padding: 10px 0;
        display: flex;

        .avatar-box {
            width: 50px;
            height: 50px;
            background: url(/static/images/head-icon.png) center no-repeat;
            background-size: 100%;
            margin-right: 10px;

            img {
                display: block;
                width: 50px;
                height: 50px;
            }
        }

        .content-box {
            flex: 1;

            .title-box {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .title {
                    flex: 1;
                    font-weight: 400;
                    font-size: 16px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    word-wrap: normal;
                    word-wrap: break-word;
                    word-break: break-all;
                }

                .date-box {
                    font-size: 14px;
                    color: #888888;
                }
            }

            .des-box {
                font-size: 14px;
                line-height: 1.4;
                margin-top: 5px;
            }

            .imgs-box {
                margin-top: 10px;
            }
        }
    }
}
</style>