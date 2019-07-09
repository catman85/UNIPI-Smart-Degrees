<template>
  <div>
    <h1 class="title">Verify a Degree</h1>
    <MyForm mode="verify" @verify="checkIfHashIsRegistered"></MyForm>
  </div>
</template>

<script>
  // importing common function
  import mixin from '../libs/mixinViews';
  import MyForm from '@/components/MyForm';

  export default {
    components: {
      MyForm,
    },
    mixins: [mixin],

    data() {
      return {
        users: [], // array that stores all the registered users
        isLoading: true, // true when the user list is loading form the blockchain
        bcConnected: false, // blockchain is connected ()
        tmoConn: null, // contain the intervalID given by setInterval
      }
    },
    computed: {
      submittedC() {
        return this.submitted;
      },
      resultC() {
        return this.result;
      },
    },
    methods: {
      /**
       * @param {string} hash
       * @return {void}
       */
      checkIfHashIsRegistered(hash) { // this works
        this.submitted = false;
        if (this.blockchainIsConnected()) {
          // console.debug(hash);
          window.bc.contract().verifyGraduation.call(hash, (error, bool) => {
            if (error) {
              console.debug(error);
            }
            console.debug(bool);

            if(bool){
              this.$swal('This Person owns a Degree','Success','success');
            }else{
              this.$swal('This Person doesn\'t own a Degree','Error','error');
            }
          })
          // .catch(error => { // mysterious undefuned error
          //   reject(error)
          // });
        }
      }
    } // end methods
  }

</script>

<style>
</style>
