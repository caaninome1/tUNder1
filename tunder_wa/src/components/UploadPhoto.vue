<template>
  <div class="field">
      <input type="file" @change="onFileSelected" accept="image/*">
  </div>
</template>

<script>


export default {
  name: 'UploadPhoto',
  methods: {
    onFileSelected(event) {
      console.log(event)
    }
  }
}
</script>