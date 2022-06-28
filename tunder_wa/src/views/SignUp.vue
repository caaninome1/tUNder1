<template>
  <section class="signup-view">
    <div class="form-header">
      <h1>Bienvenidos a tUNder</h1>
    </div>
    <form class="ui form" @submit.prevent>
      <NameField v-model="user.name" />
      <EmailField v-model="user.email" />
      <div class="row">
        <div class="col-6">
          <input
            id="ImageInput"
            type="file"
            @change="readFile"
            accept="image/*"
            ref="file"
          />
        </div>
        <div class="col-2">
          <img src="" id="SignUpImage" />
        </div>
      </div>
      <PasswordField v-model="user.password" />
      <button
        class="ui button green fluid big"
        @click="register"
        :disabled="isSignupButtonDisabled"
      >
        Registrarse
      </button>
    </form>
    <div class="form-footer">
      <p>
        ¿Ya tienes cuenta? <router-link to="/login">Ingresa aquí</router-link>
      </p>
    </div>
  </section>
</template>

<script>
import { reactive } from "vue";

import NameField from "@/components/NameField";
import EmailField from "@/components/EmailField";
import PasswordField from "@/components/PasswordField";
import UploadPhoto from "@/components/UploadPhoto";

import useFormValidation from "@/modules/useFormValidation";
import useSubmitButtonState from "@/modules/useSubmitButtonState";

const image = {
  user_id: "13",
  mime_type: "",
  extension: "",
  b64: "",
};

import gql from "graphql-tag";

let user = {};

export default {
  components: {
    NameField,
    EmailField,
    UploadPhoto,
    PasswordField,
  },
  setup() {
    user = reactive({
      name: "",
      email: "",
      password: "",
    });

    const { errors } = useFormValidation();
    const { isSignupButtonDisabled } = useSubmitButtonState(user, errors);

    const signUpButtonPressed = () => {
      console.log(user);
    };
    return { user, signUpButtonPressed, isSignupButtonDisabled };
  },
  data() {
    return {
      image,
    };
  },
  methods: {
    register() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation ($newUser: NewUser!) {
              saveUser(newUser: $newUser) {
                id
                name
                email
                password
              }
            }
          `,
          variables: {
            newUser: user,
          },
        })
        .then((_user) => {
          console.log(_user);
          image.user_id = _user.data.saveUser.id.toString();
          console.log("usuario registrado");

          this.$apollo
            .mutate({
              mutation: gql`
                mutation PostImage($newImage: NewImage!) {
                  postImage(newImage: $newImage)
                }
              `,
              variables: {
                newImage: image,
              },
            })
            .then((imageResult) => {
              let g = Math.random() > 0.5;
              console.log(imageResult);
              console.log("imagen subida");
              this.$apollo
                .mutate({
                  mutation: gql`
                    mutation postProfile($newProfile: ProfileInput!) {
                      postProfile(newProfile: $newProfile) {
                        identification
                        name
                        gender
                        city
                        phone
                      }
                    }
                  `,
                  variables: {
                    newProfile: {
                      identification: _user.data.saveUser.id,
                      name: user.name,
                      age: 19,
                      occupation: "Estudiante",
                      gender: g ? "M" : "F",
                      city: "Bogota",
                      phone: "",
                      campus: "BOGOTA",
                      faculty: "NA",
                      academicProgram: "NA",
                      genderInterest: !g ? "M" : "F",
                      profileImageId: imageResult.data.postImage.toString(),
                      description: "NA",
                      characteristic: [],
                    },
                  },
                })
                .then((dataP) => {
                  if (dataP.data.postProfile.identification != null) {
                    alert("Usuario registrado exitosamente");
                    this.$router.push("login");
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    readFile() {
      const FR = new FileReader();

      FR.addEventListener("load", function (evt) {
        document.getElementById("SignUpImage").src = evt.target.result; // evt.target.result is the b64 string
        console.log(evt.target.result);
        image.b64 = evt.target.result.split(",")[1];
      });

      FR.readAsDataURL(this.$refs.file.files[0]);
      image.mime_type = this.$refs.file.files[0].type;
      image.extension = document
        .getElementById("ImageInput")
        .value.split(".")
        .pop();
    },
  },
};
</script>

<style scoped>
.signup-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form {
  width: 450px;
}

.form-header {
  color: rgb(106, 191, 220);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: white;
}
</style>
