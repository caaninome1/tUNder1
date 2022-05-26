<template>
  <div class="card">
    <img
      :src="`data:${getImage.mime_type};base64,${getImage.b64}`"
      class="card-img-top"
    /><span v-if="$apollo.queries.getImage.loading">Loading...</span>
    <div class="card-body text-center">
      <button
        class="circle-button red-orange me-3"
        v-on:click="interact(false)"
      >
        <i class="fa-solid fa-xmark fa-xl"></i>
      </button>
      <button class="circle-button sky-blue ms-3" v-on:click="interact(true)">
        <i class="fa-solid fa-heart fa-xl"></i>
      </button>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "SuggestionImage",
  props: ["idImagen", "idUsuario"],
  apollo: {
    getImage: {
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
      variables() {
        return {
          getImageId: this.idImagen,
        };
      },
      result({ data }) {
        this.$store.commit("setImageId", data.getImage.id);
      },
    },
  },
  data() {
    return {
      getImage: {},
    };
  },
  methods: {
    interact(interactionValue) {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation ($like: LikeInput!) {
              createLike(like: $like) {
                id
                user_id
                liked_user_id
                like_status
              }
            }
          `,
          variables: {
            like: {
              user_id: this.$store.state.userId.toString(),
              liked_user_id: this.idUsuario.toString(), // profileId as string
              like_status: interactionValue,
            },
          },
        })
        .then((data) => {
          console.log(data);
          if (data.data.createLike.id != null) {
            alert("Interaccion correcta");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
img {
  height: 100%;
  object-fit: cover;
}

.circle-button {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: white;
}

i {
  color: white;
}

.red-orange {
  background-color: #fc6659;
}

.red-orange:hover {
  background-color: #ea1524;
}

.sky-blue {
  background-color: #18d3fa;
}

.sky-blue:hover {
  background-color: #22abef;
}
</style>
