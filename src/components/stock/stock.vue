<template>
    <!--微信组件-->
  <div id="wechat">
    <ul class="wechat-list">
        <!--props传递消息对象 baseMsgObj -->
        <stock-item v-for="baseMsgObj in stockJson.result" :item="baseMsgObj" class="list-row line-bottom" :key="baseMsgObj.mid"></stock-item>
    </ul>
  </div>
</template>
<script>
    import stockItem from "./stock-item"
    import actions from '../../vuex/actions'
    export default {
        components: {
          stockItem
        },
        mixins: [window.mixin],
        data() {
            return {
              stockJson:[],
              "pageName": "营销知识库"
            }
        },

      mounted(){
        this.stockList();
      },

      methods:{
        stockList(){
          actions.request({
            method: 'get',
            interface: 'stockJson',
            data: {}
          }).then(res => {
            var data = res.result;
            this.stockJson = data;
            console.log(this.stockJson);

          });
        }
      }
    }
</script>
<style>
    @import "../../assets/sass/service.scss";
</style>
