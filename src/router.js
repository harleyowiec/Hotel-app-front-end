import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Rooms from "./views/Rooms";
import Room from "./views/Room";
import CreateRoom from "./views/CreateRoom";
import BookRoom from "./views/BookRoom";
import Users from "./views/Users";
import Reservations from "./views/Reservations";
import Profile from "./views/Profile";
import store from './store';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isLoggedIn) {
        next();
        return
    }
    next('/')
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isLoggedIn) {
        next();
        return
    }
    next('/login')
};

const ifAdmin = (to, from, next) => {
    if (store.getters.isAdmin) {
        next();
        return
    }
    next('/home')
};

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '*',
            redirect: '/login'
        },
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/signUp',
            name: 'SignUp',
            component: SignUp,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/rooms',
            name: 'Rooms',
            component: Rooms
        },
        {
            path: '/rooms/:id',
            name: 'Room',
            component: Room,
            props: true
        },
        {
            path: '/rooms/:id/edit',
            name: 'EditRoom',
            component: CreateRoom,
            props: true,
            beforeEnter: ifAdmin
        },
        {
            path: '/create',
            name: 'CreateRoom',
            component: CreateRoom,
            beforeEnter: ifAdmin
        },
        {
            path: '/rooms/:id/book',
            name: 'BookRoom',
            component: BookRoom,
            props: true
        },
        {
            path: '/users',
            name: 'Users',
            component: Users,
            beforeEnter: ifAdmin
        },
        {
            path: '/reservations',
            name: 'Reservations',
            component: Reservations,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            beforeEnter: ifAuthenticated
        },
    ]
});

export default router;
