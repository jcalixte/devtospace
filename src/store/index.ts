import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

interface RootState {
  config: {
    hideMessage: boolean
  }
}

const vuexLocal = new VuexPersistence<RootState>()

const HIDE_MESSAGE = 'HIDE_MESSAGE'

export default new Vuex.Store<RootState>({
  state: {
    config: {
      hideMessage: false
    }
  },
  getters: {
    config: ({ config }) => config,
    hideMessage: ({ config }) => config.hideMessage
  },
  mutations: {
    [HIDE_MESSAGE](state) {
      state.config.hideMessage = true
    }
  },
  actions: {
    actionToHideMessage({ commit }) {
      commit(HIDE_MESSAGE)
    }
  },
  plugins: [vuexLocal.plugin]
})
