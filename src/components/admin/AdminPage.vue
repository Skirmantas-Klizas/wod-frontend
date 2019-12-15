<template>
  <div class="admin">
    <Header :role="role"></Header>
    <div id="users" class="admin__users">
      <h2 class="admin__heading">Users</h2>
      <Users></Users>
    </div>
    <div class="admin__books">
      <h2 class="admin__heading">Wods</h2>
      <AddWodModal :role="role"></AddWodModal>
      <Wods :role="role"></Wods>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import AddWodModal from "./AddWodModal";
import Wods from "./../partials/Wods";
import Header from "./../partials/Header";
import Users from "./Users";
import Footer from "./../partials/Footer";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    AddWodModal: AddWodModal,
    Wods: Wods,
    Header: Header,
    Footer: Footer,
    Users: Users
  },
  data() {
    return {
      role: "Administrator"
    };
  }
};
</script>

<style lang="scss">
.admin {
  &__books {
    background: $color-moon;
    padding: 35px 50px;
  }
  &__heading {
    color: $color-storm;
    font-family: $Roboto;
    font-weight: 400;
    font-size: 30px;
    margin-bottom: 20px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  &__users {
    background: $color-nude;
    padding: 115px 50px 35px;
  }
}
</style>