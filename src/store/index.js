import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import tokens from "./modules/tokens";
import msg from "./modules/msg";

Vue.use(Vuex);

const debug = false;

export default new Vuex.Store({
  modules: {
    tokens,
    msg
  },
  strict: true, // debug,
  plugins: debug ? [createLogger()] : []
});
