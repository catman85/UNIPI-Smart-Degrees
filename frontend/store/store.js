import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    isProf: false,
    Prof: {
      id: Number,
      name: String,
      address : String
    }
  },
  mutations: {
    // ATTENTION only expects 2 arguments
    setProf(state, {id, name, address}) {
      console.debug("Identified... "+ id,name,address);
      state.Prof.id = id;
      state.Prof.name = name;
      state.Prof.address = address;
    }
  },
  getters: {
    isProf: state => state.isProf, // anonymous function
    prof(state){
      return state.Prof;
    }
  }
})
