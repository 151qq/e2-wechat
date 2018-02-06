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
                                    C: 'e2nochannel',
                                    T: 'e2nospread'
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

        <template v-if="isCreator">
            <div class="btn-height-box"></div>
            <div class="wx-bottom-nav">
                <a class="wx-nav-item"
                    @click="sharePartener">
                    分享同事
                </a>
                <a class="wx-nav-item"
                    @click="showSheet">
                    产品相关
                </a>
                <a class="wx-nav-item"
                    @click="shareWechat">
                    分享微信
                </a>
            </div>
        </template>

        <sheet :is-show-sheet="isShowSheet" :item-list="sheetList" :cb="publistOpt"></sheet>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import { mapGetters } from 'vuex'
import sheet from '../common/sheet.vue'

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
            isShowSheet: {
                value: false
            },
            sheetList: [
                {
                    label: '详细规格',
                    pathName: 'product-spec'
                },
                {
                    label: '应用场景',
                    pathName: 'product-senior'
                },
                {
                    label: '客户评论',
                    pathName: 'product-log'
                },
                {
                    label: '产品相册',
                    pathName: 'product-img'
                }
            ],
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
            var pathUrl = {
                name: item.pathName,
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    agentId: this.$route.query.agentId,
                    templateCode: this.$route.query.templateCode,
                    pageCode: this.$route.query.pageCode
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
                    if (res.err_msg != "shareWechatMessage:ok") {
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
        sheet
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