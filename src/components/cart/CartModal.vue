<template>
  <b-modal
    id="cart"
    title="Tu Carrito"
    no-close-on-esc
    no-close-on-backdrop
    hide-header-close
    ref="cart-modal"
  >
    <TableComponent />
    <br />
    <br />
    <div v-show="isEmpty(user)">
      Accede a tu cuenta para finalizar tu compra
    </div>
    <template #modal-footer="{ cancel }">
      <b-button
        size="sm"
        variant="success"
        @click="createOrder()"
        :disabled="isEmpty(user) || cart.length === 0"
      >
        Confirmar Compra
      </b-button>
      <b-button size="sm" variant="secondary" @click="cancel()">
        Cerrar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import TableComponent from "./TableComponent.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CartModal",
  components: { TableComponent },
  methods: {
    ...mapActions("cart", ["addOrder", "setCart"]),

    async createOrder() {
      const order = {
        products: this.cart,
        userId: this.user.id,
        date: new Date(),
        total: this.cart.reduce(
          (accumulator, current) =>
            accumulator + current.price * current.quantity,
          0
        ),
      };
      await this.addOrder(order)
        .then(() => {
          this.$bvToast.toast("Success", {
            title:
              "Tu orden ha sido creada correctamente. Ya estamos trabajando en ella!",
            variant: "success",
            solid: true,
          });
          this.setCart([]);
          localStorage.removeItem("cart");
        })
        .catch((err) => {
          console.log(err);
          this.$bvToast.toast("Error", {
            title: `No pudimos crear tu orden, vuelve a intentarlo`,
            variant: "danger",
            solid: true,
            noAutoHide: true,
          });
        });
      this.$refs["cart-modal"].hide();
    },
  },
  computed: {
    ...mapGetters("cart", ["cart"]),
    ...mapGetters("users", ["user"]),
  },
};
</script>

<style scoped lang="less"></style>
