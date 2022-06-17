import apiServices from "../../services/services";

export default {
    namespaced: true,

    state: {
        users: [],
        user: {},
        keyLocalStorageUser: "LoggedUserRS"
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
            state.user = user;
            localStorage.setItem(state.keyLocalStorageUser, JSON.stringify(user));
        },
        TRY_SET_USER_FROM_LOCALSTORAGE(state) {
            let user = localStorage.getItem(state.keyLocalStorageUser);
            if(user != null)
                state.user = JSON.parse(user);
        },
        ADD_USER(state, newUser) {
            state.user = newUser
        },
        LOG_OUT(state) {
            state.user = {};
            localStorage.removeItem(state.keyLocalStorageUser);
        }
    },
  
    actions: {
        addUser: ({commit }, newUser) => {
            apiServices.saveUser(newUser)
                .then(commit('LOG_OUT') )
                .catch(err => console.log(err))
        },
        getUsers: async ({ commit }) => {
            await apiServices.getUsers()
              .then(users => commit('SET_USERS', users))
              .catch(err => console.log(err))
        },
        setUser: ({ commit }, user) => {
            commit('SET_USER', user)
        },
        trySetUserFromLocalStorage: ({ commit }) => {
            commit('TRY_SET_USER_FROM_LOCALSTORAGE');
        },
        logOut: ({ commit }) => {
            commit('LOG_OUT')
        }
    }
  }