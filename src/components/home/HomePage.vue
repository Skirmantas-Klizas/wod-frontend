<template>
  <div>
    <Header :role="role"></Header>
    <div class="guest__books">
      <h2 class="guest__heading">Wods</h2>
      <Wods :role="role"></Wods>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Wods from "./../partials/Wods";
import Footer from "./../partials/Footer";
import Header from "./../partials/Header";
export default {
  components: {
    Wods: Wods,
    Footer: Footer,
    Header: Header
  },
  data() {
    return {
      role: "Guest"
    };
  }
};
</script>

<style lang="scss">
.guest {
  &__books {
    background: $color-moon;
    padding: 115px 50px 35px;
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
}
</style>