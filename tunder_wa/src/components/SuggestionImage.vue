<template>
    <div class="card text-start">
        <img src="../assets/profile-pic.jpg" class="card-img-top" />
        <div class="card-body">
            <button class="circle-button red-orange"><i class="fa-solid fa-xmark fa-xl"></i></button>
            <button class="circle-button sky-blue"><i class="fa-solid fa-heart fa-xl"></i></button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'SuggestionImage'
}

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