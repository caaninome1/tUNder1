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
                                <span>{{match.firstName}}</span><br>
                                <small class="text-muted">Matched on {{match.date}}</small>
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

const matches = []

export default {
    name: 'MarchesPane',
    data() {
        return {
            matches,
        };
    },
    methods: {
        getMatches() {
            console.log('getting matches')
            if (this.$store.getters.sqLength == 0) {
                this.$apollo
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
                            userId: this.$store.state.userId,
                        },
                    })
                    .then((data) => {
                        data.getUserMatches.forEach(function (match) {
                            let existingMatch = matches.find(m => m.id == match.id)
                            if (existingMatch == null) { // fetch profile data only if it's a new match
                                this.$apollo
                                    .query({
                                        query: gql`
                                            query ($getProfileId: Int!) {
                                                getProfile(id: $getProfileId) {
                                                    name
                                                    profileImageId
                                                }
                                            }
                                        `,
                                        variables: {
                                            getProfileId: match.liked_user_id,
                                        },
                                    })
                                    .then((profile) => {
                                        this.$apollo
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
                                                    getImageId: profile.profileImageId,
                                                },
                                            })
                                            .then((image) => {
                                                matches.push({
                                                    id: match.id,
                                                    firstName: profile.name.split(' ')[0],
                                                    b64: image.b64,
                                                    mimeType: image.mime_type,
                                                    date: match.date
                                                })
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            });
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            }
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    },
    created: function () {
        this.getMatches();

        setInterval(function () {
            this.getMatches();
        }.bind(this), 10000); 
    }
}

</script>

<style scoped>

img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: white;
}

</style>