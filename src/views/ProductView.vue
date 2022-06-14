<template>
  <b-container class="product-layout p-5" v-if="productToCart || productToSave">
    <b-row class="justify-content-center">
      <div class="col-6">
        <img class="w-100" :src="productToCart.img" />
      </div>
      <div class="col-6">
        <h1 class="title" v-show="!user.isAdmin">{{ productToCart.name }}</h1>
        <div v-show="user.isAdmin" class="admin-section">
          <div class="text-left font-weight-bold">Nombre del Producto:</div>
          <b-form-input
            v-model="productToSave.name"
            v-bind:class="{
              'is-invalid':
                !validString(productToSave.name) &&
                productToSaveStatus.nameBlured,
            }"
            v-on:blur="productToSaveStatus.nameBlured = true"
          ></b-form-input>
          <b-form-invalid-feedback class="text-left">
            El nombre debe contener al menos 2 caracteres
          </b-form-invalid-feedback>
        </div>
        <div v-show="user.isAdmin" class="admin-section">
          <div class="text-left font-weight-bold">Imagen del Producto:</div>
          <b-form-input
            v-model="productToSave.img"
            v-bind:class="{
              'is-invalid':
                !validString(productToSave.img) &&
                productToSaveStatus.imgBlured,
            }"
            v-on:blur="productToSaveStatus.imgBlured = true"
          ></b-form-input>
          <b-form-invalid-feedback class="text-left">
            El nombre debe contener al menos 2 caracteres
          </b-form-invalid-feedback>
        </div>
        <p v-show="!user.isAdmin" class="description">
          {{ productToCart.description }}
        </p>
        <div v-show="user.isAdmin" class="admin-section">
          <div class="text-left font-weight-bold">
            Descripción del Producto:
          </div>
          <b-form-textarea
            id="textarea"
            v-model="productToSave.description"
            rows="3"
            max-rows="6"
            v-bind:class="{
              'is-invalid':
                !validString(productToSave.description) &&
                productToSaveStatus.descriptionBlured,
            }"
            v-on:blur="productToSaveStatus.descriptionBlured = true"
          ></b-form-textarea>
          <b-form-invalid-feedback class="text-left">
            La descriptión debe contener al menos 2 caracteres
          </b-form-invalid-feedback>
        </div>
        <p class="text-left">
          <strong>Cantidad Disponible: </strong
          ><span v-show="!user.isAdmin">{{ productToCart.stock }}</span>
          <b-form-input
            v-show="user.isAdmin"
            v-model="productToSave.stock"
            type="number"
            v-bind:class="{
              'is-invalid':
                !validNumber(productToSave.stock) &&
                productToSaveStatus.stockBlured,
            }"
            v-on:blur="productToSaveStatus.stockBlured = true"
          ></b-form-input>
          <b-form-invalid-feedback class="text-left">
            El stock debe ser una cantidad positiva o cero
          </b-form-invalid-feedback>
        </p>
        <b-row>
          <div class="col-6">
            <b-table striped hover :items="sizes"></b-table>
          </div>
          <div class="col-6">
            <div class="price" v-show="!user.isAdmin">
              Precio: {{ getCurrency(productToCart.price) }}
            </div>
            <div v-show="user.isAdmin" class="admin-section">
              <div class="text-left font-weight-bold">Precio del Producto:</div>
              <b-form-input
                v-model="productToSave.price"
                type="number"
                v-bind:class="{
                  'is-invalid':
                    !validNumber(productToSave.price) &&
                    productToSaveStatus.priceBlured,
                }"
                v-on:blur="productToSaveStatus.priceBlured = true"
              ></b-form-input>
              <b-form-invalid-feedback class="text-left">
                El precio debe ser una cantidad positiva
              </b-form-invalid-feedback>
            </div>
            <b-form-select
              v-model="productToCart.size"
              :options="getSizes(sizes)"
              class="sizes"
              required
              :disabled="!validPurchase()"
            >
            </b-form-select>
            <b-button
              v-show="!user.isAdmin"
              class="add-to-cart shadow"
              type="submit"
              :disabled="!validPurchase()"
              @click="addProductToCart"
              >{{
                productToCart.stock === 0 ? "No Disponible" : "Comprar"
              }}</b-button
            >
            <br /><br />
            <b-button
              v-show="user.isAdmin"
              class="add-to-cart shadow"
              type="submit"
              :disabled="!validChanges()"
              @click="saveUpdateProduct"
              >Actualizar Producto</b-button
            >
          </div>
        </b-row>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import apiServices from "../services/services";

