import BcExplorer from './BcExplorer'
import DegreesContract from '../assets/Degrees.json';

export default {
  data() {
    return {
      bcConnected: false, // true when the connection with the blockchain is established, plus the contract ABI + address is correctly initialized
      bcConnectionError: false,
      errorConnectionMessage: null,
      bcSmartContractAddressError: false
    }
  },

  created() {
    this.init();
  },

  methods: {
    /**
     * Initialize the BcExplore object (this means the connection with the
     * blockchin and initialise the contracts).
     *
     * @return {void}
     */
    init() {
      // when this file is imported to other component it checks if the BcExplorer
      // is instatiated.
      if (window.bc == undefined) {
        window.bc = new BcExplorer;

        // connecting to the blockchain and intializing the Users smart contract
        window.bc.initWithContractJson(DegreesContract, 'http://127.0.0.1:7545')
          .then((error) => {
            // handling the connection error
            if (error) {
              this.bcConnected = false;

              this.showConnectionErrorMessage(error); //legit
            } else {
              // calling a smart contract function in order to check the contract address
              // is correct. NOTE: here you might be connected successfully.
              // TODO: the check of the smart contract address validity it should be BcExplorer duty
              this.getProfessorIndex() // this is a local function
                .then(res => {
                  this.bcConnectionError = false;
                  this.bcConnected = this.blockchainIsConnected();
                })
                .catch(error => {
                  // this.showConnectionErrorMessage(error);  //non-legit we are simply not a prof
                  this.bcSmartContractAddressError = true;
                });
            }
          })
          .catch(error => {
            // this.showConnectionErrorMessage(error) //not-sure
          });
      } // end if (window.bc == undefined)
    },

    /**
     * Check if the user is registered.
     *
     * @return {Promise}
     */
    getProfessorIndex() {
      return new Promise((resolve, reject) => {
        window.bc.getAccounts()
          .then(accounts => {
            // console.debug(accounts);
            // accounts[0] is the selected MetaMask address
            window.bc.contract().getProfessorIndex.call({
              from: accounts[0]
            }, (error, res) => {
              if (error) {
                console.debug("You are Not a Professor!");
                reject(error);
              }
              let id = res.toNumber();
              // console.debug(id);
              window.bc.contract().professors(id, (error, res) => {
                let name = res[1];
                this.setProf(id,name,accounts[0]);
              })
              resolve(res);
            })
  
          })

        // Original
        // window.bc.getMainAccount()
        // .then(mainAccount => {
        //     window.bc.contract().getProfessorIndex({ from: mainAccount }, (error, res) => {
        //         if (error) reject(error);
        //         console.debug(mainAccount);
        //         resolve(res);
        //     });
        // })
        // .catch(error => reject(error));
      });
    },

    setProf(id,name,address){
      // this.$store.commit('SET_PROF', id,name,"0x");
      // console.debug(this.$root.$data.SET_PROF);
      this.$store.isProf = true;
      this.$store.commit('setProf',{id,name,address});
    },

    /**
     * Show the conntection error message on top of the main content.
     *
     * @param {object} error|null
     * @return {void}
     */
    showConnectionErrorMessage(error = null) {
      this.bcConnectionError = true;

      if (error) console.log(error);

      if (error && error.message) {
        this.errorConnectionMessage = error.message;
      }
    },

    /**
     * Check if the connection with the blockchain is established and if the smart
     * contract ABI + address are correctly initialized.
     *
     * @return {boolean}
     */
    blockchainIsConnected() {
      this.bcConnected = ((window.bc != undefined) && window.bc.isConnected());

      return this.bcConnected;
    },

    /**
     * Transform the parameter from bytes to string.
     *
     * @param {string} bytesStr
     * @return {string}
     */
    toAscii(bytesStr) {
      return window.bc.toAscii(bytesStr);
    },

    /**
     * Transform a timestamp number to date.
     *
     * @param {numeric} bytesStr
     * @return {string}
     */
    toDate(timestamp) {
      return new Date(timestamp * 1000).toISOString();
    }
  }
}
