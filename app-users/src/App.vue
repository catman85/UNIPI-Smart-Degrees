<template>
  <div>
    <vue-particles color="#dedede" :particleOpacity="0.9" :particlesNumber="90" shapeType="edge" :particleSize="9"
      linesColor="#dedede" :linesWidth="2" :lineLinked="true" :lineOpacity="0.8" :linesDistance="190" :moveSpeed="3">
    </vue-particles>
    <!-- :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push" -->
    <top-menu></top-menu>
    <div class="content p-4">

      <router-view></router-view>
    </div>

    <div v-show="bcConnectionError" class="m-4 alert alert-danger">
      <h2 class="pb-4">Error connecting to the blockchain!</h2>

      <p v-if="errorConnectionMessage">
        <b>{{ errorConnectionMessage }}</b>
      </p>

      <p v-show="bcSmartContractAddressError">
        <b>It seems like the address of the smart contract is wrong!</b>
      </p>

      <hr>

      <p>Other common causes of error:</p>
      <ul>
        <li>The blockchain is running.</li>
        <li>The port in your settings (file: <b>libs/mixinViews.js</b>) match with the blockchain configuration.</li>
        <li>The compiled smart contract <b>app-users/src/assets/Users.json</b> is equal to <b>build/Users.json</b>.</li>
      </ul>
    </div>
    <myfooter></myfooter>
  </div>
</template>

<script>
  // importing common function
  import mixin from './libs/mixinViews';
  import VueParticles from 'vue-particles';
  import TopMenu from './components/TopMenu';
  import myfooter from './components/MyFooter';
  import './assets/scss/style.scss';
  // https://flaviocopes.com/vue-using-scss/
  // npm install --save-dev node-sass sass-loader

  import Vue from 'vue';
  Vue.use(VueParticles);

  export default {
    components: {
      TopMenu,
      myfooter,
    },
    mixins: [mixin],

    name: 'App'
  };

</script>

<style lang="scss">
  @import '~sweetalert2/src/variables';
  @import '~sweetalert2/src/sweetalert2';
  // $swal2-background: #990000; 

  // ATTENTION making particles background
  canvas {
    display: block;
  }

  #particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

</style>
