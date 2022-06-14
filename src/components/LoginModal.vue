<template>
  <b-modal
    id="login"
    no-close-on-esc
    no-close-on-backdrop
    hide-header-close
    ref="login-modal"
    no-stacking
  >
    <template #modal-title> Login </template>
    <b-form @submit.stop.prevent="onSubmit" autocomplete="off">
      <b-row>
        <b-col>
          <b-form-group
            id="input-user-group"
            label="Usuario:"
            label-for="input-user-login"
          >
            <b-form-input
              id="input-user-login"
              v-model="form.user"
              placeholder="Usuario"
              required
              v-bind:class="{
                'is-invalid':
                  !validString(form.user) && formValidationState.userBlured,
                'is-valid': validString(form.user),
              }"
              v-on:blur="formValidationState.userBlured = true"
            ></b-form-input>
            <b-form-invalid-feedback>
              El usuario debe contener al menos 2 caracteres
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group
            id="input-last-pass-group"
            label="Contraseña:"
            label-for="input-pass-name-login"
          >
            <b-form-input
              id="input-pass-name-login"
              v-model="form.password"
              placeholder="Contraseña"
              required
              type="password"
              v-bind:class="{
                'is-invalid':
                  !validString(form.password) && formValidationState.passBlured,
                'is-valid': validString(form.password),
              }"
              v-on:blur="formValidationState.passBlured = true"
            ></b-form-input>
            <b-form-invalid-feedback>
              El apellido debe contener al menos 2 caracteres
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-center">
          <b-link class="link" v-b-modal.signUp>Crear Cuenta</b-link>
        </b-col>
      </b-row>
    </b-form>
    <template #modal-footer="{ cancel }">
      <b-button
        size="sm"
        variant="primary"
        :disabled="!validateForm()"
        @click.prevent="onSubmit()"
      >
        Login
      </b-button>
      <b-button size="sm" variant="secondary" @click="cancel()">
        Cerrar
      </b-button>
    </template>
  </b-modal>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "LoginModal",
  async updated() {
    await this.getUsers();
  },
  data() {
    return {
      form: {
        user: "",
        password: "",
      },
      formValidationState: {
        userBlured: false,
        passBlured: false,
      },
    };
  },
  methods: {
    ...mapActions("users", ["getUsers", "setUser"]),
    logIn() {
      const user = this.users.find(
        (user) =>
          user.user === this.form.user && user.password === this.form.password
      );
      if (!user) {
        this.$bvToast.toast("Info", {
          title: "No existe cuenta para ese usuario y contraseña. Crea una!",
          variant: "info",
          solid: true,
        });
      } else {
        this.setUser(user);
        this.$bvToast.toast("Success", {
          title: "Has ingresado a tu cuenta correctamente",
          variant: "success",
          solid: true,
        });

        if (this.$route.name !== "home") {
          this.$router.push("/");
        }
      }
    },
    async onSubmit() {
      this.logIn();
      this.resetForm();
      this.$refs["login-modal"].hide();
    },
    resetForm() {
      this.form.user = "";
      this.formValidationState.userBlured = false;
      this.form.password = "";
      this.formValidationState.passBlured = false;
    },
    validString(text) {
      return text.length >= 2;
    },
    validateForm() {
      return (
        this.validString(this.form.user) && this.validString(this.form.password)
      );
    },
  },
  computed: {
    ...mapGetters("users", ["users"]),
  },
};
</script>
<style scoped lang="less">
.row {
  margin-bottom: 10px;
}

.link {
  text-decoration: none;
  margin-top: 30px;
}
</style>
