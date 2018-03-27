<template>
    <section class="user-role-list">
        <template v-for="(role, index) in dataList">
            <div class="wx-area-line" v-if="index"></div>
            <div class="weui-cells no-margin">
                <a class="weui-media-box weui-media-box_appmsg">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" :src="item.pageCover">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{item.pageTitle}}</h4>
                        <p class="weui-media-box__desc">{{item.pageAbstract}}</p>
                    </div>
                </a>
            </div>
            <div class="weui-cells no-margin">
                <div class="weui-cell weui-cell_access" @click="goToUser(role)">
                    <div class="weui-cell__bd">{{role.roleName}}</div>
                    <div class="weui-cell__ft"></div>
                </div>
            </div>
        </template>
    </section>
</template>
<script>
import util from '../../utils/tools'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            dataList: []
        }
    },
    mounted () {
        this.getList()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        getList () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                spreadCode: this.$route.query.spreadCode
            }

            util.request({
                method: 'get',
                interface: 'allRole',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.dataList = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>