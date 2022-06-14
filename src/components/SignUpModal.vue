<template>
  <b-modal
    id="signUp"
    no-close-on-esc
    no-close-on-backdrop
    hide-header-close
    ref="signUp-modal"
    no-stacking
  >
    <b-form @submit.stop.prevent="onSubmit" autocomplete="off">
      <b-row>
        <b-col>
          <b-form-group
            id="input-name-group"
            label="Nombre:"
            label-for="input-name"
          >
            <b-form-input
              id="input-name"
              v-model="form.name"
              placeholder="Nombre"
              required
              v-bind:class="{
                'is-invalid':
                  !validString(form.name) && formValidationState.nameBlured,
                'is-valid': validString(form.name),
              }"
              v-on:blur="formValidationState.nameBlured = true"
            ></b-form-input>
            <b-form-invalid-feedback>
              El nombre debe contener al menos 2 caracteres
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-last-name-group"
            label="Apellido:"
            label-for="input-last-name"
          >
            <b-form-input
              id="input-last-name"
              v-model="form.lastName"
              placeholder="Apellido"
              required
              v-bind:class="{
                'is-invalid':
                  !validString(form.lastName) &&
                  formValidationState.lastNameBlured,
                'is-valid': validString(form.lastName),
              }"
              v-on:blur="formValidationState.lastNameBlured = true"
            ></b-form-input>
            <b-form-invalid-feedback>
              El apellido debe contener al menos 2 caracteres
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group
            id="input-email-group"
            label="Email:"
            label-for="input-email"
          >
            <b-form-input
              id="input-email"
              v-model="form.email"
              type="email"
              placeholder="Email"
              required
              v-bind:class="{
                'is-invalid': !validEmail() && formValidationState.emailBlured,
                'is-valid': validEmail(),
              }"
              v-on:blur="formValidationState.emailBlured = true"
            ></b-form-input>
            <b-form-invalid-feedback>
              El formato de mail no es correcto
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group
            id="input-address-group"
            label="Dirección:"
            label-for="input-address"
          >
            <b-form-input
              id="input-address"
              v-model="form.address"
              placeholder="Calle Nro, Piso, Departamento"
              required
              v-bind:class="{
                'is-invalid':
                  !validString(form.address) &&
                  formValidationState.addressBlured,
                'is-valid': validString(form.address),
              }"
              v-on:blur="formValidationState.addressBlured = true"
            ></b-form-input>
            <b-form-invalid-feedback>
              La dirección debe contener al menos 2 caracteres
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group
            id="input-province-group"
            label="Provincia:"
            label-for="input-province"
          >
            <b-form-select
              id="input-province"
              v-model="form.province"
              :options="provinces"
              class="w-100"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group
            id="input-user-group"
            label="Usuario:"
            label-for="input-user"
          >
            <b-form-input
              id="input-user"
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
        <b-col>
          <b-form-group
            id="input-last-pass-group"
            label="Contraseña:"
            label-for="input-pass-name"
          >
            <b-form-input
              id="input-pass-name"
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
              La contraseña debe contener al menos 2 caracteres
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-center">
          <b-link class="link" v-b-modal.login>Ya tengo cuenta, acceder</b-link>
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
        Crear Cuenta
      </b-button>
      <b-button size="sm" variant="secondary" @click="cancel()">
        Cerrar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SingUp",
  data() {
    return {
      form: {
        name: "",
        lastName: "",
        email: "",
        province: null,
        address: "",
        user: "",
        password: "",
        isAdmin: false,
      },
      provinces: [
        { text: "Seleccione una provincia", value: null },
        "Buenos Aires",
        "Ciudad Autónoma de Buenos Aires",
        "Catamarca",
        "Chaco",
        "Chubut",
        "Córdoba",
        "Corrientes",
        "Entre Ríos",
        "Formosa",
        "Jujuy",
        "La Pampa",
        "La Rioja",
        "Mendoza",
        "Misiones",
        "Neuquén",
        "Río Negro",
        "Salta",
        "San Juan",
        "San Luis",
        "Santa Cruz",
        "Santa Fe",
        "Santiago del Estero",
        "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
        "Tucumán",
      ],
      formValidationState: {
        nameBlured: false,
        lastNameBlured: false,
        emailBlured: false,
        birthdayBlured: false,
        addressBlured: false,
        userBlured: false,
        passBlured: false,
      },
    };
  },
  methods: {
    ...mapActions("users", ["addUser"]),
    async onSubmit() {
      await this.addUser(this.form)
        .then(
          this.$bvToast.toast("Success", {
            title: "Hemos creado tu cuenta correctamente",
            variant: "success",
            solid: true,
          })
        )
        .catch((err) => {
          console.log(err);
          this.$bvToast.toast("Error", {
            title: `No pudimos crear tu cuenta, vuelve a intentarlo`,
            variant: "danger",
            solid: true,
            noAutoHide: true,
          });
        });
      this.resetForm();
      this.$refs["signUp-modal"].hide();
    },
    resetForm() {
      this.form.name = "";
      this.formValidationState.nameBlured = false;
      this.form.lastName = "";
      this.formValidationState.lastNameBlured = false;
      this.form.email = "";
      this.formValidationState.emailBlured = false;
      this.form.birthday = "";
      this.formValidationState.birthdayBlured = false;
      this.form.province = null;
      this.form.address = "";
      this.formValidationState.addressBlured = false;
      this.form.user = "";
      this.formValidationState.userBlured = false;
      this.form.password = "";
      this.formValidationState.passBlured = false;
    },
    validString(text) {
      return text.length >= 2;
    },
    validEmail() {
      var re = /(.+)@(.+){2,}\.(.+){2,}/;
      return re.test(this.form.email.toLowerCase());
    },
    validateForm() {
      return (
        this.validString(this.form.name) &&
        this.validString(this.form.lastName) &&
        this.validEmail() &&
        this.validString(this.form.address) &&
        this.validString(this.form.user) &&
        this.validString(this.form.password)
      );
    },
  },
};
</script>

<style></style>
