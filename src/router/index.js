import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from "../store/index";
import AuthLayout from "../layouts/AuthLayout";
import DashBoardLayout from "../layouts/DashBoard";
import DefaultLayout from "../layouts/DefaultLayout";


// import store from '../store/index';


Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        component: () => import(/* webpackChunkName: "default" */ '../pages/home/index'),
        meta: {
            layout: DefaultLayout,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/login/index'),
        meta: {
            layout: AuthLayout,
            guestLogin: true,
        },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../pages/register/index'),
        meta: {
            layout: AuthLayout,
            guestLogin: true,
        },
    }, {
        path: '/logout',
        name: 'logout',
        component: () => import('../pages/register/index'),
        meta: {
            layout: AuthLayout,
            guestLogin: true,
        },
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../pages/account-type/ListAccountType'),
        meta: {
            layout: DashBoardLayout,
            requiresAuth: true,
        },
    },
    {
        path: '/personal-vocabulary',
        name: 'PersonalVocabulary',

        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../pages/personal-vocabulary/index'),
        meta: {
            layout: DashBoardLayout,
            requiresAuth: true,
        },
    }
]

const router = new VueRouter({
    mode: "history",
    routes,


})

function isLogin() {
    // return store.state.AUTH.isAuth;
    return localStorage.getItem('token');
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!isLogin()) {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.guestLogin)) {
        if (isLogin()) {
            next({
                path: '/home',
                query: {redirect: to.fullPath}
            })
        } else {
            next();
        }
    } else {
        next() // make sure to always call next()!
    }
})
export default router
