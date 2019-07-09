import Vue from 'vue';
import Router from 'vue-router';
import Verify from '@/views/Verify';
import Sign from '@/views/Sign';
import About from '@/views/About';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Verify',
            component: Verify
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '/sign',
            name: 'Sign',
            component: Sign
        },
    ],
    linkActiveClass: 'active'
});
