<template>
    <!--微信组件-->
  <div id="wechat">
    <ul class="wechat-list">
        <!--props传递消息对象 baseMsgObj -->
        <task-item v-for="baseMsgObj in taskJson.result" :item="baseMsgObj" class="list-row line-bottom" :key="baseMsgObj.id"></task-item>
    </ul>
  </div>
</template>
<script>
  import actions from '../../vuex/actions'
  import taskItem from "./task-item"
    export default {
        components: {
          taskItem
        },
        mixins: [window.mixin],
        data() {
            return {
              taskJson:[],
              "pageName": "营销任务"
            }
        },

      mounted(){
            this.taskList();
        },


      methods:{
        taskList(){
          actions.request({
            method: 'get',
            interface: 'taskJson',
            data: {}
          }).then(res => {
            var data = res.result;
            this.taskJson = data;
            console.log(this.taskJson);

          });
        }
      }
    }
</script>
<style>
  @import "../../assets/sass/service.scss";
</style>
