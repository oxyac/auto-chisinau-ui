<template>
  <div @click="scrollToTop"
       class="transition-opacity duration-500	h-12 w-12 fixed left-4 bottom-4 rounded-full z-10 bg-blue-500 accent-white transition-all:"
       :class="displayHelper ? 'opacity-100' : 'opacity-0'">

    <img src="/arr_white.png" alt="" height="30" width="30" class="m-auto mt-3.5" >
  </div>
</template>

<script>
export default {
  name: "Scroll",
  data() {
    return {
      displayHelper: false
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    handleScroll() {
      this.displayHelper = window.scrollY > 200;
    },
    scrollToTop(){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
}
</script>

<style scoped>
</style>