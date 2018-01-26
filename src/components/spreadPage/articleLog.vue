<template>
    <section class="article-check-box">
        <div class="head-box">
            <span class="left">审核记录</span>
        </div>
        <section class="comment-b"
                    v-if="commentList.length"
                    :id="'comment-' + item.taskReportFloor"
                    v-for="(item, index) in commentList">
            <div class="avatar-box">
                <img v-if="item.userImg" :src="item.userImg">
            </div>
            <div class="content-box">
                <div class="title-box">
                    <span class="title">{{item.userName}}</span>
                    <div class="date-box">
                        {{item.taskReportFloor}}楼 {{item.taskReportTime | getDateDiff}}
                    </div>
                </div>
                <div class="des-box"
                     v-if="item.status == '1' && item.taskReportText">
                     <a v-if="item.taskReportParent"
                        class="response-nav"
                        :href="'#comment-' + item.taskReportParent">@第{{item.taskReportParent}}楼：</a>
                    {{item.taskReportText}}
                </div>

                <div class="des-box"
                     v-if="item.status == '0'">该回话已被删除！！！</div>

                <div class="imgs-box" 
                     v-if="item.status == '1' && item.imgData && item.imgData.length">
                    <img-list :img-list="item.imgData"></img-list>
                </div>
                <div class="article-box" v-if="item.status == '1' && item.pageData && item.pageData.length">
                    <router-link class="weui-media-box weui-media-box_appmsg"
                            v-for="(article, index) in item.pageData"
                            :to="{
                                    name: 'article-detail',
                                    query: {
                                        enterpriseCode: $route.query.enterpriseCode,
                                        agentId: $route.query.agentId,
                                        pageCode: article.pageCode,
                                        appid: article.appId,
                                        templateCode: article.templateCode,
                                        S: userInfo.userCode,
                                        C: 'e2nochannel',
                                        T: 'e2nospread'
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
        </section>
        <div class="null-box" v-if="!commentList.length && isPage">
            暂无内容！
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import imgList from '../common/imgList.vue'
import { getDateDiff } from '../../assets/common/utils.js'
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
                interface: 'getTaskReports',
                data: {
                    taskCode: this.$route.query.taskCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.commentList = res.result.result
                    this.isPage = true
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
.article-check-box {
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

        .article-box {
            margin-top: 10px;

            .weui-media-box {
                padding: 10px;
            }

            .weui-media-box_appmsg .weui-media-box__hd {
                height: 40px;
                line-height: 40px;
            }
        }
    }
}
</style>