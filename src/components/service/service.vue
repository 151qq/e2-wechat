<template>
    <!--微信组件-->
  <div id="wechat">
    <ul class="wechat-list">
        <!--props传递消息对象 baseMsgObj -->
        <msg-item v-for="baseMsgObj in messageJson" :item="baseMsgObj" class="list-row line-bottom" :key="baseMsgObj.mid"></msg-item>
    </ul>
  </div>
</template>
<script>
    import search from "../common/search"
    import msgItem from "./msg-item"
    import actions from '../../vuex/actions'

    export default {
        components: {
            msgItem
        },
        mixins: [window.mixin],
        data() {
            //console.log(this.$store.state.msgList.baseMsg);
          return {
              //messageJson : this.$store.state.msgList.baseMsg,
              messageJson:[],
              "pageName": "在线导购"
            }
        },

        mounted(){
          this.serviceJson();
        },

        methods:{
          　serviceJson(){
              actions.request({
                method: 'get',
                interface: 'serviceJson',
                data: {}
              }).then(res => {
                var data = res.result;
                this.messageJson = data;
                console.log(this.messageJson);

              });
          }
      }
    }
</script>
<style>
  @import "../../assets/sass/service.scss";
</style>
