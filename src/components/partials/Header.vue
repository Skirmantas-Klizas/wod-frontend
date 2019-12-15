<template>
  <div class="header">
    <router-link class="brand" v-if="this.role === 'Guest'" to="/" exact>
      <div>WOD</div>
      <!-- <span class="brand__letter brand__letter--1">B</span>
      <span class="brand__letter brand__letter--2">O</span>
      <span class="brand__letter brand__letter--3">O</span>
      <span class="brand__letter brand__letter--4">k</span>-->
    </router-link>
    <router-link class="brand" v-if="this.role === 'User'" to="/user">
      <div>WOD</div>
      <!-- <span class="brand__letter brand__letter--1">B</span>
      <span class="brand__letter brand__letter--2">O</span>
      <span class="brand__letter brand__letter--3">O</span>
      <span class="brand__letter brand__letter--4">k</span>-->
    </router-link>
    <router-link class="brand" v-if="this.role === 'Administrator'" to="/admin">
      <div>WOD</div>
      <!-- <span class="brand__letter brand__letter--1">B</span>
      <span class="brand__letter brand__letter--2">O</span>
      <span class="brand__letter brand__letter--3">O</span>
      <span class="brand__letter brand__letter--4">k</span>-->
    </router-link>
    <Navbar :role="role"></Navbar>
  </div>
</template>

<script>
import Navbar from "./Navbar";
export default {
  props: ["role"],
  components: {
    Navbar: Navbar
  }
};
</script>

<style lang="scss">
.brand {
  font-family: $Roboto;
  color: $color-leather;
  font-weight: 600;
  font-size: 24px;
  transition: transform 0.3s ease-out;
  &:hover {
    transform: scale(1.2);
    text-decoration: none;
  }
  // &__letter {
  //   &--1 {
  //     color: $color-nude;
  //   }
  //   &--2,
  //   &--3 {
  //     color: $color-moon;
  //   }
  //   &--4 {
  //     color: $color-leather;
  //     font-size: 16px;
  //   }
  // }
}
.header {
  align-items: center;
  background-color: $color-storm;
  // box-shadow: 0px 0px 12px $color-storm;
  color: white;
  display: flex;
  font-family: $Roboto;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 50px;
  position: fixed;
  height: 80px;
  width: 100%;
  z-index: 1;
}
</style>