<template>
  <div>
    <div v-show="cart.length > 0">
      <table class="table b-table table-striped table-hover">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in cart" :key="i">
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price }}</td>
            <td>
              <button @click="removeFromCart(item.id)" class="trash">
                <img src="/assets/trash.png" width="25" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="total">TOTAL: {{ getTotal() }}</div>
    </div>
    <div v-show="cart.length === 0">Tu carrito esta vacío</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TableComponent",
  methods: {
    ...mapActions("cart", ["removeFromCart"]),
    getTotal() {
      var total = this.cart.reduce(function (res, item) {
        return res + item.price * item.quantity;
      }, 0);
      return this.getCurrency(total);
    },
  },
  computed: {
    ...mapGetters("cart", ["cart"]),
  },
};
</script>

<style scoped lang="less">
.trash {
  background-color: transparent;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 5px;

  &:hover,
  &:focus,
  &:active {
    background-color: #bebebe;
    outline: none;
  }
}

.total {
  float: right;
  font-size: 18px;
  font-weight: bold;
}
</style>
