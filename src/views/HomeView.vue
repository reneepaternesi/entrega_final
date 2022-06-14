<template>
  <b-container class="product-layout p-5">
    <b-row class="justify-content-center">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
      <ProductCard v-show="this.user.isAdmin" :product="newProduct" />
    </b-row>
  </b-container>
</template>

<script>
import ProductCard from "../components/products/ProductCard.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HomeView",
  async created() {
    await this.getProducts();
  },
  data: () => ({
    newProduct: {
      id: "agregar-producto",
      name: "Nombre del Producto",
      price: 0,
      stock: 0,
      description: "Descripción del Producto",
      quantity: 0,
      size: 35,
      img: "https://i.imgur.com/4lw1ETN.png",
    },
  }),
  components: {
    ProductCard,
  },
  methods: {
    addProduct() {
      this.addProduct(this.newProduct);
    },
    ...mapActions(["getProducts", "addProduct"]),
  },
  computed: {
    ...mapGetters(["products"]),
    ...mapGetters("users", ["user"]),
  },
};
</script>
