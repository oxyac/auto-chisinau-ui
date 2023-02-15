<script setup>
import Navbar from "./components/Layout/Navbar.vue";
import Scroll from "./components/Layout/Scroll.vue";
</script>

<template>
  <div class="container mx-auto md:px-4">
    <Navbar></Navbar>
    <router-view></router-view>
    <Scroll></Scroll>
  </div>
</template>

<style scoped>

</style>
