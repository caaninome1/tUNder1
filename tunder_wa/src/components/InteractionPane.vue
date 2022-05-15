<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <SuggestionImage />
            </div>
            <div class="col">
                <SuggestionDescription />
            </div>
        </div>
    </div>
</template>

<script>

import SuggestionImage from './SuggestionImage.vue'
import SuggestionDescription from './SuggestionDescription.vue'

import gql from "graphql-tag";

export default {
    name: 'InteractionPane',
    components: {
        SuggestionImage,
        SuggestionDescription
    },
    apollo: {
        lookForSuggestions: { // needs to be called when queue is empty: how?
            query: gql`
                query ($idUser: String) {
                    lookForSuggestions(idUser: $idUser) {
                        user
                    }
                }
            `,
            variables() {
                return {
                    idUser: this.$store.state.userId,
                }
            },
            result ({ data }) {
                data.lookForSuggestions.forEach(
                    userId => this.$store.commit('sqEnqueue', userId)
                )
            },
        }
    },
    data() {
        return {
            lookForSuggestions: {},
        };
    }
}

</script>

<style scoped>

</style>