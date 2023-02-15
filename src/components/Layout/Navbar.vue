<template>
  <div class="h-10 bg-blue-500">
    <div class="flex justify-between h-10">
      <div class="flex items-center h-10">
        <div  v-for="site in sites">
          <router-link active-class="bg-blue-600" :to="{ name: 'Site', params: { site_id: site.id }}" class="text-amber-50 p-2 inline-block ">{{site.host}}</router-link>
        </div>
      </div>
      <router-link to="/about" class="text-amber-50 p-2">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      sites: null,
    }
  },
  async created() {
    this.$http.get(`available`)
        .then(h => {
          this.sites = h.data
        })
        .catch(e => console.log(e));
  }
}
</script>

<style scoped>
</style>