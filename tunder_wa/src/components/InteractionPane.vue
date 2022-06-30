<template>
  <div class="container">
      <h4 class="card-title mb-4">Sugerencias</h4>
    <div class="card my-3" v-for="profile in profiles" :key="profile.identification">
      <div class="row">
        <div class="col">
          <SuggestionImage :idImagen="profile.profileImageId" :idUsuario="profile.identification" />
        </div>
        <div class="col">
          <SuggestionDescription :getProfile="profile" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SuggestionImage from "./SuggestionImage.vue";
import SuggestionDescription from "./SuggestionDescription.vue";

import gql from "graphql-tag";

const lookForSuggestions = {};
let vm;

export default {
  name: "InteractionPane",
  components: {
    SuggestionImage,
    SuggestionDescription,
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
      profiles: [],
    };
  },
  methods: {
    getSuggestions() {
      console.log("getting suggestions");
      let apollo = this.$apollo;
      apollo
        .query({
          query: gql`
            query GetProfile($getProfileId: Int!) {
              getProfile(id: $getProfileId) {
                name
                profileImageId
                gender
                genderInterest
                city
              }
            }
          `,
          variables: {
            getProfileId: +this.$store.state.userId,
          },
        })
        .then((profile) => {
          console.log("Perfil sug:", profile);
          apollo
            .query({
              query: gql`
                query GetProfileGenderCity(
                  $profileGendercity: ProfileGenderCityInput!
                ) {
                  getProfileGenderCity(profileGendercity: $profileGendercity) {
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
                    description
                    characteristic {
                      type
                      content
                    }
                  }
                }
              `,
              variables: {
                profileGendercity: {
                  gender: profile.data.getProfile.genderInterest,
                  city: profile.data.getProfile.city,
                },
              },
            })
            .then((data) => {
              data.data.getProfileGenderCity.forEach((profile) =>
                //this.$store.commit("sqEnqueue", profile.identification)
                vm.profiles.push(profile)
              );
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created: function () {
    vm = this;
    this.getSuggestions();

    setInterval(
      function () {
        this.getSuggestions();
      }.bind(this),
      60000
    );
  },
};
</script>

<style scoped>
</style>