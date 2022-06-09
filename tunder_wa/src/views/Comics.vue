<template>
    <div>
        <h1>
            Comics
        </h1>
    </div>
    <form class="" @submit.prevent="getNow(comic_id)">
        <input type="text" v-model="comic_id" placeholder="Comic ID">
        <button>
            Enviar
        </button>
        <br>
        <p>Nombre del comic: {{ comic_name }}
        <br>
           Nombre del autor: {{ comic_author }}
        <!-- Nombre del autor {{ comic_author }} -->
        </p>
    </form>
    
</template>

<script>


    import axios from 'axios'
    export default{
        name: 'Comics',
        data(){
            return {
                comic_name: '',
                comic_id: '',
                comic_author: '',            
            }
        },
        methods: {
            getNow(id){
                
                axios.get('https://interface-y6bebo7xta-uc.a.run.app/api/Comics/GetComic?id=' + id)
                .then((response) => {
                    console.log(response.data.comic)
                    this.comic_name = response.data.comic.nombre
                    this.comic_author = response.data.comic.autor
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style>

</style>