import {defineStore} from "pinia";

export const useAuthStore = defineStore('user', {
    state: () => ({username: null, password: null, firstName: null, lastName: null, loggedInAt: null, isLoggedIn: false}), getters: {
        usernameFragment: (state) => state.firstName + " " + state.lastName,
    }, actions: {
        login(loginDetails) {
            this.username = loginDetails.username;
            this.password = loginDetails.password;

            if(this.username === 'oleg' && this.password === 'oleg') {
                this.firstName = 'Oleg';
                this.lastName = 'Oleg';
                this.isLoggedIn = true;
                this.loggedInAt = Date.now()
                return true;
            }
            this.$reset()
            return false;
        },
        register(loginDetails) {
            this.username = loginDetails.username;
            this.firstName = loginDetails.firstName;
            this.lastName = loginDetails.lastName;
            this.password = loginDetails.password;
            this.loggedInAt = Date.now()
            this.isLoggedIn = true;
            return true;
        },
        logout() {
            this.$reset()
        }
    },
})