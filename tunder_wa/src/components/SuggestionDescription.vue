<template>
    <div class="card text-start">
        <div class="card-body">
            <h4 class="card-title">{{getProfile.name.split(' ')[0]}}, {{getProfile.age}}</h4>
            <p class="card-text">{{getProfile.description}}</p>
            <p class="card-text"><span class="fw-bold">Género: </span>{{getProfile.gender}}</p>
            <p class="card-text"><span class="fw-bold">City: </span>{{getProfile.city}}</p>
            <p class="card-text"><span class="fw-bold">Campus: </span>{{getProfile.campus}}</p>
            <p class="card-text"><span class="fw-bold">Programa: </span>{{getProfile.academicProgram}}</p>
            <ul class="list-group list-group-flush">
                <li v-for="item in getProfile.characteristics" :key="item.type" class="list-group-item"><span class="fw-bold">{{item.type}}: </span>{{item.content}}</li>
            </ul> 
        </div>
    </div>
</template>

<script>

import gql from "graphql-tag";

export default {
    name: 'SuggestionDescription',   
    apollo: {
        getProfile: {
            query: gql`
                query ($getProfileId: Int!) {
                    getProfile(id: $getProfileId) {
                        identification
                        name
                        age
                        occupation
                        gender
                        city
                        phone
                        campus
                        faculty
                        academicProgram
                        genderInterest
                        profileImageId
                        characteristic {
                            type
                            content
                        }
                    }
                }
            `,
            variables() {
                return {
                    getProfileId: this.$store.state.profileId,
                }
            },
            result ({ data }) {
                this.$store.commit('setImageId', data.getProfileId.profileImageId)
            },
        },
    },
    data() {
        return {
            getProfile: {
                /*
                name: "Laura",
                age: 20,
                description: "Busco relación estable. Me gustan las series coreanas. \uD83D\uDE00.",
                gender: "Mujer",
                city: "Chía",
                campus: "Bogotá",
                academicProgram: "Trabajo Social",
                characteristics: [
                    { type: "Hobbies", content: "Patinar" },
                    { type: "Hijos", content: "No" },
                    { type: "Bebe", content: "Ocasionalmente" }
                ]
                */
            },
        };
    }
    
};

</script>

<style scoped>

</style>