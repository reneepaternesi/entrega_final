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
      <!-- TODO: Yo lo que haría es poner el botón de Login a la derecha y el de cerrar a la izquierda. Es una cosita
      de UX para tener en cuenta nada más. -->
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
    //TODO: Esta parte sería mejor hacerla de otra manera ya que ahora cada vez que tipeas una letra se llama al método getUsers, el cual
    // hace una petición a la api. Podes probar escribiendo rápido algo como "asdasdasdasdadasdadaadsasdasds" y debería salirte un error
    // en la consola por ese consumo de peticiones.
    // Capaz te quedó sin querer, porque de paso este método getUsers no tiene mucho sentido llamarlo desde acá, sino más bien cuando se hace
    // el submit.
    // Así que lo comento para mostrarte más abajo cómo podríamos hacer para que funcione mejor...
    // await this.getUsers();
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
  async mounted(){
    //TODO: Acá llamamos al servicio que setea los usuarios, así luego en el submit los tendríamos disponibles para hacer los chequeos del login.
    await this.getUsers();
  },
  methods: {
    ...mapActions("users", ["getUsers", "setUser"]),
    logIn() {
      const user = this.users.find(
        (user) =>
          user.user === this.form.user && user.password === this.form.password
      );
      //TODO: acá te dejo una manera que puede resultar más práctica de leer para la mayoría de los devs.
      //(Usando el return y quitando el else)
      if (!user) {
        this.$bvToast.toast("Info", {
          title: "No existe cuenta para ese usuario y contraseña. Crea una!",
          variant: "info",
          solid: true,
        });
        return;
      } 
      
      //TODO: Acá deberíamos también guardar el user en el localstorage para luego poder recuperarlo si el cliente hace un f5 sobre la page.
      // Ahora, si hacemos un f5 perdemos la info del store de vuex y en consecuencia perdemos la info del usuario logueado.
      // En la corrección te lo dejo armado, vas a poder ver que en la mutation "SET_USER", además de setear la variable del state, también guardo
      // el user en el localstorage, para luego poder recuperarlo en el hook created() del App.vue, y luego setearlo en el store de vuex.
      // También agregué una línea en la mutation LOG_OUT, para limpiar el user también en el localstorage.
      this.setUser(user);
      this.$bvToast.toast("Success", {
        title: "Has ingresado a tu cuenta correctamente",
        variant: "success",
        solid: true,
      });

      if (this.$route.name !== "home") {
        this.$router.push("/");
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
