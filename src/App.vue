<template>
  <div id="app">
    <NavBar />
    <router-view />
    <CartModal />
    <LoginModal />
    <SignUpModal />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import CartModal from "./components/cart/CartModal.vue";
import LoginModal from "./components/LoginModal.vue";
import SignUpModal from "./components/SignUpModal.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: { NavBar, CartModal, LoginModal, SignUpModal },
  created(){
    this.trySetUserFromLocalStorage();
  },
  methods: {
    ...mapActions("cart", ["setCart"]),
    ...mapActions("users", ["trySetUserFromLocalStorage"]),
    getCart() {
      this.setCart(JSON.parse(localStorage.getItem("cart")) || []);
    },
  },
  mounted() {
    this.getCart();
  },
  computed: {
    ...mapGetters("users", ["user"]),
    ...mapGetters("cart", ["cart"]),
  },
};
</script>

<style lang="less">

#app {
  font-family: "Dosis", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.b-toaster.b-toaster-top-right {
  right: 15px;

  .b-toaster-slot.vue-portal-target {
    font-family: "Dosis", sans-serif;

    .toast {
      border: none;

      .toast-header {
        border: none;
        background-color: #6c757d;
        color: white;
        height: 56px;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
        border-radius: 4px;

        .close {
          color: #bebebe;
          font-weight: 400;
          text-shadow: none;

          &:focus,
          &:active {
            border: none;
            outline: none;
          }
        }
      }
      .toast-body {
        display: none;
      }
    }

    .b-toast-danger {
      .toast-header {
        border-left: 4px solid red;

        &:before {
          content: url("../public/assets/danger.svg");
          height: 25px;
          margin-right: 13px;
        }
      }
    }

    .b-toast-success {
      .toast-header {
        border-left: 4px solid #9df4e2;

        &:before {
          content: url("../public/assets/success.svg");
          height: 25px;
          margin-right: 13px;
        }
      }
    }

    .b-toast-info {
      .toast-header {
        border-left: 4px solid #83aefb;

        &:before {
          content: url("../public/assets/info.svg");
          height: 25px;
          margin-right: 13px;
        }
      }
    }
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
