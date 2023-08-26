import Vuex from 'vuex';

export default new Vuex.Store({
    state: {
        manufacturers: [],
        category: null,
        query: {}
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
        }
    },
    // You can add actions to update filters and commit mutations here
    actions: {
        updateQuery({ commit }, query) {
            // You can perform asynchronous operations here if needed
            // For now, directly commit the mutation
            commit('setQuery', query);
        },
    }
});