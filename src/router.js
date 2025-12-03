/**
 * ROUTER FILE
 */
import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import LoginPage from './pages/LoginPage.vue';
import LogoutPage from './pages/LogoutPage.vue';
import MoviesPage from './pages/MoviesPage.vue';
import AdminPage from './pages/AdminPage.vue';
import RegisterMoviePage from './pages/RegisterMoviePage.vue';
import UpdateMoviePage from './pages/UpdateMoviePage.vue';

  const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage
        },
        {
            path: '/register',
            name: 'Register',
            component: RegisterPage
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginPage
        },
        {
            path: '/logout',
            name: 'Logout',
            component: LogoutPage
        },
        {
            path: '/movies',
            name: 'Movies',
            component: MoviesPage,
            beforeEnter: async (to, from, next) => {
                let isAdmin = localStorage.getItem("isAdmin");
                console.log('localStorage.getItem("isAdmin")',  isAdmin)
                if (isAdmin === "false" || isAdmin === null) {
                    next(); 
                } else {
                    next({ name: 'Admin' });
                }
            }
        },
        {
            path: '/movies',
            name: 'Admin',
            component: AdminPage
        },
        {
            path: '/registerMovie',
            name: 'registerMovie',
            component: RegisterMoviePage
        },
        {
            path: "/editMovie/:movieId",
            component: UpdateMoviePage,
        },
    ]
  });

  export default router;
