import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loader: false,
    },
    getters: {},
    mutations: {
        setLoader(state, value) {
            state.loader = value;
        }
    },
    actions: {},
    modules: {},
});
