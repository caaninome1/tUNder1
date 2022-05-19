<template>
  <div class="card">
    <div class="card-body text-start">
      <h4 class="card-title mb-4">Matches</h4>
      <ul class="list-group list-group-flush">
        <li v-for="match in matches" :key="match.id" class="list-group-item">
          <div class="container">
            <div class="row">
              <div class="col-2">
                <img :src="`data:${match.mimeType};base64,${match.b64}`" />
              </div>
              <div class="col">
                <span>{{ match.firstName }}</span
                ><br />
                <small class="text-muted">Matched on {{ match.date }}</small>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

const matches = [];
let vm;

export default {
  name: "MatchesPane",
  data() {
    return {
      matches: [],
    };
  },

  
  methods: {
    getMatches() {
      console.log("getting matches");
      let apollo = this.$apollo;
      apollo
        .query({
          query: gql`
            query ($userId: String!) {
              getUserMatches(user_id: $userId) {
                id
                user_id
                liked_user_id
                date
                created_at
                updated_at
              }
            }
          `,
          variables: {
            userId: this.$store.state.userId.toString(),
          },
        })
        .then((data) => {
          console.log(data);
          data.data.getUserMatches.forEach(function (match) {
            let existingMatch = vm.matches.find((m) => m.id == match.id);
            if (existingMatch == null) {
              // fetch profile data only if it's a new match
              apollo
                .query({
                  query: gql`
                    query GetProfile($getProfileId: Int!) {
                      getProfile(id: $getProfileId) {
                        name
                        profileImageId
                      }
                    }
                  `,
                  variables: {
                    getProfileId: +match.liked_user_id,
                  },
                })
                .then((profile) => {
                    console.log(profile);
                  apollo
                    .query({
                      query: gql`
                        query ($getImageId: String!) {
                          getImage(id: $getImageId) {
                            id
                            b64
                            mime_type
                            extension
                          }
                        }
                      `,
                      variables: {
                        getImageId: profile.data.getProfile.profileImageId,
                      },
                    })
                    .then((image) => {
                        console.log(image);
                      vm.matches.push({
                        id: match.id,
                        firstName: profile.data.getProfile.name.split(" ")[0],
                        b64: image.data.getImage.b64,
                        mimeType: image.data.getImage.mime_type,
                        date: match.date,
                      });
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          });
          console.log(this.matches);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created: function () {
      vm = this;
    this.getMatches();

    setInterval(
      function () {
        this.getMatches();
      }.bind(this),
      60000
    );
  },
};
</script>

<style scoped>
img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: white;
}
</style>