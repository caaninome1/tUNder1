<template>
  <ProfileSuggestion />
</template>

<script>


import ProfileSuggestion from './components/ProfileSuggestion.vue'

export default {
  name: 'App',
  components: {
    ProfileSuggestion
  }
}

</script>

<style>

@import url(https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css);

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
