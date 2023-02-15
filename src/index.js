import {createRouter, createWebHistory} from "vue-router";
import Login from "./components/Login.vue";
import About from "./components/About.vue";
import {useAuthStore} from "./store/useAuthStore.js";
import Site from "./components/Site.vue";


const routes = [
    {path: '/login', name: 'Login', component: Login},
    {
        path: '/logout', name: 'Logout', redirect: to => {
            const store = useAuthStore()
            store.logout();
            return 'Login'
        },
    },
    {path: '/about', name: 'About', component: About},
    {path: '/site/:site_id', name: 'Site', component: Site, props: true},
    {path: '/:pathMatch(.*)*', name: 'NotFound', component: Site}

]
const router = createRouter({
    history: createWebHistory(), routes: routes
})

router.beforeEach(async (to, from) => {
    // const store = useAuthStore()
    // if (!store.isLoggedIn && to.name !== 'Login') {
    //     return {name: 'Login'}
    // }
})

export default router