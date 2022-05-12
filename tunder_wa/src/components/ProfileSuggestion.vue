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

export default {
    name: 'ProfileSuggestion',
    components: {
        SuggestionImage,
        SuggestionDescription
    }
}

</script>

<style scoped>

</style>