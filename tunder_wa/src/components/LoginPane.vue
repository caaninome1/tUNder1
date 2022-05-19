<template>
  <div class="login">
    <center>
      <h1 class="title">Login in the page</h1>
      <form v-on:submit.prevent="processLogin" action class="form">
          <div class="form-group col-10 col-md-4">
            <input
              class="form-control"
              placeholder="Usuario"
              type="email"
              v-model="user.username"
              required
            />
          </div>
          <div class="form-group col-10 col-md-4">
            <input
              class="form-control"
              type="password"
              v-model="user.password"
              placeholder="Contraseña"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Ingresar</button>

      </form>
    </center>
  </div>
</template>
<script>
  import gql from "graphql-tag";
  export default {
    name: "LoginPane",
  
    data: function() {
      return {
        user: {
          username: "",
          password: "",
        },
      };
    },
    methods: {
      renewtoken( ){
        this.$apollo.mutate({
          mutation: gql`
              mutation ($token: String!) {
                  refreshToken(token: $token) {
                      token,
                  }
              }
          `,
          
          variables: {
              token : localStorage.token 
          },
        })
        .then(({data}) => {
          console.log(data.refreshToken.token);
          setTimeout(this.renewtoken, 3600000);

        })
        .catch((error) => {
          alert("Ocurrio un error en la autenticacion. Por favor vuelva a intentar");
          console.log ( error )
        });
       
      },
      processLogin: function() {
        this.$apollo.mutate({
          mutation: gql`
              mutation ($user: NewUser!) {
                  login(user: $user) {
                      token,
                      userId
                  }
              }
          `,
          
          variables: {
              user: {
                      email:  this.user.username,
                      password: this.user.password, // profileId as string
              },
          },
        })
        .then(({data}) => {
          try{
            localStorage.token = data.login.token ;
            localStorage.userId = data.login.userId ;
            setTimeout(this.renewtoken, 3600000);
          }catch{
            alert("Usuario o contraseña incorrecto");

          }
         
        })
        .catch((error) => {
          alert("Usuario o contraseña incorrecto");
          console.log(error);
        });
       
       
      }
    },
   
  }
</script>

