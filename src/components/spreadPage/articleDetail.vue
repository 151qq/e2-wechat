<template>
    <section class="article-body">
        <div class="white-bg">
            <section class='bodyMain' :style="arTextBody">
                <div class="ar-title" :style="arTitle">{{articleData.pageTitle}}</div>
                <div class="ar-author-date" :style="arAuthorDate">
                    <span class="ar-date">{{ articleData.pageEditTime | formatDate(base.dateStyle)}}</span>
                    <a  class="ar-author"
                        target="_blank" 
                        :style="arAuthor"
                        :href="base.editorLink">
                            {{articleData.pageEditorName}}
                    </a>
                </div>

                <div :style="arContent" 
                     v-for="(item, index) in areaList"
                     :key="index"
                     v-html="item.pageAreaContent">
                </div>

                <img class="ar-img" :style="arImg" :src="base.fileEndPic">
            </section>
        </div>

        <template v-if="articleList.length">
            <div class="weui-cells__title">推荐文章</div>
            <div class="weui-cells no-line">
                <router-link class="weui-media-box weui-media-box_appmsg"
                        v-for="(item, index) in articleList"
                        :to="{
                                name: 'article-detail',
                                query: {
                                    enterpriseCode: $route.query.enterpriseCode,
                                    agentId: $route.query.agentId,
                                    pageCode: item.pageCode,
                                    appid: item.pubWechatAppId,
                                    templateCode: item.templateCode,
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
                        <img class="weui-media-box__thumb" :src="item.pageCover">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{item.pageTitle}}</h4>
                        <p class="weui-media-box__desc">{{item.pageAbstract}}</p>
                    </div>
                </router-link>
            </div>
        </template>

        <template v-if="articleData.pageStatus == '1' && articleData.pageCommentOpt == '1'">
            <div class="wx-area-line"></div>
            <div class="white-bg">
                <comment-show :comment-url="'res-comment'"></comment-show>
            </div>
        </template>

        <div class="btn-height-box"></div>

        <!-- 发布状态 -->
        <template v-if="isPublist">
            <div class="wx-bottom-nav" v-if="articleData.pageStatus == '1'">
                <a class="wx-nav-item"
                    @click="sharePartener">
                    分享同事
                </a>
                <a class="wx-nav-item"
                    @click="showSheet">
                    文章管理
                </a>
                <a class="wx-nav-item"
                    @click="shareWechat">
                    分享微信
                </a>
            </div>

            <div class="wx-bottom-nav" v-if="articleData.pageStatus == '2'">
                <router-link class="wx-nav-item"
                            :to="{
                                name: 'article-log',
                                query: {
                                    enterpriseCode: $route.query.enterpriseCode,
                                    agentId: $route.query.agentId,
                                    pageCode: $route.query.pageCode
                                }
                            }">
                    管理日志
                </router-link>
                <a class="wx-nav-item"
                    @click="showBtn">
                    审核
                </a>
            </div>

            <div class="weui-btn-area" v-if="articleData.pageStatus == '3'">
                <router-link class="weui-btn weui-btn_primary"
                            :to="{
                                name: 'article-log',
                                query: {
                                    enterpriseCode: $route.query.enterpriseCode,
                                    agentId: $route.query.agentId,
                                    pageCode: $route.query.pageCode
                                }
                            }">
                    管理日志
                </router-link>
            </div>
        </template>
        <template v-if="!isPublist && articleData.pageStatus == '1'">
            <div class="wx-bottom-nav" v-if="articleData.pageStatus == '1'">
                <a class="wx-nav-item"
                    @click="sharePartener">
                    分享同事
                </a>
                <router-link class="wx-nav-item"
                            :to="{
                                name: 'article-log',
                                query: {
                                    enterpriseCode: $route.query.enterpriseCode,
                                    agentId: $route.query.agentId,
                                    pageCode: $route.query.pageCode
                                }
                            }">
                    审核记录
                </router-link>
                <a class="wx-nav-item"
                    @click="shareWechat">
                    分享微信
                </a>
            </div>
        </template>
        <template v-if="!isPublist && articleData.pageStatus != '1'">
            <div class="weui-btn-area">
                <router-link class="weui-btn weui-btn_primary"
                            :to="{
                                name: 'article-log',
                                query: {
                                    enterpriseCode: $route.query.enterpriseCode,
                                    agentId: $route.query.agentId,
                                    pageCode: $route.query.pageCode
                                }
                            }">
                    审核记录
                </router-link>
            </div>
        </template>

        <sheet :is-show-sheet="isShowSheet" :item-list="sheetList" :cb="publistOpt"></sheet>
        <sheet :is-show-sheet="isShowBtn" :item-list="btnList" :cb="checkOpt"></sheet>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import { mapGetters } from 'vuex'
