import apiServices from "../../services/services";

export default {
    namespaced: true,

    state: {
        users: [],
        user: {}
    },
  
    getters: {
        users: state => state.users,
        user: state => state.user,
        getUserByName(state, userName) {
            return  state.users.find((user) => user.user === userName);
        },
    },
  
    mutations: {
        SET_USERS(state, users) {
            state.users = users
        },
        SET_USER(state, user) {
            state.user = user
        },
        ADD_USER(state, newUser) {
            state.user = newUser
        },
        LOG_OUT(state) {
            state.user = {};
        }
    },
  
    actions: {
        addUser: ({commit }, newUser) => {
            apiServices.saveUser(newUser)
                .then(commit('LOG_OUT') )
                .catch(err => console.log(err))
        },
        getUsers: ({ commit }) => {
            apiServices.getUsers()
              .then(users => commit('SET_USERS', users))
              .catch(err => console.log(err))
        },
        setUser: ({ commit }, user) => {
            commit('SET_USER', user)
        },
        logOut: ({ commit }) => {
            commit('LOG_OUT')
        }
    }
  }