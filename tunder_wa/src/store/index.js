
import Vuex from "vuex";

 
export default new Vuex.Store({
    state: {
        userId: "13", // current application user id, set from login
        profileId: 15,
        imageId: "17",
        sq: [], // suggestions queue
    },
    getters: {},
    mutations: {
        setUserId (state, payload) {
            state.userId = payload
        },
        setProfileId (state, payload) {
            state.profileId = payload
        },
        setImageId (state, payload) {
            state.imageId = payload
        },
        sqEnqueue (state, payload) {
            state.sq.push(payload)
        },
        sqDequeue (state) { // call when like or dislike mutation         
            state.profileId = state.sq.shift() // shift is dequeue
        }
    },
    actions: {}
});