export default {
  name: "ProductView",
  created() {
    this.getProduct();
  },
  data: () => ({
    productToCart: {},
    productToSave: {},
    productToSaveStatus: {
      nameBlured: false,
      desciptionBlured: false,
      stockBlured: false,
      priceBlured: false,
      imgBlured: false,
    },
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
    sizes: [
      { talle: 35, largo: 22.8 },
      { talle: 36, largo: 23.5 },
      { talle: 37, largo: 24.2 },
      { talle: 38, largo: 24.8 },
      { talle: 39, largo: 25.5 },
      { talle: 40, largo: 26.2 },
      { talle: 41, largo: 27 },
    ],
  }),
  methods: {
    ...mapActions(["addProduct", "updateProduct"]),
    ...mapActions("cart", ["addCartQty", "addToCart"]),
    resetStatus() {
      this.productToSaveStatus.nameBlured = false;
      this.productToSaveStatus.descriptionBlured = false;
      this.productToSaveStatus.stockBlured = false;
      this.productToSaveStatus.priceBlured = false;
      this.productToSaveStatus.imgBlured = false;
    },
    validPurchase() {
      return (
        this.productToCart.stock > 0 &&
        this.productToCart.quantity < this.productToCart.stock
      );
    },
    validString(text) {
      return text?.length >= 2;
    },
    validNumber(price) {
      return price > 0;
    },
    addProductToCart() {
      const productInCart = this.cart.find(
        (product) => product.id === this.product.id
      );
      if (productInCart) {
        if (productInCart.quantity < productInCart.stock) {
          this.addCartQty(productInCart.id);
        } else {
          this.$bvToast.toast("Error", {
            title: "Has alcanzado la cantidad máxima de producto disponible",
            variant: "danger",
            solid: true,
          });
          return;
        }
      } else {
        this.addToCart({
          ...this.productToCart,
          quantity: 1,
        });
      }
      this.$bvToast.toast("Success", {
        title: "Ya agregamos el producto al carrito ✨",
        variant: "success",
        solid: true,
      });
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    validChanges() {
      return (
        this.validString(this.productToSave.name) &&
        this.validString(this.productToSave.img) &&
        this.validString(this.productToSave.description) &&
        this.validNumber(this.productToSave.price) &&
        this.validNumber(this.productToSave.stock)
      );
    },
    async saveUpdateProduct() {
      if (this.productToSave.id === "agregar-producto") {
        await this.addProduct(this.productToSave)
          .then(
            this.$bvToast.toast("Success", {
              title: "El producto ha sido creado correctamente",
              variant: "success",
              solid: true,
            })
          )
          .catch((err) => {
            console.log(err);
            this.$bvToast.toast("Error", {
              title: `No pudimos guardar el nuevo producto, vuelve a intentarlo`,
              variant: "danger",
              solid: true,
              noAutoHide: true,
            });
          });
      } else {
        await this.updateProduct(this.productToSave)
          .then(
            this.$bvToast.toast("Success", {
              title: "El producto ha sido actualizado correctamente",
              variant: "success",
              solid: true,
            })
          )
          .catch((err) => {
            console.log(err);
            this.$bvToast.toast("Error", {
              title: `No pudimos actualizar el producto, vuelve a intentarlo`,
              variant: "danger",
              solid: true,
              noAutoHide: true,
            });
          });
      }
    },
    async getProduct() {
      if (this.$route.params.id === "agregar-producto") {
        this.product = this.newProduct;
        this.productToCart = this.newProduct;
        this.productToSave = this.newProduct;
      } else {
        this.product = this.productById(this.$route.params.id);

        if (!this.product) {
          this.product = await apiServices.getProductById(
            this.$route.params.id
          );
        }
        this.productToCart = this.product;
        this.productToSave = JSON.parse(JSON.stringify(this.product));
      }
    },
  },
  computed: {
    ...mapGetters(["productById"]),
    ...mapGetters("users", ["user"]),
    ...mapGetters("cart", ["cart"]),
  },
  mounted() {
    if (!this.product) {
      this.product = this.getProduct();
    }
    this.productToCart.size = 35;
    this.productToCart.quantity = 0;
  },
};
</script>
<style scoped lang="less">
.title {
  text-shadow: 2px 2px 8px #6c757d;
  font-size: 50px;
  margin-bottom: 20px;
}
.description {
  text-align: justify;
}
.price {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.sizes {
  padding: 0 15px;
  margin-bottom: 20px;
}
.admin-section {
  margin-bottom: 20px;
}
</style>
