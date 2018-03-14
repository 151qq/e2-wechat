<template>
    <section class="article-comment-box">
        <div class="head-box">
            <span class="left">评论</span>
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
                <div class="response-box">
                    <div class="top-box" @click="showSubmit(item)">
                        <span class="response"
                                v-if="item.reportComment && item.reportComment.commentContent">
                            作者回复
                        </span>
                        <div class="comment-btn" v-if="item.status == '1'">
                            <div class="btn-out-box">
                                <img src="../../assets/images/edit-icon.png">
                            </div>
                        </div>
                    </div>
                    <div class="response-content"
                            v-if="item.reportComment && item.reportComment.commentContent">
                        <div class="des-box"
                                v-if="item.reportComment.commentContent">
                            {{item.reportComment.commentContent}}
                        </div>
                        <div class="imgs-box"
                                v-if="item.reportComment.attachments && item.reportComment.attachments.length">
                            <img-list :img-list="item.reportComment.attachments"></img-list>
                        </div>
                        <div class="article-box"
                                v-if="item.reportComment.commentArticles && item.reportComment.commentArticles.length">
                            <div class="weui-cells">
                                <router-link class="weui-media-box weui-media-box_appmsg"
                                        v-for="(article, index) in item.reportComment.commentArticles"
                                        :to="{
                                                name: 'article-detail',
                                                query: {
                                                    enterpriseCode: $route.query.enterpriseCode,
                                                    agentId: $route.query.agentId,
                                                    pageCode: article.pageCode,
                                                    appid: article.appId,
                                                    templateCode: article.templateCode,
                                                    S: userInfo.userCode,
                                                    sShareTo: 'F',
                                                    C: 'N',
                                                    cShareTo: 'N',
                                                    T: userInfo.userCode,
                                                    tShareTo: 'N',
                                                    spreadType: '1'
                                                }
                                            }">
                                    <div class="weui-media-box__hd">
                                        <img class="weui-media-box__thumb" :src="article.pageCover">
                                    </div>
                                    <div class="weui-media-box__bd">
                                        <h4 class="weui-media-box__title">{{article.pageTitle}}</h4>
                                        <p class="weui-media-box__desc">{{article.pageAbstract}}</p>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                        <div class="response-box" @click="deleteAuthor(item.reportComment)">
                            <div class="top-box">
                                <span class="response"></span>
                                <div class="comment-btn">
                                    <div class="btn-out-box">
                                        <img src="../../assets/images/delete-icon.png">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
    props: ['commentUrl'],
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
        showSubmit (item) {
            if (item.status != '1') {
                return false
            }

            var pathUrl = {
                name: this.commentUrl,
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    templateCode: this.$route.query.templateCode,
                    pageCode: this.$route.query.pageCode,
                    pageType: this.$route.query.pageType,
                    commentType: '2',
                    commentReplyCode: item.commentCode,
                    url: window.encodeURIComponent(window.location.href)
                }
            }

            this.$router.push(pathUrl)
        },
        deleteAuthor (item) {
            util.request({
                method: 'post',
                interface: 'deleteComment',
                data: {
                    commentCode: item.commentCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getComments()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
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
        },
        deleteComment (item) {
            util.request({
                method: 'post',
                interface: 'deleteComment',
                data: {
                    commentCode: item.commentCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getComments()
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
.article-comment-box {
    padding: 0 15px;

    .head-box {
        padding: 10px 0;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
            font-size: 18px;
            color: #000000;
        }

        .right {
            display: block;
            width: 28px;
            height: 28px;
            text-align: right;

            img {
                display: inline-block;
                width: 18px;
                height: 18px;
                margin-top: 5px;
            }
        }
    }

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
            overflow: hidden;

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

        .response-box {
            margin-top: 10px;

            .top-box {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .response {
                    font-size: 16px;
                    color: #000000;
                }

                .comment-btn {
                    flex: 1;
                    text-align: right;
                    font-size: 14px;
                    color: #000000;
                    line-height: 1;

                    .btn-out-box {
                        display: inline-block;
                        padding: 5px 4px 0px;
                        height: 24px;
                        box-sizing: border-box;
                        overflow: hidden;
                    }

                    img {
                        float: left;
                        height: 16px;
                    }

                    .text {
                        float: right;
                        font-size: 15px;
                        margin-left: 5px;
                        line-height: 16px;
                    }
                }
            }

            .article-box {
                .weui-cells {
                    margin-top: 10px;

                    &:before {
                        border: none;
                    }
                }

                a {
                    display: flex;
                    align-items: center;
                }

                img {
                    display: block;
                    width: 40px;
                    height: 40px;
                    margin-right: 10px;
                }

                .article-title-box {
                    flex: 1;
                    font-size: 14px;
                    color: #000000;
                }

                .weui-media-box {
                    padding: 10px 5px;
                }

                .weui-media-box_appmsg .weui-media-box__hd {
                    height: 40px;
                    line-height: 40px;
                }
            }

            .response-content {
                margin-top: 10px;
                padding: 10px 15px;
                background: #f3f3f3;
            }
        }
    }
}
</style>