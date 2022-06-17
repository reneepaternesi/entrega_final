<template>
  <div class="position-relative">
    <div class="container-fluid nav-bar brand-container">
      <h1 class="brand">Renée Shoes</h1>
    </div>
    <div class="container-fluid nav-bar">
      <b-nav pills>
        <b-nav-item>
          <router-link class="button" to="/"> Productos</router-link>
        </b-nav-item>

        <b-nav-item>
          <router-link class="button" to="/nosotros"> Nosotros</router-link>
        </b-nav-item>
        <b-nav-item v-show="isEmpty(user)">
          <a v-b-modal.login variant="outline-primary"> Login </a>
        </b-nav-item>
        <b-nav-item-dropdown
          v-show="!isEmpty(user)"
          id="user-dropdown"
          :text="user.name"
          toggle-class="nav-link-custom"
          right
        >
          <b-dropdown-item
            ><router-link class="button" to="/orders" v-show="!user.isAdmin">
              Mis Órdenes</router-link
            ></b-dropdown-item
          >
          <b-dropdown-item @click="logOutUser()">Cerrar Sesión</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-nav>
    </div>
    <b-button
      v-b-modal.cart
      variant="outline-primary position-absolute"
      class="cart-btn"
      :disabled="getItemsAdded === 0 || user.isAdmin"
      ><img src="/assets/cart.png" width="30" /> ( {{ getItemsAdded }} )
    </b-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NavBar",
  methods: {
    ...mapActions("users", ["logOut"]),
    logOutUser() {
      this.logOut();
      if (this.$route.name !== "home") {
        this.$router.push("/");
      }
    },
  },
  computed: {
    ...mapGetters("cart", ["getItemsAdded"]),
    ...mapGetters("users", ["user"]),
  },
};
</script>

<style lang="less" scoped>
.brand-container {
  border-bottom: 1px solid #bebebe;
  .brand {
    font-family: "Satisfy", cursive;
    color: #6c757d;
    font-size: 3.5rem;
  }
}

.nav-bar {
  background-color: #d0dede;
  text-shadow: 2px 2px 8px #6c757d;
  height: 80px;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: bold;

  .nav-item {
    .nav-link,
    .nav-link.active,
    a {
      color: white;
      text-decoration: none;
      &:hover,
      &:focus {
        color: white;
        background-color: #bebebe;
      }
    }

    .nav-item.b-nav-dropdown.dropdown {
      .nav-link.dropdown-toggle.nav-link-custom {
        color: white;

        span {
          color: white;
        }
      }
    }

    .nav-pills .nav-link.active,
    .nav-pills .show > .nav-link {
      background-color: #bebebe;
    }

    .nav-link.disabled {
      color: #6c757d;
    }
  }

  .dropdown-item a {
    color: #212529;
  }

  .nav-item .nav-link.dropdown-toggle,
  .nav-pills .nav-link.active,
  .nav-pills .show > .nav-link {
    background-color: #bebebe;

    &:hover,
    &:focus,
    &:active {
      background-color: #bebebe;
    }
  }
}

.cart-btn {
  top: 100px;
  right: 10px;
  cursor: pointer;
  color: #bebebe;
  border-color: #bebebe;
  outline: none;
  font-size: 16px;
  font-weight: bold;
  display: flex;

  img {
    margin-right: 5px;
  }

  &:hover {
    background-color: #bebebe;
    border-color: #bebebe;
    outline: none;
  }

  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
  }

  &.disabled {
    color: #bebebe;
  }
}
</style>
