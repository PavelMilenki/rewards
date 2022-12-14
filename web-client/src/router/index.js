import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home';
import LoginPage from '@/components/LoginPage.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/rewards',
        name: 'home',
        component: Home,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
    },

];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});


export default router;
