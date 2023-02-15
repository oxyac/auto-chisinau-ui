<template>
  <div class="flex justify-between border-b-2 px-0.5 py-1 border-dotted" ref="component">
    <div class="">
      <label for="sort" class="mx-2">Sort by</label>
      <select @change="reload()" id="sort" v-model="sort">
        <option value="foreignId">Date added</option>
        <option value="price">Price</option>
        <option value="mileage">Mileage</option>
      </select>
      <label for="direction" class="mx-2">Direction:</label>
      <select @change="reload()" id="direction" v-model="direction">
        <option value="DESC">Desc</option>
        <option value="ASC">Asc</option>
      </select>
    </div>
    <div class="">
      {{ numberOfElements }}/{{ total }}
    </div>

  </div>
  <div class="grid grid-cols-2 md:grid-cols-6 gap-4 my-5 bg-blue-50">
    <a v-for="car in cars" class="w-fit relative border-2 border-blue-500" target="_blank"
       :href="`${car.protocol}${car.host}${car.link}`">
      <div class="flex absolute w-full flex-row-reverse ">
        <img :src="car.iconUri" width="15" height="15"/>

      </div>
      <img height="240" width="320" :src="car.imageUri"/>
      <div class=" w-full min-h-8 md:min-h-14 text-xs md:text-sm p-1">
        <p>
          {{ car.carName }} <br>
          <span class="text-red-500 font-bold">{{ car.price }}</span> -
          <b>{{ car.mileage }} </b>
        </p>
      </div>
    </a>
  </div>
  <div class="mx-auto w-fit my-4">
    <span v-if="bottomReached">oxyac</span>
    <pulse-loader v-else :loading="loading" :color="color"></pulse-loader>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  components: {
    PulseLoader
  },
  props: {
    site_id: {
      type: String,
      default: "1"
    },
  },
  data() {
    return {
      cars: [],
      sort: "foreignId",
      direction: "DESC",
      page: 0,
      loading: true,
      color: '#3B82F6',
      total: 0,
      size: 40,
      ticking: false,
      bottomReached: false,
      numberOfElements: 0,
      siteId: 1
    }
  },
  watch: {
    '$route.params.site_id': {
      handler: function (search) {
        this.siteId = search
        this.reload()
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollHandler)
  },
  methods: {
    async load() {
      this.loading = true;
      let query = `?websiteId=${this.siteId}&size=${this.size}&page=${this.page++}&sort=${this.sort},${this.direction}`
      this.$http.get(`site${query}`)
          .then(h => {
            const {numberOfElements, totalElements, content} = h.data;
            this.cars.push(...content)
            if (numberOfElements === 0) {
              this.bottomReached = true
            }
            this.numberOfElements += numberOfElements
            this.total = totalElements
            this.loading = false;
          })
    },
    async reload() {

      this.loading = true;
      this.bottomReached = false;
      this.page = 0
      this.cars = [];
      let query = `?websiteId=${this.siteId}&size=${this.size}&page=${this.page++}&sort=${this.sort},${this.direction}`
      this.$http.get(`site${query}`)
          .then(h => {
            const {numberOfElements, totalElements, content} = h.data;
            this.cars = content
            this.loading = false;
            if (numberOfElements === 0) {
              this.bottomReached = true
            }
            this.numberOfElements = numberOfElements
            this.total = totalElements
            this.loading = false;
          })
    },
    scrollHandler() {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight > document.documentElement.offsetHeight - 50;
      if (bottomOfWindow && !this.bottomReached) {
        this.load().then();
      }
    }
  },

}
</script>

<style scoped>

</style>