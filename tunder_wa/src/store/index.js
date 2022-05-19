
import Vuex from "vuex";

 
export default new Vuex.Store({
    state: {
        userId: "3", // current application user id, set from login
        profileId: 1,
        imageId: "1",
        sq: [4], // suggestions queue
    },
    getters: {
        _profileId: state => {
            return state.profileId.toString()
        },
        sqLength: state => {
            return state.sq.length
        }
    },
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
