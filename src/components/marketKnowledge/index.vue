<template>
    <section class="page_bd marketKown-box">
        <div class="weui-cells">
            <router-link
                class="weui-cell weui-cell_access"
                :to="{name: 'market-list', params: {listType: 'listTL'}, query: {category: 'product'}}">
                <div class="weui-cell__hd">
                    <img src="../../assets/images/marketImg.jpg">
                </div>
                <div class="weui-cell__bd">产品中心</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link
                class="weui-cell weui-cell_access"
                :to="{name: 'market-list', params: {listType: 'listITL'}, query: {category: 'article'}}">
                <div class="weui-cell__hd">
                    <img src="../../assets/images/marketImg.jpg">
                </div>
                <div class="weui-cell__bd">推广文章</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link
                class="weui-cell weui-cell_access"
                :to="{name: 'market-list', params: {listType: 'listITL'}, query: {category: 'case'}}">
                <div class="weui-cell__hd">
                    <img src="../../assets/images/marketImg.jpg">
                </div>
                <div class="weui-cell__bd">营销方案</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link
                class="weui-cell weui-cell_access"
                :to="{name: 'market-list', params: {listType: 'listITL'}, query: {category: 'analyse'}}">
                <div class="weui-cell__hd">
                    <img src="../../assets/images/marketImg.jpg">
                </div>
                <div class="weui-cell__bd">营销分析</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link
                class="weui-cell weui-cell_access"
                :to="{name: 'market-list', params: {listType: 'listITL'}, query: {category: 'avtivity'}}">
                <div class="weui-cell__hd">
                    <img src="../../assets/images/marketImg.jpg">
                </div>
                <div class="weui-cell__bd">活动现场</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link
                class="weui-cell weui-cell_access"
                :to="{name: 'market-list', params: {listType: 'listTL'}, query: {category: 'sale'}}">
                <div class="weui-cell__hd">
                    <img src="../../assets/images/marketImg.jpg">
                </div>
                <div class="weui-cell__bd">营销表单</div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link
                class="weui-cell weui-cell_access"
                :to="{name: 'market-list', params: {listType: 'listITL'}, query: {category: 'chat'}}">
                <div class="weui-cell__hd">
                    <img src="../../assets/images/marketImg.jpg">
                </div>
                <div class="weui-cell__bd">聊天记录</div>
                <div class="weui-cell__ft"></div>
            </router-link>
        </div>
    </section>
</template>
<script>
export default {
    data () {
        return {
        }
    }
}
</script>
<style lang="scss">
.marketKown-box {
    .weui-cells {
        margin-top: 0;
    }

    .weui-cell__hd {
        img {
            display: block;
            width: 3em;
            height: 3em;
            margin-right: 0.5em;
        }
    }
}
</style>