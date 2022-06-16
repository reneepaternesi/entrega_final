<template>
  <b-container class="orders-layout p-5">
    <b-row class="justify-content-center">
      <div class="col-12">
        <h1 class="title">Mis Órdenes</h1>
        <div v-for="order in orders" :key="order.id" class="order row">
          <h2 class="col-6">Orden #{{ order.id }}</h2>
          <h3 class="col-6">
            Fecha: {{ new Date(order.date).toLocaleDateString() }}
          </h3>
          <table class="table b-table table-striped table-hover">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, i) in order.products" :key="i">
                <td>{{ product.name }}</td>
                <td>{{ getCurrency(product.price) }}</td>
                <td>{{ product.quantity }}</td>
                <td>{{ getCurrency(product.price * product.quantity) }}</td>
              </tr>
            </tbody>
          </table>
          <div class="total">Total: {{ getCurrency(order.total) }}</div>
        </div>
        <h3 v-show="orders.length === 0">Aún no ha realizado ninguna orden</h3>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "OrdersView",
  async created() {
    await this.getOrders(this.user.id);
  },
  methods: {
    ...mapActions("cart", ["getOrders"]),
  },
  computed: {
    ...mapGetters("cart", ["orders"]),
    ...mapGetters("users", ["user"]),
  },
};
</script>

<style scoped lang="less">
.title {
  font-weight: bold;
  margin-bottom: 30px;
}

.order {
  border-top: 2px solid #bebebe;
  padding: 20px 0;
}

.total {
  text-align: right;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  border-top: 1px solid #bebebe;
  padding-top: 10px;
}
</style>
