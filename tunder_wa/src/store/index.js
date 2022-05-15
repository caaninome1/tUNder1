import Vuex from "vuex";

 
export default new Vuex.Store({
    state: {
        profileId: 15,
        imageId: "17",
    },
    getters: {},
    mutations: {
        setProfileId (state, payload) {
            state.profileId = payload
        },
        setImageId (state, payload) {
            state.imageId = payload
        }
    },
    actions: {}
});