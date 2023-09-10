import Vuex from 'vuex';

export default new Vuex.Store({
    state: {
        manufacturers: [],
        category: null,
        query: {},
        cart: [],
    },
    mutations: {
        setManufacturers(state, manufacturers) {
            state.manufacturers = manufacturers;
        },
        setPrice(state, category) {
            state.category = category;
        },
        setQuery(state, query) {
            state.query = query
        },
        addToCart(state, product) {
            state.cart.push(product);
        },
        removeFromCart(state, productId) {
            state.cart = state.cart.filter(item => item.id !== productId);
        },
        emptyCart(state) {
            state.cart = []
        }
    },
    // You can add actions to update filters and commit mutations here
    actions: {
        updateQuery({ commit }, query) {
            // You can perform asynchronous operations here if needed
            // For now, directly commit the mutation
            commit('setQuery', query);
        },
        addProductToCart({ commit, state }, product) {
            if (!state.cart.find(item => item.id === product.id)) {
                commit('addToCart', product);
            }
        },
        removeProductFromCart({ commit }, productId) {
            commit('removeFromCart', productId);
        },
        emptyProductsFromCart({commit}) {
            commit('emptyCart')
        }
    },
    getters: {
        cartItems: state => state.cart,
    },
});