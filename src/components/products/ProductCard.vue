<template>
  <div class="col-4">
    <router-link
      :to="{ name: 'product', params: { id: product.id, product } }"
      class="card-link"
    >
      <b-card
        :title="product.name"
        :img-src="product.img"
        :img-alt="product.name"
        img-top
        tag="article"
        class="mb-4 shadow-lg"
      >
        <b-card-text>
          {{ getCurrency(product.price) }}
        </b-card-text>
        <router-link
          v-show="product.id !== 'agregar-producto'"
          class="btn shadow add-to-cart"
          :to="{ name: 'product', params: { id: product.id, product } }"
        >
          Ver Producto
        </router-link>
        <b-button
          v-show="user.isAdmin && product.id !== 'agregar-producto'"
          class="add-to-cart shadow"
          href="#"
          @click="deleteProduct(product.id)"
        >
          Eliminar Producto
        </b-button>
      </b-card>
    </router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ProductCard",
  props: {
    product: {},
  },
  methods: {
    ...mapActions(["deleteProduct"]),
  },
  computed: {
    ...mapGetters("users", ["user"]),
  },
};
</script>

<style scoped lang="less">
.card-link {
  .card {
    img {
      &:hover {
        opacity: 60%;
      }
    }

    .card-body {
      min-height: 146px;

      .card-title {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 16px;
        text-shadow: 2px 2px 8px #6c757d;
        color: #6c757d;
      }

      .card-text {
        color: #6c757d;
      }

      .add-to-cart {
        background-color: #6c757d;
        text-transform: uppercase;
        border: none;
        color: white;

        &:hover {
          background-color: #d0dede;
          font-weight: bold;
          color: #6c757d;
          border: none;
        }
      }

      .add-to-cart + .add-to-cart {
        margin-left: 10px;
      }
    }
  }
}
</style>
