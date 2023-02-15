<template>
  <div class="flex items-center justify-center my-10">
    <div>
      <form class="flex flex-col">
        <input class="border-2 p-4 w-72 my-2 focus:border-blue-600 focus:outline-none" v-if="isRegister"  type="text" placeholder="Enter first" v-model="firstName">
        <input class="border-2 p-4 w-72 my-2 focus:border-blue-600 focus:outline-none" v-if="isRegister" type="text" placeholder="Enter last" v-model="lastName">
        <input class="border-2 p-4 w-72 my-2 focus:border-blue-600 focus:outline-none" type="text" placeholder="Enter username" v-model="username">
        <input class="border-2 p-4 w-72 my-2 focus:border-blue-600 focus:outline-none" type="text" placeholder="Enter password" v-model="password">
        <button class="px-4 py-2 font-semibold text-sm bg-blue-500 text-white shadow-sm" type="submit"
                @click.prevent="isRegister ? submitRegister() : submitLogin()">{{ isRegister ? 'Register' : 'Login' }}
        </button>
        <button class="px-4 py-2 font-semibold text-sm underline m-5" @click.prevent="isRegister = !isRegister">
          {{ isRegister ? 'Login' : 'Register' }}
        </button>
      </form>


    </div>


  </div>
</template>

<script>
import {useAuthStore} from "../store/useAuthStore.js";
import {computed} from "vue";

export default {
  name: "Login",
  setup() {
    const store = useAuthStore()

    const {login, register} = store;

    return {
      store,
      login,
      register
    }
  },
  data() {
    return {
      username: null,
      password: null,
      firstName: null,
      lastName: null,
      isRegister: false
    }
  }
  , methods: {
    submitLogin() {
      const isAuthenticated = this.login({username: this.username, password: this.password})
      if (isAuthenticated) {
        this.$router.push({name: 'Home'})
      } else {

      }
    },
    submitRegister() {
      this.register({
        username: this.username, firstName: this.firstName,
        lastName: this.lastName, password: this.password
      })
      this.$router.push({name: 'Home'})
    }
  }
}
</script>

<style scoped>

</style>