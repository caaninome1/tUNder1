<template>
  <div id="MatchesPaneDiv" >
    <MatchesPane />
  </div>
  <br>
  <div id="InteractionPaneDiv">
    <InteractionPane />
  </div>
</template>

<script>
import MatchesPane from './MatchesPane.vue'
import InteractionPane from './InteractionPane.vue'

export default {
  name: 'Home',
  components: {
    MatchesPane,
    InteractionPane
  }
}
</script>

<style scoped>



</style>