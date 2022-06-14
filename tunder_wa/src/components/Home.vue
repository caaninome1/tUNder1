<template>
  <div class="row">
    <div class="col col-5 col-md-4">
      <button class="btn btn-primary" v-on:click="logout()">Logout</button>
    </div>
    <div class="col col-5 col-md-4">
      <button class="btn btn-primary" v-on:click="goComic()">Comics</button>
    </div>
  </div>
  <div id="MatchesPaneDiv">
    <MatchesPane />
  </div>
  <br />
  <div id="InteractionPaneDiv">
    <InteractionPane />
  </div>
</template>

<script>
import MatchesPane from "./MatchesPane.vue";
import InteractionPane from "./InteractionPane.vue";

export default {
  name: "Home",
  components: {
    MatchesPane,
    InteractionPane,
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.replace("/login");
    },
    goComic() {
      this.$router.replace("/comics");
    },
  },
};
</script>

<style scoped></style>
