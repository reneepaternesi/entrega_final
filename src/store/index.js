import Vue from "vue";
import Vuex from 'vuex';
import users from './modules/users'
import cart from './modules/cart'
import apiServices from "../services/services";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,

    state: {
        products: [],
    },
    getters: {
        products: state => state.products,
        productById: state => id => {
            return state.products.find(product => product.id == id)
        }
      },
    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products
        },
        UPDATE_PRODUCT(state, product) {
            const productUpdated = state.products.find((p) => p.id === product.id);
            const index = state.products.indexOf(productUpdated);
            state.products[index] = product
        },
        ADD_PRODUCT(state, newProduct) {
            state.products.push(newProduct)
        },
        DELETE_PRODUCT(state, productId) {
            state.products.splice(
                state.products.findIndex(function (p) {
                  return p.id === productId;
                }),
                1
            );
        },
    },
    actions: {
        getProducts: ({ commit }) => {
            apiServices.getProducts()
              .then(products => commit('SET_PRODUCTS', products))
              .catch(err => console.log(err))
        },
        updateProduct: ({ commit }, product) => {
            apiServices.updateProduct(product)
                .then(productUpdated => commit('UPDATE_PRODUCT', productUpdated))
                .catch(err => console.log(err))
        },
        addProduct: ({ commit }, product) => {
            apiServices.saveProduct(product)
                .then(newProduct => commit('ADD_PRODUCT', newProduct))
                .catch(err => console.log(err))
        },
        deleteProduct: ({ commit }, productId) => {
            apiServices.deleteProduct(productId)
                .then(commit('DELETE_PRODUCT', productId))
                .catch(err => console.log(err))
        },
    },
    modules: {
        users,
        cart
    }
})