import sheet from '../common/sheet.vue'
import commentShow from './commentShow'

export default {
    data () {
        return {
            articleData: {
                pageTitle: '',
                pageEditTime: '',
                pageEditorName: '',
                pageEditor: '',
                pageStatus: ''
            },
            base: {
                dateStyle: ''
            },
            areaList: [],
            isComments: false,
            isShow: {
                value: false
            },
            pathUrl: '',
            showText: '',
            escData: {},
            isShowBtn: {
                value: false
            },
            btnList: [
                {
                    label: '发布',
                    pathName: '1'
                },
                {
                    label: '拒绝发布',
                    pathName: '0'
                }
            ],
            isShowSheet: {
                value: false
            },
            sheetList: [],
            articleList: []
        }
    },
    mounted () {
        jsSdk.init()
        this.getData()
        this.getTemplate()
        this.getArticles()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isPublist () {
            var roleCodes = []
            this.userInfo.securityRole.forEach((item) => {
                roleCodes.push(item.roleCode)
            })

            return roleCodes.indexOf('page_manager') > -1
        },
        isCreator () {
            var roleCodes = []
            this.userInfo.securityRole.forEach((item) => {
                roleCodes.push(item.roleCode)
            })

            return roleCodes.indexOf('page_manager') < 0 && this.userInfo.userCode == this.articleData.pageEditor
        },
        arTitle () {
            var styleData = {
                'display': 'block',
                'padding': '0 15px',
                'box-sizing': 'border-box',
                'background-position': 'center',
                'background-size': '100% 100%',
                'overflow': 'hidden',
                'height': this.base.titleBlockHeight + 'px',
                'background-image': 'url(' + this.base.titleBackground + ')',
                'font-size': this.base.titleFontSize + 'px',
                'text-align': this.base.titleAlignment,
                'font-style': this.base.titleFontStyle,
                'color': this.base.titleFontColor,
                'line-height': this.base.titleLineHeight + 'px',
                'padding-top': this.base.titleTopHeight + 'px',
                'margin-top': this.base.titleMarginTop + 'px'
            }

            return styleData
        },
        arAuthorDate () {
            var styleData = {
                'display': 'flex',
                'padding': '0 15px',
                'box-sizing': 'border-box',
                'justify-content': this.base.editorDateStyle,
                'overflow': 'hidden',
                'height': this.base.editorDateBlockHeight + 'px',
                'font-size': this.base.editorDateFontSize + 'px',
                'font-style': this.base.editorDateFontStyle,
                'color': this.base.editorDateFontColor,
                'line-height': this.base.editorDateLineHeight + 'px'
            }

            return styleData
        },
        arAuthor () {
            var styleData = {
                'color': this.base.editorLink ? '#368ccd' : this.base.editorDateFontColor,
                'margin-left': this.base.editorDateSpace + 'px'
            }

            return styleData
        },
        arTextBody () {
            var styleData = {
                'padding': '15px',
                'display': 'block',
                'box-sizing': 'border-box',
                'background-repeat-y': 'repeat',
                'background-repeat-x': 'no-repeat',
                'background-size': '100% 100%',
                'overflow': 'hidden',
                'background-image': 'url(' + this.base.fileBackground + ')',
                'padding-top': this.base.fileBlcokTopHeight + 'px'
            }

            return styleData
        },
        arImg () {
            var styleData = {
                'display': 'block',
                'width': '100%',
                'margin-top': this.base.fileMarginTop + 'px'
            }

            return styleData
        },
        arInTitle () {
            var styleData = {
                'display': 'block',
                'box-sizing': 'border-box',
                'background-repeat-y': 'no-repeat',
                'background-repeat-x': 'no-repeat',
                'background-position': 'center',
                'background-size': '100% 100%',
                'overflow': 'hidden',
                'height': this.base.innerTitleBlockHeight + 'px',
                'background-image': 'url(' + this.base.innerTitleBackground + ')',
                'font-size': this.base.innerTitleFontSize + 'px',
                'text-align': this.base.innerTitleAlignment,
                'font-style': this.base.innerTitleFontStyle,
                'color': this.base.innerTitleFontColor,
                'line-height': this.base.innerTitleFontType + 'px',
                'padding-top': this.base.innerTitleTopHeight + 'px',
                'margin-top': this.base.innerTitleMarginTop + 'px'
            }

            return styleData
        },
        arContent () {
            var styleData = {
                'display': 'block',
                'box-sizing': 'border-box',
                'overflow': 'hidden',
                'font-size': this.base.fileFontSize + 'px',
                'color': this.base.fileTaxtFontColor,
                'line-height': this.base.fileTaxtLineHeight + 'px',
                'margin-top': this.base.fileMarginTop + 'px'
            }

            return styleData
        }
    },
    filters: {
        formatDate: util.formatDate
    },
    methods: {
        showSheet () {
            if (!this.isPublist) {
                return false
            }

            this.isShowSheet.value = true
        },
        publistOpt (item) {
            var pathUrl = {}

            if (item.pathName == 'close') {
                pathUrl = {
                    name: 'oprate-message',
                    query: {
                        enterpriseCode: this.$route.query.enterpriseCode,
                        agentId: this.$route.query.agentId,
                        templateCode: this.$route.query.templateCode,
                        pageCode: this.$route.query.pageCode,
                        url: window.encodeURIComponent(window.location.href),
                        opt: 'close'
                    }
                }
            } else if (item.pathName == 'commentClose') {
                pathUrl = {
                    name: 'oprate-message',
                    query: {
                        enterpriseCode: this.$route.query.enterpriseCode,
                        agentId: this.$route.query.agentId,
                        templateCode: this.$route.query.templateCode,
                        pageCode: this.$route.query.pageCode,
                        url: window.encodeURIComponent(window.location.href),
                        opt: 'commentClose'
                    }
                }
            } else if (item.pathName == 'commentOn') {
                pathUrl = {
                    name: 'oprate-message',
                    query: {
                        enterpriseCode: this.$route.query.enterpriseCode,
                        agentId: this.$route.query.agentId,
                        templateCode: this.$route.query.templateCode,
                        pageCode: this.$route.query.pageCode,
                        url: window.encodeURIComponent(window.location.href),
                        opt: 'commentOn'
                    }
                }
            } else if (item.pathName == 'edit') {
                pathUrl = {
                    name: 'about-article',
                    query: {
                        enterpriseCode: this.$route.query.enterpriseCode,
                        agentId: this.$route.query.agentId,
                        templateCode: this.$route.query.templateCode,
                        pageCode: this.$route.query.pageCode,
                        url: window.encodeURIComponent(window.location.href)
                    }
                }
            } else if (item.pathName == 'log') {
                pathUrl = {
                    name: 'article-log',
                    query: {
                        enterpriseCode: this.$route.query.enterpriseCode,
                        agentId: this.$route.query.agentId,
                        templateCode: this.$route.query.templateCode,
                        pageCode: this.$route.query.pageCode
                    }
                }
            }

            this.$router.push(pathUrl)
        },
        showBtn () {
            if (!this.isPublist) {
                return false
            }

            this.isShowBtn.value = true
        },
        checkOpt (item) {
            var pathUrl = {}

            if (item.pathName == '1') {
                pathUrl = {
                    name: 'submit-article',
                    query: {
                        enterpriseCode: this.$route.query.enterpriseCode,
                        agentId: this.$route.query.agentId,
                        templateCode: this.$route.query.templateCode,
                        pageCode: this.$route.query.pageCode,
                        url: window.encodeURIComponent(window.location.href)
                    }
                }
            } else {
                pathUrl = {
                    name: 'oprate-message',
                    query: {
                        enterpriseCode: this.$route.query.enterpriseCode,
                        agentId: this.$route.query.agentId,
                        templateCode: this.$route.query.templateCode,
                        pageCode: this.$route.query.pageCode,
                        url: window.encodeURIComponent(window.location.href),
                        opt: 'refuse'
                    }
                }
            }

            this.$router.push(pathUrl)
        },
        // 同事分享
        sharePartener () {
            var link = window.location.href

            window.wx.invoke("shareAppMessage", {
                title: this.articleData.pageTitle,
                desc: this.articleData.pageAbstract,
                link: link,
                imgUrl: this.articleData.pageCover
            }, (res) => {
                    if (res.err_msg != "shareAppMessage:ok") {
                        this.$message.error('请更新企业微信版本！！！')
                    }
            })
        },
        // 微信分享
        shareWechat () {
            var arrs = window.location.search.match(/(&S=[^&]*)&?/)
            var search = window.location.search.replace(arrs[1], '&S=' + this.userInfo.userCode)

            var link = 'http://site.socialmarketingcloud.com/spreedArticle/detail' + search

            window.wx.invoke("shareWechatMessage", {
                title: this.articleData.pageTitle,
                desc: this.articleData.pageAbstract,
                link: link,
                imgUrl: this.articleData.pageCover
            }, (res) => {
                    if (res.err_msg != "shareWechatMessage:ok") {
                        this.$message.error('请更新企业微信版本！！！')
                    }
            })
        },
        getData () {
            util.request({
                method: 'get',
                interface: 'mobileHtml5PageGet',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    pageCode: this.$route.query.pageCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.articleData = res.result.result
                    this.areaList = res.result.result.pageAreas

                    if (this.articleData.pageCommentOpt == '1') {
                        this.sheetList = [
                            {
                                label: '文章下架',
                                pathName: 'close'
                            },
                            {
                                label: '关闭评论',
                                pathName: 'commentClose'
                            },
                            {
                                label: '修改推荐',
                                pathName: 'edit'
                            },
                            {
                                label: '管理日志',
                                pathName: 'log'
                            }
                        ]
                    } else {
                        this.sheetList = [
                            {
                                label: '文章下架',
                                pathName: 'close'
                            },
                            {
                                label: '开启评论',
                                pathName: 'commentOn'
                            },
                            {
                                label: '修改推荐',
                                pathName: 'edit'
                            },
                            {
                                label: '管理日志',
                                pathName: 'log'
                            }
                        ]
                    }
                } else {
                  this.$message.error(res.result.message)
                }
            })
        },
        getTemplate () {
            util.request({
                method: 'get',
                interface: 'getTemplates',
                data: {
                    templateCode: this.$route.query.templateCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.base = Object.assign(res.result.result[0], this.base)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getArticles () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                pageCode: this.$route.query.pageCode
            }

            util.request({
                method: 'get',
                interface: 'getExtendPages',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.articleList = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    },
    components: {
        sheet,
        commentShow
    }
}
</script>
<style lang="scss">
.article-body {
    .white-bg {
        background: #ffffff;
    }
}
</style>