import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
    token: null,
    userName: '',
    userEmail:''
}

const getters = {
    getUserName:state => state.userName,

    getUserEmail:state => state.userEmail
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})