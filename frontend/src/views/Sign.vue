<template>
  <div>
    <h1 class="title">Sign a Degree</h1>
    <div class="info">
      <h2>Welcome {{this.profName}}</h2>
      <h2>ID: {{this.profId}}</h2>
    </div>
    <br>
    <MyForm mode="sign" @sign="signGraduation"></MyForm>
    <br>
    <div class="info">
      <h3>Your Address: </h3>
      <h3>{{this.profAddress}}</h3>
    </div>
  </div>
</template>

<script>
  // importing common function
  import mixin from '../libs/mixinViews';
  import MyForm from '@/components/MyForm';

  export default {
    components: {
      MyForm
    },
    mixins: [mixin],

    data() {
      return {}
    },

    computed: {
      profName() {
        return this.$store.state.Prof.name
      },
      profAddress() {
        return this.$store.state.Prof.address
      },
      profId() {
        return this.$store.state.Prof.id
      }
    },

    methods: {
      /**
       * @param {string} hash
       * @return {Promise}
       */
      signGraduation(hash) { //only works when metamask poops the connect prompt ant the mozextension
        return new Promise((resolve, reject) => {
          this.submitted = false;
          window.bc.getAccounts()
            .then(accounts => {
              console.debug("Hash: ", hash);
              // accounts[0] is the selected MetaMask address
              window.bc.contract().signGraduation(hash, {
                from: accounts[0]
              }, (error, res) => {
                if (error) {
                  this.$swal('You can\'t sign the same student more than once', 'Error', 'error');
                  console.debug("Signing Failed!");
                  reject(error);
                }
                // Use sweetalert2
                if (!error) {
                  this.$swal('Successfully Signed Degree', 'Success', 'success');
                }
                console.debug(res);
                resolve(res);
              })
              // .catch(error => { // mysterious undefined error
              // reject(error)
              // });
            })
        });
      }
    }
  }

</script>
