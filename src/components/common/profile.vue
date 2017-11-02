<template>
  <!--个人信息组件-->
  <div class="profile">

    <div class="weui-cells">
      <div class="weui-cell" id="avatarCell">
        <div class="weui-cell__bd">
          <img src="https://sinacloud.net/vue-wechat/images/headers/header01.png"
               style="width: 50px;height: 50px;border-radius: 4px;">
        </div>
        <div class="weui-cell__ft">
          <p>{{wechatUser.authCode}}</p>
        </div>

      </div>
      <div style="height: 80px;"></div>

      <div class="weui-grids" style="background-color: #f8f8f8">
        <a :href="'http://60.208.106.23:8480/sdgswap/gs/login.do?method=v&&u='+wechatUser.authCode" class="weui-grid">
          <div class="weui-grid__icon">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAA6lBMVEUngtcogtdfouGtz+/Z6fjz+PxKlt3O4/b///9jpOL4+/1Zn+D5+/0yiNnj7/mVwuswh9jv9vwvhthrqeNqqeOkyu7G3vTc6vjS5fa41vGLvOlCktzM4fVUnN/9/v6my+4xh9ji7vlan+C+2fNyreRlpuKjyu6iye1tquT8/f6Vwesqg9f+/v5NmN5kpeLd6/jg7flLl93C3POZxOw3i9qly+5Sm99Tm9+FuOjx9/zb6vidxuza6fgshdhXnd80idnR5Pbo8fq31fGrzu+sz++21PH1+f1Omd7k7/o4jNrK4PUrhNemzO6CtucNfNx8AAABWElEQVR4Ae3Bg3rkABiG0Xf81TbHrG27vf/LqZsnGWX6Z705h9BfIhQKRaKxeCIRj0UjBJJM6VMqSQBd3XJ0d2HW0yuX3h6M+vrl0d+HzYDqDGAyOKQ6Q8NYjKjBKBZjajCGxbgajGMRV4M4FhNqMIHFpBpMYjGlBlNYTKvBNBYzajCDyazqzGIzNy+P+TmMFuSxgNViWi7pRcwycskQQFaOLEHk5MgRRF6OPEEUJGliQpKKBFAqS1KlIknlElbVSk1vlpb0plapYrK8onersKp3K8t839q6Pm3Ahj6tr/E9m1tlfdmGHX0pb23Suerunhz9AP1y7O1W6VBmXy4HAAdyOczQiaNCTW7HAMdyqxWO8HVyKo8z3p3J4/QEP+fyuuDdpbyu8NMrr+sbgJtrefXiR/Vu7+DuVvXwowb3Dw/3aoCfhBo8PqpBAj9PCXUg8UQoFAr9oV4AkgMtYs7Eq2AAAAAASUVORK5CYII=" class="img-obj-cover">          </div>
          <p class="weui-grid__label">协同办公</p>
        </a>
        <a href="javascript:;" class="weui-grid">
          <div class="weui-grid__icon">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAA6lBMVEUngtcogtdfouGtz+/Z6fjz+PxKlt3O4/b///9jpOL4+/1Zn+D5+/0yiNnj7/mVwuswh9jv9vwvhthrqeNqqeOkyu7G3vTc6vjS5fa41vGLvOlCktzM4fVUnN/9/v6my+4xh9ji7vlan+C+2fNyreRlpuKjyu6iye1tquT8/f6Vwesqg9f+/v5NmN5kpeLd6/jg7flLl93C3POZxOw3i9qly+5Sm99Tm9+FuOjx9/zb6vidxuza6fgshdhXnd80idnR5Pbo8fq31fGrzu+sz++21PH1+f1Omd7k7/o4jNrK4PUrhNemzO6CtucNfNx8AAABWElEQVR4Ae3Bg3rkABiG0Xf81TbHrG27vf/LqZsnGWX6Z705h9BfIhQKRaKxeCIRj0UjBJJM6VMqSQBd3XJ0d2HW0yuX3h6M+vrl0d+HzYDqDGAyOKQ6Q8NYjKjBKBZjajCGxbgajGMRV4M4FhNqMIHFpBpMYjGlBlNYTKvBNBYzajCDyazqzGIzNy+P+TmMFuSxgNViWi7pRcwycskQQFaOLEHk5MgRRF6OPEEUJGliQpKKBFAqS1KlIknlElbVSk1vlpb0plapYrK8onersKp3K8t839q6Pm3Ahj6tr/E9m1tlfdmGHX0pb23Suerunhz9AP1y7O1W6VBmXy4HAAdyOczQiaNCTW7HAMdyqxWO8HVyKo8z3p3J4/QEP+fyuuDdpbyu8NMrr+sbgJtrefXiR/Vu7+DuVvXwowb3Dw/3aoCfhBo8PqpBAj9PCXUg8UQoFAr9oV4AkgMtYs7Eq2AAAAAASUVORK5CYII=" class="img-obj-cover">          </div>
          <p class="weui-grid__label">路政系统</p>
        </a>
        <a href="javascript:;" class="weui-grid">
          <div class="weui-grid__icon">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAA6lBMVEUngtcogtdfouGtz+/Z6fjz+PxKlt3O4/b///9jpOL4+/1Zn+D5+/0yiNnj7/mVwuswh9jv9vwvhthrqeNqqeOkyu7G3vTc6vjS5fa41vGLvOlCktzM4fVUnN/9/v6my+4xh9ji7vlan+C+2fNyreRlpuKjyu6iye1tquT8/f6Vwesqg9f+/v5NmN5kpeLd6/jg7flLl93C3POZxOw3i9qly+5Sm99Tm9+FuOjx9/zb6vidxuza6fgshdhXnd80idnR5Pbo8fq31fGrzu+sz++21PH1+f1Omd7k7/o4jNrK4PUrhNemzO6CtucNfNx8AAABWElEQVR4Ae3Bg3rkABiG0Xf81TbHrG27vf/LqZsnGWX6Z705h9BfIhQKRaKxeCIRj0UjBJJM6VMqSQBd3XJ0d2HW0yuX3h6M+vrl0d+HzYDqDGAyOKQ6Q8NYjKjBKBZjajCGxbgajGMRV4M4FhNqMIHFpBpMYjGlBlNYTKvBNBYzajCDyazqzGIzNy+P+TmMFuSxgNViWi7pRcwycskQQFaOLEHk5MgRRF6OPEEUJGliQpKKBFAqS1KlIknlElbVSk1vlpb0plapYrK8onersKp3K8t839q6Pm3Ahj6tr/E9m1tlfdmGHX0pb23Suerunhz9AP1y7O1W6VBmXy4HAAdyOczQiaNCTW7HAMdyqxWO8HVyKo8z3p3J4/QEP+fyuuDdpbyu8NMrr+sbgJtrefXiR/Vu7+DuVvXwowb3Dw/3aoCfhBo8PqpBAj9PCXUg8UQoFAr9oV4AkgMtYs7Eq2AAAAAASUVORK5CYII=" class="img-obj-cover">          </div>
          <p class="weui-grid__label">设备系统</p>
        </a>
        <a href="javascript:;" class="weui-grid">
          <div class="weui-grid__icon">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAA6lBMVEUngtcogtdfouGtz+/Z6fjz+PxKlt3O4/b///9jpOL4+/1Zn+D5+/0yiNnj7/mVwuswh9jv9vwvhthrqeNqqeOkyu7G3vTc6vjS5fa41vGLvOlCktzM4fVUnN/9/v6my+4xh9ji7vlan+C+2fNyreRlpuKjyu6iye1tquT8/f6Vwesqg9f+/v5NmN5kpeLd6/jg7flLl93C3POZxOw3i9qly+5Sm99Tm9+FuOjx9/zb6vidxuza6fgshdhXnd80idnR5Pbo8fq31fGrzu+sz++21PH1+f1Omd7k7/o4jNrK4PUrhNemzO6CtucNfNx8AAABWElEQVR4Ae3Bg3rkABiG0Xf81TbHrG27vf/LqZsnGWX6Z705h9BfIhQKRaKxeCIRj0UjBJJM6VMqSQBd3XJ0d2HW0yuX3h6M+vrl0d+HzYDqDGAyOKQ6Q8NYjKjBKBZjajCGxbgajGMRV4M4FhNqMIHFpBpMYjGlBlNYTKvBNBYzajCDyazqzGIzNy+P+TmMFuSxgNViWi7pRcwycskQQFaOLEHk5MgRRF6OPEEUJGliQpKKBFAqS1KlIknlElbVSk1vlpb0plapYrK8onersKp3K8t839q6Pm3Ahj6tr/E9m1tlfdmGHX0pb23Suerunhz9AP1y7O1W6VBmXy4HAAdyOczQiaNCTW7HAMdyqxWO8HVyKo8z3p3J4/QEP+fyuuDdpbyu8NMrr+sbgJtrefXiR/Vu7+DuVvXwowb3Dw/3aoCfhBo8PqpBAj9PCXUg8UQoFAr9oV4AkgMtYs7Eq2AAAAAASUVORK5CYII=" class="img-obj-cover">          </div>
          <p class="weui-grid__label">养护基建</p>
        </a>
        <a href="javascript:;" class="weui-grid">
          <div class="weui-grid__icon">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAA6lBMVEUngtcogtdfouGtz+/Z6fjz+PxKlt3O4/b///9jpOL4+/1Zn+D5+/0yiNnj7/mVwuswh9jv9vwvhthrqeNqqeOkyu7G3vTc6vjS5fa41vGLvOlCktzM4fVUnN/9/v6my+4xh9ji7vlan+C+2fNyreRlpuKjyu6iye1tquT8/f6Vwesqg9f+/v5NmN5kpeLd6/jg7flLl93C3POZxOw3i9qly+5Sm99Tm9+FuOjx9/zb6vidxuza6fgshdhXnd80idnR5Pbo8fq31fGrzu+sz++21PH1+f1Omd7k7/o4jNrK4PUrhNemzO6CtucNfNx8AAABWElEQVR4Ae3Bg3rkABiG0Xf81TbHrG27vf/LqZsnGWX6Z705h9BfIhQKRaKxeCIRj0UjBJJM6VMqSQBd3XJ0d2HW0yuX3h6M+vrl0d+HzYDqDGAyOKQ6Q8NYjKjBKBZjajCGxbgajGMRV4M4FhNqMIHFpBpMYjGlBlNYTKvBNBYzajCDyazqzGIzNy+P+TmMFuSxgNViWi7pRcwycskQQFaOLEHk5MgRRF6OPEEUJGliQpKKBFAqS1KlIknlElbVSk1vlpb0plapYrK8onersKp3K8t839q6Pm3Ahj6tr/E9m1tlfdmGHX0pb23Suerunhz9AP1y7O1W6VBmXy4HAAdyOczQiaNCTW7HAMdyqxWO8HVyKo8z3p3J4/QEP+fyuuDdpbyu8NMrr+sbgJtrefXiR/Vu7+DuVvXwowb3Dw/3aoCfhBo8PqpBAj9PCXUg8UQoFAr9oV4AkgMtYs7Eq2AAAAAASUVORK5CYII=" class="img-obj-cover">          </div>
          <p class="weui-grid__label">安全管理</p>
        </a>
        <a href="javascript:;" class="weui-grid">
          <div class="weui-grid__icon">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAA6lBMVEUngtcogtdfouGtz+/Z6fjz+PxKlt3O4/b///9jpOL4+/1Zn+D5+/0yiNnj7/mVwuswh9jv9vwvhthrqeNqqeOkyu7G3vTc6vjS5fa41vGLvOlCktzM4fVUnN/9/v6my+4xh9ji7vlan+C+2fNyreRlpuKjyu6iye1tquT8/f6Vwesqg9f+/v5NmN5kpeLd6/jg7flLl93C3POZxOw3i9qly+5Sm99Tm9+FuOjx9/zb6vidxuza6fgshdhXnd80idnR5Pbo8fq31fGrzu+sz++21PH1+f1Omd7k7/o4jNrK4PUrhNemzO6CtucNfNx8AAABWElEQVR4Ae3Bg3rkABiG0Xf81TbHrG27vf/LqZsnGWX6Z705h9BfIhQKRaKxeCIRj0UjBJJM6VMqSQBd3XJ0d2HW0yuX3h6M+vrl0d+HzYDqDGAyOKQ6Q8NYjKjBKBZjajCGxbgajGMRV4M4FhNqMIHFpBpMYjGlBlNYTKvBNBYzajCDyazqzGIzNy+P+TmMFuSxgNViWi7pRcwycskQQFaOLEHk5MgRRF6OPEEUJGliQpKKBFAqS1KlIknlElbVSk1vlpb0plapYrK8onersKp3K8t839q6Pm3Ahj6tr/E9m1tlfdmGHX0pb23Suerunhz9AP1y7O1W6VBmXy4HAAdyOczQiaNCTW7HAMdyqxWO8HVyKo8z3p3J4/QEP+fyuuDdpbyu8NMrr+sbgJtrefXiR/Vu7+DuVvXwowb3Dw/3aoCfhBo8PqpBAj9PCXUg8UQoFAr9oV4AkgMtYs7Eq2AAAAAASUVORK5CYII=" class="img-obj-cover">          </div>
          <p class="weui-grid__label">机电设备</p>
        </a>
        <a href="javascript:;" class="weui-grid">
          <div class="weui-grid__icon">
          </div>
          <p class="weui-grid__label">....</p>
        </a>
      </div>
    </div>

  </div>
</template>

<style>


  .weui-grid__icon {
    width: 58px;
    height: 58px;
    margin: 0 auto
  }
</style>

<script>
  import actions from '../../vuex/actions'
  export default {
    data() {
      return {
        wechatUser: {
          authCode: ""
        },
        pageName: "个人信息"
      }
    },

    mounted(){
      this.findUser();
    },

    methods: {
      findUser(){
        actions.request({
          method: 'get',
          interface: 'getWechatUserInfo',
          data: {}
        }).then(res => {
          var data = res.result;
          this.wechatUser = data.result;
          console.log(this.wechatUser);

        });
      }
    }
  }
</script>
