<template>
    <section class="user-role-list">
        <div class="height-1"></div>
        <div class="weui-cells__title">推荐阅读</div>
        <div class="weui-cells no-margin no-line">
            <swipeout>
                <swipeout-item transition-mode="follow"
                                v-for="(article, index) in articleList" :key="index">

                    <div slot="right-menu">
                        <swipeout-button @click.native="deleteItem(item)" type="warn">
                            删除
                        </swipeout-button>
                    </div>
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
                </swipeout-item>
            </swipeout>

            <a class="add-file-btn" @click="gotoAttachment">添加</a>
        </div>
        <div class="null-box" v-if="articleList.length && isPage">暂无内容！</div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import { mapGetters } from 'vuex'
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'

export default {
    data () {
        return {
            isPage: false,
            articleList: []
        }
    },
    mounted () {
        this.getRoles()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        getArticles () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode
            }

            util.request({
                method: 'get',
                interface: 'allRole',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.articleList = res.result.result
                    this.isPage = true
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        deleteItem (item) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                pageCode: this.$route.query.pageCode
            }

            util.request({
                method: 'get',
                interface: 'delectUserRole',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.$message({
                      showClose: true,
                      message: '删除成功！',
                      type: 'success'
                    })
                    this.getArticles()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        gotoAttachment () {
            this.setDetail(Object.assign({}, this.commentData))

            var pathUrl = {
                name: 'article-attachment',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    redirectUrl: window.encodeURIComponent(window.location.href)
                }
            }
            this.$router.push(pathUrl)
        }
    },
    components: {
        Swipeout,
        SwipeoutItem,
        SwipeoutButton
    }
}
</script>
<style lang="scss">
.user-role-list {
    .add-btn {
        display: inline-block;
        background: #2f7dcd;
        border-radius: 3px;
        padding: 2px 6px;
        font-size: 14px;
        color: #ffffff;
    }

    .vux-swipeout-item {
        border-bottom: 1px solid #D9D9D9;
    }
}
</style>