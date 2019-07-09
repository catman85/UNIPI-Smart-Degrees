<template>
  <div>
    <Slide right>
      <!-- <nav class="navbar navbar-expand-sm navbar-light bg-light"> -->
      <ul class="navbar-nav">
        <router-link tag="li" class="nav-link" to="/" exact>
          <a>Home / Verify</a>
        </router-link>

        <!-- v-show="isProfessor" -->
        <router-link v-if="isProfessor" tag="li" class="nav-link" to="/sign" exact>
          <a>Sign a Degree</a>
        </router-link>

        <router-link tag="li" class="nav-link" to="/about" exact>
          <a>About</a>
        </router-link>

        <li class="nav-link">
          <strong :class="connectedClass">
            {{ connectedText }}
          </strong>
        </li>
      </ul>
      <!-- </nav> -->
    </Slide>
    <!-- <br><br> -->
  </div>
</template>

<script>
  // importing common function
  import mixin from '../libs/mixinViews';
  import {
    Slide
  } from 'vue-burger-menu';

  export default {
    mixins: [mixin],
    components: {
      Slide // Register your component
    },

    data() {
      return {
        tmoConn: null, // contain the intervalID given by setInterval
        tmoCheck: null, // contain the intervalID given by setInterval
        connectedClass: 'text-danger', // bootstrap class for the connection status (red when not connected, green when connected)
        connectedText: 'Connecting...',
        isProfessor: false, // true when the user that is visiting the page is registered
      }
    },

    created() {
      this.checkIfConnected();
      this.checkIfUserIsProfessor();
    },

    methods: {
      /**
       * It checks if the visiting user is regitered calling every 500ms the function isRegistered
       * from the smart contract until the connection with the smart contract is established.
       */
      checkIfConnected() {
        this.tmoConn = setInterval(() => {
          // checking first if the connection with the blockchain is established
          if (this.blockchainIsConnected()) { // mixinViews
            // stopping the setInterval
            clearInterval(this.tmoConn);

            // showing the connected message on the top bar and setting the class too
            this.goGreen();
          }
        }, 500);
      },

      goGreen() {
        this.connectedClass = 'text-success';
        this.connectedText = 'Connected to BC';
      },

      //Check if the user is registered calling the function of the smart contract getProfessorIndex.
      checkIfUserIsProfessor() {
        let attempts = 2;
        let count = 0;

        this.tmoCheck = setInterval(() => {
          if (count == attempts) {
            clearInterval(this.tmoCheck); // stop looping
          }
          if (this.blockchainIsConnected() && this.$store.isProf) {
            clearInterval(this.tmoCheck); // stop looping
            this.showLink();
          }
          count++;
        }, 500);
      },

      showLink() {
        this.isProfessor = true;
      },
    }
  }

</script>

<style>
  .bm-overlay {
    background-color: white;
  }

  .bm-menu {
    background-color: rgba(231, 230, 230, 0.884)
  }

  a,
  strong {
    white-space: nowrap;
    /* color:red; */
  }

</style>
