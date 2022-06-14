import apiServices from "../../services/services";

export default {
    namespaced: true,
    state: {
        orders: [],
        cart: [],
    },

    getters: {
        orders: state => state.orders,
        cart: state => state.cart,
        getItemsAdded(state) {
            var totalItems = Array.from(state.cart).reduce(function (res, item) {
                return res + item.quantity;
            }, 0);
            return totalItems;
        },
    },

    mutations: {
        SET_ORDERS(state, orders) {
            state.orders = orders
        },
        SET_CART(state, cart) {
            state.cart = cart
        },
        ADD_ORDER(state, newOrder) {
            state.orders.push(newOrder)
        },
        REMOVE_FROM_CART(state, productId) {
            const productInCart = state.cart.find(
                (product) => product.id === productId
            );
            if (productInCart.quantity > 1) {
                productInCart.quantity--;
              } else {
                state.cart = state.cart.filter((p) => {
                  return p.id != productId;
                });
              }
        },
        ADD_CART_QTY(state, productId) {
            const productInCart = state.cart.find(
                (product) => product.id === productId
            );
            productInCart.quantity++;
        },
        ADD_TO_CART(state, product) {
            state.cart.push(product)
        },
    },

    actions: {
        getOrders: ({ commit }, userId) => {
            apiServices.getOrders(userId)
              .then(orders => commit('SET_ORDERS', orders))
              .catch(err => console.log(err))
        },
        addOrder: ({ commit }, order) => {
            apiServices.saveOrder(order)
                .then(newOrder => commit('ADD_ORDER', newOrder))
                .catch(err => console.log(err))
        },
        setCart: ({commit}, cart) => {
            commit('SET_CART', cart)
        },
        removeFromCart: ({ commit }, productId) => {
            commit('REMOVE_FROM_CART', productId)
        },
        addCartQty: ({ commit }, productId) => {
            commit('ADD_CART_QTY', productId)
        },
        addToCart: ({ commit }, product) => {
            commit('ADD_TO_CART', product)
        },
    }
}