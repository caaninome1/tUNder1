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
    /*
    apollo: {
        lookForSuggestions: {
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
    */
    data() {
        return {
            lookForSuggestions: {},
        };
    },
    methods: {
        getSuggestions() {
            console.log('getting suggestions')
            if (this.$store.getters.sqLength == 0) {
                this.$apollo
                    .query({
                        query: gql`
                            query ($idUser: String) {
                                lookForSuggestions(idUser: $idUser) {
                                    user
                                }
                            }
                        `,
                        variables: {
                            idUser: this.$store.state.userId,
                        },
                    })
                    .then((data) => {
                        data.lookForSuggestions.forEach(
                            userId => this.$store.commit('sqEnqueue', userId)
                        )
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    },
    created: function () {
        this.getSuggestions();

        setInterval(function () {
            this.getSuggestions();
        }.bind(this), 1000); 
    }
}

</script>

<style scoped>

</style>