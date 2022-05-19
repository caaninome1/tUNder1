<template>
  <section class="signup-view">
    <div class="form-header">
      <h1>Bienvenidos a tUNder</h1>
    </div>
    <form class="ui form" @submit.prevent>
      <NameField v-model="user.name" />
      <EmailField v-model="user.email" />
     <!-- <PhoneField v-model="user.phone" /> -->
      <UploadPhoto/>
      <PasswordField v-model="user.password" />
      <button
        class="ui button green fluid big"
        @click="signUpButtonPressed"
        :disabled="isSignupButtonDisabled"
      >
        Registrarse
      </button>
    </form>
    <div class="form-footer">
        <p>¿Ya tiene una cuenta?<router-link to="/setup">login</router-link> </p>
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

export default {
  components: {
    NameField,
    EmailField,
    UploadPhoto,    
    PasswordField,
  },
  setup() {
    let user = reactive({
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
</style>