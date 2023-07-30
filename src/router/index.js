import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import home from '../components/home'
import register from '../components/register'
import login from '../components/login'
import UserCharging from '../components/UserCharging'
import UserNotCharging from '../components/UserNotCharging'
import UserWaiting from '../components/UserWaiting'
import admin from '../components/Admin'

const router = new VueRouter({
    routes: [
      { path: '/', component: home },
      { path: '/login', component: login },
      { path: '/UserCharging', component: UserCharging },
      { path: '/UserNotCharging', component: UserNotCharging },
      { path: '/UserWaiting', component: UserWaiting },
      { path: '/admin', component: admin },
      { path: '/register', component: register }
    ]
});

export default router;