<template>
  <div class="row">
    <div class="col-md-7 form">

      <div class="form-group">
        <label for="description">Name</label>
        <input class="form-control" placeholder="Enter name" type="text" v-model="userName">
      </div>

      <div class="form-group">
        <label for="description">Department</label>
        <input class="form-control" placeholder="Enter department" type="text" v-model="department">
      </div>

      <div class="form-group">
        <label for="description">Grade</label>
        <input class="form-control" placeholder="Enter grade" type="text" v-model="grade">
      </div>
      <!-- TODO: bootstraap date picker -->
      <div class="form-group">
        <label for="description">Graduation Date</label>
        <date-picker v-model="date" :config="options"></date-picker>
      </div>
      <div class="row">
        <div class="col-sm-1"></div>
        <div class="custom-control custom-checkbox col-md-4">
          <input type="checkbox" class="custom-control-input" id="defaultUnchecked" v-model="toggle">
          <label class="custom-control-label" for="defaultUnchecked">Use pass</label>
        </div>
        <div class="col-md-7">
          <input class="form-control" placeholder="Secret Password" :disabled="!disablePass" type="text" v-model="pass">
        </div>
      </div>
      <br>
      <button class="col btn btn-primary" :disabled="disableSubmit"
        @click="performSubmit">{{this.mode | capitalize}}</button>

      <div v-show="errorStr" class="alert alert-danger mt-3" role="alert">
        {{ errorStr }}
        <br>
        <small>Check the browser console for more details.</small>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from '../libs/mixinViews';

  // ATTENTION importing the client-side hash library 
  import bcrypt from "bcryptjs"; //bcrypt
  import crypto from "crypto-js"; //sha256

  import 'bootstrap/dist/css/bootstrap.css';
  import datePicker from 'vue-bootstrap-datetimepicker';
  import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

  export default {
    mixins: [mixin],
    name: 'MyForm',
    props: {
      mode: String
    },
    components: {
      datePicker
    },
    filters: {
      capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
      }
    },
    data() {
      return {
        userName: '', // variable binded with the input field: name
        department: '', // variable binded with the input field: status
        grade: '',
        date: new Date(),
        pass: '',
        toggle: false,

        options: {
          format: 'DD/MM/YYYY',
          useCurrent: false,
        },

        // successMessage: false, // true when the user has been registered successfully
        // tmoConn: null, // contain the intervalID given by setInterval
        // tmoReg: null, // contain the intervalID given by setInterval
        errorStr: null, // it shows the error message
        data: String,
        hash: String,
      }
    },
    watch: {
      toggle: function(){
      },
      userName: function () {
        this.$emit('hide');
      },
      department: function () {
        this.$emit('hide');
      },
      grade: function () {
        this.$emit('hide');
      },
      date: function () {
        this.$emit('hide');
      }
    },
    mounted() {
      // BCRYPT too complicated
      // var salt = bcrypt.genSaltSync(10);
      // var hash = bcrypt.hashSync("test", salt);
      // console.debug(hash);
      // console.debug(bcrypt.compareSync("test", hash));
    },
    computed: {
      disableSubmit() {
        return (
          !this.userName.length ||
          !this.department.length ||
          !this.date.length ||
          !this.grade.length ||
          (this.toggle && !this.pass.length) ||
          !this.blockchainIsConnected()
        );
      },
      disablePass() {
        return this.toggle;
      }
    },
    methods: {
      /**
       * @return {void}
       */
      performSubmit() {
        //TODO: build the concat method
        this.concat();
        this.hash = this.sha256(this.data); //FIXME: temporary use bcrypt instead

        if (this.mode == "sign") {
          this.$emit('sign', this.hash); // calls contract function in Sign.vue
        }

        if (this.mode == "verify") {
          this.$emit('verify', this.hash); // calls contract funcion in Verify.vue
        }
        // window.bc.getMainAccount()
        //   .then(address => this.performUserRegistration(address));
      },

      concat() {
        this.data = this.userName + this.department + this.department + this.date;
        if(this.toggle){
          this.data += this.pass;
        }
        console.debug("DATA: ", this.data);
      },

      sha256(data) {
        let Crypto = require('crypto-js')
        let res = Crypto.SHA256(data).toString();
        console.debug("HASH: ", res);
        return res;
      },

      /**
       * Show the form error.
       *
       * @param {object} err
       * @return {void}
       */
      showErrorMessage(err) {
        console.error(err);

        this.errorStr = null;

        if (err) this.errorStr = err.toString();

        if (!this.errorStr) this.errorStr = 'Error occurred!';
      }
    }
  }

</script>

<style lang="scss">
  .custom-control {
    text-align: center;
  }

</style>
