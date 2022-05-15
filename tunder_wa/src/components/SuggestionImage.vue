<template>
    <div class="card">
        <img :src="`data:${getImage.mime_type};base64,${getImage.b64}`" class="card-img-top" /><span v-if="$apollo.queries.getImage.loading">Loading...</span>
        <div class="card-body text-center">
            <button class="circle-button red-orange me-3"><i class="fa-solid fa-xmark fa-xl"></i></button> <!--call mutation and dequeue-->
            <button class="circle-button sky-blue ms-3"><i class="fa-solid fa-heart fa-xl"></i></button>
        </div>
    </div>
</template>

<script>

import gql from "graphql-tag";

export default {
    name: 'SuggestionImage',
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
                    getImageId: this.$store.state.imageId,
                }
            },
            result ({ data }) {
                this.$store.commit('setImageId', data.getImage.id)
            },
        }
    },
    data() {
        return {
            getImage: {},
        };
    }
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